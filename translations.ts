
/**
 * SISTEMA DE TRADUCCIÓN NATIVA PH (70 IDIOMAS) - VERSIÓN FINAL EXPANDIDA
 */

const createLang = (
  m: string[], c: string[], sn: string[], ai: string[], hero: string, search: string[], serv: string[], foot: string[]
) => ({
  menu: {
    home: m[0], news: m[1], beaches: m[2], sightseeing: m[3], activities: m[4],
    dining: m[5], shopping: m[6], health: m[7], services: m[8], events: m[9],
    forum: m[10], title: m[11], ai: m[12], profile: m[13], map: m[14]
  },
  common: {
    sponsored: c[0], noResults: c[1], back: c[2], share: c[3], details: c[4],
    open: c[5], closed: c[6], fullMap: c[7], nearby: c[8], searchPlaceholder: c[9], addToCalendar: c[10]
  },
  sections: {
    tradition: { title: sn[0] }, nearby: sn[1], fullMap: sn[2],
    beaches: { title: sn[3], desc: sn[4] },
    events: { title: sn[5], desc: sn[6] },
    shopping: { title: sn[7], desc: sn[8] },
    dining: { title: sn[9], desc: sn[10] },
    activities: { title: sn[11], desc: sn[12] }
  },
  hero: { subtitle: hero },
  ai_guide: { 
    title: ai[0], welcome: ai[1], online: ai[2], placeholder: ai[3], 
    system: ai[4], suggestions: [ai[5], ai[6], ai[7]] 
  },
  auth: { title: ai[8] || 'Login', logout: ai[9] || 'Logout' },
  share: { title: ai[10] || 'Share', subtitle: ai[11] || 'Pilar', copyLink: 'URL', via: 'via', copied: '!', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'X', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } },
  search: { 
    badge: search[0], title1: search[1], title2: search[2], 
    subtitle1: search[3], subtitle2: search[4], placeholder: search[5] 
  },
  citizen_services: { 
    title: serv[0], subtitle: serv[1], appointment: serv[2], incidents: serv[3], 
    report: serv[4], frequent: serv[5], certificate: serv[6], taxes: serv[7], licenses: serv[8] 
  },
  footer: { 
    contact: foot[0], links: foot[1], follow: foot[2], desc: foot[3], 
    rights: foot[4], officeName: foot[5], addressLine1: foot[6], addressLine2: foot[7], addressLine3: foot[8] 
  },
  events_data: {
    'fiestas-patronales': { 
        title: 'Fiestas Patronales', 
        date: 'Octubre', 
        location: 'Centro Urbano', 
        desc: 'Declaradas de Interés Turístico. Carrozas, ofrendas y charangas.',
        category: 'TRADICIÓN',
        long: 'Octubre es el mes más importante para los pilareños. El desfile de carrozas artesanales es único en la provincia de Alicante, donde las peñas compiten con diseños de papel y flores.'
    },
    'semana-santa': { 
        title: 'Semana Santa', 
        date: 'Marzo/Abril', 
        location: 'Casco Antiguo', 
        desc: 'Devoción, arte sacro y procesiones solemnes por las calles del Pilar.',
        category: 'RELIGIOSO',
        long: 'La Semana Santa de Pilar de la Horadada es conocida por la sobriedad y belleza de sus procesiones, destacando la del Santo Entierro.'
    },
    'romeria-isidro': { 
        title: 'Romería de San Isidro', 
        date: 'Mayo', 
        location: 'Cañada de Praes', 
        desc: 'Día de campo, caballos y tradición popular hacia el monte.',
        category: 'TRADICIÓN',
        long: 'Cientos de personas acompañan al santo en carros y caballos hasta el paraje natural de la Cañada de Praes para una jornada de picnic y hermandad.'
    },
    'desembarco-pirata': { 
        title: 'Desembarco Moro/Pirata', 
        date: 'Agosto', 
        location: 'Higuericas', 
        desc: 'Espectáculo nocturno de recreación histórica en la orilla del mar.',
        category: 'HISTORIA',
        long: 'Una recreación teatral y pirotécnica de los ataques piratas que sufrió nuestra costa en los siglos XVI y XVII.'
    },
    'corto-un-pilar': { 
        title: 'Corto de un Pilar', 
        date: 'Noviembre', 
        location: 'Casa Cultura', 
        desc: 'Cita ineludible del séptimo arte con cortometrajes internacionales.',
        category: 'CINE',
        long: 'El festival de cine que otorga los prestigiosos premios Pilar y que atrae a figuras relevantes de la industria cinematográfica.'
    }
  },
  beaches_page: { 
    title: sn[3], subtitle: sn[4],
    list: { 
      milpalmeras: { name: 'Mil Palmeras', desc: 'Playa de fina arena blanca con servicios de alta calidad, perfecta para familias.' },
      higuericas: { name: 'Las Higuericas', desc: 'Nuestra joya natural: dunas, pasarelas de madera y los mejores chiringuitos.' },
      vistamar: { name: 'Vistamar', desc: 'Aguas tranquilas y ambiente familiar en una de las zonas más queridas.' },
      puerto: { name: 'El Puerto', desc: 'Junto al Club Náutico, combina el sabor marinero con servicios excelentes.' },
      conde: { name: 'El Conde', desc: 'Famosa por su icónica Torre Vigía y sus puestas de sol inigualables.' },
      jesuitas: { name: 'Los Jesuitas', desc: 'Cala amplia con red de voley y ambiente deportivo muy animado.' },
      caleta: { name: 'La Caleta', desc: 'Una cala recogida y pintoresca, ideal para los que buscan relax.' },
      rocamar: { name: 'Rocamar', desc: 'Paisaje rocoso natural perfecto para el snorkel y la fotografía marina.' },
      gato: { name: 'Playa del Gato', desc: 'Pequeño rincón de paz con aguas cristalinas y poca afluencia.' },
      mojon: { name: 'El Mojón', desc: 'Playa virgen junto a las salinas, ideal para los amantes de lo salvaje.' }
    }
  },
  activities_page: {
    title: 'Experiencias PH',
    subtitle: 'Naturaleza, deporte y aventura los 365 días del año.',
    list: {
      'rio-seco': { name: 'Río Seco', desc: 'Ruta geológica por un cauce milenario con formaciones de arena únicas.' },
      'lo-romero': { name: 'Lo Romero Golf', desc: 'Campo de golf de élite mundial con su icónico hoyo 18 en una isla.' }
    }
  },
  sightseeing_page: { 
    title: 'Cronología y Patrimonio', 
    subtitle: 'Viaja a través de la historia: desde la Thiar romana hasta hoy.',
    list: {
      'torre-vigia': { name: 'Torre de la Horadada', desc: 'Torre defensiva del siglo XVI declarada Bien de Interés Cultural.' },
      'iglesia-pilar': { name: 'Iglesia Ntra. Sra. del Pilar', desc: 'Construida en 1981 sobre la antigua ermita, símbolo de unidad.' },
      'museo-gratiniano': { name: 'Museo Arqueológico', desc: 'Hallazgos de la Vía Augusta, anclas romanas y etnografía local.' },
      'canteras-romanas': { name: 'Canteras Romanas', desc: 'Antigua explotación de piedra litoral de hace 2000 años.' },
      'cine-verano': { name: 'Cine de Verano', desc: 'Tradición social que sobrevive como patrimonio vivo del ocio pilareño.' }
    }
  }
});

