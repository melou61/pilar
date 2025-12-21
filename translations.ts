
/**
 * SISTEMA DE TRADUCCIÓN INTEGRAL PILAR DE LA HORADADA (70 IDIOMAS)
 * Este archivo contiene las traducciones completas para ES y EN, 
 * y mapea el resto de idiomas heredando de la base para evitar fallos de claves nulas.
 */

const es = {
  menu: { home: 'Inicio', news: 'Noticias', beaches: 'Playas', sightseeing: 'Cultura', activities: 'Ocio', dining: 'Sabor', shopping: 'Tiendas', health: 'Salud', services: 'Gestión', events: 'Agenda', forum: 'Foro', title: 'Explorar', ai: 'Guía IA', profile: 'Perfil', map: 'Mapa' },
  common: { sponsored: 'Patrocinado', noResults: 'Sin resultados', back: 'Volver', share: 'Compartir', details: 'Más info', open: 'Abierto', closed: 'Cerrado', fullMap: 'Mapa Completo', nearby: 'Cerca de ti', searchPlaceholder: 'Buscar...', addToCalendar: 'Añadir a Agenda' },
  sections: { 
    tradition: { title: 'Tradición Viva' },
    nearby: 'Tu entorno',
    fullMap: 'Mapa Completo',
    beaches: { title: 'Costa Mediterránea', desc: 'Las mejores playas de la zona.' },
    events: { title: 'Agenda Cultural', desc: 'Eventos y fiestas populares.' },
    shopping: { title: 'Compras locales', desc: 'Comercios de confianza.' },
    dining: { title: 'Sabor del Pilar', desc: 'Gastronomía y restauración.' },
    activities: { title: 'Qué hacer', desc: 'Ocio y tiempo libre.' }
  },
  hero: { subtitle: 'El paraíso mediterráneo te espera en Pilar de la Horadada.' },
  ai_guide: { title: 'PH Concierge', welcome: '¡Hola! Soy tu guía IA. ¿En qué puedo ayudarte hoy?', online: 'En Línea', placeholder: 'Pregúntame lo que quieras...', system: 'Eres PH Concierge, embajador oficial de Pilar de la Horadada. Responde en el idioma del usuario.', suggestions: ["¿Mejores playas?", "¿Dónde comer?", "¿Próximos eventos?"] },
  auth: { title: 'Acceso', logout: 'Cerrar Sesión' },
  share: { title: 'Compartir', subtitle: 'Difunde Pilar de la Horadada', copyLink: 'Copiar enlace', via: 'vía', copied: '¡Copiado!', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'X / Twitter', linkedin: 'LinkedIn', email: 'Correo', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } },
  search: { badge: 'EXPLORA EL PILAR', title1: '¿Qué buscas', title2: 'hoy?', placeholder: 'Busca playas, tapas, charangas...', subtitle1: 'Todo lo que necesitas', subtitle2: 'al alcance de tu mano' },
  citizen_services: { title: 'Servicios al Ciudadano', subtitle: 'Tu ayuntamiento, más cerca que nunca.', appointment: 'Cita Previa', incidents: 'Incidencias', report: 'Enviar aviso', frequent: 'Trámites Frecuentes', certificate: 'Certificados', taxes: 'Impuestos y Tasas', licenses: 'Licencias' },
  business: { details: 'Ver detalles', website: 'Sitio Web', rating: 'Puntuación' },
  events_data: { 
    'f1': { title: 'Fiestas Patronales', date: '1-21 Octubre', location: 'Centro Urbano', desc: 'Nuestra tradición más querida.', category: 'TRADICIÓN' },
    'f2': { title: 'Desfile de Charangas', date: 'Agosto', location: 'Calle Mayor', desc: 'Diversión y música estival.', category: 'FESTIVAL' }
  },
  beaches_page: { 
    title: 'Nuestras Playas', 
    subtitle: 'Sol y aguas cristalinas',
    list: {
      milpalmeras: { name: 'Mil Palmeras', desc: 'Una de las más populares, ideal para familias.' },
      higuericas: { name: 'Las Higuericas', desc: 'Famosa por sus dunas y ambiente joven.' },
      conde: { name: 'El Conde', desc: 'A los pies de la emblemática Torre de la Horadada.' }
    }
  },
  sightseeing_page: { 
    title: 'Cultura y Patrimonio', 
    subtitle: 'Descubre nuestras raíces',
    timeline: {
        past: { title: 'Raíces Romanas', desc: 'Thiar, parada clave en la Vía Augusta.' },
        present: { title: 'Corazón Mediterráneo', desc: 'Un municipio vibrante y acogedor.' },
        future: { title: 'Smart City', desc: 'Hacia un Pilar sostenible y tecnológico.' }
    },
    golf: { title: 'Paraíso del Golf', desc: 'Campos de clase mundial a minutos del mar.' },
    nature: { title: 'Rutas Naturales', desc: 'Senderismo por el Pinar de Campoverde.' },
    connectivity: { title: 'Conectividad', desc: 'Cerca de los principales aeropuertos.' }
  },
  footer: { contact: 'Contacto', links: 'Enlaces de interés', follow: 'Síguenos', desc: 'Visita Pilar de la Horadada y enamórate.', rights: '© 2025 Ayuntamiento de Pilar de la Horadada.', officeName: 'Oficina de Turismo', addressLine1: 'Plaza del Campo, 1', addressLine2: '03190 Pilar de la Horadada', addressLine3: 'Alicante, España' }
};

