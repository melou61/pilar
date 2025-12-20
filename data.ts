
import { Event, CensusCategory } from './types';

export const MOCK_NEWS = [
  {
    id: 'n1',
    source: 'Ayuntamiento',
    sourceType: 'official',
    icon: 'megaphone',
    date: 'Hace 1 hora',
    title: '🎉 ¡Todo listo para la Charanga de Verano!',
    content: 'Este sábado las calles se llenarán de música y color con nuestro desfile anual de Charangas. ¡No faltes!',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    url: '#'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'f1',
    title: 'Fiestas Patronales del Pilar',
    category: 'TRADICIÓN',
    date: 'Octubre 2025',
    location: 'Todo el municipio',
    description: 'La festividad más importante con ofrenda de flores, desfiles y grandes conciertos gratuitos.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253344-99a42994060c?auto=format&fit=crop&w=1200&q=80',
    longDescription: `<p>Octubre es el mes dorado del Pilar. Disfruta de la Ofrenda de Flores, el gran desfile de Carrozas y las Charangas que recorren el centro. Música en directo cada noche en el recinto ferial.</p>`,
    isFestival: true,
    lat: 37.8653,
    lng: -0.7932
  },
  {
    id: 'f2',
    title: 'Romería de la Virgen',
    category: 'RELIGIÓN',
    date: 'Junio 2025',
    location: 'Desde la Iglesia al Pinar',
    description: 'Acompañamos a nuestra patrona en un día de convivencia, caballos y carretas en el Pinar de Campoverde.',
    imageUrl: 'https://images.unsplash.com/photo-1528495127344-d9048412a0e1?auto=format&fit=crop&w=1200&q=80',
    longDescription: `<p>Una de las romerías más bonitas de la provincia. Una jornada de campo, fe y tradición que termina con una misa rociera en pleno Río Seco.</p>`,
    isFestival: true,
    lat: 37.8930,
    lng: -0.8350
  },
  {
    id: 'e3',
    title: 'Gran Desfile de Charangas',
    category: 'MÚSICA',
    date: 'Agosto 2025',
    location: 'Calle Mayor',
    description: 'El concurso de charangas más loco del verano. ¡Disfraz obligatorio!',
    imageUrl: 'https://images.unsplash.com/photo-1467307983825-619715426c70?auto=format&fit=crop&w=1200&q=80',
    longDescription: `<p>Las peñas locales compiten con las mejores bandas de música en un desfile lleno de humor y ritmo mediterráneo.</p>`,
    isFestival: true,
    lat: 37.8660,
    lng: -0.7920
  }
];

// Added missing ACTIVITIES_LIST to resolve compilation error in ActivitiesView.tsx
export const ACTIVITIES_LIST = [
  {
    id: 'a1',
    title: 'Senderismo en el Pinar',
    category: 'NATURALEZA',
    description: 'Rutas señalizadas por el pulmón verde del Pilar. Ideal para familias.',
    location: 'Pinar de Campoverde',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551632432-c735e8306917?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'a2',
    title: 'Ruta del Río Seco',
    category: 'AVENTURA',
    description: 'Explora el cauce del río y sus formaciones de arena. Paisaje lunar único.',
    location: 'Cauce del Río Seco',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'a3',
    title: 'Deportes Náuticos',
    category: 'DEPORTE',
    description: 'Paddle surf, vela y kayak en las cristalinas aguas de nuestras playas.',
    location: 'Puerto Deportivo',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1544551763-47a0159f963f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'a4',
    title: 'Golf Lo Romero',
    category: 'DEPORTE',
    description: 'Uno de los campos de golf más prestigiosos de la zona, conocido como "La Isla del Golf".',
    location: 'Lo Romero Golf',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80'
  }
];

export const COMMERCIAL_CENSUS: CensusCategory[] = [
  {
    id: 'shopping',
    title: 'Moda y Regalos',
    items: [
      { 
        id: 'boutique-pilar',
        name: 'Modas Lucía', 
        address: 'Calle Mayor, 12', 
        phone: '965 35 10 10', 
        category: 'Ropa y Complementos',
        description: 'Boutique exclusiva con marcas nacionales e internacionales. Tendencias mediterráneas.',
        rating: 4.9,
        priceRange: '€€',
        featuredItems: ['Vestidos de Lino', 'Bolsos Artesanos'],
        reviewCount: 156,
        isOpen: true,
        hours: { weekdays: '10:00 - 14:00, 17:00 - 20:30', weekend: '10:00 - 14:00' },
        images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8665,
        lng: -0.7930
      }
    ]
  }
];

export const DINING_CENSUS: CensusCategory[] = [
    {
        id: 'restaurantes',
        title: 'Gastronomía Local',
        items: [
            {
                id: 'el-puerto',
                name: 'Mesón El Puerto',
                address: 'Av. del Puerto, 45 (Torre)',
                phone: '965 35 22 88',
                category: 'Pescados y Arroces',
                description: 'Especialistas en Caldero del Mar Menor y Arroz a Banda frente al mar.',
                rating: 4.8,
                priceRange: '€€€',
                featuredItems: ['Arroz a Banda', 'Caldero del Pilar', 'Fritura de la Bahía'],
                reviewCount: 890,
                isOpen: true,
                hours: { weekdays: '13:00 - 16:30, 20:00 - 23:30', weekend: '13:00 - 17:00' },
                images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'],
                lat: 37.8640,
                lng: -0.7850
            },
            {
                id: 'tapas-plaza',
                name: 'La Plaza Tapas',
                address: 'Plaza de la Iglesia, 2',
                phone: '965 35 15 15',
                category: 'Tapas y Cañas',
                description: 'El corazón de la tapa en el centro del pueblo. Ambiente joven y tradicional.',
                rating: 4.5,
                priceRange: '€',
                featuredItems: ['Montaditos Variados', 'Patatas Bravas PH', 'Caña Bien Tirada'],
                reviewCount: 420,
                isOpen: true,
                hours: { weekdays: '08:00 - 00:00', weekend: '09:00 - 02:00' },
                images: ['https://images.unsplash.com/photo-1515443961218-1523678885b8?auto=format&fit=crop&w=800&q=80'],
                lat: 37.8660,
                lng: -0.7925
            }
        ]
    }
];
