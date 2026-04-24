// Bruno Elias Portfolio — app logic: i18n, reveal, lang switcher, modals

(function () {
  const LANGS = window.LANG_META;
  const I18N = window.I18N;

  // ---------- Language detection & state ----------
  function detectDefaultLang() {
    const saved = localStorage.getItem("be_lang");
    if (saved && LANGS[saved]) return { lang: saved, auto: false };

    // Check timezone — Europe/Zurich → DE-CH preferred
    let tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    if (tz === "Europe/Zurich") return { lang: "de-CH", auto: true };

    const nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("de")) return { lang: "de-CH", auto: true };
    if (nav.startsWith("fr")) return { lang: "fr", auto: true };
    if (nav.startsWith("it")) return { lang: "it", auto: true };
    if (nav.startsWith("pt")) return { lang: "pt-BR", auto: true };
    return { lang: "en", auto: true };
  }

  let state = detectDefaultLang();

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.en;
    document.documentElement.setAttribute("lang", LANGS[lang].htmlLang);
    document.querySelectorAll("[data-t]").forEach(el => {
      const k = el.getAttribute("data-t");
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll("[data-t-ph]").forEach(el => {
      const k = el.getAttribute("data-t-ph");
      if (dict[k] != null) el.setAttribute("placeholder", dict[k]);
    });
    // Update lang label in header/footer
    const cur = document.querySelector("[data-lang-current]");
    if (cur) cur.textContent = LANGS[lang].short;
    const footVer = document.querySelector("[data-foot-lang]");
    if (footVer) footVer.textContent = "[" + LANGS[lang].short + "]";
    // Active state in menu
    document.querySelectorAll(".lang-opt").forEach(opt => {
      opt.classList.toggle("is-active", opt.getAttribute("data-lang") === lang);
    });
    state.lang = lang;
    localStorage.setItem("be_lang", lang);
  }

  // ---------- Language switcher UI ----------
  function initLangSwitcher() {
    const root = document.querySelector(".lang");
    const btn = root.querySelector(".lang-btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      root.classList.toggle("open");
    });
    document.addEventListener("click", () => root.classList.remove("open"));
    root.querySelectorAll(".lang-opt").forEach(opt => {
      opt.addEventListener("click", () => {
        applyLang(opt.getAttribute("data-lang"));
        root.classList.remove("open");
        hideHint();
      });
    });
  }

  function maybeShowAutoHint() {
    if (!state.auto) return;
    if (localStorage.getItem("be_hint_seen") === "1") return;
    if (state.lang === "en" && (navigator.language || "en").toLowerCase().startsWith("en")) return;
    const el = document.querySelector(".lang-hint");
    if (!el) return;
    setTimeout(() => el.classList.add("show"), 1400);
    el.querySelector("button").addEventListener("click", hideHint);
  }
  function hideHint() {
    const el = document.querySelector(".lang-hint");
    if (el) el.classList.remove("show");
    localStorage.setItem("be_hint_seen", "1");
  }

  // ---------- Reveal on scroll ----------
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));
  }

  // ---------- Side rail active tracking ----------
  function initRailActive() {
    const links = [...document.querySelectorAll(".siderail a[href^='#']")];
    const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    if (!sections.length) return;
    function update() {
      const y = window.scrollY + window.innerHeight * 0.35;
      let active = sections[0];
      for (const s of sections) if (s.offsetTop <= y) active = s;
      links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + active.id));
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // ---------- Modal ----------
  function initModal() {
    const root = document.getElementById("case-modal");
    const backdrop = root.querySelector(".modal-backdrop");
    const closeBtn = root.querySelector(".modal-close");
    function open(id) {
      const tpl = document.getElementById("case-tpl-" + id);
      if (!tpl) return;
      root.querySelector(".modal-content").innerHTML = tpl.innerHTML;
      // re-apply translations inside modal
      applyLang(state.lang);
      root.classList.add("show");
      document.body.style.overflow = "hidden";
    }
    function close() {
      root.classList.remove("show");
      document.body.style.overflow = "";
    }
    backdrop.addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    document.querySelectorAll("[data-case]").forEach(c => {
      c.addEventListener("click", () => open(c.getAttribute("data-case")));
    });
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    applyLang(state.lang);
    initLangSwitcher();
    initReveal();
    initRailActive();
    initModal();
    maybeShowAutoHint();
  });
})();
