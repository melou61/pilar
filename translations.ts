
export interface Language {
  code: string;
  label: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'va', label: 'Valencià', flag: '🥘' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮' }
];

const UI_RESOURCES: Record<string, any> = {
  es: {
    header: { selectLanguage: 'Seleccionar Idioma' },
    business: { reviews: 'Reseñas Reales', history: 'Nuestra Historia', essentials: 'Imprescindibles', schedule: 'Horarios y Contacto', weekdays: 'Lunes - Viernes', weekend: 'Fines de Semana' },
    zones: { all: 'Todo el municipio', centro: 'Centro Urbano', latorre: 'La Torre', milpalmeras: 'Mil Palmeras', campoverde: 'Campoverde', elmojon: 'El Mojón' },
    beach_labels: { water: 'Agua', uv: 'UV', crowd: 'Afluencia', length: 'Longitud', sand: 'Arena', services: 'Servicios Destacados', map: 'Explorar en Mapa', coastal: 'El Litoral del Pilar', blue_flag: 'Bandera Azul', open: 'Abierta Ahora' },
    sight_labels: { visit: 'Visita', crowd: 'Afluencia', status: 'Estado', style: 'Estilo', material: 'Material', amenities: 'Servicios y Accesibilidad', discover: 'Descubrir Ubicación', heritage: 'Patrimonio Cultural PH', protection: 'Protección BIC', must_see: 'Imperdible' },
    voice: { title: 'PH VOICE', subtitle: 'Habla con tu guía virtual.', btn: 'Hablar ahora', listening: 'Escuchando...', ready: 'PH Concierge está listo.' },
    news_cats: { ALL: 'Todo', GENERAL: 'Actualidad', DIFUNTOS: 'Difuntos', TRABAJO: 'Empleo', CASAS: 'Vivienda', OTROS: 'Otros' },
    share: { title: 'Compartir', subtitle: 'Elige una plataforma', copyLink: 'Copiar Enlace', copied: '¡Copiado!', via: 'vía', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'Twitter', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } },
    ai: { welcome: 'Hola, soy PH Concierge. ¿En qué puedo ayudarte hoy?', online: 'En línea', voice_btn: 'Hablar ahora', system: 'Eres un asistente útil para turismo en Pilar de la Horadada.' },
    search: { placeholder: 'Buscar eventos, tiendas...', subtitle1: 'EXPLORA', subtitle2: 'PILAR DE LA HORADADA', noResults: 'Sin resultados para' },
    auth: { 
        title_login: 'Entrar', 
        title_register: 'Registro', 
        name: 'Nombre Completo', 
        email: 'Email', 
        pass: 'Contraseña', 
        btn_login: 'Acceder', 
        btn_register: 'Siguiente',
        btn_verify: 'Verificar y Crear',
        no_account: '¿No tienes cuenta? Regístrate', 
        has_account: '¿Ya tienes cuenta? Entra aquí', 
        login_trigger: 'Acceder / Registro',
        captcha_label: 'Código de Seguridad',
        verify_title: 'Verificar Email',
        verify_desc: 'Hemos enviado un código de 6 dígitos a tu correo.',
        code_label: 'Código de Verificación',
        resend: 'Reenviar código'
    },
    hp: { smart_active: 'PH Smart City Activa', shorts_label: 'Descubre en Corto', gallery_label: 'Galería de Momentos', create_postcard: 'Crear Postal IA', shorts_titles: ['Amanecer en Torre', 'Fiestas Patronales', 'Ruta Gastronómica', 'Deportes Náuticos'], views: 'vistas' },
    profile: { my_events: 'Mis Eventos', favorites: 'Favoritos', alerts: 'Alertas', logout: 'Cerrar Sesión', hello: 'Hola', vip: 'Vecino VIP', thanks: 'Gracias por ser parte activa.', explore: 'Explorar', view_agenda: 'Ver mi agenda', view_favorites: 'Ir a favoritos', settings: 'Ajustes', events_saved: 'eventos', places_fav: 'sitios' },
    lens: { title: 'PH Lens', scanBtn: 'Escanear Entorno', identified: 'Identificado', newScan: 'Nuevo Escaneo' },
    beacon: { title: 'Beacon PH', subtitle: 'Oferta Cercana', exclusive: 'Exclusivo', codeLabel: 'Código Promocional', activate: 'Activar Oferta', footer: 'Acércate al comercio para canjear' },
    postcard: { title: 'Postal IA', subtitle: 'Crea Recuerdos Mágicos', desc: 'Describe un lugar de Pilar y la IA generará una postal única.', generating: 'Generando...', save: 'Guardar', create: 'Crear Otra', suggestions: ['Torre al amanecer', 'Playa Mil Palmeras', 'Iglesia del Pilar'], placeholder: 'Ej: Atardecer en la playa...' },
    m: ['Inicio', 'Noticias', 'Playas', 'Patrimonio', 'Experiencias', 'Gastronomía', 'Tiendas', 'Salud', 'Servicios', 'Eventos', 'Foro', 'PH Explore', 'Guía IA', 'Perfil', 'Mapa', 'Admin'],
    c: ['Patrocinado', 'Sin resultados', 'Volver', 'Compartir', 'Detalles', 'Abierto', 'Cerrado', 'Mapa', 'Cerca', 'Buscar...', 'Añadir', 'Subir', 'Copiar', 'Copiado', 'Error', 'Cargando...', 'Pensando...', 'Ver Detalles', 'Todo'],
    s: ['Servicios Ciudadanos', 'Trámites y gestiones', 'Cita Previa', 'Incidencias', 'Comunicar', 'Frecuentes', 'Certificado', 'Tasas', 'Licencias'],
    f: ['Contacto', 'Enlaces', 'Síguenos', 'Descubre Pilar de la Horadada, un lugar donde el sol vive todo el año.', 'Ayuntamiento Pilar de la Horadada', 'Plaza Campoamor, 2', '03190 Pilar de la Horadada', 'Alicante, España', 'Todos los derechos reservados', 'Privacidad', 'Términos'],
    mc: ['Alimentación', 'Alojamiento', 'Comunicación', 'Educación', 'Profesional', 'Hogar', 'Hostelería', 'Mascotas', 'Medio Ambiente', 'Moda', 'Motor', 'Ocio', 'Salud', 'Municipal'],
    beaches_page: { 
      title: 'Nuestras Playas', coastal: 'El Litoral del Pilar', blue_flag: 'Bandera Azul', open: 'Abierta Ahora', fact_title: 'Excelencia Mediterránea', fact_desc: 'Pilar de la Horadada cuenta con más de 4km de playas de arena fina y aguas cristalinas.', 
      list: { 
        higuericas: { name: 'Las Higuericas', desc: 'Famosa por sus dunas naturales y ambiente joven.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'Paraíso de arena blanca y aguas turquesas.' },
        jesuitas: { name: 'Playa de los Jesuitas', desc: 'Amplia cala protegida por acantilados rojizos.' },
        elconde: { name: 'Playa del Conde', desc: 'A los pies de la Torre Vigía, historia y mar.' },
        elpuerto: { name: 'Playa del Puerto', desc: 'Junto al club náutico, ideal para familias.' },
        rocamar: { name: 'Calas de Rocamar', desc: 'Pequeñas calas unidas por senderos.' }
      } 
    },
    activities_page: { 
      title: 'Experiencias Únicas', subtitle: 'Vive el Pilar intensamente', participate_btn: 'Cómo participar', difficulty: { easy: 'Fácil', medium: 'Medio', hard: 'Difícil' },
      categories: { hiking: 'Senderismo', water: 'Acuático', culture: 'Cultural', sport: 'Deporte' },
      sport: { title: 'Pilar es Deporte', nautical_title: 'Náutica', nautical_desc: 'Cursos municipales de vela y deportes de viento durante todo el año.' },
      list: { 
        'rio-seco': { name: 'Ruta Río Seco', desc: 'Senderismo único a través de cañones de arenisca erosionada.' },
        'loromero': { name: 'Lo Romero Golf', desc: 'La "Isla del Golf", un campo de 18 hoyos de prestigio internacional.' },
        'sailing': { name: 'Vela y Kayak', desc: 'Actividades náuticas en el Puerto Deportivo de la Torre.' },
        'cycling': { name: 'Ruta Cicloturista', desc: 'Recorre el litoral desde El Mojón hasta Mil Palmeras.' }
      } 
    },
    sightseeing_page: {
        title: 'Patrimonio', subtitle: 'Historia viva en cada rincón',
        list: {
            'torre-vigia': { name: 'Torre de la Horadada', desc: 'Torre vigía del siglo XVI construida para la defensa contra los piratas.' },
            'iglesia-pilar': { name: 'Iglesia Ntra. Sra. del Pilar', desc: 'Templo parroquial con advocación a la Virgen del Pilar.' },
            'museo-etnologico': { name: 'Museo Arqueológico', desc: 'Colección de piezas de la historia local y costumbres.' },
            'canteras-romanas': { name: 'Canteras Romanas', desc: 'Antiguas canteras de extracción de piedra en la costa.' }
        }
    },
    forum: { title: 'Foro Vecinal', subtitle: 'Conecta con tu comunidad', categories: ['General', 'Recomendaciones', 'Mascotas', 'Mercadillo'] },
    event_detail: { pilar_event: 'EVENTO PH', date_time: 'FECHA Y HORA', main_location: 'UBICACIÓN' }
  },
  en: {
    header: { selectLanguage: 'Select Language' },
    business: { reviews: 'Real Reviews', history: 'Our History', essentials: 'Essentials', schedule: 'Opening Hours', weekdays: 'Mon - Fri', weekend: 'Weekends' },
    zones: { all: 'All Areas', centro: 'City Centre', latorre: 'La Torre', milpalmeras: 'Mil Palmeras', campoverde: 'Campoverde', elmojon: 'El Mojón' },
    beach_labels: { water: 'Water', uv: 'UV', crowd: 'Crowd', length: 'Length', sand: 'Sand', services: 'Featured Services', map: 'Explore on Map', coastal: 'Pilar Coastline', blue_flag: 'Blue Flag', open: 'Open Now' },
    sight_labels: { visit: 'Visit', crowd: 'Crowd', status: 'Status', style: 'Style', material: 'Material', amenities: 'Services & Access', discover: 'Discover Location', heritage: 'PH Heritage', protection: 'Protected Site', must_see: 'Must See' },
    voice: { title: 'PH VOICE', subtitle: 'Talk to your virtual guide.', btn: 'Speak Now', listening: 'Listening...', ready: 'PH Concierge is ready.' },
    news_cats: { ALL: 'All', GENERAL: 'News', DIFUNTOS: 'Obituaries', TRABAJO: 'Jobs', CASAS: 'Housing', OTROS: 'Others' },
    share: { title: 'Share', subtitle: 'Choose a platform', copyLink: 'Copy Link', copied: 'Copied!', via: 'via', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'Twitter', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } },
    ai: { welcome: 'Hi, I am PH Concierge. How can I help you today?', online: 'Online', voice_btn: 'Speak Now', system: 'You are a helpful tourism assistant for Pilar de la Horadada.' },
    search: { placeholder: 'Search events, shops...', subtitle1: 'EXPLORE', subtitle2: 'PILAR DE LA HORADADA', noResults: 'No results for' },
    auth: { 
        title_login: 'Login', 
        title_register: 'Register', 
        name: 'Full Name', 
        email: 'Email', 
        pass: 'Password', 
        btn_login: 'Login', 
        btn_register: 'Next', 
        btn_verify: 'Verify & Create',
        no_account: 'No account? Sign Up', 
        has_account: 'Have an account? Login', 
        login_trigger: 'Login / Register',
        captcha_label: 'Security Code',
        verify_title: 'Verify Email',
        verify_desc: 'We sent a 6-digit code to your email.',
        code_label: 'Verification Code',
        resend: 'Resend code'
    },
    hp: { smart_active: 'PH Smart City Active', shorts_label: 'Discover Shorts', gallery_label: 'Moments Gallery', create_postcard: 'Create AI Postcard', shorts_titles: ['Sunrise at Tower', 'Local Festivals', 'Gastronomy Route', 'Water Sports'], views: 'views' },
    profile: { my_events: 'My Events', favorites: 'Favorites', alerts: 'Alerts', logout: 'Logout', hello: 'Hello', vip: 'VIP Resident', thanks: 'Thanks for being active.', explore: 'Explore', view_agenda: 'View my agenda', view_favorites: 'Go to favorites', settings: 'Settings', events_saved: 'events', places_fav: 'places' },
    lens: { title: 'PH Lens', scanBtn: 'Scan Environment', identified: 'Identified', newScan: 'New Scan' },
    beacon: { title: 'Beacon PH', subtitle: 'Nearby Offer', exclusive: 'Exclusive', codeLabel: 'Promo Code', activate: 'Activate Offer', footer: 'Visit the shop to redeem' },
    postcard: { title: 'AI Postcard', subtitle: 'Create Magic Memories', desc: 'Describe a place in Pilar and AI will generate a unique postcard.', generating: 'Generating...', save: 'Save', create: 'Create Another', suggestions: ['Tower at sunrise', 'Mil Palmeras Beach', 'Pilar Church'], placeholder: 'Ex: Sunset at the beach...' },
    m: ['Home', 'News', 'Beaches', 'Heritage', 'Experiences', 'Dining', 'Shopping', 'Health', 'Services', 'Events', 'Forum', 'PH Explore', 'AI Guide', 'Profile', 'Map', 'Admin'],
    c: ['Sponsored', 'No results', 'Back', 'Share', 'Details', 'Open', 'Closed', 'Map', 'Nearby', 'Search...', 'Add', 'Upload', 'Copy', 'Copied', 'Error', 'Loading...', 'Thinking...', 'Details', 'All'],
    s: ['Citizen Services', 'Procedures', 'Appointment', 'Incidents', 'Report', 'Frequent', 'Certificate', 'Taxes', 'Licenses'],
    f: ['Contact', 'Links', 'Follow Us', 'Discover Pilar de la Horadada, where the sun lives all year round.', 'Pilar de la Horadada Town Hall', 'Plaza Campoamor, 2', '03190 Pilar de la Horadada', 'Alicante, Spain', 'All rights reserved', 'Privacy', 'Terms'],
    mc: ['Food', 'Accommodation', 'Communication', 'Education', 'Professional', 'Home', 'Hospitality', 'Pets', 'Environment', 'Fashion', 'Motor', 'Leisure', 'Health', 'Municipal'],
    beaches_page: { 
      title: 'Our Beaches', coastal: 'Pilar Coastline', blue_flag: 'Blue Flag', open: 'Open Now', fact_title: 'Excellence', fact_desc: 'Pilar de la Horadada offers over 4km of fine sandy beaches and crystal clear waters.', 
      list: { 
        higuericas: { name: 'Las Higuericas', desc: 'Famous for its natural dunes and trendy atmosphere.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'A white sand paradise with turquoise waters.' },
        jesuitas: { name: 'Jesuitas Beach', desc: 'Wide cove protected by reddish cliffs.' },
        elconde: { name: 'El Conde Beach', desc: 'At the foot of the Watchtower, history and sea.' },
        elpuerto: { name: 'Harbour Beach', desc: 'Next to the marina, ideal for families.' },
        rocamar: { name: 'Rocamar Coves', desc: 'Small coves connected by trails.' }
      } 
    },
    activities_page: { 
      title: 'Unique Experiences', subtitle: 'Live Pilar intensely', participate_btn: 'How to participate', difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
      categories: { hiking: 'Hiking', water: 'Water Sports', culture: 'Cultural', sport: 'Sport' },
      sport: { title: 'Pilar is Sport', nautical_title: 'Nautical', nautical_desc: 'Municipal sailing and wind sports courses all year round.' },
      list: { 
        'rio-seco': { name: 'Rio Seco Route', desc: 'Unique hiking through eroded sandstone canyons.' },
        'loromero': { name: 'Lo Romero Golf', desc: 'The "Golf Island", an internationally prestigious 18-hole course.' },
        'sailing': { name: 'Sailing & Kayak', desc: 'Nautical activities at the La Torre Marina.' },
        'cycling': { name: 'Cycling Route', desc: 'Ride along the coast from El Mojón to Mil Palmeras.' }
      } 
    },
    sightseeing_page: {
        title: 'Heritage', subtitle: 'Living history in every corner',
        list: {
            'torre-vigia': { name: 'Watchtower', desc: '16th century watchtower built for defense against pirates.' },
            'iglesia-pilar': { name: 'Pilar Church', desc: 'Parish temple dedicated to the Virgin of the Pillar.' },
            'museo-etnologico': { name: 'Archaeological Museum', desc: 'Collection of local history pieces and customs.' },
            'canteras-romanas': { name: 'Roman Quarries', desc: 'Ancient stone extraction quarries on the coast.' }
        }
    },
    forum: { title: 'Community Forum', subtitle: 'Connect with your neighbors', categories: ['General', 'Recommendations', 'Pets', 'Market'] },
    event_detail: { pilar_event: 'PH EVENT', date_time: 'DATE & TIME', main_location: 'LOCATION' }
  }
};

