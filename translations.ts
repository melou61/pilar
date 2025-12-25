
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
    c: ['Patrocinado', 'Sin resultados', 'Volver', 'Compartir', 'Detalles', 'Abierto', 'Cerrado', 'Mapa', 'Cerca', 'Buscar...', 'Añadir', 'Subir', 'Copiar', 'Copiado', 'Error', 'Cargando...', 'Pensando...', 'Ver Detalles', 'Todos'], 
    h: 'Paraíso mediterráneo.', 
    s: ['Sede Electrónica', 'Ayuntamiento 24h', 'Cita Previa', 'Incidencias', 'Reportar', 'Trámites', 'Certificados', 'Impuestos', 'Licencias'],
    hp: {
      pilar_vivo: 'PILAR VIVO',
      smart_active: 'Smart PH Activo',
      create_postcard: 'Crear Postal IA',
      shorts_label: 'Pilar en 15s',
      gallery_label: 'Vistas',
      views: 'vistas',
      shorts_titles: ['Amanecer en Las Higuericas', 'Ruta por Río Seco', 'Tarde de Compras', 'Fiestas del Pilar']
    },
    f: ['Contacto', 'Enlaces de interés', 'Síguenos', 'La App oficial del municipio.', 'Oficina de Turismo', 'Calle Mayor, 1', '03190', 'Alicante, España', 'Todos los derechos reservados'],
    search: { badge: 'Buscador Inteligente', subtitle1: 'Encuentra comercios, eventos', subtitle2: 'y servicios municipales.', placeholder: '¿Qué buscas hoy?', noResults: 'No hay resultados para' },
    ai: { welcome: 'Hola, soy tu conserje virtual de Pilar de la Horadada. ¿En qué puedo ayudarte?', system: 'Eres PH Concierge, la guía oficial de Pilar de la Horadada.', online: 'En línea', voice_btn: 'Hablar ahora' },
    header: { selectLanguage: 'Seleccionar Idioma' },
    beacon: { title: 'SMART PH DETECTADO', subtitle: 'Oferta Cercana', exclusive: 'Exclusivo App', activate: 'Activar Cupón', footer: 'Oferta válida solo por proximidad física', codeLabel: 'Código de Canje' },
    lens: { title: 'Explorador PH Lens', scanBtn: 'Escanear Patrimonio', newScan: 'Nueva Captura', analyzing: 'Analizando...', identified: 'Identificado' },
    postcard: { title: 'AI MOMENTOS', subtitle: 'Imagina Pilar de la Horadada', desc: 'Nuestra IA creativa creará una postal única.', save: 'Guardar', create: 'Crear Otra', placeholder: 'Escribe tu visión de Pilar...', generating: 'Generando tu visión...', suggestions: ["Atardecer Higuericas", "Torre futurista", "Río Seco mágico", "Plaza Iglesia"] },
    beaches_page: { title: 'Nuestras Playas', coastal: 'El Litoral del Pilar', blue_flag: 'Bandera Azul', open: 'Abierta Ahora', fact_title: 'Excelencia Mediterránea', list: { milpalmeras: { name: 'Mil Palmeras', desc: 'Paraíso de arena blanca.' } } },
    sightseeing_page: { title: 'Joyas del Patrimonio', list: { 'torre-vigia': { name: 'Torre de la Horadada', desc: 'Símbolo de nuestra costa.' } } },
    health: { title: 'Pilar Saludable', subtitle: 'Salud y Bienestar', emergency: 'Emergencias', center: 'Centro Salud', pharmacy: 'Farmacia de Guardia' },
    forum: { title: 'Comunidad Pilar', subtitle: 'Conecta con tus vecinos', categories: ['Recomendaciones', 'General', 'Mascotas', 'Mercadillo'] }
  },
  en: { 
    m: ['Home', 'News', 'Beaches', 'Heritage', 'Experiences', 'Dining', 'Shops', 'Health', 'Services', 'Events', 'Forum', 'PH Explore', 'AI Guide', 'Profile', 'Map', 'Admin'], 
    c: ['Sponsored', 'No results', 'Back', 'Share', 'Details', 'Open', 'Closed', 'Full Map', 'Near you', 'Search...', 'Add', 'Upload', 'Copy', 'Copied', 'Error', 'Loading...', 'Thinking...', 'View Details', 'All'], 
    h: 'Mediterranean paradise.', 
    s: ['Digital Portal', 'Town Hall 24h', 'Appointment', 'Incidents', 'Report', 'Procedures', 'Certificates', 'Taxes', 'Licenses'],
    hp: {
      pilar_vivo: 'LIVING PILAR',
      smart_active: 'Smart PH Active',
      create_postcard: 'Create AI Postcard',
      shorts_label: 'Pilar in 15s',
      gallery_label: 'Views',
      views: 'views',
      shorts_titles: ['Sunrise at Higuericas', 'Rio Seco Route', 'Shopping Day', 'Town Festivals']
    },
    f: ['Contact', 'Useful Links', 'Follow Us', 'The official town application.', 'Tourism Office', '1 Mayor St.', '03190', 'Alicante, Spain', 'All rights reserved'],
    search: { badge: 'Smart Search', subtitle1: 'Find shops, events', subtitle2: 'and citizen services.', placeholder: 'What are you looking for?', noResults: 'No results for' },
    ai: { welcome: 'Hello, I am your Pilar de la Horadada virtual concierge. How can I help you?', system: 'You are PH Concierge, the official guide for Pilar de la Horadada.', online: 'Online', voice_btn: 'Speak now' },
    header: { selectLanguage: 'Select Language' },
    beacon: { title: 'SMART PH DETECTADO', subtitle: 'Nearby Offer', exclusive: 'App Exclusive', activate: 'Activate Coupon', footer: 'Valid by physical proximity only', codeLabel: 'Redemption Code' },
    lens: { title: 'PH Lens Explorer', scanBtn: 'Scan Heritage', newScan: 'New Capture', analyzing: 'Analyzing...', identified: 'Identified' },
    postcard: { title: 'AI MOMENTS', subtitle: 'Imagine Pilar de la Horadada', desc: 'Our AI will create a unique postcard based on your description.', save: 'Save', create: 'Create Another', placeholder: 'Write your vision of Pilar...', generating: 'Generating vision...', suggestions: ["Higuericas Sunset", "Futuristic Tower", "Magic Dry River", "Church Square"] },
    beaches_page: { title: 'Our Beaches', coastal: 'Pilar Coastline', blue_flag: 'Blue Flag', open: 'Open Now', fact_title: 'Excellence', list: { milpalmeras: { name: 'Mil Palmeras', desc: 'A white sand paradise.' } } },
    sightseeing_page: { title: 'Heritage Jewels', list: { 'torre-vigia': { name: 'Watchtower', desc: 'Symbol of our coast.' } } },
    health: { title: 'Healthy Pilar', subtitle: 'Health & Wellness', emergency: 'Emergencies', center: 'Health Center', pharmacy: 'Pharmacy on Duty' },
    forum: { title: 'Pilar Community', subtitle: 'Connect with neighbors', categories: ['Recommendations', 'General', 'Pets', 'Marketplace'] }
  },
  fr: { 
    m: ['Accueil', 'Nouvelles', 'Plages', 'Patrimoine', 'Expériences', 'Gastronomie', 'Boutiques', 'Santé', 'Services', 'Événements', 'Forum', 'PH Explorer', 'Guide IA', 'Profil', 'Carte', 'Admin'], 
    c: ['Sponsorisé', 'Aucun résultat', 'Retour', 'Partager', 'Détails', 'Ouvert', 'Fermé', 'Carte', 'Près de vous', 'Chercher...', 'Ajouter', 'Télécharger', 'Copier', 'Copié', 'Erreur', 'Chargement...', 'Réflexion...', 'Détails', 'Tout'], 
    h: 'Paradis méditerranéen.'
  },
  de: { 
    m: ['Start', 'Nachrichten', 'Strände', 'Kulturerbe', 'Erlebnisse', 'Gastronomie', 'Geschäfte', 'Gesundheit', 'Dienste', 'Events', 'Forum', 'PH Erkunden', 'KI Guide', 'Profil', 'Karte', 'Admin'], 
    c: ['Gesponsert', 'Keine Ergebnisse', 'Zurück', 'Teilen', 'Details', 'Offen', 'Geschlossen', 'Karte', 'In der Nähe', 'Suche...', 'Hinzufügen', 'Hochladen', 'Kopieren', 'Kopiert', 'Fehler', 'Laden...', 'Denken...', 'Details', 'Alle'], 
    h: 'Mediterranes Paradies.'
  },
  it: { 
    m: ['Inizio', 'Notizie', 'Spiagge', 'Patrimonio', 'Esperienze', 'Gastronomia', 'Negozi', 'Salute', 'Servizi', 'Eventi', 'Forum', 'PH Esplora', 'Guida IA', 'Profilo', 'Mappa', 'Admin'], 
    c: ['Sponsorizzato', 'Nessun risultato', 'Indietro', 'Condividi', 'Dettagli', 'Aperto', 'Chiuso', 'Mappa', 'Vicino a te', 'Cerca...', 'Aggiungi', 'Carica', 'Copia', 'Copiato', 'Errore', 'Caricamento...', 'Pensando...', 'Dettagli', 'Tutti'], 
    h: 'Paradiso mediterraneo.'
  },
  pt: { 
    m: ['Início', 'Notícias', 'Praias', 'Património', 'Experiências', 'Gastronomia', 'Lojas', 'Saúde', 'Serviços', 'Eventos', 'Fórum', 'PH Explorar', 'Guia IA', 'Perfil', 'Mapa', 'Admin'], 
    c: ['Patrocinado', 'Sem resultados', 'Voltar', 'Partilhar', 'Detalhes', 'Aberto', 'Fechado', 'Mapa', 'Perto de si', 'Procurar...', 'Adicionar', 'Subir', 'Copiar', 'Copiado', 'Erro', 'A carregar...', 'A pensar...', 'Detalhes', 'Todos'], 
    h: 'Paraíso mediterrânico.'
  }
};

