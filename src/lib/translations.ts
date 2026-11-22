import { arabicCopy } from "./arabic-copy";

import type { Locale } from "./i18n";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      expertise: "Expertise",
      whyUs: "Why Us",
      blog: "Blog",
      contact: "Contact",
    },

    common: {
      learnMore: "Learn More",
      readMore: "Read More",
      exploreServices: "Explore Services",
      requestConsultation: "Request Consultation",
      contactUs: "Contact Us",
      viewAll: "View All",
      back: "Back",
      loading: "Loading...",
    },

    home: {
      eyebrow: "Business Services & Advisory",
      heroTitle: "Keep More of What You Earn.",
      heroDescription:
        "A practical finance partner for business growth across corporate tax, outsourced accounting, cost control and business advisory.",
      servicesTitle: "Our Services",
      aboutTitle: "About Al FATEH",
      expertiseTitle: "Our Expertise",
      whyUsTitle: "Why Choose Us",
    },

    about: {
      eyebrow: "About Us",
      title: "About Al FATEH",
      mission: "Our Mission",
      vision: "Our Vision",
      values: "Our Values",
    },

    services: {
      eyebrow: "Our Services",
      title: "Business Services & Advisory",
      accounting: "Accounting Services",
      feasibility: "Feasibility Studies Consultancy",
      maritime: "Maritime Consultancy",
      innovation: "Innovation & Artificial Intelligence",
    },

    expertise: {
      eyebrow: "Our Expertise",
      title: "Industry Solutions",
      description:
        "An adaptable framework for inventory-heavy, production-based and service-oriented businesses.",
    },

    whyUs: {
      eyebrow: "Why Al FATEH",
      title: "What Clients Can Expect",
      description:
        "Engagement outputs are tailored to the agreed scope and client requirements.",
    },

    blog: {
      eyebrow: "Insights & Perspectives",
      title: "Business Insights for Better Decisions",
      description:
        "Notes on corporate tax, cost control, and market advisory.",
      backToBlog: "Back to all insights",
      readTime: "Reading time",
    },

    contact: {
      eyebrow: "Contact Us",
      title: "Let's Get In Touch!",
      name: "Full Name",
      company: "Company Name",
      email: "Email Address",
      phone: "Phone Number",
      service: "Service",
      message: "Message",
      submit: "Send Message",
      sending: "Sending...",
      required: "This field is required.",
      success: "Your message has been sent successfully.",
      error: "Unable to send your message. Please try again.",
    },

    footer: {
      advisory: "Advisory Enquiries",
      conversation:
        "Begin a conversation with the Al FATEH advisory team.",
      intro:
        "A practical finance partner for business growth across corporate tax, outsourced accounting, cost control and business advisory.",
      response: "Response",
      responseValue: "Within 1 business day",
      confidentiality: "Confidentiality",
      confidentialityValue: "NDA on request",
      focus: "Focus",
      focusValue: "Business Services & Advisory",
      engagement: "Engagement",
      engagementValue: "Senior-led team",
      description:
        "Structured accounting, clear reporting, and advisory support built around the financial and operational needs of growing organizations.",
      quickLinks: "Quick Links",
      contact: "Contact",
      location: "Location",
      copyright:
        "All Rights Reserved By Al-Fateh for Consultation Services",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      expertise: "مجالات الخبرة",
      whyUs: "لماذا الفاتح",
      blog: "المدونة",
      contact: "تواصل معنا",
    },

    common: {
      learnMore: "اعرف المزيد",
      readMore: "اقرأ المزيد",
      exploreServices: "استكشف خدماتنا",
      requestConsultation: "اطلب استشارة",
      contactUs: "تواصل معنا",
      viewAll: "عرض الكل",
      back: "العودة",
      loading: "جارٍ التحميل...",
    },

    home: {
      eyebrow: "خدمات الأعمال والاستشارات",
      heroTitle: "احتفظ بالمزيد من أرباحك.",
      heroDescription:
        "شريك مالي عملي لدعم نمو أعمالك من خلال خدمات ضريبة الشركات والمحاسبة الخارجية وضبط التكاليف والاستشارات الإدارية.",
      servicesTitle: "خدماتنا",
      aboutTitle: "عن الفاتح",
      expertiseTitle: "مجالات خبرتنا",
      whyUsTitle: "لماذا تختار الفاتح؟",
    },

    about: {
      eyebrow: "من نحن",
      title: "عن الفاتح",
      mission: "رسالتنا",
      vision: "رؤيتنا",
      values: "قيمنا",
    },

    services: {
      eyebrow: "خدماتنا",
      title: "خدمات الأعمال والاستشارات",
      accounting: "الخدمات المحاسبية",
      feasibility: "استشارات دراسات الجدوى",
      maritime: "الاستشارات البحرية",
      innovation: "الابتكار والذكاء الاصطناعي",
    },

    expertise: {
      eyebrow: "مجالات الخبرة",
      title: "حلول متخصصة للقطاعات",
      description:
        "منهجية مرنة تناسب الشركات التي تعتمد على المخزون أو الإنتاج أو تقديم الخدمات.",
    },

    whyUs: {
      eyebrow: "لماذا الفاتح؟",
      title: "ما الذي يمكن لعملائنا توقعه؟",
      description:
        "نقدم مخرجات استشارية مصممة وفق نطاق العمل المتفق عليه واحتياجات كل عميل.",
    },

    blog: {
      eyebrow: "رؤى ووجهات نظر",
      title: "رؤى تجارية لقرارات أفضل",
      description:
        "مقالات حول ضريبة الشركات وضبط التكاليف والاستشارات التجارية.",
      backToBlog: "العودة إلى جميع المقالات",
      readTime: "مدة القراءة",
    },

    contact: {
      eyebrow: "تواصل معنا",
      title: "يسعدنا تواصلك معنا!",
      name: "الاسم الكامل",
      company: "اسم الشركة",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      service: "الخدمة",
      message: "الرسالة",
      submit: "إرسال الرسالة",
      sending: "جارٍ الإرسال...",
      required: "هذا الحقل مطلوب.",
      success: "تم إرسال رسالتك بنجاح.",
      error: "تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    },

    footer: {
      advisory: "الاستفسارات الاستشارية",
      conversation:
        "ابدأ حوارك مع فريق الفاتح للاستشارات.",
      intro:
        "شريك مالي عملي لدعم نمو الأعمال في مجالات ضريبة الشركات والمحاسبة الخارجية وضبط التكاليف واستشارات الأعمال.",
      response: "الاستجابة",
      responseValue: "خلال يوم عمل واحد",
      confidentiality: "السرية",
      confidentialityValue: "اتفاقية عدم إفصاح عند الطلب",
      focus: "التخصص",
      focusValue: "خدمات الأعمال والاستشارات",
      engagement: "فريق العمل",
      engagementValue: "فريق بإشراف خبراء",
      description:
        "خدمات محاسبية منظمة وتقارير مالية واضحة ودعم استشاري مصمم لتلبية الاحتياجات المالية والتشغيلية للمؤسسات النامية.",
      quickLinks: "روابط سريعة",
      contact: "تواصل معنا",
      location: "الموقع",
      copyright:
        "جميع الحقوق محفوظة لشركة الفاتح للخدمات الاستشارية",
    },
  },
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function hasArabicCopy(text: string): boolean {
  return Object.hasOwn(arabicCopy, text);
}

export function translate(locale: Locale, text: string): string {
  return locale === "ar" && hasArabicCopy(text) ? arabicCopy[text] ?? text : text;
}
