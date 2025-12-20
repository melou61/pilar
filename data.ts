
import { Event, CensusCategory } from './types';

export const MOCK_NEWS = [
  {
    id: 'n1',
    source: 'Ayuntamiento (Facebook)',
    sourceType: 'social',
    icon: 'facebook',
    date: 'Hace 2 horas',
    title: '🚧 Corte de tráfico en Calle Mayor',
    content: 'Informamos que debido a las obras de mejora del alcantarillado, la Calle Mayor permanecerá cerrada al tráfico desde el cruce con Calle Isla hasta la Plaza de la Iglesia.',
    image: 'https://images.unsplash.com/photo-1541441244922-db13a37338e9?auto=format&fit=crop&w=800&q=80',
    url: '#'
  },
  {
    id: 'n2',
    source: 'Diario de la Vega',
    sourceType: 'press',
    icon: 'newspaper',
    date: 'Hace 5 horas',
    title: 'Pilar de la Horadada bate récord de ocupación',
    content: 'El municipio cierra el mes de julio con una ocupación hotelera del 95%, superando las cifras prepandemia.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    url: '#'
  },
  {
    id: 'n3',
    source: 'Turismo Pilar (Instagram)',
    sourceType: 'social',
    icon: 'instagram',
    date: 'Ayer',
    title: '📸 Atardecer mágico en Las Higuericas',
    content: 'No hay nada como despedir el día frente al mar. Comparte tus fotos con #VisitPilar.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    url: '#'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Fiestas del Pilar 2025',
    category: 'FESTIVAL',
    date: '1 - 21 Octubre 2025',
    location: 'Recinto Ferial & Plaza de la Iglesia',
    description: 'Las principales celebraciones del patrón con procesiones, fuegos artificiales y música tradicional.',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=1000&q=80',
    longDescription: `<p>Las Fiestas Patronales son el evento más importante del año. Incluyen desfiles de carrozas, ofrendas de flores y grandes conciertos en el recinto ferial.</p>`,
    lat: 37.8660,
    lng: -0.7925,
    startDateTime: '20251001T090000',
    endDateTime: '20251021T230000'
  },
  {
    id: '2',
    title: 'Ruta de la Tapa de Invierno',
    category: 'GASTRONOMÍA',
    date: '15 - 30 Noviembre 2025',
    location: 'Varios Restaurantes',
    description: 'Degusta las mejores tapas creativas de 20 establecimientos locales por solo 3€ con bebida incluida.',
    imageUrl: 'https://images.unsplash.com/photo-1515467873231-3dc7c62d1066?auto=format&fit=crop&w=1000&q=80',
    longDescription: `<p>Vuelve la Ruta de la Tapa. Una oportunidad única para descubrir la rica gastronomía local en formato miniatura. Participan bares de todo el municipio.</p>`,
    lat: 37.8653,
    lng: -0.7932,
    startDateTime: '20251115T120000',
    endDateTime: '20251130T230000'
  }
];

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
        description: 'Supermercado de confianza con productos frescos.',
        rating: 4.5,
        reviewCount: 1240,
        isOpen: true,
        hours: { weekdays: '09:00 - 21:30', weekend: 'Cerrado' },
        images: ['https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8680,
        lng: -0.7950
      },
      { 
        id: 'confiteria-golosa',
        name: 'Confitería La Golosa', 
        address: 'Plaza de la Iglesia, 2', 
        phone: '965 35 33 44', 
        category: 'Pastelería',
        description: 'Pastelería tradicional artesana famosa por sus milhojas y dulces típicos pilareños.',
        rating: 4.8,
        reviewCount: 320,
        isOpen: true,
        hours: { weekdays: '08:00 - 20:30', weekend: '08:00 - 21:00' },
        images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8661,
        lng: -0.7926,
        promotion: {
            title: "2x1 en Cordiales",
            description: "¡Has pasado cerca! Llévate un 2x1 en nuestros famosos cordiales.",
            discountCode: "BEACON-DULCE"
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
        description: 'Moda mujer actual y complementos seleccionados.',
        rating: 4.6,
        reviewCount: 45,
        isOpen: true,
        hours: { weekdays: '10:00 - 14:00, 17:00 - 20:30', weekend: '10:00 - 14:00' },
        images: ['https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8658,
        lng: -0.7928
      }
    ]
  }
];

export const DINING_CENSUS: CensusCategory[] = [
    {
        id: 'tapas',
        title: 'Bares de Tapas',
        items: [
            {
                id: 'bar-plaza',
                name: 'Bar Plaza',
                address: 'Plaza de la Iglesia, 5',
                phone: '965 35 22 00',
                category: 'Tapas',
                description: 'El lugar de encuentro clásico en el corazón del pueblo.',
                rating: 4.6,
                reviewCount: 450,
                isOpen: true,
                hours: { weekdays: '08:00 - 23:00', weekend: '09:00 - 00:00' },
                images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'],
                lat: 37.8660,
                lng: -0.7926
            }
        ]
    }
];

export const ACTIVITIES_LIST: any[] = [
    {
        id: 'lo-romero-golf',
        title: 'Lo Romero Golf',
        category: 'Deporte',
        location: 'Ctra. Orihuela, km 29',
        description: 'Disfruta de uno de los mejores campos de golf de la Costa Blanca con su famoso hoyo 18.',
        image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        lat: 37.8820,
        lng: -0.8100
    },
    {
        id: 'torre-vigia',
        title: 'Torre de la Horadada',
        category: 'Cultura',
        location: 'Puerto de la Torre',
        description: 'Torre de vigilancia del siglo XVI con vistas increíbles del Mediterráneo.',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        lat: 37.8682,
        lng: -0.7570
    }
];
