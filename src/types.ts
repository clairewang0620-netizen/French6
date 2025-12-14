export enum Level {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1'
}

export interface Word {
  id: string;
  french: string;
  chinese: string;
  ipa: string;
  level: Level;
  example: {
    french: string;
    chinese: string;
  };
}

export interface GrammarExample {
  fr: string;
  cn: string;
}

export interface GrammarRule {
  id: string;
  level: Level;
  topic: string;
  description: string;
  structure?: string;
  examples: GrammarExample[];
}

export interface Phrase {
  id: string;
  french: string;
  chinese: string;
}

export interface ArticleKeyword {
  fr: string;
  cn: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  translation: string;
  keywords: ArticleKeyword[];
}

export interface QuizQuestion {
  id: string;
  level: Level;
  question: string;
  options: string[];
  answer: number; // Index of correct option
  explanation: string;
}