import { GrammarRule, Level } from '../types';

export const GRAMMAR_DATA: GrammarRule[] = [
  // --- A1 ---
  {
    id: 'g_a1_1',
    level: Level.A1,
    topic: '动词 Être (是)',
    description: 'Être 是法语中最基础的动词之一，用于描述身份、状态或特征。',
    structure: 'Je suis, Tu es, Il/Elle est, Nous sommes, Vous êtes, Ils/Elles sont',
    examples: [
      { fr: 'Je suis étudiant.', cn: '我是学生。' },
      { fr: 'Elle est française.', cn: '她是法国人。' }
    ]
  },
  {
    id: 'g_a1_2',
    level: Level.A1,
    topic: '动词 Avoir (有)',
    description: 'Avoir 用于表达拥有，也作为助动词构建复合过去时。',
    structure: 'J\'ai, Tu as, Il/Elle a, Nous avons, Vous avez, Ils/Elles ont',
    examples: [
      { fr: 'J\'ai un chat.', cn: '我有一只猫。' },
      { fr: 'Nous avons faim.', cn: '我们饿了。' }
    ]
  },
  {
    id: 'g_a1_3',
    level: Level.A1,
    topic: '冠词 (Articles)',
    description: '法语名词前通常需要冠词，分为定冠词(le, la, les)和不定冠词(un, une, des)。',
    examples: [
      { fr: 'Le soleil brille.', cn: '太阳在照耀。' },
      { fr: 'C\'est une pomme.', cn: '这是一个苹果。' }
    ]
  },

  // --- A2 ---
  {
    id: 'g_a2_1',
    level: Level.A2,
    topic: '复合过去时 (Passé Composé)',
    description: '用于描述过去完成的动作。由助动词(avoir/être) + 过去分词构成。',
    structure: 'Sujet + Avoir/Être (présent) + Participe Passé',
    examples: [
      { fr: 'J\'ai mangé une pomme.', cn: '我吃了一个苹果。' },
      { fr: 'Il est allé au cinéma.', cn: '他去了电影院。' }
    ]
  },
  {
    id: 'g_a2_2',
    level: Level.A2,
    topic: '动词 Aller (去)',
    description: '不规则动词，也用于构成最近将来时 (Futur Proche)。',
    structure: 'Je vais, Tu vas, Il va, Nous allons, Vous allez, Ils vont',
    examples: [
      { fr: 'Je vais à Paris.', cn: '我去巴黎。' },
      { fr: 'Nous allons partir.', cn: '我们马上要出发。' }
    ]
  },

  // --- B1 ---
  {
    id: 'g_b1_1',
    level: Level.B1,
    topic: '未完成过去时 (Imparfait)',
    description: '用于描述过去的背景、习惯或状态。',
    structure: '词根(Nous变位去ons) + ais, ais, ait, ions, iez, aient',
    examples: [
      { fr: 'Quand j\'étais petit, je jouais au foot.', cn: '我小时候踢足球。' },
      { fr: 'Il faisait beau ce jour-là.', cn: '那天天气很好。' }
    ]
  },
  {
    id: 'g_b1_2',
    level: Level.B1,
    topic: '条件式现在时 (Conditionnel)',
    description: '用于表达愿望、建议、假设或礼貌请求。',
    structure: '简单将来时词根 + Imparfait 词尾',
    examples: [
      { fr: 'Je voudrais un café, s\'il vous plaît.', cn: '我想要一杯咖啡，谢谢。' },
      { fr: 'Si j\'avais le temps, je voyagerais.', cn: '如果我有时间，我会去旅行。' }
    ]
  },

  // --- B2 ---
  {
    id: 'g_b2_1',
    level: Level.B2,
    topic: '虚拟式现在时 (Subjonctif)',
    description: '用于表达主观情感、怀疑、必要性或愿望，通常跟在 "que" 之后。',
    examples: [
      { fr: 'Il faut que tu partes.', cn: '你必须走。' },
      { fr: 'Je doute qu\'il vienne.', cn: '我怀疑他会来。' }
    ]
  },
  {
    id: 'g_b2_2',
    level: Level.B2,
    topic: '逻辑连接词 (Connecteurs)',
    description: '用于组织文章结构和逻辑关系。',
    examples: [
      { fr: 'Cependant, il a refusé.', cn: '然而，他拒绝了。' },
      { fr: 'En effet, la situation est complexe.', cn: '确实，情况很复杂。' }
    ]
  },

  // --- C1 ---
  {
    id: 'g_c1_1',
    level: Level.C1,
    topic: '简单过去时 (Passé Simple)',
    description: '主要用于书面文学中，描述过去发生的动作。',
    examples: [
      { fr: 'Il naquit en 1900.', cn: '他出生于1900年。' },
      { fr: 'Ils furent heureux.', cn: '他们曾经很幸福。' }
    ]
  }
];