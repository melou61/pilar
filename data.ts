
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

// --- FUNCIONES DE ASIGNACIÓN DE IMÁGENES REALISTAS ---

const CATEGORY_IMAGES: Record<string, string[]> = {
  'Moda': [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    'https://images.unsplash.com/photo-1470309634658-8398b2cd0924',
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5'
  ],
  'Ferretería': [
    'https://images.unsplash.com/photo-1581244277943-fe4a9c777189',
    'https://images.unsplash.com/photo-1530124560676-44b24e64f26a',
    'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8'
  ],
  'Supermercado': [
    'https://images.unsplash.com/photo-1578916171728-46686eac8d58',
    'https://images.unsplash.com/photo-1542838132-92c53300491e',
    'https://images.unsplash.com/photo-1506484381205-f7945653044d'
  ],
  'Farmacia': [
    'https://images.unsplash.com/photo-1587854680352-936b22b91030',
    'https://images.unsplash.com/photo-1631549916768-4119b2e55c06'
  ],
  'Inmobiliaria': [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
  ],
  'Bazar': [
    'https://images.unsplash.com/photo-1513885559034-7740df6317b9',
    'https://images.unsplash.com/photo-1601924582970-9238bcb495d9'
  ],
  'Peluquería': [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f'
  ],
  'Óptica': [
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371'
  ],
  'Restaurante': [
    'https://images.unsplash.com/photo-1517248135467-4c7ed9d8607c',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5'
  ],
  'Italiano': [
    'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50',
    'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3'
  ],
  'Chiringuito': [
    'https://images.unsplash.com/photo-1533777857419-b2b3095f2ff8',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206'
  ],
  'Tapas': [
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845'
  ],
  'Arroces': [
    'https://images.unsplash.com/photo-1512058564366-18510be2db19',
    'https://images.unsplash.com/photo-1534080564583-6be75777b70a'
  ],
  'Heladería': [
    'https://images.unsplash.com/photo-1501443762994-82bd5dabb892',
    'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f'
  ],
  'Cafetería': [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93'
  ]
};

const getRealisticImage = (cat: string, index: number) => {
  const pool = CATEGORY_IMAGES[cat] || CATEGORY_IMAGES['Moda']; // Fallback a Moda
  const base = pool[index % pool.length];
  return `${base}?auto=format&fit=crop&w=800&q=80`;
};

// --- CENSO COMPLETO (125 ITEMS ACTUALIZADOS CON IMÁGENES REALES) ---

const generateId = (prefix: string, index: number) => `${prefix}-${index}`;

