<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header id="masthead" class="site-header">
        <div id="header-react-root"></div>
        <script>
            // Mount React Header component
            if (window.QuizNight && window.QuizNight.renderHeader) {
                window.QuizNight.renderHeader('header-react-root');
            }
        </script>
    </header>

    <main id="main" class="site-main">
