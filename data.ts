
import { Event, CensusCategory, CensusItem, NewsItem, ForumPost } from './types';

// --- TEXTOS LEGALES MULTI-IDIOMA ---

export const TERMS_OF_SERVICE: Record<string, string> = {
  es: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Última actualización: 25 de enero de 2026</p>
  <p>Bienvenido a Pilar Vivo. Al acceder y utilizar nuestra plataforma web en pilarapp.vortexdigital-ai.com, aceptas cumplir con los siguientes términos y condiciones.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Aceptación</h3>
  <p>Al registrarte o utilizar Pilar Vivo, aceptas estos Términos. Si no estás de acuerdo, no utilices la plataforma.</p>
  <h3 class="text-lg font-bold text-gray-900">2. Servicio</h3>
  <p>Pilar Vivo es una plataforma digital de gestión y organización de información local.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Cuenta</h3>
  <p>Eres responsable de mantener la confidencialidad de tu cuenta y de toda actividad bajo la misma.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Uso Aceptable</h3>
  <p>Te comprometes a usar la plataforma legalmente y no dañar el servicio ni a terceros.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Propiedad Intelectual</h3>
  <p>El contenido es propiedad de Pilar Vivo o sus licenciantes. No está permitida su copia sin autorización.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Privacidad</h3>
  <p>Tu privacidad es importante. Consulta nuestra Política de Privacidad.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Responsabilidad</h3>
  <p>El servicio se ofrece "tal cual". No garantizamos disponibilidad ininterrumpida.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contacto</h3>
  <p><strong>Ayuntamiento Pilar de la Horadada</strong><br/>
  Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante)<br/>
  Email: ayto@pilardelahoradada.org</p>
</div>
`,
  en: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Last updated: January 25, 2026</p>
  <p>Welcome to Pilar Vivo. By accessing and using our web platform at pilarapp.vortexdigital-ai.com, you agree to comply with the following terms and conditions.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Acceptance</h3>
  <p>By registering or using Pilar Vivo, you agree to these Terms. If you do not agree, do not use the platform.</p>
  <h3 class="text-lg font-bold text-gray-900">2. Service</h3>
  <p>Pilar Vivo is a digital platform for local information management and organization.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Account</h3>
  <p>You are responsible for maintaining the confidentiality of your account and all activities under it.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Acceptable Use</h3>
  <p>You agree to use the platform legally and not to harm the service or third parties.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Intellectual Property</h3>
  <p>Content is owned by Pilar Vivo or its licensors. Copying without authorization is prohibited.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Privacy</h3>
  <p>Your privacy is important. Please refer to our Privacy Policy.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Liability</h3>
  <p>The service is provided "as is". We do not guarantee uninterrupted availability.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contact</h3>
  <p><strong>Pilar de la Horadada Town Hall</strong><br/>
  Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Spain<br/>
  Email: ayto@pilardelahoradada.org</p>
</div>
`,
  fr: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Dernière mise à jour : 25 janvier 2026</p>
  <p>Bienvenue sur Pilar Vivo. En accédant et en utilisant notre plateforme web, vous acceptez de respecter les termes et conditions suivants.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Acceptation</h3>
  <p>En vous inscrivant ou en utilisant Pilar Vivo, vous acceptez ces Conditions. Si vous n'êtes pas d'accord, n'utilisez pas la plateforme.</p>
  <h3 class="text-lg font-bold text-gray-900">2. Service</h3>
  <p>Pilar Vivo est une plateforme numérique de gestion de l'information locale.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Compte</h3>
  <p>Vous êtes responsable de la confidentialité de votre compte et de toutes les activités qui s'y déroulent.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Utilisation Acceptable</h3>
  <p>Vous acceptez d'utiliser la plateforme légalement et de ne pas nuire au service ou aux tiers.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Propriété Intellectuelle</h3>
  <p>Le contenu appartient à Pilar Vivo ou à ses concédants. La copie sans autorisation est interdite.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Confidentialité</h3>
  <p>Votre vie privée est importante. Consultez notre Politique de Confidentialité.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Responsabilité</h3>
  <p>Le service est fourni "tel quel". Nous ne garantissons pas une disponibilité ininterrompue.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contact</h3>
  <p><strong>Mairie de Pilar de la Horadada</strong><br/>
  Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Espagne<br/>
  Email : ayto@pilardelahoradada.org</p>
