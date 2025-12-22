
import { Event, CensusCategory, CensusItem, NewsItem } from './types';

export const MOCK_NEWS: NewsItem[] = [
  { id: 'n1', source: 'Ayuntamiento', sourceType: 'official', icon: 'megaphone', date: 'Hace 1h', title: '🎉 Gran Charanga este Sábado', content: 'Desfile de carrozas artesanas por las calles del centro.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80', url: '#', category: 'GENERAL' },
  { id: 'n2', source: 'Funeraria PH', sourceType: 'official', icon: 'flower', date: 'Hoy', title: 'D. Antonio García Martínez', content: 'Funeral mañana 11:00h en la Parroquia.', category: 'DIFUNTOS', url: '#' },
  { id: 'n3', source: 'Empleo PH', sourceType: 'official', icon: 'briefcase', date: 'Ayer', title: 'Oferta: Camareros Mil Palmeras', content: 'Se busca personal para temporada de verano.', category: 'TRABAJO', url: '#' },
  { id: 'n4', source: 'Policía Local', sourceType: 'official', icon: 'shield', date: 'Hoy', title: 'Corte Calle Mayor', content: 'Obras de mejora hasta el viernes.', category: 'GENERAL', url: '#' }
];

export const MOCK_EVENTS: Event[] = [
  { id: 'fiestas-patronales', title: 'Fiestas del Pilar', category: 'TRADICIÓN', date: 'Octubre 2025', location: 'Centro', description: 'Carrozas y ofrendas.', longDescription: 'El Desfile de Carrozas es único.', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', isFestival: true, lat: 37.8653, lng: -0.7932 },
  { id: 'semana-santa', title: 'Semana Santa', category: 'RELIGIOSO', date: 'Abril 2025', location: 'Centro', description: 'Procesiones solemnes.', longDescription: 'Tallas de Sánchez Lozano.', imageUrl: 'https://images.unsplash.com/photo-1523424162985-1d4889c2c62c?auto=format&fit=crop&w=800&q=80', isFestival: true, lat: 37.8655, lng: -0.7928 }
];

export const MOCK_BEACHES = [
  { 
    id: 'milpalmeras', 
    name: 'Mil Palmeras', 
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', 
    blueFlag: true, 
    status: 'Abierta', 
    rating: 4.9, 
    services: ['Duchas', 'Parking', 'Cruz Roja', 'Chiringuito', 'Accesible', 'Alquiler Hamacas'],
    lat: 37.8864, lng: -0.7607,
    length: '346m',
    sandType: 'Arena Fina',
    occupancy: 'Media',
    waterTemp: '24°C',
    uvIndex: 7,
    seaState: 'Calma'
  },
  { 
    id: 'rocamar', 
    name: 'Calas de Rocamar', 
    image: 'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1200&q=80', 
    blueFlag: false, 
    status: 'Abierta', 
    rating: 4.8, 
    services: ['Escaleras', 'Snorkel', 'Calas Naturales'],
    lat: 37.8760, lng: -0.7680,
    length: '100m',
    sandType: 'Roca/Arena',
    occupancy: 'Baja',
    waterTemp: '25°C',
    uvIndex: 8,
    seaState: 'Calma'
  },
  { 
    id: 'jesuitas', 
    name: 'Jesuitas', 
    image: 'https://images.unsplash.com/photo-1544949116-7e8894129f6d?auto=format&fit=crop&w=1200&q=80', 
    blueFlag: true, 
    status: 'Abierta', 
    rating: 4.8, 
    services: ['Vóley Playa', 'Redes', 'Footing', 'Duchas'],
    lat: 37.8690, lng: -0.7780,
    length: '465m',
    sandType: 'Arena Blanca',
    occupancy: 'Alta',
    waterTemp: '24°C',
    uvIndex: 7,
    seaState: 'Bandera Verde'
  },
  { 
    id: 'elconde', 
    name: 'El Conde', 
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', 
    blueFlag: true, 
    status: 'Abierta', 
    rating: 4.9, 
    services: ['Torre Vigía', 'Chiringuito', 'Historia', 'Parking'],
    lat: 37.8645, lng: -0.7840,
    length: '210m',
    sandType: 'Arena Dorada',
    occupancy: 'Media',
    waterTemp: '23°C',
    uvIndex: 6,
    seaState: 'Calma'
  },
  { 
    id: 'elpuerto', 
    name: 'El Puerto', 
    image: 'https://images.unsplash.com/photo-1444676632488-26a136c45b9b?auto=format&fit=crop&w=1200&q=80', 
    blueFlag: true, 
    status: 'Abierta', 
    rating: 4.6, 
    services: ['Marina', 'Rampa Accesible', 'Restaurantes', 'Vela'],
    lat: 37.8610, lng: -0.7820,
    length: '115m',
    sandType: 'Arena Fina',
    occupancy: 'Media',
    waterTemp: '24°C',
    uvIndex: 7,
    seaState: 'Calma'
  },
  { 
    id: 'lasvillas', 
    name: 'Las Villas', 
    image: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1200&q=80', 
    blueFlag: false, 
    status: 'Abierta', 
    rating: 4.7, 
    services: ['Paseo', 'Pesca', 'Familiar', 'Accesible'],
    lat: 37.8570, lng: -0.7815,
    length: '410m',
    sandType: 'Arena Blanca',
    occupancy: 'Media',
    waterTemp: '24°C',
    uvIndex: 7,
    seaState: 'Calma'
  },
  { 
    id: 'higuericas', 
    name: 'Las Higuericas', 
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80', 
    blueFlag: true, 
    status: 'Abierta', 
    rating: 4.9, 
    services: ['Dunas', 'Chiringuito', 'Madera', 'Parking', 'Sostenible', 'Música'],
    lat: 37.8540, lng: -0.7830,
    length: '1.050m',
    sandType: 'Arena Fina/Dunas',
    occupancy: 'Alta',
    waterTemp: '25°C',
    uvIndex: 8,
    seaState: 'Óptimo'
  },
  { 
    id: 'elmojon', 
    name: 'El Mojón', 
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80', 
    blueFlag: false, 
    status: 'Abierta', 
    rating: 4.5, 
    services: ['Parque Natural', 'Tranquilidad', 'Sendero Botánico', 'Snorkel'],
    lat: 37.8480, lng: -0.7860,
    length: '465m',
    sandType: 'Arena Fina',
    occupancy: 'Baja',
    waterTemp: '25°C',
    uvIndex: 8,
    seaState: 'Calma'
  }
];

export const MOCK_SIGHTSEEING = [
  { id: 'torre-vigia', name: 'Torre de la Horadada', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', category: 'Monumento', century: 'XVI', lat: 37.8653, lng: -0.7845 }
];

export const ACTIVITIES_LIST = [
  { id: 'rio-seco', title: 'Río Seco', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', category: 'Senderismo', duration: '2h', rating: 4.8, difficulty: 'Fácil', location: 'Campoverde', lat: 37.8932, lng: -0.8432 }
];

// --- COMERCIOS ---
const SHOPPING_ITEMS: CensusItem[] = [
  { id: 's1', name: 'Modas Lucía', address: 'C/ Mayor 12', phone: '965351010', category: 'Moda', zone: 'CENTRO', description: 'Boutique exclusiva con las mejores marcas nacionales e internacionales.', rating: 4.9, reviewCount: 120, isOpen: true, hours: { weekdays: '10-14, 17-20', weekend: '10-14' }, images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'], lat: 37.866, lng: -0.793 },
  { id: 's2', name: 'Ferretería El Pilar', address: 'C/ del Mar 5', phone: '965351234', category: 'Hogar', zone: 'CENTRO', description: 'Todo lo que necesitas para tu hogar y jardín.', rating: 4.7, reviewCount: 80, isOpen: true, hours: { weekdays: '9-14, 16-20', weekend: '9-14' }, images: ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'], lat: 37.865, lng: -0.791 },
  { id: 's3', name: 'Pastelería Vicente', address: 'Av. Constitución 18', phone: '965351122', category: 'Alimentación', zone: 'CENTRO', description: 'Dulces artesanos y pan tradicional recién hecho.', rating: 5.0, reviewCount: 200, isOpen: true, hours: { weekdays: '8-21', weekend: '8-21' }, images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'], lat: 37.864, lng: -0.794 },
  { id: 's4', name: 'Farmacia Lda. Maria', address: 'C/ Mayor 4', phone: '965351000', category: 'Salud', zone: 'CENTRO', description: 'Atención farmacéutica personalizada 12h.', rating: 4.8, reviewCount: 30, isOpen: true, hours: { weekdays: '9-21', weekend: '9-14' }, images: ['https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80'], lat: 37.866, lng: -0.792 },
  { id: 's5', name: 'Estilistas Vogue', address: 'C/ Mayor 40', phone: '965351819', category: 'Belleza', zone: 'CENTRO', description: 'Salón de belleza vanguardista.', rating: 4.9, reviewCount: 70, isOpen: true, hours: { weekdays: '9-19', weekend: '9-14' }, images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'], lat: 37.865, lng: -0.793 }
];

const DINING_ITEMS: CensusItem[] = [
  { id: 'r1', name: 'La Mamma', address: 'C/ Mayor 45', phone: '965351515', category: 'Italiano', zone: 'CENTRO', description: 'La mejor pasta artesana del municipio.', rating: 4.6, reviewCount: 450, priceRange: '€€', isOpen: true, hours: { weekdays: '19-23', weekend: '13-23' }, images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'], lat: 37.864, lng: -0.793 },
  { id: 'r2', name: 'Pilar Burguer', address: 'Av. Constitución', phone: '965351212', category: 'Internacional', zone: 'CENTRO', description: 'Hamburguesas gourmet con productos locales.', rating: 4.5, reviewCount: 290, priceRange: '€€', isOpen: true, hours: { weekdays: '19-23', weekend: '13-00' }, images: ['https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'], lat: 37.863, lng: -0.794 }
];

export const COMMERCIAL_CENSUS: CensusCategory[] = [ { id: 'shopping', title: 'Comercio Local', items: SHOPPING_ITEMS } ];
export const DINING_CENSUS: CensusCategory[] = [ { id: 'restaurantes', title: 'Restauración', items: DINING_ITEMS } ];
