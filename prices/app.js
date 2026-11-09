const LANGS = ["ro", "ru", "en"];

const UI = {
  ro: { title: "Prețuri", min: "min", from: "de la", book: "Programează-te", call: "Sună", demo: "Demo: salonul este fictiv, butonul de programare duce la dezvoltator." },
  ru: { title: "Цены", min: "мин", from: "от", book: "Записаться", call: "Позвонить", demo: "Демо: салон выдуманный, кнопка записи ведёт к разработчику." },
  en: { title: "Prices", min: "min", from: "from", book: "Book now", call: "Call", demo: "Demo: the salon is fictional, the booking button goes to the developer." },
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

// Same sheet layout as the menu: one row per service, a new section when section_ro changes.
function fromSheet(rows) {
  const head = rows[0].map((h) => h.trim());
  const cats = [];
  for (const r of rows.slice(1)) {
    const v = Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()]));
    if (!v.service_ro || !v.price) continue;
    let cat = cats.at(-1);
    if (!cat || cat.title.ro !== v.section_ro) {
      cat = { id: "s" + cats.length, title: { ro: v.section_ro, ru: v.section_ru, en: v.section_en }, items: [] };
      cats.push(cat);
    }
    cat.items.push({
      name: { ro: v.service_ro, ru: v.service_ru || v.service_ro, en: v.service_en || v.service_ro },
      desc: { ro: v.desc_ro, ru: v.desc_ru, en: v.desc_en },
      time: v.time,
      price: v.price,
      from: v.from === "1",
    });
  }
  return cats;
}

async function loadSheet() {
  if (!SALON.sheet) return;
  const url = `https://docs.google.com/spreadsheets/d/${SALON.sheet}/gviz/tq?tqx=out:csv`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(res.status);
    const cats = fromSheet(parseCSV(await res.text()));
    if (cats.length) SALON.categories = cats;
  } catch (e) {
    console.warn("sheet not loaded, using built-in prices", e);
  }
}

function service(item, lang) {
  const t = UI[lang];
  return `
    <article class="item">
      <div class="row">
        <h3>${esc(item.name[lang])}</h3>
        <span class="leader"></span>
        <span class="price">${item.from ? t.from + " " : ""}${esc(item.price)} ${SALON.currency[lang]}</span>
      </div>
      ${item.desc && item.desc[lang] ? `<p class="desc">${esc(item.desc[lang])}</p>` : ""}
      ${item.time ? `<p class="meta">${esc(item.time)} ${t.min}</p>` : ""}
    </article>`;
}

function render(lang) {
  const t = UI[lang];
  document.documentElement.lang = lang;
  document.title = `${SALON.name}: ${t.title}`;

  document.getElementById("name").textContent = SALON.name;
  document.getElementById("tagline").textContent = SALON.tagline[lang];

  document.getElementById("langs").innerHTML = LANGS.map((l) =>
    `<button type="button" data-lang="${l}" aria-pressed="${l === lang}">${l.toUpperCase()}</button>`
  ).join("");

  document.getElementById("tabs").innerHTML = SALON.categories.map((c) =>
    `<a href="#${c.id}" data-id="${c.id}">${esc(c.title[lang] || c.title.ro)}</a>`
  ).join("");

  document.getElementById("list").innerHTML = SALON.categories.map((c) => `
    <section id="${c.id}" class="cat">
      <h2>${esc(c.title[lang] || c.title.ro)}</h2>
      ${c.items.map((item) => service(item, lang)).join("")}
    </section>`
  ).join("");

  const tel = "tel:" + SALON.phone.replace(/\s/g, "");
  document.getElementById("book").textContent = t.book;
  document.getElementById("book").href = SALON.booking;
  document.getElementById("call").textContent = t.call;
  document.getElementById("call").href = tel;

  document.getElementById("hours").textContent = SALON.hours[lang];
  document.getElementById("address").textContent = SALON.address;
  const phone = document.getElementById("phone");
  phone.textContent = SALON.phone;
  phone.href = tel;
  document.getElementById("note").textContent = t.demo;

  current = null;
  markTab();
}

document.getElementById("langs").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  try { localStorage.setItem("lang", btn.dataset.lang); } catch (e) {}
  render(btn.dataset.lang);
});

let current;
function markTab() {
  const tabs = document.getElementById("tabs");
  let id = SALON.categories[0].id;
  document.querySelectorAll(".cat").forEach((s) => {
    if (s.getBoundingClientRect().top < 120) id = s.id;
  });
  if (innerHeight + scrollY >= document.body.scrollHeight - 4) {
    id = SALON.categories.at(-1).id;
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
