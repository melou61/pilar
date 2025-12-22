
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
  { code: 'mr', label: 'मরাঠি', flag: '🇮🇳' },
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
  { code: 'hy', label: 'Հայերեն', flag: '🇦🇲' },
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

const UI_RESOURCES: Record<string, any> = {
  es: { 
    m: ['Inicio', 'Noticias', 'Playas', 'Patrimonio', 'Experiencias', 'Gastronomía', 'Tiendas', 'Salud', 'Servicios', 'Eventos', 'Foro', 'PH Explorar', 'Guía IA', 'Perfil', 'Mapa', 'Admin'], 
    c: ['Patrocinado', 'Sin resultados', 'Volver', 'Compartir', 'Detalles', 'Abierto', 'Cerrado', 'Mapa', 'Cerca', 'Buscar...', 'Añadir', 'Subir', 'Copiar', 'Copiado'], 
    h: 'Paraíso mediterráneo.', 
    s: ['Sede Electrónica', 'Ayuntamiento 24h', 'Cita Previa', 'Incidencias', 'Reportar', 'Trámites', 'Certificados', 'Impuestos', 'Licencias'],
    hp: ['Pilar Vivo', 'Actualidad Local', 'Noticias del Pilar', 'Comunidad Participativa', 'Tu voz importa en el municipio.', 'Pilar en 15s', 'Vistas', 'Galería', 'Momentos', 'Amanecer en Las Higuericas', 'Ruta por Río Seco', 'Tarde de Compras', 'Fiestas del Pilar'],
    f: ['Contacto', 'Enlaces de interés', 'Síguenos', 'La App oficial del municipio.', 'Oficina de Turismo', 'Calle Mayor, 1', '03190', 'Alicante, España', 'Todos los derechos reservados'],
    search: { badge: 'Buscador Inteligente', title1: 'PILAR DE LA', title2: 'HORADADA', subtitle1: 'Encuentra comercios, eventos', subtitle2: 'y servicios municipales.', placeholder: '¿Qué buscas hoy?' },
    ai: { welcome: 'Hola, soy tu conserje virtual de Pilar de la Horadada. ¿En qué puedo ayudarte?', system: 'Eres PH Concierge, la guía oficial de Pilar de la Horadada.', suggestions: ['¿Dónde comer?', 'Playas hoy', 'Eventos'] },
    ed: { 
      'fiestas-patronales': { title: 'Fiestas del Pilar', category: 'TRADICIÓN', date: 'Octubre 2025', location: 'Centro Urbano', desc: 'Carrozas y ofrendas tradicionales.', badge: 'Interés Turístico' },
      'semana-santa': { title: 'Semana Santa', category: 'RELIGIOSO', date: 'Abril 2025', location: 'Calles del Centro', desc: 'Procesiones solemnes con tallas de Sánchez Lozano.' }
    },
    forum: { title: 'Foro Comunitario', subtitle: 'Conecta con tus vecinos', create: 'Nueva Publicación', categories: ['General', 'Recomendaciones', 'Mercadillo', 'Mascotas'], empty: 'No hay hilos todavía.', likes: 'Me gusta', replies: 'Respuestas' },
    profile: { title: 'Mi Espacio', logout: 'Cerrar Sesión', favorites: 'Mis Favoritos', alerts: 'Mis Alertas', my_events: 'Agenda Personal', no_favs: 'Aún no tienes favoritos.' }
  },
  en: { 
    m: ['Home', 'News', 'Beaches', 'Heritage', 'Experiences', 'Dining', 'Shops', 'Health', 'Services', 'Events', 'Forum', 'PH Explore', 'AI Guide', 'Profile', 'Map', 'Admin'], 
    c: ['Sponsored', 'No results', 'Back', 'Share', 'Details', 'Open', 'Closed', 'Full Map', 'Near you', 'Search...', 'Add', 'Upload', 'Copy', 'Copied'], 
    h: 'Mediterranean paradise.', 
    s: ['Digital Portal', 'Town Hall 24h', 'Appointment', 'Incidents', 'Report', 'Procedures', 'Certificates', 'Taxes', 'Licenses'],
    hp: ['Living Pilar', 'Local News', 'Latest from Pilar', 'Active Community', 'Your voice matters in town.', 'Pilar in 15s', 'Views', 'Gallery', 'Momentos', 'Sunrise at Higuericas', 'Rio Seco Route', 'Shopping Day', 'Town Festivals'],
    f: ['Contact', 'Useful Links', 'Follow Us', 'The official town application.', 'Tourism Office', '1 Mayor St.', '03190', 'Alicante, Spain', 'All rights reserved'],
    search: { badge: 'Smart Search', title1: 'PILAR DE LA', title2: 'HORADADA', subtitle1: 'Find shops, events', subtitle2: 'and citizen services.', placeholder: 'What are you looking for?' },
    ai: { welcome: 'Hello, I am your Pilar de la Horadada virtual concierge. How can I help you today?', system: 'You are PH Concierge, the official guide for Pilar de la Horadada.', suggestions: ['Where to eat?', 'Beaches today', 'Events'] },
    ed: { 
      'fiestas-patronales': { title: 'Pilar Festivals', category: 'TRADITION', date: 'October 2025', location: 'Town Centre', desc: 'Traditional floats and offerings.', badge: 'Tourist Interest' },
      'semana-santa': { title: 'Holy Week', category: 'RELIGIOUS', date: 'April 2025', location: 'Downtown Streets', desc: 'Solemn processions with Sánchez Lozano sculptures.' }
    },
    forum: { title: 'Community Forum', subtitle: 'Connect with neighbors', create: 'New Post', categories: ['General', 'Recommendations', 'Marketplace', 'Pets'], empty: 'No threads yet.', likes: 'Likes', replies: 'Replies' },
    profile: { title: 'My Space', logout: 'Logout', favorites: 'My Favorites', alerts: 'My Alerts', my_events: 'Personal Agenda', no_favs: 'No favorites yet.' }
  }
};

