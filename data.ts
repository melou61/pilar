

import { Event, CensusCategory, CensusItem, NewsItem } from './types';

export const TERMS_OF_SERVICE = `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Última actualización: 25 de enero de 2026</p>
  <p>Bienvenido a Pilar Vivo. Al acceder y utilizar nuestra plataforma web en pilarapp.vortexdigital-ai.com, aceptas cumplir con los siguientes términos y condiciones. Por favor, léelos detenidamente antes de utilizar nuestros servicios.</p>
  
  <h3 class="text-lg font-bold text-gray-900">1. Aceptación de los Términos</h3>
  <p>Al registrarte, acceder o utilizar Pilar Vivo, aceptas estar vinculado por estos Términos del Servicio y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no debes utilizar nuestra plataforma.</p>

  <h3 class="text-lg font-bold text-gray-900">2. Descripción del Servicio</h3>
  <p>Pilar Vivo es una plataforma web que proporciona servicios digitales y funcionalidades relacionadas con la gestión y organización de información. Nuestros servicios pueden incluir herramientas de productividad, almacenamiento de datos, gestión de contenidos y otras funcionalidades según se describan en la plataforma.</p>

  <h3 class="text-lg font-bold text-gray-900">3. Registro y Cuenta de Usuario</h3>
  <p>Para acceder a ciertas funcionalidades de nuestra plataforma, deberás crear una cuenta proporcionando información precisa, actualizada y completa. Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de todas las actividades que ocurran bajo tu cuenta. Te comprometes a notificarnos inmediatamente cualquier uso no autorizado de tu cuenta o cualquier otra violación de seguridad.</p>

  <h3 class="text-lg font-bold text-gray-900">4. Uso Aceptable</h3>
  <p>Al utilizar Pilar Vivo, te comprometes a:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Utilizar la plataforma únicamente para fines legales y de acuerdo con estos términos.</li>
    <li>No utilizar el servicio de manera que pueda dañar, deshabilitar o sobrecargar nuestros servidores.</li>
    <li>No intentar acceder de manera no autorizada a ninguna parte de la plataforma.</li>
    <li>No transmitir contenido ilegal, amenazante, abusivo, difamatorio u ofensivo.</li>
    <li>No utilizar la plataforma para actividades fraudulentas o engañosas.</li>
    <li>No utilizar bots, scrapers u otras herramientas automatizadas sin autorización previa.</li>
  </ul>

  <h3 class="text-lg font-bold text-gray-900">5. Propiedad Intelectual</h3>
  <p>Todo el contenido presente en Pilar Vivo, incluyendo textos, gráficos, logotipos, imágenes, vídeos, software y otros materiales, está protegido por derechos de autor y otras leyes de propiedad intelectual. Este contenido es propiedad de Pilar Vivo o de sus licenciantes. No está permitido copiar, modificar, distribuir, transmitir, mostrar, reproducir o crear trabajos derivados de nuestro contenido sin autorización previa por escrito.</p>

  <h3 class="text-lg font-bold text-gray-900">6. Contenido Generado por el Usuario</h3>
  <p>Si compartes contenido en nuestra plataforma (documentos, comentarios, archivos, datos, etc.), nos concedes una licencia mundial, no exclusiva, libre de regalías para usar, reproducir, procesar y almacenar dicho contenido en relación con el funcionamiento del servicio. Eres responsable del contenido que compartes y garantizas que tienes todos los derechos necesarios para hacerlo. No compartas contenido que infrinja derechos de terceros o que sea ilegal.</p>

  <h3 class="text-lg font-bold text-gray-900">7. Privacidad y Protección de Datos</h3>
  <p>El uso de tu información personal está regulado por nuestra Política de Privacidad, que forma parte integral de estos términos. Te recomendamos leerla detenidamente para entender cómo recopilamos, utilizamos y protegemos tus datos.</p>

  <h3 class="text-lg font-bold text-gray-900">8. Pagos y Suscripciones</h3>
  <p>Si la plataforma ofrece servicios de pago o suscripciones premium, aceptas pagar todas las tarifas asociadas según los precios vigentes en el momento de la contratación. Los pagos se procesarán a través de proveedores de pago terceros seguros. Las suscripciones se renovarán automáticamente a menos que canceles antes del período de renovación. Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. Los reembolsos se manejarán de acuerdo con nuestra política de reembolsos, que se comunicará en el momento de la compra.</p>

  <h3 class="text-lg font-bold text-gray-900">9. Disponibilidad del Servicio</h3>
  <p>Aunque nos esforzamos por mantener la plataforma disponible en todo momento, no garantizamos que el servicio será ininterrumpido o libre de errores. Podemos suspender temporalmente el acceso por mantenimiento, actualizaciones o circunstancias fuera de nuestro control. No seremos responsables por ninguna interrupción del servicio, pérdida de datos o daños resultantes de dichas interrupciones.</p>

  <h3 class="text-lg font-bold text-gray-900">10. Respaldo de Datos</h3>
  <p>Aunque implementamos medidas de seguridad y respaldo, te recomendamos mantener copias de seguridad de tu contenido importante. No seremos responsables por la pérdida de datos causada por fallos técnicos, errores de usuario o cualquier otra circunstancia.</p>

  <h3 class="text-lg font-bold text-gray-900">11. Cancelación y Terminación</h3>
  <p>Puedes cancelar tu cuenta en cualquier momento contactándonos o a través de la configuración de tu cuenta. Nos reservamos el derecho de suspender o terminar tu acceso a Pilar Vivo en cualquier momento, sin previo aviso, si determinamos que has violado estos términos o por cualquier otra razón que consideremos apropiada. En caso de terminación, tu derecho a utilizar el servicio cesará inmediatamente. Podemos eliminar tu contenido después de un período razonable, salvo que la ley nos obligue a conservarlo.</p>

  <h3 class="text-lg font-bold text-gray-900">12. Limitación de Responsabilidad</h3>
  <p>Pilar Vivo se proporciona "tal cual" y "según disponibilidad". No garantizamos que el servicio será ininterrumpido, seguro o libre de errores. En la máxima medida permitida por la ley, Pilar Vivo no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, o por cualquier pérdida de beneficios, ingresos, datos, uso o cualquier otro intangible.</p>

  <h3 class="text-lg font-bold text-gray-900">13. Indemnización</h3>
  <p>Aceptas indemnizar y mantener indemne a Pilar Vivo, sus directivos, empleados y agentes de cualquier reclamación, daño, pérdida o gasto (incluyendo honorarios legales razonables) que surja de tu uso del servicio, tu violación de estos términos o tu violación de cualquier derecho de terceros.</p>

  <h3 class="text-lg font-bold text-gray-900">14. Modificaciones del Servicio y de los Términos</h3>
  <p>Nos reservamos el derecho de modificar, suspender o descontinuar cualquier aspecto de Pilar Vivo en cualquier momento, con o sin previo aviso. También podemos actualizar estos Términos del Servicio periódicamente. Te notificaremos sobre cambios significativos mediante un aviso en la plataforma o por correo electrónico, y la fecha de "última actualización" se modificará en consecuencia. Tu uso continuado del servicio después de dichos cambios constituye tu aceptación de los nuevos términos.</p>

  <h3 class="text-lg font-bold text-gray-900">15. Ley Aplicable y Jurisdicción</h3>
  <p>Estos términos se regirán e interpretarán de acuerdo con las leyes de España. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Madrid, España.</p>

  <h3 class="text-lg font-bold text-gray-900">16. Divisibilidad</h3>
  <p>Si alguna disposición de estos términos se considera inválida o inaplicable, dicha disposición se modificará e interpretará para lograr los objetivos de dicha disposición en la mayor medida posible, y las disposiciones restantes continuarán en pleno vigor y efecto.</p>

  <h3 class="text-lg font-bold text-gray-900">17. Renuncia</h3>
  <p>Ninguna renuncia por nuestra parte a cualquier término o condición establecida en estos Términos del Servicio se considerará una renuncia adicional o continua de dicho término o condición.</p>

  <h3 class="text-lg font-bold text-gray-900">18. Contacto</h3>
  <p>Si tienes preguntas sobre estos Términos del Servicio, puedes contactarnos en:<br/>
  <strong>Ayuntamiento Pilar de la Horadada</strong><br/>
  Dirección: Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante)<br/>
  Email: ayto@pilardelahoradada.org<br/>
  Sitio web: pilarapp.vortexdigital-ai.com</p>
</div>
`;

