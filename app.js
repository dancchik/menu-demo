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

// Sheet text is typed by the owner, so it goes into the page escaped.
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function parseCSV(text) {
  const rows = [[]];
  let cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { rows.at(-1).push(cell); cell = ""; }
    else if (c === "\n") { rows.at(-1).push(cell); cell = ""; rows.push([]); }
    else if (c !== "\r") cell += c;
  }
  rows.at(-1).push(cell);
  return rows.filter((r) => r.some((c) => c.trim()));
}

// One row per dish; a new section starts whenever section_ro changes.
function fromSheet(rows) {
  const head = rows[0].map((h) => h.trim());
  const cats = [];
  for (const r of rows.slice(1)) {
    const v = Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()]));
    if (!v.dish_ro || !v.price) continue;
    let cat = cats.at(-1);
    if (!cat || cat.title.ro !== v.section_ro) {
      cat = { id: "s" + cats.length, title: { ro: v.section_ro, ru: v.section_ru, en: v.section_en }, items: [] };
      cats.push(cat);
    }
    cat.items.push({
      name: { ro: v.dish_ro, ru: v.dish_ru || v.dish_ro, en: v.dish_en || v.dish_ro },
      desc: { ro: v.desc_ro, ru: v.desc_ru, en: v.desc_en },
      weight: v.weight,
      price: v.price,
      tags: v.tags.split(/\s+/).filter((t) => t in UI.ro),
    });
  }
  return cats;
}

async function loadSheet() {
  if (!MENU.sheet) return;
  const url = `https://docs.google.com/spreadsheets/d/${MENU.sheet}/gviz/tq?tqx=out:csv`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(res.status);
    const cats = fromSheet(parseCSV(await res.text()));
    if (cats.length) MENU.categories = cats;
  } catch (e) {
    console.warn("sheet not loaded, using built-in menu", e);
  }
}

function dish(item, lang) {
  const weight = esc(item.weight).replace(/(g|ml)$/, (unit) => UI[lang][unit]);
  const tags = (item.tags || []).map((t) => `<span class="tag tag-${t}">${UI[lang][t]}</span>`).join("");
  return `
    <article class="dish">
      <div class="dish-row">
        <h3>${esc(item.name[lang])}</h3>
        <span class="leader"></span>
        <span class="price">${esc(item.price)} ${MENU.currency[lang]}</span>
      </div>
      ${item.desc[lang] ? `<p class="desc">${esc(item.desc[lang])}</p>` : ""}
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
    `<a href="#${c.id}" data-id="${c.id}">${esc(c.title[lang] || c.title.ro)}</a>`
  ).join("");

  document.getElementById("menu").innerHTML = MENU.categories.map((c) => `
    <section id="${c.id}" class="cat">
      <h2>${esc(c.title[lang] || c.title.ro)}</h2>
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

loadSheet().then(() => render(pickLang()));
