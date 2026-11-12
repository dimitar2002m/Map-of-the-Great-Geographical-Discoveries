/* Великите географски открития – допълнения към qgis2web експорта:
   три периода (ок. 1300 / 1500 / 1783), стрелки по маршрутите, popup със снимка,
   двуезична таблица, легенда и надписи. Зарежда се СЛЕД resources/qgis2web.js. */
(function () {
  'use strict';

  var OCEAN = '#c3d3ed', LAND = '#fef4d0', LINE = '#5a73bd', NAVY = '#2d3192', INK = '#231f20';
  var FONT = '"Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, "Noto Sans", sans-serif';
  var READ = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' };
  var WORLD_W = 40075016.686;

  var qs = new URLSearchParams(location.search);
  var lang = qs.get('lang') === 'en' ? 'en' : 'bg';
  var periodId = XP.periods.some(function (p) { return p.id === qs.get('period'); }) ? qs.get('period') : '1500';

  function L(o) { return o ? (o[lang] || o.bg || '') : ''; }
  function other(o) { return o ? (o[lang === 'bg' ? 'en' : 'bg'] || '') : ''; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function ui() { return XP.ui[lang]; }
  function period() { return XP.periods.filter(function (p) { return p.id === periodId; })[0]; }
  function extentOf(p) { return ol.proj.transformExtent(p.extent, 'EPSG:4326', 'EPSG:3857'); }

  /* ================= изглед ================= */
  var view = new ol.View({ multiWorld: true, constrainResolution: false, center: [0, 0], zoom: 2, maxZoom: 12 });
  map.setView(view);
  map.updateSize();
  var worldExtent = ol.proj.transformExtent([-133, -57, 187, 81], 'EPSG:4326', 'EPSG:3857');
  view.fit(worldExtent, { size: map.getSize() });
  var fitRes = view.getResolution();                       // мащаб на надписите
  view.setMinZoom(view.getZoomForResolution(fitRes * 1.35));
  var viewScale = Math.max(0.78, Math.min(1.15, window.innerWidth / 1300));
  function zs(res) { return viewScale * Math.max(0.85, Math.min(2.2, Math.pow(fitRes / res, 0.5))); }
  function fitPeriod(animate) {
    view.fit(extentOf(period()), { size: map.getSize(), duration: animate ? 800 : 0 });
  }

  /* ================= основа: суша и държави за всеки период ================= */
  var polyStyles = {};
  var landStyle = new ol.style.Style({ fill: new ol.style.Fill({ color: LAND }), stroke: new ol.style.Stroke({ color: LINE, width: 1 }) });
  function polyStyle(f) {
    var c = f.get('fill');
    return polyStyles[c] || (polyStyles[c] = new ol.style.Style({
      fill: new ol.style.Fill({ color: c }), stroke: new ol.style.Stroke({ color: LINE, width: 0.9 })
    }));
  }
  var baseLayers = [];
  XP.periods.forEach(function (p) {
    var fmt = new ol.format.GeoJSON();
    p.lyrLand = new ol.layer.Vector({ source: new ol.source.Vector({ features: fmt.readFeatures(window[p.land], READ) }), style: landStyle });
    p.lyrPol = new ol.layer.Vector({ source: new ol.source.Vector({ features: fmt.readFeatures(window[p.pol], READ) }), style: polyStyle });
    baseLayers.push(p.lyrLand, p.lyrPol);
  });

  /* ================= маршрути със стрелки ================= */
  function arrowSrc(color) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22">' +
      '<path d="M10 0 L20 22 L10 16.5 L0 22 Z" fill="' + color + '" stroke="' + color +
      '" stroke-width="1" stroke-linejoin="round"/></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  function cumulative(c) {
    var cum = [0];
    for (var i = 1; i < c.length; i++) cum.push(cum[i - 1] + Math.hypot(c[i][0] - c[i - 1][0], c[i][1] - c[i - 1][1]));
    return cum;
  }
  function pointAt(c, cum, d) {
    if (d <= 0) return c[0];
    if (d >= cum[cum.length - 1]) return c[c.length - 1];
    for (var i = 1; i < cum.length; i++) {
      if (cum[i] >= d) {
        var t = (d - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1);
        return [c[i - 1][0] + t * (c[i][0] - c[i - 1][0]), c[i - 1][1] + t * (c[i][1] - c[i - 1][1])];
      }
    }
    return c[c.length - 1];
  }
  function routeStyle(color) {
    var src = arrowSrc(color);
    return function (feature, res) {
      var hl = !!feature.get('xp_hl'), styles = [];
      if (hl) styles.push(new ol.style.Style({ stroke: new ol.style.Stroke({ color: 'rgba(255,255,255,.9)', width: 8, lineCap: 'round' }) }));
      styles.push(new ol.style.Style({
        stroke: new ol.style.Stroke({ color: color, width: hl ? 4 : 3, lineDash: [10, 7], lineCap: 'butt', lineJoin: 'round' })
      }));
      var g = feature.getGeometry();
      var lines = g.getType() === 'MultiLineString' ? g.getCoordinates() : [g.getCoordinates()];
      lines.forEach(function (c) {
        if (c.length < 2) return;
        var cum = cumulative(c), total = cum[cum.length - 1];
        var segs = Math.max(1, Math.round(total / res / 340));   // ~1 стрелка на 340 px
        for (var k = 1; k <= segs; k++) {
          var d = total * k / segs, isEnd = (k === segs);
          var back = Math.min(d, 9 * res), p0 = pointAt(c, cum, d - back), p1 = pointAt(c, cum, d + (isEnd ? 0 : 4 * res));
          var ang = Math.atan2(p1[0] - p0[0], p1[1] - p0[1]);
          styles.push(new ol.style.Style({
            geometry: new ol.geom.Point(pointAt(c, cum, d)),
            image: new ol.style.Icon({
              src: src, imgSize: [20, 22], anchor: [0.5, isEnd ? 0.12 : 0.5], rotation: ang,
              rotateWithView: false, scale: hl ? 1.2 : 1
            })
          }));
        }
      });
      return styles;
    };
  }

  /* --- слоеве по групи (държава); старите идват от QGIS, новите от layers/routes_new.js --- */
  var routeLayers = [], allRows = [];
  var newFeatures = new ol.format.GeoJSON().readFeatures(window.json_routes_new, READ);
  XP.layers.forEach(function (cfg) {
    cfg.on = true;
    if (cfg.layer) {
      cfg.lyr = window[cfg.layer];
      cfg.kp = cfg.layer;
    } else {
      cfg.kp = cfg.grp;
      cfg.lyr = new ol.layer.Vector({
        source: new ol.source.Vector({ features: newFeatures.filter(function (f) { return f.get('grp') === cfg.grp; }) })
      });
    }
    cfg.lyr.setStyle(routeStyle(cfg.color));
    cfg.lyr.set('xp_routes', true);
    cfg.lyr.set('interactive', true);
    routeLayers.push(cfg.lyr);
    cfg.lyr.getSource().getFeatures().forEach(function (f) {
      var key = cfg.kp + ':' + f.get('id'), d = XP.exp[key];
      if (!d) return;
      f.set('xp_key', key); f.set('xp_cfg', cfg); f.set('xp_d', d);
      f.set('xp_year', parseInt(f.get('Годин'), 10));
      allRows.push(f);
    });
  });
  var rows = [];
  function rowsFor(pid) {
    return allRows.filter(function (f) { return f.get('xp_cfg').period === pid; }).sort(function (a, b) {
      return a.get('xp_year') - b.get('xp_year') || String(a.get('xp_key')).localeCompare(b.get('xp_key'));
    });
  }

  /* ================= градове/пристанища (само точка + надпис, без легенда) ================= */
  var placeFeatures = [];
  Object.keys(XP.places).forEach(function (pid) {
    XP.places[pid].forEach(function (pl) {
      var f = new ol.Feature({ geometry: new ol.geom.Point(ol.proj.fromLonLat(pl.ll)) });
      f.setProperties({ p: pid, bg: pl.bg, en: pl.en, al: pl.align });
      placeFeatures.push(f);
    });
  });
  // периодът 1500: столиците идват от QGIS слоя "Столици"
  window.lyr__1.getSource().getFeatures().forEach(function (cf) {
    var nm = cf.get('Име'), c = XP.capitals[nm] || {};
    var f = new ol.Feature({ geometry: cf.getGeometry().clone() });
    f.setProperties({ p: '1500', bg: c.bg || nm, en: c.en || nm, al: c.align || 'right' });
    placeFeatures.push(f);
  });
  var lyrPlaces = new ol.layer.Vector({
    source: new ol.source.Vector({ features: placeFeatures }),
    declutter: false,
    style: function (f, res) {
      if (f.get('p') !== periodId) return null;
      var s = zs(res), left = f.get('al') === 'left';
      return new ol.style.Style({
        image: new ol.style.Circle({ radius: 4.6 * Math.min(s, 1.4), fill: new ol.style.Fill({ color: INK }) }),
        text: new ol.style.Text({
          text: f.get(lang) || f.get('bg'), font: '500 ' + (12.5 * s).toFixed(1) + 'px ' + FONT,
          fill: new ol.style.Fill({ color: INK }),
          stroke: new ol.style.Stroke({ color: 'rgba(254,244,208,.85)', width: 3 }),
          textAlign: left ? 'right' : 'left', textBaseline: 'middle',
          offsetX: (left ? -1 : 1) * 9 * Math.min(s, 1.4)
        })
      });
    }
  });

  /* ================= надписи: океани, континенти, държави, острови ================= */
  function spaceOut(s) {
    return s.split('\n').map(function (line) {
      return line.split(' ').map(function (w) { return Array.from(w).join(' '); }).join(' ');
    }).join('\n');
  }
  var lyrLabels = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: XP.labels.map(function (l) {
        var f = new ol.Feature({ geometry: new ol.geom.Point(ol.proj.fromLonLat(l.ll)) });
        f.setProperties({ p: l.p || '', t: l.t, sp: l.sp, bg: l.bg, en: l.en, rot: l.rot || 0, al: l.al || 'center' });
        return f;
      })
    }),
    declutter: false,
    style: function (f, res) {
      if (f.get('p') && f.get('p') !== periodId) return null;
      var s = zs(res), t = f.get('t'), txt = f.get(lang) || f.get('bg');
      if (f.get('sp')) txt = spaceOut(txt);
      var font, fill = INK, halo = null;
      if (t === 'ocean') { font = 'italic 600 ' + (15 * s).toFixed(1) + 'px ' + FONT; fill = NAVY; }
      else if (t === 'continent') { font = '600 ' + (14 * s).toFixed(1) + 'px ' + FONT; }
      else if (t === 'place') { font = '500 ' + (11.5 * s).toFixed(1) + 'px ' + FONT; fill = NAVY; }
      else if (t === 'num') { font = '700 ' + (13 * s).toFixed(1) + 'px ' + FONT; }
      else { font = '500 ' + (11.5 * s).toFixed(1) + 'px ' + FONT; halo = 'rgba(255,255,255,.35)'; }
      return new ol.style.Style({
        text: new ol.style.Text({
          text: txt, font: font, fill: new ol.style.Fill({ color: fill }),
          stroke: halo ? new ol.style.Stroke({ color: halo, width: 2.5 }) : null,
          rotation: (f.get('rot') || 0) * Math.PI / 180, textAlign: f.get('al'), textBaseline: 'middle',
          overflow: true, padding: [2, 2, 2, 2]
        })
      });
    }
  });

  /* --- подреждане на слоевете --- */
  map.getLayers().clear();
  baseLayers.concat(routeLayers, [lyrPlaces, lyrLabels]).forEach(function (l) { map.addLayer(l); });
  try { jsonSource_world_1500_0.clear(); } catch (e) { /* старият слой вече не се ползва */ }

  /* ================= popup със снимка ================= */
  map.un('singleclick', onSingleClickFeatures);   // замества стандартния popup на qgis2web
  var openHits = [];

  window.xpImgFail = function (img) {
    var exts = ['jpg', 'jpeg', 'png', 'webp'];
    var i = (parseInt(img.getAttribute('data-try'), 10) || 0) + 1;
    if (i < exts.length) {
      img.setAttribute('data-try', i);
      img.src = 'images/' + img.getAttribute('data-photo') + '.' + exts[i];
      return;
    }
    var av = document.createElement('div');
    av.className = 'xp-avatar';
    av.textContent = img.getAttribute('data-initials');
    av.setAttribute('role', 'img');
    av.setAttribute('aria-label', img.getAttribute('alt') || '');
    img.replaceWith(av);
  };
  function initials(name) {
    var w = name.replace(/\(.*?\)/g, '').trim().split(/\s+/);
    return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase();
  }
  function photoHTML(d) {
    var nm = L(d.name);
    return '<img class="xp-photo" src="images/' + esc(d.photo) + '.jpg" data-photo="' + esc(d.photo) +
      '" data-try="0" data-initials="' + esc(initials(nm)) + '" alt="' + esc(ui().photoOf + ' ' + nm) +
      '" loading="lazy" onerror="xpImgFail(this)">';
  }
  function cardHTML(f) {
    var d = f.get('xp_d'), cfg = f.get('xp_cfg'), t = ui().popup;
    return '<div class="xp-card" style="--c:' + cfg.color + '">' + photoHTML(d) +
      '<div class="xp-info"><div class="xp-name">' + esc(L(d.name)) + '</div>' +
      '<div class="xp-sub">' + esc(other(d.name)) + '<br>' + esc(L(d.life)) + '</div>' +
      '<div class="xp-chips"><span class="xp-chip">' + f.get('xp_year') + '</span></div>' +
      '<dl><dt>' + esc(t.country) + '</dt><dd>' + esc(L(d.country)) + '</dd>' +
      '<dt>' + esc(t.from) + '</dt><dd>' + esc(L(d.from)) + '</dd></dl></div>' +
      '<p class="xp-desc"><b>' + esc(t.discovery) + ':</b> ' + esc(L(d.desc)) + '</p></div>';
  }
  function setHighlight(list) {
    allRows.forEach(function (f) { if (f.get('xp_hl')) f.set('xp_hl', false); });
    list.forEach(function (f) { f.set('xp_hl', true); });
  }
  function showPopup(features, coord, maxH) {
    openHits = features;
    content.style.maxHeight = maxH ? maxH + 'px' : '';
    content.innerHTML = features.map(cardHTML).join('');
    container.style.display = 'block';
    overlayPopup.setPosition(coord);
    setHighlight(features);
  }
  function hidePopup() {
    openHits = [];
    container.style.display = 'none';
    setHighlight([]);
  }
  closer.addEventListener('click', function () { openHits = []; setHighlight([]); });

  map.on('singleclick', function (evt) {
    var hits = [];
    map.forEachFeatureAtPixel(evt.pixel, function (f) {
      if (f.get('xp_key') && hits.indexOf(f) < 0) hits.push(f);
    }, { hitTolerance: 7, layerFilter: function (l) { return !!l.get('xp_routes') && l.getVisible(); } });
    if (hits.length) showPopup(hits, evt.coordinate); else hidePopup();
  });

  /* ================= легенда ================= */
  var legendEl = document.getElementById('xp-legend');
  function swatch(color) {
    return '<svg width="44" height="14" viewBox="0 0 44 14" aria-hidden="true">' +
      '<line x1="2" y1="7" x2="33" y2="7" stroke="' + color + '" stroke-width="3" stroke-dasharray="7 4"/>' +
      '<path d="M31 1.5 L43 7 L31 12.5 L34 7 Z" fill="' + color + '"/></svg>';
  }
  function groupsOf(pid) { return XP.layers.filter(function (c) { return c.period === pid; }); }
  function renderLegend() {
    legendEl.innerHTML = '<h2>' + esc(ui().legendTitle) + '</h2>' + groupsOf(periodId).map(function (cfg) {
      return '<label><input type="checkbox" data-id="' + cfg.id + '"' + (cfg.on ? ' checked' : '') + '>' +
        swatch(cfg.color) + '<span>' + esc(L(cfg.name)) + '</span></label>';
    }).join('') + '<p class="xp-note">' + esc(L(period().note)) + '</p>';
    Array.prototype.forEach.call(legendEl.querySelectorAll('input'), function (inp) {
      inp.addEventListener('change', function () {
        var cfg = XP.layers.filter(function (c) { return c.id === inp.getAttribute('data-id'); })[0];
        cfg.on = inp.checked;
        cfg.lyr.setVisible(cfg.on);
        if (!cfg.on) hidePopup();
      });
    });
  }

  /* ================= атрибутивна таблица ================= */
  var tableEl = document.getElementById('xp-table');
  var tableBtn = document.getElementById('xp-btn-table');
  function renderTable() {
    var c = ui().cols;
    var html = '<div class="xp-table-head"><h2>' + esc(ui().tableTitle) + ' · ' + esc(L(period().btn)) + '</h2>' +
      '<button type="button" class="xp-close" id="xp-table-close" aria-label="' + esc(ui().close) + '">×</button></div>' +
      '<div class="xp-table-wrap"><table class="xp-tbl"><thead><tr>' +
      ['route', 'explorer', 'year', 'country', 'from', 'discovery'].map(function (k) { return '<th scope="col">' + esc(c[k]) + '</th>'; }).join('') +
      '</tr></thead><tbody>';
    rows.forEach(function (f, i) {
      var d = f.get('xp_d'), cfg = f.get('xp_cfg');
      html += '<tr tabindex="0" data-i="' + i + '">' +
        '<td class="xp-c-route">' + swatch(cfg.color) + '</td>' +
        '<td class="xp-c-name"><strong>' + esc(L(d.name)) + '</strong><span class="xp-sec">' + esc(other(d.name)) + '</span></td>' +
        '<td class="xp-c-year">' + f.get('xp_year') + '</td>' +
        '<td>' + esc(L(d.country)) + '<span class="xp-sec">' + esc(other(d.country)) + '</span></td>' +
        '<td>' + esc(L(d.from)) + '<span class="xp-sec">' + esc(other(d.from)) + '</span></td>' +
        '<td class="xp-c-desc">' + esc(L(d.desc)) + '</td></tr>';
    });
    tableEl.innerHTML = html + '</tbody></table></div>';
    document.getElementById('xp-table-close').addEventListener('click', function () { toggleTable(false); });
    Array.prototype.forEach.call(tableEl.querySelectorAll('tbody tr'), function (tr) {
      var f = rows[+tr.getAttribute('data-i')];
      tr.addEventListener('mouseenter', function () { f.set('xp_hl', true); });
      tr.addEventListener('mouseleave', function () { if (openHits.indexOf(f) < 0) f.set('xp_hl', false); });
      tr.addEventListener('click', function () { focusRoute(f); });
      tr.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); focusRoute(f); } });
    });
  }
  function toggleTable(open) {
    if (open === undefined) open = !tableEl.classList.contains('open');
    tableEl.classList.toggle('open', open);
    document.body.classList.toggle('xp-table-open', open);
    tableBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    placeLegend();
  }
  function placeLegend() {
    legendEl.style.bottom = (tableEl.classList.contains('open') ? tableEl.offsetHeight + 24 : 12) + 'px';
  }
  function focusRoute(f) {
    var cfg = f.get('xp_cfg');
    if (!cfg.on) { cfg.on = true; cfg.lyr.setVisible(true); renderLegend(); }
    var g = f.getGeometry(), ls = g.getType() === 'MultiLineString' ? g.getLineString(0) : g;
    var pad = tableEl.classList.contains('open') ? tableEl.offsetHeight + 30 : 70;
    view.fit(g.getExtent(), { size: map.getSize(), padding: [70, 70, pad, 70], duration: 700, maxZoom: 6 });
    setTimeout(function () {
      // точка от маршрута във видимата част (над таблицата), най-близка до центъра по хоризонтала
      var sz = map.getSize(), cx = sz[0] / 2;
      var bottom = sz[1] - (tableEl.classList.contains('open') ? tableEl.offsetHeight : 0) - 24;
      var best = null, bs = Infinity, bpy = 0;
      ls.getCoordinates().forEach(function (c) {
        [-WORLD_W, 0, WORLD_W].forEach(function (o) {
          var px = map.getPixelFromCoordinate([c[0] + o, c[1]]);
          if (px[0] < 40 || px[0] > sz[0] - 40 || px[1] < 200 || px[1] > bottom) return;
          var sc = Math.abs(px[0] - cx) + 0.4 * Math.abs(px[1] - bottom);
          if (sc < bs) { bs = sc; best = [c[0] + o, c[1]]; bpy = px[1]; }
        });
      });
      if (!best) { best = ls.getCoordinateAt(0.5); bpy = map.getPixelFromCoordinate(best)[1]; }
      showPopup([f], best, Math.max(180, bpy - 40));
    }, 740);
  }
  tableBtn.addEventListener('click', function () { toggleTable(); });

  /* ================= период и език ================= */
  var periodEl = document.getElementById('xp-period');
  var captionEl = document.getElementById('xp-caption');
  function renderPeriodButtons() {
    periodEl.innerHTML = XP.periods.map(function (p) {
      var on = p.id === periodId;
      return '<button type="button" data-p="' + p.id + '" class="' + (on ? 'on' : '') + '" aria-pressed="' + on +
        '" title="' + esc(L(p.name)) + '">' + esc(L(p.btn)) + '</button>';
    }).join('');
    Array.prototype.forEach.call(periodEl.querySelectorAll('button'), function (b) {
      b.addEventListener('click', function () { setPeriod(b.getAttribute('data-p'), true); });
    });
  }
  function updateUrl() {
    var q = [];
    if (periodId !== '1500') q.push('period=' + periodId);
    if (lang === 'en') q.push('lang=en');
    try { history.replaceState(null, '', q.length ? '?' + q.join('&') : location.pathname); } catch (e) { /* file:// */ }
  }
  function applyPeriod() {
    XP.periods.forEach(function (p) {
      var on = p.id === periodId;
      p.lyrLand.setVisible(on); p.lyrPol.setVisible(on);
    });
    XP.layers.forEach(function (cfg) { cfg.lyr.setVisible(cfg.period === periodId && cfg.on); });
    rows = rowsFor(periodId);
    lyrPlaces.changed(); lyrLabels.changed();
  }
  function setPeriod(id, animate) {
    periodId = id;
    hidePopup();
    applyPeriod();
    renderPeriodButtons(); renderLegend(); renderTable(); renderCaption();
    fitPeriod(animate);
    placeLegend(); updateUrl();
  }
  function renderCaption() { captionEl.textContent = L(period().name); }

  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    document.title = ui().pageTitle;
    Array.prototype.forEach.call(document.querySelectorAll('#xp-lang button'), function (b) {
      var on = b.getAttribute('data-lang') === l;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    tableBtn.querySelector('span').textContent = ui().tableBtn;
    renderPeriodButtons(); renderLegend(); renderTable(); renderCaption();
    lyrLabels.changed(); lyrPlaces.changed();
    if (openHits.length) content.innerHTML = openHits.map(cardHTML).join('');
    placeLegend(); updateUrl();
  }
  Array.prototype.forEach.call(document.querySelectorAll('#xp-lang button'), function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  window.addEventListener('resize', placeLegend);

  applyPeriod();
  fitPeriod(false);
  setLang(lang);
})();