</div>
`,
  de: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Zuletzt aktualisiert: 25. Januar 2026</p>
  <p>Bei Pilar Vivo nehmen wir den Datenschutz sehr ernst. Diese Datenschutzerklärung beschreibt, wie wir Ihre persönlichen Daten sammeln und schützen.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Verantwortlicher</h3>
  <p><strong>Pilar Vivo / Rathaus Pilar de la Horadada</strong><br/>
  Adresse: Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Spanien<br/>
  E-Mail: ayto@pilardelahoradada.org</p>
  <h3 class="text-lg font-bold text-gray-900">2. Gesammelte Informationen</h3>
  <p>Wir sammeln Registrierungsdaten (Name, E-Mail), Plattformnutzung, ungefähren Standort und technische Daten.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Nutzung der Informationen</h3>
  <p>Wir nutzen Ihre Daten zur Bereitstellung des Dienstes und zur Verwaltung Ihres Kontos.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Weitergabe von Informationen</h3>
  <p>Wir verkaufen Ihre Daten nicht. Wir teilen Informationen mit notwendigen Dienstleistern (Hosting, Analyse).</p>
  <h3 class="text-lg font-bold text-gray-900">5. Cookies</h3>
  <p>Wir verwenden essentielle, Leistungs- und funktionale Cookies.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Sicherheit</h3>
  <p>Wir setzen technische Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Ihre Rechte</h3>
  <p>Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Kontakt: ayto@pilardelahoradada.org.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Kontakt</h3>
  <p>Bei Fragen: ayto@pilardelahoradada.org. AEPD: www.aepd.es</p>
</div>
`,
  it: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Ultimo aggiornamento: 25 gennaio 2026</p>
  <p>Benvenuti su Pilar Vivo. Accedendo e utilizzando la nostra piattaforma web, accetti di rispettare i seguenti termini e condizioni.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Accettazione</h3>
  <p>Registrandoti o utilizzando Pilar Vivo, accetti questi Termini. Se non sei d'accordo, non utilizzare la piattaforma.</p>
  <h3 class="text-lg font-bold text-gray-900">2. Servizio</h3>
  <p>Pilar Vivo è una piattaforma digitale per la gestione delle informazioni locali.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Account</h3>
  <p>Sei responsabile della riservatezza del tuo account e di tutte le attività svolte con esso.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Uso Accettabile</h3>
  <p>Ti impegni a utilizzare la piattaforma legalmente e a non danneggiare il servizio o terzi.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Proprietà Intellettuale</h3>
  <p>Il contenuto è di proprietà di Pilar Vivo o dei suoi licenziatari. È vietata la copia senza autorizzazione.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Privacy</h3>
  <p>La tua privacy è importante. Consulta la nostra Informativa sulla Privacy.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Responsabilità</h3>
  <p>Il servizio è fornito "così com'è". Non garantiamo la disponibilità ininterrotta.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contatto</h3>
  <p><strong>Municipio di Pilar de la Horadada</strong><br/>
  Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Spagna<br/>
  Email: ayto@pilardelahoradada.org</p>
</div>
`,
  pt: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Última atualização: 25 de janeiro de 2026</p>
  <p>Bem-vindo ao Pilar Vivo. Ao acessar e usar nossa plataforma web, você concorda em cumprir os seguintes termos e condições.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Aceitação</h3>
  <p>Ao se registrar ou usar o Pilar Vivo, você concorda com estes Termos. Se não concordar, não use a plataforma.</p>
  <h3 class="text-lg font-bold text-gray-900">2. Serviço</h3>
  <p>Pilar Vivo é uma plataforma digital para gestão de informações locais.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Conta</h3>
  <p>Você é responsável por manter a confidencialidade da sua conta e por todas as atividades nela.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Uso Aceitável</h3>
  <p>Você concorda em usar a plataforma legalmente e não prejudicar o serviço ou terceiros.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Propriedade Intelectual</h3>
  <p>O conteúdo é propriedade do Pilar Vivo ou de seus licenciadores. A cópia sem autorização é proibida.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Privacidade</h3>
  <p>Sua privacidade é importante. Consulte nossa Política de Privacidade.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Responsabilidade</h3>
  <p>O serviço é fornecido "como está". Não garantimos disponibilidade ininterrupta.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contato</h3>
  <p><strong>Câmara Municipal Pilar de la Horadada</strong><br/>
  Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Espanha<br/>
  Email: ayto@pilardelahoradada.org</p>
</div>
`
};

