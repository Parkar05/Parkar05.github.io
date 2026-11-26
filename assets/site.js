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
// ---- v9 extras: photo, certificate, thumbnails, videos, visitor stats ----
(function () {
  var C = window.PORTFOLIO || {};
  var ROOT = document.querySelector('link[rel="stylesheet"][href*="assets/style.css"]').getAttribute("href").split("assets/")[0];
  function asset(u) { return /^https?:/.test(u) ? u : ROOT + u; }
  if (C.photo) {
    document.querySelectorAll("[data-photo]").forEach(function (img) { img.src = asset(C.photo); });
    document.querySelectorAll("[data-photo-wrap]").forEach(function (w) { w.style.display = ""; });
  }
  var box = document.querySelector("[data-certs]");
  if (box && C.certificates) {
    box.innerHTML = C.certificates.map(function (c) {
      var name = c.link ? '<a href="' + c.link + '" target="_blank" rel="noopener">' + c.name + '</a>' : c.name;
      return '<div class="certi"><b>' + name + '</b><span>' + c.issuer + (c.date ? ' · ' + c.date : '') + '</span></div>';
    }).join("");
  }
  var T = C.thumbs || {};
  document.querySelectorAll("[data-thumb]").forEach(function (d) {
    var u = T[d.getAttribute("data-thumb")];
    if (u) { d.style.backgroundImage = "url('" + asset(u) + "')"; d.classList.add("has"); } else { d.remove(); }
  });
  function videoEmbed(u) {
    var m = u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    if (m) return "https://www.youtube-nocookie.com/embed/" + m[1] + "?rel=0";
    var l = u.match(/loom\.com\/(?:share|embed)\/([\w]+)/);
    if (l) return "https://www.loom.com/embed/" + l[1];
    return u;
  }
  var V = C.videos || {};
  document.querySelectorAll("[data-video]").forEach(function (box) {
    var key = box.getAttribute("data-video"), u = V[key];
    if (!u) return;
    var f = document.createElement("iframe");
    f.src = videoEmbed(u); f.title = "Walkthrough video"; f.loading = "lazy";
    f.setAttribute("allow", "fullscreen; picture-in-picture"); f.setAttribute("allowfullscreen", "true");
    box.appendChild(f);
    var sec = document.querySelector('[data-video-section="' + key + '"]'); if (sec) sec.style.display = "";
  });
  if (C.goatcounter && location.protocol.indexOf("http") === 0) {
    var s = document.createElement("script");
    s.async = true; s.src = "//gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://" + C.goatcounter + ".goatcounter.com/count");
    document.body.appendChild(s);
  }
})();
