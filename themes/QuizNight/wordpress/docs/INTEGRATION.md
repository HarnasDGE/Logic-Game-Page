# WordPress Integration Guide

This guide explains how to integrate QuizNight React components with WordPress.

## Architecture

QuizNight uses a **Hybrid Architecture** that allows it to work both as:
1. **Standalone Astro App** - Deploy to Vercel/Netlify
2. **WordPress Theme** - Use React components within WordPress

## Integration Methods

### Method 1: WordPress Theme (Recommended)

1. **Copy theme files to WordPress**
   ```bash
   cp -r themes/QuizNight/wordpress/theme /path/to/wordpress/wp-content/themes/quiznight
   ```

2. **Build React components bundle**
   ```bash
   cd themes/QuizNight
   npm run build:wordpress
   ```

3. **Copy React bundle to theme**
   ```bash
   cp -r dist/react-components /path/to/wordpress/wp-content/themes/quiznight/
   ```

4. **Activate theme in WordPress**
   - Go to Appearance > Themes
   - Activate "QuizNight"

### Method 2: Headless WordPress

Use WordPress as a headless CMS:

1. **Enable WordPress REST API**
2. **Configure Astro to fetch from WordPress**
   ```javascript
   // astro.config.mjs
   export default defineConfig({
     // ... other config
     vite: {
       define: {
         'import.meta.env.WP_API_URL': JSON.stringify(process.env.WP_API_URL)
       }
     }
   });
   ```

3. **Fetch quizzes from WordPress API**
   ```typescript
   const response = await fetch(`${import.meta.env.WP_API_URL}/wp-json/quiznight/v1/quizzes`);
   const quizzes = await response.json();
   ```

## Custom Post Types

The theme registers these custom post types:

### Quiz (`quiz`)
- Title
- Description
- Featured Image
- Custom Fields:
  - `_quiz_questions_count` - Number of questions
  - `_quiz_estimated_time` - Estimated time in minutes
  - `_quiz_plays` - Number of plays
  - `_quiz_rating` - Rating (0-5)

### Taxonomies
- `quiz_category` - Quiz categories
- `quiz_difficulty` - Difficulty levels (easy, medium, hard, expert)

## REST API Endpoints

### Get Quizzes
```
GET /wp-json/quiznight/v1/quizzes
```

Parameters:
- `per_page` (int) - Number of quizzes per page (default: 10)
- `page` (int) - Page number (default: 1)

Response:
```json
[
  {
    "id": 1,
    "title": "Quiz Title",
    "description": "Quiz description",
    "questionsCount": 20,
    "estimatedTime": 10,
    "plays": 1000,
    "rating": 4.5,
    "image": "https://..."
  }
]
```

## React Component Integration

### Available Components

Components are exposed via `window.QuizNight`:

```javascript
// Header
window.QuizNight.renderHeader('header-root-id');

// Hero Section
window.QuizNight.renderHero('hero-root-id');

// Quiz Grid
window.QuizNight.renderQuizGrid('quiz-grid-id', {
  quizzes: [...],
  onPlayQuiz: (id) => console.log(id)
});

// Category Grid
window.QuizNight.renderCategoryGrid('category-grid-id');

// Footer
window.QuizNight.renderFooter('footer-root-id');
```

### Custom Integration

Add to any WordPress template:

```php
<div id="custom-quiz-section"></div>
<script>
if (window.QuizNight) {
    window.QuizNight.renderQuizGrid('custom-quiz-section', {
        quizzes: <?php echo json_encode($quizzes); ?>,
        showFilters: true
    });
}
</script>
```

## Styling

The theme uses Tailwind CSS. All styles are included in the React bundle.

### Custom CSS

Add custom styles in `style.css` or enqueue additional stylesheets:

```php
function quiznight_custom_styles() {
    wp_enqueue_style('quiznight-custom', get_template_directory_uri() . '/custom.css');
}
add_action('wp_enqueue_scripts', 'quiznight_custom_styles');
```

## Performance Optimization

1. **Enable caching** - Use a WordPress caching plugin
2. **CDN** - Serve static assets from CDN
3. **Lazy loading** - Images are lazy-loaded by default
4. **Code splitting** - React components are code-split

## Troubleshooting

### React components not rendering

1. Check browser console for errors
2. Verify `bundle.js` is loaded
3. Ensure `window.QuizNight` is defined

### Styles not applying

1. Clear WordPress cache
2. Verify `styles.css` is enqueued
3. Check for CSS conflicts

### REST API not working

1. Ensure permalinks are enabled
2. Check `.htaccess` configuration
3. Verify REST API is accessible: `/wp-json/quiznight/v1/quizzes`

## Development Workflow

1. **Develop in Astro**
   ```bash
   npm run dev
   ```

2. **Build for WordPress**
   ```bash
   npm run build:wordpress
   ```

3. **Test in WordPress**
   - Copy files to WordPress
   - Activate theme
   - Test functionality

4. **Deploy**
   - Standalone: Push to Vercel
   - WordPress: Deploy to production WordPress

## Support

For issues or questions:
- GitHub Issues: https://github.com/quiznight/template/issues
- Documentation: https://quiznight.com/docs