export const PRIVACY_POLICY = `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Última actualización: 25 de enero de 2026</p>
  <p>En Pilar Vivo, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos tu información personal cuando utilizas nuestra plataforma web pilarapp.vortexdigital-ai.com.</p>

  <h3 class="text-lg font-bold text-gray-900">1. Responsable del Tratamiento</h3>
  <p>El responsable del tratamiento de tus datos personales es:<br/>
  <strong>Pilar Vivo / Ayuntamiento Pilar de la Horadada</strong><br/>
  Dirección: Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante)<br/>
  Email: ayto@pilardelahoradada.org<br/>
  Sitio web: pilarapp.vortexdigital-ai.com</p>

  <h3 class="text-lg font-bold text-gray-900">2. Información que Recopilamos</h3>
  <p><strong>2.1 Información que nos proporcionas directamente:</strong></p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Datos de registro: nombre, apellidos, dirección de correo electrónico, contraseña</li>
    <li>Información de perfil: datos personales opcionales que decidas compartir</li>
    <li>Contenido del usuario: documentos, archivos, datos y cualquier información que subas o crees en la plataforma</li>
    <li>Información de pago: datos de facturación y transacciones (procesados por proveedores terceros seguros)</li>
    <li>Comunicaciones: cuando nos contactas, guardamos el contenido de tus mensajes y correspondencia</li>
  </ul>
  <p><strong>2.2 Información recopilada automáticamente:</strong></p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Datos de uso: páginas visitadas, funcionalidades utilizadas, tiempo de navegación, interacciones con la plataforma</li>
    <li>Información del dispositivo: tipo de dispositivo, sistema operativo, navegador, dirección IP, identificadores únicos</li>
    <li>Datos de ubicación: ubicación aproximada basada en tu dirección IP</li>
    <li>Cookies y tecnologías similares: utilizamos cookies y tecnologías de seguimiento para mejorar tu experiencia</li>
    <li>Registros del servidor: información técnica sobre tu conexión y uso del servicio</li>
  </ul>

  <h3 class="text-lg font-bold text-gray-900">3. Cómo Utilizamos tu Información</h3>
  <p>Utilizamos la información recopilada para los siguientes propósitos:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Proporcionar, mantener, operar y mejorar nuestros servicios</li>
    <li>Crear y gestionar tu cuenta de usuario</li>
    <li>Procesar transacciones y gestionar suscripciones</li>
    <li>Personalizar tu experiencia en la plataforma</li>
    <li>Comunicarnos contigo sobre tu cuenta, actualizaciones del servicio, notificaciones importantes y promociones</li>
    <li>Proporcionar atención al cliente y responder a tus consultas</li>
    <li>Analizar el uso de la plataforma para mejorar nuestros servicios y desarrollar nuevas funcionalidades</li>
    <li>Detectar, prevenir y abordar problemas técnicos, fraudes y actividades maliciosas</li>
    <li>Cumplir con obligaciones legales y proteger nuestros derechos</li>
    <li>Realizar investigación y análisis para comprender mejor cómo se utiliza nuestra plataforma</li>
  </ul>

  <h3 class="text-lg font-bold text-gray-900">4. Base Legal para el Tratamiento de Datos</h3>
  <p>Procesamos tus datos personales bajo las siguientes bases legales según el Reglamento General de Protección de Datos (RGPD):</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Ejecución de un contrato: para proporcionar los servicios que has solicitado y gestionar tu cuenta</li>
    <li>Consentimiento: cuando nos has dado tu consentimiento explícito para procesar tus datos</li>
    <li>Interés legítimo: para mejorar nuestros servicios, garantizar la seguridad de la plataforma y comunicarnos contigo</li>
    <li>Obligación legal: cuando debemos cumplir con requisitos legales o regulatorios</li>
  </ul>

  <h3 class="text-lg font-bold text-gray-900">5. Compartir tu Información</h3>
  <p>No vendemos tu información personal a terceros. Podemos compartir tu información en las siguientes circunstancias:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Proveedores de servicios: compartimos información con proveedores que nos ayudan a operar nuestra plataforma, incluyendo servicios de alojamiento web (Vortex Digital AI), procesadores de pago, servicios de email, análisis y soporte técnico</li>
    <li>Cumplimiento legal: cuando sea requerido por ley, orden judicial, proceso legal o solicitud gubernamental</li>
    <li>Protección de derechos: para proteger nuestros derechos, propiedad o seguridad, así como los de nuestros usuarios u otros</li>
    <li>Transferencias empresariales: en caso de fusión, adquisición, venta de activos o procedimiento de quiebra</li>
    <li>Con tu consentimiento: cuando nos autorices explícitamente a compartir tu información con terceros específicos</li>
  </ul>
  <p>Todos nuestros proveedores de servicios están obligados contractualmente a proteger tu información y a utilizarla únicamente para los fines especificados.</p>

  <h3 class="text-lg font-bold text-gray-900">6. Cookies y Tecnologías de Seguimiento</h3>
  <p>Utilizamos cookies y tecnologías similares para:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Mantener tu sesión activa y recordar tus preferencias</li>
    <li>Entender cómo utilizas la plataforma</li>
    <li>Mejorar el rendimiento y la funcionalidad del servicio</li>
    <li>Personalizar contenido y experiencias</li>
    <li>Realizar análisis y mediciones</li>
  </ul>
  <p>Tipos de cookies que utilizamos:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Cookies esenciales: necesarias para el funcionamiento básico del sitio y para mantener tu sesión activa</li>
    <li>Cookies de rendimiento: nos ayudan a entender cómo los usuarios interactúan con la plataforma mediante análisis agregados</li>
    <li>Cookies de funcionalidad: recuerdan tus preferencias y configuraciones</li>
    <li>Cookies de marketing: utilizadas para mostrar publicidad relevante (si aplica)</li>
  </ul>
  <p>Puedes gestionar las preferencias de cookies a través de la configuración de tu navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de la plataforma.</p>

  <h3 class="text-lg font-bold text-gray-900">7. Transferencias Internacionales de Datos</h3>
  <p>Tus datos pueden ser transferidos y procesados en servidores ubicados fuera del Espacio Económico Europeo (EEE), incluyendo pero no limitado a servicios de alojamiento proporcionados por Vortex Digital AI.</p>
  <p>En tales casos, nos aseguramos de que existan salvaguardas adecuadas para proteger tu información, como:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Cláusulas contractuales estándar aprobadas por la Comisión Europea</li>
    <li>Certificaciones de privacidad reconocidas</li>
    <li>Medidas técnicas y organizativas apropiadas</li>
  </ul>

  <h3 class="text-lg font-bold text-gray-900">8. Seguridad de Datos</h3>
  <p>Implementamos medidas técnicas y organizativas apropiadas para proteger tu información personal contra acceso no autorizado, pérdida, destrucción, alteración o divulgación. Estas medidas incluyen:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Encriptación de datos en tránsito y en reposo</li>
    <li>Controles de acceso estrictos y autenticación de usuarios</li>
    <li>Servidores seguros con protección mediante firewall</li>
    <li>Monitoreo continuo de seguridad</li>
    <li>Auditorías de seguridad periódicas</li>
    <li>Formación del personal en protección de datos</li>
    <li>Políticas de seguridad de la información</li>
  </ul>
  <p>Sin embargo, ningún método de transmisión por internet o almacenamiento electrónico es 100% seguro. Aunque nos esforzamos por proteger tu información, no podemos garantizar seguridad absoluta.</p>

  <h3 class="text-lg font-bold text-gray-900">9. Retención de Datos</h3>
  <p>Conservamos tu información personal durante el tiempo necesario para cumplir con los propósitos descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.</p>
  <p>Los criterios utilizados para determinar nuestros períodos de retención incluyen:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>El tiempo que mantienes una cuenta activa con nosotros</li>
    <li>Si existe una obligación legal de conservar los datos</li>
    <li>Si la retención es recomendable debido a nuestra posición legal (por ejemplo, plazos de prescripción, litigios o investigaciones regulatorias)</li>
  </ul>
  <p>Cuando cierres tu cuenta, eliminaremos o anonimizaremos tu información personal dentro de un plazo razonable, excepto cuando debamos conservarla por obligaciones legales, contables o de seguridad.</p>

  <h3 class="text-lg font-bold text-gray-900">10. Tus Derechos</h3>
  <p>De acuerdo con el RGPD y la legislación española de protección de datos, tienes los siguientes derechos:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Derecho de acceso: puedes solicitar información sobre los datos personales que tenemos sobre ti</li>
    <li>Derecho de rectificación: puedes solicitar la corrección de datos inexactos o incompletos</li>
    <li>Derecho de supresión: puedes solicitar la eliminación de tus datos personales ("derecho al olvido")</li>
    <li>Derecho de limitación: puedes solicitar la limitación del procesamiento de tus datos en ciertas circunstancias</li>
    <li>Derecho de portabilidad: puedes solicitar recibir tus datos en formato estructurado, de uso común y lectura mecánica</li>
    <li>Derecho de oposición: puedes oponerte al procesamiento de tus datos en determinadas situaciones</li>
    <li>Derecho a retirar el consentimiento: puedes retirar tu consentimiento en cualquier momento cuando el procesamiento se base en el consentimiento</li>
    <li>Derecho a no ser objeto de decisiones automatizadas: derecho a no ser objeto de una decisión basada únicamente en el tratamiento automatizado</li>
  </ul>
  <p>Para ejercer estos derechos, puedes:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Acceder a la configuración de tu cuenta en la plataforma</li>
    <li>Contactarnos directamente en ayto@pilardelahoradada.org</li>
    <li>Enviarnos una solicitud por escrito a nuestra dirección postal</li>
  </ul>
  <p>Responderemos a tu solicitud dentro del plazo legal de un mes, que puede extenderse a dos meses adicionales en casos complejos.</p>

  <h3 class="text-lg font-bold text-gray-900">11. Menores de Edad</h3>
  <p>Pilar Vivo no está dirigido a menores de 16 años. No recopilamos intencionalmente información personal de menores de 16 años sin el consentimiento de los padres o tutores legales. Si eres padre o tutor y crees que tu hijo nos ha proporcionado información personal, contáctanos inmediatamente.</p>

  <h3 class="text-lg font-bold text-gray-900">12. Enlaces a Sitios Terceros</h3>
  <p>Nuestra plataforma puede contener enlaces a sitios web, aplicaciones o servicios de terceros que no son operados por nosotros. No somos responsables de las prácticas de privacidad de estos sitios.</p>

  <h3 class="text-lg font-bold text-gray-900">13. Cambios a esta Política de Privacidad</h3>
  <p>Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos sobre cambios significativos mediante:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Un aviso destacado en nuestra plataforma</li>
    <li>Notificación por correo electrónico</li>
    <li>Actualización de la fecha de "última actualización"</li>
  </ul>

  <h3 class="text-lg font-bold text-gray-900">14. Medidas Adicionales de Privacidad</h3>
  <p><strong>14.1 Seguridad de contraseñas</strong>: Las contraseñas se almacenan utilizando técnicas de hash y encriptación.</p>
  <p><strong>14.2 Autenticación de dos factores</strong>: Ofrecemos opciones de autenticación de dos factores para mejorar la seguridad.</p>
  <p><strong>14.3 Notificaciones de violación de datos</strong>: En caso de una violación de seguridad que afecte a tus datos personales, te notificaremos de acuerdo con las leyes aplicables.</p>

  <h3 class="text-lg font-bold text-gray-900">15. Contacto y Reclamaciones</h3>
  <p>Si tienes preguntas, inquietudes o deseas ejercer tus derechos relacionados con la privacidad, contáctanos en:<br/>
  <strong>Pilar Vivo / Ayuntamiento Pilar de la Horadada</strong><br/>
  Email: ayto@pilardelahoradada.org<br/>
  Dirección: Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante)<br/>
  Sitio web: pilarapp.vortexdigital-ai.com</p>
  <p>También tienes derecho a presentar una reclamación ante la autoridad de protección de datos competente:<br/>
  <strong>Agencia Española de Protección de Datos (AEPD)</strong><br/>
  Web: www.aepd.es<br/>
  Dirección: C/ Jorge Juan, 6, 28001 Madrid<br/>
  Teléfono: 901 100 099 / 912 663 517</p>
</div>
`;

