# 현재 작업 상태

- 마지막 수정 날짜: 2026-10-15 (Asia/Seoul)
- 브랜치: `main`, 기준 커밋: `0155884ce6e1cdeddca68d98cc23ea453969f450`
- 이번 이야기 압축 작업 시작 시 기존 변경은 수정된 `PROJECT_CONTEXT.md`와 미추적 `T11.md`였습니다. 기존 문서 변경을 유지했으며 `T11.md`는 변경하지 않았습니다. 기록 장치와 논문 카드 변경은 현재 기준 커밋에 포함되어 있습니다. 이번 작업에서 커밋·push·외부 배포는 하지 않았습니다.

## 이번 완료: 내 이야기 6편 압축 반영

- 사용자가 채팅에서 승인한 압축문을 `content.js`의 `story`에 반영했습니다. 첫 장면 제목을 ‘컴퓨터에 대한 관심으로 시작한 진로 탐색’으로 바꾸고, 6편의 본문과 역량 설명을 교체했습니다.
- 후속 사실 정정: 사용자 설명에 따라 본인이 다른 부서에 포트 설정 확인을 요청하고, 협력 과정에서 인트라넷·인터넷 포트 설정 오류를 발견한 역할을 명시했습니다. 이후 간부님이 현장에서 설정을 변경해 연결을 복구한 흐름으로 본문과 역량 설명을 정리했습니다. 해당 두 필드 외 데이터가 동일함을 Node VM 객체 비교로 확인했습니다.
- 통신병 장면 첫 문장에 처음으로 혼자 현장 작업에 나갔던 경험임을 명시했습니다. 이번 변경은 해당 본문 첫 문장만이며, Node VM 객체 비교로 나머지 데이터가 동일함을 확인했습니다.
- 도입부터 현재까지의 순서, 날짜, 역량 종류, 장면 연결 ID는 유지했습니다. 화면은 `app.js`가 해당 필드를 그대로 표시하므로 렌더링 코드는 변경하지 않았습니다.
- 공백 포함·줄바꿈 제외 기준 본문 합계 **1,512자**, 제목·날짜·역량·구분자·설명 포함 **1,925자**입니다. 앞선 2,394자 기록은 압축 전 본문(줄바꿈 포함) 기준입니다.
- 검사: `node --check content.js`, `node --check app.js`, `git diff --check` 통과. Node VM으로 수정 전후 객체를 비교해 6개 장면의 승인 문구 일치, 날짜·ID·역량 보존, story 외 전체 데이터 동일을 확인했습니다. 별도 테스트 파일은 추가하지 않았습니다.
- 실제 브라우저·배포·외부 링크·Supabase는 이번에 확인하지 않았고 SQL은 실행하지 않았습니다. T09 서사·T11 소설 정본과의 사실 대조는 미확인입니다.
- 변경 파일: `content.js`, `PROJECT_CONTEXT.md`. 다음 단계: 로컬 `index.html`을 열어 내 이야기 6편 표시와 연결 이동을 확인하고, 필요 시 T09/T11 원문과 사실을 대조합니다. 이후 아래 문서 본문·이력서 미작성 항목을 진행합니다. 배포 반영은 별도입니다.

## 이번 완료: T11 요구사항과 현재 구현 대조

