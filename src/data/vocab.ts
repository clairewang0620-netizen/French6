import { Level, Word } from '../types';

const createWord = (
  id: string, 
  term: string, 
  ipa: string, 
  definition: string, 
  level: Level, 
  exampleFr: string, 
  exampleCn: string
): Word => ({ id, term, ipa, definition, level, exampleFr, exampleCn });

export const VOCAB_DATA: Word[] = [
  // --- A1 Samples ---
  createWord('a1_1', 'Bonjour', '/bɔ̃.ʒuʁ/', '你好/早安', Level.A1, 'Bonjour, comment allez-vous ?', '你好，你好吗？'),
  createWord('a1_2', 'Merci', '/mɛʁ.si/', '谢谢', Level.A1, 'Merci beaucoup pour votre aide.', '非常感谢你的帮助。'),
  createWord('a1_3', 'Chat', '/ʃa/', '猫', Level.A1, 'Le chat dort sur le canapé.', '猫在沙发上睡觉。'),
  createWord('a1_4', 'Maison', '/mɛ.zɔ̃/', '房子', Level.A1, 'Ils ont acheté une grande maison.', '他们买了一栋大房子。'),
  createWord('a1_5', 'Livre', '/livʁ/', '书', Level.A1, 'J\'aime lire ce livre.', '我喜欢读这本书。'),
  
  // --- A2 Samples ---
  createWord('a2_1', 'Voyage', '/vwa.jaʒ/', '旅行', Level.A2, 'Le voyage a été long.', '这次旅行很长。'),
  createWord('a2_2', 'Travail', '/tʁa.vaj/', '工作', Level.A2, 'Je cherche un travail.', '我在找工作。'),

  // --- B1 Samples ---
  createWord('b1_1', 'Sentiment', '/sɑ̃.ti.mɑ̃/', '感情', Level.B1, 'J\'ai un bon sentiment.', '我有种好的预感。'),

  // --- B2 Samples ---
  createWord('b2_1', 'Polémique', '/pɔ.le.mik/', '争论', Level.B2, 'Une vive polémique.', '一场激烈的争论。'),

  // --- C1 Samples ---
  createWord('c1_1', 'Inéluctable', '/i.ne.lyk.tabl/', '不可避免的', Level.C1, 'Le destin est inéluctable.', '命运是不可避免的。'),
];

// Logic to ensure exactly 60 words per level
const levels = [Level.A1, Level.A2, Level.B1, Level.B2, Level.C1];
levels.forEach(level => {
  const currentLevelWords = VOCAB_DATA.filter(w => w.level === level);
  const startIdx = currentLevelWords.length;
  const targetCount = 60; // 60 words per level
  
  for (let i = startIdx; i < targetCount; i++) {
    VOCAB_DATA.push(createWord(
      `${level.toLowerCase()}_gen_${i+1}`, 
      `Mot ${level} ${i+1}`, 
      '/.../', 
      `[${level}] 单词释义 ${i+1}`, 
      level, 
      `Ceci est un exemple pour le niveau ${level} numéro ${i+1}.`, 
      `这是 ${level} 级别的例句 ${i+1}。`
    ));
  }
});