export const MOCK_NEWS: NewsItem[] = [
  { id: 'n1', source: 'Ayuntamiento', sourceType: 'official', icon: 'megaphone', date: 'Hace 1h', title: '🎉 Gran Charanga este Sábado', content: 'Desfile de carrozas artesanas por las calles del centro.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80', url: '#', category: 'GENERAL' },
  { id: 'n2', source: 'Funeraria PH', sourceType: 'official', icon: 'flower', date: 'Hoy', title: 'D. Antonio García Martínez', content: 'Funeral mañana 11:00h en la Parroquia.', category: 'DIFUNTOS', url: '#' },
  { id: 'n3', source: 'Empleo PH', sourceType: 'official', icon: 'briefcase', date: 'Ayer', title: 'Oferta: Camareros Mil Palmeras', content: 'Se busca personal para temporada de verano.', category: 'TRABAJO', url: '#' },
  { id: 'n4', source: 'Policía Local', sourceType: 'official', icon: 'shield', date: 'Hoy', title: 'Corte Calle Mayor', content: 'Obras de mejora hasta el viernes.', category: 'GENERAL', url: '#' }
];

export const MOCK_EVENTS: Event[] = [
  { id: 'fiestas-patronales', title: 'Fiestas del Pilar', category: 'TRADICIÓN', date: 'Octubre 2026', location: 'Centro', description: 'Carrozas y ofrendas.', longDescription: 'El Desfile de Carrozas es único.', imageUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1200&q=80', isFestival: true, lat: 37.8653, lng: -0.7932 },
  { id: 'semana-santa', title: 'Semana Santa', category: 'RELIGIOSO', date: 'Abril 2026', location: 'Centro', description: 'Procesiones solemnes.', longDescription: 'Tallas de Sánchez Lozano.', imageUrl: 'https://images.unsplash.com/photo-1545653701-d853757659bc?auto=format&fit=crop&w=1200&q=80', isFestival: true, lat: 37.8655, lng: -0.7928 }
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
  promotion: undefined // Se eliminó la inyección automática
}));

