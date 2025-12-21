
import { Event, CensusCategory } from './types';

export const MOCK_NEWS = [
  {
    id: 'n1',
    source: 'Ayuntamiento de Pilar',
    sourceType: 'official',
    icon: 'megaphone',
    date: 'Hace 1 hora',
    title: '🎉 ¡Todo listo para la Gran Charanga!',
    content: 'Este sábado las calles se llenarán de música y color con nuestro desfile anual. ¡No faltes!',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    url: '#'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'f1',
    title: 'Fiestas Patronales del Pilar',
    category: 'TRADICIÓN',
    date: '1 - 21 Octubre 2025',
    location: 'Centro Urbano y Recinto Ferial',
    description: 'Nuestras fiestas más queridas con ofrenda de flores y desfiles de carrozas.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    longDescription: `<p>Octubre es el mes dorado del Pilar. Disfruta de la Ofrenda de Flores, el gran desfile de Carrozas y las Charangas que recorren el centro. Música en directo cada noche en el recinto ferial.</p><h3>Días clave:</h3><ul><li>11 Oct: Ofrenda de flores</li><li>12 Oct: Día de la Virgen</li></ul>`,
    isFestival: true,
    lat: 37.8653,
    lng: -0.7932
  },
  {
    id: 'f2',
    title: 'Desfile de Charangas',
    category: 'FIESTA',
    date: 'Agosto 2025',
    location: 'Calle Mayor',
    description: 'El concurso de charangas más loco del verano. ¡Música y humor!',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    longDescription: `<p>Las peñas locales y bandas invitadas recorren el Pilar en un desfile lleno de ritmo, disfraces y mucha risa.</p>`,
    isFestival: true,
    lat: 37.8660,
    lng: -0.7920
  }
];

export const ACTIVITIES_LIST = [
  {
    id: 'a1',
    title: 'Senderismo en el Pinar',
    category: 'NATURALEZA',
    description: 'Rutas señalizadas por el pulmón verde del Pilar. Ideal para familias.',
    location: 'Pinar de Campoverde',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551632432-c73581c61972?auto=format&fit=crop&w=1200&q=80'
  }
];

export const COMMERCIAL_CENSUS: CensusCategory[] = [
  {
    id: 'shopping',
    title: 'Comercios de Confianza',
    items: [
      { 
        id: 'boutique-pilar',
        name: 'Modas Lucía', 
        address: 'Calle Mayor, 12', 
        phone: '965 35 10 10', 
        category: 'Moda',
        description: 'Boutique con las mejores marcas y atención personalizada desde hace 30 años.',
        rating: 4.9,
        priceRange: '€€',
        featuredItems: ['Vestidos de Verano', 'Complementos Artesanos'],
        reviewCount: 156,
        isOpen: true,
        hours: { weekdays: '10:00 - 14:00, 17:00 - 20:30', weekend: '10:00 - 14:00' },
        images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'],
        lat: 37.8665,
        lng: -0.7930
      }
    ]
  }
];

export const DINING_CENSUS: CensusCategory[] = [
    {
        id: 'restaurantes',
        title: 'Sabor Mediterráneo',
        items: [
            {
                id: 'el-puerto',
                name: 'Mesón El Puerto',
                address: 'Av. del Puerto, 45',
                phone: '965 35 22 88',
                category: 'Pescados y Arroces',
                description: 'El mejor Caldero de la zona con vistas inmejorables al puerto.',
                rating: 4.8,
                priceRange: '€€€',
                featuredItems: ['Caldero del Mar Menor', 'Arroz a Banda', 'Dorada a la Sal'],
                reviewCount: 890,
                isOpen: true,
                hours: { weekdays: '13:00 - 16:30, 20:00 - 23:30', weekend: '13:00 - 17:00' },
                images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80'],
                lat: 37.8640,
                lng: -0.7850
            },
            {
                id: 'tapas-plaza',
                name: 'La Plaza Tapas',
                address: 'Plaza de la Iglesia, 2',
                phone: '965 35 15 15',
                category: 'Tapas',
                description: 'Ambiente tradicional en el corazón del pueblo.',
                rating: 4.5,
                priceRange: '€',
                featuredItems: ['Montaditos', 'Patatas Bravas PH'],
                reviewCount: 420,
                isOpen: true,
                hours: { weekdays: '08:00 - 00:00', weekend: '09:00 - 02:00' },
                images: ['https://images.unsplash.com/photo-1515443961218-1523678885b8?auto=format&fit=crop&w=1200&q=80'],
                lat: 37.8660,
                lng: -0.7925
            }
        ]
    }
];
