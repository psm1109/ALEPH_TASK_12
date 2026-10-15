# 현재 작업 상태

- 마지막 수정 날짜: 2026-10-15 (Asia/Seoul)
- 브랜치: `main`, 기준 커밋: `70bb02beecc01e3bc3b46d52fccfaa642b1614f2`
- 앞선 사이트·기록 장치·선택 기능·문서·정리 작업은 미커밋 상태이며 보존했습니다. 커밋·push·외부 배포는 하지 않았습니다.

## 이번 완료: 기록 장치를 JavaScript로 전환

- 사용자 요청으로 기록 갱신·검사·ZIP 생성 도구를 Node.js 표준 모듈 기반 JavaScript로 전환했습니다. Node.js 20 이상, 외부 npm 패키지·Python·API 키·네트워크 없이 기록 장치를 실행합니다. 실제 검사는 Node v24.21.0에서 수행했습니다.
- `scripts/import_records.js`: 입력 검증·집계·후보 생성·현재 문구 읽기·대화형 선택·승인 영수증·미리보기·동시 실행 잠금·동기식 임시 파일/원자 교체·오류 복구를 이식했습니다. content.js의 초기 장면은 JSON 객체 경계만 읽고 JavaScript를 실행하지 않습니다.
- `scripts/test_import_records.js`: Node 내장 node:test/assert로 32개 검사. 임시 폴더와 자식 Node 프로세스를 사용합니다.
- `scripts/package_records.js`: 같은 입력/승인으로 두 번 결과 생성 및 SHA256 비교, 현재 사이트 일치 검증, Node zlib/CRC32/ZIP32로 결정적 ZIP 생성. 정렬된 항목·고정 날짜·UTF-8 파일명을 사용합니다.
- 대체한 `scripts/import_records.py`, `scripts/test_import_records.py`, `scripts/package_records.py`는 삭제했습니다. 이번 범위는 기록 장치이며 기존 Word/논문 생성기는 별도 용도로 유지합니다.
- `README.md`, `docs/RECORD_IMPORT.md`: 모든 기록 명령과 필요 환경을 Node.js로 교체. 사이트 확인용 Python 서버 명령도 제거하고 직접 열기/기존 Live Server 사용으로 안내했습니다.
- `generated/`, `data/records-import.js`, `deliverables/record-updater.zip`, `deliverables/comparison.json`: 현재 기록과 기존 승인 장면을 유지해 재생성. 새 ZIP의 scripts에는 위 JavaScript 3개만 들어 있습니다.
- 이전 Python 결과와 실제 입력의 build 객체(스냅샷 ID 포함) 및 5개 산출물을 바이트 단위로 비교해 일치했습니다. 사이트 화면/데이터와 원문을 바꾸지 않는 이식입니다.

## 실행 방법과 승인 범위

1. record-input/manifest.json, rituals.json, attendance.json, submissions.json에 전체 누적 기록을 넣습니다. version은 형식 버전 1, asOf는 자료를 종합해 확인한 마지막 기록일, end는 전체 기간 종료일입니다. 개인정보 검토 후 privacyReviewed=true.
2. `node scripts/import_records.js` 실행 → 집계 검토 후 y → 기존 문구/새 후보 비교 → 1(기존 유지)/2(후보 반영). 0/Enter/입력 종료는 전체 취소합니다. 잘못된 선택은 다시 질문합니다.
3. index.html 새로고침. 공개 사이트 반영에는 사이트 재배포가 필요합니다. 스크립트는 Git 커밋/push·배포를 수행하지 않습니다.

