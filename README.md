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

This project uses standard HTML5 Audio tags pointing to local MP3 files.

- Audio files are located in `public/audio/`.
- Logic is handled in `src/services/audioService.ts`.
- Currently configured to use `fr_sample.mp3` for demonstration purposes.

## Project Structure

- `src/data`: Contains static content for vocab, grammar, reading, etc.
- `src/pages`: Main application views.
- `src/services`: Audio and storage logic.
- `src/components`: Reusable UI components.

## License

Private / Proprietary