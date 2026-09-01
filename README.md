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
- **Animated Starfield**: CSS-driven hero background, no JavaScript at runtime
- **Contact Page**: Easy way to get in touch
- **Analytics**: Integrated with Vercel Analytics and Plausible Analytics for privacy-friendly tracking
- **Performance Optimized**: Uses Partytown for off-main-thread script execution
- **Fully Responsive**: Works seamlessly across all device sizes
- **WebMCP Voice Assistant**: Ask about Srini by voice. The site registers its content as WebMCP tools on `document.modelContext`, and a Gemini-powered assistant (speech-to-text, function calling, text-to-speech) answers only through those tools

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

- **three.js / react-globe.gl** - WebGL globe on the speaker map, loaded on demand
- **Partytown 0.8** - Web worker for third-party scripts
- **React Twitter Widgets** - Embedded Twitter content

### Voice Assistant

- **WebMCP** - W3C draft API (`document.modelContext`) exposing the site's content as agent tools, with a spec-shaped polyfill for browsers without native support
- **Gemini API** (`@google/genai`) - Gemini 3.5 Transcribe for speech-to-text, Gemini 3.7 Flash for function calling, Gemini 3.1 Flash TTS for speech
- **Vercel Functions** - `api/voice/*` hold the API key; the model loop itself runs in the browser through WebMCP

See [docs/webmcp-voice-assistant.md](docs/webmcp-voice-assistant.md) for the full write-up.

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

4. (Optional) Enable the voice assistant locally by copying `.env.example` to `.env` and adding a `GEMINI_API_KEY`. The dev server serves the `api/voice/*` functions itself.

## 📜 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production (TypeScript compilation + Partytown + Vite build)
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint
- **`npm run typecheck:api`** - Type-check the Vercel functions under `api/`
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

The voice assistant needs the `api/voice/*` functions, which run on Vercel. Set `GEMINI_API_KEY` in the Vercel project's environment variables (see `.env.example` for optional model overrides). Without it the assistant button still appears, and explains that voice is not configured.

## 📁 Project Structure

```
srini.codes/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Page-level components
│   ├── portfolio/        # Data files (projects, blogs, conferences)
│   ├── services/         # API integration services
│   ├── webmcp/           # WebMCP types, polyfill and the site's tools
│   ├── voice/            # Voice assistant UI, audio and the Gemini bridge
│   ├── assets/           # Images and static assets
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── api/                  # Vercel functions proxying the Gemini API
├── docs/                 # Design notes (WebMCP voice assistant)
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
