<?php
/**
 * LogicLeague Theme Functions
 *
 * @package LogicLeague
 * @version 1.0.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function logicleague_setup() {
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
        'primary' => __('Primary Menu', 'logicleague'),
        'footer'  => __('Footer Menu', 'logicleague'),
    ));
}
add_action('after_setup_theme', 'logicleague_setup');

/**
 * Enqueue React Components and Styles
 */
function logicleague_enqueue_scripts() {
    $theme_version = wp_get_theme()->get('Version');

    // Enqueue React components bundle
    if (file_exists(get_template_directory() . '/react-components/bundle.js')) {
        wp_enqueue_script(
            'logicleague-react',
            get_template_directory_uri() . '/react-components/bundle.js',
            array(),
            $theme_version,
            true
        );
    }

    // Enqueue styles
    if (file_exists(get_template_directory() . '/react-components/styles.css')) {
        wp_enqueue_style(
            'logicleague-styles',
            get_template_directory_uri() . '/react-components/styles.css',
            array(),
            $theme_version
        );
    }

    // Localize script for WordPress integration
    wp_localize_script('logicleague-react', 'logicleagueData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('logicleague_nonce'),
        'siteUrl' => get_site_url(),
        'themePath' => get_template_directory_uri(),
    ));
}
add_action('wp_enqueue_scripts', 'logicleague_enqueue_scripts');

/**
 * Register Custom Post Types
 */
function logicleague_register_post_types() {
    // Quiz Post Type
    register_post_type('quiz', array(
        'labels' => array(
            'name' => __('Quizzes', 'logicleague'),
            'singular_name' => __('Quiz', 'logicleague'),
            'add_new' => __('Add New Quiz', 'logicleague'),
            'add_new_item' => __('Add New Quiz', 'logicleague'),
            'edit_item' => __('Edit Quiz', 'logicleague'),
            'new_item' => __('New Quiz', 'logicleague'),
            'view_item' => __('View Quiz', 'logicleague'),
            'search_items' => __('Search Quizzes', 'logicleague'),
            'not_found' => __('No quizzes found', 'logicleague'),
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'quizzes'),
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-games',
        'show_in_rest' => true,
    ));
}
add_action('init', 'logicleague_register_post_types');

/**
 * Register Taxonomies
 */
function logicleague_register_taxonomies() {
    // Quiz Category
    register_taxonomy('quiz_category', 'quiz', array(
        'labels' => array(
            'name' => __('Quiz Categories', 'logicleague'),
            'singular_name' => __('Quiz Category', 'logicleague'),
        ),
        'hierarchical' => true,
        'rewrite' => array('slug' => 'quiz-category'),
        'show_in_rest' => true,
    ));

    // Quiz Difficulty
    register_taxonomy('quiz_difficulty', 'quiz', array(
        'labels' => array(
            'name' => __('Difficulty Levels', 'logicleague'),
            'singular_name' => __('Difficulty Level', 'logicleague'),
        ),
        'hierarchical' => false,
        'rewrite' => array('slug' => 'difficulty'),
        'show_in_rest' => true,
    ));
}
add_action('init', 'logicleague_register_taxonomies');

/**
 * Add custom meta boxes for quiz data
 */
function logicleague_add_meta_boxes() {
    add_meta_box(
        'quiz_details',
        __('Quiz Details', 'logicleague'),
        'logicleague_quiz_details_callback',
        'quiz',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'logicleague_add_meta_boxes');

function logicleague_quiz_details_callback($post) {
    wp_nonce_field('logicleague_save_quiz_details', 'logicleague_quiz_details_nonce');

    $questions_count = get_post_meta($post->ID, '_quiz_questions_count', true);
    $estimated_time = get_post_meta($post->ID, '_quiz_estimated_time', true);
    $plays = get_post_meta($post->ID, '_quiz_plays', true);
    $rating = get_post_meta($post->ID, '_quiz_rating', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="quiz_questions_count"><?php _e('Number of Questions', 'logicleague'); ?></label></th>
            <td><input type="number" id="quiz_questions_count" name="quiz_questions_count" value="<?php echo esc_attr($questions_count); ?>" min="1" /></td>
        </tr>
        <tr>
            <th><label for="quiz_estimated_time"><?php _e('Estimated Time (minutes)', 'logicleague'); ?></label></th>
            <td><input type="number" id="quiz_estimated_time" name="quiz_estimated_time" value="<?php echo esc_attr($estimated_time); ?>" min="1" /></td>
        </tr>
        <tr>
            <th><label for="quiz_plays"><?php _e('Number of Plays', 'logicleague'); ?></label></th>
            <td><input type="number" id="quiz_plays" name="quiz_plays" value="<?php echo esc_attr($plays); ?>" min="0" readonly /></td>
        </tr>
        <tr>
            <th><label for="quiz_rating"><?php _e('Rating (0-5)', 'logicleague'); ?></label></th>
            <td><input type="number" id="quiz_rating" name="quiz_rating" value="<?php echo esc_attr($rating); ?>" min="0" max="5" step="0.1" /></td>
        </tr>
    </table>
    <?php
}

function logicleague_save_quiz_details($post_id) {
    if (!isset($_POST['logicleague_quiz_details_nonce']) ||
        !wp_verify_nonce($_POST['logicleague_quiz_details_nonce'], 'logicleague_save_quiz_details')) {
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
add_action('save_post_quiz', 'logicleague_save_quiz_details');

/**
 * REST API: Get quizzes endpoint
 */
function logicleague_register_rest_routes() {
    register_rest_route('logicleague/v1', '/quizzes', array(
        'methods' => 'GET',
        'callback' => 'logicleague_get_quizzes',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'logicleague_register_rest_routes');

function logicleague_get_quizzes($request) {
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