const createLang = (code: string, langLabel: string): any => {
  const data = UI_RESOURCES[code] || UI_RESOURCES.en;
  const en = UI_RESOURCES.en;
  
  // Helpers
  const get = (obj: any, path: string, fallback: any) => {
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current && current[part] !== undefined) current = current[part];
      else return fallback;
    }
    return current;
  };

  // Legacy mappings from previous file content to maintain compatibility
  const m = data.m || en.m || [];
  const c = data.c || en.c || [];
  const s = data.s || en.s || [];
  const f = data.f || en.f || [];
  const mc = data.mc || en.mc || [];

  return {
    menu: { 
      home: m[0] || 'Home', news: m[1] || 'News', beaches: m[2] || 'Beaches', sightseeing: m[3] || 'Heritage', 
      activities: m[4] || 'Experiences', dining: m[5] || 'Dining', shopping: m[6] || 'Shopping', health: m[7] || 'Health', 
      services: m[8] || 'Services', events: m[9] || 'Events', forum: m[10] || 'Forum', title: m[11] || 'PH Explore', 
      ai: m[12] || 'AI Guide', profile: m[13] || 'Profile', map: m[14] || 'Map', admin: m[15] || 'Admin' 
    },
    common: { 
      sponsored: c[0] || 'Sponsored', noResults: c[1] || 'No results', back: c[2] || 'Back', share: c[3] || 'Share', 
      details: c[4] || 'Details', open: c[5] || 'Open', closed: c[6] || 'Closed', fullMap: c[7] || 'Map', 
      nearby: c[8] || 'Nearby', searchPlaceholder: c[9] || 'Search...', addToCalendar: c[10] || 'Add', 
      upload: c[11] || 'Upload', copyLink: c[12] || 'Copy', copied: c[13] || 'Copied', error: c[14] || 'Error',
      loading: c[15] || 'Loading...', thinking: c[16] || 'Thinking...', view_details: c[17] || 'Details', all: c[18] || 'All'
    },
    hero: { subtitle: data.h || en.h },
    ai_guide: { 
      title: m[12], 
      welcome: get(data, 'ai.welcome', en.ai?.welcome || 'Welcome'), 
      online: get(data, 'ai.online', en.ai?.online || 'Online'), 
      placeholder: get(data, 'search.placeholder', en.search?.placeholder || 'Search...'), 
      voice_btn: get(data, 'ai.voice_btn', en.ai?.voice_btn || 'Speak'),
      system: get(data, 'ai.system', en.ai?.system || '')
    },
    // New Comprehensive Sections with Fallbacks
    header: data.header || en.header,
    business: data.business || en.business,
    zones: data.zones || en.zones,
    beach_labels: data.beach_labels || en.beach_labels,
    sight_labels: data.sight_labels || en.sight_labels,
    voice: data.voice || en.voice,
    news_categories: data.news_cats || en.news_cats,
    share: data.share || en.share,
    
    // Auth & Home Page (Critical Fixes)
    auth: data.auth || en.auth,
    home_page: data.hp || en.hp, // Ensures hp exists even if data.hp is missing
    beacon: data.beacon || en.beacon,
    lens: data.lens || en.lens,
    postcard: data.postcard || en.postcard,
    citizen_services: { 
        title: s[0], subtitle: s[1], appointment: s[2], 
        incidents: s[3], report: s[4], frequent: s[5], 
        certificate: s[6], taxes: s[7], licenses: s[8] 
    },
    sections: { 
        shopping: { title: m[6], desc: 'Comercio local' }, 
        dining: { title: m[5], desc: 'Gastronomía' }, 
        events: { title: m[9] } 
    },
    footer: { 
        contact: f[0], links: f[1], follow: f[2], desc: f[3],
        officeName: f[4], addressLine1: f[5], addressLine2: f[6], addressLine3: f[7], rights: f[8],
        privacy: f[9], terms: f[10]
    },
    search: data.search || en.search,
    events_data: data.ed || en.ed,
    beaches_page: { ...en.beaches_page, ...(data.beaches_page || {}) }, 
    sightseeing_page: { ...en.sightseeing_page, ...(data.sightseeing_page || {}) },
    activities_page: { ...en.activities_page, ...(data.activities_page || {}) },
    health: data.health || en.health,
    profile: data.profile || en.profile,
    forum: { ...en.forum, ...(data.forum || {}) },
    event_detail: data.event_detail || en.event_detail,
    map_categories: {
        food: mc[0], accommodation: mc[1], communication: mc[2], education: mc[3], professional: mc[4],
        home: mc[5], hospitality: mc[6], pets: mc[7], environment: mc[8], fashion: mc[9],
        motor: mc[10], leisure: mc[11], health: mc[12], municipal: mc[13]
    }
  };
};

export const translations: Record<string, any> = {};
languages.forEach(lang => {
  translations[lang.code] = createLang(lang.code, lang.label);
});
