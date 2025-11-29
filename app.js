/* =======================================
   🌿 Raumpsychologie v3 – app.js
   ======================================= */

import { t, setLangFromUI, initLangUI, applyI18n } from "./i18n.js";
import { exportData, importData, State, setThemeFromToggle, initThemeUI } from "./state.js";
import { renderIntro } from "./intro.js";
import { renderWohnung } from "./wohnung.js";
import { renderRaumScan } from "./raumscan.js";
import { renderResonanz } from "./resonanz.js";
import { renderBindung } from "./bindung.js";
import { renderRestladung } from "./restladung.js";
import { renderMiniReset } from "./minireset.js";
import { renderMusterArchiv } from "./musterarchiv.js";
import { renderRahmung } from "./rahmung.js";
import { renderDiplomatie } from "./diplomatie.js";
import { route, renderRoute } from "./router.js";

/* ---------- ROUTING ---------- */
route("/intro", renderIntro);
route("/wohnung", renderWohnung);
route("/raumscan", renderRaumScan);
route("/resonanz", renderResonanz);
route("/bindung", renderBindung);
route("/restladung", renderRestladung);
route("/minireset", renderMiniReset);
route("/musterarchiv", renderMusterArchiv);
route("/rahmung", renderRahmung);
route("/diplomatie", renderDiplomatie);

/* ---------- EXPORT / IMPORT ---------- */
const btnExport = document.getElementById("btn-export");
const btnImport = document.getElementById("btn-import");
const fileImport = document.getElementById("file-import");

btnExport.addEventListener("click", exportData);
btnImport.addEventListener("click", () => fileImport.click());
fileImport.addEventListener("change", async (e) => {
  if (e.target.files?.[0]) {
    await importData(e.target.files[0]);
    alert(t("msg_import_ok"));
    location.reload();
  }
});

/* ---------- LANGUAGE & THEME ---------- */
initLangUI();
initThemeUI();
applyI18n(); // initial texts

document.getElementById("lang").addEventListener("change", setLangFromUI);
document.getElementById("theme-toggle").addEventListener("click", setThemeFromToggle);

/* ---------- SERVICE WORKER ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(console.warn);
  });
}

/* ---------- START OVERLAY ---------- */
function showStartOverlay() {
  // No start overlay is implemented, just render the route directly
  renderRoute();
}

/* ---------- SAVE INDICATOR ---------- */
export function showSaveIndicator() {
  const ind = document.getElementById("save-indicator");
  if (!ind) return;
  ind.hidden = false;
  ind.classList.add("show");
  clearTimeout(ind._timer);
  ind._timer = setTimeout(() => ind.classList.remove("show"), 1600);
}

/* ---------- AUTO-SAVE BLINK ---------- */
export function showSaveBlink() {
  const blink = document.getElementById("save-blink");
  if (!blink) return;
  blink.classList.add("active");
  clearTimeout(blink._timer);
  blink._timer = setTimeout(() => blink.classList.remove("active"), 900);
}

// Expose save indicator functions globally for state.js
window.showSaveIndicator = showSaveIndicator;
window.showSaveBlink = showSaveBlink;

/* ---------- INITIAL START ---------- */
showStartOverlay();

/* ---------- HAMBURGER NAV ---------- */
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawerOverlay");
const navToggle = document.getElementById("navToggle");
const closeDrawer = document.getElementById("closeDrawer");

function openDrawer() {
  drawer.classList.add("open");
  overlay.classList.add("open");
}

function closeDrawerFn() {
  drawer.classList.remove("open");
  overlay.classList.remove("open");
}

navToggle.addEventListener("click", openDrawer);
closeDrawer.addEventListener("click", closeDrawerFn);
overlay.addEventListener("click", closeDrawerFn);

/* ---------- MENU NAV (in header toolbar) ---------- */
const menuToggle = document.getElementById("menu-toggle");
const navOverlay = document.getElementById("nav-overlay");
const navClose = document.getElementById("nav-close");
const navDrawer = document.getElementById("nav-drawer");

if (menuToggle && navOverlay && navClose) {
  menuToggle.addEventListener("click", () => {
    navOverlay.hidden = false;
  });
  navClose.addEventListener("click", () => {
    navOverlay.hidden = true;
  });
  navOverlay.addEventListener("click", (e) => {
    if (navDrawer && !navDrawer.contains(e.target)) {
      navOverlay.hidden = true;
    }
  });
}