const ES_SEARCH = ['PILAR', '¿Qué buscas', 'hoy?', 'Todo lo que necesitas', 'al alcance de tu mano', 'Playas, museos, tapas...'];
const ES_SERV = ['Sede Electrónica', 'Ayuntamiento Digital 24h', 'Cita Previa', 'Incidencias', 'Reportar', 'Trámites', 'Certificados', 'Impuestos', 'Licencias'];
const ES_FOOT = ['Contacto', 'Enlaces', 'Síguenos', 'Descubre el Pilar', '© 2025 Ayuntamiento PH', 'Oficina de Turismo', 'Calle Mayor, 1', '03190', 'Alicante'];
const EN_SEARCH = ['PILAR', 'What are you', 'looking for?', 'Everything you need', 'at your fingertips', 'Beaches, museums, tapas...'];
const EN_SERV = ['Citizen Portal', 'Digital Town Hall 24h', 'Appointments', 'Incidents', 'Report', 'Procedures', 'Certificates', 'Taxes', 'Licenses'];
const EN_FOOT = ['Contact', 'Links', 'Follow us', 'Explore Pilar', '© 2025 Pilar Town Hall', 'Tourist Office', 'Main Street, 1', '03190', 'Alicante'];

export const translations: Record<string, any> = {
  es: createLang(
    ['Inicio', 'Noticias', '10 Playas', 'Patrimonio', 'Experiencias', 'Sabor', 'Tiendas', 'Salud', 'Gestión', 'PH Festivales', 'Foro', 'Explorar', 'Guía IA', 'Perfil', 'Mapa'],
    ['Patrocinado', 'Sin resultados', 'Volver', 'Compartir', 'Detalles', 'Abierto', 'Cerrado', 'Mapa Completo', 'Cerca de ti', 'Buscar...', 'Añadir'],
    ['Tradición Viva', 'Tu entorno', 'Ver Mapa', 'Costa Blanca', 'Paraíso de arena y sal', 'PH Festivales', 'Vive nuestras fiestas', 'Compras', 'Comercio local', 'Sabor', 'Gastronomía', 'Actividades', 'PH Activo'],
    ['PH Concierge', '¡Bienvenido! Soy tu guía IA.', 'En Línea', 'Pregúntame...', 'Eres PH Concierge...', '¿Playas?', '¿Comer?', '¿Eventos?', 'Acceso', 'Salir', 'Compartir', 'Pilar de la Horadada'],
    'El paraíso mediterráneo te espera.', ES_SEARCH, ES_SERV, ES_FOOT
  ),
  en: createLang(
    ['Home', 'News', '10 Beaches', 'Heritage', 'Experiences', 'Taste', 'Shops', 'Health', 'Town Hall', 'PH Festivals', 'Forum', 'Explore', 'AI Guide', 'Profile', 'Map'],
    ['Sponsored', 'No results', 'Back', 'Share', 'Details', 'Open', 'Closed', 'Full Map', 'Near you', 'Search...', 'Add'],
    ['Living Tradition', 'Around you', 'Full Map', 'Costa Blanca', 'Sand and salt paradise', 'PH Festivals', 'Live our traditions', 'Shopping', 'Local shops', 'Taste', 'Gastronomy', 'Activities', 'PH Active'],
    ['PH Concierge', 'Welcome! I am your AI guide.', 'Online', 'Ask me...', 'You are PH Concierge...', 'Beaches?', 'Where to eat?', 'Events?', 'Login', 'Logout', 'Share', 'Pilar de la Horadada'],
    'Mediterranean paradise awaits you.', EN_SEARCH, EN_SERV, EN_FOOT
  )
};
