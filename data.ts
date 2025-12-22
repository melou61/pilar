
import { Event, CensusCategory, CensusItem, NewsItem } from './types';

export const MOCK_NEWS: NewsItem[] = [
  { id: 'n1', source: 'Ayuntamiento', sourceType: 'official', icon: 'megaphone', date: 'Hace 1h', title: '🎉 Gran Charanga este Sábado', content: 'Desfile de carrozas artesanas por las calles del centro.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80', url: '#', category: 'GENERAL' },
  { id: 'n2', source: 'Funeraria PH', sourceType: 'official', icon: 'flower', date: 'Hoy', title: 'D. Antonio García Martínez', content: 'Funeral mañana 11:00h en la Parroquia.', category: 'DIFUNTOS', url: '#' },
  { id: 'n3', source: 'Empleo PH', sourceType: 'official', icon: 'briefcase', date: 'Ayer', title: 'Oferta: Camareros Mil Palmeras', content: 'Se busca personal para temporada de verano.', category: 'TRABAJO', url: '#' },
  { id: 'n4', source: 'Policía Local', sourceType: 'official', icon: 'shield', date: 'Hoy', title: 'Corte Calle Mayor', content: 'Obras de mejora hasta el viernes.', category: 'GENERAL', url: '#' }
];

export const MOCK_EVENTS: Event[] = [
  { id: 'fiestas-patronales', title: 'Fiestas del Pilar', category: 'TRADICIÓN', date: 'Octubre 2025', location: 'Centro', description: 'Carrozas y ofrendas.', longDescription: 'El Desfile de Carrozas es único.', imageUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1200&q=80', isFestival: true, lat: 37.8653, lng: -0.7932 },
  { id: 'semana-santa', title: 'Semana Santa', category: 'RELIGIOSO', date: 'Abril 2025', location: 'Centro', description: 'Procesiones solemnes.', longDescription: 'Tallas de Sánchez Lozano.', imageUrl: 'https://images.unsplash.com/photo-1545653701-d853757659bc?auto=format&fit=crop&w=1200&q=80', isFestival: true, lat: 37.8655, lng: -0.7928 }
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
  }
];

export const MOCK_SIGHTSEEING = [
  { 
    id: 'torre-vigia', 
    name: 'Torre de la Horadada', 
    image: 'https://images.unsplash.com/photo-1548625361-0268523236f2?auto=format&fit=crop&w=1200&q=80', 
    category: 'Monumento', 
    century: 'XVI', 
    lat: 37.8653, lng: -0.7845,
    style: 'Renacentista / Defensiva',
    material: 'Piedra de Sillería',
    visitTime: '45 min',
    crowdLevel: 'Media',
    status: 'Excelente',
    amenities: ['Audioguía QR', 'Parking Cercano', 'Mirador', 'Información Histórica', 'Accesible']
  },
  { 
    id: 'iglesia-pilar', 
    name: 'Iglesia Ntra. Sra. del Pilar', 
    image: 'https://images.unsplash.com/photo-1541432999881-197771ec8021?auto=format&fit=crop&w=1200&q=80', 
    category: 'Religioso', 
    century: 'XX (Base XVIII)', 
    lat: 37.8655, lng: -0.7928,
    style: 'Neoclásico / Regionalista',
    material: 'Ladrillo y Piedra',
    visitTime: '30 min',
    crowdLevel: 'Baja',
    status: 'Activo',
    amenities: ['Entrada Libre', 'Zona Peatonal', 'Cerca de Comercios', 'Arte Sacro']
  },
  { 
    id: 'museo-etnologico', 
    name: 'Museo Arqueológico PH', 
    image: 'https://images.unsplash.com/photo-1518998053574-53ee81be84ac?auto=format&fit=crop&w=1200&q=80', 
    category: 'Museo', 
    century: 'Contemporáneo', 
    lat: 37.8660, lng: -0.7930,
    style: 'Moderno / Educativo',
    material: 'Vidrio y Hormigón',
    visitTime: '1.5 h',
    crowdLevel: 'Baja',
    status: 'Abierto',
    amenities: ['Aire Acondicionado', 'Accesible', 'Visitas Guiadas', 'Tienda de Recuerdos']
  },
  { 
    id: 'canteras-romanas', 
    name: 'Canteras Romanas', 
    image: 'https://images.unsplash.com/photo-1449156001931-828332736075?auto=format&fit=crop&w=1200&q=80', 
    category: 'Yacimiento', 
    century: 'I a.C.', 
    lat: 37.8540, lng: -0.7850,
    style: 'Ingeniería Romana',
    material: 'Roca Natural',
    visitTime: '1 h',
    crowdLevel: 'Baja',
    status: 'Visitable',
    amenities: ['Senderos Marítimos', 'Panel Informativo', 'Snorkel Cercano', 'Espacio Natural']
  }
];

export const ACTIVITIES_LIST = [
  { id: 'rio-seco', title: 'Río Seco', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', category: 'Senderismo', duration: '2h', rating: 4.8, difficulty: 'Fácil', location: 'Campoverde', lat: 37.8932, lng: -0.8432 }
];

// --- COMERCIOS ---
const SHOPPING_ITEMS: CensusItem[] = [
  { id: 's1', name: 'Modas Lucía', address: 'C/ Mayor 12', phone: '965351010', category: 'Moda', zone: 'CENTRO', description: 'Boutique exclusiva con las mejores marcas nacionales e internacionales.', rating: 4.9, reviewCount: 120, isOpen: true, hours: { weekdays: '10-14, 17-20', weekend: '10-14' }, images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'], lat: 37.866, lng: -0.793 },
  { id: 's2', name: 'Ferretería El Pilar', address: 'C/ del Mar 5', phone: '965351234', category: 'Hogar', zone: 'CENTRO', description: 'Todo lo que necesitas para tu hogar y jardín.', rating: 4.7, reviewCount: 80, isOpen: true, hours: { weekdays: '9-14, 16-20', weekend: '9-14' }, images: ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'], lat: 37.865, lng: -0.791 }
];

const DINING_ITEMS: CensusItem[] = [
  { id: 'r1', name: 'La Mamma', address: 'C/ Mayor 45', phone: '965351515', category: 'Italiano', zone: 'CENTRO', description: 'La mejor pasta artesana del municipio.', rating: 4.6, reviewCount: 450, priceRange: '€€', isOpen: true, hours: { weekdays: '19-23', weekend: '13-23' }, images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'], lat: 37.864, lng: -0.793 }
];

export const COMMERCIAL_CENSUS: CensusCategory[] = [ { id: 'shopping', title: 'Comercio Local', items: SHOPPING_ITEMS } ];
export const DINING_CENSUS: CensusCategory[] = [ { id: 'restaurantes', title: 'Restauración', items: DINING_ITEMS } ];
