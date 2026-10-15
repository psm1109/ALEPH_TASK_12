(() => {
  "use strict";
  const data = window.PORTFOLIO_CONTENT;
  if (!data) return;
  const imported = window.PORTFOLIO_IMPORT;
  if (imported) {
    window.PORTFOLIO_HISTORY = imported.history;
    data.records.period = imported.period;
    data.records.submissions = imported.submissions.map(row => ({ ...row, submitted: row.date }));
    data.records.source = `출처: 승인한 JSON 기록 · ${imported.asOf} 기준`;
    // 목록은 최신 스냅샷을 따르되 미제공 본문이 기존 제출 내용을 가리지 않게 합니다.
    const savedSubmissions = data.submissionContents || {};
    data.submissionContents = Object.fromEntries(imported.submissions.map(row => [row.code,
      row.body.trim() ? { title: row.title, plainBody: row.body }
        : savedSubmissions[row.code] ? { ...savedSubmissions[row.code], title: row.title }
        : { title: row.title, plainBody: "아직 제출 본문을 제공하지 않았습니다." }
    ]));
  }
  const text = (id, value) => { document.getElementById(id).textContent = value; };
  const safeUrl = (value, contact = false) => {
    if (!value || typeof value !== "string") return null;
    try {
      const url = new URL(value, window.location.href);
      if (["http:", "https:"].includes(url.protocol)) return url.href;
      if (contact && url.protocol === "mailto:") return url.href;
      if (url.protocol === "file:" && !/^[a-z][a-z\d+.-]*:/i.test(value)) return url.href;
    } catch { /* 잘못된 주소는 링크로 표시하지 않습니다. */ }
    return null;
  };
  const link = (label, url, contact = false) => {
    const href = safeUrl(url, contact);
    const element = document.createElement(href ? "a" : "span");
    element.textContent = label;
    if (href) element.href = href;
    return element;
  };
  // 실행 중 선택해 승인한 장면을 표시하고, 이전 스냅샷이면 초기 장면을 사용합니다.
  const excerpt = imported?.ritualExcerpt || data.ritualExcerpt;
  if (excerpt) {
    const section = document.getElementById("ritual-excerpt");
    const heading = document.createElement("h3"); heading.textContent = "리추얼에서 고른 한 장면";
    const description = document.createElement("p"); description.className = "caption";
    description.textContent = excerpt.description;
    const article = document.createElement("article"); article.className = "record-connection";
    const title = document.createElement("h4"); title.textContent = excerpt.title;
    const quote = document.createElement("blockquote");
    for (const body of excerpt.body.split(/\n\s*\n/)) {
      const paragraph = document.createElement("p");
      window.appendReadableText(paragraph, body); quote.append(paragraph);
    }
    const source = document.createElement("p"); source.className = "caption";
    source.textContent = `출처: ${excerpt.source}`;
    article.append(title, quote, source);
    section.replaceChildren(heading, description, article);
  }
  const submissionModal = document.getElementById("submission-modal");
  const triggers = new WeakMap();
  const syncModalLock = () => document.body.classList.toggle("modal-open", Boolean(document.querySelector("dialog[open]")));
  const openModal = (modal, trigger) => {
    triggers.set(modal, trigger);
    modal.showModal();
    modal.scrollTop = 0;
    syncModalLock();
    modal.querySelector(".submission-modal-close").focus();
  };
  document.querySelectorAll("dialog.submission-modal").forEach(modal => {
    modal.querySelector(".submission-modal-close").addEventListener("click", () => modal.close());
    modal.addEventListener("click", event => {
      if (event.target !== modal) return;
      const bounds = modal.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
    });
    modal.addEventListener("close", () => {
      syncModalLock();
      triggers.get(modal)?.focus({ preventScroll: true });
      triggers.delete(modal);
    });
  });
  const openSubmission = (code, trigger) => {
    const submission = data.submissionContents?.[code];
    text("submission-modal-title", submission?.title || `${code} 제출 내용`);
    const record = data.records?.submissions.find(item => item.code === code);
    text("submission-modal-meta", record ? `${record.submitted} 제출 · ${record.status}` : "");
    const body = document.getElementById("submission-modal-body");
    body.classList.toggle("submission-plain-text", typeof submission?.plainBody === "string");
    // 기존 제출 HTML만 사용합니다. 가져온 기록의 문자열은 textContent로 표시합니다.
    if (submission && typeof submission.plainBody === "string") body.textContent = submission.plainBody;
    else if (submission) body.innerHTML = submission.body;
    else body.textContent = "제출 내용을 불러오지 못했습니다. 페이지를 새로고침한 뒤 다시 열어주세요.";
    openModal(submissionModal, trigger);
  };
  const submissionUrl = submission => {
    // 결과물 항목만 읽어 소스 저장소나 본문의 참고 링크를 대표 링크로 오인하지 않습니다.
    let value;
    if (typeof submission?.plainBody === "string") {
      const section = submission.plainBody.split(/결과물\s*URL\s*[:：]?/i)[1]?.split(/소스\s*저장소\s*URL|재현[·ㆍ]/i)[0];
      value = section?.match(/https?:\/\/[^\s<>"']+/i)?.[0];
    } else if (submission?.body) {
      const document = new DOMParser().parseFromString(submission.body, "text/html");
      const heading = [...document.querySelectorAll("h2")].find(el => el.textContent.trim() === "결과물 URL");
      for (let node = heading?.nextElementSibling; node && node.tagName !== "H2"; node = node.nextElementSibling) {
        value = node.querySelector("a[href]")?.getAttribute("href");
        if (value) break;
      }
    }
    try {
      const url = new URL(value);
      if (["http:", "https:"].includes(url.protocol) && !url.username && !url.password) return url.href;
    } catch { /* 결과물 URL이 없거나 잘못되면 제출 내용만 제공합니다. */ }
    return null;
  };
  document.querySelectorAll("[data-name]").forEach(el => { el.textContent = data.name; });
  document.title = `${data.name} · Portfolio`;
  text("tagline", data.tagline);
  const story = document.getElementById("story-content");
  story.classList.add("story-browser");
  const storyButtons = [];
  const storyPanels = [];
  const selectStory = (index, focus = false) => {
    storyButtons.forEach((button, i) => button.setAttribute("aria-expanded", String(i === index)));
    storyPanels.forEach((panel, i) => { panel.hidden = i !== index; });
    if (focus) storyButtons[index].focus({ preventScroll: true });
  };
  story.replaceChildren(...data.story.map((scene, index) => {
    const item = document.createElement("div"); item.className = "story-item";
    const button = document.createElement("button");
    button.type = "button"; button.className = "story-chapter";
    button.id = `story-chapter-${index + 1}`;
    button.style.gridRow = String(index + 1);
    const number = document.createElement("span"); number.className = "story-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const chapterCopy = document.createElement("span");
    const chapterTitle = document.createElement("span"); chapterTitle.className = "story-chapter-title";
    chapterTitle.textContent = scene.title;
    const chapterDate = document.createElement("span"); chapterDate.className = "story-chapter-date";
    chapterDate.textContent = scene.dateLabel || scene.date || "";
    chapterCopy.append(chapterTitle, chapterDate); button.append(number, chapterCopy);
    const article = document.createElement("article");
    article.className = "story-scene";
    article.id = scene.id || `story-scene-${index + 1}`;
    article.style.gridRow = `1 / span ${data.story.length}`;
    article.setAttribute("aria-labelledby", `${button.id}-title`);
    button.setAttribute("aria-controls", article.id);
    button.addEventListener("click", () => selectStory(index));
    const heading = document.createElement("h3"); heading.textContent = scene.title;
    heading.id = `${button.id}-title`;
    article.append(heading);
    // '7월 말 이후' 같은 기간 표현에는 임의의 날짜를 부여하지 않습니다.
    if (scene.date || scene.dateLabel) {
      const date = document.createElement(scene.date ? "time" : "p");
      date.className = "story-date";
      if (scene.date) date.dateTime = scene.date;
      date.textContent = scene.dateLabel || scene.date;
      article.append(date);
    }
    scene.body.split(/\n\s*\n/).forEach(body => {
      const paragraph = document.createElement("p");
      paragraph.className = "story-body";
      window.appendReadableText(paragraph, body); article.append(paragraph);
    });
    if (scene.ability) {
      const ability = document.createElement("p"); ability.className = "story-ability";
      const label = document.createElement("strong"); label.textContent = scene.ability;
      ability.append(label);
      if (scene.abilitySummary) {
        const summary = document.createElement("span"); summary.textContent = ` · ${scene.abilitySummary}`;
        ability.append(summary);
      }
      article.append(ability);
    }
    const controls = document.createElement("div"); controls.className = "story-controls";
    const previous = document.createElement("button"); previous.type = "button";
    previous.textContent = "← 이전 이야기"; previous.disabled = index === 0;
    previous.addEventListener("click", () => selectStory(index - 1, true));
    const position = document.createElement("span");
    position.textContent = `${String(index + 1).padStart(2, "0")} / ${String(data.story.length).padStart(2, "0")}`;
    const next = document.createElement("button"); next.type = "button";
    next.textContent = "다음 이야기 →"; next.disabled = index === data.story.length - 1;
    next.addEventListener("click", () => selectStory(index + 1, true));
    controls.append(previous, position, next); article.append(controls);
    storyButtons.push(button); storyPanels.push(article);
    item.append(button, article);
    return item;
  }));
  // 기존 장면 주소로 방문해도 접힌 본문 대신 해당 이야기를 바로 읽게 합니다.
  const revealStoryHash = () => {
    const index = storyPanels.findIndex(panel => `#${panel.id}` === window.location.hash);
    if (index < 0) return;
    selectStory(index);
    storyPanels[index].scrollIntoView({ block: "nearest" });
  };
  selectStory(0);
  revealStoryHash();
  window.addEventListener("hashchange", revealStoryHash);
  text("paper-title", data.paper.title);
  text("paper-summary", data.paper.summary);
  text("paper-description", data.paper.description);
  const paperDownload = document.querySelector("#paper-link .paper-download");
  const paperView = document.getElementById("paper-view");
  if (safeUrl(data.paper.url)) {
    paperDownload.href = safeUrl(data.paper.url);
    paperDownload.download = data.paper.filename;
  }
  if (typeof window.PORTFOLIO_PAPER_MARKDOWN === "string" && window.renderPaperMarkdown) {
    paperView.disabled = false;
    paperView.addEventListener("click", () => {
      const body = document.getElementById("paper-modal-body");
      if (!body.childElementCount) body.replaceChildren(window.renderPaperMarkdown(window.PORTFOLIO_PAPER_MARKDOWN));
      text("paper-modal-title", data.paper.summary);
      openModal(document.getElementById("paper-modal"), paperView);
    });
  }
  document.getElementById("document-list").replaceChildren(...data.documents.map(doc => {
    const card = document.createElement("div"); card.className = "document";
    const heading = document.createElement("h3"); heading.textContent = doc.title;
    const status = link(safeUrl(doc.url) ? "Word 다운로드" : "준비 중", doc.url); status.className = "status";
    if (safeUrl(doc.url)) status.setAttribute("download", "");
    card.append(heading, status); return card;
  }));
  document.getElementById("contact-link").replaceChildren(link(data.contact.label, data.contact.url, true));
  const records = data.records;
  if (records) {
    const { submissions } = records;
    window.initRecordsUI(records, openModal);
    text("submission-list-title", `제출 과제 ${submissions.length}건`);
    const groups = new Map();
    for (const item of submissions) {
      const url = submissionUrl(data.submissionContents?.[item.code]);
      // 같은 결과물 주소만 묶고 URL 없는 과제는 개별 제출로 보존합니다.
      const key = url || item.code;
      if (!groups.has(key)) groups.set(key, { url, items: [] });
      groups.get(key).items.push(item);
    }
    document.getElementById("submission-list").replaceChildren(...[...groups.values()].map(({ url, items }) => {
      const row = document.createElement("li");
      const codes = items.map(item => item.code).join(" · ");
      const preview = document.createElement(url ? "a" : "div");
      preview.className = "submission-preview";
      if (!url) preview.classList.add("submission-preview-empty");
      if (url) {
        preview.href = url; preview.target = "_blank"; preview.rel = "noopener noreferrer";
        preview.setAttribute("aria-label", `${codes} 결과물 열기 (새 탭)`);
      }
      const fallback = document.createElement("span"); fallback.className = "submission-preview-fallback";
      const code = document.createElement("b"); code.textContent = url ? codes : items[0].title || `Studio 과제 ${items[0].code.slice(1)}`;
      fallback.append(code);
      if (url) {
        const hint = document.createElement("small"); hint.textContent = "결과물 열기 ↗";
        fallback.append(hint);
      }
      preview.append(fallback);
      const thumbnail = url && data.submissionPreviews?.[url];
      if (thumbnail) {
        const image = document.createElement("img");
        image.alt = ""; image.loading = "lazy"; image.width = 1280; image.height = 800;
        image.addEventListener("error", () => image.remove(), { once: true });
        image.src = thumbnail; preview.append(image);
      }
      row.append(preview);
      if (url) {
        const destination = link(`${new URL(url).hostname} ↗`, url);
        destination.className = "submission-destination";
        destination.target = "_blank"; destination.rel = "noopener noreferrer";
        destination.setAttribute("aria-label", `${codes} 결과물: ${new URL(url).hostname} (새 탭)`);
        row.append(destination);
      } else {
        const unavailable = document.createElement("span"); unavailable.className = "submission-destination";
        unavailable.textContent = "등록된 URL이 없습니다";
        row.append(unavailable);
      }
      const tasks = document.createElement("div"); tasks.className = "submission-tasks";
      for (const item of items) {
        const task = document.createElement("div"); task.className = "submission-task";
        const view = document.createElement("button"); view.type = "button";
        view.textContent = `${item.code} 제출 내용`;
        view.className = "submission-view";
        view.setAttribute("aria-haspopup", "dialog");
        view.setAttribute("aria-controls", "submission-modal");
        view.addEventListener("click", () => openSubmission(item.code, view));
        task.append(view); tasks.append(task);
      }
      row.append(tasks);
      return row;
    }));
    text("record-source", records.source);

  }
})();
