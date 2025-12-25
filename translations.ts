
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
    c: ['Patrocinado', 'Sin resultados', 'Volver', 'Compartir', 'Detalles', 'Abierto', 'Cerrado', 'Mapa', 'Cerca', 'Buscar...', 'Añadir', 'Subir', 'Copiar', 'Copiado', 'Error', 'Cargando...', 'Pensando...'], 
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
    postcard: { title: 'AI MOMENTOS', subtitle: 'Imagina Pilar de la Horadada', desc: 'Nuestra IA creativa creará una postal única.', save: 'Guardar', create: 'Crear Otra', placeholder: 'Escribe tu visión de Pilar...', generating: 'Generando tu visión...' },
    beaches_page: { title: 'Nuestras Playas', coastal: 'El Litoral del Pilar', blue_flag: 'Bandera Azul', open: 'Abierta Ahora', fact_title: 'Excelencia Mediterránea', list: { milpalmeras: { name: 'Mil Palmeras', desc: 'Paraíso de arena blanca.' } } },
    sightseeing_page: { title: 'Joyas del Patrimonio', list: { 'torre-vigia': { name: 'Torre de la Horadada', desc: 'Símbolo de nuestra costa.' } } }
  },
  en: { 
    m: ['Home', 'News', 'Beaches', 'Heritage', 'Experiences', 'Dining', 'Shops', 'Health', 'Services', 'Events', 'Forum', 'PH Explore', 'AI Guide', 'Profile', 'Map', 'Admin'], 
    c: ['Sponsored', 'No results', 'Back', 'Share', 'Details', 'Open', 'Closed', 'Full Map', 'Near you', 'Search...', 'Add', 'Upload', 'Copy', 'Copied', 'Error', 'Loading...', 'Thinking...'], 
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
    beacon: { title: 'SMART PH DETECTED', subtitle: 'Nearby Offer', exclusive: 'App Exclusive', activate: 'Activate Coupon', footer: 'Valid by physical proximity only', codeLabel: 'Redemption Code' },
    lens: { title: 'PH Lens Explorer', scanBtn: 'Scan Heritage', newScan: 'New Capture', analyzing: 'Analyzing...', identified: 'Identified' },
    postcard: { title: 'AI MOMENTS', subtitle: 'Imagine Pilar de la Horadada', desc: 'Our AI will create a unique postcard based on your description.', save: 'Save', create: 'Create Another', placeholder: 'Write your vision of Pilar...', generating: 'Generating vision...' },
    beaches_page: { title: 'Our Beaches', coastal: 'Pilar Coastline', blue_flag: 'Blue Flag', open: 'Open Now', fact_title: 'Excellence', list: { milpalmeras: { name: 'Mil Palmeras', desc: 'A white sand paradise.' } } },
    sightseeing_page: { title: 'Heritage Jewels', list: { 'torre-vigia': { name: 'Watchtower', desc: 'Symbol of our coast.' } } }
  },
  fr: { 
    m: ['Accueil', 'Nouvelles', 'Plages', 'Patrimoine', 'Expériences', 'Gastronomie', 'Boutiques', 'Santé', 'Services', 'Événements', 'Forum', 'PH Explorer', 'Guide IA', 'Profil', 'Carte', 'Admin'], 
    c: ['Sponsorisé', 'Aucun résultat', 'Retour', 'Partager', 'Détails', 'Ouvert', 'Fermé', 'Carte', 'Près de vous', 'Chercher...', 'Ajouter', 'Télécharger', 'Copier', 'Copié', 'Erreur', 'Chargement...', 'Réflexion...'], 
    h: 'Paradis méditerranéen.', 
    s: ['Sede Électronique', 'Mairie 24h', 'Rendez-vous', 'Incidents', 'Signaler', 'Procédures', 'Certificats', 'Impôts', 'Licences'],
    hp: {
      pilar_vivo: 'PILAR VIVANT',
      smart_active: 'Smart PH Actif',
      create_postcard: 'Créer Carte IA',
      shorts_label: 'Pilar en 15s',
      gallery_label: 'Vues',
      views: 'vues',
      shorts_titles: ['Lever du soleil', 'Route Rio Seco', 'Shopping', 'Festivités']
    },
    f: ['Contact', 'Liens utiles', 'Suivez-nous', 'App officielle.', 'Office Tourisme', 'Rue Mayor, 1', '03190', 'Alicante, Espagne', 'Tous droits réservés'],
    search: { badge: 'Recherche IA', subtitle1: 'Trouvez boutiques, événements', subtitle2: 'et services municipaux.', placeholder: 'Que cherchez-vous?', noResults: 'Aucun résultat pour' },
    ai: { welcome: 'Bonjour, je suis votre concierge virtuel.', system: 'Vous êtes PH Concierge.', online: 'En ligne', voice_btn: 'Parler maintenant' },
    header: { selectLanguage: 'Choisir la langue' },
    beacon: { title: 'SMART PH DÉTECTÉ', subtitle: 'Offre Proche', activate: 'Activer le Coupon' },
    lens: { scanBtn: 'Scanner Patrimoine', newScan: 'Nouvelle Capture' },
    postcard: { save: 'Sauvegarder', create: 'Créer une autre' },
    beaches_page: { title: 'Nos Plages', list: { milpalmeras: { name: 'Mil Palmeras', desc: 'Un paradis de sable blanc.' } } },
    sightseeing_page: { title: 'Patrimoine', list: { 'torre-vigia': { name: 'Tour de Guet', desc: 'Symbole de notre côte.' } } }
  },
  de: { 
    m: ['Start', 'Nachrichten', 'Strände', 'Kulturerbe', 'Erlebnisse', 'Gastronomie', 'Geschäfte', 'Gesundheit', 'Dienste', 'Events', 'Forum', 'PH Erkunden', 'KI Guide', 'Profil', 'Karte', 'Admin'], 
    c: ['Gesponsert', 'Keine Ergebnisse', 'Zurück', 'Teilen', 'Details', 'Offen', 'Geschlossen', 'Karte', 'In der Nähe', 'Suche...', 'Hinzufügen', 'Hochladen', 'Kopieren', 'Kopiert', 'Fehler', 'Laden...', 'Denken...'], 
    h: 'Mediterranes Paradies.', 
    s: ['Online-Portal', 'Rathaus 24h', 'Termin', 'Vorfälle', 'Bericht', 'Verfahren', 'Zertifikate', 'Steuern', 'Lizenzen'],
    hp: {
      pilar_vivo: 'PILAR LEBT',
      smart_active: 'Smart PH Aktiv',
      create_postcard: 'KI Postkarte',
      shorts_label: 'Pilar in 15s',
      gallery_label: 'Ansichten',
      views: 'ansichten',
      shorts_titles: ['Sonnenaufgang', 'Rio Seco Route', 'Shopping-Tag', 'Stadtfeste']
    },
    f: ['Contact', 'Nützliche Links', 'Folgen Sie uns', 'Offizielle App.', 'Tourismusbüro', 'Mayor Str. 1', '03190', 'Alicante, Spanien', 'Alle Rechte vorbehalten'],
    search: { badge: 'KI Suche', subtitle1: 'Finden Sie Shops, Events', subtitle2: 'und Dienste.', placeholder: 'Was suchen Sie?', noResults: 'Keine Ergebnisse für' },
    ai: { welcome: 'Hallo, ich bin Ihr virtueller Concierge.', online: 'Online', voice_btn: 'Jetzt sprechen' },
    header: { selectLanguage: 'Sprache wählen' },
    beacon: { title: 'SMART PH ENTDECKT', subtitle: 'Angebot in der Nähe', activate: 'Gutschein aktivieren' },
    lens: { scanBtn: 'Kulturerbe scannen', newScan: 'Neuer Scan' },
    postcard: { save: 'Speichern', create: 'Neu erstellen' },
    beaches_page: { title: 'Unsere Strände', list: { milpalmeras: { name: 'Mil Palmeras', desc: 'Ein Paradies.' } } },
    sightseeing_page: { title: 'Kulturschätze', list: { 'torre-vigia': { name: 'Turm Horadada', desc: 'Symbol.' } } }
  },
  it: { 
    m: ['Inizio', 'Notizie', 'Spiagge', 'Patrimonio', 'Esperienze', 'Gastronomia', 'Negozi', 'Salute', 'Servizi', 'Eventi', 'Forum', 'PH Esplora', 'Guida IA', 'Profilo', 'Mappa', 'Admin'], 
    c: ['Sponsorizzato', 'Nessun risultato', 'Indietro', 'Condividi', 'Dettagli', 'Aperto', 'Chiuso', 'Mappa', 'Vicino a te', 'Cerca...', 'Aggiungi', 'Carica', 'Copia', 'Copiato', 'Errore', 'Caricamento...', 'Pensando...'], 
    h: 'Paradiso mediterraneo.', 
    s: ['Sede Elettronica', 'Comune 24h', 'Appuntamento', 'Incidenti', 'Segnala', 'Procedure', 'Certificati', 'Tasse', 'Licenze'],
    hp: {
      pilar_vivo: 'PILAR VIVO',
      smart_active: 'Smart PH Attivo',
      create_postcard: 'Crea Cartolina IA',
      shorts_label: 'Pilar in 15s',
      gallery_label: 'Viste',
      views: 'viste',
      shorts_titles: ['Alba a Higuericas', 'Percorso Rio Seco', 'Shopping', 'Feste']
    },
    f: ['Contatto', 'Link utili', 'Seguici', 'App ufficiale.', 'Ufficio Turistico', 'Via Mayor 1', '03190', 'Alicante, Spagna', 'Tutti i diritti riservati'],
    search: { badge: 'Ricerca IA', subtitle1: 'Trova negozi, eventos', subtitle2: 'e servizi.', placeholder: 'Cosa cerchi?', noResults: 'Nessun resultado per' },
    ai: { welcome: 'Ciao, sono il tuo concierge virtuale.', online: 'Online', voice_btn: 'Parla ora' },
    header: { selectLanguage: 'Seleziona lingua' },
    beacon: { title: 'SMART PH RILEVATO', subtitle: 'Offerta Vicina', activate: 'Attiva Coupon' },
    lens: { scanBtn: 'Scansiona Patrimonio', newScan: 'Nuova Cattura' },
    postcard: { save: 'Salva', create: 'Crea un\'altra' },
    beaches_page: { title: 'Spiagge', list: { milpalmeras: { name: 'Mil Palmeras', desc: 'Un paradiso.' } } },
    sightseeing_page: { title: 'Patrimonio', list: { 'torre-vigia': { name: 'Torre Horadada', desc: 'Simbolo.' } } }
  },
  pt: { 
    m: ['Início', 'Notícias', 'Praias', 'Património', 'Experiências', 'Gastronomia', 'Lojas', 'Saúde', 'Serviços', 'Eventos', 'Fórum', 'PH Explorar', 'Guia IA', 'Perfil', 'Mapa', 'Admin'], 
    c: ['Patrocinado', 'Sem resultados', 'Voltar', 'Partilhar', 'Detalhes', 'Aberto', 'Fechado', 'Mapa', 'Perto de si', 'Procurar...', 'Adicionar', 'Subir', 'Copiar', 'Copiado', 'Erro', 'A carregar...', 'A pensar...'], 
    h: 'Paraíso mediterrânico.', 
    s: ['Sede Eletrónica', 'Câmara 24h', 'Agendamento', 'Incidentes', 'Reportar', 'Trâmites', 'Certificados', 'Impostos', 'Licenças'],
    hp: {
      pilar_vivo: 'PILAR VIVO',
      smart_active: 'Smart PH Ativo',
      create_postcard: 'Criar Postal IA',
      shorts_label: 'Pilar em 15s',
      gallery_label: 'Vistas',
      views: 'vistas',
      shorts_titles: ['Nascer do sol', 'Rota Rio Seco', 'Shopping', 'Festas']
    },
    f: ['Contacto', 'Links úteis', 'Siga-nos', 'App oficial.', 'Posto de Turismo', 'Rua Mayor 1', '03190', 'Alicante, España', 'Todos os direitos reservados'],
    search: { badge: 'Busca IA', subtitle1: 'Encontre lojas, eventos', subtitle2: 'e serviços.', placeholder: 'O que procura?', noResults: 'Sem resultados para' },
    ai: { welcome: 'Olá, sou o seu concierge virtual.', online: 'Online', voice_btn: 'Falar agora' },
    header: { selectLanguage: 'Selecionar idioma' },
    beacon: { title: 'SMART PH DETETADO', subtitle: 'Oferta Próxima', activate: 'Ativar Cupão' },
    lens: { scanBtn: 'Escanear Património', newScan: 'Nova Captura' },
    postcard: { save: 'Guardar', create: 'Criar outro' },
    beaches_page: { title: 'Praias', list: { milpalmeras: { name: 'Mil Palmeras', desc: 'Um paraíso.' } } },
    sightseeing_page: { title: 'Património', list: { 'torre-vigia': { name: 'Torre Horadada', desc: 'Símbolo.' } } }
  }
};