const createLang = (code: string, langLabel: string): any => {
  const data = UI_RESOURCES[code] || UI_RESOURCES.en;
  const en = UI_RESOURCES.en;
  
  const m = data.m || en.m;
  const c = data.c || en.c;
  const s = data.s || en.s;
  const h = data.h || en.h;
  const hp = data.hp || en.hp;
  const f = data.f || en.f;
  const srch = data.search || en.search;
  const ai = data.ai || en.ai;
  const ed = data.ed || en.ed;
  const fr = data.forum || en.forum;
  const pr = data.profile || en.profile;

  return {
    menu: { home: m[0], news: m[1], beaches: m[2], sightseeing: m[3], activities: m[4], dining: m[5], shopping: m[6], health: m[7], services: m[8], events: m[9], forum: m[10], title: m[11], ai: m[12], profile: m[13], map: m[14], admin: m[15] },
    common: { sponsored: c[0], noResults: c[1], back: c[2], share: c[3], details: c[4], open: c[5], closed: c[6], fullMap: c[7], nearby: c[8], searchPlaceholder: c[9], addToCalendar: c[10], upload: c[11], copyLink: c[12], copied: c[13] },
    hero: { subtitle: h },
    ai_guide: { title: m[12], welcome: ai.welcome, online: 'Online', placeholder: ai.placeholder || '...', system: ai.system, suggestions: ai.suggestions },
    citizen_services: { title: s[0], subtitle: s[1], appointment: s[2], incidents: s[3], report: s[4], frequent: s[5], certificate: s[6], taxes: s[7], licenses: s[8] },
    sections: { shopping: { title: m[6], desc: m[6] }, dining: { title: m[5], desc: m[5] }, events: { title: m[9], desc: m[9] } },
    footer: { contact: f[0], links: f[1], follow: f[2], desc: f[3], rights: f[8], officeName: f[4], addressLine1: f[5], addressLine2: f[6], addressLine3: f[7] },
    home_page: { 
      pilar_vivo: hp[0], news_main: hp[1], news_featured: hp[2], community_title: hp[3], community_desc: hp[4],
      shorts_label: hp[5], shorts_big: 'Shorts', views: hp[6], gallery_label: hp[7], gallery_big: hp[8],
      ai_desc: ai.welcome, shorts_titles: [hp[9], hp[10], hp[11], hp[12]]
    },
    event_detail: { pilar_event: 'EVENTO PH', date_time: 'FECHA Y HORA', main_location: 'UBICACIÓN' },
    events_data: ed,
    beaches_page: { title: m[2], subtitle: h, coastal: 'Costa Blanca', blue_flag: 'Bandera Azul', open: 'Abierta', fact_title: 'Info', fact_desc: '4km de costa.', list: { milpalmeras: { name: 'Mil Palmeras', desc: h }, higuericas: { name: 'Las Higuericas', desc: h } } },
    sightseeing_page: { title: m[3], subtitle: h, list: { 'torre-vigia': { name: 'Torre de la Horadada', desc: h } } },
    activities_page: { title: m[4], subtitle: h, list: { 'rio-seco': { name: 'Río Seco', desc: h } } },
    business: { history: 'Story' },
    search: srch,
    share: { title: 'Share', subtitle: 'Select platform', copyLink: 'Copy', copied: 'Copied!', via: 'via', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'Twitter', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } },
    forum: fr,
    profile: pr
  };
};

export const translations: Record<string, any> = {};
languages.forEach(lang => {
  translations[lang.code] = createLang(lang.code, lang.label);
});