const SHOP_DATA = [
  { name: 'Modas Lucía', cat: 'Moda', zone: 'CENTRO', lat: 37.8662, lng: -0.7928 },
  { name: 'Ferretería El Pilar', cat: 'Ferretería', zone: 'CENTRO', lat: 37.8651, lng: -0.7915 },
  { name: 'Supermercado Dialprix', cat: 'Supermercado', zone: 'CENTRO', lat: 37.8643, lng: -0.7941 },
  { name: 'Boutique Playa', cat: 'Moda', zone: 'LA_TORRE', lat: 37.8648, lng: -0.7848 },
  { name: 'Peluquería Stylo', cat: 'Peluquería', zone: 'CENTRO', lat: 37.8655, lng: -0.7922 },
  { name: 'Bazar Victoria', cat: 'Bazar', zone: 'CENTRO', lat: 37.8665, lng: -0.7935 },
  { name: 'Inmobiliaria Pilar', cat: 'Inmobiliaria', zone: 'MIL_PALMERAS', lat: 37.8860, lng: -0.7610 },
  { name: 'Óptica Horadada', cat: 'Óptica', zone: 'CENTRO', lat: 37.8658, lng: -0.7925 },
  { name: 'Regalos Marina', cat: 'Bazar', zone: 'LA_TORRE', lat: 37.8635, lng: -0.7832 },
  { name: 'Estanco Nº1', cat: 'Bazar', zone: 'CENTRO', lat: 37.8652, lng: -0.7930 },
  { name: 'Floristería Azahar', cat: 'Bazar', zone: 'CENTRO', lat: 37.8659, lng: -0.7920 },
  { name: 'PC Pilar', cat: 'Bazar', zone: 'CENTRO', lat: 37.8647, lng: -0.7933 },
  { name: 'Muebles Pinar', cat: 'Inmobiliaria', zone: 'CAMPOVERDE', lat: 37.8942, lng: -0.8415 },
  { name: 'Zapatería Paso', cat: 'Moda', zone: 'CENTRO', lat: 37.8660, lng: -0.7931 },
  { name: 'Farmacia Lda. Maria', cat: 'Farmacia', zone: 'CENTRO', lat: 37.8660, lng: -0.7920 },
  { name: 'Farmacia Torre', cat: 'Farmacia', zone: 'LA_TORRE', lat: 37.8600, lng: -0.7820 },
  { name: 'Supermercado Mercadona', cat: 'Supermercado', zone: 'CENTRO', lat: 37.8610, lng: -0.7950 },
  { name: 'Bazar El Mojón', cat: 'Bazar', zone: 'EL_MOJON', lat: 37.8520, lng: -0.7840 },
  { name: 'Taller Mecánico PH', cat: 'Bazar', zone: 'CENTRO', lat: 37.8680, lng: -0.7960 },
  { name: 'Tienda de Pesca', cat: 'Bazar', zone: 'LA_TORRE', lat: 37.8640, lng: -0.7850 },
  { name: 'InmoTorre', cat: 'Inmobiliaria', zone: 'LA_TORRE', lat: 37.8650, lng: -0.7830 },
  { name: 'Peluquería Masculina', cat: 'Peluquería', zone: 'CENTRO', lat: 37.8657, lng: -0.7923 },
  { name: 'Perfumería Aroma', cat: 'Moda', zone: 'CENTRO', lat: 37.8661, lng: -0.7929 },
  { name: 'Papelería Pilar', cat: 'Bazar', zone: 'CENTRO', lat: 37.8654, lng: -0.7932 },
  { name: 'Pescadería Paco', cat: 'Supermercado', zone: 'CENTRO', lat: 37.8659, lng: -0.7935 },
  { name: 'Carnicería El Chuleton', cat: 'Supermercado', zone: 'CENTRO', lat: 37.8662, lng: -0.7938 },
  { name: 'Modas Paula', cat: 'Moda', zone: 'MIL_PALMERAS', lat: 37.8865, lng: -0.7615 },
  { name: 'Librería Central', cat: 'Bazar', zone: 'CENTRO', lat: 37.8655, lng: -0.7925 },
  { name: 'Herbolario Salud', cat: 'Farmacia', zone: 'CENTRO', lat: 37.8663, lng: -0.7921 },
  { name: 'Joyería Horadada', cat: 'Moda', zone: 'CENTRO', lat: 37.8658, lng: -0.7926 },
  { name: 'Tienda de Deportes', cat: 'Moda', zone: 'CENTRO', lat: 37.8645, lng: -0.7934 },
  { name: 'Viveros PH', cat: 'Bazar', zone: 'CAMPOVERDE', lat: 37.8930, lng: -0.8420 },
  { name: 'InmoCampoverde', cat: 'Inmobiliaria', zone: 'CAMPOVERDE', lat: 37.8945, lng: -0.8410 },
  { name: 'Bazar El Pinar', cat: 'Bazar', zone: 'CAMPOVERDE', lat: 37.8940, lng: -0.8405 },
  { name: 'Supermercado SPAR', cat: 'Supermercado', zone: 'MIL_PALMERAS', lat: 37.8870, lng: -0.7600 },
  { name: 'Farmacia Pinar', cat: 'Farmacia', zone: 'CAMPOVERDE', lat: 37.8940, lng: -0.8410 },
  { name: 'Clínica Dental', cat: 'Farmacia', zone: 'CENTRO', lat: 37.8665, lng: -0.7925 },
  { name: 'Podología Pilar', cat: 'Farmacia', zone: 'CENTRO', lat: 37.8650, lng: -0.7920 },
  { name: 'Estética Avanzada', cat: 'Peluquería', zone: 'CENTRO', lat: 37.8658, lng: -0.7930 },
  { name: 'Gimnasio Municipal', cat: 'Bazar', zone: 'CENTRO', lat: 37.8695, lng: -0.7975 },
  { name: 'Papelería La Torre', cat: 'Bazar', zone: 'LA_TORRE', lat: 37.8642, lng: -0.7855 },
  { name: 'Souvenirs Beach', cat: 'Bazar', zone: 'MIL_PALMERAS', lat: 37.8862, lng: -0.7605 },
  { name: 'Inmo Palmeras', cat: 'Inmobiliaria', zone: 'MIL_PALMERAS', lat: 37.8868, lng: -0.7612 },
  { name: 'Tienda de Juguetes', cat: 'Bazar', zone: 'CENTRO', lat: 37.8661, lng: -0.7936 },
  { name: 'Ferretería Campoverde', cat: 'Ferretería', zone: 'CAMPOVERDE', lat: 37.8935, lng: -0.8425 },
  { name: 'Lavandería Self', cat: 'Bazar', zone: 'CENTRO', lat: 37.8652, lng: -0.7940 },
  { name: 'Pinturas Pilar', cat: 'Ferretería', zone: 'CENTRO', lat: 37.8640, lng: -0.7945 },
  { name: 'Electro Hogar', cat: 'Bazar', zone: 'CENTRO', lat: 37.8658, lng: -0.7918 },
  { name: 'Modas Vintage', cat: 'Moda', zone: 'CENTRO', lat: 37.8666, lng: -0.7924 },
  { name: 'Peluquería Kids', cat: 'Peluquería', zone: 'CENTRO', lat: 37.8653, lng: -0.7927 },
  { name: 'Bazar Suerte', cat: 'Bazar', zone: 'LA_TORRE', lat: 37.8638, lng: -0.7842 },
  { name: 'Inmobiliaria Beach', cat: 'Inmobiliaria', zone: 'EL_MOJON', lat: 37.8515, lng: -0.7845 },
  { name: 'Muebles Jardín', cat: 'Inmobiliaria', zone: 'LA_TORRE', lat: 37.8625, lng: -0.7835 },
  { name: 'Óptica Palmeras', cat: 'Óptica', zone: 'MIL_PALMERAS', lat: 37.8864, lng: -0.7608 },
  { name: 'Regalos El Pilar', cat: 'Bazar', zone: 'CENTRO', lat: 37.8668, lng: -0.7932 },
  { name: 'Estanco La Torre', cat: 'Bazar', zone: 'LA_TORRE', lat: 37.8646, lng: -0.7852 },
  { name: 'Floristería Marina', cat: 'Bazar', zone: 'LA_TORRE', lat: 37.8630, lng: -0.7825 },
  { name: 'Informática PH', cat: 'Bazar', zone: 'CENTRO', lat: 37.8642, lng: -0.7928 },
  { name: 'Modas Mar', cat: 'Moda', zone: 'LA_TORRE', lat: 37.8652, lng: -0.7840 },
  { name: 'Zapatería Elche', cat: 'Moda', zone: 'CENTRO', lat: 37.8663, lng: -0.7937 },
  { name: 'Farmacia Mojón', cat: 'Farmacia', zone: 'EL_MOJON', lat: 37.8525, lng: -0.7838 },
  { name: 'Pescadería Marina', cat: 'Supermercado', zone: 'LA_TORRE', lat: 37.8644, lng: -0.7858 },
  { name: 'Carnicería Selecta', cat: 'Supermercado', zone: 'MIL_PALMERAS', lat: 37.8872, lng: -0.7618 },
  { name: 'Bazar Central', cat: 'Bazar', zone: 'CENTRO', lat: 37.8657, lng: -0.7934 },
  { name: 'Inmo Horadada', cat: 'Inmobiliaria', zone: 'CENTRO', lat: 37.8660, lng: -0.7940 }
];

