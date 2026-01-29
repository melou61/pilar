
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
    permissions: {
      title: 'Permisos Necesarios',
      subtitle: 'Para disfrutar de la experiencia completa de Pilar Vivo, necesitamos acceso a:',
      loc_title: 'Ubicación',
      loc_desc: 'Para mostrarte playas y comercios cercanos.',
      mic_title: 'Micrófono',
      mic_desc: 'Para hablar con el Asistente IA en tiempo real.',
      cam_title: 'Cámara',
      cam_desc: 'Para usar PH Lens y reconocer el entorno.',
      btn: 'Permitir y Continuar',
      footer: 'Puedes cambiar esto en los ajustes de tu dispositivo.'
    },
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
        vistamar: { name: 'Playa Vistamar', desc: 'Playa de arena dorada que conecta con la urbanización de Mil Palmeras.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'Una de las playas más visitadas, con arena fina y múltiples servicios.' },
        delrio: { name: 'Playa del Río', desc: 'Situada en la desembocadura del Río Seco, ofrece un paisaje singular.' },
        rocamar: { name: 'Calas de Rocamar', desc: 'Pequeñas calas unidas que ofrecen privacidad y aguas cristalinas.' },
        jesuitas: { name: 'Playa de los Jesuitas', desc: 'Amplia cala delimitada por paredes de arcilla rojiza, muy característica.' },
        elconde: { name: 'Playa del Conde', desc: 'A los pies de la Torre Vigía, perfecta para familias y con mucha historia.' },
        elpuerto: { name: 'Playa del Puerto', desc: 'Accesible desde el puerto deportivo, con rampas y zona de juegos.' },
        lasvillas: { name: 'Playa Las Villas', desc: 'Playa de arena blanca y ambiente tranquilo, cerca de Higuericas.' },
        higuericas: { name: 'Las Higuericas', desc: 'Extensa playa con dunas naturales, muy popular para conciertos y deporte.' },
        elmojon: { name: 'Playa El Mojón', desc: 'Playa abierta con un bonito paseo marítimo y zona de pesca tradicional.' }
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
    permissions: {
      title: 'Permissions Needed',
      subtitle: 'To enjoy the full experience of Pilar Vivo, we need access to:',
      loc_title: 'Location',
      loc_desc: 'To show you nearby beaches and shops.',
      mic_title: 'Microphone',
      mic_desc: 'To talk with the AI Assistant in real-time.',
      cam_title: 'Camera',
      cam_desc: 'To use PH Lens and recognize landmarks.',
      btn: 'Allow and Continue',
      footer: 'You can change this later in your device settings.'
    },
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
        vistamar: { name: 'Vistamar Beach', desc: 'Golden sandy beach connecting with the Mil Palmeras urbanization.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'One of the most visited beaches, with fine sand and multiple services.' },
        delrio: { name: 'Del Río Beach', desc: 'Located at the mouth of the Río Seco, offering a unique landscape.' },
        rocamar: { name: 'Rocamar Coves', desc: 'Small connected coves offering privacy and crystal clear waters.' },
        jesuitas: { name: 'Jesuitas Beach', desc: 'Wide cove bordered by reddish clay walls, very characteristic.' },
        elconde: { name: 'El Conde Beach', desc: 'At the foot of the Watchtower, perfect for families and full of history.' },
        elpuerto: { name: 'The Port Beach', desc: 'Accessible from the marina, with ramps and a playground area.' },
        lasvillas: { name: 'Las Villas Beach', desc: 'White sandy beach with a quiet atmosphere, near Higuericas.' },
        higuericas: { name: 'Las Higuericas', desc: 'Extensive beach with natural dunes, very popular for concerts and sports.' },
        elmojon: { name: 'El Mojón Beach', desc: 'Open beach with a beautiful promenade and traditional fishing area.' }
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
  },
  va: {
    header: { selectLanguage: 'Seleccionar Idioma' },
    beaches_page: {
        title: 'Les Nostres Platges',
        coastal: 'El Litoral del Pilar',
        blue_flag: 'Bandera Blava',
        open: 'Oberta Ara',
        fact_title: 'Excel·lència Mediterrània',
        fact_desc: 'Pilar de la Horadada compta amb més de 4km de platges d\'arena fina i aigües cristal·lines.',
        list: {
        vistamar: { name: 'Platja Vistamar', desc: 'Platja d\'arena daurada que connecta amb la urbanització de Mil Palmeres.' },
        milpalmeras: { name: 'Mil Palmeres', desc: 'Una de les platges més visitades, amb arena fina i múltiples serveis.' },
        delrio: { name: 'Platja del Riu', desc: 'Situada a la desembocadura del Riu Sec, ofereix un paisatge singular.' },
        rocamar: { name: 'Cales de Rocamar', desc: 'Xicotetes cales unides que ofereixen privacitat i aigües cristal·lines.' },
        jesuitas: { name: 'Platja dels Jesuïtes', desc: 'Àmplia cala delimitada per parets d\'argila vermellosa, molt característica.' },
        elconde: { name: 'Platja del Comte', desc: 'Als peus de la Torre Vigia, perfecta per a famílies i amb molta història.' },
        elpuerto: { name: 'Platja del Port', desc: 'Accessible des del port esportiu, amb rampes i zona de jocs.' },
        lasvillas: { name: 'Platja Les Viles', desc: 'Platja d\'arena blanca i ambient tranquil, prop de Higuericas.' },
        higuericas: { name: 'Les Higuericas', desc: 'Extensa platja amb dunes naturals, molt popular per a concerts i esport.' },
        elmojon: { name: 'Platja El Mojón', desc: 'Platja oberta amb un bonic passeig marítim i zona de pesca tradicional.' }
        }
    },
    m: ['Inici', 'Notícies', 'Platges', 'Patrimoni', 'Experiències', 'Gastronomia', 'Botigues', 'Salut', 'Serveis', 'Esdeveniments', 'Fòrum', 'PH Explore', 'Guia IA', 'Perfil', 'Mapa', 'Admin']
  },
  fr: {
    header: { selectLanguage: 'Choisir la langue' },
    beaches_page: {
        title: 'Nos Plages',
        coastal: 'Littoral du Pilar',
        blue_flag: 'Pavillon Bleu',
        open: 'Ouvert',
        fact_title: 'Excellence',
        fact_desc: 'Pilar de la Horadada offre plus de 4 km de plages de sable fin et d\'eaux cristallines.',
        list: {
        vistamar: { name: 'Plage Vistamar', desc: 'Plage de sable doré reliant l\'urbanisation de Mil Palmeras.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'L\'une des plages les plus visitées, avec sable fin et nombreux services.' },
        delrio: { name: 'Plage Del Río', desc: 'Située à l\'embouchure de la rivière Seco, offrant un paysage unique.' },
        rocamar: { name: 'Criques de Rocamar', desc: 'Petites criques reliées offrant intimité et eaux cristallines.' },
        jesuitas: { name: 'Plage des Jésuites', desc: 'Large crique bordée de parois d\'argile rougeâtre, très caractéristique.' },
        elconde: { name: 'Plage El Conde', desc: 'Au pied de la tour de guet, parfaite pour les familles et chargée d\'histoire.' },
        elpuerto: { name: 'Plage du Port', desc: 'Accessible depuis le port de plaisance, avec rampes et aire de jeux.' },
        lasvillas: { name: 'Plage Las Villas', desc: 'Plage de sable blanc à l\'atmosphère calme, près de Higuericas.' },
        higuericas: { name: 'Las Higuericas', desc: 'Vaste plage avec dunes naturelles, très populaire pour les concerts et le sport.' },
        elmojon: { name: 'Plage El Mojón', desc: 'Plage ouverte avec une belle promenade et une zone de pêche traditionnelle.' }
        }
    },
    m: ['Accueil', 'Actualités', 'Plages', 'Patrimoine', 'Expériences', 'Gastronomie', 'Boutiques', 'Santé', 'Services', 'Événements', 'Forum', 'PH Explore', 'Guide IA', 'Profil', 'Carte', 'Admin']
  },
  de: {
    header: { selectLanguage: 'Sprache wählen' },
    beaches_page: {
        title: 'Unsere Strände',
        coastal: 'Küste von Pilar',
        blue_flag: 'Blaue Flagge',
        open: 'Geöffnet',
        fact_title: 'Exzellenz',
        fact_desc: 'Pilar de la Horadada bietet über 4 km feine Sandstrände und kristallklares Wasser.',
        list: {
        vistamar: { name: 'Strand Vistamar', desc: 'Goldener Sandstrand, der mit der Siedlung Mil Palmeras verbunden ist.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'Einer der meistbesuchten Strände mit feinem Sand und vielen Dienstleistungen.' },
        delrio: { name: 'Strand Del Río', desc: 'An der Mündung des Río Seco gelegen, bietet eine einzigartige Landschaft.' },
        rocamar: { name: 'Buchten von Rocamar', desc: 'Kleine verbundene Buchten, die Privatsphäre und kristallklares Wasser bieten.' },
        jesuitas: { name: 'Jesuitenstrand', desc: 'Breite Bucht, begrenzt von rötlichen Lehmwänden, sehr charakteristisch.' },
        elconde: { name: 'Strand El Conde', desc: 'Am Fuße des Wachturms, perfekt für Familien und voller Geschichte.' },
        elpuerto: { name: 'Hafenstrand', desc: 'Vom Yachthafen aus zugänglich, mit Rampen und Spielplatz.' },
        lasvillas: { name: 'Strand Las Villas', desc: 'Weißer Sandstrand mit ruhiger Atmosphäre, in der Nähe von Higuericas.' },
        higuericas: { name: 'Las Higuericas', desc: 'Weitläufiger Strand mit natürlichen Dünen, sehr beliebt für Konzerte und Sport.' },
        elmojon: { name: 'Strand El Mojón', desc: 'Offener Strand mit schöner Promenade und traditionellem Fischereigebiet.' }
        }
    },
    m: ['Start', 'Nachrichten', 'Strände', 'Kultur', 'Erlebnisse', 'Gastronomie', 'Einkaufen', 'Gesundheit', 'Dienste', 'Events', 'Forum', 'PH Explore', 'KI Guide', 'Profil', 'Karte', 'Admin']
  },
  it: {
    header: { selectLanguage: 'Seleziona Lingua' },
    beaches_page: {
        title: 'Le Nostre Spiagge',
        coastal: 'Litorale del Pilar',
        blue_flag: 'Bandiera Blu',
        open: 'Aperto',
        fact_title: 'Eccellenza',
        fact_desc: 'Pilar de la Horadada offre oltre 4 km di spiagge di sabbia fine e acque cristalline.',
        list: {
        vistamar: { name: 'Spiaggia Vistamar', desc: 'Spiaggia di sabbia dorata collegata all\'urbanizzazione Mil Palmeras.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'Una delle spiagge più visitate, con sabbia fine e molti servizi.' },
        delrio: { name: 'Spiaggia Del Río', desc: 'Situata alla foce del Río Seco, offre un paesaggio unico.' },
        rocamar: { name: 'Cale di Rocamar', desc: 'Piccole cale collegate che offrono privacy e acque cristalline.' },
        jesuitas: { name: 'Spiaggia dei Gesuiti', desc: 'Ampia cala delimitata da pareti di argilla rossastra, molto caratteristica.' },
        elconde: { name: 'Spiaggia El Conde', desc: 'Ai piedi della Torre di Guardia, perfetta per le famiglie e ricca di storia.' },
        elpuerto: { name: 'Spiaggia del Porto', desc: 'Accessibile dal porto turistico, con rampe e area giochi.' },
        lasvillas: { name: 'Spiaggia Las Villas', desc: 'Spiaggia di sabbia bianca con atmosfera tranquilla, vicino a Higuericas.' },
        higuericas: { name: 'Las Higuericas', desc: 'Spiaggia estesa con dune naturali, molto popolare per concerti e sport.' },
        elmojon: { name: 'Spiaggia El Mojón', desc: 'Spiaggia aperta con un bel lungomare e zona di pesca tradizionale.' }
        }
    },
    m: ['Home', 'Notizie', 'Spiagge', 'Patrimonio', 'Esperienze', 'Gastronomia', 'Negozi', 'Salute', 'Servizi', 'Eventi', 'Forum', 'PH Explore', 'Guida IA', 'Profilo', 'Mappa', 'Admin']
  },
  pt: {
    header: { selectLanguage: 'Selecionar Idioma' },
    beaches_page: {
        title: 'As Nossas Praias',
        coastal: 'Litoral do Pilar',
        blue_flag: 'Bandeira Azul',
        open: 'Aberto',
        fact_title: 'Excelência',
        fact_desc: 'Pilar de la Horadada tem mais de 4km de praias de areia fina e águas cristalinas.',
        list: {
        vistamar: { name: 'Praia Vistamar', desc: 'Praia de areia dourada ligada à urbanização Mil Palmeras.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'Uma das praias mais visitadas, com areia fina e muitos serviços.' },
        delrio: { name: 'Praia Del Río', desc: 'Situada na foz do Rio Seco, oferece uma paisagem única.' },
        rocamar: { name: 'Calas de Rocamar', desc: 'Pequenas enseadas ligadas que oferecem privacidade e águas cristalinas.' },
        jesuitas: { name: 'Praia dos Jesuítas', desc: 'Enseada larga rodeada por paredes de argila avermelhada, muito característica.' },
        elconde: { name: 'Praia El Conde', desc: 'Aos pés da Torre de Vigia, perfeita para famílias e cheia de história.' },
        elpuerto: { name: 'Praia do Porto', desc: 'Acessível a partir da marina, com rampas e parque infantil.' },
        lasvillas: { name: 'Praia Las Villas', desc: 'Praia de areia branca com ambiente tranquilo, perto de Higuericas.' },
        higuericas: { name: 'Las Higuericas', desc: 'Praia extensa com dunas naturais, muito popular para concertos e desporto.' },
        elmojon: { name: 'Praia El Mojón', desc: 'Praia aberta com um belo passeio marítimo e zona de pesca tradicional.' }
        }
    },
    m: ['Início', 'Notícias', 'Praias', 'Património', 'Experiências', 'Gastronomia', 'Lojas', 'Saúde', 'Serviços', 'Eventos', 'Fórum', 'PH Explore', 'Guia IA', 'Perfil', 'Mapa', 'Admin']
  },
  ru: {
    header: { selectLanguage: 'Выберите язык' },
    beaches_page: {
        title: 'Наши Пляжи',
        coastal: 'Побережье Пилар',
        blue_flag: 'Голубой Флаг',
        open: 'Открыто',
        fact_title: 'Совершенство',
        fact_desc: 'Пилар-де-ла-Орадада предлагает более 4 км пляжей с мелким песком и кристально чистой водой.',
        list: {
        vistamar: { name: 'Пляж Вистамар', desc: 'Пляж с золотым песком, соединяющийся с урбанизацией Миль Пальмерас.' },
        milpalmeras: { name: 'Миль Пальмерас', desc: 'Один из самых посещаемых пляжей с мелким песком и множеством услуг.' },
        delrio: { name: 'Пляж Дель Рио', desc: 'Расположен в устье реки Секо, предлагает уникальный пейзаж.' },
        rocamar: { name: 'Бухты Рокамар', desc: 'Небольшие соединенные бухты, предлагающие уединение и чистую воду.' },
        jesuitas: { name: 'Пляж Иезуитов', desc: 'Широкая бухта, ограниченная стенами из красноватой глины, очень характерная.' },
        elconde: { name: 'Пляж Эль Конде', desc: 'У подножия Сторожевой башни, идеально подходит для семей и полон истории.' },
        elpuerto: { name: 'Пляж Порта', desc: 'Доступен из марины, с пандусами и детской площадкой.' },
        lasvillas: { name: 'Пляж Лас Виллас', desc: 'Пляж с белым песком и спокойной атмосферой, недалеко от Игерикас.' },
        higuericas: { name: 'Лас Игерикас', desc: 'Обширный пляж с природными дюнами, очень популярен для концертов и спорта.' },
        elmojon: { name: 'Пляж Эль Мохон', desc: 'Открытый пляж с красивой набережной и традиционной зоной рыбалки.' }
        }
    },
    m: ['Главная', 'Новости', 'Пляжи', 'Наследие', 'Опыт', 'Еда', 'Магазины', 'Здоровье', 'Услуги', 'События', 'Форум', 'PH Explore', 'AI Гид', 'Профиль', 'Карта', 'Админ']
  },
  zh: {
    header: { selectLanguage: '选择语言' },
    beaches_page: {
        title: '我们的海滩',
        coastal: '皮拉尔海岸线',
        blue_flag: '蓝旗',
        open: '营业中',
        fact_title: '卓越品质',
        fact_desc: '皮拉尔德拉霍拉达达拥有超过4公里的细沙海滩和清澈的海水。',
        list: {
        vistamar: { name: '维斯塔玛海滩', desc: '连接米尔帕尔梅拉斯的金沙海滩。' },
        milpalmeras: { name: '米尔帕尔梅拉斯', desc: '最受欢迎的海滩之一，拥有细沙和多种服务。' },
        delrio: { name: '德尔里奥海滩', desc: '位于塞科河口，风景独特。' },
        rocamar: { name: '罗卡马尔湾', desc: '连接的小海湾，提供隐私和清澈的海水。' },
        jesuitas: { name: '耶酥会海滩', desc: '宽阔的海湾，以红粘土墙为界，极具特色。' },
        elconde: { name: '埃尔孔德海滩', desc: '位于瞭望塔脚下，非常适合家庭，充满历史感。' },
        elpuerto: { name: '港口海滩', desc: '可从码头进入，设有坡道和游乐区。' },
        lasvillas: { name: '拉斯比利亚斯海滩', desc: '白沙海滩，氛围宁静，靠近伊格里卡斯。' },
        higuericas: { name: '拉斯伊格里卡斯', desc: '拥有天然沙丘的广阔海滩，非常适合音乐会和运动。' },
        elmojon: { name: '埃尔莫洪海滩', desc: '开放式海滩，拥有美丽的长廊和传统钓鱼区。' }
        }
    },
    m: ['主页', '新闻', '海滩', '遗产', '体验', '餐饮', '购物', '健康', '服务', '活动', '论坛', 'PH探索', 'AI指南', '个人资料', '地图', '管理']
  },
  ro: {
    header: { selectLanguage: 'Selectează Limba' },
    beaches_page: {
        title: 'Plajele Noastre',
        coastal: 'Litoralul Pilar',
        blue_flag: 'Steag Albastru',
        open: 'Deschis',
        fact_title: 'Excelență',
        fact_desc: 'Pilar de la Horadada are peste 4 km de plaje cu nisip fin și ape cristaline.',
        list: {
        vistamar: { name: 'Plaja Vistamar', desc: 'Plajă cu nisip auriu care se conectează cu urbanizarea Mil Palmeras.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'Una dintre cele mai vizitate plaje, cu nisip fin și multe servicii.' },
        delrio: { name: 'Plaja Del Río', desc: 'Situată la gura de vărsare a râului Seco, oferind un peisaj unic.' },
        rocamar: { name: 'Golfurile Rocamar', desc: 'Mici golfuri unite care oferă intimitate și ape cristaline.' },
        jesuitas: { name: 'Plaja Iezuiților', desc: 'Golf larg mărginit de pereți de argilă roșiatică, foarte caracteristic.' },
        elconde: { name: 'Plaja El Conde', desc: 'La poalele Turnului de Veghe, perfectă pentru familii și plină de istorie.' },
        elpuerto: { name: 'Plaja Portului', desc: 'Accesibilă din portul de agrement, cu rampe și loc de joacă.' },
        lasvillas: { name: 'Plaja Las Villas', desc: 'Plajă cu nisip alb și atmosferă liniștită, lângă Higuericas.' },
        higuericas: { name: 'Las Higuericas', desc: 'Plajă extinsă cu dune naturale, foarte populară pentru concerte și sport.' },
        elmojon: { name: 'Plaja El Mojón', desc: 'Plajă deschisă cu o promenadă frumoasă și zonă de pescuit tradițional.' }
        }
    },
    m: ['Acasă', 'Știri', 'Plaje', 'Patrimoniu', 'Experiențe', 'Gastronomie', 'Cumpărături', 'Sănătate', 'Servicii', 'Evenimente', 'Forum', 'PH Explore', 'Ghid AI', 'Profil', 'Hartă', 'Admin']
  },
  fi: {
    header: { selectLanguage: 'Valitse kieli' },
    beaches_page: {
        title: 'Rannat',
        coastal: 'Pilarin Rannikko',
        blue_flag: 'Sinilippu',
        open: 'Avoinna',
        fact_title: 'Laatua',
        fact_desc: 'Pilar de la Horadadassa on yli 4 km hienohiekkaisia rantoja ja kristallinkirkasta vettä.',
        list: {
        vistamar: { name: 'Vistamar-ranta', desc: 'Kultahiekkainen ranta, joka yhdistyy Mil Palmerasin alueeseen.' },
        milpalmeras: { name: 'Mil Palmeras', desc: 'Yksi suosituimmista rannoista, hienoa hiekkaa ja paljon palveluita.' },
        delrio: { name: 'Del Río -ranta', desc: 'Sijaitsee Río Secon suulla, tarjoaa ainutlaatuisen maiseman.' },
        rocamar: { name: 'Rocamar-poukamat', desc: 'Pieniä yhdistettyjä poukamia, jotka tarjoavat yksityisyyttä ja kirkasta vettä.' },
        jesuitas: { name: 'Jesuitas-ranta', desc: 'Leveä poukama, jota reunustavat punertavat saviseinät, erittäin luonteenomainen.' },
        elconde: { name: 'El Conde -ranta', desc: 'Vartiotornin juurella, täydellinen perheille ja täynnä historiaa.' },
        elpuerto: { name: 'Satamaranta', desc: 'Pääsy venesatamasta, ramppeja ja leikkipaikka.' },
        lasvillas: { name: 'Las Villas -ranta', desc: 'Valkohiekkainen ranta rauhallisella tunnelmalla, lähellä Higuericasia.' },
        higuericas: { name: 'Las Higuericas', desc: 'Laaja ranta luonnollisilla dyyneillä, suosittu konserteille ja urheilulle.' },
        elmojon: { name: 'El Mojón -ranta', desc: 'Avoin ranta kauniilla rantakadulla ja perinteisellä kalastusalueella.' }
        }
    },
    m: ['Koti', 'Uutiset', 'Rannat', 'Perintö', 'Elämykset', 'Ruoka', 'Ostokset', 'Terveys', 'Palvelut', 'Tapahtumat', 'Foorumi', 'PH Explore', 'AI Opas', 'Profiili', 'Kartta', 'Admin']
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
    permissions: data.permissions || en.permissions,
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
