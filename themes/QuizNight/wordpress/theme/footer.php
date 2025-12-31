    </main><!-- #main -->

    <footer id="colophon" class="site-footer">
        <div id="footer-react-root"></div>
        <script>
            // Mount React Footer component
            if (window.QuizNight && window.QuizNight.renderFooter) {
                window.QuizNight.renderFooter('footer-react-root');
            }
        </script>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
