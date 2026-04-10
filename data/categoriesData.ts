
export interface ArticleBlock {
  id?: string;
  title: string;
  text?: string;
  image?: string;
  type: 'card' | 'test' | 'info' | 'ornament';
  ornamentColor?: string;
}

export interface CategoryData {
  id: string;
  title: string;
  starIcon: string;
  templateId: number;
  blocks: ArticleBlock[];
}

const photoBase = 'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/';
const iconBase = 'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/';


export const categoriesData: Record<string, CategoryData> = {
  'архитектура': {
    id: 'архитектура',
    title: 'АРХИТЕКТУРА',
    starIcon: `${iconBase}Architecture.png`,
    templateId: 1,
    blocks: [
      {
        id: 'архитектура',
        title: 'Традиционные элементы в храмовых комплексах',
        image: `${photoBase}Architecture_1.jpg`,
        type: 'card'
      },
      {
        id: 'архитектура',
        title: 'Топ-5 мест в Бангкоке, которые Вам стоит увидеть!',
        type: 'info'
      },
      {
        id: 'архитектура',
        title: 'Какой храм Вам стоит посетить?',
        image: `${photoBase}Architecture%20_2.jpg`,
        type: 'test'
      },
      {
        id: 'архитектура',
        title: 'БУДДИЗМ В АРХИТЕКТУРЕ',
        text: 'Тайская архитектура известна своими изысканными храмами с характерными золотыми шпилями, сложными резьбами и красочными мозаиками отражающими богатую культурную и...',
        image: `${photoBase}Architecture_3.jpg`,
        type: 'card'
      },
      {
        id: 'архитектура',
        title: 'Почему тайские храмы украшены золотом?',
        type: 'info'
      },
      {
        id: 'архитектура',
        title: 'ИЗВЕСТНЫЕ АРХИТЕКТОРЫ ТАИЛАНДА',
        text: 'Архитекторы Таиланда искусно сочетают традиционные элементы с современными тенденциями, создавая уникальные здания, которые отражают культурное наследие и инновационный дух страны...',
        type: 'info'
      }
    ]
  },
  'аюрведа': {
    id: 'аюрведа',
    title: 'АЮРВЕДА',
    starIcon: `${iconBase}Ayurveda.png`,
    templateId: 2,
    blocks: [
      {
        id: 'ayurveda',
        title: 'Какие процедуры стоит посетить именно Вам?',
        image: `${photoBase}Ayurveda_1.jpg`,
        type: 'test'
      },
      {
        id: 'ayurveda',
        title: 'АЮРВЕДА В КУЛЬТУРЕ ТАИЛАНДА',
        text: 'Аюрведа оказала влияние на традиционную тайскую медицину, сочетая свои принципы с местными практиками, такими как массаж и использование трав для достижения гармонии тела и духа...',
        image: `${photoBase}Ayurveda_2.jpg`,
        type: 'card'
      },
      {
        id: 'ayurveda',
        title: 'Почему аюрведа так популярна?',
        type: 'info'
      },
      {
        id: 'ayurveda',
        title: 'АЮВЕРДИЧЕСКИЕ ПРАКТИКИ',
        text: 'Аюрведические практики включают использование трав, диету, йогу и медитацию для достижения баланса между телом, умом и духом...',
        type: 'info'
      },
      {
        id: 'ayurveda',
        title: 'Что такое тайская аюрведа? Рассказываем и показываем.',
        image: `${photoBase}Ayurveda_3.jpg`,
        type: 'card'
      },
      {
        id: 'ayurveda',
        title: 'Средства аюрведы, которые стоит привезти из Таиланда',
        type: 'info'
      }
    ]
  },
  'буддизм': {
    id: 'буддизм',
    title: 'БУДДИЗМ',
    starIcon: `${iconBase}Buddhism.png`,
    templateId: 3,
    blocks: [
      {
        id: 'buddhism',
        title: 'На сколько хорошо Вы знаете буддизм?',
        image: `${photoBase}Buddhism_3.jpg`,
        type: 'test'
      },
      {
        id: 'buddhism',
        title: 'БУДДИЗМ В СОВРЕМЕННОМ ТАИЛАНДЕ',
        text: 'Буддизм в современном Таиланде играет центральную роль в культуре и обществе, пронизывая повседневную жизнь людей через практики, обряды и праздники...',
        image: `${photoBase}Buddhism_1.jpg`,
        type: 'card'
      },
      {
        id: 'buddhism',
        title: 'Почему буддизм так важен для тайцев?',
        type: 'info'
      },
      {
        id: 'buddhism',
        title: 'МОНАХИ',
        text: 'Буддийские монахи в Таиланде следуют строгим правилам, посвящая свою жизнь медитации, обучению и служению обществу...',
        type: 'info'
      },
      {
        id: 'buddhism',
        title: 'Буддизм. Главное, что нужно знать.',
        image: `${photoBase}Buddhism_2.jpg`,
        type: 'card'
      },
      {
        id: 'buddhism',
        title: 'Развеиваем слухи о буддизме и буддистах',
        type: 'info'
      }
    ]
  },
  'гастрономия': {
    id: 'гастрономия',
    title: 'ГАСТРОНОМИЯ',
    starIcon: `${iconBase}Gastronomy.png`,
    templateId: 4,
    blocks: [
      {
        id: 'food_tips',
        title: 'Какое блюдо стоит попробовать именно Вам?',
        image: `${photoBase}Gastronomy_2.jpg`,
        type: 'test'
      },
      {
        id: 'food_tips',
        title: 'ТОМ ЯМ. ИСТОРИЯ БЛЮДА',
        text: 'Том ям — это острый и кислый тайский суп, приготовленный на основе бульона с креветками, грибами, лимонной травой и лаймом...',
        image: `${photoBase}Gastronomy_3.jpg`,
        type: 'card'
      },
      {
        id: 'food_tips',
        title: 'Как приготовить том ям в домашних условиях',
        type: 'info'
      },
      {
        id: 'food_tips',
        title: 'СОВЕТЫ ПО ВЫБОРУ БЛЮД',
        text: 'Мы поможем вам выбрать тайские блюда, основываясь на ваших предпочтениях и запросах.',
        type: 'info'
      },
      {
        id: 'food_tips',
        title: 'Тайская кухня и её влияние на формирование пищевых привычек',
        image: `${photoBase}Gastronomy_1.jpg`,
        type: 'card'
      },
      {
        id: 'food_tips',
        title: 'Топ 5 самых популярных тайских блюд',
        type: 'info'
      }
    ]
  },
  'драматические искусства': {
    id: 'драматические искусства',
    title: 'ДРАМАТИЧЕСКИЕ ИСКУССТВА',
    templateId: 1,
    starIcon: `${iconBase}Dramatic%20Arts.png`,
    blocks: [
      {
        id: 'drama',
        title: 'Особенности драматических искусств Таиланда',
        image: `${photoBase}Dramatic%20Arts_1.jpg`,
        type: 'card'
      },
      {
        id: 'drama',
        title: 'Самые популярные драматические произведения',
        type: 'info'
      },
      {
        id: 'drama',
        title: 'На какое представление сходить именно Вам?',
        image: `${photoBase}Dramatic%20Arts_2.jpg`,
        type: 'test'
      },
      {
        id: 'drama',
        title: 'РАМАКИЕН',
        text: 'Рамакиен — тайский национальный эпос, происходящий от индийской поэмы Рамаяна. В настоящее время существует в трёх версиях, более старые версии были уничтожены во время падения Аюттхаи, столицы тайского государства...',
        image: `${photoBase}Dramatic%20Arts_3.jpg`,
        type: 'card'
      },
      {
        id: 'drama',
        title: 'Основы тайских драматических произведений',
        type: 'info'
      },
      {
        id: 'drama',
        title: 'ТЕАТР',
        text: 'В Таиланде популярны различные формы театра, такие как "Лук Танг" и "Кхон", которые представляют собой традиционные тайские танцевальные драмы, часто основанные на мифах и легендах. Эти формы искусства сочетают в себе...',
        type: 'card'
      }
    ]
  },
  'духовность': {
    id: 'духовность',
    title: 'ДУХОВНОСТЬ',
    templateId: 2,
    starIcon: `${iconBase}Spirituality.png`,
    blocks: [
      {
        id: 'ancestors',
        title: 'На сколько Вы духовны по тайским меркам?',
        image: `${photoBase}Spirituality_1.jpg`,
        type: 'test'
      },
      {
        id: 'ancestors',
        title: 'КУЛЬТ ПРЕДКОВ',
        text: 'Уважение к предкам и духам является важной частью тайской культуры. Многие семьи создают алтари для поклонения своим предкам...',
        image: `${photoBase}Spirituality_2.jpg`,
        type: 'card'
      },
      {
        id: 'ancestors',
        title: 'Что нужно знать о тайской духовности?',
        type: 'info'
      },
      {
        id: 'ancestors',
        title: 'ТАЙСКИЙ АЛТАРЬ',
        text: 'Тайцы регулярно проводят ритуалы на алтарях, включая подношения еды, цветов и благовоний. Это считается способом поддержания связи с предками и выражением уважения...',
        type: 'card'
      },
      {
        id: 'ancestors',
        title: 'Тайские принципы духовности. Кратко и по делу.',
        image: `${photoBase}Spirituality_3.jpg`,
        type: 'card'
      },
      {
        id: 'ancestors',
        title: 'Как духовность тайцев связана с историей страны?',
        type: 'info'
      }
    ]
  },
  'единоборства': {
    id: 'единоборства',
    title: 'ЕДИНОБОРСТВА',
    templateId: 3,
    starIcon: `${iconBase}Martial%20Arts.png`,
    blocks: [
      {
        id: 'muay_thai',
        title: 'Какой вид единоборств подходит Вам?',
        image: `${photoBase}Martial%20Art_3.jpg`,
        type: 'test'
      },
      {
        id: 'muay_thai',
        title: 'ФОРМА ДЛЯ ТАЙСКОГО БОКСА',
        text: 'Форма для тайского бокса, или муай тай, включает в себя несколько ключевых элементов, которые обеспечивают комфорт и безопасность во время тренировок и соревнований...',
        image: `${photoBase}Martial%20Art_1.jpg`,
        type: 'card'
      },
      {
        id: 'muay_thai',
        title: 'Что нужно знать о тайском боксе?',
        type: 'info'
      },
      {
        id: 'muay_thai',
        title: 'ТРЕНИРОВКИ ПО ТАЙСКОМУ БОКСУ',
        text: 'Тренировки по тайскому боксу (муай тай) включают в себя разнообразные упражнения и техники, направленные на развитие силы, выносливости, координации и боевых навыков...',
        type: 'card'
      },
      {
        id: 'muay_thai',
        title: 'История тайского бокса от начала до современности',
        image: `${photoBase}Martial%20Art_2.jpg`,
        type: 'card'
      },
      {
        id: 'muay_thai',
        title: 'Почему именно бокс?',
        type: 'info'
      }
    ]
  },
  'животные': {
    id: 'животные',
    title: 'ЖИВОТНЫЕ',
    templateId: 4,
    starIcon: `${iconBase}Animals.png`,
    blocks: [
      {
        id: 'sacred_animals',
        title: 'Какое Вы тайское животное?',
        image: `${photoBase}Animals_2.jpg`,
        type: 'test'
      },
      {
        id: 'sacred_animals',
        title: 'ЖИВОТНЫЕ И БУДДИЗМ',
        text: 'Буддизм, как философская и религиозная традиция, имеет особое отношение к животным и их роли в жизни. Буддисты стремятся проявлять сострадание и заботу о животных, избегая причинения им вреда...',
        image: `${photoBase}Animals_3.jpg`,
        type: 'card'
      },
      {
        id: 'sacred_animals',
        title: 'Какие животные священны?',
        type: 'info'
      },
      {
        id: 'sacred_animals',
        title: 'ЕСТЕСТВЕННАЯ СРЕДА',
        text: 'Естественная среда обитания тайских животных разнообразна и включает в себя различные экосистемы, такие как тропические леса, горные районы, реки и побережья...',
        type: 'info'
      },
      {
        id: 'sacred_animals',
        title: 'Каких животных можно встретить на тайских улицах?',
        image: `${photoBase}Animals_1.jpg`,
        type: 'card'
      },
      {
        id: 'sacred_animals',
        title: 'Почему в Таиланде так любят слонов?',
        type: 'info'
      }
    ]
  },
  'золото': {
    id: 'золото',
    title: 'ЗОЛОТО',
    templateId: 1,
    starIcon: `${iconBase}Gold.png`,
    blocks: [
      {
        id: 'gold',
        title: 'Золото как символ и атрибут. Значение и важность',
        image: `${photoBase}Gold_1.jpg`,
        type: 'card'
      },
      {
        id: 'gold',
        title: 'Почему тайцы выбирают золото?',
        type: 'info'
      },
      {
        id: 'gold',
        title: 'Какое золотое украшение подходит именно Вам?',
        image: `${photoBase}Gold_2.jpg`,
        type: 'test'
      },
      {
        id: 'gold',
        title: 'ЗОЛОТО И КОРОЛЕВСКАЯ СЕМЬЯ',
        text: 'Золото в Таиланде традиционно ассоциируется с богатством, удачей и благополучием. Оно широко используется в украшениях, ритуалах и церемониях...',
        image: `${photoBase}Gold_3.jpg`,
        type: 'card'
      },
      {
        id: 'gold',
        title: 'Экономика и золото',
        type: 'info'
      },
      {
        id: 'gold',
        title: 'ЗОЛОТО И ХРАМЫ',
        text: 'Золотые статуи Будды и храмы, украшенные золотом, играют важную роль в буддийской практике и культуре страны.',
        type: 'card'
      }
    ]
  },
  'инструменты': {
    id: 'инструменты',
    title: 'ИНСТРУМЕНТЫ',
    templateId: 2,
    starIcon: `${iconBase}Instruments.png`,
    blocks: [
      {
        id: 'sau',
        title: 'На каком инструменте могли бы играть именно Вы?',
        image: `${photoBase}Instrument_1.jpg`,
        type: 'test'
      },
      {
        id: 'sau',
        title: 'САУ',
        text: 'Струнный музыкальный инструмент, на котором играют смычком. Тело сау изготавливается из половинки скорлупы кокоса...',
        image: `${photoBase}Instrument_2.jpg`,
        type: 'card'
      },
      {
        id: 'sau',
        title: 'Всё про пипхат',
        type: 'info'
      },
      {
        id: 'sau',
        title: 'МУЗЫКА В КУЛЬТУРЕ',
        text: 'Тайская национальная музыка не такая популярная, а в последнее время ее вовсе можно услышать по большей части только на специальных концертах и этнических фестивалях. Но именно поэтому традиционная музыка Таиланда ценится...',
        type: 'card'
      },
      {
        id: 'sau',
        title: 'История музыкальных инструментов Таиланда',
        image: `${photoBase}Instrument_3.jpg`,
        type: 'card'
      },
      {
        id: 'sau',
        title: 'Интересные факты о музыкальных инструментах',
        type: 'info'
      }
    ]
  },
  'история': {
    id: 'история',
    title: 'ИСТОРИЯ',
    templateId: 3,
    starIcon: `${iconBase}History.png`,
    blocks: [
      {
        id: 'dynasty',
        title: 'На сколько хорошо Вы знаете историю Таиланда?',
        image: `${photoBase}History_3.jpg`,
        type: 'test'
      },
      {
        id: 'dynasty',
        title: 'КОРОЛЕВСКАЯ ДИНАСТИЯ В ИСТОРИИ',
        text: 'Королевская династия в Таиланде, известная как династия Чакри, была основана в 1782 году королем Рамой I. Она сыграла ключевую роль в формировании современного тайского государства, проводя...',
        image: `${photoBase}History_1.jpg`,
        type: 'card'
      },
      {
        id: 'dynasty',
        title: 'Самые главные события в истории Таиланда',
        type: 'info'
      },
      {
        id: 'dynasty',
        title: 'ЗНАЧЕНИЕ БУДДИЗМА В ИСТОРИИ',
        text: 'Буддизм играет центральную роль в истории Таиланда, формируя культурные, social и политические аспекты жизни страны. С момента принятия буддизма в XIII веке он стал основой тайской идентичности, влияя на...',
        type: 'card'
      },
      {
        id: 'dynasty',
        title: 'История Таиланда кратко: всё что нужно знать',
        image: `${photoBase}History_2.jpg`,
        type: 'card'
      },
      {
        id: 'dynasty',
        title: 'Самые интересные факты из истории Таиланда',
        type: 'info'
      }
    ]
  },
  'йога': {
    id: 'йога',
    title: 'ЙОГА',
    templateId: 4,
    starIcon: `${iconBase}Yoga.png`,
    blocks: [
      {
        id: 'yoga',
        title: 'Сколько поз из йоги Вы назовёте правильно?',
        image: `${photoBase}Yoga_2.jpg`,
        type: 'test'
      },
      {
        id: 'yoga',
        title: 'ЙОГА И БУДДИЗМ',
        text: 'Йога и буддизм имеют общие корни в индийской философии и часто пересекаются в своих практиках и учениях. Йога, как физическая и духовная дисциплина, может служить средством для достижения медитативного состояния...',
        image: `${photoBase}Yoga_3.jpg`,
        type: 'card'
      },
      {
        id: 'yoga',
        title: 'Как понять подходит ли тебе йога или нет',
        type: 'info'
      },
      {
        id: 'yoga',
        title: 'ЙОГА ДЛЯ ТАЙЦЕВ',
        text: 'Йога для тайцев может быть важной практикой для поддержания физического и психического здоровья. Она способствует улучшению гибкости, укреплению мышц и снижению стресса, что особенно актуально...',
        type: 'info'
      },
      {
        id: 'yoga',
        title: 'Йога в Таиланде – главное, что нужно знать',
        image: `${photoBase}Yoga_1.jpg`,
        type: 'card'
      },
      {
        id: 'yoga',
        title: 'Топ-5 самых простых поз для начинающих в йоге',
        type: 'info'
      }
    ]
  },
  'кинематограф': {
    id: 'кинематограф',
    title: 'КИНЕМАТОГРАФ',
    templateId: 1,
    starIcon: `${iconBase}Cinema.png`,
    blocks: [
      {
        id: 'cinema',
        title: 'История тайского кинематографа. От начала и до современности',
        image: `${photoBase}Cinema_1.jpg`,
        type: 'card'
      },
      {
        id: 'cinema',
        title: 'Топ-5 популярных тайских фильмов, которые Вам стоит посмотреть',
        type: 'info'
      },
      {
        id: 'cinema',
        title: 'Сколько тайских фильмов и сериалов Вы знаете?',
        image: `${photoBase}Cinema_2.jpg`,
        type: 'test'
      },
      {
        id: 'cinema',
        title: 'ЛАКОРНЫ',
        text: '(тайск. ละคร) – это популярные тайские телесериалы, представляющие собой своеобразные мыльные оперы с высокой эмоциональностью, драматичными сюжетами, любовными историями...',
        image: `${photoBase}Cinema_3.jpg`,
        type: 'card'
      },
      {
        id: 'cinema',
        title: 'С какого тайского фильма стоит начать?',
        type: 'info'
      },
      {
        id: 'cinema',
        title: 'ФЕНОМЕН ПОПУЛЯРНОСТИ ЛАКОРНОВ',
        text: 'Феномен популярности лакорнов основан на их высокой эмоциональности, яркой мелодраматичности, специфических жанрах (включая популярный Boy\'s Love — BL) и доступности через стриминг...',
        type: 'card'
      }
    ]
  },
  'литература': {
    id: 'литература',
    title: 'ЛИТЕРАТУРА',
    templateId: 2,
    starIcon: `${iconBase}Literature.png`,
    blocks: [
      {
        id: 'yuan_phai',
        title: 'Сколько тайских авторов книг Вы знаете?',
        image: `${photoBase}Literature_1.jpg`,
        type: 'test'
      },
      {
        id: 'yuan_phai',
        title: 'ЮАН ПХАЙ',
        text: '— поэма, исторический эпос на тайском языке о соперничестве между Сиамом и Чиангмаем, которой привело к битве между государствами в 1475 году. Поэма написана вскоре после битвы в 1475 году неизвестным автором...',
        image: `${photoBase}Literature_2.jpg`,
        type: 'card'
      },
      {
        id: 'yuan_phai',
        title: 'С какой тайской книги стоит начать?',
        type: 'info'
      },
      {
        id: 'yuan_phai',
        title: 'ФОЛЬКЛОР',
        text: 'Тайский фольклор представляет собой систему традиционных верований тайского народа. Большинство произведений тайского фольклора возникло в сельской местности...',
        type: 'card'
      },
      {
        id: 'yuan_phai',
        title: 'История тайской литературы. От начала и до современности',
        image: `${photoBase}Literature_3.jpg`,
        type: 'card'
      },
      {
        id: 'yuan_phai',
        title: 'Топ-5 популярных тайских книг, которые Вам стоит прочитать',
        type: 'info'
      }
    ]
  },
  'музыка': {
    id: 'музыка',
    title: 'МУЗЫКА',
    templateId: 3,
    starIcon: `${iconBase}Music.png`,
    blocks: [
      {
        id: 'tpop',
        title: 'Сколько тайских композиторов Вы знаете?',
        image: `${photoBase}Music_3.jpg`,
        type: 'test'
      },
      {
        id: 'tpop',
        title: 'T-POP',
        text: 'Современная поп-музыка, сейчас переживает настоящий бум. Ориентирована на стиль К-пор, но с местным колоритом. Популярные артисты: Jeff Satur, Milli, BowkyLion...',
        image: `${photoBase}Music_1.jpg`,
        type: 'card'
      },
      {
        id: 'tpop',
        title: 'Тайская музыка под любое настроение',
        type: 'info'
      },
      {
        id: 'tpop',
        title: 'ЛУК-ТХУНГ',
        text: 'Самый популярный «народный» жанр. Это песни о жизни в деревне, любви и трудностях, часто под аккомпанемент электронных инструментов...',
        type: 'card'
      },
      {
        id: 'tpop',
        title: 'История тайской музыки. От начала и до современности',
        image: `${photoBase}Music_2.jpg`,
        type: 'card'
      },
      {
        id: 'tpop',
        title: 'Топ-5 популярных тайских композиторов, с которыми стоит ознакомиться',
        type: 'info'
      }
    ]
  },
  'медицина': {
    id: 'медицина',
    title: 'МЕДИЦИНА',
    templateId: 4,
    starIcon: `${iconBase}Medicine.png`,
    blocks: [
      {
        id: 'lazy_yoga',
        title: 'Какая традиционная практика нужна именно Вам?',
        image: `${photoBase}Medicine_2.jpg`,
        type: 'test'
      },
      {
        id: 'lazy_yoga',
        title: 'ОСНОВЫ МЕДИЦИНЫ',
        text: 'Тайская медицина — это уникальный микс из высокотехнологичных современных госпиталей и древних традиций оздоровления. Основана на буддийской философии и идее баланса «четырёх элементов» тела...',
        image: `${photoBase}Medicine_3.jpg`,
        type: 'card'
      },
      {
        id: 'lazy_yoga',
        title: 'Техника «ленивой йоги»',
        type: 'info'
      },
      {
        id: 'lazy_yoga',
        title: 'ТАЙСКИЙ МАССАЖ',
        text: '— это древняя система оздоровления (Нуад Боран), возникшая более 2500 лет назад. Она объединяет элементы пассивной йоги, акупрессуры и растяжки для восстановления энергетического баланса...',
        type: 'info'
      },
      {
        id: 'lazy_yoga',
        title: 'История тайской медицины. От начала и до современности',
        image: `${photoBase}Medicine_1.jpg`,
        type: 'card'
      },
      {
        id: 'lazy_yoga',
        title: 'Основы традиционной тайской медицины',
        type: 'info'
      }
    ]
  },
  'монархия': {
    id: 'монархия',
    title: 'МОНАРХИЯ',
    starIcon: `${iconBase}Monarchy.png`,
    templateId: 1,
    blocks: [
      {
        id: 'dynasty_history',
        title: 'История Королевской династии Таиланда',
        image: `${photoBase}Monarchy_1.jpg`,
        type: 'card'
      },
      {
        id: 'dynasty_history',
        title: 'Всё о форме правления в Таиланде',
        type: 'info'
      },
      {
        id: 'dynasty_history',
        title: 'Какие факты о королевской семье Вы знаете?',
        image: `${photoBase}Monarchy_2.jpg`,
        type: 'test'
      },
      {
        id: 'dynasty_history',
        title: 'ЧАКРИ',
        text: 'Основатель — король Рама I, перенесший столицу в Бангкок. Нынешний монарх — Рама X (Маха Вачиралонгкорн), взошедший на престол в 2016 году. Династия является конституционной монархией, символом единства и...',
        image: `${photoBase}Monarchy_3.jpg`,
        type: 'card'
      },
      {
        id: 'dynasty_history',
        title: 'Значимые правители в истории Таиланда',
        type: 'info'
      },
      {
        id: 'dynasty_history',
        title: 'РАМА I',
        text: 'Король Рама I был известен как талантливый государственный деятель, законодатель, поэт и буддист. Поэтому период его правления обычно называют возрождением государства и тайской культуры...',
        type: 'card'
      }
    ]
  },
  'народные промыслы': {
    id: 'народные промыслы',
    title: 'НАРОДНЫЕ ПРОМЫСЛЫ',
    starIcon: `${iconBase}Folk%20Crafts.png`,
    templateId: 2,
    blocks: [
      {
        id: 'textiles',
        title: 'Какой вид народных промыслов подойдет Вам?',
        image: `${photoBase}Folk%20Craft_1.jpg`,
        type: 'test'
      },
      {
        id: 'textiles',
        title: 'ТЕКСТИЛЬ',
        text: 'Знаменитый тайский шелк и изделия из хлопка (шарфы, саронги, одежда), выполненные в технике...',
        image: `${photoBase}Folk%20Craft_2.jpg`,
        type: 'card'
      },
      {
        id: 'textiles',
        title: 'Как народные промыслы влияют на экономику страны',
        type: 'info'
      },
      {
        id: 'textiles',
        title: 'КЕРАМИКА',
        text: 'Пятицветный фарфор «Бенжаронг» (ранее королевский), посуда в стиле «селадон» (нежно-зеленая глазурь) и разнообразные керамические фигурки...',
        type: 'card'
      },
      {
        id: 'textiles',
        title: 'Все виды традиционных народных промыслов Таиланда',
        image: `${photoBase}Folk%20Craft_3.webp`,
        type: 'card'
      },
      {
        id: 'textiles',
        title: 'Резьба по дерево как традиционный вид промыслов',
        type: 'info'
      }
    ]
  },
};
