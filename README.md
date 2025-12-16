# French Master 🇫🇷

A comprehensive static web app for learning French, featuring vocabulary, grammar, speaking, and reading modules.

## Features

- **Vocabulary**: 550+ words ranging from A1 to C1 levels with IPA and examples.
- **Speaking**: 200+ common phrases with high-quality audio support.
- **Reading**: Curated articles with keywords and translations.
- **Grammar**: Essential grammar rules, tenses, and structures.
- **Dictation**: Listening practice with spelling correction and mistake tracking.
- **Quiz**: Self-assessment tests to track progress.
- **Cross-Platform**: Fully optimized for Android (Chrome, WeChat) and iOS Safari, solving common audio compatibility issues.

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

## Audio Configuration

This project uses a standard HTML5 Audio implementation to ensure compatibility across iOS and Android WebViews (including WeChat). 

- Audio files are located in `public/audio/`.
- The core logic is handled in `src/services/audioService.ts`.

## Project Structure

- `src/data`: Contains static content for vocab, grammar, reading, etc.
- `src/pages`: Main application views.
- `src/services`: Audio and storage logic.
- `src/components`: Reusable UI components.

## License

Private / Proprietary