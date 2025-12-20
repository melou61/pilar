
// Helper for English fallback to save space while supporting all requested languages
const en = {
    menu: {
      home: 'Home',
      news: 'News',
      beaches: 'Beaches',
      sightseeing: 'Sightseeing',
      activities: 'Things to Do',
      dining: 'Dining',
      shopping: 'Shopping',
      health: 'Health & Beauty',
      services: 'Services',
      events: 'Events',
      forum: 'Forum',
      title: 'Menu'
    },
    hero: {
      subtitle: 'A Mediterranean Treasure on the Costa Blanca',
      location: 'Alicante, Spain',
      sun: '300+ Days of Sun',
      beaches: 'Spectacular Beaches',
      events: 'Fiestas & Events',
      commerce: 'Local Commerce'
    },
    sections: {
      events: { title: 'Upcoming Events', desc: 'Discover upcoming events and festivals in Pilar de la Horadada' },
      shopping: { title: 'Shopping Guide', desc: 'Find fashion, home decor, and supermarkets.' },
      dining: { title: 'Where to Eat', desc: 'Discover the best restaurants, tapas bars, and gastronomic experiences' },
      health: { title: 'Health & Wellness', desc: 'Pharmacies, medical centers, beauty salons, and gyms.' },
      services: { title: 'Professional Services', desc: 'Real estate, mechanics, legal advice, and more.' },
      activities: { title: 'Things to Do', desc: 'Discover exciting activities and unique experiences' },
      sightseeing: { title: 'The New Pilar', desc: 'Discover the history, nature, and future of our town.' },
      beaches: { title: 'Beaches', desc: 'Over 4km of pristine Mediterranean coastline with Blue Flag certified beaches' },
      forum: { title: 'Community Forum', desc: 'Connect with locals and visitors, share experiences, and get travel tips' },
      highlights: 'Highlights'
    },
    business: {
      open: 'Open Now',
      closed: 'Closed',
      reviews: 'Reviews',
      call: 'Call',
      website: 'Website',
      directions: 'Directions',
      hours: 'Opening Hours',
      about: 'About',
      photos: 'Photos'
    },
    common: {
      sponsored: 'Sponsored',
      searchPlaceholder: 'Search business, service...',
      readMore: 'Read More',
      back: 'Back',
      share: 'Share',
      source: 'Source',
      noResults: 'No results found',
      discover: 'Discover'
    },
    share: {
      title: 'Share Event',
      subtitle: 'Share this event on your social networks',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      via: 'via',
      apps: {
        whatsapp: 'WhatsApp',
        facebook: 'Facebook',
        twitter: 'X (Twitter)',
        linkedin: 'LinkedIn',
        email: 'Email',
        instagram: 'Instagram',
        tiktok: 'TikTok',
        youtube: 'YouTube'
      }
    },
    auth: {
      loginTitle: 'Sign In',
      loginSubtitle: 'Sign in to your account',
      email: 'Email Address',
      password: 'Password',
      signIn: 'Sign In',
      noAccount: "Don't have an account?",
      register: 'Sign Up',
      superAdmin: 'Super Admin Credentials',
      demoAccess: '⚡ Enter as Super Admin (Demo)'
    },
    footer: {
      contact: 'Contact Information',
      links: 'Quick Links',
      follow: 'Follow Us',
      desc: 'Stay updated with the latest news, events and activities in Pilar de la Horadada',
      rights: '© 2025 Pilar de la Horadada Tourism | Experience the Mediterranean at its finest. App built and managed by https://vortexdigital-AI. Com'
    },
    beaches_page: {
        title: 'Our Beaches',
        subtitle: 'Discover 4km of fine white sand, crystal clear waters and Blue Flags.',
        amenities: {
            blueFlag: 'Blue Flag',
            accessible: 'Accessible Point',
            parking: 'Parking',
            shower: 'Footwash/Showers',
            bar: 'Beach Bar',
            lifeguard: 'Lifeguard'
        },
        list: {
            milpalmeras: {
                name: 'Mil Palmeras',
                desc: 'One of the most famous beaches on the Costa Blanca. It has a comprehensive Accessible Point for people with reduced mobility (summer season), plenty of restaurants, and a long promenade.'
            },
            jesuitas: {
                name: 'Playa Jesuitas',
                desc: 'A beautiful cove protected by reddish cliffs. Ideal for volleyball and known for its crystal clear waters. It connects Mil Palmeras with the Tower.'
            },
            conde: {
                name: 'El Conde',
                desc: 'Located at the foot of the 16th Century Watchtower. It is a family-friendly beach with calm waters and an accessible ramp. History and sun in one place.'
            },
            higuericas: {
                name: 'Las Higuericas',
                desc: 'The wildest and most natural beach, backed by sand dunes. Famous for its parking facilities, concerts in summer, and trendy beach bars (chiringuitos).'
            },
            puerto: {
                name: 'El Puerto',
                desc: 'Located next to the Marina. It has a ramp for wheelchair access and offers spectacular views of the boats entering and leaving the port.'
            },
            villas: {
                name: 'Las Villas',
                desc: 'A quieter extension of Higuericas, known for its white sands and being less crowded, perfect for relaxing.'
            }
        }
    },
    sightseeing_page: {
        title: 'Pilar of the New Generation',
        subtitle: 'From a historic watchtower to a sustainable smart city.',
        timeline: {
            past: {
                title: 'The Roots (1986)',
                desc: 'Historically defined by the 16th-century Watchtower against pirates. In 1986, we achieved independence, marking the birth of our modern identity.'
            },
            present: {
                title: 'The Dual Engine',
                desc: 'Today, we are a unique anomaly: a powerhouse of modern agriculture feeding Europe, and a premier destination for tourism and professional sports.'
            },
            future: {
                title: 'The New Generation',
                desc: 'We are evolving into a sustainable year-round smart city. A hub for digital nomads and families who want the Mediterranean lifestyle with modern infrastructure.'
            }
        },
        golf: {
            title: 'Golf Paradise',
            desc: 'Home to Lo Romero Golf, known as "The Golf Island". An 18-hole course challenging players with its signature 18th green surrounded by water.'
        },
        nature: {
            title: 'Nature & Cycling',
            desc: 'Explore the Rio Seco natural park, hiking trails in Sierra de Escalona, and kilometers of cycling lanes connecting the mountains to the sea.'
        },
        connectivity: {
            title: 'Strategic Location',
            desc: 'Located perfectly between two major airports. We are just 40 minutes from Alicante Airport (ALC) and 35 minutes from Murcia Airport (RMU).'
        }
    }
  };
  
  export const translations = {
    en: en,
    es: {
      menu: {
        home: 'Inicio',
        news: 'Noticias',
        beaches: 'Playas',
        sightseeing: 'El Nuevo Pilar',
        activities: 'Qué Hacer',
        dining: 'Dónde Comer',
        shopping: 'De Compras',
        health: 'Salud y Belleza',
        services: 'Servicios',
        events: 'Eventos',
        forum: 'Foro',
        title: 'Menú'
      },
      hero: {
        subtitle: 'Un Tesoro Mediterráneo en la Costa Blanca',
        location: 'Alicante, España',
        sun: '300+ Días de Sol al Año',
        beaches: 'Playas Espectaculares',
        events: 'Fiestas y Eventos',
        commerce: 'Comercio Local'
      },
      sections: {
        events: { title: 'Próximos Eventos', desc: 'Descubre los próximos eventos y festivales en Pilar de la Horadada' },
        shopping: { title: 'Guía de Compras', desc: 'Moda, hogar, alimentación y supermercados.' },
        dining: { title: 'Dónde Comer', desc: 'Descubre los mejores restaurantes, bares de tapas y experiencias gastronómicas' },
        health: { title: 'Salud y Bienestar', desc: 'Farmacias, clínicas dentales, centros de estética y cuidado personal.' },
        services: { title: 'Servicios Profesionales', desc: 'Inmobiliarias, talleres, asesorías y otros servicios útiles.' },
        activities: { title: 'Qué Hacer', desc: 'Descubre actividades emocionantes y experiencias únicas' },
        sightseeing: { title: 'El Nuevo Pilar', desc: 'Descubre la historia, naturaleza y futuro de nuestro pueblo.' },
        beaches: { title: 'Playas', desc: 'Más de 4km de costa mediterránea prístina con playas certificadas con Bandera Azul' },
        forum: { title: 'Foro Comunitario', desc: 'Conéctate con locales y visitantes, comparte experiencias y obtén consejos de viaje' },
        highlights: 'Destacados'
      },
      business: {
        open: 'Abierto Ahora',
        closed: 'Cerrado',
        reviews: 'Reseñas',
        call: 'Llamar',
        website: 'Web',
        directions: 'Cómo llegar',
        hours: 'Horario',
        about: 'Información',
        photos: 'Fotos'
      },
      common: {
        sponsored: 'Patrocinado',
        searchPlaceholder: 'Buscar comercio, servicio...',
        readMore: 'Leer más',
        back: 'Volver',
        share: 'Compartir',
        source: 'Fuente',
        noResults: 'No se encontraron resultados',
        discover: 'Descubrir'
      },
      share: {
        title: 'Compartir',
        subtitle: 'Comparte este evento en tus redes sociales',
        copyLink: 'Copiar Enlace',
        copied: '¡Copiado!',
        via: 'vía',
        apps: {
          whatsapp: 'WhatsApp',
          facebook: 'Facebook',
          twitter: 'X (Twitter)',
          linkedin: 'LinkedIn',
          email: 'Email',
          instagram: 'Instagram',
          tiktok: 'TikTok',
          youtube: 'YouTube'
        }
      },
      auth: {
        loginTitle: 'Iniciar Sesión',
        loginSubtitle: 'Inicia sesión en tu cuenta',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        signIn: 'Iniciar Sesión',
        noAccount: '¿No tienes una cuenta?',
        register: 'Registrarse',
        superAdmin: 'Credenciales del Super Admin',
        demoAccess: '⚡ Entrar como Super Admin (Demo)'
      },
      footer: {
        contact: 'Información de Contacto',
        links: 'Enlaces Rápidos',
        follow: 'Síguenos',
        desc: 'Mantente actualizado con las últimas noticias, eventos y actividades en Pilar de la Horadada',
        rights: '© 2025 Turismo Pilar de la Horadada | Experimenta el Mediterráneo en su máxima expresión. App construida y dirigida por https://vortexdigital-AI. Com'
      },
      beaches_page: {
        title: 'Nuestras Playas',
        subtitle: 'Descubre 4km de fina arena blanca, aguas cristalinas y Banderas Azules.',
        amenities: {
            blueFlag: 'Bandera Azul',
            accessible: 'Punto Accesible',
            parking: 'Aparcamiento',
            shower: 'Lavapiés/Duchas',
            bar: 'Chiringuito',
            lifeguard: 'Socorrismo'
        },
        list: {
            milpalmeras: {
                name: 'Mil Palmeras',
                desc: 'Una de las playas más famosas de la Costa Blanca. Cuenta con Punto Accesible integral para personas con movilidad reducida (temporada estival), multitud de restaurantes y un largo paseo.'
            },
            jesuitas: {
                name: 'Playa Jesuitas',
                desc: 'Una preciosa cala protegida por paredes rojizas. Ideal para jugar al vóley y conocida por sus aguas cristalinas. Conecta Mil Palmeras con la Torre.'
            },
            conde: {
                name: 'El Conde',
                desc: 'Situada a los pies de la Torre Vigía del siglo XVI. Es una playa familiar, de aguas tranquilas y con rampa de acceso. Historia y sol en un mismo lugar.'
            },
            higuericas: {
                name: 'Las Higuericas',
                desc: 'La playa más virgen y natural, respaldada por dunas de arena. Famosa por sus facilidades de aparcamiento, conciertos en verano y sus chiringuitos de moda.'
            },
            puerto: {
                name: 'El Puerto',
                desc: 'Situada junto al Puerto Deportivo. Dispone de rampa para acceso en silla de ruedas y ofrece vistas espectaculares de los barcos entrando y saliendo.'
            },
            villas: {
                name: 'Las Villas',
                desc: 'Una extensión más tranquila de Higuericas, conocida por sus arenas blancas y por estar menos concurrida, perfecta para el relax.'
            }
        }
    },
    sightseeing_page: {
        title: 'Pilar de la Nueva Generación',
        subtitle: 'De una torre vigía histórica a una ciudad inteligente y sostenible.',
        timeline: {
            past: {
                title: 'Las Raíces (1986)',
                desc: 'Históricamente definido por la Torre Vigía del siglo XVI contra piratas. En 1986 conseguimos nuestra independencia, marcando el nacimiento de nuestra identidad moderna.'
            },
            present: {
                title: 'El Doble Motor',
                desc: 'Hoy somos una anomalía única: una potencia de agricultura moderna que alimenta a Europa, y un destino de primer nivel para el turismo y el deporte profesional.'
            },
            future: {
                title: 'La Nueva Generación',
                desc: 'Evolucionamos hacia una ciudad inteligente y sostenible todo el año. Un refugio para nómadas digitales y familias que buscan el estilo de vida mediterráneo con infraestructuras modernas.'
            }
        },
        golf: {
            title: 'Paraíso del Golf',
            desc: 'Hogar de Lo Romero Golf, conocido como "La Isla del Golf". Un campo de 18 hoyos que desafía a los jugadores con su característico green del 18 rodeado de agua.'
        },
        nature: {
            title: 'Naturaleza y Ciclismo',
            desc: 'Explora el paraje natural de Río Seco, rutas de senderismo en Sierra de Escalona, y kilómetros de carriles bici que conectan la montaña con el mar.'
        },
        connectivity: {
            title: 'Ubicación Estratégica',
            desc: 'Situado perfectamente entre dos aeropuertos principales. Estamos a solo 40 min del Aeropuerto de Alicante (ALC) y 35 min del de Murcia (RMU).'
        }
    }
    },
    // European
    fr: { ...en, menu: { ...en.menu, home: 'Accueil', news: 'Actualités', shopping: 'Achats' }, common: { ...en.common, share: 'Partager', back: 'Retour' } },
    de: { ...en, menu: { ...en.menu, home: 'Startseite', news: 'Nachrichten', shopping: 'Einkaufen' }, common: { ...en.common, share: 'Teilen', back: 'Zurück' } },
    it: { ...en, menu: { ...en.menu, home: 'Home', news: 'Notizie', shopping: 'Shopping' }, common: { ...en.common, share: 'Condividi', back: 'Indietro' } },
    pt: { ...en, menu: { ...en.menu, home: 'Início', news: 'Notícias', shopping: 'Compras' }, common: { ...en.common, share: 'Compartilhar', back: 'Voltar' } },
    nl: { ...en, menu: { ...en.menu, home: 'Thuis', news: 'Nieuws', shopping: 'Winkelen' }, common: { ...en.common, share: 'Delen', back: 'Terug' } },
    sv: { ...en, menu: { ...en.menu, home: 'Hem', news: 'Nyheter', shopping: 'Shopping' }, common: { ...en.common, share: 'Dela', back: 'Tillbaka' } },
    pl: { ...en, menu: { ...en.menu, home: 'Dom', news: 'Aktualności', shopping: 'Zakupy' }, common: { ...en.common, share: 'Udostępnij', back: 'Wstecz' } },
    
    // Asian
    zh: {
      ...en,
      menu: { ...en.menu, home: '首页', news: '新闻', beaches: '海滩', sightseeing: '观光', activities: '活动', dining: '餐饮', shopping: '购物', events: '活动', forum: '论坛', title: '菜单', health: '健康', services: '服务' },
      common: { ...en.common, share: '分享', back: '返回', searchPlaceholder: '搜索...' }
    },
    ja: {
      ...en,
      menu: { ...en.menu, home: 'ホーム', news: 'ニュース', beaches: 'ビーチ', sightseeing: '観光', activities: 'アクティビティ', dining: '食事', shopping: 'ショッピング', events: 'イベント', forum: 'フォーラム', title: 'メニュー', health: '健康', services: 'サービス' },
      common: { ...en.common, share: '共有', back: '戻る', searchPlaceholder: '検索...' }
    },
    ko: {
      ...en,
      menu: { ...en.menu, home: '홈', news: '뉴스', beaches: '해변', sightseeing: '관광', activities: '활동', dining: '식사', shopping: '쇼핑', events: '이벤트', forum: '포럼', title: '메뉴', health: '건강', services: '서비스' },
      common: { ...en.common, share: '공유', back: '뒤로', searchPlaceholder: '검색...' }
    },
    
    // Middle East & Other
    ar: {
      ...en,
      menu: { ...en.menu, home: 'الرئيسية', news: 'أخبار', beaches: 'شواطئ', sightseeing: 'معالم', activities: 'أنشطة', dining: 'تطعام', shopping: 'تسوق', events: 'أحداث', forum: 'منتدى', title: 'قائمة', health: 'صحة', services: 'خدمات' },
      common: { ...en.common, share: 'مشاركة', back: 'عودة', searchPlaceholder: 'بحث...' }
    },
    ru: {
      ...en,
      menu: { ...en.menu, home: 'Главная', news: 'Новости', beaches: 'Пляжи', sightseeing: 'Осмотр', activities: 'Активности', dining: 'Еда', shopping: 'Шопинг', events: 'События', forum: 'Форум', title: 'Меню', health: 'Здоровье', services: 'Услуги' },
      common: { ...en.common, share: 'Поделиться', back: 'Назад', searchPlaceholder: 'Поиск...' }
    },
    hi: {
      ...en,
      menu: { ...en.menu, home: 'घर', news: 'समाचार', beaches: 'समुद्र तट', sightseeing: 'दर्शनीय स्थल', activities: 'गतिविधियां', dining: 'भोजन', shopping: 'खरीदारी', events: 'कार्यक्रम', forum: 'मंच', title: 'मेन्यू', health: 'स्वास्थ्य', services: 'सेवाएं' },
      common: { ...en.common, share: 'साझा करें', back: 'वापस', searchPlaceholder: 'खोजें...' }
    },
    tr: {
      ...en,
      menu: { ...en.menu, home: 'Ana Sayfa', news: 'Haberler', beaches: 'Plajlar', sightseeing: 'Gezilecek Yerler', activities: 'Etkinlikler', dining: 'Yeme İçme', shopping: 'Alışveriş', events: 'Etkinlikler', forum: 'Forum', title: 'Menü', health: 'Sağlık', services: 'Hizmetler' },
      common: { ...en.common, share: 'Paylaş', back: 'Geri', searchPlaceholder: 'Ara...' }
    }
  };
    