export const PRIVACY_POLICY: Record<string, string> = {
  es: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Última actualización: 25 de enero de 2026</p>
  <p>En Pilar Vivo, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos tu información personal.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Responsable del Tratamiento</h3>
  <p><strong>Pilar Vivo / Ayuntamiento Pilar de la Horadada</strong><br/>
  Dirección: Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante)<br/>
  Email: ayto@pilardelahoradada.org</p>
  <h3 class="text-lg font-bold text-gray-900">2. Información Recopilada</h3>
  <p>Recopilamos datos de registro (nombre, email), uso de la plataforma, ubicación aproximada y datos técnicos.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Uso de la Información</h3>
  <p>Usamos tus datos para proporcionar el servicio, gestionar tu cuenta, mejorar la plataforma y comunicarnos contigo.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Compartir Información</h3>
  <p>No vendemos tus datos. Compartimos información con proveedores de servicios necesarios para operar (hosting, análisis) bajo estrictos contratos de confidencialidad.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Cookies</h3>
  <p>Utilizamos cookies esenciales, de rendimiento y funcionales para mejorar tu experiencia.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Seguridad</h3>
  <p>Implementamos medidas de seguridad técnicas para proteger tus datos, aunque ningún método es 100% seguro.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Tus Derechos</h3>
  <p>Tienes derecho a acceder, rectificar, borrar y limitar el procesamiento de tus datos. Contáctanos en ayto@pilardelahoradada.org para ejercer tus derechos.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contacto y Reclamaciones</h3>
  <p>Para dudas, contacta a ayto@pilardelahoradada.org. También puedes reclamar ante la AEPD (www.aepd.es).</p>
</div>
`,
  en: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Last updated: January 25, 2026</p>
  <p>At Pilar Vivo, we take our users' privacy very seriously. This Privacy Policy describes how we collect, use, store, and protect your personal information.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Data Controller</h3>
  <p><strong>Pilar Vivo / Pilar de la Horadada Town Hall</strong><br/>
  Address: Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Spain<br/>
  Email: ayto@pilardelahoradada.org</p>
  <h3 class="text-lg font-bold text-gray-900">2. Collected Information</h3>
  <p>We collect registration data (name, email), platform usage, approximate location, and technical data.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Use of Information</h3>
  <p>We use your data to provide the service, manage your account, improve the platform, and communicate with you.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Sharing Information</h3>
  <p>We do not sell your data. We share information with service providers necessary to operate (hosting, analytics) under strict confidentiality agreements.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Cookies</h3>
  <p>We use essential, performance, and functional cookies to improve your experience.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Security</h3>
  <p>We implement technical security measures to protect your data, although no method is 100% secure.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Your Rights</h3>
  <p>You have the right to access, rectify, erase, and limit the processing of your data. Contact us at ayto@pilardelahoradada.org to exercise your rights.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contact</h3>
  <p>For questions, contact ayto@pilardelahoradada.org. You can also file a complaint with the AEPD (www.aepd.es).</p>
</div>
`,
  fr: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Dernière mise à jour : 25 janvier 2026</p>
  <p>Chez Pilar Vivo, nous prenons la confidentialité de nos utilisateurs très au sérieux. Cette Politique de Confidentialité décrit comment nous collectons, utilisons et protégeons vos informations personnelles.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Responsable du Traitement</h3>
  <p><strong>Pilar Vivo / Mairie de Pilar de la Horadada</strong><br/>
  Adresse : Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Espagne<br/>
  Email : ayto@pilardelahoradada.org</p>
  <h3 class="text-lg font-bold text-gray-900">2. Informations Collectées</h3>
  <p>Nous collectons les données d'inscription (nom, email), l'utilisation de la plateforme, la localisation approximative et les données techniques.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Utilisation de l'Information</h3>
  <p>Nous utilisons vos données pour fournir le service, gérer votre compte et améliorer la plateforme.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Partage de l'Information</h3>
  <p>Nous ne vendons pas vos données. Nous partageons des informations avec des prestataires nécessaires au fonctionnement (hébergement, analyse).</p>
  <h3 class="text-lg font-bold text-gray-900">5. Cookies</h3>
  <p>Nous utilisons des cookies essentiels, de performance et fonctionnels.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Sécurité</h3>
  <p>Nous mettons en œuvre des mesures techniques pour protéger vos données.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Vos Droits</h3>
  <p>Vous avez le droit d'accéder, de rectifier et d'effacer vos données. Contactez ayto@pilardelahoradada.org.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contact</h3>
  <p>Pour toute question : ayto@pilardelahoradada.org. AEPD : www.aepd.es</p>
