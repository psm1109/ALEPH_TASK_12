"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "assets/papers/t10-paper.md");
const output = path.join(root, "data/paper-markdown.js");
// 이전 생성기와 같은 문자열을 만들어 BOM과 운영체제별 줄바꿈이 화면에 영향을 주지 않게 합니다.
const markdown = fs.readFileSync(source, "utf8").replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
const generated = "// 원본: assets/papers/t10-paper.md · 갱신: node scripts/build_paper.js\n"
  + "window.PORTFOLIO_PAPER_MARKDOWN = " + JSON.stringify(markdown) + ";\n";

fs.writeFileSync(output, generated, "utf8");
console.log("논문 미리보기 데이터 생성: data/paper-markdown.js");
