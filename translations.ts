
const en = {
    menu: {
      home: 'Home',
      news: 'News',
      beaches: 'Beaches',
      sightseeing: 'Sightseeing',
      activities: 'Things to Do',
      dining: 'Dining',
      shopping: 'Shopping',
      health: 'Health & Beauty',
      services: 'Services',
      events: 'Events',
      forum: 'Forum',
      title: 'Explore',
      ai: 'AI Local Guide',
      profile: 'Profile'
    },
    hero: {
      subtitle: 'Experience the Mediterranean lifestyle at its finest in the heart of Costa Blanca.',
      location: 'Alicante, Spain',
      sun: '300+ Days of Sun',
      beaches: 'Pristine Beaches',
      events: 'Live Events',
      commerce: 'Shopping'
    },
    ai_guide: {
      title: 'PH Concierge',
      subtitle: 'Your personal AI guide for our town.',
      placeholder: 'Tell me about the best beach bars...',
      welcome: 'Welcome! I am your PH Concierge. How can I help you enjoy Pilar today?',
      thinking: 'Thinking...',
      online: 'Online',
      system: 'You are PH Concierge, the expert assistant of Pilar de la Horadada. Respond in English.',
      suggestions: ["When are the festivals?", "Where to eat good rice?", "Best beach for kids?"]
    },
    footer: {
      contact: 'Get in Touch',
      links: 'Explore Pilar',
      follow: 'Join Community',
      desc: 'Pilar de la Horadada: Where history meets the Mediterranean future.',
      rights: '© 2025 Pilar de la Horadada Tourism. Excellence in the Costa Blanca.'
    },
    common: {
      sponsored: 'Featured',
      searchPlaceholder: 'What are you looking for?',
      noResults: 'No results found',
    },
    sections: {
      events: { title: 'Experiences', desc: 'Discover unique moments' },
      shopping: { title: 'Shopping', desc: 'Local commerce' },
      dining: { title: 'Dining', desc: 'Mediterranean flavors' },
    },
    auth: {
      loginTitle: 'Welcome',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In'
    },
    share: {
      title: 'Share',
      subtitle: 'Send to friends',
      copyLink: 'Copy',
      copied: 'Copied!',
      apps: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'X', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', linkedin: 'LinkedIn' }
    },
    business: { open: 'Open', closed: 'Closed', rating: 'Rating' }
};

const es = { ...en, menu: { ...en.menu, home: 'Inicio', news: 'Noticias', beaches: 'Playas', sightseeing: 'Cultura', activities: 'Qué Hacer', dining: 'Dónde Comer', shopping: 'Compras', health: 'Salud', services: 'Servicios', events: 'Experiencias', forum: 'Foro', title: 'Explorar', ai: 'Guía IA', profile: 'Perfil' }, ai_guide: { ...en.ai_guide, welcome: '¡Hola! Soy PH Concierge. ¿Cómo puedo ayudarte?', system: 'Eres PH Concierge, el asistente experto de Pilar de la Horadada. Responde en español.' } };
const ca = { ...es, menu: { ...es.menu, home: 'Inici', beaches: 'Platges', ai: 'Guia IA' }, ai_guide: { ...es.ai_guide, welcome: 'Hola! Sóc PH Concierge. Com et puc ajudar?', system: 'Ets PH Concierge, l\'assistent expert de Pilar de la Horadada. Respon en valencià/català.' } };
const eu = { ...es, menu: { ...es.menu, home: 'Hasiera', beaches: 'Hondartzak', ai: 'AI Gida' }, ai_guide: { ...es.ai_guide, welcome: 'Kaixo! PH Concierge naiz. Nola lagun zaitzaket?', system: 'PH Concierge zara. Erantzun euskaraz.' } };
const gl = { ...es, menu: { ...es.menu, home: 'Inicio', beaches: 'Praias', ai: 'Guía IA' }, ai_guide: { ...es.ai_guide, welcome: 'Ola! Son PH Concierge. Como te podo axudar?', system: 'Es PH Concierge. Responde en galego.' } };

