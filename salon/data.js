// Name, contacts and services for one salon. Prices can also come from a Google Sheet.
const SALON = {
  name: "Lavanda Nails",
  tagline: {
    ro: "Manichiură și pedichiură, Centru",
    ru: "Маникюр и педикюр, Центр",
    en: "Manicure and pedicure, city centre",
  },
  currency: { ro: "lei", ru: "лей", en: "MDL" },
  sheet: "",
  booking: "https://t.me/+37376851101",
  phone: "+373 22 00 00 00",
  address: "str. Exemplu 12, Chișinău",
  hours: {
    ro: "Luni–Sâmbătă 9:00–20:00",
    ru: "Пн–Сб 9:00–20:00",
    en: "Mon–Sat 9:00–20:00",
  },
  categories: [
    {
      id: "mani",
      title: { ro: "Manichiură", ru: "Маникюр", en: "Manicure" },
      items: [
        {
          name: { ro: "Manichiură fără acoperire", ru: "Маникюр без покрытия", en: "Manicure, no polish" },
          desc: { ro: "Combinată, formă și cuticule", ru: "Комбинированный, форма и кутикула", en: "Combined, shape and cuticles" },
          time: "45", price: 180,
        },
        {
          name: { ro: "Manichiură + gel-lac", ru: "Маникюр + гель-лак", en: "Manicure + gel polish" },
          desc: { ro: "Un ton, rezistă 3–4 săptămâni", ru: "Однотонное, держится 3–4 недели", en: "One colour, lasts 3–4 weeks" },
          time: "90", price: 350,
        },
        {
          name: { ro: "Întărire cu gel", ru: "Укрепление гелем", en: "Gel strengthening" },
          time: "100", price: 420,
        },
        {
          name: { ro: "Îndepărtarea gel-lacului", ru: "Снятие гель-лака", en: "Gel polish removal" },
          time: "20", price: 80,
        },
      ],
    },
    {
      id: "ext",
      title: { ro: "Extensii", ru: "Наращивание", en: "Extensions" },
      items: [
        {
          name: { ro: "Extensii unghii, lungime S–M", ru: "Наращивание ногтей, длина S–M", en: "Nail extensions, S–M length" },
          desc: { ro: "Pe forme superioare, cu acoperire", ru: "На верхние формы, с покрытием", en: "Top forms, polish included" },
          time: "150", price: 550, from: true,
        },
        {
          name: { ro: "Corecție extensii", ru: "Коррекция наращивания", en: "Extension refill" },
          time: "120", price: 450,
        },
      ],
    },
    {
      id: "pedi",
      title: { ro: "Pedichiură", ru: "Педикюр", en: "Pedicure" },
      items: [
        {
          name: { ro: "Pedichiură fără acoperire", ru: "Педикюр без покрытия", en: "Pedicure, no polish" },
          time: "60", price: 300,
        },
        {
          name: { ro: "Pedichiură + gel-lac", ru: "Педикюр + гель-лак", en: "Pedicure + gel polish" },
          time: "90", price: 420,
        },
      ],
    },
    {
      id: "design",
      title: { ro: "Design", ru: "Дизайн", en: "Nail art" },
      items: [
        {
          name: { ro: "French", ru: "Френч", en: "French" },
          price: 80,
        },
        {
          name: { ro: "Design pe o unghie", ru: "Дизайн одного ногтя", en: "Art on one nail" },
          desc: { ro: "Desen, folie, pietricele", ru: "Рисунок, фольга, стразы", en: "Painting, foil, crystals" },
          price: 20, from: true,
        },
      ],
    },
  ],
};
