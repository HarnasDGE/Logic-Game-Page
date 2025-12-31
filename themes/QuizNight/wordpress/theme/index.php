<?php
/**
 * The main template file
 *
 * @package QuizNight
 */

get_header(); ?>

<div id="quiznight-app" class="quiznight-wrapper">
    <!-- React components will mount here -->
    <div id="hero-section"></div>
    <div id="quiz-grid"></div>
    <div id="category-grid"></div>
</div>

<script>
    // Initialize React components
    if (window.QuizNight) {
        // Mount Hero Section
        if (document.getElementById('hero-section')) {
            window.QuizNight.renderHero('hero-section');
        }

        // Mount Quiz Grid
        if (document.getElementById('quiz-grid')) {
            window.QuizNight.renderQuizGrid('quiz-grid');
        }

        // Mount Category Grid
        if (document.getElementById('category-grid')) {
            window.QuizNight.renderCategoryGrid('category-grid');
        }
    }
</script>

<?php get_footer(); ?>
