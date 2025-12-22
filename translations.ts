
export interface Language {
  code: string;
  label: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', label: 'मরাঠি', flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' },
  { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', label: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
  { code: 'he', label: 'עברית', flag: '🇮🇱' },
  { code: 'bg', label: 'Български', flag: '🇧🇬' },
  { code: 'no', label: 'Norsk', flag: '🇳🇴' },
  { code: 'da', label: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮' },
  { code: 'sk', label: 'Slovenčina', flag: '🇸🇰' },
  { code: 'hr', label: 'Hrvatski', flag: '🇭🇷' },
  { code: 'lt', label: 'Lietuvių', flag: '🇱🇹' },
  { code: 'sl', label: 'Slovenščina', flag: '🇸🇮' },
  { code: 'lv', label: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', label: 'Eesti', flag: '🇪🇪' },
  { code: 'sr', label: 'Српски', flag: '🇷🇸' },
  { code: 'sq', label: 'Shqip', flag: '🇦🇱' },
  { code: 'mk', label: 'Македонски', flag: '🇲🇰' },
  { code: 'ka', label: 'ქართული', flag: '🇬🇪' },
  { code: 'hy', label: 'Հայերեն', flag: '🇦🇲' },
  { code: 'az', label: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'kk', label: 'Қазақ тілі', flag: '🇰🇿' },
  { code: 'uz', label: 'Oʻzbekcha', flag: '🇺🇿' },
  { code: 'am', label: 'አማርኛ', flag: '🇪🇹' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
  { code: 'af', label: 'Afrikaans', flag: '🇿🇦' },
  { code: 'zu', label: 'isiZulu', flag: '🇿🇦' },
  { code: 'yo', label: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ig', label: 'Igbo', flag: '🇳🇬' },
  { code: 'ha', label: 'Hausa', flag: '🇳🇬' },
  { code: 'mt', label: 'Malti', flag: '🇲🇹' },
  { code: 'is', label: 'Íslenska', flag: '🇮🇸' },
  { code: 'ga', label: 'Gaeilge', flag: '🇮🇪' },
  { code: 'km', label: 'ខ្មែរ', flag: '🇰🇭' },
  { code: 'lo', label: 'ລາວ', flag: '🇱🇦' },
  { code: 'my', label: 'မြန်မာစာ', flag: '🇲🇲' },
  { code: 'ps', label: 'پښتو', flag: '🇦🇫' },
  { code: 'tg', label: 'Тоҷикӣ', flag: '🇹🇯' },
  { code: 'ky', label: 'Кыргызча', flag: '🇰🇬' },
  { code: 'tk', label: 'Türkmençe', flag: '🇹🇲' }
];

const UI_RESOURCES: Record<string, any> = {
  es: { 
    m: ['Inicio', 'Noticias', 'Playas', 'Patrimonio', 'Experiencias', 'Gastronomía', 'Tiendas', 'Salud', 'Servicios', 'Eventos', 'Foro', 'PH Explorar', 'Guía IA', 'Perfil', 'Mapa', 'Admin'], 
    c: ['Patrocinado', 'Sin resultados', 'Volver', 'Compartir', 'Detalles', 'Abierto', 'Cerrado', 'Mapa', 'Cerca', 'Buscar...', 'Añadir', 'Subir', 'Copiar', 'Copiado'], 
    h: 'Paraíso mediterráneo.', 
    s: ['Sede Electrónica', 'Ayuntamiento 24h', 'Cita Previa', 'Incidencias', 'Reportar', 'Trámites', 'Certificados', 'Impuestos', 'Licencias'],
    hp: ['Pilar Vivo', 'Actualidad Local', 'Noticias del Pilar', 'Comunidad Participativa', 'Tu voz importa en el municipio.', 'Pilar en 15s', 'Vistas', 'Galería', 'Momentos', 'Amanecer en Las Higuericas', 'Ruta por Río Seco', 'Tarde de Compras', 'Fiestas del Pilar'],
    f: ['Contacto', 'Enlaces de interés', 'Síguenos', 'La App oficial del municipio.', 'Oficina de Turismo', 'Calle Mayor, 1', '03190', 'Alicante, España', 'Todos los derechos reservados'],
    search: { badge: 'Buscador Inteligente', title1: 'PILAR DE LA', title2: 'HORADADA', subtitle1: 'Encuentra comercios, eventos', subtitle2: 'y servicios municipales.', placeholder: '¿Qué buscas hoy?' },
    ai: { welcome: 'Hola, soy tu conserje virtual de Pilar de la Horadada. ¿En qué puedo ayudarte?', system: 'Eres PH Concierge, la guía oficial de Pilar de la Horadada.', suggestions: ['¿Dónde comer?', 'Playas hoy', 'Eventos'] },
    ed: { 
      'fiestas-patronales': { title: 'Fiestas del Pilar', category: 'TRADICIÓN', date: 'Octubre 2025', location: 'Centro Urbano', desc: 'Carrozas y ofrendas tradicionales.', badge: 'Interés Turístico' },
      'semana-santa': { title: 'Semana Santa', category: 'RELIGIOSO', date: 'Abril 2025', location: 'Calles del Centro', desc: 'Procesiones solemnes con tallas de Sánchez Lozano.' }
    }
  },
  en: { 
    m: ['Home', 'News', 'Beaches', 'Heritage', 'Experiences', 'Dining', 'Shops', 'Health', 'Services', 'Events', 'Forum', 'PH Explore', 'AI Guide', 'Profile', 'Map', 'Admin'], 
    c: ['Sponsored', 'No results', 'Back', 'Share', 'Details', 'Open', 'Closed', 'Full Map', 'Near you', 'Search...', 'Add', 'Upload', 'Copy', 'Copied'], 
    h: 'Mediterranean paradise.', 
    s: ['Digital Portal', 'Town Hall 24h', 'Appointment', 'Incidents', 'Report', 'Procedures', 'Certificates', 'Taxes', 'Licenses'],
    hp: ['Living Pilar', 'Local News', 'Latest from Pilar', 'Active Community', 'Your voice matters in town.', 'Pilar in 15s', 'Views', 'Gallery', 'Momentos', 'Sunrise at Higuericas', 'Rio Seco Route', 'Shopping Day', 'Town Festivals'],
    f: ['Contact', 'Useful Links', 'Follow Us', 'The official town application.', 'Tourism Office', '1 Mayor St.', '03190', 'Alicante, Spain', 'All rights reserved'],
    search: { badge: 'Smart Search', title1: 'PILAR DE LA', title2: 'HORADADA', subtitle1: 'Find shops, events', subtitle2: 'and citizen services.', placeholder: 'What are you looking for?' },
    ai: { welcome: 'Hello, I am your Pilar de la Horadada virtual concierge. How can I help you today?', system: 'You are PH Concierge, the official guide for Pilar de la Horadada.', suggestions: ['Where to eat?', 'Beaches today', 'Events'] },
    ed: { 
      'fiestas-patronales': { title: 'Pilar Festivals', category: 'TRADITION', date: 'October 2025', location: 'Town Centre', desc: 'Traditional floats and offerings.', badge: 'Tourist Interest' },
      'semana-santa': { title: 'Holy Week', category: 'RELIGIOUS', date: 'April 2025', location: 'Downtown Streets', desc: 'Solemn processions with Sánchez Lozano sculptures.' }
    }
  },
  it: { 
    m: ['Home', 'Notizie', 'Spiagge', 'Patrimonio', 'Esperienze', 'Gastronomia', 'Negozi', 'Salute', 'Servizi', 'Eventi', 'Forum', 'PH Esplora', 'Guida AI', 'Profilo', 'Mappa', 'Admin'], 
    c: ['Sponsorizzato', 'Nessun risultato', 'Indietro', 'Condividi', 'Dettagli', 'Aperto', 'Chiuso', 'Mappa', 'Vicino', 'Cerca...', 'Aggiungi', 'Carica', 'Copia', 'Copiato'], 
    h: 'Paradiso mediterraneo.', 
    s: ['Sede Elettronica', 'Comune 24h', 'Appuntamento', 'Incidenti', 'Segnala', 'Procedure', 'Certificati', 'Tasse', 'Licenze'],
    hp: ['Pilar Vivo', 'Attualità Locale', 'Notizie di Pilar', 'Comunità', 'La tua voce conta.', 'Pilar in 15s', 'Viste', 'Galleria', 'Momenti', 'Alba a Las Higuericas', 'Percorso Río Seco', 'Pomeriggio di Shopping', 'Feste del Pilar'],
    f: ['Contatto', 'Link utili', 'Seguici', 'L\'app ufficiale.', 'Ufficio del Turismo', 'Calle Mayor, 1', '03190', 'Alicante, Spagna', 'Tutti i diritti riservati'],
    search: { badge: 'Ricerca Intelligente', title1: 'PILAR DE LA', title2: 'HORADADA', subtitle1: 'Trova negozi, eventi', subtitle2: 'e servizi comunali.', placeholder: 'Cosa cerchi oggi?' },
    ai: { welcome: 'Ciao, sono il tuo concierge virtuale di Pilar de la Horadada. Come posso aiutarti?', system: 'Sei PH Concierge, la guida ufficiale di Pilar de la Horadada.', suggestions: ['Dove mangiare?', 'Spiagge oggi', 'Eventi'] }
  },
  pt: { 
    m: ['Início', 'Notícias', 'Praias', 'Património', 'Experiências', 'Gastronomia', 'Lojas', 'Saúde', 'Serviços', 'Eventos', 'Fórum', 'PH Explorar', 'Guia IA', 'Perfil', 'Mapa', 'Admin'], 
    c: ['Patrocinado', 'Sem resultados', 'Voltar', 'Partilhar', 'Detalhes', 'Aberto', 'Fechado', 'Mapa', 'Perto', 'Procurar...', 'Adicionar', 'Carregar', 'Copiar', 'Copiado'], 
    h: 'Paraíso mediterrâneo.', 
    s: ['Sede Eletrónica', 'Câmara Municipal 24h', 'Marcação', 'Incidentes', 'Reportar', 'Trâmites', 'Certificados', 'Impostos', 'Licenças'],
    hp: ['Pilar Vivo', 'Atualidade Local', 'Notícias do Pilar', 'Comunidade', 'A sua voz importa.', 'Pilar em 15s', 'Vistas', 'Galeria', 'Momentos', 'Amanhecer em Las Higuericas', 'Rota por Río Seco', 'Tarde de Compras', 'Festas do Pilar'],
    f: ['Contacto', 'Links de interesse', 'Siga-nos', 'A App oficial.', 'Posto de Turismo', 'Calle Mayor, 1', '03190', 'Alicante, Espanha', 'Todos os direitos reservados'],
    search: { badge: 'Busca Inteligente', title1: 'PILAR DE LA', title2: 'HORADADA', subtitle1: 'Encontre lojas, eventos', subtitle2: 'e serviços municipais.', placeholder: 'O que procura hoje?' },
    ai: { welcome: 'Olá, sou o seu concierge virtual de Pilar de la Horadada. Como posso ajudar?', system: 'É o PH Concierge, o guia oficial de Pilar de la Horadada.', suggestions: ['Onde comer?', 'Praias hoje', 'Eventos'] }
  },
  ru: { 
    m: ['Главная', 'Новости', 'Пляжи', 'Наследие', 'Впечатления', 'Гастрономия', 'Магазины', 'Здоровье', 'Услуги', 'События', 'Форум', 'PH Исследовать', 'ИИ-Гид', 'Профиль', 'Карта', 'Админ'], 
    c: ['Спонсируемо', 'Нет результатов', 'Назад', 'Поделиться', 'Детали', 'Открыто', 'Закрыто', 'Карта', 'Рядом', 'Поиск...', 'Добавить', 'Загрузить', 'Копировать', 'Скопировано'], 
    h: 'Средиземноморский рай.', 
    s: ['Электронный портал', 'Мэрия 24ч', 'Запись', 'Инциденты', 'Сообщить', 'Процедуры', 'Сертификаты', 'Налоги', 'Лицензии'],
    hp: ['Живой Пилар', 'Местные новости', 'Последнее из Пилара', 'Сообщество', 'Ваш голос важен.', 'Пилар за 15с', 'Просмотры', 'Галерея', 'Моменты', 'Рассвет в Лас-Игерикас', 'Маршрут Рио-Секо', 'День шопинга', 'Праздники Пилара'],
    f: ['Контакты', 'Полезные ссылки', 'Подпишитесь', 'Официальное приложение.', 'Офис по туризму', 'Calle Mayor, 1', '03190', 'Alicante, Испания', 'Все права защищены'],
    search: { badge: 'Умный поиск', title1: 'ПИЛАР-ДЕ-ЛА', title2: 'ОРАДАДА', subtitle1: 'Найдите магазины, события', subtitle2: 'и городские службы.', placeholder: 'Что вы ищете?' },
    ai: { welcome: 'Здравствуйте, я ваш виртуальный консьерж Пилар-де-ла-Орадада. Чем я могу вам помочь?', system: 'Вы PH Concierge, официальный гид по Пилар-де-ла-Орадада.', suggestions: ['Где поесть?', 'Пляжи сегодня', 'События'] }
  },
  ja: { 
    m: ['ホーム', 'ニュース', 'ビーチ', '遺産', '体験', '食事', 'ショップ', '健康', 'サービス', 'イベント', 'フォーラム', 'PH 探索', 'AI ガイド', 'プロフィール', 'マップ', '管理'], 
    c: ['スポンサー', '結果なし', '戻る', '共有', '詳細', '営業中', '準備中', 'マップ', '近く', '検索...', '追加', 'アップロード', 'コピー', 'コピー済み'], 
    h: '地中海の楽園。', 
    s: ['デジタルポータル', '市役所24h', '予約', 'インシデント', '報告', '手続き', '証明書', '税金', 'ライセンス'],
    hp: ['ピラール・ビボ', 'ローカルニュース', 'ピラール最新情報', 'コミュニティ', 'あなたの声が大切です。', '15秒でピラール', '閲覧数', 'ギャラリー', '瞬間', 'イゲリカスの日の出', 'リオセコルート', 'ショッピングデイ', '町の祭り'],
    f: ['連絡先', 'リンク', 'フォローする', '公式アプリ。', '観光案内所', 'Calle Mayor, 1', '03190', 'Alicante, Spain', 'All rights reserved'],
    search: { badge: 'スマート検索', title1: 'ピラール・デ・ラ', title2: 'オラダダ', subtitle1: 'ショップ、イベント', subtitle2: '公共サービスを探す。', placeholder: '何をお探しですか？' },
    ai: { welcome: 'こんにちは。ピラール・デ・ラ・オラダダのバーチャルコンシェルジュです。どのようにお手伝いしましょうか？', system: 'あなたはピラール・デ・ラ・オラダダの公式ガイド、PHコンシェルジュです。', suggestions: ['どこで食べる？', '今日のビーチ', 'イベント'] },
    ed: { 
      'fiestas-patronales': { title: 'ピラール祭', category: '伝統', date: '2025年10月', location: '中心街', desc: '伝統的な山車と供物。', badge: '観光名所' },
      'semana-santa': { title: 'セマナ・サンタ', category: '宗教', date: '2025年4月', location: '中心街', desc: 'サンチェス・ロサノの彫刻による厳かな行列。' }
    }
  },
  ko: { 
    m: ['홈', '뉴스', '해변', '유산', '체험', '다이닝', '상점', '건강', '서비스', '이벤트', '포럼', 'PH 탐색', 'AI 가이드', '프로필', '지도', '관리'], 
    c: ['후원', '결과 없음', '뒤로', '공유', '상세 정보', '영업 중', '닫힘', '지도', '근처', '검색...', '추가', '업로드', '복사', '복사됨'], 
    h: '지중해의 낙원.', 
    s: ['디지털 포털', '시청 24h', '예약', '사건 보고', '신고', '절차', '인증서', '세금', '라이선스'],
    hp: ['살아있는 필라르', '지역 뉴스', '최신 소식', '커뮤니티', '여러분의 목소리가 중요합니다.', '15초 필라르', '조회수', '갤러리', '순간', '히게리카스 일출', '리오 세코 루트', '쇼핑 데이', '마을 축제'],
    f: ['연락처', '유용한 링크', '팔로우하기', '공식 애플리케이션.', '관광 안내소', 'Calle Mayor, 1', '03190', 'Alicante, Spain', 'All rights reserved'],
    search: { badge: '스마트 검색', title1: '필라르 데 라', title2: '오라다다', subtitle1: '상점, 이벤트', subtitle2: '및 공공 서비스 찾기.', placeholder: '무엇을 찾고 계신가요?' },
    ai: { welcome: '안녕하세요, 필라르 데 라 오라다다의 가상 컨시어지입니다. 무엇을 도와드릴까요?', system: '당신은 필라르 데 라 오라다다의 공식 가이드인 PH 컨시어지입니다.', suggestions: ['맛집 추천', '오늘의 해변', '이벤트 소식'] },
    ed: { 
      'fiestas-patronales': { title: '필라르 축제', category: '전통', date: '2025년 10월', location: '시내 중심가', desc: '전통적인 수레와 헌물.', badge: '관광 명소' },
      'semana-santa': { title: '성주간', category: '종교', date: '2025년 4월', location: '시내 거리', desc: '산체스 로사노의 조각품과 함께하는 엄숙한 행렬.' }
    }
  },
  fr: { 
    m: ['Accueil', 'Actualités', 'Plages', 'Patrimoine', 'Expériences', 'Restauration', 'Boutiques', 'Santé', 'Services', 'Événements', 'Forum', 'PH Explorer', 'Guide IA', 'Profil', 'Carte', 'Admin'], 
    c: ['Sponsorisé', 'Aucun résultat', 'Retour', 'Partager', 'Détails', 'Ouvert', 'Fermé', 'Carte', 'Proche', 'Chercher...', 'Ajouter', 'Charger', 'Copier', 'Copié'], 
    h: 'Paradis méditerranéen.', 
    s: ['Portail Numérique', 'Mairie 24h', 'Rendez-vous', 'Incidents', 'Signaler', 'Procédures', 'Certificats', 'Impôts', 'Licences'],
    hp: ['Pilar Vivant', 'Infos Locales', 'Dernières nouvelles', 'Communauté', 'Votre voix compte.', 'Pilar en 15s', 'Vues', 'Galerie', 'Moments', 'Aube à Las Higuericas', 'Route Río Seco', 'Shopping', 'Fêtes du Pilar'],
    f: ['Contact', 'Liens utiles', 'Suivez-nous', 'Application officielle.', 'Office de Tourisme', 'Calle Mayor, 1', '03190', 'Alicante, Espagne', 'Tous droits réservés'],
    search: { badge: 'Recherche Intelligente', title1: 'PILAR DE LA', title2: 'HORADADA', subtitle1: 'Trouvez boutiques, événements', subtitle2: 'et services municipaux.', placeholder: 'Que cherchez-vous ?' },
    ai: { welcome: 'Bonjour, je suis votre concierge virtuel de Pilar de la Horadada. Comment puis-je vous aider ?', system: 'Vous êtes PH Concierge, le guide officiel de Pilar de la Horadada.', suggestions: ['Où manger ?', 'Plages aujourd\'hui', 'Événements'] }
  },
  de: {
    m: ['Startseite', 'Nachrichten', 'Strände', 'Kulturerbe', 'Erlebnisse', 'Gastronomie', 'Geschäfte', 'Gesundheit', 'Dienstleistungen', 'Veranstaltungen', 'Forum', 'PH Entdecken', 'KI-Guide', 'Profil', 'Karte', 'Admin'],
    c: ['Gesponsert', 'Keine Ergebnisse', 'Zurück', 'Teilen', 'Details', 'Offen', 'Geschlossen', 'Karte', 'In der Nähe', 'Suchen...', 'Hinzufügen', 'Hochladen', 'Kopieren', 'Kopiert'],
    h: 'Mediterranes Paradies.',
    s: ['Digitales Portal', 'Rathaus 24h', 'Terminvereinbarung', 'Vorfälle', 'Meldung', 'Verfahren', 'Zertifikate', 'Steuern', 'Lizenzen'],
    hp: ['Lebendiges Pilar', 'Lokale Nachrichten', 'Aktuelles aus Pilar', 'Aktive Gemeinschaft', 'Ihre Stimme zählt.', 'Pilar in 15s', 'Ansichten', 'Galerie', 'Moments', 'Sonnenaufgang in Las Higuericas', 'Río Seco Route', 'Shopping-Tag', 'Stadtfeste'],
    f: ['Kontakt', 'Nützliche Links', 'Folgen Sie uns', 'Die offizielle App der Gemeinde.', 'Tourismusbüro', 'Calle Mayor, 1', '03190', 'Alicante, Spanien', 'Alle Rechte vorbehalten'],
    search: { badge: 'Intelligente Suche', title1: 'PILAR DE LA', title2: 'HORADADA', subtitle1: 'Geschäfte, Veranstaltungen', subtitle2: 'und Dienstleistungen finden.', placeholder: 'Wonach suchen Sie?' },
    ai: { welcome: 'Hallo, ich bin Ihr virtueller Concierge von Pilar de la Horadada. Wie kann ich Ihnen helfen?', system: 'Sie sind PH Concierge, der offizielle Guide für Pilar de la Horadada.', suggestions: ['Wo essen?', 'Strände heute', 'Events'] }
  },
  zh: {
    m: ['首页', '新闻', '海滩', '遗产', '体验', '餐饮', '商店', '健康', '服务', '活动', '论坛', 'PH 探索', 'AI 指南', '个人资料', '地图', '管理员'],
    c: ['赞助', '无结果', '返回', '分享', '详情', '营业', '关闭', '地图', '附近', '搜索...', '添加', '上传', '复制', '已复制'],
    h: '地中海天堂。',
    s: ['数字门户', '市政厅 24h', '预约', '事件', '报告', '程序', '证书', '税收', '许可证'],
    hp: ['活力的皮拉尔', '当地新闻', '最新消息', '社区互动', '您的声音很重要。', '15秒看皮拉尔', '浏览量', '图库', '瞬间', '海滩日出', '河谷路线', '购物日', '镇节日'],
    f: ['联系', '有用链接', '关注我们', '官方应用程序。', '旅游局', 'Calle Mayor, 1', '03190', 'Alicante, 西班牙', '版权所有'],
    search: { badge: '智能搜索', title1: '皮拉尔·德·拉', title2: '奥拉达达', subtitle1: '查找商店、活动', subtitle2: '和市政服务。', placeholder: '您在寻找什么？' },
    ai: { welcome: '您好，我是皮拉尔·德·拉·奥拉达达的虚拟管家。我能为您提供什么帮助？', system: '您是 PH Concierge，皮拉尔·德·拉·奥拉达达的官方指南。', suggestions: ['哪里吃饭？', '今日海滩', '活动'] }
  }
};

const createLang = (code: string, langLabel: string): any => {
  const data = UI_RESOURCES[code] || UI_RESOURCES.en;
  const en = UI_RESOURCES.en;
  
  const m = data.m || en.m;
  const c = data.c || en.c;
  const s = data.s || en.s;
  const h = data.h || en.h;
  const hp = data.hp || en.hp;
  const f = data.f || en.f;
  const srch = data.search || en.search;
  const ai = data.ai || en.ai;
  const ed = data.ed || en.ed;

  return {
    menu: { home: m[0], news: m[1], beaches: m[2], sightseeing: m[3], activities: m[4], dining: m[5], shopping: m[6], health: m[7], services: m[8], events: m[9], forum: m[10], title: m[11], ai: m[12], profile: m[13], map: m[14], admin: m[15] },
    common: { sponsored: c[0], noResults: c[1], back: c[2], share: c[3], details: c[4], open: c[5], closed: c[6], fullMap: c[7], nearby: c[8], searchPlaceholder: c[9], addToCalendar: c[10], upload: c[11], copyLink: c[12], copied: c[13] },
    hero: { subtitle: h },
    ai_guide: { title: m[12], welcome: ai.welcome, online: 'Online', placeholder: ai.placeholder || '...', system: ai.system, suggestions: ai.suggestions },
    citizen_services: { title: s[0], subtitle: s[1], appointment: s[2], incidents: s[3], report: s[4], frequent: s[5], certificate: s[6], taxes: s[7], licenses: s[8] },
    sections: { shopping: { title: m[6], desc: m[6] }, dining: { title: m[5], desc: m[5] }, events: { title: m[9], desc: m[9] } },
    footer: { contact: f[0], links: f[1], follow: f[2], desc: f[3], rights: f[8], officeName: f[4], addressLine1: f[5], addressLine2: f[6], addressLine3: f[7] },
    home_page: { 
      pilar_vivo: hp[0], news_main: hp[1], news_featured: hp[2], community_title: hp[3], community_desc: hp[4],
      shorts_label: hp[5], shorts_big: 'Shorts', views: hp[6], gallery_label: hp[7], gallery_big: hp[8],
      ai_desc: ai.welcome, shorts_titles: [hp[9], hp[10], hp[11], hp[12]]
    },
    event_detail: { pilar_event: 'EVENTO PH', date_time: 'FECHA Y HORA', main_location: 'UBICACIÓN' },
    events_data: ed,
    beaches_page: { title: m[2], subtitle: h, coastal: 'Costa Blanca', blue_flag: 'Bandera Azul', open: 'Abierta', fact_title: 'Info', fact_desc: '4km de costa.', list: { milpalmeras: { name: 'Mil Palmeras', desc: h }, higuericas: { name: 'Las Higuericas', desc: h } } },
    sightseeing_page: { title: m[3], subtitle: h, list: { 'torre-vigia': { name: 'Torre de la Horadada', desc: h } } },
    activities_page: { title: m[4], subtitle: h, list: { 'rio-seco': { name: 'Río Seco', desc: h } } },
    business: { history: 'Story' },
    search: srch,
    share: { title: 'Share', subtitle: 'Select platform', copyLink: 'Copy', copied: 'Copied!', via: 'via', apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'Twitter', linkedin: 'LinkedIn', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube' } }
  };
};

export const translations: Record<string, any> = {};
languages.forEach(lang => {
  translations[lang.code] = createLang(lang.code, lang.label);
});