</div>
`,
  de: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Zuletzt aktualisiert: 25. Januar 2026</p>
  <p>Bei Pilar Vivo nehmen wir den Datenschutz sehr ernst. Diese Datenschutzerklärung beschreibt, wie wir Ihre persönlichen Daten sammeln und schützen.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Verantwortlicher</h3>
  <p><strong>Pilar Vivo / Rathaus Pilar de la Horadada</strong><br/>
  Adresse: Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Spanien<br/>
  E-Mail: ayto@pilardelahoradada.org</p>
  <h3 class="text-lg font-bold text-gray-900">2. Gesammelte Informationen</h3>
  <p>Wir sammeln Registrierungsdaten (Name, E-Mail), Plattformnutzung, ungefähren Standort und technische Daten.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Nutzung der Informationen</h3>
  <p>Wir nutzen Ihre Daten zur Bereitstellung des Dienstes und zur Verwaltung Ihres Kontos.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Weitergabe von Informationen</h3>
  <p>Wir verkaufen Ihre Daten nicht. Wir teilen Informationen mit notwendigen Dienstleistern (Hosting, Analyse).</p>
  <h3 class="text-lg font-bold text-gray-900">5. Cookies</h3>
  <p>Wir verwenden essentielle, Leistungs- und funktionale Cookies.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Sicherheit</h3>
  <p>Wir setzen technische Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Ihre Rechte</h3>
  <p>Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Kontakt: ayto@pilardelahoradada.org.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Kontakt</h3>
  <p>Bei Fragen: ayto@pilardelahoradada.org. AEPD: www.aepd.es</p>
</div>
`,
  it: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Ultimo aggiornamento: 25 gennaio 2026</p>
  <p>Benvenuti su Pilar Vivo. Accedendo e utilizzando la nostra piattaforma web, accetti di rispettare i seguenti termini e condizioni.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Accettazione</h3>
  <p>Registrandoti o utilizzando Pilar Vivo, accetti questi Termini. Se non sei d'accordo, non utilizzare la piattaforma.</p>
  <h3 class="text-lg font-bold text-gray-900">2. Servizio</h3>
  <p>Pilar Vivo è una piattaforma digitale per la gestione delle informazioni locali.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Account</h3>
  <p>Sei responsabile della riservatezza del tuo account e di tutte le attività svolte con esso.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Uso Accettabile</h3>
  <p>Ti impegni a utilizzare la piattaforma legalmente e a non danneggiare il servizio o terzi.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Proprietà Intellettuale</h3>
  <p>Il contenuto è di proprietà di Pilar Vivo o dei suoi licenziatari. È vietata la copia senza autorizzazione.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Privacy</h3>
  <p>La tua privacy è importante. Consulta la nostra Informativa sulla Privacy.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Responsabilità</h3>
  <p>Il servizio è fornito "così com'è". Non garantiamo la disponibilità ininterrotta.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contatto</h3>
  <p><strong>Municipio di Pilar de la Horadada</strong><br/>
  Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Spagna<br/>
  Email: ayto@pilardelahoradada.org</p>
