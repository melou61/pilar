
import { Event, CensusCategory } from './types';

// --- NEWS AGGREGATOR DATA ---
export const MOCK_NEWS = [
  {
    id: 'n1',
    source: 'Ayuntamiento (Facebook)',
    sourceType: 'social',
    icon: 'facebook',
    date: 'Hace 2 horas',
    title: '🚧 Corte de tráfico en Calle Mayor',
    content: 'Informamos que debido a las obras de mejora del alcantarillado, la Calle Mayor permanecerá cerrada al tráfico desde el cruce con Calle Isla hasta la Plaza de la Iglesia durante las próximas 48 horas.',
    image: 'https://images.unsplash.com/photo-1584462214300-349079963e65?auto=format&fit=crop&w=800&q=80',
    url: '#'
  },
  {
    id: 'n2',
    source: 'Diario de la Vega',
    sourceType: 'press',
    icon: 'newspaper',
    date: 'Hace 5 horas',
    title: 'Pilar de la Horadada bate récord de ocupación turística',
    content: 'El municipio cierra el mes de julio con una ocupación hotelera del 95%, superando las cifras prepandemia. El turismo internacional lidera las visitas.',
    image: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=800&q=80',
    url: '#'
  },
  {
    id: 'n3',
    source: 'Turismo Pilar (Instagram)',
    sourceType: 'social',
    icon: 'instagram',
    date: 'Ayer',
    title: '📸 Atardecer mágico en Las Higuericas',
    content: 'No hay nada como despedir el día frente al mar en nuestras dunas naturales. Comparte tus fotos con #VisitPilar.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    url: '#'
  },
  {
    id: 'n4',
    source: 'Agenda Cultural',
    sourceType: 'official',
    icon: 'calendar',
    date: 'Ayer',
    title: 'Cine de Verano: Proyección en la Playa',
    content: 'Este viernes cine bajo las estrellas en Mil Palmeras. Entrada gratuita. ¡Trae tu silla y disfruta!',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    url: '#'
  }
];

// --- EVENTS ---
export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Fiestas del Pilar 2025',
    category: 'Festival',
    date: '1 - 21 Octubre 2025',
    location: 'Recinto Ferial & Plaza de la Iglesia',
    description: 'Las principales celebraciones del patrón con procesiones, fuegos artificiales y música tradicional.',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=1000&q=80',
    longDescription: `
      <p>Las Fiestas Patronales son el alma de Pilar de la Horadada. Disfruta de la Ofrenda de Flores, el Desfile de Carrozas y los conciertos gratuitos.</p>
    `,
    lat: 37.8660,
    lng: -0.7925,
    startDateTime: '20251001T090000',
    endDateTime: '20251021T230000'
  },
  {
    id: '2',
    title: 'Ruta de la Tapa de Invierno',
    category: 'Gastronomía',
    date: '15 - 30 Noviembre 2025',
    location: 'Varios Restaurantes',
    description: 'Degusta las mejores tapas creativas de nuestros establecimientos locales.',
    imageUrl: 'https://images.unsplash.com/photo-1515443961218-1523678885b8?auto=format&fit=crop&w=1000&q=80',
    longDescription: `<p>Participan más de 20 restaurantes con creaciones únicas basadas en productos de la zona.</p>`,
    lat: 37.8653,
    lng: -0.7932,
    startDateTime: '20251115T120000',
    endDateTime: '20251130T230000'
  },
  {
    id: '3',
    title: 'Mercado Navideño Artesanal',
    category: 'Mercado',
    date: '20 - 24 Diciembre 2025',
    location: 'Plaza de la Iglesia',
    description: 'Regalos únicos y ambiente mágico en el corazón del pueblo.',
    imageUrl: 'https://images.unsplash.com/photo-1543258335-9993844e409b?auto=format&fit=crop&w=1000&q=80',
    longDescription: `<p>Tradición y artesanía local en estas fechas tan especiales.</p>`,
    lat: 37.8660,
    lng: -0.7925,
    startDateTime: '20251220T100000',
    endDateTime: '20251224T210000'
  }
];

