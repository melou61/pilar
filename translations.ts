
const en = {
  menu: {
    home: 'Home',
    news: 'News',
    beaches: 'Beaches',
    sightseeing: 'Sightseeing',
    activities: 'Activities',
    dining: 'Gastronomy',
    shopping: 'Shopping',
    health: 'Health',
    services: 'Town Hall',
    events: 'Events',
    forum: 'Forum',
    title: 'Explore',
    ai: 'AI Guide',
    profile: 'Profile',
    map: 'Map'
  },
  hero: {
    subtitle: 'Experience the Mediterranean lifestyle at its finest in the heart of Costa Blanca.',
    location: 'Alicante, Spain',
    sun: '300+ Days of Sun',
    beaches: 'Pristine Beaches',
    events: 'Live Events',
    commerce: 'Shopping'
  },
  sections: {
    tradition: { title: 'Living Tradition', desc: 'Local festivals and parades.' },
    nearby: 'Your surroundings',
    fullMap: 'Full Map',
    beaches: { title: 'Mediterranean Coast', desc: 'Crystal clear waters and gold sand.' },
    events: { title: 'Events', desc: 'Upcoming highlights in our town.' },
    activities: { title: 'Activities', desc: 'Fun things to do in Pilar.' },
    dining: { title: 'Gastronomy', desc: 'Tastes of the Mediterranean.' },
    shopping: { title: 'Shopping', desc: 'Best local businesses.' }
  },
  beaches_page: {
    title: 'Our Beaches',
    subtitle: 'Kilometers of gold sand and clear waters.',
    list: {
      milpalmeras: { name: 'Mil Palmeras', desc: 'Famous for its high-quality sand and vibrant atmosphere.' },
      higuericas: { name: 'Las Higuericas', desc: 'A natural paradise with dunes and crystalline waters.' },
      conde: { name: 'El Conde', desc: 'A family-friendly beach next to the historic Watchtower.' }
    }
  },
  sightseeing_page: {
    title: 'Culture & Heritage',
    subtitle: 'Discover the rich history of Pilar de la Horadada.',
    timeline: {
      past: { title: 'Historical Roots', desc: 'From Roman times to the defensive towers.' },
      present: { title: 'A Modern Town', desc: 'A thriving community in the heart of the coast.' },
      future: { title: 'Sustainable Future', desc: 'Building a greener tomorrow together.' }
    },
    golf: { title: 'Lo Romero Golf', desc: 'The famous "Golf Island" course awaits you.' },
    nature: { title: 'Natural Parks', desc: 'Explore the Pinar de Campoverde trails.' },
    connectivity: { title: 'Strategic Location', desc: 'Close to major airports and cities.' }
  },
  events_data: {
    f1: {
      title: 'Pilar Patronal Festivals',
      category: 'TRADITION',
      date: 'Oct 1 - 21, 2025',
      location: 'City Center & Fairground',
      desc: 'Our most beloved festivals with flower offerings and float parades.',
      long: 'October is the golden month of Pilar. Enjoy the Flower Offering, the great Float Parade and the Charangas that run through the center. Live music every night at the fairground.'
    },
    f2: {
      title: 'Charangas Parade',
      category: 'FESTIVAL',
      date: 'August 2025',
      location: 'Calle Mayor',
      desc: 'The craziest brass band contest of the summer. Music and humor!',
      long: 'Local clubs and guest bands parade through Pilar in a display full of rhythm, costumes and lots of laughter.'
    }
  },
  business: {
    details: 'Business Details',
    history: 'Our Story',
    featured: 'Must-Try Items',
    hours: 'Hours & Contact',
    weekdays: 'Mon - Fri',
    weekend: 'Weekend'
  },
  common: {
    sponsored: 'Featured',
    searchPlaceholder: 'Search...',
    noResults: 'No results found',
    back: 'Back',
    share: 'Share',
    save: 'Save',
    addToCalendar: 'Add to Agenda',
    details: 'View Details',
    open: 'Open',
    closed: 'Closed',
    nearby: 'Around you',
    fullMap: 'Full Map'
  },
  ai_guide: {
    title: 'PH Concierge',
    subtitle: 'Your personal AI guide.',
    placeholder: 'Ask me anything about Pilar...',
    welcome: 'Welcome! I am your PH Concierge. How can I help you discover Pilar today?',
    thinking: 'Searching...',
    online: 'Online',
    system: 'You are PH Concierge, official ambassador of Pilar de la Horadada. You must ALWAYS answer in the same language as the user. Provide helpful tourism information about beaches, restaurants, and events in Pilar de la Horadada.',
    suggestions: ["Best restaurants?", "Cultural sites?", "Beach info?"]
  },
  citizen_services: {
    title: 'Pilar 24h',
    subtitle: 'Municipal management at your fingertips.',
    appointment: 'Appointment',
    incidents: 'Incidents',
    report: 'Report to Town Hall',
    frequent: 'Frequent Tasks',
    status: 'Track Status',
    certificate: 'Registration Certificate',
    taxes: 'Taxes & Payments',
    licenses: 'Building Licenses'
  },
  footer: {
    contact: 'Contact Us',
    links: 'Quick Links',
    follow: 'Follow Us',
    officeName: 'Tourist Information Office',
    addressLine1: 'Plaza Campoamor, 2',
    addressLine2: '03190 Pilar de la Horadada',
    addressLine3: 'Alicante, Spain',
    desc: 'Pilar de la Horadada: Southern jewel of the Costa Blanca.',
    rights: '© 2025 PH Tourism Board.'
  },
  auth: { title: 'Access', logout: 'Logout' },
  share: { title: 'Share', subtitle: 'Share this with your friends', copyLink: 'Copy Link', copied: 'Copied!', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'Twitter', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } }
};