const DINING_DATA = [
  { name: 'Mesón El Puerto', cat: 'Restaurante', zone: 'LA_TORRE', lat: 37.8645, lng: -0.7850 },
  { name: 'Restaurante Los Arcos', cat: 'Mediterráneo', zone: 'CENTRO', lat: 37.8655, lng: -0.7930 },
  { name: 'Pizzería La Plaza', cat: 'Italiano', zone: 'CENTRO', lat: 37.8660, lng: -0.7925 },
  { name: 'Chiringuito Pirata', cat: 'Chiringuito', zone: 'MIL_PALMERAS', lat: 37.8865, lng: -0.7605 },
  { name: 'Bar Central', cat: 'Tapas', zone: 'CENTRO', lat: 37.8650, lng: -0.7935 },
  { name: 'Asador El Toril', cat: 'Carnes', zone: 'CAMPOVERDE', lat: 37.8935, lng: -0.8420 },
  { name: 'Marisquería La Lonja', cat: 'Pescados', zone: 'LA_TORRE', lat: 37.8640, lng: -0.7845 },
  { name: 'Cafetería Sol', cat: 'Cafetería', zone: 'CENTRO', lat: 37.8658, lng: -0.7922 },
  { name: 'Restaurante Asiático Gran China', cat: 'Internacional', zone: 'CENTRO', lat: 37.8648, lng: -0.7940 },
  { name: 'Heladería Artesana', cat: 'Postres', zone: 'MIL_PALMERAS', lat: 37.8870, lng: -0.7610 },
  { name: 'La Cabaña del Mar', cat: 'Restaurante', zone: 'EL_MOJON', lat: 37.8520, lng: -0.7842 },
  { name: 'Burger Station', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8665, lng: -0.7938 },
  { name: 'Tapería El Rincón', cat: 'Tapas', zone: 'LA_TORRE', lat: 37.8635, lng: -0.7838 },
  { name: 'Arrocería El Caldeo', cat: 'Arroces', zone: 'MIL_PALMERAS', lat: 37.8860, lng: -0.7615 },
  { name: 'Gastrobar Fusión', cat: 'Restaurante', zone: 'CENTRO', lat: 37.8652, lng: -0.7928 }
];

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
  promotion: undefined // Se eliminó la inyección automática
}));

export const COMMERCIAL_CENSUS: CensusCategory[] = [ 
  { id: 'shopping-pilar', title: 'Comercio Local', items: SHOPPING_ITEMS } 
];

export const DINING_CENSUS: CensusCategory[] = [ 
  { id: 'restaurantes-pilar', title: 'Restauración', items: DINING_ITEMS } 
];
