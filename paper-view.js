window.renderPaperMarkdown = markdown => {
  "use strict";
  const escape = value => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const parser = new window.marked.Marked({
    gfm: true,
    renderer: { html: token => escape(token.text) },
    tokenizer: {
      del(source) {
        // 숫자 범위의 단일 ~는 본문으로 남기고, 명시적인 ~~만 기본 취소선 규칙에 맡깁니다.
        if (source.startsWith("~~")) return false;
        return undefined;
      }
    }
  });
  const template = document.createElement("template");
  template.innerHTML = parser.parse(markdown);
  // 논문의 서식만 허용합니다. Markdown/HTML의 URL과 속성을 실행 가능한 코드로 신뢰하지 않습니다.
  const allowed = new Set("H1 H2 H3 H4 H5 H6 P BR HR BLOCKQUOTE UL OL LI STRONG EM DEL CODE PRE TABLE THEAD TBODY TR TH TD A".split(" "));
  for (const node of template.content.querySelectorAll("*")) {
    if (!allowed.has(node.tagName)) { node.replaceWith(document.createTextNode(node.textContent)); continue; }
    const href = node.tagName === "A" ? node.getAttribute("href") : null;
    const align = ["TH", "TD"].includes(node.tagName) ? node.getAttribute("align") : null;
    const start = node.tagName === "OL" ? node.getAttribute("start") : null;
    for (const attr of [...node.attributes]) node.removeAttribute(attr.name);
    if (["left", "center", "right"].includes(align)) node.setAttribute("align", align);
    if (start && /^\d+$/.test(start)) node.setAttribute("start", start);
    if (href) {
      try {
        const url = new URL(href, window.location.href);
        if (["http:", "https:", "mailto:"].includes(url.protocol)) {
          node.href = url.href;
          node.target = "_blank";
          node.rel = "noopener noreferrer";
        }
      } catch { /* 잘못된 주소는 텍스트로 남깁니다. */ }
    }
  }
  for (const table of template.content.querySelectorAll("table")) {
    const wrap = document.createElement("div"); wrap.className = "paper-table-scroll";
    wrap.tabIndex = 0; wrap.setAttribute("role", "region"); wrap.setAttribute("aria-label", "논문 표, 가로 스크롤 가능");
    table.replaceWith(wrap); wrap.append(table);
  }
  return template.content;
};
