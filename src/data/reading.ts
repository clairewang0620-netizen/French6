import { Article } from '../types';

export const READING_DATA: Article[] = [
  // Existing r1-r10
  {
    id: 'r1',
    title: 'La Vie à Paris',
    content: "Paris est une ville magnifique. Le matin, les Parisiens aiment prendre un café et un croissant dans une boulangerie. Les rues sont toujours animées. On peut voir la Tour Eiffel de loin. C'est le symbole de la France. Le métro est très pratique pour se déplacer. Il y a beaucoup de musées comme le Louvre. La mode est aussi très importante ici. Vivre à Paris est une expérience unique.",
    translation: "巴黎是一座宏伟的城市。早晨，巴黎人喜欢在面包店喝咖啡吃羊角面包。街道总是很热闹。人们可以从远处看到埃菲尔铁塔。它是法国的象征。地铁出行非常方便。这里有很多像卢浮宫这样的博物馆。时尚在这里也很重要。在巴黎生活是一种独特的体验。",
    keywords: [
      { fr: 'Magnifique', cn: '宏伟的' },
      { fr: 'Boulangerie', cn: '面包店' },
      { fr: 'Animé', cn: '热闹的' },
      { fr: 'Symbole', cn: '象征' },
      { fr: 'Expérience', cn: '体验' }
    ]
  },
  {
    id: 'r2',
    title: 'Les Vacances en France',
    content: "En été, beaucoup de Français partent en vacances. Ils vont souvent à la mer dans le sud de la France. La Côte d'Azur est très populaire. D'autres préfèrent la montagne pour faire de la randonnée. C'est un moment pour se reposer et passer du temps en famille. On mange bien, on dort tard et on profite du soleil. Les vacances sont sacrées pour les Français.",
    translation: "夏天，许多法国人去度假。他们经常去法国南部的海边。蔚蓝海岸非常受欢迎。其他人更喜欢去山里徒步旅行。这是一个休息和与家人共度时光的时刻。人们吃得好，睡得晚，享受阳光。假期对法国人来说是神圣的。",
    keywords: [
      { fr: 'Vacances', cn: '假期' },
      { fr: 'Mer', cn: '大海' },
      { fr: 'Sud', cn: '南方' },
      { fr: 'Randonnée', cn: '徒步' },
      { fr: 'Sacré', cn: '神圣的' }
    ]
  },
  {
    id: 'r3',
    title: 'La Cuisine Française',
    content: "La gastronomie française est célèbre dans le monde entier. Chaque région a ses spécialités. Le fromage et le vin sont essentiels. Un repas traditionnel commence par une entrée, suivie d'un plat principal et d'un dessert. On prend le temps de manger. C'est un art de vivre. Les marchés locaux offrent des produits frais et délicieux.",
    translation: "法国美食闻名世界。每个地区都有自己的特色菜。奶酪和葡萄酒必不可少。传统的用餐从前菜开始，接着是主菜和甜点。人们花时间吃饭。这是一种生活的艺术。当地市场提供新鲜美味的产品。",
    keywords: [
      { fr: 'Gastronomie', cn: '美食' },
      { fr: 'Célèbre', cn: '著名的' },
      { fr: 'Spécialité', cn: '特色' },
      { fr: 'Essentiel', cn: '必不可少' },
      { fr: 'Délicieux', cn: '美味的' }
    ]
  },
  {
    id: 'r4',
    title: 'Le Travail',
    content: "En France, on travaille généralement 35 heures par semaine. L'équilibre entre vie professionnelle et vie privée est important. Il y a cinq semaines de congés payés par an. Les réunions sont fréquentes. Le déjeuner est une pause importante dans la journée de travail. On discute souvent avec ses collègues.",
    translation: "在法国，人们通常每周工作35小时。工作与生活的平衡很重要。每年有五周带薪休假。会议很频繁。午餐是工作日中重要的休息时间。人们经常与同事交谈。",
    keywords: [
      { fr: 'Généralement', cn: '通常' },
      { fr: 'Équilibre', cn: '平衡' },
      { fr: 'Congé', cn: '休假' },
      { fr: 'Fréquent', cn: '频繁的' },
      { fr: 'Collègue', cn: '同事' }
    ]
  },
  {
    id: 'r5',
    title: 'Le Sport',
    content: "Le football est le sport le plus populaire en France. L'équipe nationale est très soutenue. Le tennis et le rugby sont aussi aimés. Beaucoup de gens font du jogging ou du vélo le week-end. Le Tour de France est un événement majeur en juillet. Le sport aide à rester en bonne santé.",
    translation: "足球是法国最受欢迎的运动。国家队深受支持。网球和橄榄球也很受喜爱。许多人周末慢跑或骑自行车。环法自行车赛是七月的主要活动。运动有助于保持健康。",
    keywords: [
      { fr: 'Populaire', cn: '受欢迎的' },
      { fr: 'Soutenu', cn: '被支持' },
      { fr: 'Majeur', cn: '主要的' },
      { fr: 'Événement', cn: '事件' },
      { fr: 'Santé', cn: '健康' }
    ]
  },
  {
    id: 'r6',
    title: 'La Tour Eiffel',
    content: "La Tour Eiffel est le monument le plus célèbre de Paris. Elle a été construite en 1889 par Gustave Eiffel pour l'Exposition Universelle. Au début, beaucoup de gens ne l'aimaient pas, mais aujourd'hui, elle est adorée. Elle mesure 330 mètres de haut. On peut monter au sommet par l'ascenseur ou les escaliers. La vue sur Paris est incroyable.",
    translation: "埃菲尔铁塔是巴黎最著名的纪念碑。它由古斯塔夫·埃菲尔于1889年为世界博览会建造。起初，许多人不喜欢它，但今天，它备受喜爱。它高330米。人们可以乘电梯或走楼梯到达顶端。巴黎的景色令人难以置信。",
    keywords: [
      { fr: 'Monument', cn: '纪念碑' },
      { fr: 'Construire', cn: '建造' },
      { fr: 'Sommet', cn: '顶端' },
      { fr: 'Ascenseur', cn: '电梯' },
      { fr: 'Vue', cn: '景色' }
    ]
  },
  {
    id: 'r7',
    title: 'Le 14 Juillet',
    content: "Le 14 juillet est la fête nationale française. Elle commémore la prise de la Bastille en 1789. Ce jour-là, il y a des défilés militaires sur les Champs-Élysées. Le soir, on tire des feux d'artifice dans toutes les villes. Les gens dansent dans les rues et dans les casernes de pompiers. C'est un jour de joie et de liberté.",
    translation: "7月14日是法国国庆日。它纪念1789年攻占巴士底狱。这一天，香榭丽舍大街上有阅兵式。晚上，所有城市都会放烟花。人们在街上和消防局里跳舞。这是欢乐和自由的一天。",
    keywords: [
      { fr: 'Fête', cn: '节日' },
      { fr: 'Commémorer', cn: '纪念' },
      { fr: 'Défilé', cn: '游行' },
      { fr: 'Feu d\'artifice', cn: '烟花' },
      { fr: 'Liberté', cn: '自由' }
    ]
  },
  {
    id: 'r8',
    title: 'Les Alpes',
    content: "Les Alpes sont une grande chaîne de montagnes en Europe. Elles traversent la France, l'Italie, la Suisse et d'autres pays. Le Mont Blanc est le plus haut sommet. En hiver, les gens vont skier dans les stations. En été, c'est idéal pour la marche et l'escalade. La nature y est sauvage et belle. C'est un paradis pour les sportifs.",
    translation: "阿尔卑斯山是欧洲的一大山脉。它们穿越法国、意大利、瑞士和其他国家。勃朗峰是最高峰。冬天，人们去滑雪场滑雪。夏天，这里是徒步和攀岩的理想场所。那里的自然狂野而美丽。这是运动爱好者的天堂。",
    keywords: [
      { fr: 'Chaîne', cn: '山脉' },
      { fr: 'Sommet', cn: '顶峰' },
      { fr: 'Skier', cn: '滑雪' },
      { fr: 'Escalade', cn: '攀岩' },
      { fr: 'Sauvage', cn: '狂野' }
    ]
  },
  {
    id: 'r9',
    title: 'Le Fromage',
    content: "La France est le pays du fromage. Il en existe plus de 1000 variétés. Le Camembert, le Brie et le Roquefort sont très connus. Chaque région a son fromage typique. On le mange généralement après le plat principal et avant le dessert. On le mange avec du pain et du vin. C'est une partie importante de la culture française.",
    translation: "法国是奶酪之国。有超过1000个品种。卡门贝尔、布里和罗克福非常有名。每个地区都有其典型的奶酪。人们通常在主菜之后、甜点之前吃它。人们配着面包和酒吃。这是法国文化的重要组成部分。",
    keywords: [
      { fr: 'Variété', cn: '品种' },
      { fr: 'Typique', cn: '典型的' },
      { fr: 'Plat', cn: '菜肴' },
      { fr: 'Pain', cn: '面包' },
      { fr: 'Culture', cn: '文化' }
    ]
  },
  {
    id: 'r10',
    title: 'Le Cinéma',
    content: "Le cinéma a été inventé en France par les frères Lumière. Le festival de Cannes est l'un des plus grands festivals de cinéma au monde. Il a lieu chaque année en mai. Des stars du monde entier viennent sur la Croisette. Le cinéma français est connu pour ses films d'auteur. Il est différent des films hollywoodiens.",
    translation: "电影是由卢米埃尔兄弟在法国发明的。戛纳电影节是世界上最大的电影节之一。它每年五月举行。来自世界各地的明星来到克鲁瓦塞特大道。法国电影以其作者电影而闻名。它不同于好莱坞电影。",
    keywords: [
      { fr: 'Inventer', cn: '发明' },
      { fr: 'Festival', cn: '节日/节' },
      { fr: 'Monde', cn: '世界' },
      { fr: 'Auteur', cn: '作者' },
      { fr: 'Différent', cn: '不同' }
    ]
  },

  // New Additions r11-r15
  {
    id: 'r11',
    title: 'La Mode',
    content: "Paris est la capitale de la mode. De grandes marques comme Chanel et Dior sont françaises. La Fashion Week attire des gens du monde entier. Le style français est chic et simple. Les vêtements sont élégants mais confortables. Faire du shopping à Paris est un rêve pour beaucoup.",
    translation: "巴黎是时尚之都。香奈儿和迪奥等大品牌都是法国的。时装周吸引了来自世界各地的人们。法式风格既时尚又简约。衣服优雅而舒适。在巴黎购物是许多人的梦想。",
    keywords: [
      { fr: 'Capitale', cn: '首都' },
      { fr: 'Marque', cn: '品牌' },
      { fr: 'Attirer', cn: '吸引' },
      { fr: 'Chic', cn: '时髦' },
      { fr: 'Vêtement', cn: '衣服' }
    ]
  },
  {
    id: 'r12',
    title: 'Le TGV',
    content: "Le TGV est le Train à Grande Vitesse français. Il roule très vite, parfois à plus de 300 kilomètres par heure. Il relie les grandes villes comme Paris, Lyon et Marseille. C'est un moyen de transport confortable et écologique. Grâce au TGV, on peut traverser la France en quelques heures.",
    translation: "TGV是法国的高速列车。它跑得很快，有时超过每小时300公里。它连接巴黎、里昂和马赛等大城市。这是一种舒适且环保的交通方式。多亏了TGV，人们可以在几个小时内穿越法国。",
    keywords: [
      { fr: 'Vitesse', cn: '速度' },
      { fr: 'Rouler', cn: '行驶' },
      { fr: 'Relier', cn: '连接' },
      { fr: 'Transport', cn: '交通' },
      { fr: 'Traverser', cn: '穿越' }
    ]
  },
  {
    id: 'r13',
    title: 'Les Châteaux de la Loire',
    content: "La vallée de la Loire est célèbre pour ses châteaux. Il y a Chambord, Chenonceau et bien d'autres. Les rois de France y habitaient autrefois. Ces châteaux sont des exemples magnifiques de l'architecture de la Renaissance. Les jardins sont aussi très beaux. C'est une région classée au patrimoine mondial de l'UNESCO.",
    translation: "卢瓦尔河谷以其城堡而闻名。有香波堡、舍农索堡等等。法国国王曾经住在那里。这些城堡是文艺复兴建筑的宏伟典范。花园也很美。这是一个被列为联合国教科文组织世界遗产的地区。",
    keywords: [
      { fr: 'Vallée', cn: '山谷' },
      { fr: 'Roi', cn: '国王' },
      { fr: 'Autrefois', cn: '以前' },
      { fr: 'Architecture', cn: '建筑' },
      { fr: 'Patrimoine', cn: '遗产' }
    ]
  },
  {
    id: 'r14',
    title: 'Le Vin Français',
    content: "La France produit des vins excellents. Bordeaux, Bourgogne et Champagne sont des régions viticoles célèbres. Le vin rouge, blanc ou rosé accompagne les repas. Il faut boire avec modération. La dégustation de vin est une activité populaire. C'est un produit d'exportation important.",
    translation: "法国生产优质葡萄酒。波尔多、勃艮第和香槟是著名的葡萄酒产区。红、白或桃红葡萄酒佐餐。必须适量饮用。品酒是一项受欢迎的活动。这是一种重要的出口产品。",
    keywords: [
      { fr: 'Produire', cn: '生产' },
      { fr: 'Viticole', cn: '葡萄种植的' },
      { fr: 'Accompagner', cn: '陪伴/佐餐' },
      { fr: 'Modération', cn: '节制' },
      { fr: 'Dégustation', cn: '品尝' }
    ]
  },
  {
    id: 'r15',
    title: 'La Bretagne',
    content: "La Bretagne est une région au nord-ouest de la France. Elle a une culture celtique forte. On y mange des crêpes et des galettes. Le cidre est la boisson traditionnelle. La côte est sauvage avec des falaises et des plages. Le temps change souvent, mais les paysages sont magnifiques.",
    translation: "布列塔尼是法国西北部的一个地区。它有浓厚的凯尔特文化。人们在那里吃可丽饼和荞麦饼。苹果酒是传统饮料。海岸线很狂野，有悬崖和海滩。天气经常变化，但风景很美。",
    keywords: [
      { fr: 'Ouest', cn: '西' },
      { fr: 'Culture', cn: '文化' },
      { fr: 'Boisson', cn: '饮料' },
      { fr: 'Sauvage', cn: '狂野' },
      { fr: 'Falaise', cn: '悬崖' }
    ]
  }
];