</div>
`,
  pt: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Última atualização: 25 de janeiro de 2026</p>
  <p>Bem-vindo ao Pilar Vivo. Ao acessar e usar nossa plataforma web, você concorda em cumprir os seguintes termos e condições.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Aceitação</h3>
  <p>Ao se registrar ou usar o Pilar Vivo, você concorda com estes Termos. Se não concordar, não use a plataforma.</p>
  <h3 class="text-lg font-bold text-gray-900">2. Serviço</h3>
  <p>Pilar Vivo é uma plataforma digital para gestão de informações locais.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Conta</h3>
  <p>Você é responsável por manter a confidencialidade da sua conta e por todas as atividades nela.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Uso Aceitável</h3>
  <p>Você concorda em usar a plataforma legalmente e não prejudicar o serviço ou terceiros.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Propriedade Intelectual</h3>
  <p>O conteúdo é propriedade do Pilar Vivo ou de seus licenciadores. A cópia sem autorização é proibida.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Privacidade</h3>
  <p>Sua privacidade é importante. Consulte nossa Política de Privacidade.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Responsabilidade</h3>
  <p>O serviço é fornecido "como está". Não garantimos disponibilidade ininterrupta.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contato</h3>
  <p><strong>Câmara Municipal Pilar de la Horadada</strong><br/>
  Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Espanha<br/>
  Email: ayto@pilardelahoradada.org</p>
</div>
`
};

export const MOCK_NEWS: NewsItem[] = [
  { id: 'n1', source: 'Ayuntamiento', sourceType: 'official', icon: 'megaphone', date: 'Hace 1h', title: '🎉 Gran Charanga este Sábado', content: 'Desfile de carrozas artesanas por las calles del centro.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80', url: '#', category: 'GENERAL' },
  { id: 'n2', source: 'Funeraria PH', sourceType: 'official', icon: 'flower', date: 'Hoy', title: 'D. Antonio García Martínez', content: 'Funeral mañana 11:00h en la Parroquia.', category: 'DIFUNTOS', url: '#' },
  { id: 'n3', source: 'Empleo PH', sourceType: 'official', icon: 'briefcase', date: 'Ayer', title: 'Oferta: Camareros Mil Palmeras', content: 'Se busca personal para temporada de verano.', category: 'TRABAJO', url: '#' },
  { id: 'n4', source: 'Policía Local', sourceType: 'official', icon: 'shield', date: 'Hoy', title: 'Corte Calle Mayor', content: 'Obras de mejora hasta el viernes.', category: 'GENERAL', url: '#' }
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
  { id: 'p1', user: 'Antonio G.', avatar: 'AG', category: 'Recomendaciones', title: '¿Mejor sitio para arroz en La Torre?', content: 'Estamos de visita y buscamos algo auténtico frente al mar. ¡Gracias!', likes: 12, replies: 5, time: 'Hace 2h', badge: 'Vecino Activo', status: 'APPROVED' },
  { id: 'p2', user: 'Marta PH', avatar: 'M', category: 'General', title: 'Aviso: Corte de agua en Calle Mayor', content: 'He visto operarios trabajando cerca de la plaza, por si a alguien le sirve.', likes: 8, replies: 2, time: 'Hace 4h', status: 'APPROVED' },
  { id: 'p3', user: 'Carlos L.', avatar: 'CL', category: 'Mascotas', title: 'Perro encontrado en Higuericas', content: 'Es un podenco joven con collar rojo pero sin chapa. Lo tengo yo ahora mismo.', likes: 45, replies: 12, time: 'Hace 10h', badge: 'Protector', status: 'APPROVED' },
  { id: 'p4', user: 'User92', avatar: 'U', category: 'Mercadillo', title: 'Vendo tabla de surf casi nueva', content: 'Ideal para principiantes. Entrega en mano en Mil Palmeras.', likes: 3, replies: 0, time: 'Ayer', status: 'PENDING' },
];

