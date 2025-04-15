let chName;
if (location.search == '?t=sofai4h') {
    chName = 'SOFAI 4H';
}else if (location.search =='?t=morgan4h') {
    chName = "MORGAN 4H"
}else if (location.search == '?t=tmk4h') {
    chName = "TMK 4H"
}else {
    location.href = 'err.html'
}
console.log(location)
const translations = {
    en: {
      logo: chName,
      home: "Home",
      about: "About",
      contact: "Contact",
      headerTitle: "Welcome in temp version for our website",
      headerSub: "Help you to connect with me",
      card1Title: "Instagram",
      card1Desc: "Follow us for stunning visuals and inspiration.",
      card2Title: "Discord",
      card2Desc: "Chat, connect, and collaborate with our vibrant community.",
      card3Title: "GitHub",
      card3Desc: "Explore and contribute to our open-source projects.",
      card4Title: "Fiverr",
      card4Desc: "Find top freelance services and creative solutions.",
      card5Title: "Business Inquiry",
      card5Desc: "For sponsorships or business inquiries, email us now.",
      visit: "Visit",
      join: "Join",
      explore: "Explore",
      email: "Email Us",
      footer: "4H ARABIC. All rights reserved."
    },
    ar: {
      logo: chName,
      home: "الرئيسية",
      about: "حول",
      contact: "تواصل",
      headerTitle: "هذه نسخة مؤقتة من الموقع",
      headerSub: "لتسهيل التواصل معا",
      card1Title: "إنستغرام",
      card1Desc: "تابعنا لمشاهدة صور ملهمة وجذابة.",
      card2Title: "ديسكورد",
      card2Desc: "دردش وتواصل مع مجتمعنا الحيوي.",
      card3Title: "جيت هب",
      card3Desc: "استكشف وساهم في مشاريعنا مفتوحة المصدر.",
      card4Title: "فايفر",
      card4Desc: "اكتشف أفضل خدمات المستقلين وحلول الإبداع.",
      card5Title: "طلب عمل",
      card5Desc: "للتعاون أو الرعاية تواصل معنا عبر البريد.",
      visit: "زيارة",
      join: "انضم",
      explore: "استكشاف",
      email: "راسلنا",
      footer: "  4H ARABIC. جميع الحقوق محفوظة."
    }
  };

  let currentLang = "en";

  function updateLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    currentLang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = translations[lang][key];
    });

    document.querySelector(".lang-toggle").textContent = lang === "ar" ? "English" : "العربية";
  }

  function toggleLanguage() {
    const nextLang = currentLang === "en" ? "ar" : "en";
    updateLanguage(nextLang);
  }

  function toggleTheme() {
    const theme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "light" : "dark");
  }

  // Init
  window.onload = () => {
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", preferredTheme);
    updateLanguage(currentLang);
  };