// --- SHOPPING / COMMERCE ---
export const COMMERCIAL_CENSUS: CensusCategory[] = [
  {
    id: 'alimentacion',
    title: 'Alimentación y Supermercados',
    items: [
      { 
        id: 'mercadona',
        name: 'Mercadona', 
        address: 'Av. de la Venta, 2', 
        phone: '965 35 22 11', 
        category: 'Supermercado',
        description: 'Productos frescos y calidad en el centro del municipio.',
        rating: 4.5,
        reviewCount: 1240,
        isOpen: true,
        hours: { weekdays: '09:00 - 21:30', weekend: 'Cerrado' },
        images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'],
        website: 'https://www.mercadona.es',
        lat: 37.8680,
        lng: -0.7950
      },
      { 
        id: 'confiteria-golosa',
        name: 'Confitería La Golosa', 
        address: 'Plaza de la Iglesia, 2', 
        phone: '965 35 33 44', 
        category: 'Pastelería',
        description: 'Pastelería tradicional artesana. Famosos por los milhojas pilareños.',
        rating: 4.8,
        reviewCount: 320,
        isOpen: true,
        hours: { weekdays: '08:00 - 20:30', weekend: '08:00 - 21:00' },
        images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8661,
        lng: -0.7926,
        promotion: {
            title: "2x1 en Cordiales",
            description: "¡Oferta exclusiva de proximidad!",
            discountCode: "PILAR-DULCE"
        }
      }
    ]
  },
  {
    id: 'moda',
    title: 'Moda y Complementos',
    items: [
      { 
        id: 'modas-paqui',
        name: 'Modas Paqui', 
        address: 'C/ Mayor, 56', 
        phone: '965 35 12 10', 
        category: 'Ropa Mujer',
        description: 'Boutique con las últimas tendencias en moda mediterránea.',
        rating: 4.6,
        reviewCount: 45,
        isOpen: true,
        hours: { weekdays: '10:00 - 14:00, 17:00 - 20:30', weekend: '10:00 - 14:00' },
        images: ['https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8658,
        lng: -0.7928
      }
    ]
  },
  {
    id: 'salud',
    title: 'Salud y Belleza',
    items: [
        { 
            id: 'farmacia-central',
            name: 'Farmacia Central', 
            address: 'C/ Mayor, 50', 
            phone: '965 35 44 55', 
            category: 'Farmacia',
            description: 'Servicio 24 horas y atención profesional en el centro.',
            rating: 4.7,
            reviewCount: 89,
            isOpen: true,
            hours: { weekdays: '09:00 - 21:00', weekend: '09:00 - 14:00' },
            images: ['https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80'],
            lat: 37.8659,
            lng: -0.7927
        }
    ]
  }
];

// --- DINING ---
export const DINING_CENSUS: CensusCategory[] = [
    {
        id: 'tapas',
        title: 'Bares y Restaurantes',
        items: [
            {
                id: 'bar-plaza',
                name: 'Bar Plaza',
                address: 'Plaza de la Iglesia, 5',
                phone: '965 35 22 00',
                category: 'Tapas',
                description: 'El corazón de las tapas en la plaza del pueblo.',
                rating: 4.6,
                reviewCount: 450,
                isOpen: true,
                hours: { weekdays: '08:00 - 23:00', weekend: '09:00 - 00:00' },
                images: ['https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80'],
                lat: 37.8660,
                lng: -0.7926
            },
            {
                id: 'rest-gallego',
                name: 'Restaurante El Puerto',
                address: 'Puerto de la Torre',
                phone: '966 76 99 88',
                category: 'Marisquería',
                description: 'Marisco fresco junto a la torre vigía y el puerto deportivo.',
                rating: 4.5,
                reviewCount: 890,
                isOpen: true,
                hours: { weekdays: '13:00 - 16:30, 20:00 - 23:30', weekend: '13:00 - 23:30' },
                images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'],
                lat: 37.8690,
                lng: -0.7580
            }
        ]
    }
];

// --- ACTIVITIES ---
export const ACTIVITIES_LIST: any[] = [
    {
        id: 'lo-romero-golf',
        title: 'Lo Romero Golf',
        category: 'Deporte',
        location: 'Pilar de la Horadada',
        description: 'Disfruta del famoso hoyo 18 en "La Isla del Golf".',
        image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        lat: 37.8820,
        lng: -0.8100
    },
    {
        id: 'senderismo-rio-seco',
        title: 'Ruta Senderismo Río Seco',
        category: 'Naturaleza',
        location: 'Pinar de Campoverde',
        description: 'Explora los cañones naturales de roca arenisca en este paraje único.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        lat: 37.8950,
        lng: -0.8300
    },
    {
        id: 'torre-vigia',
        title: 'Visita Torre de la Horadada',
        category: 'Cultura',
        location: 'Torre de la Horadada',
        description: 'Monumento del siglo XVI clave en la defensa contra los piratas berberiscos.',
        image: 'https://images.unsplash.com/photo-1590523741491-258ca07f9b76?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        lat: 37.8682,
        lng: -0.7570
    }
];
