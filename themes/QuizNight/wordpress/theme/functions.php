<?php
/**
 * QuizNight Theme Functions
 *
 * @package QuizNight
 * @version 1.0.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function quiznight_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'script',
        'style'
    ));
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('responsive-embeds');

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'quiznight'),
        'footer'  => __('Footer Menu', 'quiznight'),
    ));
}
add_action('after_setup_theme', 'quiznight_setup');

/**
 * Enqueue React Components and Styles
 */
function quiznight_enqueue_scripts() {
    $theme_version = wp_get_theme()->get('Version');

    // Enqueue React components bundle
    if (file_exists(get_template_directory() . '/react-components/bundle.js')) {
        wp_enqueue_script(
            'quiznight-react',
            get_template_directory_uri() . '/react-components/bundle.js',
            array(),
            $theme_version,
            true
        );
    }

    // Enqueue styles
    if (file_exists(get_template_directory() . '/react-components/styles.css')) {
        wp_enqueue_style(
            'quiznight-styles',
            get_template_directory_uri() . '/react-components/styles.css',
            array(),
            $theme_version
        );
    }

    // Localize script for WordPress integration
    wp_localize_script('quiznight-react', 'quiznightData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('quiznight_nonce'),
        'siteUrl' => get_site_url(),
        'themePath' => get_template_directory_uri(),
    ));
}
add_action('wp_enqueue_scripts', 'quiznight_enqueue_scripts');

/**
 * Register Custom Post Types
 */
function quiznight_register_post_types() {
    // Quiz Post Type
    register_post_type('quiz', array(
        'labels' => array(
            'name' => __('Quizzes', 'quiznight'),
            'singular_name' => __('Quiz', 'quiznight'),
            'add_new' => __('Add New Quiz', 'quiznight'),
            'add_new_item' => __('Add New Quiz', 'quiznight'),
            'edit_item' => __('Edit Quiz', 'quiznight'),
            'new_item' => __('New Quiz', 'quiznight'),
            'view_item' => __('View Quiz', 'quiznight'),
            'search_items' => __('Search Quizzes', 'quiznight'),
            'not_found' => __('No quizzes found', 'quiznight'),
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'quizzes'),
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-games',
        'show_in_rest' => true,
    ));
}
add_action('init', 'quiznight_register_post_types');

/**
 * Register Taxonomies
 */
function quiznight_register_taxonomies() {
    // Quiz Category
    register_taxonomy('quiz_category', 'quiz', array(
        'labels' => array(
            'name' => __('Quiz Categories', 'quiznight'),
            'singular_name' => __('Quiz Category', 'quiznight'),
        ),
        'hierarchical' => true,
        'rewrite' => array('slug' => 'quiz-category'),
        'show_in_rest' => true,
    ));

    // Quiz Difficulty
    register_taxonomy('quiz_difficulty', 'quiz', array(
        'labels' => array(
            'name' => __('Difficulty Levels', 'quiznight'),
            'singular_name' => __('Difficulty Level', 'quiznight'),
        ),
        'hierarchical' => false,
        'rewrite' => array('slug' => 'difficulty'),
        'show_in_rest' => true,
    ));
}
add_action('init', 'quiznight_register_taxonomies');

/**
 * Add custom meta boxes for quiz data
 */
function quiznight_add_meta_boxes() {
    add_meta_box(
        'quiz_details',
        __('Quiz Details', 'quiznight'),
        'quiznight_quiz_details_callback',
        'quiz',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'quiznight_add_meta_boxes');

function quiznight_quiz_details_callback($post) {
    wp_nonce_field('quiznight_save_quiz_details', 'quiznight_quiz_details_nonce');

    $questions_count = get_post_meta($post->ID, '_quiz_questions_count', true);
    $estimated_time = get_post_meta($post->ID, '_quiz_estimated_time', true);
    $plays = get_post_meta($post->ID, '_quiz_plays', true);
    $rating = get_post_meta($post->ID, '_quiz_rating', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="quiz_questions_count"><?php _e('Number of Questions', 'quiznight'); ?></label></th>
            <td><input type="number" id="quiz_questions_count" name="quiz_questions_count" value="<?php echo esc_attr($questions_count); ?>" min="1" /></td>
        </tr>
        <tr>
            <th><label for="quiz_estimated_time"><?php _e('Estimated Time (minutes)', 'quiznight'); ?></label></th>
            <td><input type="number" id="quiz_estimated_time" name="quiz_estimated_time" value="<?php echo esc_attr($estimated_time); ?>" min="1" /></td>
        </tr>
        <tr>
            <th><label for="quiz_plays"><?php _e('Number of Plays', 'quiznight'); ?></label></th>
            <td><input type="number" id="quiz_plays" name="quiz_plays" value="<?php echo esc_attr($plays); ?>" min="0" readonly /></td>
        </tr>
        <tr>
            <th><label for="quiz_rating"><?php _e('Rating (0-5)', 'quiznight'); ?></label></th>
            <td><input type="number" id="quiz_rating" name="quiz_rating" value="<?php echo esc_attr($rating); ?>" min="0" max="5" step="0.1" /></td>
        </tr>
    </table>
    <?php
}

function quiznight_save_quiz_details($post_id) {
    if (!isset($_POST['quiznight_quiz_details_nonce']) ||
        !wp_verify_nonce($_POST['quiznight_quiz_details_nonce'], 'quiznight_save_quiz_details')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['quiz_questions_count'])) {
        update_post_meta($post_id, '_quiz_questions_count', sanitize_text_field($_POST['quiz_questions_count']));
    }

    if (isset($_POST['quiz_estimated_time'])) {
        update_post_meta($post_id, '_quiz_estimated_time', sanitize_text_field($_POST['quiz_estimated_time']));
    }

    if (isset($_POST['quiz_rating'])) {
        update_post_meta($post_id, '_quiz_rating', sanitize_text_field($_POST['quiz_rating']));
    }
}
add_action('save_post_quiz', 'quiznight_save_quiz_details');

/**
 * REST API: Get quizzes endpoint
 */
function quiznight_register_rest_routes() {
    register_rest_route('quiznight/v1', '/quizzes', array(
        'methods' => 'GET',
        'callback' => 'quiznight_get_quizzes',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'quiznight_register_rest_routes');

function quiznight_get_quizzes($request) {
    $args = array(
        'post_type' => 'quiz',
        'posts_per_page' => $request->get_param('per_page') ?: 10,
        'paged' => $request->get_param('page') ?: 1,
    );

    $quizzes = get_posts($args);
    $data = array();

    foreach ($quizzes as $quiz) {
        $data[] = array(
            'id' => $quiz->ID,
            'title' => $quiz->post_title,
            'description' => $quiz->post_excerpt,
            'questionsCount' => get_post_meta($quiz->ID, '_quiz_questions_count', true),
            'estimatedTime' => get_post_meta($quiz->ID, '_quiz_estimated_time', true),
            'plays' => get_post_meta($quiz->ID, '_quiz_plays', true),
            'rating' => get_post_meta($quiz->ID, '_quiz_rating', true),
            'image' => get_the_post_thumbnail_url($quiz->ID, 'large'),
        );
    }

    return rest_ensure_response($data);
}
