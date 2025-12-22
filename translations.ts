
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
  { code: 'pt', label: 'Português', flag: '🇵🇹' }
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
    profile: { title: 'Mi Espacio', logout: 'Cerrar Sesión', favorites: 'Mis Favoritos', alerts: 'Mis Alertas', my_events: 'Agenda Personal', no_favs: 'Aún no tienes favoritos.' },
    beaches_page: { 
        title: 'Nuestras Playas', 
        subtitle: 'Descubre 4 kilómetros de arena fina, aguas turquesas y calas vírgenes premiadas internacionalmente.', 
        coastal: 'El Litoral del Pilar', 
        blue_flag: 'Bandera Azul', 
        open: 'Abierta Ahora', 
        fact_title: 'Excelencia Mediterránea', 
        fact_desc: 'Pilar de la Horadada lidera la calidad costera en la Costa Blanca con récords de Banderas Azules.',
        list: { 
            milpalmeras: { name: 'Mil Palmeras', desc: 'Un paraíso de arena blanca y aguas tranquilas. Es la playa familiar por excelencia, con amplios servicios y un ambiente vibrante.' },
            rocamar: { name: 'Rocamar', desc: 'Para quienes buscan paz. Una sucesión de calas mágicas talladas en la roca, ideales para el snorkel y la desconexión total.' },
            jesuitas: { name: 'Jesuitas', desc: 'Energía y deporte. Una gran playa urbana con redes de voley y un ambiente joven inigualable bajo el sol del Mediterráneo.' },
            elconde: { name: 'El Conde', desc: 'Donde la historia toca el mar. Bañarse a los pies de la Torre Vigía del siglo XVI es una experiencia única en el mundo.' },
            elpuerto: { name: 'El Puerto', desc: 'Elegancia náutica. Situada junto al puerto deportivo, ofrece aguas serenas y una oferta gastronómica de primer nivel a pie de arena.' },
            lasvillas: { name: 'Las Villas', desc: 'Tradición y relax. Una playa residencial perfecta para paseos interminables y disfrutar de la brisa marina en familia.' },
            higuericas: { name: 'Las Higuericas', desc: 'La joya natural. Famosa por sus dunas protegidas y sus icónicas pasarelas de madera. Sostenibilidad y belleza pura.' },
            elmojon: { name: 'El Mojón', desc: 'Frontera de naturaleza. Lindando con las Salinas de San Pedro, es el rincón ideal para amantes de la fauna y la calma absoluta.' }
        } 
    },
    sightseeing_page: {
        title: 'Joyas del Patrimonio',
        subtitle: 'Un viaje en el tiempo desde las calzadas romanas hasta la majestuosa Torre Vigía que custodia nuestro mar.',
        list: {
            'torre-vigia': { name: 'Torre de la Horadada', desc: 'Símbolo indiscutible de nuestra costa. Construida en 1591 para proteger el litoral de los ataques piratas, hoy es un vigía eterno del Mediterráneo.' },
            'iglesia-pilar': { name: 'Nuestra Sra. del Pilar', desc: 'El corazón espiritual del municipio. Destaca por su torre campanario y un interior de gran belleza que alberga la esencia de nuestra fe y tradición.' },
            'museo-etnologico': { name: 'Museo Arqueológico', desc: 'Un espacio moderno para descubrir Thiar. Desde restos romanos de la Vía Augusta hasta útiles agrícolas que forjaron nuestra identidad.' },
            'canteras-romanas': { name: 'Canteras Romanas', desc: 'Ingeniería milenaria al borde del mar. Un yacimiento único donde se extraía la piedra para pavimentar la mítica Vía Augusta.' }
        }
    }
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
    profile: { title: 'My Space', logout: 'Logout', favorites: 'My Favorites', alerts: 'My Alerts', my_events: 'Personal Agenda', no_favs: 'No favorites yet.' },
    beaches_page: { 
        title: 'Our Beaches', 
        subtitle: 'Explore 4 kilometers of fine sand, turquoise waters, and internationally awarded pristine coves.', 
        coastal: 'Pilar Coastline', 
        blue_flag: 'Blue Flag', 
        open: 'Open Now', 
        fact_title: 'Mediterranean Excellence', 
        fact_desc: 'Pilar de la Horadada leads coastal quality in the Costa Blanca with record Blue Flag counts.',
        list: { 
            milpalmeras: { name: 'Mil Palmeras', desc: 'A paradise of white sand and calm waters. It is the family beach par excellence, with extensive services and a vibrant atmosphere.' },
            rocamar: { name: 'Rocamar', desc: 'For those seeking peace. A sequence of magical coves carved into the rock, ideal for snorkeling and total disconnection.' },
            jesuitas: { name: 'Jesuitas', desc: 'Energy and sport. A large urban beach with volleyball nets and a young atmosphere under the Mediterranean sun.' },
            elconde: { name: 'El Conde', desc: 'Where history touches the sea. Swimming at the foot of the 16th-century Watchtower is a unique world experience.' },
            elpuerto: { name: 'El Puerto', desc: 'Nautical elegance. Located next to the marina, it offers serene waters and top-tier dining right on the sand.' },
            lasvillas: { name: 'Las Villas', desc: 'Tradition and relaxation. A residential beach perfect for endless walks and enjoying the sea breeze with the family.' },
            higuericas: { name: 'Las Higuericas', desc: 'The natural jewel. Famous for its protected dunes and iconic wooden walkways. Sustainability and pure beauty.' },
            elmojon: { name: 'El Mojón', desc: 'Nature boundary. Bordering the San Pedro Salt Pans, it is the ideal spot for wildlife lovers and absolute calm.' }
        } 
    },
    sightseeing_page: {
        title: 'Heritage Jewels',
        subtitle: 'A journey through time from Roman roads to the majestic Watchtower guarding our sea.',
        list: {
            'torre-vigia': { name: 'Horadada Tower', desc: 'Undisputed symbol of our coast. Built in 1591 to protect against pirate attacks, today it is an eternal guardian of the Mediterranean.' },
            'iglesia-pilar': { name: 'Church of Our Lady of Pilar', desc: 'The spiritual heart of the town. Notable for its bell tower and a beautiful interior that holds our faith and tradition.' },
            'museo-etnologico': { name: 'Archaeological Museum', desc: 'A modern space to discover Thiar. From Roman remains of the Via Augusta to the tools that forged our identity.' },
            'canteras-romanas': { name: 'Roman Quarries', desc: 'Millenary engineering by the sea. A unique site where stone was extracted to pave the mythical Via Augusta.' }
        }
    }
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
  const bch = data.beaches_page || en.beaches_page;
  const sig = data.sightseeing_page || en.sightseeing_page;

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
    beaches_page: bch,
    sightseeing_page: sig,
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
