
export interface Language {
  code: string;
  label: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', label: 'मরাठी', flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' },
  { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', label: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
  { code: 'he', label: 'עברית', flag: '🇮🇱' },
  { code: 'bg', label: 'Български', flag: '🇧🇬' },
  { code: 'no', label: 'Norsk', flag: '🇳🇴' },
  { code: 'da', label: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮' },
  { code: 'sk', label: 'Slovenčina', flag: '🇸🇰' },
  { code: 'hr', label: 'Hrvatski', flag: '🇭🇷' },
  { code: 'lt', label: 'Lietuvių', flag: '🇱🇹' },
  { code: 'sl', label: 'Slovenščina', flag: '🇸🇮' },
  { code: 'lv', label: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', label: 'Eesti', flag: '🇪🇪' },
  { code: 'sr', label: 'Српски', flag: '🇷🇸' },
  { code: 'sq', label: 'Shqip', flag: '🇦🇱' },
  { code: 'mk', label: 'Македонски', flag: '🇲🇰' },
  { code: 'ka', label: 'ქართული', flag: '🇬🇪' },
  { code: 'hy', label: 'Հայერեն', flag: '🇦🇲' },
  { code: 'az', label: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'kk', label: 'Қазақ тілі', flag: '🇰🇿' },
  { code: 'uz', label: 'Oʻzbekcha', flag: '🇺🇿' },
  { code: 'am', label: 'አማርኛ', flag: '🇪ቶ' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
  { code: 'af', label: 'Afrikaans', flag: '🇿🇦' },
  { code: 'zu', label: 'isiZulu', flag: '🇿🇦' },
  { code: 'yo', label: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ig', label: 'Igbo', flag: '🇳🇬' },
  { code: 'ha', label: 'Hausa', flag: '🇳🇬' },
  { code: 'mt', label: 'Malti', flag: '🇲🇹' },
  { code: 'is', label: 'Íslenska', flag: '🇮🇸' },
  { code: 'ga', label: 'Gaeilge', flag: '🇮🇪' },
  { code: 'km', label: 'ខ្មែរ', flag: '🇰🇭' },
  { code: 'lo', label: 'ລາວ', flag: '🇱🇦' },
  { code: 'my', label: 'မြန်မာစာ', flag: '🇲🇲' },
  { code: 'ps', label: 'پښتو', flag: '🇦🇫' },
  { code: 'tg', label: 'Тоҷикӣ', flag: '🇹🇯' },
  { code: 'ky', label: 'Кыргызча', flag: '🇰🇬' },
  { code: 'tk', label: 'Türkmençe', flag: '🇹🇲' }
];

const SLOGANS: Record<string, string> = {
  es: "Paraíso mediterráneo.",
  en: "Mediterranean paradise.",
  fr: "Paradis méditerranéen.",
  de: "Mediterranes Paradies.",
  it: "Paradiso mediterraneo.",
  pt: "Paraíso mediterrâneo.",
  ru: "Средиземноморский рай.",
  ja: "地中海の楽園。",
  ko: "지중해의 낙원.",
  zh: "地中海天堂。"
};

const UI_RESOURCES: Record<string, any> = {
  es: { 
    m: ['Inicio', 'Noticias', 'Playas', 'Patrimonio', 'Experiencias', 'Gastronomía', 'Tiendas', 'Salud', 'Servicios', 'Eventos', 'Foro', 'PH Explorar', 'Guía IA', 'Perfil', 'Mapa', 'Admin', 'PH Niños'], 
    hp: ['Pilar Vivo', 'Actualidad Local', 'Noticias del Pilar', 'Comunidad Participativa', 'Tu voz importa en el municipio.', 'Pilar en 15s', 'Vistas', 'Galería', 'Momentos', 'Amanecer en Las Higuericas', 'Ruta por Río Seco', 'Tarde de Compras', 'Fiestas del Pilar', 'Aprender'],
    s: {
      events: { title: 'Eventos y Festivales', desc: 'Descubre la agenda cultural de Pilar de la Horadada.' },
      beaches: { title: 'Playas y Costa', desc: 'Aguas cristalinas y arena fina.' },
      sightseeing: { title: 'Qué ver', desc: 'Monumentos y puntos de interés.' },
      activities: { title: 'Qué hacer', desc: 'Aventura y deporte al aire libre.' },
      dining: { title: 'Dónde comer', desc: 'Lo mejor de la gastronomía mediterránea.' },
      shopping: { title: 'Compras', desc: 'Comercio local y tradicional.' }
    }
  },
  en: { 
    m: ['Home', 'News', 'Beaches', 'Heritage', 'Experiences', 'Dining', 'Shops', 'Health', 'Services', 'Events', 'Forum', 'PH Explore', 'AI Guide', 'Profile', 'Map', 'Admin', 'PH Kids'], 
    hp: ['Living Pilar', 'Local News', 'Latest from Pilar', 'Active Community', 'Your voice matters in town.', 'Pilar in 15s', 'Views', 'Gallery', 'Momentos', 'Sunrise at Higuericas', 'Rio Seco Route', 'Shopping Day', 'Town Festivals', 'Learning'],
    s: {
      events: { title: 'Events & Festivals', desc: 'Discover the cultural agenda of Pilar de la Horadada.' },
      beaches: { title: 'Beaches & Coast', desc: 'Crystal clear waters and fine sand.' },
      sightseeing: { title: 'What to see', desc: 'Monuments and points of interest.' },
      activities: { title: 'What to do', desc: 'Adventure and outdoor sports.' },
      dining: { title: 'Where to eat', desc: 'The best of Mediterranean gastronomy.' },
      shopping: { title: 'Shopping', desc: 'Local and traditional shops.' }
    }
  }
};

const createLang = (code: string, langLabel: string): any => {
  const data = UI_RESOURCES[code] || UI_RESOURCES.en;
  const slogan = SLOGANS[code] || `Mediterranean paradise (${langLabel})`;
  
  const m = data.m || UI_RESOURCES.en.m;
  const hp = data.hp || UI_RESOURCES.en.hp;
  const s = data.s || UI_RESOURCES.en.s;

  return {
    menu: { 
        home: m[0], news: m[1], beaches: m[2], sightseeing: m[3], activities: m[4], 
        dining: m[5], shopping: m[6], health: m[7], services: m[8], events: m[9], 
        forum: m[10], title: m[11], ai: m[12], profile: m[13], map: m[14], admin: m[15], kids: m[16] 
    },
    common: { 
        sponsored: 'Patrocinado', noResults: 'Sin resultados', back: 'Volver', 
        share: 'Compartir', details: 'Detalles', open: 'Abierto', closed: 'Cerrado', 
        fullMap: 'Mapa', nearby: 'Cerca', searchPlaceholder: 'Buscar...', 
        addToCalendar: 'Añadir', upload: 'Subir', copyLink: 'Copiar', copied: 'Copiado' 
    },
    hero: { subtitle: slogan },
    sections: s,
    home_page: { 
      pilar_vivo: hp[0], news_main: hp[1], news_featured: hp[2], community_title: hp[3], community_desc: hp[4],
      shorts_label: hp[5], shorts_big: 'Shorts', views: 'Vistas', gallery_label: hp[7], gallery_big: hp[8],
      ai_desc: 'Tu asistente virtual', shorts_titles: [hp[9], hp[10], hp[11], hp[12]],
      kids_label: m[16], kids_big: hp[13]
    },
    beaches_page: {
      title: m[2], subtitle: s.beaches.desc, coastal: 'Litoral PH', blue_flag: 'Bandera Azul', open: 'Abierta', fact_title: 'Sabías que...', fact_desc: 'Nuestras playas reciben anualmente distinciones de calidad por sus servicios y limpieza.',
      list: { milpalmeras: { name: 'Mil Palmeras', desc: 'Playa urbana de gran amplitud y servicios.' }, higuericas: { name: 'Las Higuericas', desc: 'Entorno natural con dunas y pasarelas de madera.' } }
    },
    sightseeing_page: {
      title: m[3], subtitle: s.sightseeing.desc,
      list: { 'torre-vigia': { name: 'Torre de la Horadada', desc: 'Torre defensiva del siglo XVI declarada Bien de Interés Cultural.' } }
    },
    activities_page: {
      title: m[4], subtitle: s.activities.desc,
      list: { 'rio-seco': { name: 'Ruta del Río Seco', desc: 'Sendero natural que recorre el cauce erosionado del río.' } }
    },
    citizen_services: {
      title: m[8], subtitle: 'Tu Ayuntamiento a un clic.', appointment: 'Cita Previa', incidents: 'Incidencias', report: 'Reportar Problema', frequent: 'Trámites Frecuentes', certificate: 'Certificados', taxes: 'Tasas', licenses: 'Licencias de Obra'
    },
    forum: {
      title: m[10], subtitle: 'Conecta con tus vecinos y comparte experiencias.', likes: 'Me gusta', replies: 'Respuestas', categories: ['General', 'Recomendaciones', 'Mascotas', 'Mercadillo']
    },
    profile: {
      my_events: 'Mi Agenda', favorites: 'Favoritos', alerts: 'Alertas PH', logout: 'Cerrar Sesión'
    },
    share: {
      title: 'Compartir', subtitle: 'Envía este contenido a tus amigos o familiares.', copyLink: 'Copiar enlace', via: 'Vía', copied: 'Copiado', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'Twitter', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' }
    },
    ai_guide: {
      welcome: 'Hola, soy tu conserje virtual. ¿En qué puedo ayudarte hoy?', online: 'En línea', system: 'Eres PH Concierge...', suggestions: ['¿Qué tiempo hace?', 'Eventos hoy', 'Farmacia guardia'], placeholder: 'Pregunta cualquier cosa...'
    },
    event_detail: { pilar_event: 'Evento en el Pilar', date_time: 'Fecha y Hora', main_location: 'Ubicación' },
    business: { history: 'Nuestra Historia', essentials: 'Imprescindibles', schedule: 'Horarios y Contacto' },
    footer: { contact: 'Contacto', links: 'Enlaces', follow: 'Síguenos', officeName: 'Oficina de Turismo', addressLine1: 'Plaza Campoamor, 2', addressLine2: '03190 Pilar de la Horadada', addressLine3: 'Alicante, España', desc: 'Portal oficial de información turística y municipal.' },
    kids: { welcome: '¡Hola!', start: 'Empezar', back: 'Volver' }
  };
};

export const translations: Record<string, any> = {};
languages.forEach(lang => {
  translations[lang.code] = createLang(lang.code, lang.label);
});