const DINING_DATA = [
  { name: 'Mesón El Puerto', cat: 'Restaurante', zone: 'LA_TORRE', lat: 37.8643, lng: -0.7835 },
  { name: 'Restaurante El Pilar', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8655, lng: -0.7925 },
  { name: 'La Mamma Pizzeria', cat: 'Italiano', zone: 'CENTRO', lat: 37.8640, lng: -0.7930 },
  { name: 'Chiringuito El Pirata', cat: 'Chiringuito', zone: 'LA_TORRE', lat: 37.8645, lng: -0.7842 },
  { name: 'Restaurante Nautico', cat: 'Restaurante', zone: 'LA_TORRE', lat: 37.8632, lng: -0.7828 },
  { name: 'Heladería La Torre', cat: 'Heladería', zone: 'LA_TORRE', lat: 37.8647, lng: -0.7850 },
  { name: 'Popeye Mil Palmeras', cat: 'Restaurante', zone: 'MIL_PALMERAS', lat: 37.8864, lng: -0.7605 },
  { name: 'Restaurante Olympia', cat: 'Restaurante', zone: 'MIL_PALMERAS', lat: 37.8858, lng: -0.7620 },
  { name: 'Bar El Galeón', cat: 'Tapas', zone: 'LA_TORRE', lat: 37.8638, lng: -0.7838 },
  { name: 'Cafetería Plaza', cat: 'Cafetería', zone: 'CENTRO', lat: 37.8658, lng: -0.7928 },
  { name: 'Hamburguesería PH', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8648, lng: -0.7935 },
  { name: 'Tapería El Rincón', cat: 'Tapas', zone: 'CENTRO', lat: 37.8662, lng: -0.7932 },
  { name: 'Arrocería El Puerto', cat: 'Arroces', zone: 'LA_TORRE', lat: 37.8635, lng: -0.7830 },
  { name: 'Restaurante Campoverde', cat: 'Restaurante', zone: 'CAMPOVERDE', lat: 37.8940, lng: -0.8412 },
  { name: 'Pub El Mojón', cat: 'Tapas', zone: 'EL_MOJON', lat: 37.8522, lng: -0.7842 },
  { name: 'Pizzería Palmeras', cat: 'Italiano', zone: 'MIL_PALMERAS', lat: 37.8866, lng: -0.7610 },
  { name: 'Restaurante Las Villas', cat: 'Restaurante', zone: 'LA_TORRE', lat: 37.8620, lng: -0.7850 },
  { name: 'Bar El Tapeo', cat: 'Tapas', zone: 'CENTRO', lat: 37.8652, lng: -0.7924 },
  { name: 'Café Del Sol', cat: 'Cafetería', zone: 'LA_TORRE', lat: 37.8655, lng: -0.7845 },
  { name: 'Wok Pilar', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8605, lng: -0.7960 },
  { name: 'Asador La Parilla', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8665, lng: -0.7938 },
  { name: 'Bar La Esquina', cat: 'Tapas', zone: 'CENTRO', lat: 37.8659, lng: -0.7915 },
  { name: 'Restaurante Los Arcos', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8650, lng: -0.7945 },
  { name: 'Heladería Xixona', cat: 'Heladería', zone: 'CENTRO', lat: 37.8656, lng: -0.7929 },
  { name: 'Bar El Cruce', cat: 'Tapas', zone: 'CENTRO', lat: 37.8670, lng: -0.7950 },
  { name: 'Cafetería Royal', cat: 'Cafetería', zone: 'CENTRO', lat: 37.8654, lng: -0.7931 },
  { name: 'Restaurante Chino', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8645, lng: -0.7940 },
  { name: 'Bar La Plaza', cat: 'Tapas', zone: 'LA_TORRE', lat: 37.8649, lng: -0.7852 },
  { name: 'Pizzería Napol', cat: 'Italiano', zone: 'LA_TORRE', lat: 37.8638, lng: -0.7840 },
  { name: 'Chiringuito El Conde', cat: 'Chiringuito', zone: 'LA_TORRE', lat: 37.8640, lng: -0.7845 },
  { name: 'Bar El Mirador', cat: 'Tapas', zone: 'LA_TORRE', lat: 37.8635, lng: -0.7835 },
  { name: 'Restaurante El Mojón', cat: 'Restaurante', zone: 'EL_MOJON', lat: 37.8525, lng: -0.7845 },
  { name: 'Bar El Chiringuito', cat: 'Chiringuito', zone: 'EL_MOJON', lat: 37.8518, lng: -0.7848 },
  { name: 'Restaurante Pinar', cat: 'Restaurante', zone: 'CAMPOVERDE', lat: 37.8935, lng: -0.8415 },
  { name: 'Cafetería Campoverde', cat: 'Cafetería', zone: 'CAMPOVERDE', lat: 37.8942, lng: -0.8408 },
  { name: 'Bar El Bosque', cat: 'Tapas', zone: 'CAMPOVERDE', lat: 37.8938, lng: -0.8410 },
  { name: 'Restaurante Palmeras', cat: 'Restaurante', zone: 'MIL_PALMERAS', lat: 37.8865, lng: -0.7602 },
  { name: 'Chiringuito Mil Palmeras', cat: 'Chiringuito', zone: 'MIL_PALMERAS', lat: 37.8862, lng: -0.7608 },
  { name: 'Bar El Sol', cat: 'Tapas', zone: 'MIL_PALMERAS', lat: 37.8868, lng: -0.7612 },
  { name: 'Café de la Mar', cat: 'Cafetería', zone: 'MIL_PALMERAS', lat: 37.8870, lng: -0.7615 },
  { name: 'Arrocería Marina', cat: 'Arroces', zone: 'MIL_PALMERAS', lat: 37.8875, lng: -0.7620 },
  { name: 'Tapería Central', cat: 'Tapas', zone: 'CENTRO', lat: 37.8660, lng: -0.7930 },
  { name: 'Bar Restaurante PH', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8652, lng: -0.7928 },
  { name: 'Hamburguesería Palmeras', cat: 'Restaurante', zone: 'MIL_PALMERAS', lat: 37.8860, lng: -0.7618 },
  { name: 'Pizzería Central', cat: 'Italiano', zone: 'CENTRO', lat: 37.8658, lng: -0.7935 },
  { name: 'Bar La Torre', cat: 'Tapas', zone: 'LA_TORRE', lat: 37.8645, lng: -0.7848 },
  { name: 'Restaurante Mediterráneo', cat: 'Restaurante', zone: 'LA_TORRE', lat: 37.8638, lng: -0.7832 },
  { name: 'Cafetería El Faro', cat: 'Cafetería', zone: 'LA_TORRE', lat: 37.8642, lng: -0.7840 },
  { name: 'Heladería Marina', cat: 'Heladería', zone: 'LA_TORRE', lat: 37.8646, lng: -0.7846 },
  { name: 'Bar El Pescador', cat: 'Tapas', zone: 'LA_TORRE', lat: 37.8635, lng: -0.7838 },
  { name: 'Arrocería Pilar', cat: 'Arroces', zone: 'CENTRO', lat: 37.8662, lng: -0.7925 },
  { name: 'Restaurante Las Brisas', cat: 'Restaurante', zone: 'LA_TORRE', lat: 37.8625, lng: -0.7845 },
  { name: 'Cafetería Central', cat: 'Cafetería', zone: 'CENTRO', lat: 37.8657, lng: -0.7922 },
  { name: 'Bar El Norte', cat: 'Tapas', zone: 'CENTRO', lat: 37.8668, lng: -0.7935 },
  { name: 'Hamburguesería Torre', cat: 'Restaurante', zone: 'LA_TORRE', lat: 37.8644, lng: -0.7850 },
  { name: 'Pizzería Campoverde', cat: 'Italiano', zone: 'CAMPOVERDE', lat: 37.8932, lng: -0.8420 },
  { name: 'Restaurante El Patio', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8661, lng: -0.7933 },
  { name: 'Bar La Ola', cat: 'Tapas', zone: 'MIL_PALMERAS', lat: 37.8871, lng: -0.7611 },
  { name: 'Café Imperial', cat: 'Cafetería', zone: 'CENTRO', lat: 37.8653, lng: -0.7929 },
  { name: 'Bar San Pedro', cat: 'Tapas', zone: 'EL_MOJON', lat: 37.8520, lng: -0.7845 }
];

