import { Article } from '../types';

export const READING_DATA: Article[] = [
  {
    id: 'r_1',
    title: 'La Tour Eiffel',
    content: "La Tour Eiffel est le symbole de Paris. Elle a été construite par Gustave Eiffel pour l'Exposition universelle de 1889. Elle mesure 330 mètres de hauteur. Aujourd'hui, c'est l'un des monuments les plus visités au monde.",
    translation: "埃菲尔铁塔是巴黎的象征。它是由古斯塔夫·埃菲尔为1889年世界博览会建造的。它高330米。如今，它是世界上参观人数最多的古迹之一。",
    keywords: ['Symbole', 'Construite', 'Hauteur', 'Monuments']
  },
  {
    id: 'r_2',
    title: 'La Cuisine Française',
    content: "La cuisine française est célèbre dans le monde entier. Les Français aiment manger du pain, du fromage et boire du vin. Le repas est un moment important pour la famille et les amis.",
    translation: "法国菜闻名世界。法国人喜欢吃面包、奶酪和喝葡萄酒。用餐是家人和朋友相聚的重要时刻。",
    keywords: ['Célèbre', 'Pain', 'Fromage', 'Repas']
  },
  // Logic to fill up to 20 articles
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `r_${i + 3}`,
    title: `Lecture ${i + 3} : La Culture Française`,
    content: `Ceci est le texte de l'article numéro ${i + 3}. La France est un pays riche en histoire et en culture. Il y a beaucoup de musées, de châteaux et de beaux paysages à découvrir. Paris est la capitale.`,
    translation: `这是第 ${i + 3} 篇文章。法国是一个历史和文化丰富的国家。有许多博物馆、城堡和美丽的风景等待探索。巴黎是首都。`,
    keywords: ['Culture', 'Histoire', 'Paysages', 'Capitale']
  }))
];