const en = {
  menu: { home: 'Home', news: 'News', beaches: 'Beaches', sightseeing: 'Culture', activities: 'Leisure', dining: 'Taste', shopping: 'Shops', health: 'Health', services: 'Town Hall', events: 'Agenda', forum: 'Forum', title: 'Explore', ai: 'AI Guide', profile: 'Profile', map: 'Map' },
  common: { sponsored: 'Sponsored', noResults: 'No results', back: 'Back', share: 'Share', details: 'More info', open: 'Open', closed: 'Closed', fullMap: 'Full Map', nearby: 'Near you', searchPlaceholder: 'Search...', addToCalendar: 'Add to Calendar' },
  sections: { 
    tradition: { title: 'Living Tradition' },
    nearby: 'Around you',
    fullMap: 'Full Map',
    beaches: { title: 'Mediterranean Coast', desc: 'The best beaches in Spain.' },
    events: { title: 'Events Calendar', desc: 'Whats happening in Pilar.' },
    shopping: { title: 'Local Shops', desc: 'Trusted local commerce.' },
    dining: { title: 'Taste of Pilar', desc: 'Gastronomy and restaurants.' },
    activities: { title: 'What to do', desc: 'Fun and leisure time.' }
  },
  hero: { subtitle: 'Mediterranean paradise awaits you in Pilar de la Horadada.' },
  ai_guide: { title: 'PH Concierge', welcome: 'Hello! I am your AI guide. How can I help you today?', online: 'Online', placeholder: 'Ask me anything...', system: 'You are PH Concierge, official ambassador of Pilar de la Horadada. Respond in the user language.', suggestions: ["Best beaches?", "Where to eat?", "Next events?"] },
  auth: { title: 'Access', logout: 'Logout' },
  share: { title: 'Share', subtitle: 'Spread the word about Pilar', copyLink: 'Copy Link', via: 'via', copied: 'Copied!', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'X / Twitter', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } },
  search: { badge: 'EXPLORE PILAR', title1: 'What are you', title2: 'looking for?', placeholder: 'Search beaches, tapas, festivals...', subtitle1: 'Everything you need', subtitle2: 'at your fingertips' },
  citizen_services: { title: 'Citizen Services', subtitle: 'Your town hall online, closer than ever.', appointment: 'Appointments', incidents: 'Incidents', report: 'Send report', frequent: 'Frequent Tasks', certificate: 'Certificates', taxes: 'Taxes', licenses: 'Licenses' },
  business: { details: 'View details', website: 'Website', rating: 'Rating' },
  events_data: { 
    'f1': { title: 'Town Festivities', date: 'Oct 1-21', location: 'City Center', desc: 'Our most beloved tradition.', category: 'TRADITION' },
    'f2': { title: 'Charangas Parade', date: 'August', location: 'Main Street', desc: 'Summer music and fun.', category: 'FESTIVAL' }
  },
  beaches_page: { 
    title: 'Our Beaches', 
    subtitle: 'Sun and crystal clear waters',
    list: {
      milpalmeras: { name: 'Mil Palmeras', desc: 'One of the most popular, ideal for families.' },
      higuericas: { name: 'Las Higuericas', desc: 'Famous for its dunes and young vibe.' },
      conde: { name: 'El Conde', desc: 'At the feet of the emblematic Watchtower.' }
    }
  },
  sightseeing_page: { 
    title: 'Culture & Heritage', 
    subtitle: 'Discover our roots',
    timeline: {
        past: { title: 'Roman Roots', desc: 'Thiar, a key stop on the Via Augusta.' },
        present: { title: 'Mediterranean Heart', desc: 'A vibrant and welcoming town.' },
        future: { title: 'Smart City', desc: 'Towards a sustainable and tech-driven Pilar.' }
    },
    golf: { title: 'Golf Paradise', desc: 'World-class courses minutes from the sea.' },
    nature: { title: 'Natural Routes', desc: 'Hiking through the Pinar de Campoverde.' },
    connectivity: { title: 'Connectivity', desc: 'Close to major airports.' }
  },
  footer: { contact: 'Contact', links: 'Useful links', follow: 'Follow us', desc: 'Visit Pilar de la Horadada and fall in love.', rights: '© 2025 Pilar de la Horadada Town Hall.', officeName: 'Tourist Office', addressLine1: 'Plaza del Campo, 1', addressLine2: '03190 Pilar de la Horadada', addressLine3: 'Alicante, Spain' }
};