const SHOPPING_ITEMS: CensusItem[] = SHOP_DATA.map((shop, i) => ({
  id: generateId('shop', i),
  name: shop.name,
  address: `Calle ${shop.name}, Pilar de la Horadada`,
  phone: `96535${1000 + i}`,
  category: shop.cat,
  zone: shop.zone as any,
  description: `Tu tienda de confianza ${shop.name} en ${shop.zone}. Ofrecemos los mejores productos de ${shop.cat} con una atención personalizada y profesional. Ven a visitarnos y descubre la calidad del comercio local de Pilar de la Horadada.`,
  rating: 4.5 + (i % 5) / 10,
  reviewCount: 50 + i * 2,
  isOpen: true,
  hours: { weekdays: '09:00-14:00, 17:00-20:00', weekend: '09:00-14:00' },
  images: [getRealisticImage(shop.cat, i)],
  lat: shop.lat,
  lng: shop.lng,
  promotion: (i % 10 === 0) ? {
    title: `Oferta en ${shop.name}`,
    description: `Aprovecha un 20% de descuento directo al presentar la App en caja. ¡Solo hoy!`,
    discountCode: `PH${100 + i}`,
    proximityRange: 'NEAR',
    frequencyPerDay: 3,
    maxDistanceMeters: 20,
    activeTimeMinutes: 60
  } : undefined
}));

