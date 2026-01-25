
import { Event, CensusCategory, CensusItem, NewsItem } from './types';

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
  <p>Willkommen bei Pilar Vivo. Durch den Zugriff und die Nutzung unserer Webplattform erklären Sie sich mit den folgenden Bedingungen einverstanden.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Annahme</h3>
  <p>Durch die Registrierung oder Nutzung von Pilar Vivo stimmen Sie diesen Bedingungen zu.</p>
  <h3 class="text-lg font-bold text-gray-900">2. Dienstleistung</h3>
  <p>Pilar Vivo ist eine digitale Plattform für lokales Informationsmanagement.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Konto</h3>
  <p>Sie sind verantwortlich für die Vertraulichkeit Ihres Kontos und alle Aktivitäten darunter.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Zulässige Nutzung</h3>
  <p>Sie verpflichten sich, die Plattform legal zu nutzen und weder dem Dienst noch Dritten zu schaden.</p>
  <h3 class="text-lg font-bold text-gray-900">5. Geistiges Eigentum</h3>
  <p>Der Inhalt ist Eigentum von Pilar Vivo oder seinen Lizenzgebern. Kopieren ohne Genehmigung ist verboten.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Datenschutz</h3>
  <p>Ihre Privatsphäre ist wichtig. Bitte beachten Sie unsere Datenschutzerklärung.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Haftung</h3>
  <p>Der Dienst wird "wie besehen" bereitgestellt. Wir garantieren keine ununterbrochene Verfügbarkeit.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Kontakt</h3>
  <p><strong>Rathaus Pilar de la Horadada</strong><br/>
  Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Spanien<br/>
  E-Mail: ayto@pilardelahoradada.org</p>
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
  <p>In Pilar Vivo prendiamo molto sul serio la privacy dei nostri utenti. Questa Informativa sulla Privacy descrive come raccogliamo e proteggiamo i tuoi dati.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Titolare del Trattamento</h3>
  <p><strong>Pilar Vivo / Municipio di Pilar de la Horadada</strong><br/>
  Indirizzo: Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Spagna<br/>
  Email: ayto@pilardelahoradada.org</p>
  <h3 class="text-lg font-bold text-gray-900">2. Informazioni Raccolte</h3>
  <p>Raccogliamo dati di registrazione (nome, email), utilizzo della piattaforma, posizione approssimativa e dati tecnici.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Uso delle Informazioni</h3>
  <p>Utilizziamo i tuoi dati per fornire il servizio e gestire il tuo account.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Condivisione delle Informazioni</h3>
  <p>Non vendiamo i tuoi dati. Condividiamo informazioni con fornitori di servizi necessari (hosting, analisi).</p>
  <h3 class="text-lg font-bold text-gray-900">5. Cookie</h3>
  <p>Utilizziamo cookie essenziali, di prestazione e funzionali.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Sicurezza</h3>
  <p>Implementiamo misure di sicurezza tecniche per proteggere i tuoi dati.</p>
  <h3 class="text-lg font-bold text-gray-900">7. I Tuoi Diritti</h3>
  <p>Hai diritto di accesso, rettifica e cancellazione dei tuoi dati. Contattaci a ayto@pilardelahoradada.org.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contatto</h3>
  <p>Per domande: ayto@pilardelahoradada.org. AEPD: www.aepd.es</p>
</div>
`,
  pt: `
<div class="space-y-6">
  <p class="text-sm text-gray-500">Última atualização: 25 de janeiro de 2026</p>
  <p>No Pilar Vivo, levamos muito a sério a privacidade dos nossos usuários. Esta Política de Privacidade descreve como coletamos e protegemos seus dados.</p>
  <h3 class="text-lg font-bold text-gray-900">1. Responsável pelo Tratamento</h3>
  <p><strong>Pilar Vivo / Câmara Municipal Pilar de la Horadada</strong><br/>
  Endereço: Plaza Campoamor nº 2, 03190 Pilar de la Horadada (Alicante), Espanha<br/>
  Email: ayto@pilardelahoradada.org</p>
  <h3 class="text-lg font-bold text-gray-900">2. Informações Coletadas</h3>
  <p>Coletamos dados de registro (nome, email), uso da plataforma, localização aproximada e dados técnicos.</p>
  <h3 class="text-lg font-bold text-gray-900">3. Uso das Informações</h3>
  <p>Usamos seus dados para fornecer o serviço e gerenciar sua conta.</p>
  <h3 class="text-lg font-bold text-gray-900">4. Compartilhamento de Informações</h3>
  <p>Não vendemos seus dados. Compartilhamos informações com provedores de serviços necessários (hospedagem, análise).</p>
  <h3 class="text-lg font-bold text-gray-900">5. Cookies</h3>
  <p>Utilizamos cookies essenciais, de desempenho e funcionais.</p>
  <h3 class="text-lg font-bold text-gray-900">6. Segurança</h3>
  <p>Implementamos medidas de segurança técnicas para proteger seus dados.</p>
  <h3 class="text-lg font-bold text-gray-900">7. Seus Direitos</h3>
  <p>Você tem o direito de acessar, retificar e excluir seus dados. Contate-nos em ayto@pilardelahoradada.org.</p>
  <h3 class="text-lg font-bold text-gray-900">8. Contato</h3>
  <p>Para dúvidas: ayto@pilardelahoradada.org. AEPD: www.aepd.es</p>
</div>
`
};

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
