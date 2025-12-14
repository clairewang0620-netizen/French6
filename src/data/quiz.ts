import { QuizQuestion, Level } from '../types';

// Helper for generating quizzes
const createQuiz = (id: string, level: Level, q: string, opts: string[], ans: number, exp: string): QuizQuestion => 
  ({ id, level, question: q, options: opts, answer: ans, explanation: exp });

export const QUIZ_DATA: QuizQuestion[] = [
  // A1 (8 Questions)
  createQuiz('q_a1_1', Level.A1, 'Je ___ étudiant.', ['suis', 'es', 'est', 'sommes'], 0, 'Être 第一人称单数。'),
  createQuiz('q_a1_2', Level.A1, 'Il ___ une voiture.', ['ai', 'as', 'a', 'ont'], 2, 'Avoir 第三人称单数。'),
  createQuiz('q_a1_3', Level.A1, '___ fille joue.', ['Le', 'La', 'Les', 'Un'], 1, 'Fille 是阴性名词。'),
  createQuiz('q_a1_4', Level.A1, 'Comment ___ -vous ?', ['allez', 'va', 'vais', 'allons'], 0, '固定搭配。'),
  createQuiz('q_a1_5', Level.A1, 'C\'est ___ livre.', ['une', 'un', 'des', 'de'], 1, 'Livre 是阳性名词。'),
  createQuiz('q_a1_6', Level.A1, 'Elle habite ___ Paris.', ['en', 'au', 'à', 'aux'], 2, '城市前用 à。'),
  createQuiz('q_a1_7', Level.A1, 'Nous ___ français.', ['sommes', 'êtes', 'sont', 'suis'], 0, 'Nous sommes。'),
  createQuiz('q_a1_8', Level.A1, 'J\'aime ___ chocolat.', ['le', 'la', 'les', 'l\''], 0, '喜好通常用定冠词。'),

  // A2 (8 Questions)
  createQuiz('q_a2_1', Level.A2, 'J\'___ mangé.', ['suis', 'ai', 'as', 'a'], 1, 'Manger 复合过去时用 Avoir。'),
  createQuiz('q_a2_2', Level.A2, 'Tu ___ où ?', ['vas', 'vais', 'va', 'allez'], 0, 'Aller 第二人称单数。'),
  createQuiz('q_a2_3', Level.A2, 'Il fait ___.', ['froid', 'froide', 'froids', 'froides'], 0, 'Il fait 结构接形容词阳性。'),
  createQuiz('q_a2_4', Level.A2, 'Hier, nous ___ allés.', ['avons', 'sommes', 'sont', 'ont'], 1, 'Aller 复合过去时用 Être。'),
  createQuiz('q_a2_5', Level.A2, 'Je vais ___.', ['partir', 'pars', 'part', 'partes'], 0, 'Futur Proche: Aller + Infinitif。'),
  createQuiz('q_a2_6', Level.A2, 'C\'est ma ___ chemise.', ['bel', 'beau', 'belle', 'beaux'], 2, 'Chemise 是阴性单数。'),
  createQuiz('q_a2_7', Level.A2, 'Il ne mange ___ de viande.', ['pas', 'rien', 'jamais', 'plus'], 0, '基本否定 ne...pas de。'),
  createQuiz('q_a2_8', Level.A2, '___ est ton nom ?', ['Quel', 'Quelle', 'Quels', 'Quelles'], 0, 'Nom 是阳性单数。'),

  // B1 (8 Questions)
  createQuiz('q_b1_1', Level.B1, 'Quand j\'étais petit, je ___ beaucoup.', ['jouais', 'joue', 'ai joué', 'jouerai'], 0, 'Imparfait 用于过去习惯。'),
  createQuiz('q_b1_2', Level.B1, 'Si j\'avais de l\'argent, je ___ une voiture.', ['achète', 'achèterais', 'achetais', 'ai acheté'], 1, 'Conditionnel 表达假设结果。'),
  createQuiz('q_b1_3', Level.B1, 'Il faut que tu ___.', ['fais', 'fasses', 'fait', 'faire'], 1, 'Il faut que + Subjonctif。'),
  createQuiz('q_b1_4', Level.B1, 'Je ne pense pas qu\'il ___.', ['vient', 'vienne', 'viendra', 'venait'], 1, 'Penser 否定式后接 Subjonctif。'),
  createQuiz('q_b1_5', Level.B1, 'C\'est le livre ___ je t\'ai parlé.', ['que', 'qui', 'dont', 'où'], 2, 'Parler de qqch -> dont。'),
  createQuiz('q_b1_6', Level.B1, 'Elle est ___ .', ['venu', 'venue', 'venus', 'venues'], 1, 'Être 过去分词配合 (阴性主语)。'),
  createQuiz('q_b1_7', Level.B1, 'Après ___ mangé, il est parti.', ['avoir', 'être', 'a', 'est'], 0, 'Après + Infinitif Passé。'),
  createQuiz('q_b1_8', Level.B1, 'C\'est ___ intéressant.', ['plus', 'très', 'beaucoup', 'trop'], 1, '修饰形容词用 très。'),

  // B2 (8 Questions)
  createQuiz('q_b2_1', Level.B2, 'Bien qu\'il ___ tard.', ['est', 'soit', 'sera', 'était'], 1, 'Bien que + Subjonctif。'),
  createQuiz('q_b2_2', Level.B2, 'Je cherche quelqu\'un qui ___ m\'aider.', ['peut', 'puisse', 'pourra', 'pouvait'], 1, '寻找不确定对象 + Subjonctif。'),
  createQuiz('q_b2_3', Level.B2, 'Au cas où il ___ .', ['pleut', 'pleuvra', 'pleuvrait', 'pleuve'], 2, 'Au cas où + Conditionnel。'),
  createQuiz('q_b2_4', Level.B2, 'C\'est la raison ___ laquelle je pars.', ['pour', 'par', 'avec', 'sans'], 0, 'La raison pour laquelle。'),
  createQuiz('q_b2_5', Level.B2, 'Il a réussi ___ travailler.', ['sans', 'pour', 'par', 'de'], 0, 'Sans + Infinitif。'),
  createQuiz('q_b2_6', Level.B2, '___ de la pluie, nous sortirons.', ['En dépit', 'Malgré', 'Même', 'Quoique'], 1, 'Malgré + Nom。'),
  createQuiz('q_b2_7', Level.B2, 'Il parle ___ il savait tout.', ['comme', 'comme si', 'si', 'que'], 1, 'Comme si + Imparfait。'),
  createQuiz('q_b2_8', Level.B2, 'Ayant ___ son travail, il partit.', ['fini', 'finis', 'finie', 'finies'], 0, 'Participe présent/passé。'),

  // C1 (8 Questions)
  createQuiz('q_c1_1', Level.C1, 'Il fut ___ par sa décision.', ['surpris', 'surprise', 'surprises', 'surprirent'], 0, 'Passé Simple 被动语态。'),
  createQuiz('q_c1_2', Level.C1, 'Je ne m\'attendais pas à ce qu\'il ___ si tôt.', ['arrive', 'arrivât', 'arrivait', 'arrivera'], 0, 'Subjonctif Présent/Imparfait (Arrivât is litterary, Arrive is standard). Using standard for web app.'),
  createQuiz('q_c1_3', Level.C1, '___ soit le résultat.', ['Quel', 'Quelle', 'Quels', 'Quel que'], 3, 'Quel que soit + Sujet。'),
  createQuiz('q_c1_4', Level.C1, 'Il est ___ intelligent pour comprendre.', ['si', 'tellement', 'tant', 'suffisamment'], 3, 'Suffisamment ... pour。'),
  createQuiz('q_c1_5', Level.C1, 'À moins qu\'il ne ___ .', ['vienne', 'vient', 'viendra', 'venait'], 0, 'À moins que + Subjonctif + ne explétif。'),
  createQuiz('q_c1_6', Level.C1, 'Il a agi ___ il ne soit puni.', ['de peur qu\'', 'parce qu\'', 'puisqu\'', 'alors qu\''], 0, 'De peur que + Subjonctif。'),
  createQuiz('q_c1_7', Level.C1, 'Il est riche, ___ il est malheureux.', ['néanmoins', 'donc', 'car', 'lorsque'], 0, 'Néanmoins 表示转折。'),
  createQuiz('q_c1_8', Level.C1, 'Fasse le ciel qu\'il ___ !', ['réussit', 'réussira', 'réussisse', 'réussissait'], 2, 'Subjonctif in optative clauses.'),
];