- `node scripts/import_records.js --yes`: 기록 반영 및 마지막 승인 장면 유지.
- `node scripts/import_records.js --yes --excerpt candidate`: 해당 실행의 후보까지 명시적으로 승인. 후보가 없으면 전체 반영 거절.
- `node scripts/import_records.js --preview`: 비교 파일만 생성, 사이트 유지.
- `node --test scripts/test_import_records.js`: 검사.
- `node scripts/package_records.js`: 현재 승인된 실제 입력/사이트/장치 소스/README/마지막 결과/비교/영수증 ZIP 생성.
- --input/--output/--site-root/--approvals 경로 옵션 유지. 기본 경로는 스크립트가 들어 있는 저장소 기준입니다.
- generated/applied-approval.json은 snapshotId/excerptChoice/선택 문구를 담습니다. 옛 장면 ID 승인과 선택 없는 옛 승인은 거절합니다. 같은 승인 영수증으로 선택을 재현합니다.
- 같은 입력이면 집계·후보·snapshotId가 같고 같은 입력/승인 문구면 공개 결과가 같습니다. 비교 문서의 기존 문구는 실행 전 상태에 따라 달라질 수 있으므로 ZIP 비교는 같은 입력과 승인 영수증을 사용합니다.
- 장면과 기록은 하나의 data/records-import.js로 마지막에 교체합니다. 오류 시 검토 산출물까지 복구합니다. 대화 중 SIGINT/SIGTERM/입력 종료는 취소합니다. 동기식 파일 교체 중에는 JS 신호 콜백이 실행되지 않습니다. OS 강제 종료는 별도이며 남은 잠금은 실행 중인 작업이 없는지 확인한 뒤 제거합니다.

## 현재 기록과 장면 표시

- 기준일 2026-10-15, 기간 2026-08-11~2026-11-12. 출석43일(일반41·공가1·확정 전1), 인정42일·97.7%. 리추얼60일·아침60·마무리60·총120회. 과제T01~T11 11건 최종 확인 완료.
- 후보는 rituals.json의 12자 이상 ‘강점이 드러난 일화’ 본인 기록에서 하나만 발췌합니다. 도움/설명/공유 표현 우선 → 최신 날짜 → 마무리 → 원문 앞 항목 순입니다. 해당 표현이 없으면 최근 본인 일화, 해당 항목이 없으면 후보 없음. 동료 평가·다짐·감사는 발췌하지 않습니다. 본문 각색 없이 문맥과 주체는 사람이 검토합니다.
- 현재 후보는 2026-10-06 아침, 동료에게 도구와 방법을 알려준 일화입니다. 실제 사이트는 사용자가 앞서 고른 **2026-09-11 아침 라우팅·방화벽 설명과 학습 사이트 소개 장면**을 유지했습니다.
- 초기 장면은 content.js의 JSON 문법 ritualExcerpt, 이후에는 마지막 승인 스냅샷의 ritualExcerpt가 우선합니다. 기존 유지 선택은 마지막 승인 장면을 유지하며 날짜가 새 입력에서 빠져도 보존합니다.
- 기존 사이트 형식: ‘리추얼에서 고른 한 장면’ → 설명 → 장면 제목 → 문장별 줄바꿈한 원문 → 날짜/아침·마무리 출처. 이동 링크·중복 날짜 필드·능력별 후보는 없습니다.
- generated/records-result.json에는 후보와 근거, records-review.md/ritual-candidate.md에는 비교가 들어갑니다. 공개 JS에는 미선택 후보의 별도 필드를 넣지 않습니다. 원문 기록은 기존처럼 공개 JS에 포함됩니다.
- 과제 body가 비면 content.js의 같은 코드 초기 본문 유지, 새 body는 일반 텍스트로 표시. 다음 누적 입력에도 새 body를 포함해야 유지되며 목록에서 빠진 과제는 표시하지 않습니다.
- data/records-history.js의 초기 원문, 내 이야기6편·소개·대표작·문서·연락처·줄바꿈과 기존 정리 결과는 유지했습니다. .checks/캐시는 삭제하지 않았습니다.

## 실제 검사와 결과