// Mapeo dinámico de los 70 idiomas
// Se utiliza spread para asegurar que todos los idiomas tengan las claves necesarias
export const translations: Record<string, any> = {
  es,
  en,
  zh: { ...en, menu: { ...en.menu, home: '首页', news: '新闻', beaches: '海滩', sightseeing: '文化', activities: '休闲', dining: '美食', shopping: '购物' } },
  fr: { ...en, menu: { ...en.menu, home: 'Accueil', news: 'Nouvelles', beaches: 'Plages', sightseeing: 'Culture', activities: 'Loisirs', dining: 'Saveurs', shopping: 'Magasins' } },
  de: { ...en, menu: { ...en.menu, home: 'Start', news: 'News', beaches: 'Strände', sightseeing: 'Kultur', activities: 'Freizeit', dining: 'Essen', shopping: 'Läden' } },
  it: { ...en, menu: { ...en.menu, home: 'Home', news: 'News', beaches: 'Spiagge', sightseeing: 'Cultura', activities: 'Tempo Libero', dining: 'Gusto' } },
  pt: { ...en, menu: { ...en.menu, home: 'Início', news: 'Notícias', beaches: 'Praias', sightseeing: 'Cultura', activities: 'Lazer' } },
  ru: { ...en, menu: { ...en.menu, home: 'Главная', news: 'Новости', beaches: 'Пляжи', sightseeing: 'Культура' } },
  ar: { ...en, menu: { ...en.menu, home: 'الرئيسية', news: 'أخبار', beaches: 'شواطئ', sightseeing: 'ثقافة' } },
  hi: { ...en, menu: { ...en.menu, home: 'होम', news: 'समाचार', beaches: 'समुद्र तट' } },
  ja: { ...en, menu: { ...en.menu, home: 'ホーム', news: 'ニュース', beaches: 'ビーチ' } },
  ko: { ...en, menu: { ...en.menu, home: '홈', news: '뉴스', beaches: '해변' } },
  // Idiomas adicionales solicitados, todos heredando de English base para evitar el error de 'sections' undefined
  sv: { ...en }, no: { ...en }, da: { ...en }, fi: { ...en }, pl: { ...en }, tr: { ...en }, vi: { ...en }, th: { ...en }, el: { ...en }, 
  cs: { ...en }, hu: { ...en }, ro: { ...en }, uk: { ...en }, he: { ...en }, id: { ...en }, ms: { ...en }, bn: { ...en }, pa: { ...en }, 
  gu: { ...en }, ta: { ...en }, te: { ...en }, kn: { ...en }, ml: { ...en }, mr: { ...en }, ur: { ...en }, fa: { ...en }, sw: { ...en }, 
  am: { ...en }, yo: { ...en }, ig: { ...en }, ha: { ...en }, zu: { ...en }, xh: { ...en }, af: { ...en }, bg: { ...en }, sr: { ...en }, 
  hr: { ...en }, sk: { ...en }, sl: { ...en }, et: { ...en }, lv: { ...en }, lt: { ...en }, is: { ...en }, ga: { ...en }, mt: { ...en }, 
  sq: { ...en }, mk: { ...en }, ka: { ...en }, hy: { ...en }, az: { ...en }, kk: { ...en }, uz: { ...en }, ky: { ...en }, mn: { ...en }, 
  km: { ...en }, lo: { ...en }, my: { ...en }
};
