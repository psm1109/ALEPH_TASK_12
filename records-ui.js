/* 원문과 승인 ID는 그대로 두고 화면에서만 문장 단위로 읽기 쉽게 나눕니다. */
window.appendReadableText = (target, value) => {
  // 공백도 각 조각에 남겨 textContent를 이어 붙이면 원문과 같게 유지합니다.
  const sentences = value.split(/(?<=[.!?。！？])(?=[ \t]+\S)/u);
  for (const sentence of sentences) {
    const span = document.createElement("span");
    span.className = "readable-sentence";
    span.textContent = sentence;
    target.append(span);
  }
};

/* 원문 스냅샷과 화면을 분리해 이후 가져오기 장치도 같은 데이터를 공급할 수 있게 합니다. */
window.initRecordsUI = (records, openModal) => {
  "use strict";
  const history = window.PORTFOLIO_HISTORY;
  const el = (tag, value, className) => {
    const node = document.createElement(tag);
    if (value !== undefined) node.textContent = value;
    if (className) node.className = className;
    return node;
  };
  if (!history) {
    document.getElementById("calendar-status").textContent = "날짜별 기록을 불러오지 못했습니다.";
    return;
  }
  const { start, end } = records.period;
  const asOf = history.asOf;
  const short = date => date.slice(5).split("-").map(Number).join("/");
  const utc = date => new Date(`${date}T00:00:00Z`);
  const shift = (date, days) => new Date(utc(date).getTime() + days * 86400000).toISOString().slice(0, 10);
  const dateLabel = date => `${short(date)} (${"일월화수목금토"[utc(date).getUTCDay()]})`;
  const attendanceRows = history.attendance.filter(row => row.date >= start && row.date <= asOf).sort((a, b) => b.date.localeCompare(a.date));
  const ritualDays = history.ritualDays.filter(row => row.date >= start && row.date <= asOf).sort((a, b) => a.date.localeCompare(b.date));
  const attendanceMap = new Map(attendanceRows.map(row => [row.date, row]));
  const ritualMap = new Map(ritualDays.map(row => [row.date, row]));
  const has = list => Array.isArray(list) && list.some(value => typeof value === "string" && value.trim());
  const morning = ritualDays.filter(row => has(row.open)).length;
  const closing = ritualDays.filter(row => has(row.close)).length;
  const recordedDays = ritualDays.filter(row => has(row.open) || has(row.close)).length;
  const present = attendanceRows.filter(row => ["present", "excused"].includes(row.status)).length;
  const absent = attendanceRows.filter(row => row.status === "absent").length;
  const pending = attendanceRows.filter(row => row.status === "pending").length;
  const rate = attendanceRows.length ? Math.round(present / attendanceRows.length * 1000) / 10 : null;
  const states = { present: "출석", excused: "공가", absent: "결석", pending: "확정 전" };
  const card = (title, values, note) => {
    const article = el("article", undefined, "record-card");
    const metrics = el("dl", undefined, "record-metrics");
    for (const [label, value] of values) {
      const row = el("div"); row.append(el("dt", label), el("dd", value)); metrics.append(row);
    }
    const footer = el("div", undefined, "record-card-footer");
    if (note) footer.append(el("p", note, "record-card-note"));
    article.append(el("h3", title), metrics, footer);
    return article;
  };
  const detailButton = (label, id, callback) => {
    const button = el("button", label, "record-detail-button");
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-controls", id);
    button.addEventListener("click", () => { callback?.(); openModal(document.getElementById(id), button); });
    return button;
  };
  const attendanceCard = card("내 출석 기록", [["출석률", rate === null ? "—" : `${rate}%`], ["확정 전", `${pending}일`], ["훈련일", `${attendanceRows.length}일`], ["재적일", `${attendanceRows.length}일`], ["출석 인정", `${present}일`], ["결석", `${absent}일`]], `공가 포함 · ${asOf} 기준`);
  attendanceCard.querySelector(".record-card-footer").append(detailButton("날짜별 출석 자세히 보기", "attendance-modal"));
  const ritualCard = card("리추얼 기록", [["기록 일수", `${recordedDays}일`], ["총 작성", `${morning + closing}회`], ["아침", `${morning}회`], ["마무리", `${closing}회`]], `${asOf} 기준`);
  const submissionCard = card("내 제출 현황", [["제출 과제", `${records.submissions.length}건`], ["최종 확인 완료", `${records.submissions.filter(row => row.status === "최종 확인 완료").length}건`]]);
  submissionCard.querySelector(".record-card-footer").append(detailButton("제출 과제 자세히 보기", "submission-list-modal"));
  document.getElementById("record-period").textContent = `${short(start)} ~ ${short(end)}`;

  // 기간 필터는 표만 바꿉니다. 출석률의 분모에는 확정 전 훈련일도 포함합니다.
  const attendanceBody = document.getElementById("attendance-modal-body");
  attendanceBody.append(el("p", `훈련일 ${attendanceRows.length}일 · 재적일 ${attendanceRows.length}일 · 출석 인정 ${present}일 · 결석 ${absent}일`), el("p", `출석률 ${rate === null ? "—" : rate + "%"}`, "detail-summary"), el("p", `출석·공가 ÷ 재적일 · 확정 전 ${pending}일 포함. 요약은 기간 선택과 별개로 전체 훈련일 기준입니다.`, "caption"));
  const filters = el("div", undefined, "record-filters");
  const fromInput = el("input"); fromInput.type = "date"; fromInput.min = start; fromInput.max = asOf; fromInput.value = start;
  const toInput = el("input"); toInput.type = "date"; toInput.min = start; toInput.max = asOf; toInput.value = asOf;
  const fromLabel = el("label", "시작일 "); fromLabel.append(fromInput);
  const toLabel = el("label", "종료일 "); toLabel.append(toInput);
  const range = el("div", undefined, "record-date-range"); range.append(fromLabel, toLabel);
  const tableWrap = el("div", undefined, "attendance-table-wrap");
  const table = el("table", undefined, "attendance-table");
  const caption = el("caption", "날짜별 입실·퇴실 및 출석 상태");
  const head = el("thead"); const headings = el("tr");
  for (const title of ["날짜", "기호", "상태", "입실", "퇴실", "외출", "비고"]) { const th = el("th", title); th.scope = "col"; headings.append(th); }
  head.append(headings);
  const tbody = el("tbody"); table.append(caption, head, tbody); tableWrap.append(table);
  const tableStatus = el("p", undefined, "caption"); tableStatus.setAttribute("aria-live", "polite");
  const filterButtons = [];
  const renderAttendance = () => {
    filterButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.from === fromInput.value && toInput.value === asOf)));
    if (!fromInput.value || !toInput.value || !fromInput.validity.valid || !toInput.validity.valid || fromInput.value > toInput.value) {
      tbody.replaceChildren(); tableStatus.textContent = "기록 기간 안에서 시작일과 종료일을 선택해 주세요."; return;
    }
    const rows = attendanceRows.filter(row => row.date >= fromInput.value && row.date <= toInput.value);
    tbody.replaceChildren(...rows.map(row => {
      const tr = el("tr");
      for (const value of [dateLabel(row.date), row.symbol || "—", states[row.status] || "미확인", row.entry || "—", row.exit || "—", row.outing || "—", row.note || "—"]) tr.append(el("td", value));
      return tr;
    }));
    tableStatus.textContent = rows.length ? `${rows.length}일 표시 · 전체 ${attendanceRows.length}일` : "선택한 기간에 제공된 출석 기록이 없습니다.";
  };
  for (const [label, from] of [["최근 1주", shift(asOf, -6)], ["최근 1달", shift(asOf, -29)], ["개강일부터", start]]) {
    const button = el("button", label); button.type = "button"; button.dataset.from = from < start ? start : from;
    button.addEventListener("click", () => { fromInput.value = button.dataset.from; toInput.value = asOf; renderAttendance(); });
    filters.append(button); filterButtons.push(button);
  }
  fromInput.addEventListener("change", renderAttendance); toInput.addEventListener("change", renderAttendance);
  attendanceBody.append(filters, range, tableWrap, tableStatus, el("p", "○ 出석 · ◎ 지각 · ▲ 조퇴 · ⊙ 지각·조퇴 · × 결석 · ◇ 외출 · ▶ 지각·외출 · ☆ 외출·조퇴 · ★ 지각·외출·조퇴 · ▦ 공가·휴가", "attendance-legend"));
  renderAttendance();

  const ritualBody = document.getElementById("ritual-modal-body");
  ritualBody.append(el("p", `${start} ~ ${asOf} · 기록 ${recordedDays}일`, "caption"), el("p", `아침 ${morning}회 · 마무리 ${closing}회 · 총 ${morning + closing}회`, "detail-summary"));
  const dateNav = el("div", undefined, "ritual-date-nav");
  const ritualPrev = el("button", "‹"); ritualPrev.type = "button"; ritualPrev.setAttribute("aria-label", "이전 날짜");
  const ritualNext = el("button", "›"); ritualNext.type = "button"; ritualNext.setAttribute("aria-label", "다음 날짜");
  const selectedDate = el("input"); selectedDate.type = "date"; selectedDate.min = start; selectedDate.max = asOf; selectedDate.value = asOf; selectedDate.setAttribute("aria-label", "리추얼 날짜 선택");
  dateNav.append(ritualPrev, selectedDate, ritualNext);
  const tabs = el("div", undefined, "record-filters"); tabs.setAttribute("aria-label", "리추얼 종류");
  const openTab = el("button", "아침"); const closeTab = el("button", "마무리"); openTab.type = closeTab.type = "button"; tabs.append(openTab, closeTab);
  const detail = el("div", undefined, "ritual-detail");
  const ritualStatus = el("p", undefined, "caption"); ritualStatus.setAttribute("aria-live", "polite");
  let phase = "open";
  const fields = lines => {
    const dl = el("dl", undefined, "ritual-fields");
    for (const line of lines) {
      const split = line.indexOf(":"); const row = el("div");
      const value = el("dd");
      window.appendReadableText(value, split < 0 ? line : line.slice(split + 1).trim());
      row.append(el("dt", split < 0 ? "기록" : line.slice(0, split)), value); dl.append(row);
    }
    return dl;
  };
  const renderRitual = () => {
    detail.replaceChildren();
    if (!selectedDate.value || !selectedDate.validity.valid) {
      ritualPrev.disabled = ritualNext.disabled = true;
      ritualStatus.textContent = "기록 기간 안의 날짜를 선택해 주세요.";
      return;
    }
    const date = selectedDate.value; const record = ritualMap.get(date);
    ritualPrev.disabled = date <= start; ritualNext.disabled = date >= asOf;
    openTab.setAttribute("aria-pressed", String(phase === "open")); closeTab.setAttribute("aria-pressed", String(phase === "close"));
    openTab.textContent = has(record?.open) ? "아침" : "아침 · 기록 없음";
    closeTab.textContent = has(record?.close) ? "마무리" : "마무리 · 기록 없음";
    const lines = record?.[phase];
    if (!has(lines)) {
      ritualStatus.textContent = record ? `${dateLabel(date)} ${phase === "open" ? "아침" : "마무리"} 기록은 파일에 없습니다.` : `${dateLabel(date)} 기록이 파일에 없습니다. 미작성 여부는 미확인입니다.`;
      return;
    }
    const peers = lines.filter(line => /^(동료|감사일기:)/.test(line));
    detail.append(fields(lines.filter(line => !peers.includes(line))));
    if (peers.length) {
      const group = el("details", undefined, "ritual-peer-details"); group.append(el("summary", "동료 피드백·감사 기록"), fields(peers)); detail.append(group);
    }
    ritualStatus.textContent = `${dateLabel(date)} · ${phase === "open" ? "아침" : "마무리"} 원문 ${lines.length}개 항목`;
  };
  const selectRitual = date => { selectedDate.value = date; phase = "open"; renderRitual(); };
  openTab.addEventListener("click", () => { phase = "open"; renderRitual(); });
  closeTab.addEventListener("click", () => { phase = "close"; renderRitual(); });
  selectedDate.addEventListener("change", renderRitual);
  ritualPrev.addEventListener("click", () => { selectedDate.value = shift(selectedDate.value, -1); renderRitual(); });
  ritualNext.addEventListener("click", () => { selectedDate.value = shift(selectedDate.value, 1); renderRitual(); });
  ritualBody.append(dateNav, tabs, detail, ritualStatus);
  ritualCard.querySelector(".record-card-footer").append(detailButton("날짜별 리추얼 자세히 보기", "ritual-modal", () => selectRitual(asOf)));
  document.getElementById("record-cards").replaceChildren(attendanceCard, ritualCard, submissionCard);
  renderRitual();

  let month = asOf.slice(0, 7);
  const firstMonth = start.slice(0, 7); const lastMonth = end.slice(0, 7);
  const prev = document.getElementById("calendar-prev"); const next = document.getElementById("calendar-next");
  const calendarStatus = document.getElementById("calendar-status");
  const renderCalendar = () => {
    const [year, number] = month.split("-").map(Number);
    document.getElementById("calendar-month").textContent = `${number}월`;
    const grid = document.getElementById("calendar-grid"); grid.setAttribute("aria-label", `${year}년 ${number}월 출석·리추얼 기록`);
    const offset = (new Date(Date.UTC(year, number - 1, 1)).getUTCDay() + 6) % 7;
    const count = new Date(Date.UTC(year, number, 0)).getUTCDate(); const cells = [];
    for (let slot = 0; slot < Math.ceil((offset + count) / 7) * 7; slot++) {
      const day = slot - offset + 1; const date = `${month}-${String(day).padStart(2, "0")}`;
      if (day < 1 || day > count || date < start || date > end) { const blank = el("span"); blank.setAttribute("aria-hidden", "true"); cells.push(blank); continue; }
      const ritual = ritualMap.get(date); const attendance = attendanceMap.get(date);
      const level = Number(has(ritual?.open)) + Number(has(ritual?.close));
      const ritualLabel = date > asOf ? "기준일 이후 · 미확인" : !ritual ? "리추얼 미확인" : level === 2 ? "아침·마무리 작성" : level === 1 ? has(ritual.open) ? "아침만 작성" : "마무리만 작성" : "리추얼 없음";
      const label = `${dateLabel(date)} · ${states[attendance?.status] || "출석 기록 없음"} · ${ritualLabel}`;
      const cell = el("button", undefined, `calendar-cell ${level === 2 ? "ritual-both" : level === 1 ? "ritual-one" : "ritual-none"}`);
      cell.type = "button"; cell.title = label; cell.dataset.date = date; cell.setAttribute("aria-label", label);
      cell.addEventListener("focus", () => { calendarStatus.textContent = label; });
      cell.addEventListener("click", () => { calendarStatus.textContent = label; if (date <= asOf) { selectRitual(date); openModal(document.getElementById("ritual-modal"), cell); } });
      cells.push(cell);
    }
    grid.replaceChildren(...cells); prev.disabled = month === firstMonth; next.disabled = month === lastMonth;
    calendarStatus.textContent = `${asOf} 기준 · 흰 칸 중 파일에 없는 날짜와 기준일 이후는 미확인입니다. 칸을 선택하면 날짜별 리추얼을 봅니다.`;
  };
  const move = delta => {
    const [year, number] = month.split("-").map(Number); const target = new Date(Date.UTC(year, number - 1 + delta, 1)).toISOString().slice(0, 7);
    if (target >= firstMonth && target <= lastMonth) { month = target; renderCalendar(); }
  };
  prev.addEventListener("click", () => move(-1)); next.addEventListener("click", () => move(1));
  renderCalendar();
};
