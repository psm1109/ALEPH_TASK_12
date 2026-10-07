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
  document.querySelectorAll("[data-name]").forEach(el => { el.textContent = data.name; });
  document.title = `${data.name} · Portfolio`;
  text("tagline", data.tagline);
  const story = document.getElementById("story-content");
  story.replaceChildren(...data.story.map(scene => {
    const article = document.createElement("article");
    const heading = document.createElement("h3"); heading.textContent = scene.title;
    article.append(heading);
    if (scene.date) { const time = document.createElement("time"); time.dateTime = scene.date; time.textContent = scene.date; article.append(time); }
    const paragraph = document.createElement("p"); paragraph.textContent = scene.body; article.append(paragraph);
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
  const result = window.PORTFOLIO_RECORDS;
  if (result?.weeks > 0) {
    text("period", `${result.weeks}주`);
    text("persistence", result.persistenceRate === null ? "—" : `${result.persistenceRate}%`);
    text("restarts", `${result.restarts}회`);
    text("record-source", `출처: ${result.sources.join(" · ")} | ${result.start} ~ ${result.end} | 지속률: 완료 ${result.completed}건 / 계획 ${result.planned}건`);
  }
})();