const createLang = (code: string, langLabel: string): any => {
  const data = UI_RESOURCES[code] || UI_RESOURCES.en;
  const en = UI_RESOURCES.en;
  
  // Garantizamos fallbacks para arrays críticos
  const m = data.m || en.m;
  const c = data.c || en.c;
  const s = data.s || en.s;
  const f = data.f || en.f;

  const get = (obj: any, path: string, fallback: any) => {
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current && current[part] !== undefined) current = current[part];
      else return fallback;
    }
    return current;
  };

  return {
    menu: { 
      home: m[0], news: m[1], beaches: m[2], sightseeing: m[3], 
      activities: m[4], dining: m[5], shopping: m[6], health: m[7], 
      services: m[8], events: m[9], forum: m[10], title: m[11], 
      ai: m[12], profile: m[13], map: m[14], admin: m[15] 
    },
    common: { 
      sponsored: c[0], noResults: c[1], back: c[2], share: c[3], 
      details: c[4], open: c[5], closed: c[6], fullMap: c[7], 
      nearby: c[8], searchPlaceholder: c[9], addToCalendar: c[10], 
      upload: c[11], copyLink: c[12], copied: c[13], error: c[14],
      loading: c[15], thinking: c[16], view_details: c[17], all: c[18]
    },
    hero: { subtitle: data.h || en.h },
    ai_guide: { 
      title: m[12], 
      welcome: get(data, 'ai.welcome', en.ai.welcome), 
      online: get(data, 'ai.online', en.ai.online), 
      placeholder: get(data, 'search.placeholder', en.search.placeholder), 
      voice_btn: get(data, 'ai.voice_btn', en.ai.voice_btn),
      system: get(data, 'ai.system', en.ai.system)
    },
    header: data.header || en.header,
    home_page: data.hp || en.hp,
    beacon: data.beacon || en.beacon,
    lens: data.lens || en.lens,
    postcard: data.postcard || en.postcard,
    citizen_services: { 
        title: s[0], subtitle: s[1], appointment: s[2], 
        incidents: s[3], report: s[4], frequent: s[5], 
        certificate: s[6], taxes: s[7], licenses: s[8] 
    },
    sections: { 
        shopping: { title: m[6] }, 
        dining: { title: m[5] }, 
        events: { title: m[9] } 
    },
    footer: { 
        contact: f[0], links: f[1], follow: f[2], desc: f[3],
        officeName: f[4], addressLine1: f[5], addressLine2: f[6], addressLine3: f[7], rights: f[8]
    },
    search: data.search || en.search,
    share: { title: 'Share', subtitle: 'Platform', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'Twitter', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } },
    events_data: data.ed || en.ed,
    beaches_page: data.beaches_page || en.beaches_page,
    sightseeing_page: data.sightseeing_page || en.sightseeing_page,
    health: data.health || en.health,
    profile: data.profile || en.profile,
    forum: data.forum || en.forum,
    event_detail: { pilar_event: 'EVENTO PH', date_time: 'FECHA Y HORA', main_location: 'UBICACIÓN' }
  };
};

export const translations: Record<string, any> = {};
languages.forEach(lang => {
  translations[lang.code] = createLang(lang.code, lang.label);
});