const DINING_ITEMS: CensusItem[] = DINING_DATA.map((dining, i) => ({
  id: generateId('dining', i),
  name: dining.name,
  address: `Calle ${dining.name}, Pilar de la Horadada`,
  phone: `96535${2000 + i}`,
  category: dining.cat,
  zone: dining.zone as any,
  description: `Disfruta de la mejor gastronomía en ${dining.name}. Especialistas en ${dining.cat}, utilizamos productos frescos de la zona para ofrecerte una experiencia culinaria única en ${dining.zone}. Calidad y tradición mediterránea en cada plato.`,
  rating: 4.6 + (i % 4) / 10,
  reviewCount: 150 + i * 5,
  isOpen: true,
  priceRange: (i % 3 === 0) ? '€€€' : (i % 2 === 0) ? '€€' : '€',
  hours: { weekdays: '12:00-16:00, 19:30-23:30', weekend: '12:00-24:00' },
  images: [getRealisticImage(dining.cat, i)],
  lat: dining.lat,
  lng: dining.lng,
  featuredItems: ['Especialidad de la casa', 'Vino de la zona', 'Postre artesano'],
  promotion: (i % 15 === 0) ? {
    title: `Invitación en ${dining.name}`,
    description: `Aperitivo de la casa gratis con tu consumición principal al mostrar este cupón.`,
    discountCode: `GastroPH${i}`,
    proximityRange: 'IMMEDIATE',
    frequencyPerDay: 1,
    maxDistanceMeters: 10,
    activeTimeMinutes: 120
  } : undefined
}));

export const COMMERCIAL_CENSUS: CensusCategory[] = [ 
  { id: 'shopping-pilar', title: 'Comercio Local', items: SHOPPING_ITEMS } 
];

export const DINING_CENSUS: CensusCategory[] = [ 
  { id: 'restaurantes-pilar', title: 'Restauración', items: DINING_ITEMS } 
];
