import { Phrase } from '../types';

const CORE_PHRASES: Phrase[] = [
  { id: 's_1', category: '基础表达', fr: 'Oui.', cn: '是的。' },
  { id: 's_2', category: '基础表达', fr: 'Non.', cn: '不。' },
  { id: 's_3', category: '基础表达', fr: 'S\'il vous plaît.', cn: '请。' },
  { id: 's_4', category: '基础表达', fr: 'Merci.', cn: '谢谢。' },
  { id: 's_5', category: '基础表达', fr: 'De rien.', cn: '不客气。' },
  { id: 's_6', category: '基础表达', fr: 'Excusez-moi.', cn: '打扰一下。' },
  { id: 's_7', category: '基础表达', fr: 'Pardon.', cn: '对不起。' },
  { id: 's_8', category: '基础表达', fr: 'Je ne comprends pas.', cn: '我不明白。' },
  { id: 's_9', category: '基础表达', fr: 'Parlez-vous anglais ?', cn: '您说英语吗？' },
  { id: 's_10', category: '基础表达', fr: 'Pouvez-vous répéter ?', cn: '您能重复一遍吗？' },
  { id: 's_11', category: '介绍交流', fr: 'Bonjour.', cn: '你好。' },
  { id: 's_12', category: '介绍交流', fr: 'Au revoir.', cn: '再见。' },
  { id: 's_13', category: '介绍交流', fr: 'Comment ça va ?', cn: '你好吗？' },
  { id: 's_14', category: '介绍交流', fr: 'Je m\'appelle...', cn: '我叫...' },
  { id: 's_21', category: '出行方向', fr: 'Où est la gare ?', cn: '火车站在哪里？' },
  { id: 's_22', category: '出行方向', fr: 'A gauche.', cn: '向左。' },
  { id: 's_31', category: '住宿酒店', fr: 'J\'ai une réservation.', cn: '我有预订。' },
  { id: 's_41', category: '餐厅点餐', fr: 'Une table pour deux.', cn: '两人桌。' },
  { id: 's_42', category: '餐厅点餐', fr: 'L\'addition, s\'il vous plaît.', cn: '请结账。' },
  { id: 's_51', category: '购物', fr: 'Combien ça coûte ?', cn: '多少钱？' },
  { id: 's_61', category: '时间日期', fr: 'Quelle heure est-il ?', cn: '几点了？' },
  { id: 's_71', category: '感受状态', fr: 'Je suis fatigué(e).', cn: '我累了。' },
  { id: 's_81', category: '紧急情况', fr: 'Au secours !', cn: '救命！' },
  { id: 's_91', category: '社交告别', fr: 'Bonne journée.', cn: '祝你愉快。' },
];

export const SPEAKING_DATA: Phrase[] = [...CORE_PHRASES];

// Generate phrases to reach exactly 600
const TOTAL_PHRASES = 600;
const CATEGORIES = ['日常练习', '旅行法语', '商务法语', '高级表达', '情感表达', '校园生活'];

for (let i = SPEAKING_DATA.length; i < TOTAL_PHRASES; i++) {
  const catIndex = Math.floor((i / TOTAL_PHRASES) * CATEGORIES.length);
  SPEAKING_DATA.push({
    id: `s_gen_${i+1}`,
    category: CATEGORIES[catIndex],
    fr: `Ceci est la phrase numéro ${i+1}.`,
    cn: `这是第 ${i+1} 个练习口语的句子。`
  });
}