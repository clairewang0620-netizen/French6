# French Master 🇫🇷

A comprehensive static web app for learning French, featuring vocabulary, grammar, speaking, and reading modules.

## Features

- **Vocabulary**: 550+ words ranging from A1 to C1 levels with IPA and examples.
- **Speaking**: 200+ common phrases with high-quality audio support.
- **Reading**: Curated articles with keywords and translations.
- **Grammar**: Essential grammar rules, tenses, and structures.
- **Dictation**: Listening practice with spelling correction and mistake tracking.
- **Quiz**: Self-assessment tests to track progress.
- **Audio**: Uses static MP3 files for maximum compatibility across iOS, Android, and WeChat WebViews.

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

## Deployment (GitHub Pages)

This project is configured with `base: './'` in `vite.config.ts`, making it ready for static deployment.

1.  Run `npm run build`.
2.  Upload the contents of the `dist` folder to your server or the `gh-pages` branch of your repository.

## Audio Configuration

This project uses standard HTML5 Audio tags pointing to local MP3 files.

- **Audio File**: Located at `public/audio/fr_sample.mp3`.
- **Note**: The current file in the repo is a text placeholder. **You must replace it with a real MP3 file** to hear sound.
- **Logic**: Handled in `src/services/audioService.ts`.

## Project Structure

- `src/data`: Contains static content for vocab, grammar, reading, etc.
- `src/pages`: Main application views.
- `src/services`: Audio and storage logic.
- `src/components`: Reusable UI components.

## License

Private / Proprietary