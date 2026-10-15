"use strict";
const { test, mock } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { spawnSync, spawn } = require("node:child_process");
const { ROOT, build, dump, generate, updateSite, writeTransaction } = require("./import_records.js");
const { zip, crc32, packageRecords } = require("./package_records.js");

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "record-js-test-"));
  // 삭제 범위는 이 검사에서 생성한 임시 폴더로 한정합니다.
  t.after(() => { assert(path.resolve(root).startsWith(path.join(os.tmpdir(), "record-js-test-"))); fs.rmSync(root, { recursive: true, force: true }); });
  const site = path.join(root, "site"), inputs = path.join(site, "record-input"), output = path.join(site, "generated");
  fs.mkdirSync(inputs, { recursive: true }); fs.mkdirSync(path.join(site, "data"));
  for (const name of ["index.html", "app.js"]) fs.writeFileSync(path.join(site, name), "test fixture");
  const initial = { title: "기존 제목", body: "기존에 직접 고른 장면 원문입니다.", source: "2026-09-11 아침 리추얼", description: "기존 설명" };
  fs.writeFileSync(path.join(site, "content.js"), "window.PORTFOLIO_CONTENT = { ritualExcerpt: " + dump(initial) + "};");
  const published = path.join(site, "data/records-import.js"); fs.writeFileSync(published, "window.PORTFOLIO_IMPORT = null;\n");
  const write = (name, value) => fs.writeFileSync(path.join(inputs, name + ".json"), dump(value));
  const read = name => JSON.parse(fs.readFileSync(path.join(inputs, name + ".json"), "utf8"));
  write("manifest", { version: 1, asOf: "2026-10-12", period: { start: "2026-08-11", end: "2026-11-12" }, privacyReviewed: true });
  write("attendance", { attendance: [{ date: "2026-10-12", status: "pending", source: "검사용 출석" }] });
  write("rituals", { ritualDays: [{ date: "2026-10-12", open: ["강점이 드러난 일화: 원인을 확인하고 오류를 해결했습니다. 결과도 기록했습니다.", "동료 1에게 말한 장점: 다른 사람의 행동입니다."], close: null, source: "검사용 리추얼" }] });
  write("submissions", { submissions: [{ code: "T01", date: "2026-09-10", status: "최종 확인 완료", title: "검사용 과제", body: "", source: "검사용 제출" }] });
  const cli = (extra = [], answer = "") => spawnSync(process.execPath, [path.join(ROOT, "scripts/import_records.js"), "--input", inputs, "--output", output, "--site-root", site, ...extra], { input: answer, encoding: "utf8", timeout: 10000 });
  const publicData = () => JSON.parse(fs.readFileSync(published, "utf8").split("window.PORTFOLIO_IMPORT = ")[1].trim().replace(/;$/, ""));
  function snapshot() {
    const values = {};
    function walk(folder) { for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) walk(file); else values[path.relative(site, file)] = fs.readFileSync(file).toString("base64");
    } }
    walk(site); return values;
  }
  return { root, site, inputs, output, initial, published, write, read, cli, publicData, snapshot };
}
function success(process) { assert.equal(process.status, 0, process.stderr || process.error?.message); }

