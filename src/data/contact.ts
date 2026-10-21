export const contact = {
  phone: "+971528046699",
  phoneDisplay: "+971 52 804 6699",
  phoneHref: "tel:+971528046699",
  phones: [
    { display: "+971 52 804 6699", href: "tel:+971528046699" },
    { display: "+971 50 994 0318", href: "tel:+971509940318" },
  ],
  email: "info@efateh.com",
  emailHref: "mailto:info@efateh.com",
  whatsappHref:
    "https://api.whatsapp.com/send/?phone=971509940318&text&type=phone_number&app_absent=0",
  location: {
    name: "Al FATEH Consultation Services",
    address:
      "Al FATEH Consultation Services, Al Saqr Business Tower, Sheikh Zayed Road, Dubai, UAE",
    mapsHref: "https://maps.app.goo.gl/8BWSSJJWcwR31oiT9",
    embedSrc:
      "https://www.google.com/maps?q=Al+FATEH+Consultation+Services%2C+25.2139552%2C55.278056&z=17&output=embed",
  },
  website: "https://efateh.com",
} as const; 
