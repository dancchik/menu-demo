// Everything a new client changes lives here: name, contacts, dishes, prices.
const MENU = {
  name: "Teiul Verde",
  tagline: {
    ro: "Bucătărie moldovenească de casă",
    ru: "Домашняя молдавская кухня",
    en: "Homestyle Moldovan cooking",
  },
  currency: { ro: "lei", ru: "лей", en: "MDL" },
  // Google Sheet id with the dishes; the owner edits prices there.
  // The categories below are only a fallback if the sheet can't be loaded.
  sheet: "1SbscpXH3KgjiXTJIJJr2XBP2vMrRKTc2VpLsijYk3-E",
  address: "str. Exemplu 12, Chișinău",
  phone: "+373 22 00 00 00",
  hours: {
    ro: "Zilnic 11:00–23:00",
    ru: "Ежедневно 11:00–23:00",
    en: "Daily 11:00–23:00",
  },
  categories: [
    {
      id: "starters",
      title: { ro: "Gustări", ru: "Закуски", en: "Starters" },
      items: [
        {
          name: { ro: "Plăcintă cu brânză", ru: "Плацинда с брынзой", en: "Cheese placinta" },
          desc: {
            ro: "Aluat întins subțire, brânză de oi",
            ru: "Тонкое тянутое тесто, овечья брынза",
            en: "Hand-stretched dough, sheep's cheese",
          },
          weight: "200 g",
          price: 45,
          tags: ["veg"],
        },
        {
          name: { ro: "Plăcintă cu varză", ru: "Плацинда с капустой", en: "Cabbage placinta" },
          desc: {
            ro: "Varză călită cu ceapă și piper",
            ru: "Тушёная капуста с луком и перцем",
            en: "Braised cabbage with onion and pepper",
          },
          weight: "200 g",
          price: 40,
          tags: ["veg"],
        },
        {
          name: { ro: "Salată de vinete", ru: "Салат из баклажанов", en: "Aubergine salad" },
          desc: {
            ro: "Vinete coapte pe jar, ceapă, ulei de floarea-soarelui",
            ru: "Печёные на углях баклажаны, лук, подсолнечное масло",
            en: "Fire-roasted aubergine, onion, sunflower oil",
          },
          weight: "180 g",
          price: 65,
          tags: ["veg"],
        },
        {
          name: { ro: "Platou de brânzeturi", ru: "Сырная тарелка", en: "Cheese board" },
          desc: {
            ro: "Brânză de oi, cașcaval afumat, nuci, miere",
            ru: "Овечья брынза, копчёный кашкавал, орехи, мёд",
            en: "Sheep's cheese, smoked cascaval, walnuts, honey",
          },
          weight: "250 g",
          price: 140,
          tags: ["veg"],
        },
      ],
    },
    {
      id: "soups",
      title: { ro: "Supe", ru: "Супы", en: "Soups" },
      items: [
        {
          name: { ro: "Zeamă de casă", ru: "Домашняя зама", en: "Homemade zeama" },
          desc: {
            ro: "Supă acrișoară de găină cu tăiței de casă și leuștean",
            ru: "Кисловатый куриный суп с домашней лапшой и любистоком",
            en: "Sour chicken soup with homemade noodles and lovage",
          },
          weight: "350 ml",
          price: 65,
        },
        {
          name: { ro: "Ciorbă de perișoare", ru: "Чорба с фрикадельками", en: "Meatball ciorba" },
          desc: {
            ro: "Perișoare de porc și vită, legume, borș",
            ru: "Фрикадельки из свинины и говядины, овощи, кислый борш",
            en: "Pork and beef meatballs, vegetables, fermented bran broth",
          },
          weight: "350 ml",
          price: 70,
        },
        {
          name: { ro: "Supă cremă de dovleac", ru: "Крем-суп из тыквы", en: "Pumpkin cream soup" },
          desc: {
            ro: "Cu semințe prăjite",
            ru: "С жареными семечками",
            en: "With toasted seeds",
          },
          weight: "300 ml",
          price: 60,
          tags: ["veg"],
        },
      ],
    },
    {
      id: "mains",
      title: { ro: "Feluri principale", ru: "Горячее", en: "Mains" },
      items: [
        {
          name: {
            ro: "Mămăligă cu brânză și smântână",
            ru: "Мамалыга с брынзой и сметаной",
            en: "Mamaliga with cheese and sour cream",
          },
          desc: {
            ro: "Mămăligă caldă, brânză de oi, smântână de casă",
            ru: "Тёплая мамалыга, овечья брынза, домашняя сметана",
            en: "Warm mamaliga, sheep's cheese, homemade sour cream",
          },
          weight: "350 g",
          price: 95,
          tags: ["veg"],
        },
        {
          name: { ro: "Sarmale în foi de viță", ru: "Сарма в виноградных листьях", en: "Sarmale in vine leaves" },
          desc: {
            ro: "Carne de porc și orez, servite cu smântână",
            ru: "Свинина с рисом, подаётся со сметаной",
            en: "Pork and rice, served with sour cream",
          },
          weight: "300 g",
          price: 115,
        },
        {
          name: { ro: "Mititei", ru: "Мититеи", en: "Mititei" },
          desc: {
            ro: "Patru mititei la grătar, muștar, cartofi prăjiți",
            ru: "Четыре мититея на гриле, горчица, картофель фри",
            en: "Four grilled mititei, mustard, fries",
          },
          weight: "350 g",
          price: 125,
        },
        {
          name: { ro: "Tochitură moldovenească", ru: "Молдавская токитура", en: "Moldovan tochitura" },
          desc: {
            ro: "Carne de porc cu sos picant, mămăligă, ou ochi, brânză",
            ru: "Свинина в остром соусе, мамалыга, яичница, брынза",
            en: "Pork in a spicy sauce, mamaliga, fried egg, cheese",
          },
          weight: "450 g",
          price: 165,
          tags: ["spicy"],
        },
        {
          name: { ro: "Păstrăv la grătar", ru: "Форель на гриле", en: "Grilled trout" },
          desc: {
            ro: "Cu mujdei și legume coapte",
            ru: "С муждеем и печёными овощами",
            en: "With garlic mujdei and roasted vegetables",
          },
          weight: "400 g",
          price: 180,
        },
      ],
    },
    {
      id: "desserts",
      title: { ro: "Deserturi", ru: "Десерты", en: "Desserts" },
      items: [
        {
          name: { ro: "Papanași", ru: "Папанаши", en: "Papanasi" },
          desc: {
            ro: "Gogoși din brânză dulce cu smântână și dulceață de vișine",
            ru: "Творожные пончики со сметаной и вишнёвым вареньем",
            en: "Sweet cheese doughnuts with sour cream and sour cherry jam",
          },
          weight: "220 g",
          price: 85,
          tags: ["veg"],
        },
        {
          name: { ro: "Cozonac cu nucă", ru: "Козонак с орехами", en: "Walnut cozonac" },
          desc: {
            ro: "Felie de cozonac, servită caldă",
            ru: "Кусок сладкого хлеба, подаётся тёплым",
            en: "A slice of sweet bread, served warm",
          },
          weight: "120 g",
          price: 50,
          tags: ["veg"],
        },
      ],
    },
    {
      id: "drinks",
      title: { ro: "Băuturi", ru: "Напитки", en: "Drinks" },
      items: [
        {
          name: { ro: "Compot de casă", ru: "Домашний компот", en: "Homemade compote" },
          desc: {
            ro: "Din fructe de sezon",
            ru: "Из сезонных фруктов",
            en: "Made from seasonal fruit",
          },
          weight: "300 ml",
          price: 30,
        },
        {
          name: { ro: "Ceai din plante", ru: "Травяной чай", en: "Herbal tea" },
          desc: {
            ro: "Tei, mentă sau mușețel",
            ru: "Липа, мята или ромашка",
            en: "Linden, mint or chamomile",
          },
          weight: "400 ml",
          price: 40,
        },
        {
          name: { ro: "Vin roșu de casă", ru: "Домашнее красное вино", en: "House red wine" },
          desc: {
            ro: "Pahar",
            ru: "Бокал",
            en: "By the glass",
          },
          weight: "150 ml",
          price: 60,
        },
        {
          name: { ro: "Apă minerală", ru: "Минеральная вода", en: "Mineral water" },
          desc: {
            ro: "Plată sau carbogazoasă",
            ru: "Без газа или с газом",
            en: "Still or sparkling",
          },
          weight: "500 ml",
          price: 25,
        },
      ],
    },
  ],
};