const es = {
  ...en,
  menu: {
    home: 'Inicio',
    news: 'Noticias',
    beaches: 'Playas',
    sightseeing: 'Cultura',
    activities: 'Qué Hacer',
    dining: 'Gastronomía',
    shopping: 'Compras',
    health: 'Salud',
    services: 'Ayuntamiento',
    events: 'Agenda',
    forum: 'Foro',
    title: 'Explorar',
    ai: 'Guía IA',
    profile: 'Perfil',
    map: 'Mapa'
  },
  hero: {
    ...en.hero,
    subtitle: 'Vive la esencia del Mediterráneo en el corazón de la Costa Blanca.'
  },
  sections: {
    tradition: { title: 'Tradición Viva', desc: 'Fiestas y charangas pilareras.' },
    nearby: 'Tu entorno',
    fullMap: 'Mapa Completo',
    beaches: { title: 'Costa Mediterránea', desc: 'Aguas cristalinas y arena dorada.' },
    events: { title: 'Eventos', desc: 'Lo mejor de nuestra agenda cultural.' },
    activities: { title: 'Actividades', desc: 'Cosas divertidas que hacer.' },
    dining: { title: 'Gastronomía', desc: 'Sabores del Mediterráneo.' },
    shopping: { title: 'Compras', desc: 'Los mejores comercios.' }
  },
  beaches_page: {
    title: 'Nuestras Playas',
    subtitle: 'Kilómetros de arena dorada y aguas cristalinas.',
    list: {
      milpalmeras: { name: 'Mil Palmeras', desc: 'Famosa por su arena de alta calidad y su ambiente vibrante.' },
      higuericas: { name: 'Las Higuericas', desc: 'Un paraíso natural con dunas y aguas cristalinas.' },
      conde: { name: 'El Conde', desc: 'Playa familiar junto a la histórica Torre Vigía.' }
    }
  },
  sightseeing_page: {
    title: 'Cultura y Patrimonio',
    subtitle: 'Descubre la rica historia de Pilar de la Horadada.',
    timeline: {
      past: { title: 'Raíces Históricas', desc: 'Desde la época romana hasta las torres defensivas.' },
      present: { title: 'Un Pueblo Moderno', desc: 'Una comunidad próspera en el corazón de la costa.' },
      future: { title: 'Futuro Sostenible', desc: 'Construyendo un mañana más verde juntos.' }
    },
    golf: { title: 'Lo Romero Golf', desc: 'El famoso campo "Isla del Golf" te espera.' },
    nature: { title: 'Parques Naturales', desc: 'Explora las rutas del Pinar de Campoverde.' },
    connectivity: { title: 'Ubicación Estratégica', desc: 'Cerca de los principales aeropuertos y ciudades.' }
  },
  events_data: {
    f1: {
      title: 'Fiestas Patronales del Pilar',
      category: 'TRADICIÓN',
      date: '1 - 21 Octubre 2025',
      location: 'Centro Urbano y Recinto Ferial',
      desc: 'Nuestras fiestas más queridas con ofrenda de flores y desfiles de carrozas.',
      long: 'Octubre es el mes dorado del Pilar. Disfruta de la Ofrenda de Flores, el gran desfile de Carrozas y las Charangas que recorren el centro. Música en directo cada noche en el recinto ferial.'
    },
    f2: {
      title: 'Desfile de Charangas',
      category: 'FIESTA',
      date: 'Agosto 2025',
      location: 'Calle Mayor',
      desc: 'El concurso de charangas más loco del verano. ¡Música y humor!',
      long: 'Las peñas locales y bandas invitadas recorren el Pilar en un desfile lleno de ritmo, disfraces y mucha risa.'
    }
  },
  business: {
    details: 'Detalles del Negocio',
    history: 'Nuestra Historia',
    featured: 'Imprescindibles',
    hours: 'Horarios y Contacto',
    weekdays: 'Lunes - Viernes',
    weekend: 'Fines de Semana'
  },
  common: { ...en.common, back: 'Volver', details: 'Ver ficha', open: 'Abierto', closed: 'Cerrado', addToCalendar: 'Agendar', nearby: 'Tu entorno', fullMap: 'Mapa Completo' },
  ai_guide: {
    title: 'PH Concierge',
    subtitle: 'Tu guía personal IA.',
    placeholder: 'Pregúntame lo que quieras sobre el Pilar...',
    welcome: '¡Bienvenido! Soy tu PH Concierge. ¿Cómo puedo ayudarte a descubrir el Pilar hoy?',
    thinking: 'Buscando...',
    online: 'En Línea',
    system: 'Eres PH Concierge, embajador oficial de Pilar de la Horadada. Debes responder SIEMPRE en el mismo idioma que el usuario. Proporciona información turística útil sobre playas, restaurantes y eventos en Pilar de la Horadada.',
    suggestions: ["¿Mejores restaurantes?", "¿Sitios culturales?", "¿Info playas?"]
  },
  footer: {
    contact: 'Contacto',
    links: 'Enlaces Rápidos',
    follow: 'Síguenos',
    officeName: 'Oficina de Turismo',
    addressLine1: 'Plaza Campoamor, 2',
    addressLine2: '03190 Pilar de la Horadada',
    addressLine3: 'Alicante, España',
    desc: 'Pilar de la Horadada: Joya del sur de la Costa Blanca.',
    rights: '© 2025 Concejalía de Turismo de Pilar de la Horadada.'
  },
  auth: { title: 'Acceso', logout: 'Cerrar Sesión' },
  share: { ...en.share, title: 'Compartir', subtitle: 'Comparte esto con tus amigos' }
};