- 작업 전 PROJECT_CONTEXT.md/AGENTS.md, git status/branch/HEAD 확인. 기준 커밋은 위와 같습니다.
- JavaScript build와 기존 Python 결과 JSON 객체를 deepEqual 비교: 현재 입력의 집계·후보·snapshotId 일치. renderFiles의 5개 결과와 기존 생성 파일의 UTF-8 바이트 일치.
- `node --test scripts/test_import_records.js`: **32개 통과**. 첫 샌드박스 실행은 자식 프로세스 spawn EPERM으로 시작되지 않았으며 로컬 프로세스 실행이 허용된 재실행에서 통과했습니다.
- 검사 범위: 기본 경로/새 폴더/다른 cwd·두 실행 일치·대화형 기존/후보 선택·유지·취소/EOF·잘못된 번호·후보 없음·원문 근거/우선순위/타인 평가 제외·승인 재현/만료·입력/날짜/시각/자료형·연락처 가림·잠금·교체 오류 및 중단 예외 복구·경로 충돌·ZIP CRC32/UTF-8/결정성·패키징 만료 거절. 출석률 절반 반올림31.25→31.2도 확인.
- 실제 Windows Ctrl+C 신호는 자동 전송해 확인하지 않았습니다. 대기 중 입력 종료 취소와 중단 예외 복구를 검사했습니다.
- `node --check scripts/import_records.js`, package_records.js, test_import_records.js: 통과. `node scripts/import_records.js --help`: 안내 정상.
- `node scripts/import_records.js --yes`: 현재 기록/기존 장면 유지해 반영 성공. `node scripts/package_records.js`: ZIP/5개 산출물 두 실행 비교 성공.
- .NET System.IO.Compression으로 새 ZIP38항목 추출/전체 항목 읽기 성공, scripts/*.py 미포함 확인. 추출 당시 JavaScript 검사31개 전부 통과했으며 이후 반올림 검사1개를 추가해 프로젝트에서 최종32개를 통과했습니다. 최종 ZIP도 다시 생성했습니다.
- `.checks/verify-node-device.cjs`: 압축 해제 소스 바이트 일치, 다른 cwd에서 두 실행 generated 전체 일치, 실제 입력으로 y/2 후보 선택→y/1 유지→y/0 취소, content.js 보존, ZIP 두 번 재생성 바이트 동일 확인.
- `git diff --check`: 통과(기존 파일 LF→CRLF 안내만).
- 이번에는 브라우저 검사를 재실행하지 않았습니다. 화면 코드 변경 없이 현재 생성 데이터 바이트 일치를 확인했습니다. 앞선 선택 기능 작업에서 PC1280/모바일390 표시·줄바꿈·출처·다른 섹션 보존을 브라우저와 스크린샷으로 확인했습니다.
- 실제 배포·외부 링크·Supabase 미확인, SQL 미실행.

## 다음 단계와 남은 항목

- 다음 갱신은 위 Node 명령을 사용합니다. Python 기록 명령은 더 이상 존재하지 않습니다. docs/RECORD_IMPORT.md에 형식과 세 단계 실행이 있습니다.
- BRA-C09 결정성과 새 폴더 실행 확인. BRA-C10 전체 통과는 미확인: 논문/JS 참고문헌 저자명이 남아 있으며 privacyReviewed는 완전한 자동 검증이 아닙니다.
- Node.js20에서 별도로 실행하지 않았고 현재 PC의 Node24에서 검증했습니다. 외부 네트워크와 npm 설치 없이 동작합니다.
- Word 본문·이력서·최종 프로젝트 경험은 미작성. 별도 Word 생성기 scripts/build_application_documents.py는 python-docx, 논문 생성기 scripts/build_paper.py는 Python 표준 모듈을 사용하는 기존 도구입니다. 기록 갱신과 ZIP 실행에는 필요하지 않습니다.
- 업로드 UI·DB·자동 배포는 없습니다. JavaScript 비활성화 시 초기 숫자와 안내만 표시됩니다.
- .checks의 옛 Python 도구 참조/이전 링크·고정 장면 가정 검사는 과거 임시 자료입니다. 현행 검사는 scripts/test_import_records.js이며 선택 화면 검사는 .checks/verify-excerpt-choice.cjs입니다.