const createLang = (code: string, langLabel: string): any => {
  const data = UI_RESOURCES[code] || UI_RESOURCES.en;
  const en = UI_RESOURCES.en;
  
  // Función auxiliar para obtener valores con fallback a inglés
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
      home: data.m[0], news: data.m[1], beaches: data.m[2], sightseeing: data.m[3], 
      activities: data.m[4], dining: data.m[5], shopping: data.m[6], health: data.m[7], 
      services: data.m[8], events: data.m[9], forum: data.m[10], title: data.m[11], 
      ai: data.m[12], profile: data.m[13], map: data.m[14], admin: data.m[15] 
    },
    common: { 
      sponsored: data.c[0], noResults: data.c[1], back: data.c[2], share: data.c[3], 
      details: data.c[4], open: data.c[5], closed: data.c[6], fullMap: data.c[7], 
      nearby: data.c[8], searchPlaceholder: data.c[9], addToCalendar: data.c[10], 
      upload: data.c[11], copyLink: data.c[12], copied: data.c[13], error: data.c[14],
      loading: data.c[15], thinking: data.c[16]
    },
    hero: { subtitle: data.h },
    ai_guide: { 
      title: data.m[12], 
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
        title: data.s[0], subtitle: data.s[1], appointment: data.s[2], 
        incidents: data.s[3], report: data.s[4], frequent: data.s[5], 
        certificate: data.s[6], taxes: data.s[7], licenses: data.s[8] 
    },
    sections: { 
        shopping: { title: data.m[6] }, 
        dining: { title: data.m[5] }, 
        events: { title: data.m[9] } 
    },
    footer: { 
        contact: data.f[0], links: data.f[1], follow: data.f[2], desc: data.f[3],
        officeName: data.f[4], addressLine1: data.f[5], addressLine2: data.f[6], addressLine3: data.f[7], rights: data.f[8]
    },
    search: data.search || en.search,
    share: { title: 'Share', subtitle: 'Platform', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'Twitter', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } },
    events_data: data.ed || en.ed,
    beaches_page: data.beaches_page || en.beaches_page,
    sightseeing_page: data.sightseeing_page || en.sightseeing_page,
    profile: data.profile || en.profile,
    forum: data.forum || en.forum,
    event_detail: { pilar_event: 'EVENTO PH', date_time: 'FECHA Y HORA', main_location: 'UBICACIÓN' }
  };
};

export const translations: Record<string, any> = {};
languages.forEach(lang => {
  translations[lang.code] = createLang(lang.code, lang.label);
});
