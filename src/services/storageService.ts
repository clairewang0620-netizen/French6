import { QuizQuestion } from '../types';

const MISTAKES_KEY = 'french_master_mistakes';

export const storageService = {
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
  }
};