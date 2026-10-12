(() => {
  "use strict";
  const data = window.PORTFOLIO_CONTENT;
  if (!data) return;
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
    const body = document.getElementById("submission-modal-body");
    // 기존 제출 HTML만 사용합니다. 가져온 기록의 문자열은 textContent로 표시합니다.
    if (submission) body.innerHTML = submission.body;
    else body.textContent = "제출 내용을 불러오지 못했습니다. 페이지를 새로고침한 뒤 다시 열어주세요.";
    openModal(submissionModal, trigger);
  };
  document.querySelectorAll("[data-name]").forEach(el => { el.textContent = data.name; });
  document.title = `${data.name} · Portfolio`;
  text("tagline", data.tagline);
  const story = document.getElementById("story-content");
  story.replaceChildren(...data.story.map(scene => {
    const article = document.createElement("article");
    if (scene.id) article.id = scene.id;
    const heading = document.createElement("h3"); heading.textContent = scene.title;
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
      const paragraph = document.createElement("p"); paragraph.textContent = body; article.append(paragraph);
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
    return article;
  }));
  text("paper-title", data.paper.title);
  text("paper-summary", data.paper.summary);
  if (safeUrl(data.paper.url)) document.getElementById("paper-link").replaceChildren(link("논문 읽기", data.paper.url));
  document.getElementById("document-list").replaceChildren(...data.documents.map(doc => {
    const card = document.createElement("div"); card.className = "document";
    const heading = document.createElement("h3"); heading.textContent = doc.title;
    const status = link(safeUrl(doc.url) ? "문서 보기" : "준비 중", doc.url); status.className = "status";
    card.append(heading, status); return card;
  }));
  document.getElementById("contact-link").replaceChildren(link(data.contact.label, data.contact.url, true));
  const records = data.records;
  if (records) {
    const { submissions, connection } = records;
    window.initRecordsUI(records, openModal);
    text("submission-list-title", `제출 과제 ${submissions.length}건`);
    document.getElementById("submission-list").replaceChildren(...submissions.map(item => {
      const row = document.createElement("li");
      const title = document.createElement("strong"); title.textContent = `${item.code} · Studio 과제 ${item.code.slice(1)}`;
      const detail = document.createElement("span"); detail.textContent = `${item.submitted} 제출 · ${item.status}`;
      row.append(title, detail);
      const view = document.createElement("button"); view.type = "button";
      view.textContent = `${item.code} 제출 내용 보기`;
      view.className = "submission-view";
      view.setAttribute("aria-haspopup", "dialog");
      view.setAttribute("aria-controls", "submission-modal");
      view.addEventListener("click", () => openSubmission(item.code, view));
      row.append(view);
      return row;
    }));
    text("record-source", records.source);
    text("record-connection-title", connection.title);
    text("record-connection-body", connection.body);
    document.getElementById("record-story-link").replaceChildren(link(connection.linkLabel, `#${connection.storyId}`));
  }
})();
