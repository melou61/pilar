
import { Event, CensusCategory } from './types';

export const MOCK_NEWS = [
  {
    id: 'n1',
    source: 'Ayuntamiento (Facebook)',
    sourceType: 'social',
    icon: 'facebook',
    date: 'Hace 2 horas',
    title: '🚧 Corte de tráfico en Calle Mayor',
    content: 'Informamos que debido a las obras de mejora del alcantarillado, la Calle Mayor permanecerá cerrada al tráfico desde el cruce con Calle Isla hasta la Plaza de la Iglesia durante las próximas 48 horas. Disculpen las molestias.',
    image: 'https://images.unsplash.com/photo-1545147986-a9d6f210df77?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    url: '#'
  },
  {
    id: 'n4',
    source: 'Agenda Cultural',
    sourceType: 'official',
    icon: 'calendar',
    date: 'Ayer',
    title: 'Cine de Verano: Proyección de "Campeonex"',
    content: 'Este viernes a las 22:00h en la Plaza de Toros. Entrada gratuita hasta completar aforo. ¡Trae tus palomitas!',
    image: 'https://images.unsplash.com/photo-1517604931442-71053e683e12?auto=format&fit=crop&w=800&q=80',
    url: '#'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Fiestas del Pilar 2025',
    category: 'Festival',
    date: '1 - 21 Octubre 2025',
    location: 'Recinto Ferial & Plaza de la Iglesia',
    description: 'Las principales celebraciones del patrón con procesiones, fuegos artificiales, música tradicional y ofrendas florales.',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=1000&q=80',
    longDescription: `
      <p>Las Fiestas Patronales en honor a la Virgen del Pilar son el evento más importante del año en Pilar de la Horadada. Durante tres semanas, el pueblo se transforma en un escenario de alegría, tradición y convivencia.</p>
      <h3 class="font-bold mt-4 mb-2">Programación Destacada:</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Ofrenda de Flores:</strong> Un emotivo desfile donde miles de vecinos visten trajes regionales.</li>
        <li><strong>Desfile de Carrozas:</strong> Color, música y diversión recorren la Calle Mayor.</li>
        <li><strong>Feria de Atracciones:</strong> Diversión asegurada para los más pequeños en el Recinto Ferial.</li>
        <li><strong>Conciertos en Vivo:</strong> Artistas nacionales y locales actúan en la carpa municipal.</li>
        <li><strong>Castillo de Fuegos Artificiales:</strong> El gran cierre de las fiestas.</li>
      </ul>
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
    description: 'Degusta las mejores tapas creativas de 20 establecimientos locales por solo 3€ con bebida incluida.',
    imageUrl: 'https://images.unsplash.com/photo-1544124499-58ec526df938?auto=format&fit=crop&w=1000&q=80',
    longDescription: `
      <p>Vuelve la Ruta de la Tapa a Pilar de la Horadada. Una oportunidad única para descubrir la rica gastronomía local en formato miniatura.</p>
      <p class="mt-2">Participan más de 20 establecimientos que competirán por el premio a la "Mejor Tapa 2025".</p>
    `,
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
    description: 'Encuentra regalos únicos, decoración navideña y dulces tradicionales en un ambiente mágico.',
    imageUrl: 'https://images.unsplash.com/photo-1543232811-da4239851722?auto=format&fit=crop&w=1000&q=80',
    longDescription: `
      <p>La Plaza de la Iglesia se llena de magia con el tradicional Mercado Navideño.</p>
    `,
    lat: 37.8660,
    lng: -0.7925,
    startDateTime: '20251220T100000',
    endDateTime: '20251224T210000'
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
        description: 'Supermercado de confianza con productos frescos, carnicería, pescadería y panadería.',
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
        id: 'aldi',
        name: 'Aldi', 
        address: 'C/ Mayor, 145', 
        phone: '900 22 33 44', 
        category: 'Supermercado',
        description: 'Supermercado de descuento con productos ecológicos y ofertas semanales.',
        rating: 4.2,
        reviewCount: 560,
        isOpen: true,
        hours: { weekdays: '09:00 - 22:00', weekend: '09:00 - 22:00' },
        images: ['https://images.unsplash.com/photo-1604719312563-8912e9223c6a?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8640,
        lng: -0.7910
      },
      { 
        id: 'confiteria-golosa',
        name: 'Confitería La Golosa', 
        address: 'Plaza de la Iglesia, 2', 
        phone: '965 35 33 44', 
        category: 'Pastelería',
        description: 'Pastelería tradicional artesana. Famosos por nuestras milhojas y cordiales.',
        rating: 4.8,
        reviewCount: 320,
        isOpen: true,
        hours: { weekdays: '08:00 - 20:30', weekend: '08:00 - 21:00' },
        images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8661,
        lng: -0.7926,
        socials: {
          instagram: 'https://instagram.com/lagolosa',
          facebook: 'https://facebook.com/lagolosa'
        },
        promotion: {
            title: "2x1 en Cordiales",
            description: "¡Has pasado cerca! Entra ahora y llévate un 2x1 en nuestros famosos cordiales.",
            discountCode: "BEACON-DULCE"
        }
      },
      { 
        id: 'fruteria-huerta',
        name: 'Frutería La Huerta', 
        address: 'C/ Ramón y Cajal, 12', 
        phone: '965 35 11 22', 
        category: 'Frutería',
        description: 'Frutas y verduras frescas directas del campo de Pilar de la Horadada.',
        rating: 4.9,
        reviewCount: 85,
        isOpen: true,
        hours: { weekdays: '08:30 - 14:00, 17:00 - 20:00', weekend: '09:00 - 14:00' },
        images: ['https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8670,
        lng: -0.7935
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
        description: 'Moda mujer actual y complementos. Tallas grandes y atención personalizada.',
        rating: 4.6,
        reviewCount: 45,
        isOpen: true,
        hours: { weekdays: '10:00 - 14:00, 17:00 - 20:30', weekend: '10:00 - 14:00' },
        images: ['https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8658,
        lng: -0.7928
      },
      { 
        id: 'deportes-sport',
        name: 'Pilar Sport', 
        address: 'C/ Mayor, 88', 
        phone: '965 35 99 88', 
        category: 'Deportes',
        description: 'Todo para el deporte: running, fútbol, pádel y natación.',
        rating: 4.5,
        reviewCount: 112,
        isOpen: true,
        hours: { weekdays: '10:00 - 14:00, 17:00 - 21:00', weekend: '10:00 - 14:00' },
        images: ['https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80'],
        lat: 37.8652,
        lng: -0.7922,
        socials: {
          instagram: 'https://instagram.com/pilarsport',
        },
        promotion: {
            title: "5€ Dto. en Zapatillas",
            description: "¡Hola deportista! Tienes 5€ de descuento extra en zapatillas de running solo por estar cerca.",
            discountCode: "RUN-PILAR"
        }
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
            description: 'Atención farmacéutica, fórmulas magistrales y parafarmacia.',
            rating: 4.7,
            reviewCount: 89,
            isOpen: true,
            hours: { weekdays: '09:00 - 21:00', weekend: '09:00 - 14:00' },
            images: ['https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80'],
            lat: 37.8659,
            lng: -0.7927
        },
        { 
            id: 'clinica-sonrisas',
            name: 'Clínica Dental Sonrisas', 
            address: 'C/ Isla, 20', 
            phone: '965 35 11 00', 
            category: 'Dentista',
            description: 'Odontología integral, implantes y ortodoncia invisible.',
            rating: 4.9,
            reviewCount: 112,
            isOpen: true,
            hours: { weekdays: '09:30 - 20:00', weekend: 'Cerrado' },
            images: ['https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'],
            website: 'https://clinicasm.com',
            lat: 37.8648,
            lng: -0.7933
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
                description: 'El lugar de encuentro clásico. Tapas variadas, desayunos y el mejor café en la terraza más céntrica.',
                rating: 4.6,
                reviewCount: 450,
                isOpen: true,
                hours: { weekdays: '08:00 - 23:00', weekend: '09:00 - 00:00' },
                images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'],
                lat: 37.8660,
                lng: -0.7926
            },
            {
                id: 'bodegon',
                name: 'El Bodegón',
                address: 'C/ Mayor, 33',
                phone: '965 35 11 99',
                category: 'Tradicional',
                description: 'Vinos de la tierra y embutidos locales. Ambiente rústico y acogedor.',
                rating: 4.7,
                reviewCount: 320,
                isOpen: true,
                hours: { weekdays: '11:00 - 16:00, 19:00 - 23:00', weekend: '11:00 - 00:00' },
                images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'],
                lat: 37.8656,
                lng: -0.7935,
                socials: {
                    facebook: 'https://facebook.com/elbodegon',
                },
                promotion: {
                    title: "Tapa Gratis",
                    description: "Con tu primera consumición. ¡Bienvenido al Bodegón!",
                    discountCode: "TAPA-FREE"
                }
            }
        ]
    },
    {
        id: 'restaurantes',
        title: 'Restaurantes',
        items: [
            {
                id: 'rest-gallego',
                name: 'Restaurante El Gallego',
                address: 'Av. del Mar, 12 (Torre de la Horadada)',
                phone: '966 76 99 88',
                category: 'Marisquería',
                description: 'Especialidad en pulpo, mariscos y carnes a la brasa. Vistas al mar.',
                rating: 4.5,
                reviewCount: 890,
                isOpen: true,
                hours: { weekdays: '13:00 - 16:30, 20:00 - 23:30', weekend: '13:00 - 23:30' },
                images: ['https://images.unsplash.com/photo-1544124499-58ec526df938?auto=format&fit=crop&w=800&q=80'],
                lat: 37.8690,
                lng: -0.7580
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
        description: 'Disfruta de uno de los mejores campos de golf de la Costa Blanca. Conocido como "La Isla del Golf" por su espectacular hoyo 18.',
        image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        lat: 37.8820,
        lng: -0.8100
    },
    {
        id: 'senderismo-rio-seco',
        title: 'Ruta Senderismo Río Seco',
        category: 'Naturaleza',
        location: 'Pinar de Campoverde',
        description: 'Una ruta impresionante excavada por el agua en la roca arenisca. Ideal para familias y amantes de la fotografía.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        lat: 37.8950,
        lng: -0.8300
    },
    {
        id: 'torre-vigia',
        title: 'Visita Torre de la Horadada',
        category: 'Cultura',
        location: 'Puerto de la Torre',
        description: 'Icono del municipio. Torre de vigilancia del siglo XVI construida para divisar barcos piratas. Vistas increíbles del Mediterráneo.',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        lat: 37.8682,
        lng: -0.7570
    }
];
