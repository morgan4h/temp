let links = document.querySelectorAll('a');
let buttons = document.querySelectorAll('button')
let chName;
function redirect(number) {
  if(number == '2') {
    window.open('https://www.instagram.com/4harabic')
  }else if (number == '3') {
    window.open('https://discord.gg/srEmeNMx')
  }else if (number == '4') {
    window.open('https://github.com/morgan4h')
  }else if(number == '5') {
    window.open('https://www.fiverr.com/s/LdoBdmA')
  }else if (number == '6') {
    window.open('mailto:4harabic@gmail.com')
  }else if (number == '7') {
    window.open('https://www.linkedin.com/in/morgan-tmk-92672a360') 
  }
 }
function loopElement(link,type,name) {
  // console.log('name : ' +  name)
  for(let i = 0; i < link.length; i++) {
    switch (type) {
      case 'btn':
        // console.log(link[i].textContent)
        link[2].onclick = function() {
          redirect(2)
        }
        link[3].onclick = function() {
          redirect(3)
        }
        link[4].onclick = function() {
          redirect(4)
        }
        link[5].onclick = function() {
          redirect(5)
        }
        link[6].onclick = function() {
          redirect(6)
        }
        link[7].onclick = function() {
          redirect(7)
        }
        break;
        case 'href':
          // console.log(link[i].textContent)
          link[0].onclick = function() {
           window.open('https://youtube.com/@sofai4h')
          }
          link[1].onclick = function() {
           window.open('https://youtube.com/@morgan4h')
          }
          link[2].onclick = function() {
            window.open('https://youtube.com/@tmk4h')
          }
          break
    
      default:
        break;
    }
  }
}
if (location.search == '?t=sofai4h') {
  // console.log(links, buttons)
  chName = 'SOFAI 4H';
  loopElement(buttons,'btn','sofai')
  loopElement(links,'href')
} else if (location.search == '?t=morgan4h') {
  chName = "MORGAN 4H"
  loopElement(buttons,'btn','morgan')
  loopElement(links,'href','morgan')
} else if (location.search == '?t=tmk4h') {
  chName = "TMK 4H"
  loopElement(buttons,'btn','tmk')
  loopElement(links,'href','tmk')
} else {
  location.href = 'err.html'
}
// console.log(location)
const translations = {
  en: {
    logo: chName,
    home: "IT",
    about: "Programming",
    contact: "Entertainment",
    headerTitle: "Welcome into our temp version",
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
    card6Title: "LinkedIn",
    card6Desc: "Connect with me professionally and grow your network.",
    connect: "Connect",
    footer: "4H ARABIC. All rights reserved."
  },
  ar: {
    logo: chName,
    home: "التقنية",
    about: "البرمجة",
    contact: "الترفيه",
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
    card6Title: "لينكد إن",
    card6Desc: "تواصل معي بشكل احترافي ووسع شبكتك.",
    connect: "تواصل",
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