test("새 폴더에서 다른 cwd로 두 번 실행해 같은 결과", t => {
  const f = fixture(t); fs.cpSync(path.join(ROOT, "scripts"), path.join(f.site, "scripts"), { recursive: true, filter: source => !source.includes("__pycache__") });
  const run = () => spawnSync(process.execPath, [path.join(f.site, "scripts/import_records.js"), "--yes"], { cwd: f.root, encoding: "utf8" });
  success(run()); const first = f.snapshot(); success(run()); assert.deepEqual(f.snapshot(), first);
  assert.equal(fs.readFileSync(f.published, "utf8"), fs.readFileSync(path.join(f.output, "records-import.js"), "utf8"));
  assert.deepEqual(Object.keys(JSON.parse(fs.readFileSync(path.join(f.output, "applied-approval.json")))).sort(), ["excerptChoice", "ritualExcerpt", "snapshotId"]);
});
test("한 번의 대화에서 숫자 승인 후 기존 문구 유지", t => {
  const f = fixture(t); success(f.cli([], "y\n1\n"));
  assert.deepEqual(f.publicData().ritualExcerpt, f.initial);
  assert.equal(f.publicData().metrics.ritualTotal, 1);
  assert.equal(fs.readFileSync(path.join(f.site, "app.js"), "utf8"), "test fixture");
  assert(!("ritualCandidate" in f.publicData()));
});
test("후보를 고른 후 다음 실행은 그 장면 유지", t => {
  const f = fixture(t), content = fs.readFileSync(path.join(f.site, "content.js"));
  success(f.cli([], "y\n2\n")); const chosen = f.publicData().ritualExcerpt;
  assert.deepEqual(chosen, build(f.inputs).ritualCandidate.excerpt);
  const rows = f.read("rituals"); rows.ritualDays[0].open[0] = "강점이 드러난 일화: 새로 발견한 문제를 해결하고 작업 내용을 정리했습니다."; f.write("rituals", rows);
  success(f.cli(["--yes"])); assert.deepEqual(f.publicData().ritualExcerpt, chosen);
  assert.deepEqual(fs.readFileSync(path.join(f.site, "content.js")), content);
});
for (const [label, answer] of [["첫 질문 취소", "n\n"], ["처음 입력 종료", ""], ["선택 취소", "y\n0\n"], ["선택 입력 종료", "y\n"], ["선택 Enter", "y\n\n"]]) {
  test(label + "는 모든 파일 보존", t => { const f = fixture(t), before = f.snapshot(); success(f.cli([], answer)); assert.deepEqual(f.snapshot(), before); });
}
test("잘못된 번호는 다시 질문하고 후보 반영", t => { const f = fixture(t); success(f.cli([], "y\n9\n2\n")); assert.deepEqual(f.publicData().ritualExcerpt, build(f.inputs).ritualCandidate.excerpt); });
test("명시적인 후보 자동 승인과 후보 없음 거절", t => {
  const f = fixture(t); success(f.cli(["--yes", "--excerpt", "candidate"]));
  f.write("rituals", { ritualDays: [] }); const before = f.snapshot();
  assert.equal(f.cli(["--yes", "--excerpt", "candidate"]).status, 1); assert.deepEqual(f.snapshot(), before); success(f.cli(["--yes"]));
});
test("후보 우선순위·원문 근거·입력 순서 결정성", t => {
  const f = fixture(t), rows = f.read("rituals");
  rows.ritualDays.push({ date: "2026-09-11", open: ["강점이 드러난 일화: 동료에게 어려운 내용을 설명해주고 학습 자료를 소개해주었습니다."], close: null, source: "원본" });
  f.write("rituals", rows); const first = build(f.inputs); rows.ritualDays.reverse(); f.write("rituals", rows);
  assert.deepEqual(build(f.inputs), first); assert.equal(first.ritualCandidate.excerpt.source, "2026-09-11 아침 리추얼");
  assert(first.ritualCandidate.evidence.original.endsWith(first.ritualCandidate.excerpt.body));
});
test("동료 평가와 다짐은 본인 일화로 발췌하지 않음", t => {
  const f = fixture(t), rows = f.read("rituals"); rows.ritualDays[0].open = ["동료 1에게 말한 장점: 동료에게 설명해주고 도와주었습니다.", "오늘의 첫 행동: 오늘도 동료에게 도움을 주겠다."];
  f.write("rituals", rows); assert.equal(build(f.inputs).ritualCandidate, null);
});
test("미리보기는 기존/후보/근거만 생성하고 사이트 보존", t => {
  const f = fixture(t), before = fs.readFileSync(f.published); success(f.cli(["--preview"]));
  assert.deepEqual(fs.readFileSync(f.published), before);
  const review = fs.readFileSync(path.join(f.output, "ritual-candidate.md"), "utf8");
  assert(review.includes(f.initial.body)); assert(review.includes("근거 항목:")); assert(fs.readFileSync(path.join(f.output, "records-import.js"), "utf8").includes("= null;"));
});
test("선택 영수증 재현과 동일 후보 재승인", t => {
  const f = fixture(t); success(f.cli(["--yes", "--excerpt", "candidate"])); const first = fs.readFileSync(f.published);
  success(f.cli(["--approvals", path.join(f.output, "applied-approval.json")])); assert.deepEqual(fs.readFileSync(f.published), first);
  success(f.cli(["--yes", "--excerpt", "candidate"])); assert.deepEqual(fs.readFileSync(f.published), first);
});
test("생성 후보 참조 승인 지원 및 다른 문구 혼입 거절", t => {
  const f = fixture(t), file = path.join(f.site, "approval.json"), approval = { snapshotId: build(f.inputs).snapshotId, excerptChoice: "candidate", ritualExcerpt: f.initial };
  fs.writeFileSync(file, dump(approval)); const before = f.snapshot(); assert.equal(f.cli(["--approvals", file]).status, 1); assert.deepEqual(f.snapshot(), before);
  delete approval.ritualExcerpt; fs.writeFileSync(file, dump(approval)); success(f.cli(["--approvals", file]));
  assert.deepEqual(f.publicData().ritualExcerpt, build(f.inputs).ritualCandidate.excerpt);
});
test("누락 입력과 승인 파일의 경로 안내", t => {
  const f = fixture(t); fs.unlinkSync(path.join(f.inputs, "rituals.json")); const before = f.snapshot();
  const run = f.cli(["--yes"]); assert.equal(run.status, 1); assert(run.stderr.includes("rituals.json")); assert.deepEqual(f.snapshot(), before);
  f.write("rituals", { ritualDays: [] }); const missing = f.cli(["--approvals", path.join(f.site, "missing.json")]); assert(missing.stderr.includes("missing.json"));
});
test("만료 승인 거절 및 기본 실행은 예전 승인 파일 무시", t => {
  const f = fixture(t), approval = path.join(f.site, "approvals.json");
  generate(f.inputs, f.output); fs.writeFileSync(approval, dump({ snapshotId: build(f.inputs).snapshotId, ritualExcerpt: f.initial }));
  const rows = f.read("attendance"); rows.attendance[0].status = "present"; f.write("attendance", rows); const before = f.snapshot();
  assert.equal(f.cli(["--approvals", approval]).status, 1); assert.deepEqual(f.snapshot(), before); success(f.cli(["--yes"]));
});
test("옛 장면 ID 및 장면 선택 없는 승인 거절", t => {
  const f = fixture(t), file = path.join(f.site, "approval.json");
  for (const extra of [{ candidateIds: ["old"] }, {}]) {
    fs.writeFileSync(file, dump({ snapshotId: build(f.inputs).snapshotId, ...extra })); const before = f.snapshot();
    assert.equal(f.cli(["--approvals", file]).status, 1); assert.deepEqual(f.snapshot(), before);
  }
});
test("리추얼 원문 전체 보존 및 옛 발췌 파일 정리", t => {
  const f = fixture(t), rows = f.read("rituals"); rows.ritualDays[0].close = ["오늘의 첫 행동: 다음 계획"]; f.write("rituals", rows);
  assert.deepEqual(build(f.inputs).history.ritualDays, rows.ritualDays);
  fs.mkdirSync(f.output); fs.writeFileSync(path.join(f.output, "paragraph-candidates.md"), "old"); success(f.cli(["--yes"]));
  assert(!fs.existsSync(path.join(f.output, "paragraph-candidates.md")));
});
test("중복·빈 기록과 집계", t => {
  const f = fixture(t); assert.equal(build(f.inputs).metrics.attendanceRate, 0);
  const rows = f.read("attendance"); rows.attendance.push(rows.attendance[0]); f.write("attendance", rows); const before = f.snapshot();
  assert.equal(f.cli(["--yes"]).status, 1); assert.deepEqual(f.snapshot(), before);
  for (const [name, field] of [["attendance", "attendance"], ["rituals", "ritualDays"], ["submissions", "submissions"]]) f.write(name, { [field]: [] });
  assert.equal(build(f.inputs).metrics.attendanceRate, null); success(f.cli(["--yes"]));
});
test("출석률 소수점 절반 반올림은 기존 기준 유지", t => {
  const f = fixture(t);
  f.write("attendance", { attendance: Array.from({ length: 16 }, (_, index) => ({ date: `2026-09-${String(index + 1).padStart(2, "0")}`, status: index < 5 ? "present" : "pending", source: "반올림 검사" })) });
  assert.equal(build(f.inputs).metrics.attendanceRate, 31.2);
});
test("미래 날짜와 JSON 오류는 파일·위치 안내 및 출력 보존", t => {
  const f = fixture(t); success(f.cli(["--yes"])); const rows = f.read("rituals"); rows.ritualDays[0].date = "2026-10-13"; f.write("rituals", rows); const before = f.snapshot();
  assert.equal(f.cli(["--yes"]).status, 1); assert.deepEqual(f.snapshot(), before);
  fs.writeFileSync(path.join(f.inputs, "rituals.json"), "{"); const run = f.cli(["--yes"]); assert(run.stderr.includes("1행")); assert(run.stderr.includes("rituals.json"));
});
test("존재하지 않는 날짜·잘못된 자료형·시각 차단", t => {
  const f = fixture(t);
  for (const update of [row => { row.date = "2026-09-31"; }, row => { row.entry = "24:00"; }, row => { row.note = 42; }, row => { row.note = null; }]) {
    f.write("attendance", { attendance: [{ date: "2026-10-12", status: "present", source: "검사" }] }); const rows = f.read("attendance"); update(rows.attendance[0]); f.write("attendance", rows);
    assert.equal(f.cli(["--yes"]).status, 1);
  }
});
test("이스케이프된 연락처 차단, 값은 오류에 노출하지 않음", t => {
  const f = fixture(t), rows = f.read("submissions"); rows.submissions[0].body = "example@example.invalid";
  fs.writeFileSync(path.join(f.inputs, "submissions.json"), dump(rows).replace("@", "\\u0040")); const run = f.cli(["--yes"]);
  assert.equal(run.status, 1); assert(!run.stderr.includes("example@example.invalid")); assert(!fs.existsSync(f.output));
});
test("동시 실행 잠금은 기존 파일 보존", t => {
  const f = fixture(t); fs.writeFileSync(path.join(f.site, "data/.records-update.lock"), ""); const before = f.snapshot();
  const run = f.cli(["--yes"]); assert.equal(run.status, 1); assert(run.stderr.includes("다른 갱신")); assert.deepEqual(f.snapshot(), before);
});
test("사이트 교체 오류는 전체 결과와 삭제 파일 복구", async t => {
  const f = fixture(t); success(f.cli(["--yes"])); fs.writeFileSync(path.join(f.output, "paragraph-candidates.md"), "old");
  const rows = f.read("attendance"); rows.attendance[0].status = "present"; f.write("attendance", rows); const before = f.snapshot(), rename = fs.renameSync;
  const mocked = mock.method(fs, "renameSync", (source, destination) => { if (destination === f.published) throw Object.assign(new Error("simulated"), { code: "EACCES" }); return rename(source, destination); });
  try { await assert.rejects(updateSite(f.inputs, f.output, f.site, { confirm: () => true }), /simulated/); } finally { mocked.mock.restore(); }
  assert.deepEqual(f.snapshot(), before);
});
test("교체 중 중단 예외도 이전 파일로 복구", t => {
  const f = fixture(t), file = path.join(f.site, "app.js"), before = fs.readFileSync(file), rename = fs.renameSync;
  let calls = 0;
  const mocked = mock.method(fs, "renameSync", (source, destination) => { if (++calls === 2) throw new Error("interrupted"); return rename(source, destination); });
  try { assert.throws(() => writeTransaction(new Map([[file, Buffer.from("changed")], [path.join(f.site, "new.txt"), Buffer.from("new")]])), /interrupted/); } finally { mocked.mock.restore(); }
  assert.deepEqual(fs.readFileSync(file), before); assert(!fs.existsSync(path.join(f.site, "new.txt")));
});
test("검토 출력과 사이트 data 경로 충돌 차단", async t => {
  const f = fixture(t), before = f.snapshot(); await assert.rejects(updateSite(f.inputs, path.join(f.site, "data"), f.site, { confirm: () => true }), /--output/); assert.deepEqual(f.snapshot(), before);
});
test("옵션 오류는 쓰기 전에 차단", t => {
  const f = fixture(t), before = f.snapshot();
  for (const extra of [["--preview", "--yes"], ["--excerpt", "unknown"], ["--unknown"], ["--input"], ["--approvals", "a", "--excerpt", "candidate"]]) assert.equal(f.cli(extra).status, 1);
  assert.deepEqual(f.snapshot(), before);
});
test("대화 대기 중 입력 종료는 취소하고 잠금 해제", async t => {
  const f = fixture(t), before = f.snapshot();
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(ROOT, "scripts/import_records.js"), "--input", f.inputs, "--output", f.output, "--site-root", f.site]);
    let output = "", sent = false;
    const timer = setTimeout(() => { child.kill(); reject(new Error("prompt timeout")); }, 5000);
    child.stdout.on("data", data => { output += data; if (!sent && output.includes("[y/N]")) { sent = true; child.stdin.end(); } });
    // Windows의 child.kill(SIGINT)는 강제 종료이므로, EOF로 동일한 대기 취소 경로를 검증합니다.
    child.on("error", reject); child.on("exit", code => { clearTimeout(timer); try { assert.equal(code, 0); resolve(); } catch (error) { reject(error); } });
  });
  assert.deepEqual(f.snapshot(), before);
});
test("ZIP CRC32·날짜·UTF-8·순서·바이트 재현", () => {
  assert.equal(crc32(Buffer.from("123456789")), 0xcbf43926);
  const first = zip(new Map([["나.txt", "기록"], ["a.txt", "hello"]]));
  assert.deepEqual(first, zip(new Map([["a.txt", "hello"], ["나.txt", "기록"]])));
  assert.equal(first.readUInt32LE(0), 0x04034b50); assert.equal(first.readUInt16LE(6), 0x800);
});
test("패키징은 현재 승인과 다른 입력 및 사이트를 거절", t => {
  const f = fixture(t); success(f.cli(["--yes"])); fs.writeFileSync(f.published, "stale"); assert.throws(() => packageRecords(f.site), /사이트 데이터/);
  const rows = f.read("attendance"); rows.attendance[0].status = "present"; f.write("attendance", rows); assert.throws(() => packageRecords(f.site), /마지막 승인/);
});
