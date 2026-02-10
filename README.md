<p align="center">
    <img alt="React" src="https://raw.githubusercontent.com/SrinivasanTarget/srini.codes/main/public/favicon.ico" width="60" />
    <img src="https://avatars.githubusercontent.com/u/67109815?s=200&v=4" width="60"/>
</p>

<h1 align="center">
  srini.codes
</h1>

<h3 align="center">
  A modern personal portfolio website showcasing projects, blog posts, and professional work
</h3>

<p align="center">
  <a href="https://srini.codes">Live Website</a>
</p>

---

## 📋 About

This is my personal portfolio website, built with modern web technologies to showcase my work, blog posts, conference talks, and workshops. The site features a sleek design with glassmorphism effects, custom animations, and integrated blog content from Hashnode.

## ✨ Features

- **Modern Portfolio Interface**: Clean, responsive design with custom animations and glassmorphism effects
- **Blog Integration**: Automatically fetches and displays blog posts from Hashnode
- **Interactive Elements**: Custom cursor, tilt effects, and smooth animations
- **Video Backgrounds**: Dynamic hero section powered by Remotion
- **Contact Page**: Easy way to get in touch
- **Analytics**: Integrated with Vercel Analytics and Plausible Analytics for privacy-friendly tracking
- **Performance Optimized**: Uses Partytown for off-main-thread script execution
- **Fully Responsive**: Works seamlessly across all device sizes

## 🛠️ Tech Stack

### Core

- **React 18.2** - UI library
- **TypeScript 5.1** - Type-safe JavaScript
- **Vite 4.3** - Fast build tool and dev server
- **React Router DOM 7.6** - Client-side routing

### Styling

- **TailwindCSS 3.3** - Utility-first CSS framework
- **Tailwind Typography** - Beautiful typographic defaults
- **Custom Design System** - Glassmorphism, custom fonts, and animations

### Special Features

- **Remotion 4.0** - Programmatic video generation for animated backgrounds
- **Partytown 0.8** - Web worker for third-party scripts
- **React Twitter Widgets** - Embedded Twitter content

### Analytics & Monitoring

- **Vercel Analytics** - Web analytics
- **Plausible Analytics** - Privacy-friendly analytics

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SrinivasanTarget/srini.codes.git
cd srini.codes
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 📜 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production (TypeScript compilation + Partytown + Vite build)
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint
- **`npm run lint:fix`** - Fix ESLint errors automatically
- **`npm run format`** - Format code with Prettier
- **`npm run partytown`** - Copy Partytown library files

## 🏗️ Build and Deployment

### Build Process

```bash
npm run build
```

This command:

1. Compiles TypeScript files
2. Copies Partytown library files to the build directory
3. Builds the optimized production bundle with Vite

The output is generated in the `/build` directory.

### Deployment

The site is deployed to GitHub Pages and is accessible at [srini.codes](https://srini.codes).

## 📁 Project Structure

```
srini.codes/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Page-level components
│   ├── containers/       # Layout components
│   ├── portfolio/        # Data files (projects, blogs, conferences)
│   ├── services/         # API integration services
│   ├── remotion/         # Video animation components
│   ├── assets/           # Images and static assets
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static public assets
├── build/                # Production build output
└── package.json          # Dependencies and scripts
```

## 🔧 Configuration Files

- **`vite.config.ts`** - Vite bundler configuration
- **`tsconfig.json`** - TypeScript configuration (strict mode)
- **`tailwind.config.js`** - Tailwind CSS customization
- **`postcss.config.js`** - PostCSS configuration
- **`.eslintrc.json`** - ESLint rules
- **`.prettierrc`** - Prettier formatting rules

## 🤝 Contributing

This is a personal portfolio project, but if you find any bugs or have suggestions, feel free to open an issue or submit a pull request.

## 👤 Author

**Srinivasan Sekar**

- Website: [srini.codes](https://srini.codes)
- GitHub: [@SrinivasanTarget](https://github.com/SrinivasanTarget)

## 🔄 Dependency Management

This project uses Dependabot to automatically keep dependencies up to date with weekly checks for npm packages.

---

<p align="center">Built with ❤️ using React and TailwindCSS</p>