const zh = {
  ...en,
  menu: {
    home: '首页',
    news: '新闻资讯',
    beaches: '海滩',
    sightseeing: '文化观光',
    activities: '休闲活动',
    dining: '特色美食',
    shopping: '购物',
    health: '健康',
    services: '市政服务',
    events: '活动日程',
    forum: '论坛',
    title: '探索发现',
    ai: 'AI 导游',
    profile: '个人中心',
    map: '地图'
  },
  hero: {
    subtitle: '在科斯塔布兰卡的核心地带，体验最纯正的地中海生活方式。',
    location: '西班牙，阿利坎特',
    sun: '300 多个晴天',
    beaches: '纯净海滩',
    events: '精彩活动',
    commerce: '购物中心'
  },
  sections: {
    tradition: { title: '活态文化传承', desc: '当地节日与音乐游行。' },
    nearby: '周边探索',
    fullMap: '完整地图',
    beaches: { title: '地中海海岸', desc: '清澈的海水与金色的沙滩。' },
    events: { title: '精彩活动', desc: '我们小镇近期的文化看点。' },
    activities: { title: '休闲活动', desc: '在皮拉尔可以做的有趣事情。' },
    dining: { title: '特色美食', desc: '地中海的味道。' },
    shopping: { title: '购物', desc: '当地最好的商家。' }
  },
  beaches_page: {
    title: '我们的海滩',
    subtitle: '数公里的金沙和清澈的海水。',
    list: {
      milpalmeras: { name: '千棕榈海滩 (Mil Palmeras)', desc: '以其高质量的沙子和充满活力的氛围而闻名。' },
      higuericas: { name: '拉斯希格里卡斯 (Las Higuericas)', desc: '拥有沙丘和清澈海水的自然天堂。' },
      conde: { name: '埃尔孔德 (El Conde)', desc: '历史悠久的瞭望塔旁的家庭友好型海滩。' }
    }
  },
  sightseeing_page: {
    title: '文化与遗产',
    subtitle: '探索皮拉尔·德·拉·奥拉达达的丰富历史。',
    timeline: {
      past: { title: '历史根源', desc: '从罗马时代到防御塔。' },
      present: { title: '现代化城镇', desc: '位于海岸核心地带的繁荣社区。' },
      future: { title: '可持续的未来', desc: '共同建设更绿色的明天。' }
    },
    golf: { title: 'Lo Romero 高尔夫球场', desc: '著名的“高尔夫岛”球场正等着您。' },
    nature: { title: '自然公园', desc: '探索坎波韦德松树林的步道。' },
    connectivity: { title: '战略位置', desc: '靠近各大机场和城市。' }
  },
  events_data: {
    f1: {
      title: '皮拉尔主保圣人庆典',
      category: '传统文化',
      date: '2025年10月1日至21日',
      location: '市中心及游乐场',
      desc: '我们最受喜爱的节日，包括献花仪式和花车巡游。',
      long: '十月是皮拉尔的黄金月份。享受献花仪式、盛大的花车巡游以及穿梭在市中心的铜管乐队（Charangas）。游乐场每晚都有现场音乐。'
    },
    f2: {
      title: '铜管乐队大巡游',
      category: '节日庆典',
      date: '2025年8月',
      location: '主街 (Calle Mayor)',
      desc: '夏季最疯狂的铜管乐队比赛。音乐与幽默的完美结合！',
      long: '当地社团和受邀乐队在皮拉尔巡游，展示充满节奏感、奇装异服和欢声笑语的表演。'
    }
  },
  ai_guide: {
    title: 'PH 礼宾',
    subtitle: '您的个人 AI 导游。',
    placeholder: '问我关于皮拉尔的任何事情...',
    welcome: '欢迎！我是您的 PH 礼宾。今天我能如何帮您探索皮拉尔？',
    thinking: '搜索中...',
    online: '在线',
    system: '您是 PH 礼宾，皮拉尔·德·拉·奥拉达达的官方大使。您必须始终使用与用户相同的语言回答。提供关于皮拉尔·德·拉·奥拉达达海滩、餐厅和活动的有用旅游信息。',
    suggestions: ["最好的餐厅？", "文化遗址？", "海滩信息？"]
  },
  footer: {
    contact: '联系我们',
    links: '快速链接',
    follow: '关注我们',
    officeName: '旅游资讯办公室',
    addressLine1: 'Plaza Campoamor, 2',
    addressLine2: '03190 皮拉尔·德·拉·奥拉达达',
    addressLine3: '西班牙，阿利坎特',
    desc: '皮拉尔·德·拉·奥拉达达：科斯塔布兰卡南部的地中海明珠。',
    rights: '© 2025 皮拉尔·德·拉·奥拉达达旅游局。'
  },
  share: { ...en.share, title: '分享', subtitle: '与好友分享' }
};

const placeholders: any = {};
['ca', 'fr', 'de', 'it', 'pt', 'ja', 'ru', 'ar', 'uk', 'eu', 'gl'].forEach(code => {
  placeholders[code] = { ...en };
});

export const translations = {
  en, es, zh, ...placeholders
};
