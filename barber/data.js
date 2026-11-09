// Name, contacts and services for one barbershop. Prices can also come from a Google Sheet.
const SALON = {
  name: "Briciul",
  tagline: {
    ro: "Barbershop, Botanica",
    ru: "Барбершоп, Ботаника",
    en: "Barbershop, Botanica",
  },
  currency: { ro: "lei", ru: "лей", en: "MDL" },
  sheet: "",
  booking: "https://t.me/+37376851101",
  phone: "+373 22 00 00 00",
  address: "str. Exemplu 12, Chișinău",
  hours: {
    ro: "Zilnic 10:00–21:00",
    ru: "Ежедневно 10:00–21:00",
    en: "Daily 10:00–21:00",
  },
  categories: [
    {
      id: "hair",
      title: { ro: "Tuns", ru: "Стрижка", en: "Haircut" },
      items: [
        {
          name: { ro: "Tuns bărbătesc", ru: "Мужская стрижка", en: "Men's haircut" },
          desc: { ro: "Spălat și styling incluse", ru: "Мытьё и укладка включены", en: "Wash and styling included" },
          time: "45", price: 250,
        },
        {
          name: { ro: "Tuns cu mașina", ru: "Стрижка машинкой", en: "Clipper cut" },
          desc: { ro: "O singură lungime", ru: "Одна насадка", en: "One guard length" },
          time: "20", price: 150,
        },
        {
          name: { ro: "Tuns copii (până la 12 ani)", ru: "Детская стрижка (до 12 лет)", en: "Kids' haircut (under 12)" },
          time: "30", price: 180,
        },
      ],
    },
    {
      id: "beard",
      title: { ro: "Barbă", ru: "Борода", en: "Beard" },
      items: [
        {
          name: { ro: "Modelarea bărbii", ru: "Моделирование бороды", en: "Beard trim" },
          time: "30", price: 180,
        },
        {
          name: { ro: "Bărbierit cu brici", ru: "Бритьё опасной бритвой", en: "Straight razor shave" },
          desc: { ro: "Cu prosop cald", ru: "С горячим полотенцем", en: "With hot towel" },
          time: "40", price: 220,
        },
      ],
    },
    {
      id: "combo",
      title: { ro: "Pachete", ru: "Комплексы", en: "Combos" },
      items: [
        {
          name: { ro: "Tuns + barbă", ru: "Стрижка + борода", en: "Haircut + beard" },
          time: "75", price: 380,
        },
        {
          name: { ro: "Tată + fiu", ru: "Отец + сын", en: "Father + son" },
          time: "75", price: 400,
        },
      ],
    },
  ],
};