export const MOCK_EVENTS: Event[] = [
  { id: 'fiestas-patronales', title: 'Fiestas del Pilar', category: 'TRADICIÓN', date: 'Octubre 2026', location: 'Centro', description: 'Carrozas y ofrendas.', longDescription: 'El Desfile de Carrozas es único.', imageUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1200&q=80', isFestival: true, lat: 37.8653, lng: -0.7932 },
  { id: 'semana-santa', title: 'Semana Santa', category: 'RELIGIOSO', date: 'Abril 2026', location: 'Centro', description: 'Procesiones solemnes.', longDescription: 'Tallas de Sánchez Lozano.', imageUrl: 'https://images.unsplash.com/photo-1545653701-d853757659bc?auto=format&fit=crop&w=1200&q=80', isFestival: true, lat: 37.8655, lng: -0.7928 }
];

export const MOCK_BEACHES = [
  {
    id: 'vistamar',
    name: 'Playa Vistamar',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    blueFlag: true,
    status: 'Abierta',
    rating: 4.8,
    services: ['Pasarelas', 'Lavapiés', 'Accesible'],
    lat: 37.8920, lng: -0.7580,
    length: '335m',
    sandType: 'Arena Dorada',
    occupancy: 'Media',
    waterTemp: '24°C',
    uvIndex: 7,
    seaState: 'Calma'
  },
  {
    id: 'milpalmeras',
    name: 'Playa Mil Palmeras',
    image: 'https://images.unsplash.com/photo-1590523278135-1e4233f2480c?auto=format&fit=crop&w=1200&q=80',
    blueFlag: true,
    status: 'Abierta',
    rating: 4.9,
    services: ['Chiringuitos', 'Juegos', 'Vóley', 'Parking', 'Accesible'],
    lat: 37.8890, lng: -0.7590,
    length: '346m',
    sandType: 'Arena Blanca',
    occupancy: 'Alta',
    waterTemp: '24°C',
    uvIndex: 8,
    seaState: 'Calma'
  },
  {
    id: 'delrio',
    name: 'Playa del Río',
    image: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&w=1200&q=80',
    blueFlag: true,
    status: 'Abierta',
    rating: 4.7,
    services: ['Vegetación', 'Senderos', 'Tranquilidad'],
    lat: 37.8840, lng: -0.7620,
    length: '400m',
    sandType: 'Arena/Roca',
    occupancy: 'Media',
    waterTemp: '23°C',
    uvIndex: 7,
    seaState: 'Oleaje Moderado'
  },
  {
    id: 'rocamar',
    name: 'Calas de Rocamar',
    image: 'https://images.unsplash.com/photo-1621293954908-351529e0215c?auto=format&fit=crop&w=1200&q=80',
    blueFlag: false,
    status: 'Abierta',
    rating: 4.8,
    services: ['Intimidad', 'Snorkel', 'Naturaleza'],
    lat: 37.8760, lng: -0.7680,
    length: '100m',
    sandType: 'Roca/Arena',
    occupancy: 'Baja',
    waterTemp: '22°C',
    uvIndex: 7,
    seaState: 'Calma'
  },
  {
    id: 'jesuitas',
    name: 'Playa Los Jesuitas',
    image: 'https://images.unsplash.com/photo-1544949116-7e8894129f6d?auto=format&fit=crop&w=1200&q=80',
    blueFlag: true,
    status: 'Abierta',
    rating: 4.8,
    services: ['Vóley Playa', 'Redes', 'Duchas', 'Acantilados'],
    lat: 37.8680, lng: -0.7790,
    length: '465m',
    sandType: 'Arena Dorada',
    occupancy: 'Media',
    waterTemp: '24°C',
    uvIndex: 8,
    seaState: 'Bandera Verde'
  },
  {
    id: 'elconde',
    name: 'Playa El Conde',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    blueFlag: true,
    status: 'Abierta',
    rating: 4.9,
    services: ['Torre Vigía', 'Cine de Verano', 'Accesible'],
    lat: 37.8650, lng: -0.7830,
    length: '210m',
    sandType: 'Arena Fina',
    occupancy: 'Alta',
    waterTemp: '24°C',
    uvIndex: 7,
    seaState: 'Calma'
  },
  {
    id: 'elpuerto',
    name: 'Playa El Puerto',
    image: 'https://images.unsplash.com/photo-1562592534-754d209d843e?auto=format&fit=crop&w=1200&q=80',
    blueFlag: true,
    status: 'Abierta',
    rating: 4.7,
    services: ['Club Náutico', 'Juegos', 'Paseo'],
    lat: 37.8630, lng: -0.7820,
    length: '300m',
    sandType: 'Arena Dorada',
    occupancy: 'Media',
    waterTemp: '24°C',
    uvIndex: 7,
    seaState: 'Calma'
  },
  {
    id: 'lasvillas',
    name: 'Playa Las Villas',
    image: 'https://images.unsplash.com/photo-1533758485262-b9be9db712c9?auto=format&fit=crop&w=1200&q=80',
    blueFlag: true,
    status: 'Abierta',
    rating: 4.6,
    services: ['Tranquilidad', 'Familia', 'Arenas Blancas'],
    lat: 37.8610, lng: -0.7800,
    length: '435m',
    sandType: 'Arena Fina',
    occupancy: 'Media',
    waterTemp: '24°C',
    uvIndex: 7,
    seaState: 'Calma'
  },
  {
    id: 'higuericas',
    name: 'Playa Las Higuericas',
    image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1200&q=80',
    blueFlag: true,
    status: 'Abierta',
    rating: 4.9,
    services: ['Dunas', 'Chiringuitos', 'Parking', 'Pasarelas'],
    lat: 37.8590, lng: -0.7720,
    length: '976m',
    sandType: 'Arena Blanca',
    occupancy: 'Alta',
    waterTemp: '23°C',
    uvIndex: 8,
    seaState: 'Bandera Verde'
  },
  {
    id: 'elmojon',
    name: 'Playa El Mojón',
    image: 'https://images.unsplash.com/photo-1519812674934-2e90f23d40cc?auto=format&fit=crop&w=1200&q=80',
    blueFlag: true,
    status: 'Abierta',
    rating: 4.5,
    services: ['Paseo Marítimo', 'Pesca', 'Límite Regional'],
    lat: 37.8520, lng: -0.7700,
    length: '270m',
    sandType: 'Arena Dorada',
    occupancy: 'Media',
    waterTemp: '23°C',
    uvIndex: 7,
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
    century: 'XX', 
    lat: 37.8658, lng: -0.7930,
    style: 'Neoclásico',
    material: 'Ladrillo y Mampostería',
    visitTime: '30 min',
    crowdLevel: 'Baja',
    status: 'Bueno',
    amenities: ['Misas Diarias', 'Rampa Acceso', 'Zona Peatonal']
  },
  { 
    id: 'museo-etnologico', 
    name: 'Museo Arqueológico', 
    image: 'https://images.unsplash.com/photo-1518998053574-53ee81be84ac?auto=format&fit=crop&w=1200&q=80', 
    category: 'Museo', 
    century: 'XXI', 
    lat: 37.8665, lng: -0.7940,
    style: 'Moderno',
    material: 'Hormigón y Cristal',
    visitTime: '1h 30min',
    crowdLevel: 'Baja',
    status: 'Excelente',
    amenities: ['Guía Gratuita', 'Baños', 'Climatización', 'Tienda', 'Accesible']
  },
  { 
    id: 'canteras-romanas', 
    name: 'Canteras Romanas', 
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80', 
    category: 'Arqueológico', 
    century: 'I-II d.C.', 
    lat: 37.8880, lng: -0.7585,
    style: 'Romano',
    material: 'Piedra Arenisca',
    visitTime: '20 min',
    crowdLevel: 'Baja',
    status: 'Natural',
    amenities: ['Panel Informativo', 'Al Aire Libre', 'Vistas al Mar']
  }
];

export const COMMERCIAL_CENSUS: CensusCategory[] = [
  {
    id: 'fashion',
    title: 'Moda y Complementos',
    items: [
        {
            id: 'modas-lucia',
            name: 'Modas Lucía',
            address: 'C/ Mayor, 12',
            phone: '965 35 20 00',
            category: 'Moda',
            description: 'Tienda de moda mujer con las últimas tendencias y marcas exclusivas. Asesoramiento personalizado.',
            rating: 4.8,
            reviewCount: 42,
            isOpen: true,
            zone: 'CENTRO',
            images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'],
            hours: { weekdays: '10:00 - 14:00 / 17:00 - 20:30', weekend: '10:00 - 14:00' },
            promotion: {
                isActive: true,
                range: 'NEAR',
                maxDistanceMeters: 15,
                frequencyRules: { maxPerHour: 1, maxPerDay: 2, maxPerWeek: 5 },
                multilingualContent: {
                    es: { title: '20% Descuento', description: 'En nueva colección presentando este cupón.' },
                    en: { title: '20% OFF', description: 'On new collection with this coupon.' }
                },
                discountCode: 'LUCIA20'
            }
        },
        {
            id: 'zapateria-pilar',
            name: 'Zapatería El Pilar',
            address: 'Av. Constitución, 5',
            phone: '965 35 21 11',
            category: 'Moda',
            description: 'Calzado cómodo y de calidad para toda la familia. Especialistas en piel.',
            rating: 4.5,
            reviewCount: 28,
            isOpen: true,
            zone: 'CENTRO',
            images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80'],
            hours: { weekdays: '09:30 - 13:30 / 17:00 - 20:30', weekend: '09:30 - 13:30' }
        }
    ]
  },
  {
    id: 'services',
    title: 'Servicios',
    items: [
        {
            id: 'ferreteria-pilar',
            name: 'Ferretería El Pilar',
            address: 'C/ Ramón y Cajal, 45',
            phone: '965 35 22 33',
            category: 'Hogar',
            description: 'Todo para el bricolaje, hogar y jardín. Copia de llaves y mandos.',
            rating: 4.7,
            reviewCount: 156,
            isOpen: true,
            zone: 'CENTRO',
            images: ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80'],
            hours: { weekdays: '08:00 - 14:00 / 16:00 - 20:00', weekend: '09:00 - 13:30' }
        },
        {
            id: 'clinica-vet',
            name: 'Clínica Vet. San Francisco',
            address: 'C/ San Francisco, 10',
            phone: '965 35 24 00',
            category: 'Mascotas',
            description: 'Urgencias 24h, cirugía, radiología y peluquería canina.',
            rating: 4.9,
            reviewCount: 210,
            isOpen: true,
            zone: 'CENTRO',
            images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80'],
            hours: { weekdays: '10:00 - 20:00', weekend: 'Urgencias' }
        }
    ]
  }
];

export const DINING_CENSUS: CensusCategory[] = [
  {
    id: 'restaurants',
    title: 'Restaurantes',
    items: [
        {
            id: 'meson-el-puerto',
            name: 'Mesón El Puerto',
            address: 'Explanada del Puerto, s/n',
            phone: '965 32 12 34',
            category: 'Restaurante',
            description: 'Especialidad en caldero y pescados frescos de la bahía. Vistas al mar.',
            rating: 4.6,
            reviewCount: 340,
            isOpen: true,
            zone: 'LA_TORRE',
            priceRange: '€€€',
            images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80'],
            hours: { weekdays: '13:00 - 16:30 / 20:00 - 23:30', weekend: '13:00 - 23:30' },
            featuredItems: ['Arroz a banda', 'Caldero', 'Lubina a la sal']
        },
        {
            id: 'pizzeria-plaza',
            name: 'Pizzería La Plaza',
            address: 'Plaza de la Iglesia, 4',
            phone: '965 35 11 22',
            category: 'Italiano',
            description: 'Pizzas artesanas en horno de leña y pasta fresca.',
            rating: 4.5,
            reviewCount: 180,
            isOpen: true,
            zone: 'CENTRO',
            priceRange: '€€',
            images: ['https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=1200&q=80'],
            hours: { weekdays: '19:00 - 23:30', weekend: '13:00 - 16:00 / 19:00 - 00:00' }
        }
    ]
  },
  {
    id: 'bars',
    title: 'Bares y Cafeterías',
    items: [
        {
            id: 'chiringuito-pirata',
            name: 'Chiringuito Pirata',
            address: 'Playa Mil Palmeras',
            phone: '600 12 34 56',
            category: 'Chiringuito',
            description: 'Cócteles, música en vivo y el mejor ambiente a pie de playa.',
            rating: 4.7,
            reviewCount: 520,
            isOpen: true,
            zone: 'MIL_PALMERAS',
            priceRange: '€€',
            images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
            hours: { weekdays: '10:00 - 02:00', weekend: '10:00 - 03:00' }
        }
    ]
  }
];

export const ACTIVITIES_LIST = [
  {
    id: 'rio-seco',
    title: 'Ruta Río Seco',
    category: 'hiking',
    difficulty: 'Fácil',
    duration: '2h',
    location: 'Pinar de Campoverde',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'loromero',
    title: 'Lo Romero Golf',
    category: 'sport',
    difficulty: 'Medio',
    duration: '4h',
    location: 'Ctra. Orihuela',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sailing',
    title: 'Vela y Kayak',
    category: 'water',
    difficulty: 'Medio',
    duration: '3h',
    location: 'Club Náutico',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cycling',
    title: 'Ruta Cicloturista',
    category: 'sport',
    difficulty: 'Fácil',
    duration: '1.5h',
    location: 'Torre de la Horadada',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80'
  }
];