const fr = { ...en, menu: { ...en.menu, home: 'Accueil', beaches: 'Plages', dining: 'Restaurants', ai: 'Guide IA' }, ai_guide: { ...en.ai_guide, welcome: 'Bienvenue ! Je suis votre PH Concierge.', system: 'Répondez en français.' } };
const de = { ...en, menu: { ...en.menu, home: 'Startseite', beaches: 'Strände', ai: 'KI-Guide' }, ai_guide: { ...en.ai_guide, welcome: 'Willkommen! Ich bin Ihr PH Concierge.', system: 'Antworten Sie auf Deutsch.' } };
const it = { ...en, menu: { ...en.menu, home: 'Home', beaches: 'Spiagge', ai: 'Guida IA' }, ai_guide: { ...en.ai_guide, welcome: 'Benvenuto! Sono il tuo PH Concierge.', system: 'Rispondi in italiano.' } };
const pt = { ...en, menu: { ...en.menu, home: 'Início', beaches: 'Praias', ai: 'Guia IA' }, ai_guide: { ...en.ai_guide, welcome: 'Bem-vindo! Sou o seu PH Concierge.', system: 'Responda em português.' } };
const ru = { ...en, menu: { ...en.menu, home: 'Главная', beaches: 'Пляжи', ai: 'ИИ-Гид' }, ai_guide: { ...en.ai_guide, welcome: 'Добро пожаловать!', system: 'Отвечайте на русском.' } };
const zh = { ...en, menu: { ...en.menu, home: '首页', beaches: '海滩', ai: 'AI指南' }, ai_guide: { ...en.ai_guide, welcome: '欢迎！', system: '请用中文回答。' } };
const ja = { ...en, menu: { ...en.menu, home: 'ホーム', beaches: 'ビーチ', ai: 'AIガイド' }, ai_guide: { ...en.ai_guide, welcome: 'ようこそ！', system: '日本語で答えてください。' } };
const ar = { ...en, menu: { ...en.menu, home: 'الرئيسية', beaches: 'شواطئ', ai: 'دليل ذكاء اصطناعي' }, ai_guide: { ...en.ai_guide, welcome: 'مرحباً!', system: 'أجب باللغة العربية.' } };
const ko = { ...en, menu: { ...en.menu, home: '홈', beaches: '해변', ai: 'AI가이드' }, ai_guide: { ...en.ai_guide, welcome: '환영합니다!', system: '한국어로 답변하세요.' } };
const nl = { ...en, menu: { ...en.menu, home: 'Home' }, ai_guide: { ...en.ai_guide, welcome: 'Welkom!', system: 'Antwoord in het Nederlands.' } };
const pl = { ...en, menu: { ...en.menu, home: 'Start' }, ai_guide: { ...en.ai_guide, welcome: 'Witaj!', system: 'Odpowiadaj po polsku.' } };
const tr = { ...en, menu: { ...en.menu, home: 'Anasayfa' }, ai_guide: { ...en.ai_guide, welcome: 'Hoş geldiniz!', system: 'Türkçe cevap verin.' } };
const hi = { ...en, menu: { ...en.menu, home: 'होम' }, ai_guide: { ...en.ai_guide, welcome: 'नमस्ते!', system: 'हिंदी में उत्तर दें।' } };
const th = { ...en, menu: { ...en.menu, home: 'หน้าแรก' }, ai_guide: { ...en.ai_guide, welcome: 'ยินดีต้อนรับ!', system: 'ตอบเป็นภาษาไทย' } };
const vi = { ...en, menu: { ...en.menu, home: 'Trang chủ' }, ai_guide: { ...en.ai_guide, welcome: 'Chào mừng!', system: 'Trả lời bằng tiếng Việt' } };
const id = { ...en, menu: { ...en.menu, home: 'Beranda' }, ai_guide: { ...en.ai_guide, welcome: 'Selamat datang!', system: 'Jawab dalam Bahasa Indonesia' } };
const he = { ...en, menu: { ...en.menu, home: 'בית' }, ai_guide: { ...en.ai_guide, welcome: 'ברוכים הבאים!', system: 'ענה בעברית' } };
const bg = { ...en, menu: { ...en.menu, home: 'Начало' }, ai_guide: { ...en.ai_guide, welcome: 'Добре дошли!', system: 'Отговаряйте на български' } };
const hr = { ...en, menu: { ...en.menu, home: 'Početna' }, ai_guide: { ...en.ai_guide, welcome: 'Dobrodošli!', system: 'Odgovori na hrvatskom' } };
const sk = { ...en, menu: { ...en.menu, home: 'Domov' }, ai_guide: { ...en.ai_guide, welcome: 'Vitajte!', system: 'Odpovedajte v slovenčine' } };
const sv = { ...en, menu: { ...en.menu, home: 'Hem' }, ai_guide: { ...en.ai_guide, welcome: 'Välkommen!', system: 'Svara på svenska.' } };
const no = { ...en, menu: { ...en.menu, home: 'Hjem' }, ai_guide: { ...en.ai_guide, welcome: 'Velkommen!', system: 'Svar na norsk.' } };
const da = { ...en, menu: { ...en.menu, home: 'Hjem' }, ai_guide: { ...en.ai_guide, welcome: 'Velkommen!', system: 'Svar på dansk.' } };
const fi = { ...en, menu: { ...en.menu, home: 'Koti' }, ai_guide: { ...en.ai_guide, welcome: 'Tervetuloa!', system: 'Vastaa suomeksi.' } };
const el = { ...en, menu: { ...en.menu, home: 'Αρχική' }, ai_guide: { ...en.ai_guide, welcome: 'Καλώς ήρθατε!', system: 'Απαντήστε στα ελληνικά.' } };
const ro = { ...en, menu: { ...en.menu, home: 'Acasă' }, ai_guide: { ...en.ai_guide, welcome: 'Bine ați venit!', system: 'Răspundeți în română.' } };
const cs = { ...en, menu: { ...en.menu, home: 'Domů' }, ai_guide: { ...en.ai_guide, welcome: 'Vítejte!', system: 'Odpovídejte v češtině.' } };
const hu = { ...en, menu: { ...en.menu, home: 'Főoldal' }, ai_guide: { ...en.ai_guide, welcome: 'Üdvözöljük!', system: 'Válaszoljon magyarul.' } };
const sl = { ...en, menu: { ...en.menu, home: 'Domov' }, ai_guide: { ...en.ai_guide, welcome: 'Dobrodošli!', system: 'Odgovarjaj v slovenščini' } };
const et = { ...en, menu: { ...en.menu, home: 'Avaleht' }, ai_guide: { ...en.ai_guide, welcome: 'Tere tulemast!', system: 'Vasta eesti keeles' } };
const lv = { ...en, menu: { ...en.menu, home: 'Sākums' }, ai_guide: { ...en.ai_guide, welcome: 'Laipni lūdzam!', system: 'Atbildiet latviski' } };
const lt = { ...en, menu: { ...en.menu, home: 'Pradžia' }, ai_guide: { ...en.ai_guide, welcome: 'Sveiki atvykę!', system: 'Atsakykite lietuviškai' } };
const uk = { ...en, menu: { ...en.menu, home: 'Головна' }, ai_guide: { ...en.ai_guide, welcome: 'Ласкаво просимо!', system: 'Відповідайте українською' } };
const ms = { ...en, menu: { ...en.menu, home: 'Utama' }, ai_guide: { ...en.ai_guide, welcome: 'Selamat datang!', system: 'Jawab dalam Bahasa Melayu' } };
const fa = { ...en, menu: { ...en.menu, home: 'خانه' }, ai_guide: { ...en.ai_guide, welcome: 'خوش آمدید!', system: 'به فارسی پاسخ دهید' } };
const bn = { ...en, menu: { ...en.menu, home: 'হোম' }, ai_guide: { ...en.ai_guide, welcome: 'স্বাগতম!', system: 'বাংলায় উত্তর দিন' } };
const pa = { ...en, menu: { ...en.menu, home: 'ਮੁੱਖ ਪੰਨਾ' }, ai_guide: { ...en.ai_guide, welcome: 'ਜੀ ਆਇਆਂ ਨੂੰ!', system: 'ਪੰਜਾਬី ਵਿੱਚ ਜਵਾਬ ਦਿਓ' } };
const tl = { ...en, menu: { ...en.menu, home: 'Home' }, ai_guide: { ...en.ai_guide, welcome: 'Maligayang pagdating!', system: 'Sagutin sa Tagalog' } };
const sr = { ...en, menu: { ...en.menu, home: 'Почетна' }, ai_guide: { ...en.ai_guide, welcome: 'Добродошли!', system: 'Одговори на српском' } };
const is = { ...en, menu: { ...en.menu, home: 'Heim' }, ai_guide: { ...en.ai_guide, welcome: 'Velkomin!', system: 'Svaraðu á íslensku' } };
const ga = { ...en, menu: { ...en.menu, home: 'Baile' }, ai_guide: { ...en.ai_guide, welcome: 'Fáilte!', system: 'Freagair i nGaeilge' } };
const mt = { ...en, menu: { ...en.menu, home: 'Dar' }, ai_guide: { ...en.ai_guide, welcome: 'Merħba!', system: 'Wieġeb bil-Malti' } };
const ka = { ...en, menu: { ...en.menu, home: 'მთავარი' }, ai_guide: { ...en.ai_guide, welcome: 'მოგესალმებით!', system: 'უპასუხეთ ქართულად' } };
const hy = { ...en, menu: { ...en.menu, home: 'Գլխավոր' }, ai_guide: { ...en.ai_guide, welcome: 'Բարի գալուստ:', system: 'Պատասխանեք հայերեն' } };
const az = { ...en, menu: { ...en.menu, home: 'Ana Səhifə' }, ai_guide: { ...en.ai_guide, welcome: 'Xoş gəlmisiniz!', system: 'Azərbaycan dilində cavab verin' } };
const kk = { ...en, menu: { ...en.menu, home: 'Басты бет' }, ai_guide: { ...en.ai_guide, welcome: 'Қош келдіңіз!', system: 'Қазақ тілінде жауап беріңіз' } };
const uz = { ...en, menu: { ...en.menu, home: 'Bosh sahifa' }, ai_guide: { ...en.ai_guide, welcome: 'Xush kelibsiz!', system: 'O‘zbek tilida javob bering' } };
const am = { ...en, menu: { ...en.menu, home: 'መነሻ' }, ai_guide: { ...en.ai_guide, welcome: 'እንኳን ደህና መጡ!', system: 'በአማርኛ ይመልሱ' } };
const sw = { ...en, menu: { ...en.menu, home: 'Nyumbani' }, ai_guide: { ...en.ai_guide, welcome: 'Karibu!', system: 'Jibu kwa Kiswahili' } };
const af = { ...en, menu: { ...en.menu, home: 'Tuisblad' }, ai_guide: { ...en.ai_guide, welcome: 'Welkom!', system: 'Antwoord in Afrikaans' } };
const sq = { ...en, menu: { ...en.menu, home: 'Ballina' }, ai_guide: { ...en.ai_guide, welcome: 'Mirë se vini!', system: 'Përgjigjuni në shqip' } };

export const translations = {
  en, es, ca, eu, gl, fr, de, it, pt, ru, zh, ja, ko, ar, nl, pl, tr, hi, th, vi, id, he, bg, hr, sk, sv, no, da, fi, el, ro, cs, hu, sl, et, lv, lt, uk, ms, fa, bn, pa, tl, sr, is, ga, mt, ka, hy, az, kk, uz, am, sw, af, sq
};
