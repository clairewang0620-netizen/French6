# French Master 🇫🇷

A comprehensive static web app for learning French, featuring vocabulary, grammar, speaking, and reading modules.

## Features

- **Hybrid Audio Engine**: Automatically prioritizes high-quality MP3 files, seamlessly falling back to **Native Browser Text-to-Speech (TTS)** if files are missing. Zero configuration required to get started!
- **Vocabulary**: 550+ words ranging from A1 to C1 levels with IPA and examples.
- **Speaking**: 200+ common phrases with high-quality audio support.
- **Reading**: Curated articles with keywords and translations.
- **Grammar**: Essential grammar rules, tenses, and structures.
- **Dictation**: Listening practice with spelling correction and mistake tracking.
- **Quiz**: Self-assessment tests to track progress.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
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

## Audio System Guide 🔊

The app now uses a **Hybrid Audio System** for maximum reliability.

### 1. Default Mode (TTS)
You do not need to do anything! If no MP3 files are provided, the app will automatically use the browser's built-in French Text-to-Speech engine. This works immediately out of the box.

### 2. Enhanced Mode (Custom MP3s)
To provide studio-quality native recordings, you can add MP3 files. The app will check for a file first, and only use TTS if the file is missing.

**Setup:**
Create the directory `public/audio/fr/` and add your files there.

**Naming Convention:**
Files are mapped by "slugifying" the French text:
- Lowercase
- Remove accents (é -> e)
- Remove apostrophes (c'est -> cest)
- Replace spaces/symbols with underscores

**Examples:**
- "Bonjour" -> `public/audio/fr/bonjour.mp3`
- "Ça va ?" -> `public/audio/fr/ca_va.mp3`

## Deployment

1.  Run `npm run build`.
2.  Upload the `dist` folder to GitHub Pages, Cloudflare Pages, or Vercel.

## License

Private / Proprietary