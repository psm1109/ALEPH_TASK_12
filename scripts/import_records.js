// Node.js 표준 모듈만으로 네 JSON을 검증하고 승인한 기록과 장면을 저장합니다.
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const readline = require("node:readline");

const ROOT = path.resolve(__dirname, "..");
const ABILITIES = ["자기동기력", "자기조절력", "문제해결력", "대인관계력"];
class RecordError extends Error {}
function check(condition, message) { if (!condition) throw new RecordError(message); }
function sorted(value) {
  if (Array.isArray(value)) return value.map(sorted);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map(key => [key, sorted(value[key])]));
  return value;
}
const dump = value => JSON.stringify(sorted(value), null, 2) + "\n";
const digest = value => crypto.createHash("sha256").update(dump(value)).digest("hex");
const equal = (a, b) => dump(a) === dump(b);
const read = file => fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
function text(value) { check(typeof value === "string", "문자열이 필요합니다."); return value.trim(); }
function keys(obj, required, optional = []) {
  check(obj !== null && typeof obj === "object" && !Array.isArray(obj), "객체가 필요합니다.");
  check(required.every(key => Object.hasOwn(obj, key)), "필수 항목이 빠졌습니다: " + required.filter(key => !Object.hasOwn(obj, key)).join(", "));
  check(Object.keys(obj).every(key => [...required, ...optional].includes(key)), "허용하지 않는 항목이 있습니다. 입력 형식을 확인하세요.");
}
function date(value) {
  check(typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value), "날짜는 YYYY-MM-DD입니다.");
  const parsed = new Date(value + "T00:00:00Z");
  check(value.slice(0, 4) !== "0000" && Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value, "실제 달력에 존재하는 날짜가 필요합니다.");
  return value;
}
function parseJson(raw, filename) {
  try { return JSON.parse(raw); }
  catch (error) {
    // JSON.parse의 원문 인용에는 비밀값이 포함될 수 있으므로 위치만 표시합니다.
    const position = Number(/position (\d+)/.exec(error.message)?.[1] ?? raw.length);
    const before = raw.slice(0, position).split("\n");
    throw new RecordError(`${filename}: JSON 문법 오류 (${before.length}행 ${before.at(-1).length + 1}열)`);
  }
}
function load(folder, name) {
  const payload = parseJson(read(path.join(folder, name)), name);
  const patterns = [/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/u, /\b01[016789][- .]?\d{3,4}[- .]?\d{4}\b/u,
    /\bsk-[A-Za-z0-9_-]{16,}/u, /\bgh[pousr]_[A-Za-z0-9]{20,}/u,
    /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/u,
    /(?:password|api[_ -]?key|access[_ -]?token|refresh[_ -]?token|비밀번호)\s*[:=]\s*[^\s"',}]{4,}/iu];
  check(!patterns.some(pattern => pattern.test(JSON.stringify(payload))), `${name}: 연락처 또는 비밀값 형태가 있습니다. 제거하고 다시 실행하세요.`);
  return payload;
}
function candidateExcerpt(rituals) {
  const candidates = [];
  for (const row of rituals) for (const [phase, label] of [["open", "아침"], ["close", "마무리"]]) {
    (row[phase] || []).forEach((line, index) => {
      const match = /^강점이 드러난 일화\s*[:：]\s*(.+)/su.exec(line);
      if (!match || [...match[1].trim()].length < 12) return;
      const body = match[1].trim();
      const helping = /설명해|도와|도움을?\s*주|소개해|알려|가르/u.test(body);
      candidates.push({ rank: [Number(helping), row.date, Number(phase === "close"), -index],
        value: { excerpt: { title: helping ? "배움을 나누며 도움을 건넨 경험" : "기록으로 돌아본 나의 행동", body,
          source: `${row.date} ${label} 리추얼`, description: "리추얼에 남긴 나의 행동 한 장면입니다. 날짜와 원문 근거를 함께 확인할 수 있습니다." },
        evidence: { date: row.date, phase: label, item: "강점이 드러난 일화", source: row.source, original: line } } });
    });
  }
  candidates.sort((a, b) => {
    for (let i = 0; i < a.rank.length; i++) if (a.rank[i] !== b.rank[i]) return a.rank[i] > b.rank[i] ? -1 : 1;
    return 0;
  });
  return candidates[0]?.value || null;
}
function validateExcerpt(excerpt) {
  keys(excerpt, ["title", "body", "source", "description"]);
  check(Object.values(excerpt).every(value => typeof value === "string" && value.trim()), "장면의 제목·본문·출처·설명이 필요합니다.");
  return excerpt;
}
function currentExcerpt(siteRoot) {
  const published = path.join(siteRoot, "data/records-import.js");
  if (fs.existsSync(published)) {
    const raw = read(published), prefix = "window.PORTFOLIO_IMPORT = ";
    if (raw.includes(prefix)) {
      const value = parseJson(raw.slice(raw.indexOf(prefix) + prefix.length).trim().replace(/;$/, ""), "records-import.js");
      if (value?.ritualExcerpt) return validateExcerpt(value.ritualExcerpt);
    }
  }
  const raw = read(path.join(siteRoot, "content.js"));
  const match = /\britualExcerpt\s*:\s*/u.exec(raw);
  check(match, "content.js에 JSON 형식의 ritualExcerpt가 필요합니다.");
  // 객체 경계만 읽고 JSON.parse로 검증합니다. 사이트 JavaScript는 실행하지 않습니다.
  const start = match.index + match[0].length;
  let depth = 0, quoted = false, escaped = false;
  for (let i = start; i < raw.length; i++) {
    const char = raw[i];
    if (quoted) { if (escaped) escaped = false; else if (char === "\\") escaped = true; else if (char === '"') quoted = false; }
    else if (char === '"') quoted = true;
    else if (char === "{") depth++;
    else if (char === "}" && --depth === 0) return validateExcerpt(parseJson(raw.slice(start, i + 1), "content.js ritualExcerpt"));
  }
  throw new RecordError("content.js의 ritualExcerpt JSON 객체를 확인하세요.");
}
function build(folder) {
  const meta = load(folder, "manifest.json");
  keys(meta, ["version", "asOf", "period", "privacyReviewed"]);
  check(meta.version === 1, "version은 갱신 횟수가 아닌 형식 버전 1입니다.");
  check(meta.privacyReviewed === true, "개인정보 제거를 확인한 후 privacyReviewed를 true로 지정하세요.");
  keys(meta.period, ["start", "end"]);
  const start = date(meta.period.start), end = date(meta.period.end), asOf = date(meta.asOf);
  check(start <= asOf && asOf <= end, "기준일은 기록 기간 안이어야 합니다.");
  function rows(filename, field, required, optional, identity) {
    try {
      const payload = load(folder, filename);
      keys(payload, [field]); check(Array.isArray(payload[field]), `${field}는 배열입니다.`);
      const seen = new Set();
      return payload[field].map((item, index) => {
        keys(item, required, optional);
        const row = { ...item, date: date(item.date), source: text(item.source) };
        check(start <= row.date && row.date <= asOf, `${index + 1}번 기록 날짜는 시작일~기준일 안이어야 합니다.`);
        check(row.source, `${index + 1}번 기록의 출처가 필요합니다.`);
        check(typeof row[identity] === "string" && !seen.has(row[identity]), `${index + 1}번 기록의 날짜/과제 코드가 중복됐거나 형식이 잘못됐습니다.`);
        seen.add(row[identity]);
        if (Object.hasOwn(row, "observations")) {
          check(Array.isArray(row.observations), "observations는 배열입니다.");
          for (const observation of row.observations) {
            keys(observation, ["ability", "evidence"]);
            check(ABILITIES.includes(observation.ability) && text(observation.evidence), "observations의 능력/근거를 확인하세요.");
          }
        }
        return row;
      }).sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : a[identity] < b[identity] ? -1 : a[identity] > b[identity] ? 1 : 0);
    } catch (error) { if (error instanceof RecordError) throw new RecordError(`${filename}: ${error.message}`); throw error; }
  }
  const attendance = rows("attendance.json", "attendance", ["date", "status", "source"], ["symbol", "entry", "exit", "outing", "note", "observations"], "date");
  for (const row of attendance) {
    check(["present", "excused", "absent", "pending"].includes(row.status), "attendance.json: 출석 상태가 잘못됐습니다.");
    for (const key of ["symbol", "entry", "exit", "outing", "note"]) row[key] = text(Object.hasOwn(row, key) ? row[key] : "");
    for (const key of ["entry", "exit"]) check(!row[key] || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(row[key]), "attendance.json: 입퇴실 시각은 HH:MM 또는 빈 문자열입니다.");
  }
  const rituals = rows("rituals.json", "ritualDays", ["date", "open", "close", "source"], ["observations"], "date");
  for (const row of rituals) for (const key of ["open", "close"]) {
    check(row[key] === null || Array.isArray(row[key]), "rituals.json: open/close는 문자열 배열 또는 null입니다.");
    if (row[key] !== null) row[key] = row[key].map(text);
  }
  const submissions = rows("submissions.json", "submissions", ["code", "date", "status", "title", "body", "source"], ["observations"], "code");
  for (const row of submissions) {
    check(/^T\d{2,}$/.test(row.code), "submissions.json: 코드는 T01 형식입니다.");
    check(["제출 완료", "최종 확인 완료"].includes(row.status), "submissions.json: 상태는 제출 완료/최종 확인 완료입니다.");
    row.title = text(row.title); row.body = text(row.body);
    check(row.title, "submissions.json: 과제 제목이 필요합니다.");
  }
  const has = value => (value || []).some(Boolean);
  const morning = rituals.filter(row => has(row.open)).length, closing = rituals.filter(row => has(row.close)).length;
  const present = attendance.filter(row => ["present", "excused"].includes(row.status)).length;
  // 기존 집계와 동일하게 정확히 절반인 경우 짝수로 반올림합니다.
  const numerator = present * 1000, count = attendance.length, quotient = count ? Math.floor(numerator / count) : 0;
  const remainder = count ? numerator % count : 0;
  const rounded = quotient + Number(remainder * 2 > count || (remainder * 2 === count && quotient % 2 === 1));
  const result = { version: 1, asOf, period: meta.period, history: { asOf, attendance, ritualDays: rituals }, submissions,
    metrics: { attendanceDays: count, presentDays: present, attendanceRate: count ? rounded / 10 : null,
      pendingDays: attendance.filter(row => row.status === "pending").length, ritualDays: rituals.filter(row => has(row.open) || has(row.close)).length,
      morning, closing, ritualTotal: morning + closing, submissions: submissions.length, confirmed: submissions.filter(row => row.status === "최종 확인 완료").length },
    ritualCandidate: candidateExcerpt(rituals) };
  result.snapshotId = digest(result);
  return result;
}
function renderFiles(result, approval, current = null) {
  keys(approval, ["snapshotId"], ["candidateIds", "excerptChoice", "ritualExcerpt"]);
  check(!approval.candidateIds || (Array.isArray(approval.candidateIds) && approval.candidateIds.length === 0), "이전 장면 ID 승인은 사용할 수 없습니다. 새 승인 템플릿을 사용하세요.");
  check(["", result.snapshotId].includes(approval.snapshotId), "입력이 바뀌어 승인이 만료됐습니다. 새 결과를 검토하세요.");
  const choice = approval.excerptChoice || "current";
  check(["current", "candidate"].includes(choice), "장면 선택은 current/candidate입니다.");
  let selected = choice === "candidate" ? approval.ritualExcerpt : approval.ritualExcerpt ?? current;
  if (choice === "candidate") {
    check(result.ritualCandidate, "발췌할 본인 일화가 없습니다. 기존 장면을 유지하세요.");
    check(selected == null || equal(selected, result.ritualCandidate.excerpt), "후보와 승인 문구가 다릅니다. 다시 검토하세요.");
    selected = result.ritualCandidate.excerpt;
  }
  if (selected != null) validateExcerpt(selected);
  let publicData = null;
  if (approval.snapshotId === result.snapshotId) {
    check(selected, "반영할 장면이 없습니다. 새 승인 템플릿을 사용하세요.");
    const { ritualCandidate, ...records } = result;
    publicData = { ...records, ritualExcerpt: selected };
  }
  const sceneLines = (label, excerpt) => excerpt ? [`## ${label}`, "", "### " + excerpt.title, "", excerpt.description, "", excerpt.body, "", "출처: " + excerpt.source, ""]
    : [`## ${label}`, "", "선택할 수 있는 장면이 없습니다.", ""];
  const scenes = [...sceneLines("1. 기존 문구", current || approval.ritualExcerpt), ...sceneLines("2. 새 후보", result.ritualCandidate?.excerpt)];
  if (result.ritualCandidate) {
    const evidence = result.ritualCandidate.evidence;
    scenes.push("근거 항목: " + evidence.item, "원본 출처: " + evidence.source, "원문: " + evidence.original, "");
  }
  const review = ["# 기록과 리추얼 장면 갱신 검토", "", "## 숫자", "", "```json", dump(result.metrics).trim(), "```", "",
    "출석·리추얼·제출 기록과 선택한 리추얼 장면만 반영합니다. 내 이야기·소개·논문·문서·연락처는 유지합니다.",
    "과제 body가 비어 있으면 content.js의 같은 코드 기존 본문을 유지합니다.", "", ...scenes, `스냅샷 ID: \`${result.snapshotId}\``];
  const template = { snapshotId: result.snapshotId, excerptChoice: "current" };
  if (current || selected) template.ritualExcerpt = current || selected;
  return { "records-result.json": dump(result), "records-review.md": review.join("\n") + "\n", "ritual-candidate.md": scenes.join("\n") + "\n",
    "approval-template.json": dump(template), "records-import.js": "// 자동 생성. 승인한 기록과 리추얼 장면\nwindow.PORTFOLIO_IMPORT = " + dump(publicData).trim().replace(/</g, "\\u003c").replace(/>/g, "\\u003e") + ";\n" };
}
function outputWrites(output, files) {
  return new Map([...Object.entries(files).map(([name, value]) => [path.join(output, name), Buffer.from(value)]), [path.join(output, "paragraph-candidates.md"), null]]);
}
function writeTransaction(files) {
  const staged = new Set(), originals = new Map(), installed = [], prepared = new Map();
  function stage(file, bytes) {
    const temporary = path.join(path.dirname(file), `.records-${crypto.randomUUID()}.tmp`);
    const handle = fs.openSync(temporary, "wx"); staged.add(temporary);
    try { fs.writeFileSync(handle, bytes); fs.fsyncSync(handle); } finally { fs.closeSync(handle); }
    return temporary;
  }
  try {
    for (const [file, value] of files) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      originals.set(file, fs.existsSync(file) ? fs.readFileSync(file) : null);
      if (value !== null) prepared.set(file, stage(file, value));
    }
    // 동기식 교체 구간에는 JS 신호 콜백이 끼어들지 않습니다. 사이트 파일은 항상 마지막입니다.
    for (const [file, value] of files) {
      if (value === null) fs.rmSync(file, { force: true }); else fs.renameSync(prepared.get(file), file);
      installed.push(file);
    }
  } catch (error) {
    try {
      for (const file of installed.reverse()) {
        const original = originals.get(file);
        if (original === null) fs.rmSync(file, { force: true }); else fs.renameSync(stage(file, original), file);
      }
    } catch { throw new RecordError("파일 복구를 완료하지 못했습니다. 파일 권한과 기존 사이트 데이터를 확인하세요."); }
    throw error;
  } finally { for (const file of staged) fs.rmSync(file, { force: true }); }
}
function generate(folder, output, approvals = null, siteRoot = null) {
  const result = build(folder), approval = approvals ? load(path.dirname(approvals), path.basename(approvals)) : { snapshotId: "" };
  writeTransaction(outputWrites(output, renderFiles(result, approval, siteRoot ? currentExcerpt(siteRoot) : null)));
  return result;
}
async function updateSite(folder, output, siteRoot, { approvals = null, confirm = null, excerptChoice = "current", choose = null } = {}) {
  for (const name of ["index.html", "app.js", "content.js"]) check(fs.existsSync(path.join(siteRoot, name)), `사이트 파일이 없습니다: ${name}`);
  check(fs.existsSync(path.join(siteRoot, "data")), "사이트의 data 폴더가 필요합니다.");
  const destination = path.join(siteRoot, "data/records-import.js");
  const resolvedOutput = fs.existsSync(output) ? fs.realpathSync(output) : path.resolve(output);
  check(path.resolve(destination) !== path.join(resolvedOutput, "records-import.js"), "--output은 사이트 data 폴더와 다른 검토 결과 폴더를 사용하세요.");
  const lock = path.join(siteRoot, "data/.records-update.lock");
  let handle;
  try { handle = fs.openSync(lock, "wx"); }
  catch (error) { if (error.code === "EEXIST") throw new RecordError("다른 갱신 작업이 진행 중입니다. 실행 중인 작업이 없는지 확인한 후 data/.records-update.lock을 삭제하세요."); throw error; }
  fs.closeSync(handle);
  try {
    const result = build(folder), current = currentExcerpt(siteRoot);
    const approval = approvals ? load(path.dirname(approvals), path.basename(approvals)) : { snapshotId: result.snapshotId };
    check(approval.snapshotId === result.snapshotId, "미승인 스냅샷은 사이트에 반영할 수 없습니다.");
    if (!approvals) {
      check(confirm, "갱신에는 실행 중 확인 또는 --yes가 필요합니다.");
      if (!await confirm(result)) return null;
      const choice = excerptChoice || await choose(current, result.ritualCandidate);
      if (!choice) return null;
      approval.excerptChoice = choice;
      approval.ritualExcerpt = choice === "candidate" && result.ritualCandidate ? result.ritualCandidate.excerpt : current;
    } else check(Object.hasOwn(approval, "ritualExcerpt") || approval.excerptChoice === "candidate", "장면 선택이 없는 이전 승인입니다. 새 템플릿을 사용하세요.");
    const files = renderFiles(result, approval, current);
    files["applied-approval.json"] = dump(approval);
    const writes = outputWrites(output, files);
    writes.set(destination, Buffer.from(files["records-import.js"]));
    writeTransaction(writes);
    return result;
  } finally { fs.rmSync(lock, { force: true }); }
}
function makePrompt() {
  const rl = readline.createInterface({ input: process.stdin, terminal: false });
  const lines = []; let waiting = null, ended = false, interrupted = false;
  rl.on("line", line => { if (waiting) { const resolve = waiting; waiting = null; resolve(line); } else lines.push(line); });
  rl.on("close", () => { ended = true; if (waiting) { waiting(null); waiting = null; } });
  const cancel = () => { interrupted = true; lines.length = 0; rl.close(); };
  process.on("SIGINT", cancel); process.on("SIGTERM", cancel);
  return { ask(message) {
    process.stdout.write(message);
    if (interrupted) return Promise.resolve(null);
    if (lines.length) return Promise.resolve(lines.shift());
    if (ended) return Promise.resolve(null);
    return new Promise(resolve => { waiting = resolve; });
  }, close() { rl.close(); process.off("SIGINT", cancel); process.off("SIGTERM", cancel); } };
}
async function chooseExcerpt(current, candidate, ask) {
  for (const [label, excerpt] of [["1. 기존 문구 유지", current], ["2. 새 후보로 변경", candidate?.excerpt]]) {
    console.log("\n" + label);
    console.log(excerpt ? `제목: ${excerpt.title}\n설명: ${excerpt.description}\n\n${excerpt.body}\n\n출처: ${excerpt.source}` : "발췌할 본인 일화가 없습니다. 기존 문구만 선택할 수 있습니다.");
  }
  if (candidate) console.log(`후보 근거: ${candidate.evidence.item} · ${candidate.evidence.source}`);
  for (;;) {
    const answer = (await ask("장면 선택 [1: 기존 유지 / 2: 후보 반영 / 0: 전체 취소]: "))?.trim();
    if (answer === "1") return "current";
    if (answer === "2" && candidate) return "candidate";
    if (!answer || answer === "0") return null;
    console.log("선택 가능한 번호를 입력하세요.");
  }
}
function parseArgs(argv) {
  const args = { input: path.join(ROOT, "record-input"), output: path.join(ROOT, "generated"), siteRoot: ROOT };
  const paths = { "--input": "input", "--output": "output", "--site-root": "siteRoot", "--approvals": "approvals" };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (["--help", "-h"].includes(flag)) { args.help = true; continue; }
    if (["--yes", "--preview"].includes(flag)) { args[flag.slice(2)] = true; continue; }
    check(Object.hasOwn(paths, flag) || flag === "--excerpt", "알 수 없는 옵션입니다. --help를 확인하세요.");
    const value = argv[++i]; check(value && !value.startsWith("--"), `${flag}의 값이 필요합니다.`);
    if (flag === "--excerpt") { check(["current", "candidate"].includes(value), "--excerpt는 current/candidate입니다."); args.excerpt = value; }
    else args[paths[flag]] = path.resolve(value);
  }
  check(!(args.approvals && args.excerpt), "--approvals와 --excerpt는 함께 사용할 수 없습니다.");
  check(!(args.preview && (args.yes || args.excerpt)), "--preview는 --yes/--excerpt와 함께 사용할 수 없습니다.");
  return args;
}
async function main(argv = process.argv.slice(2)) {
  let prompt;
  try {
    const args = parseArgs(argv);
    if (args.help) { console.log("node scripts/import_records.js [--input 폴더] [--output 폴더] [--site-root 폴더]\n  --preview: 검토만 생성\n  --yes: 기록 반영 및 기존 장면 유지\n  --excerpt current|candidate: 장면 선택 명시\n  --approvals 파일: 현재 입력의 선택 영수증 사용"); return; }
    let result;
    if (args.preview) result = generate(args.input, args.output, args.approvals, args.siteRoot);
    else {
      if (!args.yes && !args.approvals) prompt = makePrompt();
      result = await updateSite(args.input, args.output, args.siteRoot, { approvals: args.approvals,
        excerptChoice: args.excerpt || (args.yes ? "current" : null),
        confirm: args.yes ? () => true : async value => {
          const m = value.metrics;
          console.log(`기준일 ${value.asOf} · 출석 ${m.attendanceDays}일 (${m.attendanceRate ?? "계산 불가"}%) · 리추얼 ${m.ritualTotal}회 · 과제 ${m.submissions}건`);
          return ["y", "yes"].includes((await prompt.ask("출석·리추얼·과제 제출 기록을 로컬 사이트에 반영할까요? [y/N] "))?.trim().toLowerCase());
        }, choose: (current, candidate) => chooseExcerpt(current, candidate, message => prompt.ask(message)) });
    }
    if (result === null) console.log("갱신을 취소했습니다. 기존 사이트와 결과 파일을 유지합니다.");
    else if (args.preview) console.log(`검토 결과 생성 완료: ${args.output}\n사이트는 변경하지 않았습니다.`);
    else console.log(`로컬 사이트 갱신 완료: ${path.join(args.siteRoot, "data/records-import.js")}\n출석·리추얼·과제 제출 내역과 선택한 장면 반영 · 확인 자료: ${args.output}\n브라우저를 새로고침하세요. 공개 사이트는 재배포해야 반영됩니다.`);
  } catch (error) {
    console.error(error.code === "ENOENT" ? `파일을 찾을 수 없습니다: ${error.path}\n입력 네 파일의 경로를 확인하세요. --approvals는 선택 사항입니다.`
      : "기록 갱신을 완료하지 못했습니다: " + (error instanceof RecordError ? error.message : error.code || error.name));
    process.exitCode = 1;
  } finally { prompt?.close(); }
}
module.exports = { ROOT, RecordError, dump, digest, load, build, candidateExcerpt, currentExcerpt, renderFiles, outputWrites, writeTransaction, generate, updateSite, main };
if (require.main === module) main();
