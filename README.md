# French Master 🇫🇷

A comprehensive static web app for learning French, featuring vocabulary, grammar, speaking, and reading modules.

## Features

- **Vocabulary**: 550+ words ranging from A1 to C1 levels with IPA and examples.
- **Speaking**: 200+ common phrases with high-quality audio support.
- **Reading**: Curated articles with keywords and translations.
- **Grammar**: Essential grammar rules, tenses, and structures.
- **Dictation**: Listening practice with spelling correction and mistake tracking.
- **Quiz**: Self-assessment tests to track progress.
- **Audio**: **Native HTML5 Audio** using static MP3 files for maximum compatibility (iOS/Android/WeChat).

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via CDN for instant preview)
- **Icons**: Lucide React

## Getting Started

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Start development server**
    ```bash
    npm run dev
    ```

3.  **Build for production**
    ```bash
    npm run build
    ```
    The output will be in the `dist` folder.

## Deployment (GitHub Pages / Cloudflare Pages)

This project is configured with `base: './'` in `vite.config.ts`, making it ready for static deployment.

1.  Run `npm run build`.
2.  Upload the `dist` folder to your static hosting provider.

## 🔊 Audio Configuration (IMPORTANT)

This app uses a static file approach for audio to ensure 100% reliability on mobile devices.

### 1. File Structure
You must create the following directory structure in your project:
```
public/
  └── audio/
      └── fr/
          ├── bonjour.mp3
          ├── merci.mp3
          ├── pardon.mp3
          └── ...
```

### 2. File Naming Convention
The app automatically maps French text to filenames using a "slugify" logic:
- **Lowercase**
- **No accents** (é -> e)
- **No apostrophes** (c'est -> cest)
- **Spaces to underscores**

**Examples:**
- "Bonjour" -> `bonjour.mp3`
- "Ça va ?" -> `ca_va.mp3`
- "S'il vous plaît" -> `sil_vous_plait.mp3`

### 3. Missing Files
If a file is missing, check the browser console. It will warn:
`[Audio 404] 无法加载音频: audio/fr/xxxx.mp3`

## Project Structure

- `src/data`: Contains static content for vocab, grammar, reading, etc.
- `src/pages`: Main application views.
- `src/services`: Audio logic (`audioService.ts`).
- `src/components`: Reusable UI components.

## License

Private / Proprietary