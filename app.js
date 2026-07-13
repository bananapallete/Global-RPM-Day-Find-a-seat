/* ==========================================================================
   Global RPM Day 좌석 배치도 - 앱 로직
   (렌더링 / pan & pinch-zoom 엔진 / 검색 / 언어 전환)
   ========================================================================== */

(function () {
  "use strict";

  let currentLang = "ko";
  let highlightedSeatId = null;

  const els = {
    world: document.getElementById("world"),
    viewport: document.getElementById("viewport"),
    appTitle: document.getElementById("appTitle"),
    langBtn: document.getElementById("langBtn"),
    langBtnLabel: document.getElementById("langBtnLabel"),
    langMenu: document.getElementById("langMenu"),
    langSelect: document.getElementById("langSelect"),
    overviewBtn: document.getElementById("overviewBtn"),
    overviewBtnLabel: document.getElementById("overviewBtnLabel"),
    searchInput: document.getElementById("searchInput"),
    searchClear: document.getElementById("searchClear"),
    resultsPanel: document.getElementById("resultsPanel"),
    resultsCount: document.getElementById("resultsCount"),
    resultsList: document.getElementById("resultsList"),
    startModal: document.getElementById("startModal"),
    startTeamBtn: document.getElementById("startTeamBtn"),
    startTeamBtnLabel: document.getElementById("startTeamBtnLabel"),
    startSearchBtn: document.getElementById("startSearchBtn"),
    startSearchBtnLabel: document.getElementById("startSearchBtnLabel"),
    teamModal: document.getElementById("teamModal"),
    teamModalBack: document.getElementById("teamModalBack"),
    teamModalBackLabel: document.getElementById("teamModalBackLabel"),
    teamModalTitle: document.getElementById("teamModalTitle"),
    teamModalGrid: document.getElementById("teamModalGrid"),
    langToggle: document.getElementById("langToggle"),
    teamViewBtn: document.getElementById("teamViewBtn")
  };

  /* ======================================================================
     1. 좌석맵 렌더링 (Figma 좌표를 그대로 사용)
     ====================================================================== */
  function renderWorld() {
    const w = LAYOUT.canvasW;
    const h = LAYOUT.canvasH;
    els.world.style.width = w + "px";
    els.world.style.height = h + "px";

    const frag = document.createDocumentFragment();

    // STAGE
    const stage = document.createElement("div");
    stage.className = "stage-block";
    Object.assign(stage.style, {
      left: LAYOUT.stage.x + "px",
      top: LAYOUT.stage.y + "px",
      width: LAYOUT.stage.w + "px",
      height: LAYOUT.stage.h + "px",
      borderRadius: LAYOUT.radius + "px",
      fontSize: LAYOUT.fontSize.stage + "px"
    });
    stage.textContent = "STAGE";
    frag.appendChild(stage);

    // 열 헤더 (1-21) - block1/block2 각각 독립적인 헤더 (열 그룹 순서가 달라 x좌표가 다름)
    BLOCK_COL_HEADERS.forEach((header) => {
      header.cols.forEach((c) => {
        const label = document.createElement("div");
        label.className = "col-label";
        Object.assign(label.style, {
          left: (c.x + LAYOUT.seat / 2) + "px",
          top: header.y + "px",
          width: LAYOUT.rowLabelW + "px",
          height: LAYOUT.seat + "px",
          fontSize: LAYOUT.fontSize.label + "px"
        });
        label.textContent = c.label;
        frag.appendChild(label);
      });
    });

    // 행 라벨 (A-O)
    ROW_LABELS.forEach((rl) => {
      const label = document.createElement("div");
      label.className = "row-label";
      Object.assign(label.style, {
        left: (24 * SCALE_FACTOR) + "px",
        top: rl.y + "px",
        width: LAYOUT.rowLabelW + "px",
        height: LAYOUT.seat + "px",
        fontSize: LAYOUT.fontSize.label + "px"
      });
      label.textContent = rl.row;
      frag.appendChild(label);
    });

    // 기둥 / 출입문 마커
    LAYOUT.markers.forEach((m) => {
      const marker = document.createElement("div");
      marker.className = "marker " + m.type;
      Object.assign(marker.style, {
        left: LAYOUT.markerX + "px",
        top: m.y + "px",
        width: LAYOUT.markerW + "px",
        height: m.h + "px",
        borderRadius: LAYOUT.radius + "px",
        fontSize: LAYOUT.fontSize.marker + "px"
      });
      marker.dataset.i18nKey = m.type; // pillar | door
      marker.textContent = I18N[currentLang][m.type];
      frag.appendChild(marker);
    });

    // 좌석
    SEATS.forEach((seat) => {
      const el = document.createElement("div");
      el.className = "seat";
      el.dataset.seatId = seat.id;
      const box = seatBox(seat, currentLang);
      Object.assign(el.style, {
        left: box.left + "px",
        top: seat.y + "px",
        width: box.width + "px",
        height: LAYOUT.seat + "px",
        borderRadius: LAYOUT.radius + "px",
        fontSize: box.fontSize + "px",
        padding: (2 * SCALE_FACTOR) + "px"
      });
      el.textContent = seatDisplayName(seat, currentLang);
      frag.appendChild(el);
    });

    els.world.innerHTML = "";
    els.world.appendChild(frag);
  }

  // 영문 모드에서는 이름 줄바꿈을 줄이기 위해 박스를 가로로 살짝 넓히고
  // (원래 칸 중심을 유지하도록 좌우 대칭으로), 폰트도 함께 줄인다.
  function seatBox(seat, lang) {
    const isEn = lang === "en";
    const extra = isEn ? LAYOUT.seatWidenExtraEn : 0;
    return {
      left: seat.x - extra / 2,
      width: LAYOUT.seat + extra,
      fontSize: isEn ? LAYOUT.fontSize.seatEn : LAYOUT.fontSize.seat
    };
  }

  function refreshSeatNames() {
    SEATS.forEach((seat) => {
      const el = els.world.querySelector(`.seat[data-seat-id="${seat.id}"]`);
      if (!el) return;
      el.textContent = seatDisplayName(seat, currentLang);
      const box = seatBox(seat, currentLang);
      el.style.left = box.left + "px";
      el.style.width = box.width + "px";
      el.style.fontSize = box.fontSize + "px";
    });
  }

  function refreshMarkerLabels() {
    els.world.querySelectorAll(".marker").forEach((m) => {
      const key = m.dataset.i18nKey;
      m.textContent = I18N[currentLang][key];
    });
  }

  function setHighlight(seatId) {
    if (highlightedSeatId) {
      const prev = els.world.querySelector(`.seat[data-seat-id="${highlightedSeatId}"]`);
      if (prev) prev.classList.remove("is-highlight");
    }
    highlightedSeatId = seatId;
    if (seatId) {
      const cur = els.world.querySelector(`.seat[data-seat-id="${seatId}"]`);
      if (cur) cur.classList.add("is-highlight");
    }
  }

  function clearTeamHighlight() {
    els.world.querySelectorAll(".seat.is-team-highlight").forEach((el) => {
      el.classList.remove("is-team-highlight");
    });
  }

  function highlightTeam(seatIds) {
    clearTeamHighlight();
    seatIds.forEach((id) => {
      const el = els.world.querySelector(`.seat[data-seat-id="${id}"]`);
      if (el) el.classList.add("is-team-highlight");
    });
  }

  /* ======================================================================
     2. Pan & Pinch-zoom 엔진
     ====================================================================== */
  // 좌석/글자를 이미 F배로 크게 그렸으므로, scale:1 근처만 써도 충분히 크고 선명하다.
  // (예전처럼 4~5배까지 확대할 필요가 없어져 블러가 사라진다)
  const view = { scale: 1, tx: 0, ty: 0, minScale: 0.08, maxScale: 1.8 };
  let fitScale = 1;
  const pointers = new Map();
  let pinchStartDist = 0;
  let pinchStartScale = 1;
  let panStart = null;
  let animRAF = null;

  function applyTransform() {
    els.world.style.transform =
      `translate3d(${view.tx}px, ${view.ty}px, 0) scale(${view.scale})`;
  }

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function getViewportSize() {
    const r = els.viewport.getBoundingClientRect();
    return { w: r.width, h: r.height, left: r.left, top: r.top };
  }

  function computeFitScale() {
    const vp = getViewportSize();
    const sx = (vp.w - 24) / LAYOUT.canvasW;
    const sy = (vp.h - 24) / LAYOUT.canvasH;
    return Math.max(0.08, Math.min(sx, sy));
  }

  function fitToScreen(animate) {
    fitScale = computeFitScale();
    view.minScale = fitScale * 0.9;
    const vp = getViewportSize();
    const targetScale = fitScale;
    const targetTx = (vp.w - LAYOUT.canvasW * targetScale) / 2;
    const targetTy = (vp.h - LAYOUT.canvasH * targetScale) / 2;
    if (animate) {
      animateTo(targetScale, targetTx, targetTy, 500);
    } else {
      view.scale = targetScale;
      view.tx = targetTx;
      view.ty = targetTy;
      applyTransform();
    }
    els.overviewBtn.classList.remove("visible");
    setHighlight(null);
    clearTeamHighlight();
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateTo(scale, tx, ty, duration) {
    if (animRAF) cancelAnimationFrame(animRAF);
    const start = { scale: view.scale, tx: view.tx, ty: view.ty };
    const delta = { scale: scale - start.scale, tx: tx - start.tx, ty: ty - start.ty };
    const t0 = performance.now();
    function step(now) {
      const p = clamp((now - t0) / duration, 0, 1);
      const e = easeInOutCubic(p);
      view.scale = start.scale + delta.scale * e;
      view.tx = start.tx + delta.tx * e;
      view.ty = start.ty + delta.ty * e;
      applyTransform();
      if (p < 1) {
        animRAF = requestAnimationFrame(step);
      } else {
        animRAF = null;
      }
    }
    animRAF = requestAnimationFrame(step);
  }

  function focusSeat(seatId) {
    const seat = SEATS.find((s) => s.id === seatId);
    if (!seat) return;
    const vp = getViewportSize();
    const targetScale = clamp(1.15, view.minScale, view.maxScale);
    const cx = seat.x + LAYOUT.seat / 2;
    const cy = seat.y + LAYOUT.seat / 2;
    const targetTx = vp.w / 2 - cx * targetScale;
    const targetTy = vp.h / 2 - cy * targetScale;
    animateTo(targetScale, targetTx, targetTy, 650);
    setHighlight(seatId);
    els.overviewBtn.classList.add("visible");
  }

  function focusTeam(seatIds) {
    if (!seatIds.length) return;
    const seats = seatIds
      .map((id) => SEATS.find((s) => s.id === id))
      .filter(Boolean);
    if (!seats.length) return;

    const minX = Math.min(...seats.map((s) => s.x));
    const maxX = Math.max(...seats.map((s) => s.x + LAYOUT.seat));
    const minY = Math.min(...seats.map((s) => s.y));
    const maxY = Math.max(...seats.map((s) => s.y + LAYOUT.seat));
    const pad = 60;
    const boxW = (maxX - minX) + pad * 2;
    const boxH = (maxY - minY) + pad * 2;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    const vp = getViewportSize();
    const targetScale = clamp(
      Math.min(vp.w / boxW, vp.h / boxH),
      view.minScale,
      view.maxScale
    );
    const targetTx = vp.w / 2 - cx * targetScale;
    const targetTy = vp.h / 2 - cy * targetScale;
    animateTo(targetScale, targetTx, targetTy, 700);
    setHighlight(null);
    highlightTeam(seatIds);
    els.overviewBtn.classList.add("visible");
  }

  function zoomAt(clientX, clientY, factor) {
    const vp = getViewportSize();
    const px = clientX - vp.left;
    const py = clientY - vp.top;
    const newScale = clamp(view.scale * factor, view.minScale, view.maxScale);
    const ratio = newScale / view.scale;
    view.tx = px - (px - view.tx) * ratio;
    view.ty = py - (py - view.ty) * ratio;
    view.scale = newScale;
    applyTransform();
  }

  function dist(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
  }
  function midpoint(p1, p2) {
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  }

  function onPointerDown(e) {
    els.viewport.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      panStart = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty };
    } else if (pointers.size === 2) {
      const pts = Array.from(pointers.values());
      pinchStartDist = dist(pts[0], pts[1]);
      pinchStartScale = view.scale;
    }
  }

  function onPointerMove(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 1 && panStart) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      view.tx = panStart.tx + dx;
      view.ty = panStart.ty + dy;
      applyTransform();
    } else if (pointers.size === 2) {
      const pts = Array.from(pointers.values());
      const d = dist(pts[0], pts[1]);
      const mid = midpoint(pts[0], pts[1]);
      const vp = getViewportSize();
      const px = mid.x - vp.left;
      const py = mid.y - vp.top;
      const newScale = clamp(pinchStartScale * (d / pinchStartDist), view.minScale, view.maxScale);
      const ratio = newScale / view.scale;
      view.tx = px - (px - view.tx) * ratio;
      view.ty = py - (py - view.ty) * ratio;
      view.scale = newScale;
      applyTransform();
    }
  }

  function onPointerUp(e) {
    pointers.delete(e.pointerId);
    if (pointers.size === 1) {
      const remaining = Array.from(pointers.values())[0];
      panStart = { x: remaining.x, y: remaining.y, tx: view.tx, ty: view.ty };
    } else if (pointers.size === 0) {
      panStart = null;
    }
  }

  function onWheel(e) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    zoomAt(e.clientX, e.clientY, factor);
  }

  function setupPanZoom() {
    els.viewport.addEventListener("pointerdown", onPointerDown);
    els.viewport.addEventListener("pointermove", onPointerMove);
    els.viewport.addEventListener("pointerup", onPointerUp);
    els.viewport.addEventListener("pointercancel", onPointerUp);
    els.viewport.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", () => fitToScreen(false));
  }

  /* ======================================================================
     3. 검색
     ====================================================================== */
  function formatSeatCode(seat) {
    return `${seat.row}-${String(seat.col).padStart(2, "0")}`;
  }

  function runSearch(query) {
    const q = query.trim();
    els.searchClear.classList.toggle("visible", q.length > 0);

    if (!q) {
      els.resultsPanel.classList.remove("visible");
      els.resultsList.innerHTML = "";
      return;
    }

    const qLower = q.toLowerCase();
    // 국문/영문 이름 둘 다 대상으로 검색 (현재 언어에 데이터가 없어도 찾을 수 있도록)
    const matches = SEATS.filter((s) =>
      (s.name && s.name.toLowerCase().includes(qLower)) ||
      (s.nameEn && s.nameEn.toLowerCase().includes(qLower))
    );
    els.resultsPanel.classList.add("visible");

    if (matches.length === 0) {
      els.resultsCount.textContent = "";
      els.resultsList.innerHTML =
        `<li class="results-panel__empty" style="cursor:default;">${I18N[currentLang].noResults}</li>`;
      return;
    }

    els.resultsCount.textContent = I18N[currentLang].resultsCount(matches.length);
    els.resultsList.innerHTML = "";
    matches.slice(0, 50).forEach((seat) => {
      const li = document.createElement("li");
      li.innerHTML =
        `<span class="results-panel__code">${formatSeatCode(seat)}</span>` +
        `<span class="results-panel__name">${seatDisplayName(seat, currentLang)}</span>`;
      li.addEventListener("click", () => {
        focusSeat(seat.id);
        els.resultsPanel.classList.remove("visible");
        els.searchInput.blur();
      });
      els.resultsList.appendChild(li);
    });
  }

  function setupSearch() {
    els.searchInput.addEventListener("input", (e) => runSearch(e.target.value));
    els.searchInput.addEventListener("focus", () => {
      if (els.searchInput.value.trim()) els.resultsPanel.classList.add("visible");
    });
    els.searchClear.addEventListener("click", () => {
      els.searchInput.value = "";
      runSearch("");
      els.searchInput.focus();
    });
    els.overviewBtn.addEventListener("click", () => fitToScreen(true));
  }

  /* ======================================================================
     4. 시작 팝업 / 팀 위치 보기
     ====================================================================== */
  function sortedTeams() {
    const list = TEAMS.slice();
    if (currentLang === "ko") {
      list.sort((a, b) => a.ko.localeCompare(b.ko, "ko"));
    } else {
      list.sort((a, b) => a.en.localeCompare(b.en, "en"));
    }
    return list;
  }

  function buildTeamGrid() {
    els.teamModalGrid.innerHTML = "";
    const list = sortedTeams();
    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "results-panel__empty";
      empty.textContent = I18N[currentLang].noTeamSeats;
      els.teamModalGrid.appendChild(empty);
      return;
    }
    list.forEach((team) => {
      const btn = document.createElement("button");
      btn.className = "team-modal__btn";
      btn.innerHTML =
        `<span class="team-modal__btn-ko">${team.ko}</span>` +
        `<span class="team-modal__btn-en">${team.en}</span>`;
      btn.addEventListener("click", () => {
        els.teamModal.classList.remove("visible");
        focusTeam(team.seatIds);
      });
      els.teamModalGrid.appendChild(btn);
    });
  }

  function setupModals() {
    els.startTeamBtn.addEventListener("click", () => {
      els.startModal.classList.remove("visible");
      buildTeamGrid();
      els.teamModal.classList.add("visible");
    });
    els.startSearchBtn.addEventListener("click", () => {
      els.startModal.classList.remove("visible");
      els.searchInput.focus();
    });
    els.teamModalBack.addEventListener("click", () => {
      els.teamModal.classList.remove("visible");
    });
  }

  /* ======================================================================
     5. 언어 선택 (GNB + 하단 고정 바, 두 곳 모두 동일 로직으로 구동)
     ====================================================================== */
  function buildLangMenuInto(menuEl, closeFn) {
    menuEl.innerHTML = "";
    LANG_ORDER.forEach((code) => {
      const li = document.createElement("li");
      li.textContent = I18N[code].name;
      li.dataset.lang = code;
      if (code === currentLang) li.classList.add("active");
      li.addEventListener("click", () => {
        currentLang = code;
        applyI18n();
        closeFn();
      });
      menuEl.appendChild(li);
    });
  }

  function buildLangMenu() {
    buildLangMenuInto(els.langMenu, () => {
      els.langSelect.classList.remove("open");
      els.langBtn.setAttribute("aria-expanded", "false");
    });
  }

  /* 하단 버튼형 언어 토글: LANG_ORDER 순서대로 버튼 생성, 현재 언어 활성 표시 */
  function buildLangToggle() {
    els.langToggle.querySelectorAll(".lang-toggle__btn").forEach((b) => b.remove());
    LANG_ORDER.forEach((code) => {
      const btn = document.createElement("button");
      btn.className = "lang-toggle__btn";
      btn.dataset.lang = code;
      btn.textContent = I18N[code].name;
      if (code === currentLang) btn.classList.add("active");
      btn.addEventListener("click", () => {
        if (currentLang === code) return;
        currentLang = code;
        applyI18n();
      });
      els.langToggle.appendChild(btn);
    });
  }

  function applyI18n() {
    const t = I18N[currentLang];
    document.documentElement.lang = currentLang;
    els.appTitle.textContent = t.appTitle;
    els.langBtnLabel.textContent = t.code;
    els.overviewBtnLabel.textContent = t.overview;
    els.searchInput.placeholder = t.searchPlaceholder;
    els.startTeamBtnLabel.textContent = t.startTeamBtn;
    els.startSearchBtnLabel.textContent = t.startSearchBtn;
    els.teamModalBackLabel.textContent = t.back;
    els.teamModalTitle.textContent = t.teamModalTitle;
    refreshMarkerLabels();
    refreshSeatNames();
    buildLangMenu();
    buildLangToggle();
    // 검색 중이었다면 라벨(결과없음/건수) 갱신
    if (els.searchInput.value.trim()) runSearch(els.searchInput.value);
    // 팀 모달이 열려있으면 정렬/라벨 다시 반영
    if (els.teamModal.classList.contains("visible")) buildTeamGrid();
  }

  function setupLangSelect() {
    els.langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !els.langSelect.classList.contains("open");
      els.langSelect.classList.toggle("open", willOpen);
      els.langBtn.setAttribute("aria-expanded", String(willOpen));
    });
    document.addEventListener("click", (e) => {
      if (!els.langSelect.contains(e.target)) {
        els.langSelect.classList.remove("open");
        els.langBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ======================================================================
     6. 팀 위치 보기 버튼 (하단 고정 바)
     ====================================================================== */
  function setupTeamViewBtn() {
    els.teamViewBtn.addEventListener("click", () => {
      buildTeamGrid();
      els.teamModal.classList.add("visible");
    });
  }

  /* ======================================================================
     초기화
     ====================================================================== */
  function init() {
    renderWorld();
    setupPanZoom();
    setupSearch();
    setupLangSelect();
    setupModals();
    setupTeamViewBtn();
    applyI18n();
    // 레이아웃 확정 이후 fit
    requestAnimationFrame(() => fitToScreen(false));
    // 첫 화면 진입 팝업
    els.startModal.classList.add("visible");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
