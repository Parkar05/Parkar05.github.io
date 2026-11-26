(function () {
  var C = window.PORTFOLIO || {};
  function setText(sel, v) { document.querySelectorAll(sel).forEach(function (el) { el.textContent = v; }); }
  function setHref(sel, v) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (v) { el.href = v; } else { el.style.display = "none"; }
    });
  }
  setText("[data-name]", C.name || "");
  setText("[data-role]", C.role || "");
  setText("[data-location]", C.location || "");
  setText("[data-open]", C.openTo || "");
  setText("[data-year]", new Date().getFullYear());
  setHref("[data-email]", C.email ? "mailto:" + C.email : "");
  setText("[data-email-text]", C.email || "");
  setHref("[data-linkedin]", C.linkedin);
  setHref("[data-github]", C.github);
  setHref("[data-cv]", C.cv);
  if (C.name) document.title = document.title.replace("Your Name", C.name);

  // Initials badge
  setText("[data-initials]", (C.name || "").split(/\s+/).map(function (w) { return w[0] || ""; }).join("").slice(0, 2).toUpperCase());

  // Live report embeds
  document.querySelectorAll("[data-report]").forEach(function (box) {
    var key = box.getAttribute("data-report");
    var url = (C.reports || {})[key];
    var full = document.querySelector('[data-report-link="' + key + '"]');
    if (url) {
      var f = document.createElement("iframe");
      f.src = url; f.title = box.getAttribute("data-title") || "Power BI report";
      f.setAttribute("allowfullscreen", "true"); f.loading = "lazy";
      box.innerHTML = ""; box.appendChild(f); box.classList.add("live");
      if (full) full.href = url;
    } else if (full) { full.style.display = "none"; }
  });
  // Card status pills
  document.querySelectorAll("[data-status]").forEach(function (el) {
    var key = el.getAttribute("data-status");
    var live = key === "churn" ? !!(C.churn && C.churn.app) : !!(C.reports || {})[key];
    el.textContent = live ? "Live" : "Coming soon";
    el.classList.add(live ? "is-live" : "is-soon");
  });
  // Churn links
  setHref("[data-churn-app]", C.churn && C.churn.app);
  setHref("[data-churn-repo]", C.churn && C.churn.repo);
  var cbox = document.querySelector("[data-churn-embed]");
  if (cbox && C.churn && C.churn.app) {
    var f = document.createElement("iframe");
    f.src = C.churn.app + (C.churn.app.indexOf("?") > -1 ? "&" : "?") + "embed=true";
    f.title = "Churn prediction app"; f.loading = "lazy";
    cbox.innerHTML = ""; cbox.appendChild(f); cbox.classList.add("live", "tall");
  }
})();
// Mobile menu
(function () {
  var btn = document.querySelector(".menu-btn"), nav = document.querySelector(".nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("menu-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("menu-open"); btn.setAttribute("aria-expanded", "false"); });
  });
})();
