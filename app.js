const LANGS = ["ro", "ru", "en"];

const UI = {
  ro: { title: "Meniu", g: "g", ml: "ml", veg: "vegetarian", spicy: "picant", vat: "Prețurile includ TVA.", demo: "Demo: restaurantul este fictiv." },
  ru: { title: "Меню", g: "г", ml: "мл", veg: "вегетарианское", spicy: "острое", vat: "Цены указаны с НДС.", demo: "Демо: ресторан выдуманный." },
  en: { title: "Menu", g: "g", ml: "ml", veg: "vegetarian", spicy: "spicy", vat: "Prices include VAT.", demo: "Demo: the restaurant is fictional." },
};

function pickLang() {
  const param = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(param)) return param;

  try {
    const saved = localStorage.getItem("lang");
    if (LANGS.includes(saved)) return saved;
  } catch (e) {}

  const browser = (navigator.language || "").slice(0, 2);
  return LANGS.includes(browser) ? browser : "ro";
}

function dish(item, lang) {
  const weight = item.weight.replace(/(g|ml)$/, (unit) => UI[lang][unit]);
  const tags = (item.tags || []).map((t) => `<span class="tag tag-${t}">${UI[lang][t]}</span>`).join("");
  return `
    <article class="dish">
      <div class="dish-row">
        <h3>${item.name[lang]}</h3>
        <span class="leader"></span>
        <span class="price">${item.price} ${MENU.currency[lang]}</span>
      </div>
      <p class="desc">${item.desc[lang]}</p>
      <p class="meta"><span>${weight}</span>${tags}</p>
    </article>`;
}

function render(lang) {
  document.documentElement.lang = lang;
  document.title = `${MENU.name}: ${UI[lang].title}`;

  document.getElementById("name").textContent = MENU.name;
  document.getElementById("tagline").textContent = MENU.tagline[lang];

  document.getElementById("langs").innerHTML = LANGS.map((l) =>
    `<button type="button" data-lang="${l}" aria-pressed="${l === lang}">${l.toUpperCase()}</button>`
  ).join("");

  document.getElementById("tabs").innerHTML = MENU.categories.map((c) =>
    `<a href="#${c.id}" data-id="${c.id}">${c.title[lang]}</a>`
  ).join("");

  document.getElementById("menu").innerHTML = MENU.categories.map((c) => `
    <section id="${c.id}" class="cat">
      <h2>${c.title[lang]}</h2>
      ${c.items.map((item) => dish(item, lang)).join("")}
    </section>`
  ).join("");

  document.getElementById("hours").textContent = MENU.hours[lang];
  document.getElementById("address").textContent = MENU.address;
  const phone = document.getElementById("phone");
  phone.textContent = MENU.phone;
  phone.href = "tel:" + MENU.phone.replace(/\s/g, "");
  document.getElementById("note").textContent = `${UI[lang].vat} ${UI[lang].demo}`;

  current = null;
  markTab();
}

document.getElementById("langs").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const lang = btn.dataset.lang;
  try { localStorage.setItem("lang", lang); } catch (e) {}
  render(lang);
});

// Highlight the tab of the section currently under the sticky nav.
let current;
function markTab() {
  const tabs = document.getElementById("tabs");
  let id = MENU.categories[0].id;
  document.querySelectorAll(".cat").forEach((s) => {
    if (s.getBoundingClientRect().top < 120) id = s.id;
  });
  // Bottom of the page: the last short section never reaches the top.
  if (innerHeight + scrollY >= document.body.scrollHeight - 4) {
    id = MENU.categories[MENU.categories.length - 1].id;
  }

  tabs.querySelectorAll("a").forEach((a) => {
    const on = a.dataset.id === id;
    a.classList.toggle("active", on);
    if (on && id !== current) {
      tabs.scrollTo({ left: a.offsetLeft - (tabs.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
    }
  });
  current = id;
}

addEventListener("scroll", markTab, { passive: true });

render(pickLang());
