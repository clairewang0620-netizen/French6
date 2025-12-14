import { Phrase } from '../types';

const categories = ['打招呼', '点餐', '购物', '出行', '工作'];
const TARGET_TOTAL = 100;

export const SPEAKING_DATA: Phrase[] = [
  { id: 's01', category: '打招呼', fr: 'Bonjour, enchanté.', cn: '你好，很高兴认识你。' },
  { id: 's02', category: '打招呼', fr: 'Comment allez-vous ?', cn: '您身体好吗？' },
  { id: 's03', category: '点餐', fr: 'Je voudrais le menu, s\'il vous plaît.', cn: '请给我菜单。' },
  { id: 's04', category: '点餐', fr: 'L\'addition, s\'il vous plaît.', cn: '请结账。' },
  { id: 's05', category: '购物', fr: 'Combien ça coûte ?', cn: '这个多少钱？' },
  { id: 's06', category: '出行', fr: 'Où est la station de métro ?', cn: '地铁站在哪里？' },
  { id: 's07', category: '工作', fr: 'Je suis en réunion.', cn: '我在开会。' },
];

// Fill to 100
for (let i = SPEAKING_DATA.length; i < TARGET_TOTAL; i++) {
  const cat = categories[i % categories.length];
  SPEAKING_DATA.push({
    id: `gen_${i}`,
    category: cat,
    fr: `Phrase pratique numéro ${i + 1} pour la catégorie ${cat}.`,
    cn: `这是【${cat}】场景下的第 ${i + 1} 句常用表达。`
  });
}