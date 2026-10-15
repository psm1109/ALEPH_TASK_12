"use strict";
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");
const crypto = require("node:crypto");
const { ROOT, dump, load, build, renderFiles, writeTransaction, RecordError } = require("./import_records.js");

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function zip(files) {
  // ZIP32의 고정 날짜·정렬된 항목·UTF-8 이름으로 외부 압축 도구 없이 재현합니다.
  const local = [], directory = []; let offset = 0, centralSize = 0;
  if (files.size > 65535) throw new RecordError("ZIP32 항목 수를 초과했습니다.");
  for (const [name, value] of [...files].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)) {
    const raw = Buffer.isBuffer(value) ? value : Buffer.from(value), filename = Buffer.from(name);
    const compressed = zlib.deflateRawSync(raw), crc = crc32(raw);
    if (raw.length > 0xffffffff || offset + compressed.length + filename.length + 30 > 0xffffffff) throw new RecordError("ZIP32 크기를 초과했습니다.");
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0); header.writeUInt16LE(20, 4); header.writeUInt16LE(0x800, 6);
    header.writeUInt16LE(8, 8); header.writeUInt16LE((46 << 9) | (1 << 5) | 1, 12);
    header.writeUInt32LE(crc, 14); header.writeUInt32LE(compressed.length, 18); header.writeUInt32LE(raw.length, 22); header.writeUInt16LE(filename.length, 26);
    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(0x02014b50, 0); entry.writeUInt16LE(20, 4); entry.writeUInt16LE(20, 6); entry.writeUInt16LE(0x800, 8);
    entry.writeUInt16LE(8, 10); entry.writeUInt16LE((46 << 9) | (1 << 5) | 1, 14);
    entry.writeUInt32LE(crc, 16); entry.writeUInt32LE(compressed.length, 20); entry.writeUInt32LE(raw.length, 24);
    entry.writeUInt16LE(filename.length, 28); entry.writeUInt32LE(offset, 42);
    local.push(header, filename, compressed); directory.push(entry, filename);
    offset += header.length + filename.length + compressed.length; centralSize += entry.length + filename.length;
  }
  if (offset + centralSize > 0xffffffff) throw new RecordError("ZIP32 크기를 초과했습니다.");
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.size, 8); end.writeUInt16LE(files.size, 10);
  end.writeUInt32LE(centralSize, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, ...directory, end]);
}
function packageRecords(root = ROOT, siteRoot = root) {
  const result = build(path.join(root, "record-input"));
  const approval = load(path.join(root, "generated"), "applied-approval.json");
  if (approval.snapshotId !== result.snapshotId) throw new RecordError("현재 입력이 마지막 승인과 다릅니다. 먼저 node scripts/import_records.js로 검토·갱신하세요.");
  const first = renderFiles(result, approval), second = renderFiles(build(path.join(root, "record-input")), approval);
  const comparison = Object.keys(first).sort().map(file => {
    if (first[file] !== second[file]) throw new RecordError("두 실행 결과가 다릅니다.");
    const sha = value => crypto.createHash("sha256").update(value).digest("hex");
    return { file, identical: true, firstSha256: sha(first[file]), secondSha256: sha(second[file]) };
  });
  if (first["records-import.js"] !== fs.readFileSync(path.join(siteRoot, "data/records-import.js"), "utf8")) throw new RecordError("사이트 데이터와 현재 승인 결과가 다릅니다. 먼저 갱신하세요.");
  const files = new Map();
  const add = name => files.set(name, fs.readFileSync(path.join(root, name)));
  for (const name of ["import_records.js", "test_import_records.js", "package_records.js"]) add(`scripts/${name}`);
  for (const name of ["manifest.json", "attendance.json", "rituals.json", "submissions.json"]) add(`record-input/${name}`);
  // 장치와 사이트는 별도 제출합니다. 결과 JS는 generated에만 보관합니다.
  files.set("README.md", fs.readFileSync(path.join(root, "docs/RECORD_IMPORT.md")));
  files.set("docs/RECORD_IMPORT.md", files.get("README.md")); files.set("comparison.json", dump(comparison));
  for (const folder of ["generated"]) {
    for (const [name, value] of Object.entries(first)) files.set(`${folder}/${name}`, value);
    files.set(`${folder}/applied-approval.json`, dump(approval));
  }
  writeTransaction(new Map([[path.join(root, "deliverables/comparison.json"), Buffer.from(dump(comparison))],
    [path.join(root, "deliverables/record-updater-device.zip"), zip(files)]]));
  return comparison;
}
module.exports = { crc32, zip, packageRecords };
if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== "--site-root" || !args[1] || args[1].startsWith("--"))) throw new RecordError("사용법: node scripts/package_records.js [--site-root 사이트폴더]");
    packageRecords(ROOT, args.length ? path.resolve(args[1]) : ROOT);
    console.log("사이트를 제외한 장치 ZIP과 두 실행 비교를 생성했습니다.");
  }
  catch (error) { console.error(error instanceof RecordError ? error.message : error.code || error.name); process.exitCode = 1; }
}