- `T11.md`의 BRA-C01~C10과 `content.js`, `index.html`, 지원 문서 원문 JSON, 기록 생성기, 생성 결과, ZIP을 검토했습니다. 외부 원문·배포 브라우저는 열지 않았습니다.
- C01: 사용자 결정으로 고난 이전 도입과 기존 순서를 유지하고, 이야기 6개 본문을 공백 포함·줄바꿈 제외 1,512자로 압축했습니다. T09 서사와 T11 소설 정본의 실제 파일 대조는 미확인입니다.
- C02 세 능력과 장면 표시는 충족: 자기동기력·대인관계력·자기조절력 모두 표시되어 있습니다. 문제해결력 장면도 별도로 있습니다.
- C03 이름과 ‘사람입니다’로 끝나는 소개, C04 날짜가 있는 장면은 충족합니다. 첫 화면에 문서/이력서 바로가기, 한 줄 소개 3안 및 동료 검토 증거는 없습니다.
- C05 현재 누적 숫자와 출처는 구현되어 있습니다. 현재 승인 기준일은 2026-10-15이며 전체 기간 종료일 2026-11-12까지의 최종 집계는 아닙니다. 고난 장면과 숫자의 직접 연결은 보완 대상입니다.
- C06 논문 파일/보기/다운로드와 T13 앱 자리는 구현되어 있습니다. 앱 예정일은 없고, 실제 배포에서 비로그인 접근은 미확인입니다. 앱 완성 자체는 이 기준의 요구가 아닙니다.
- C07 미완성: 이력서 없음, 자기소개서/경력기술서는 파일만 있고 이름·제목 외 본문 없음. `assets/documents/application-content.json`의 paragraphs/projects가 빈 배열입니다. C08 과제별 능력·상황·행동·결과도 미작성입니다.
- C09 결정성과 새 폴더 실행은 검사 통과. 단, 상위 작업 설명의 ‘세 능력별 문단 후보’는 없고 현재는 날짜·근거가 있는 리추얼 후보 하나를 승인합니다. 현재 선택 방식은 기존 사용자 결정으로 유지된 구현이며 변경 여부는 별도 판단이 필요합니다.
- C10 완전 충족 아님: ZIP 38항목을 읽어 논문 Markdown과 내장 JS에 참고문헌 저자명이 포함된 것을 확인했습니다. 학술 인용을 무조건 삭제하지 말고 요구사항의 예외 인정 여부와 제출 범위를 먼저 정해야 합니다. 연락처/비밀값 전수 검사는 이번에 수행하지 않았습니다.
- 이번 검사: `node --test scripts/test_import_records.js` 32개 통과. 일반 실행은 spawn EPERM으로 차단되어 허용된 재실행에서 통과했습니다. `node --check app.js`, `node --check content.js`, `node --check scripts/import_records.js`, `node --check scripts/package_records.js`, `git diff --check` 통과. `deliverables/comparison.json`의 5개 동일 결과도 확인했습니다. 이번 검토에서는 ZIP을 재생성하지 않았습니다.
- 변경 파일: `PROJECT_CONTEXT.md`만. 실제 Supabase·배포·외부 링크 미확인, SQL 미실행.
- 다음 순서: ① 압축한 이야기의 로컬 표시 확인 및 T09/T11 실제 원문과 사실 대조 ② 이력서와 두 Word 본문/SAR 작성 ③ 앱 예정일·문서 입구·고난과 숫자 연결 보완 ④ 능력별 후보 요구와 현행 선택 방식 조정 여부 결정 ⑤ 제출 범위 개인정보 검토 및 실제 배포 비로그인 확인. 원문 사실·연락처·예정일은 임의로 만들지 않습니다.

## 앞선 완료: 논문 카드 문구와 작업 버튼 정리

- `content.js`, `index.html`: 주제목을 ‘AI와 함께 쓰는 첫 논문 - 가설에서 결론까지’, 부제목을 ‘음악 청취 데이터 기반 성격 특성 분석’, 별도 설명을 ‘음향·가사 특성의 상관관계 및 예측 성능 비교’로 분리했습니다. JavaScript 없는 초기 HTML에도 적용했습니다.
- `app.js`: description을 표시하고 모달 상단 제목은 summary를 사용합니다. 논문 Markdown 원문·다운로드 경로·파일명은 유지했습니다.
- `styles.css`: 부제목/설명의 위계를 나누고 구분선 아래 ‘논문 보기’와 ‘Markdown 다운로드’를 같은 높이·테두리·배경으로 정렬했습니다. 좁은 화면은 버튼이 줄바꿈됩니다.
- `README.md`: 제목·부제목·설명 관리 필드와 모달 제목 규칙을 갱신했습니다.
- `node --check app.js`, `node --check content.js`, `git diff --check`: 통과.
- `.checks/verify-paper-card.cjs`: 로컬 HTTP/Chrome에서 1280·390·320px 카드 문구·버튼 높이/순서·가로 넘침 없음, 모달 제목/표, Escape 닫기/포커스 복귀, 다운로드 원본 바이트 일치, file:// JavaScript 비활성화 초기 표시, 브라우저 오류 없음 확인. `.checks/paper-card-1280.png`, `.checks/paper-card-390.png` 캡처 후 모바일 화면을 시각 검토했습니다. .checks는 기존처럼 Git 추적 대상이 아닌 임시 검증 자료입니다.
- 첫 Chrome 실행은 샌드박스 spawn EPERM으로 차단되었고 허용된 재실행에서 확인했습니다. file:// 다운로드 이벤트는 확인되지 않아 HTTP 서버에서 다운로드를 검증했습니다.
- 실제 배포·외부 링크·Supabase 미확인, SQL 미실행. 다음 단계: 변경 diff 검토 후 사용자 요청에 따라 커밋/배포하고 실제 배포 사이트에서 카드와 모달 재확인.

## 앞선 완료: 기록 장치를 JavaScript로 전환

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
