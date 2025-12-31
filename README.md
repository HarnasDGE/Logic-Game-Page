# Logic Game Page

Modern quiz and logic games website built with Astro, React, and WordPress compatibility.

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Logic-Game-Page/
├── themes/
│   └── QuizNight/          # Main Astro + React template
│       ├── src/            # Source code
│       ├── wordpress/      # WordPress theme files
│       └── ...
├── package.json            # Root package.json (workspace)
└── vercel.json            # Vercel deployment config
```

## 🔧 Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
2. **Configure settings:**
   - Build Command: `npm run build`
   - Output Directory: `themes/QuizNight/.vercel/output`
   - Install Command: `npm install`

3. **Deploy!**

The project will automatically build from the `themes/QuizNight` subdirectory.

### Alternative: Manual Deployment

```bash
cd themes/QuizNight
npm install
npm run build
```

Then deploy the `.vercel/output` directory to any hosting provider.

## 📚 Documentation

For detailed documentation, see:
- [QuizNight Theme README](themes/QuizNight/README.md)
- [WordPress Integration Guide](themes/QuizNight/wordpress/docs/INTEGRATION.md)

## 🎯 Features

- ✅ Mobile-first responsive design
- ✅ Astro + React architecture
- ✅ WordPress theme compatibility
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Accessibility-first components
- ✅ Performance optimized
- ✅ SEO friendly

## 🛠️ Tech Stack

- **Framework**: Astro 5.1.5
- **UI Library**: React 18.3.1
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (Serverless)

## 📖 Learn More

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

---

**QuizNight** - Challenge your mind with logic games! 🎮🧠
