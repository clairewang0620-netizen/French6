import { QuizQuestion } from '../types';

const MISTAKES_KEY = 'french_master_mistakes'; // Quiz mistakes
const STRENGTHEN_KEY = 'french_master_strengthen'; // Vocabulary flashcard marking
const DICTATION_ERR_KEY = 'french_master_dictation_err'; // Dictation mistakes

export interface DictationMistake {
  wordId: string;
  french: string;
  chinese: string;
  wrongCount: number;
  lastWrongTime: number;
}

export const storageService = {
  // --- Quiz Mistakes (Existing) ---
  saveMistake: (questionId: string) => {
    const existing = storageService.getMistakes();
    if (!existing.includes(questionId)) {
      const updated = [...existing, questionId];
      localStorage.setItem(MISTAKES_KEY, JSON.stringify(updated));
    }
  },

  getMistakes: (): string[] => {
    const data = localStorage.getItem(MISTAKES_KEY);
    return data ? JSON.parse(data) : [];
  },

  removeMistake: (questionId: string) => {
    const existing = storageService.getMistakes();
    const updated = existing.filter(id => id !== questionId);
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(updated));
  },

  clearAll: () => {
    localStorage.removeItem(MISTAKES_KEY);
    localStorage.removeItem(STRENGTHEN_KEY);
    localStorage.removeItem(DICTATION_ERR_KEY);
  },

  // --- Strengthened Words (New) ---
  // Stores only IDs to keep storage light. Metadata is re-hydrated from VOCAB_DATA.
  toggleStrengthenWord: (wordId: string) => {
    const existing = storageService.getStrengthenedWordIds();
    let updated;
    if (existing.includes(wordId)) {
      updated = existing.filter(id => id !== wordId);
    } else {
      updated = [...existing, wordId];
    }
    localStorage.setItem(STRENGTHEN_KEY, JSON.stringify(updated));
    return !existing.includes(wordId); // Returns true if added, false if removed
  },

  // Ensure word is in strengthen list (idempotent)
  addStrengthenWord: (wordId: string) => {
    const existing = storageService.getStrengthenedWordIds();
    if (!existing.includes(wordId)) {
      const updated = [...existing, wordId];
      localStorage.setItem(STRENGTHEN_KEY, JSON.stringify(updated));
    }
  },

  getStrengthenedWordIds: (): string[] => {
    const data = localStorage.getItem(STRENGTHEN_KEY);
    return data ? JSON.parse(data) : [];
  },

  // --- Dictation Mistakes (New) ---
  saveDictationMistake: (wordId: string, french: string, chinese: string) => {
    const existing: DictationMistake[] = storageService.getDictationMistakes();
    const index = existing.findIndex(m => m.wordId === wordId);

    if (index >= 0) {
      existing[index].wrongCount += 1;
      existing[index].lastWrongTime = Date.now();
    } else {
      existing.push({
        wordId,
        french,
        chinese,
        wrongCount: 1,
        lastWrongTime: Date.now()
      });
    }
    localStorage.setItem(DICTATION_ERR_KEY, JSON.stringify(existing));

    // Automatically add to Strengthen list for Flashcard review
    storageService.addStrengthenWord(wordId);
  },

  getDictationMistakes: (): DictationMistake[] => {
    const data = localStorage.getItem(DICTATION_ERR_KEY);
    return data ? JSON.parse(data) : [];
  },

  removeDictationMistake: (wordId: string) => {
    const existing = storageService.getDictationMistakes();
    const updated = existing.filter(m => m.wordId !== wordId);
    localStorage.setItem(DICTATION_ERR_KEY, JSON.stringify(updated));
  }
};