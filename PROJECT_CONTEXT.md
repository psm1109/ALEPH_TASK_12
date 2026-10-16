# 현재 작업 상태

- 마지막 수정 날짜: 2026-10-16 (Asia/Seoul)
- 현재 브랜치: main. 이번 개인정보 점검 기준 커밋: fa4b8741d9c55eb983223159e6e539a92290c8ee (docs: 지원 문서 역량 분류와 웹 이야기 통일).
- 이번 개인정보 점검은 앞선 지원 문서 변경이 커밋된 fa4b874 기준의 깨끗한 작업 트리에서 시작했습니다. 이번에는 docs/PRIVACY_REVIEW.md와 이 인계 문서에 결과를 기록했습니다. 사이트 코드·지원 문서·기록 입력·기존 ZIP의 내용은 이번 점검에서 변경하지 않았습니다. 커밋·push·배포는 하지 않았습니다.

## 이번 완료: 개인정보·비밀값 로컬 제출물 최종 점검

- 사용자 허용 범위: 본인 개인정보와 논문 저자명/학술 인용은 허용, 타인 실명·연락처와 실제 비밀번호·토큰·API 키 등 인증값은 제외. 이름형 표현·이메일 후보는 문맥에 따라 본인/호칭/가상 예제를 구분했습니다.
- 점검 범위: 사이트/기록 원문/생성 결과/문서 등 로컬 텍스트 구성 요소 156개, 압축·문서 컨테이너 6개(기존 ZIP1·현재 Word3·ZIP 내 Word2), 중복 제거 이미지7개. 이미지7개는 직접 열어 확인하고 EXIF도 검사했습니다. ZIP 안 Word와 메타데이터·관계/링크도 재귀 점검했습니다.
- 결과: 로컬 점검 범위에서 BRA-C10 위반 항목을 발견하지 않았습니다. 이메일9회는 중복 포함 본인 이메일/가상 테스트 주소, 전화번호1회는 본인 이력서 연락처입니다. 이름형 후보는 본인 전체 이름/이름 일부·강사 호칭·일반 문장으로 확인했습니다. 대표 토큰/JWT/개인키·인증정보 포함 연결 URL·비밀번호/API 키 할당·URL 비밀값·Bearer/쿠키·주민등록번호 형식에서 실제 값을 발견하지 않았습니다.
- 검사: .checks/privacy-audit.py 성공(내장 Python -X utf8), 추가 형식 검사와 가상 샘플 검출 확인 통과. 문서 메타데이터의 비본인 한글 후보는 HeadingPairs의 ‘제목’이라는 문서 속성임을 확인했습니다. 세부 결과는 docs/PRIVACY_REVIEW.md, 민감값을 가린 임시 결과는 .checks/privacy-audit/scan-report.json에 있습니다.
- 본문/ZIP을 수정할 개인정보 문제는 발견되지 않았습니다. 실제 배포·외부 링크 대상·별도 첨부파일·Git 과거 이력은 이번 범위 밖이며, 새 파일/기록/최종 ZIP 생성 시 변경 범위를 재점검합니다. 기존 ZIP 구버전 문제는 별도 남은 작업입니다.
- 사용자 추가 결정: 현재 진로 → 고난 → 회복 → 졸업작품 → 현재 순서는 맥락을 위한 도입으로 유지합니다. 고난을 첫 장면으로 옮기는 작업은 요구하지 않으며 미충족/수정 대상으로 분류하지 않습니다.
- 이번 주요 파일: docs/PRIVACY_REVIEW.md, PROJECT_CONTEXT.md. 이번 점검으로 코드/Word 수정 없음, 새 커밋 해시 없음. git diff --check 통과(기존 Windows 줄바꿈 안내만).

## 앞선 완료: 경력기술서 역량과 자기소개서 동기화

- 사용자 승인 범위: T04/T07 역량 재분류, Word 자기소개서를 현재 웹 이야기 5편과 일치, README의 이력서 안내 정정. 웹 이야기 순서/분량/사건을 새로 편집하는 작업은 포함하지 않습니다.
- assets/documents/project-experience.docx: T04 환율 정보판을 API/자동 수집 방식의 주도적 선택에 근거한 자기동기력으로, T07 로그인 보호를 보안 기준 적용/반복 검증에 근거한 자기조절력으로 변경했습니다. 본문은 역량명 2곳만 바꿨으며, 8개 과제·상황·행동·결과·URL·서식은 보존했습니다. ZIP 내부도 word/document.xml 외 모든 항목 바이트 동일을 확인했습니다.
- assets/documents/self-introduction.docx: 현재 content.js story 5편의 순서·제목·날짜·본문·역량·역량 요약과 정확히 일치시켰습니다. 고난 장면처럼 웹에 역량이 없는 항목에는 추가하지 않았습니다. 기존 문단/글꼴/페이지 스타일을 재사용했으며, word/document.xml 외 구성 파일은 바이트 동일합니다. 옛 소통 장면과 문제해결력 분류는 문서에서 빠졌습니다.
- README.md: 첫 안내와 지원 문서 구역에 이력서·자기소개서·경력기술서의 실제 파일/다운로드 상태를 반영했습니다. resume.docx 경로·한국어 다운로드명·추후 보완 예정 상태와 T01~T08 경력기술서 범위/두 역량의 판단 근거를 기록했습니다. 이전 Word 생성기와 application-content.json은 사용하지 않았습니다.
- 주요 수정 파일: assets/documents/project-experience.docx, assets/documents/self-introduction.docx, README.md, PROJECT_CONTEXT.md.
- 확인: .checks/sync-application-docs.py 실행 성공. 별도 Python 검증으로 자기소개서 전체 문단이 웹 5편과 정확히 일치, 경력기술서 8개 과제의 허용 역량 사용, 두 Word의 비본문 ZIP 항목 보존, README의 구형 이력서 준비 중 문구 제거를 확인했습니다. git diff --check 통과(기존 Windows 줄바꿈 안내만).
- 시각 검증: 스킬의 render_docx.py는 soffice.exe 부재로 실패했습니다. 대안으로 설치된 Microsoft Word를 숨김/읽기 전용으로 열어 임시 PDF를 생성했고 pypdfium2로 PNG를 만들었습니다. 자기소개서 2쪽과 경력기술서 4쪽을 전부 시각 검토해 글자 잘림·겹침 없음 확인. 경력기술서의 기존 표가 페이지에 이어지는 배치는 유지했습니다. Word 종료 후 원본 파일은 추가 저장하지 않았습니다. 첫 격리 환경 Word 호출이 대기해 중단 후 해당 호출에서 생성한 프로세스만 정리하고 허용된 재실행으로 성공했습니다.
- 재현 자료(임시/Git 제외): .checks/current-story.json, .checks/sync-application-docs.py, .checks/document-sync-before/ 원본 백업, .checks/document-sync-render/{self-introduction,project-experience}/의 PDF/PNG. 내장 Python 실행 경로는 C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe입니다. 검증 스크립트는 원본 백업 보호를 위해 같은 경로로 재실행하면 중단하도록 작성했습니다.
- 실제 배포·Supabase·SQL은 확인/실행하지 않았습니다. 코드 동작 변경이 없어 기록 장치 33개 검사는 이번 작업에서 반복하지 않았습니다(앞선 점검에서는 통과). 새 커밋 해시 없음.

## 앞선 점검: BRA-C01~C10 및 제출 산출물 재점검


- 실제 content.js, index.html, README.md, Word 3개의 OOXML 본문, 기록 입력/생성 결과, 기록 장치 소스, deliverables/record-updater.zip을 대조했습니다. 오래된 application-content.json과 과거 인계의 빈 문서 기록은 현재 Word 본문의 상태를 나타내지 않습니다.
- C01 사용자 결정으로 현재 5편 순서(진로 → 고난 → 회복 → 졸업작품 → 현재)를 맥락을 위한 도입으로 유지하며, 고난을 첫 장면으로 옮기는 작업은 수정 대상에서 제외합니다. 본문은 공백 포함·줄바꿈 제외 1,869자(제목/날짜/역량 요약 제외)로 1,500자 안팎 목표보다 369자 많습니다.
- C02 세 능력 표시는 존재합니다. 자기조절력 장면의 요약은 배려/도움에 가까우므로 감정 조절을 위해 본인이 한 행동과 결과를 실제 경험으로 구체화할 필요가 있습니다. 이후 이번 동기화로 Word 자기소개서도 웹 5편과 동일해졌습니다.
- C03 이름과 ‘사람입니다’로 끝나는 소개가 있습니다. ‘…한 사람’의 문자 그대로 종결을 요구한다면 소개 끝 표현을 맞출 필요가 있습니다. C04 기간형 날짜와 2026-09-11 리추얼 날짜가 있습니다.
- C05 출처 표시 및 현재 집계 확인: 기준일 2026-10-15, 출석 대상 43일/인정 42일/97.7%/확정 전 1일, 리추얼 60일/아침60·마무리60/총120회, 제출11건. 전체 기간 2026-08-11~2026-11-12의 중간 누적입니다. 최종 13주 집계로 표현하면 안 됩니다.
- C06 T10 논문 Markdown 원본/보기/다운로드 및 T13 앱 예정 자리(2026-10-18) 존재. 실제 배포 링크 접근은 미확인입니다.
- C07 이력서·자기소개서·경력기술서 Word 파일과 다운로드 링크 모두 존재하며 본문도 있습니다. 이력서는 추가예정/빈칸이 남은 초안입니다. README의 이력서 준비 중 안내는 이번 작업에서 실제 상태로 정정했습니다.
- C08 기재한 8개 과제 범위의 능력/상황/행동/결과 형식을 충족합니다. 이번에 T04는 자기동기력, T07은 자기조절력으로 변경해 모든 과제가 지정 세 능력 중 하나에 해당합니다. 사용자 확인(2026-10-16): 경력기술서는 프로젝트 결과물 URL이 남아 있는 과제만 대상으로 작성했습니다. 따라서 T09~T11 제외는 의도한 범위이며 누락이나 추가 필요 항목으로 판단하지 않습니다.
- C09 현재 장치 33개 검사 통과, 실제 입력과 승인으로 renderFiles 두 번 호출 시 5개 산출물 일치 및 현재 사이트 데이터 일치. 기존 ZIP을 새 .checks/submission-audit-6366d0dcbd8941d58d0c5cfc7ac59b68 폴더로 압축 해제해 포함 README의 승인 재현 명령으로 두 번 실행, generated 전체 SHA-256 일치 확인.
- ZIP에는 실행 소스·README·last-result가 있습니다. 다만 기존 ZIP은 옛 사이트/옛 Word를 포함하며 최신 package_records.js/test_import_records.js와 다릅니다. README의 현재 제출 경로 deliverables/record-updater-device.zip은 존재하지 않고 기존 record-updater.zip만 있습니다. 최신 장치 ZIP 재생성이 필요합니다. ZIP은 .gitignore의 *.zip에 의해 Git에서 제외됩니다.
- C10 사용자 확인(2026-10-16): 이력서·자기소개서에 들어가는 본인 개인정보는 공개를 감수하는 허용 범위입니다. 이를 결함이나 삭제 필수 항목으로 판단하지 않습니다. 타인의 실명·연락처 및 비밀번호·토큰·API 키는 계속 제외 대상입니다. 학술 인용 저자명에 대한 기존 예외는 유지합니다.
- C10 현재 로컬 제출물 점검 범위에서 위반 항목을 발견하지 않았습니다. docs/PRIVACY_REVIEW.md의 범위/결과/한계를 기준으로 판단합니다. 실제 배포·외부 링크 대상·Git 과거 이력은 이번 범위 밖입니다.

## 이번 검사와 실제 범위

- node --test scripts/test_import_records.js: 첫 실행 spawn EPERM, 실행 허용 후 재실행 33개 전부 통과(과거 32개 기록을 대체).
- Node VM으로 story 필드/분량 확인, build/renderFiles 실제 입력 결정성/사이트 일치 확인.
- .NET ZIP/OOXML 읽기로 Word 본문·메타데이터 및 기존 ZIP 목록/소스 일치 여부 확인. 문서 레이아웃 렌더링은 미실행으로 잘림·겹침 품질 판정은 하지 않았습니다.
- 기존 ZIP 압축 해제본에서 node scripts/import_records.js --approvals generated/applied-approval.json 두 번 성공, generated 모든 파일 SHA-256 일치. 원본 사이트/ZIP은 보존했습니다.
- 실제 배포 브라우저·외부 URL·Supabase 미확인, SQL 미실행. 이번 점검은 로컬 파일/실행 근거입니다.

## 다음 작업자가 실행할 순서

1. 현재 웹 이야기 순서는 사용자 결정으로 유지합니다. 필요 시 별도 요청에 따라 약 1,500자로 압축하고 자기조절력의 본인 행동/결과를 구체화합니다.
2. resume.docx의 추가예정/빈칸을 완성합니다. 이후 웹 이야기를 변경하면 self-introduction.docx도 함께 맞춥니다. URL 결과물이 없는 T09~T11은 경력기술서 추가 대상이 아닙니다. 이전 Word 생성기는 실행하지 않습니다.
3. node scripts/package_records.js로 deliverables/record-updater-device.zip을 생성합니다. 새 ZIP README대로 새 폴더에서 실행 검증합니다. README의 이력서 안내 정정은 완료했습니다.
4. 현재 로컬 사이트·Word·이미지·기존 ZIP의 개인정보/비밀값 점검은 완료했습니다. 변경 파일이나 새 최종 ZIP 생성 시 다시 점검하고, 배포 사이트를 비로그인 브라우저에서 확인합니다. 기간 종료 시 최종 기록 갱신 여부를 판단합니다.

## 앞선 완료: 이력서 보완 안내 가로 배치와 문서 카드 높이 통일

- 2026-10-16 (Asia/Seoul), main / 92b5667837453c376bace25c3a0b835d0029cdc1 기준. 기존 미커밋 파일과 새 resume.docx를 보존했습니다.
- content.js와 index.html의 이력서 안내를 ‘(추후 보완 예정)’으로 변경했습니다. styles.css의 document-note를 inline/11px/왼쪽 간격 5px로 바꿔 제목 옆 같은 줄에 표시합니다.
- 모바일도 문서 3개 모두 제목 위/다운로드 아래의 같은 배치로 맞춰 보완 문구 때문에 이력서 카드만 높아지지 않게 했습니다. 641~760px에서는 문서를 1열로 표시해 작은 3열 카드에서 안내가 줄바꿈하는 것을 방지합니다. 다운로드 URL·파일명·파일 내용은 유지합니다.
- 주요 파일: content.js, index.html, styles.css, PROJECT_CONTEXT.md.
- 검사: node --check content.js 통과. node .checks/verify-resume-note.cjs 통과: 로컬 HTTP Chrome의 JS 활성/비활성에서 1280·800·761·641·390·320px 안내 문구가 이력서 오른쪽 같은 줄에 표시, 카드 3개 높이 일치(오차 1px 미만), 가로 넘침 없음 확인. 다운로드 한국어 파일명·파일 바이트 일치와 페이지 오류 없음도 재확인했습니다. git diff --check 통과(LF/CRLF 안내만).
- 실제 배포·Supabase 미확인, SQL 미실행. 커밋·push·배포 미실행, 새 커밋 해시 없음.
- 다음 단계: index.html의 문서 3개에서 제목 옆 안내와 동일 카드 높이를 확인합니다. 공개 반영에는 별도 배포가 필요합니다.

## 앞선 완료: 이력서 다운로드 연결 및 보완예정 표시

- 2026-10-16 (Asia/Seoul), main / 92b5667837453c376bace25c3a0b835d0029cdc1 기준. 시작 시 PROJECT_CONTEXT.md·README.md·app.js·content.js·index.html·styles.css의 기존 미커밋 변경을 보존했습니다.
- 사용자 지정 C:/Users/user/Desktop/이력서_박선민.docx(44,030바이트)를 assets/documents/resume.docx로 그대로 복사했습니다. 원본과 복사본 SHA-256 일치를 확인했으며 문서 본문을 읽거나 편집하지 않았습니다.
- content.js의 이력서 url/filename/note를 지정하고 app.js에서 문서별 note와 다운로드 파일명을 지원했습니다. 카드 제목 아래 ‘보완예정’을 표시하고 ‘Word 다운로드’를 누르면 이력서_박선민.docx로 받습니다. index.html의 초기 카드도 동일하게 맞춰 JavaScript 비활성화 때도 제공합니다. 다른 두 문서의 링크/표시는 유지했습니다.
- 주요 파일: assets/documents/resume.docx, content.js, app.js, index.html, styles.css(document-note), PROJECT_CONTEXT.md.
- 검사: node --check app.js 및 node --check content.js 통과. node .checks/verify-resume-download.cjs 통과: 로컬 HTTP Chrome의 JS 활성/비활성 모두 보완예정 표시, 문서 카드 3개 유지, 실제 다운로드 성공·한국어 파일명·파일 바이트 일치, 1280·390·320px 가로 넘침 없음·페이지 오류 없음 확인. git diff --check 통과(LF/CRLF 안내만).
- 문서 레이아웃/본문의 품질 검토는 요청 범위가 아니므로 미실행. 실제 배포·Supabase 미확인, SQL 미실행. 커밋·push·배포 미실행으로 새 커밋 해시 없음.
- 다음 단계: index.html의 이력서 카드에서 보완예정과 다운로드를 확인합니다. 파일을 보완하면 assets/documents/resume.docx를 새 원본으로 교체합니다. 공개 사이트에는 별도 배포가 필요합니다.

## 앞선 완료: 소개 문구 글자와 사진 정렬

- 2026-10-16 (Asia/Seoul), main / 92b5667837453c376bace25c3a0b835d0029cdc1 기준. 시작 시 PROJECT_CONTEXT.md·README.md·app.js·content.js·index.html·styles.css에 기존 미커밋 변경이 있었으며 보존했습니다. 사용자 편집으로 사진은 표시되고 이름만 제목에 있는 현재 index.html을 유지했습니다.
- content.js의 tagline을 사용자가 선택한 ‘저는 이론을 실제 경험으로 연결하며 배움의 깊이를 더하고, 소통과 배려를 통해 신뢰를 쌓아가는 사람입니다.’로 맞췄습니다. 기존 index.html에는 이미 새 문장이 있었지만 app.js가 이전 data.tagline으로 덮어쓰는 상태여서 데이터 값을 동기화했습니다.
- styles.css에서 소개 문구를 PC 18px/640px 이하 16px, 줄 높이 1.85, 자간 -0.25px, 최대 너비 36em과 균형 줄바꿈으로 조정했습니다. 문단의 불필요한 하단 여백을 제거하고 hero의 align-items를 start로 바꿔 사진과 소개 영역 상단을 맞췄습니다. 모바일은 사진 아래 소개글 및 왼쪽 기준선 정렬을 유지합니다.
- 주요 파일: content.js, styles.css, PROJECT_CONTEXT.md. index.html·app.js 및 이야기 본문은 이번 작업에서 변경하지 않았습니다.
- 검사: node --check content.js 통과. node .checks/verify-intro-refined.cjs 통과: 로컬 file:// Chrome 1280·800·390·320px에서 JS 실행 후 새 문장 유지, 글자 크기 18/16px, 이름/문구 왼쪽 정렬, PC 사진/소개 상단 일치, 모바일 사진/소개 왼쪽 정렬과 세로 배치, 가로 넘침·페이지 오류 없음 확인. .checks/intro-refined-1280.png 및 intro-refined-390.png로 최종 화면 직접 시각 확인. git diff --check 통과(LF/CRLF 안내만).
- 실제 배포·Supabase 미확인, SQL 미실행. 커밋·push·배포 미실행으로 새 커밋 해시 없음.
- 다음 단계: index.html을 새로고침해 사진과 소개 문구의 정렬을 검토합니다. 문구를 바꿀 때는 content.js의 tagline과 index.html의 초기 문구를 함께 맞춥니다.

## 앞선 완료: 이야기 본문 영역 높이 고정

- 2026-10-16 (Asia/Seoul), main / 92b5667837453c376bace25c3a0b835d0029cdc1 기준. 시작 시 PROJECT_CONTEXT.md·README.md·content.js·index.html에 기존 미커밋 변경이 있었으며 모두 보존했습니다. 현재 이야기 본문은 사용자가 추가 편집한 상태로 이번에는 변경하지 않았습니다.
- styles.css의 story-scene을 PC 640px, 760px 이하 560px 높이로 고정했습니다. 내용이 길면 내부 세로 스크롤로 읽으며 scrollbar-gutter로 스크롤바 유무에 따른 본문 너비 변화를 줄였습니다. flex 자식의 축소를 막아 긴 글과 이전/다음 버튼까지 모두 접근할 수 있도록 했습니다.
- app.js에서 본문에 키보드 초점(tabIndex=0)과 초점 테두리를 제공하고, 숨겨진 이야기로 전환 시 해당 본문의 scrollTop을 0으로 초기화합니다. PC 목차/본문과 모바일 제목 아래 펼침 구조 및 기존 주소는 유지합니다.
- 주요 파일: styles.css, app.js, README.md, PROJECT_CONTEXT.md. 이야기 텍스트·기록·DB는 변경하지 않았습니다.
- 검사: node --check app.js 통과. node .checks/verify-story-fixed.cjs 통과: 로컬 file:// Chrome의 1280·800·390·320px에서 전 항목의 본문 높이 640/560px 일치, 이야기 전환 시 전체 이야기 영역 높이 동일, 가로 넘침 없음, 긴 글 하단 이전/다음 버튼 접근, 전환 시 스크롤 초기화, 키보드 End 스크롤 및 페이지 오류 없음 확인. .checks/story-fixed-320.png는 임시 스크린샷으로 저장했으나 별도 시각 검토는 하지 않았습니다. git diff --check 통과(LF/CRLF 안내만).
- 실제 배포·Supabase 미확인, SQL 미실행. 커밋·push·배포 미실행, 새 커밋 해시 없음.
- 다음 단계: index.html을 새로고침해 PC/모바일 고정 높이와 본문 내부 스크롤을 확인합니다. 높이를 조절하려면 styles.css의 story-scene 기본 및 760px 미디어 규칙의 height를 변경합니다.

## 앞선 완료: 이야기 표현 교정과 역량 분류 정리

- 2026-10-16 (Asia/Seoul), main / 92b5667837453c376bace25c3a0b835d0029cdc1 기준. 시작 시 PROJECT_CONTEXT.md·README.md·content.js·index.html의 기존 미커밋 변경을 보존했습니다. 사용자가 고난/회복을 분리하고 본문을 직접 편집한 최신 활성 5편이 입력입니다. 현재 첫 제목은 빈 문자열이 아니며, 기존 소통 이야기 주석 블록은 사용자가 제거한 상태입니다.
- content.js의 story에서 조사·띄어쓰기·군더더기·문장 연결을 교정했습니다. 진로 제목을 ‘진로를 탐색하고 구체화한 계기’로 다듬고 지원/접수 표현, 고난 장면의 인용문 연결, 회복 장면의 행정 절차 도움 표현, 졸업작품의 협업/감사 인사 문장 등을 정리했습니다. 사건·역할·시점·이야기 순서·문단 수·기존 역량 요약은 유지했습니다.
- 진로 탐색 ability는 자기동기력, 졸업작품 ability는 대인관계력으로 바꾸어 문제해결력을 제외했습니다. 회복·현재 학습 장면의 대인관계력은 유지했습니다. 고난 장면은 원래 ability/abilitySummary가 없어 새 평가나 요약을 덧붙이지 않았습니다.
- 고난/회복의 중복 story-care ID는 고난을 story-hardship으로 구분하고 회복의 story-care 주소는 유지했습니다. 중복 DOM ID가 이야기 이동 대상을 모호하게 만드는 영향을 없앴습니다. README에 현재 5편 및 허용 역량 세 가지를 기록했습니다.
- 주요 파일: content.js, README.md, PROJECT_CONTEXT.md. 비교 원본은 Git 제외 .checks/story-before-polish.js. app.js·index.html·기록 데이터·다운로드 문서는 이번 범위에서 변경하지 않았습니다.
- 검사: node --check content.js 통과. Node VM/strict assert 인라인 검사로 5편과 ID 고유성, 허용 역량, 날짜/기존 요약/문단 수 보존 및 story 외 모든 콘텐츠 동일 확인. git diff --check 통과(LF/CRLF 안내만). 문구·분류 중심 변경으로 브라우저 검사는 재실행하지 않았습니다.
- 실제 배포·Supabase 미확인, SQL 미실행. 커밋·push·배포 미실행, 새 커밋 해시 없음.
- 다음 단계: index.html을 새로고침해 다섯 이야기의 교정 표현을 검토합니다. 고난 장면의 역량/요약 추가는 현재 원문에 없는 내용을 쓰는 일이므로 별도 사용자 요청 시 다룹니다.

## 앞선 완료: 이야기 항목의 필드와 순서 통일

- 2026-10-16 (Asia/Seoul), main / 92b5667837453c376bace25c3a0b835d0029cdc1 기준. 시작 시 PROJECT_CONTEXT.md·README.md·content.js·index.html에 미커밋 변경이 있었고 보존했습니다. 첫 이야기 제목은 빈 문자열이며 사용자가 고친 본문과 두 번째 제목도 유지했습니다.
- content.js의 활성 4개 항목 및 주석 처리한 소통 항목을 id → title → date → dateLabel → ability → abilitySummary → body 순서로 통일했습니다. 기간형 날짜에는 date 빈 문자열을 넣고 dateLabel을 같은 위치에 배치했습니다.
- 기존 자동 생성된 화면 ID인 story-scene-1·story-scene-3·story-scene-4를 데이터에 명시했습니다. story-care와 숨김 항목 story-communication은 유지합니다. 기존 이야기 주소가 바뀌지 않도록 ID 값을 보존했으며 앞으로 순서를 바꾸어도 명시 ID를 유지합니다. app.js의 렌더링 로직은 변경하지 않았습니다.
- 주요 파일: content.js, README.md(필드 규칙), PROJECT_CONTEXT.md. .checks/story-before-schema.js는 비교용 임시 원본입니다.
- 검사: Node VM/strict assert 인라인 검사로 활성 항목 전체 키·순서 일치, ID 고유성 및 변경 전 화면 ID와 일치, 날짜 표시·제목·본문·역량·기타 콘텐츠 보존 확인. node --check content.js 및 git diff --check 통과(LF/CRLF 안내만). 이번에는 브라우저 검사를 재실행하지 않았습니다.
- 실제 배포·Supabase 미확인, SQL 미실행. 커밋·push·배포 미실행, 새 커밋 해시 없음.
- 다음 단계: content.js story에서 같은 필드 순서로 편집하고 id는 고유한 고정값으로 유지합니다. index.html을 새로고침하여 표시를 확인합니다. 첫 이야기 빈 제목은 사용자 편집 상태이며 이번 범위에서 채우지 않았습니다.

## 앞선 완료: 진로 탐색과 통신병 경험을 하나의 이야기로 통합

- content.js의 첫 두 이야기를 ‘컴퓨터에 대한 관심에서 문제 해결의 보람으로’로 합쳤습니다. 컴퓨터공학과 진학 → 통신병 시절 첫 단독 현장 점검 → 사용자 불편을 해결한 보람과 진로 탐색을 세 문단으로 연결했습니다. 장애 원인 점검·타 부서 확인 요청·간부의 설정 변경 역할을 유지했습니다.
- 기간은 2018.02 ~ 2019.09, 대표 역량은 문제해결력입니다. 숨겨진 소통 이야기를 제외한 표시 항목은 기존 5개에서 4개로 줄었습니다. 나머지 활성 이야기와 다른 콘텐츠 필드가 HEAD와 동일함을 비교 확인했습니다. 기존 사진/소통 이야기 숨김은 유지했습니다.
- 주요 파일: content.js, README.md(현재 표시 4개 안내), PROJECT_CONTEXT.md. app.js·기록 입력·생성 데이터·Word 문서는 변경하지 않았습니다.
- 검사: node --check content.js 통과. node .checks/verify-story-merge.cjs 통과: 로컬 file:// Chrome에서 4개 항목·통합 제목/기간/세 문단 일치, 나머지 이야기/다른 데이터 보존, 다음 이야기 이동 및 1280·390·320px 가로 넘침 없음·페이지 오류 없음 확인. 최초 샌드박스 실행은 자식 프로세스/Chrome spawn EPERM으로 실패했고 허용된 재실행에서 통과했습니다. git diff --check 통과(LF/CRLF 안내만).
- 실제 배포·Supabase 미확인, SQL 미실행. 커밋·push·배포 미실행으로 새 커밋 해시 없음. 다운로드용 기존 문서는 이번 통합을 반영하지 않았습니다.
- 다음 단계: index.html을 새로고침해 ‘저의 이야기’ 첫 항목의 제목과 세 문단을 검토합니다. 공개 반영에는 별도 배포가 필요합니다. 직접 push하지 않습니다.

## 직전 완료: 리추얼 장면의 동료 피드백

- 동료 피드백과 공통 출처 표시가 현재 HEAD에 포함되어 있습니다. 앞선 로컬 브라우저 검증 기록은 유지하되 이번 변경 범위는 이야기 통합입니다. 원문은 content.js의 ritualPeerFeedback에서 관리합니다.

## 앞선 완료: 첫 화면 왼쪽 사진과 소개 문구 정렬

- 2026-10-16 (Asia/Seoul), main / 85248c71a18877c6a0e636d6b4f11721843b725e 기준. 사용자가 앞서 생성한 남색 정장 사진을 `assets/profile.png`로 복사하고 `index.html`의 hero 왼쪽에 추가하고 소개 문구를 오른쪽으로 옮겼습니다. `styles.css`에서 내 이야기 목차/본문과 동일한 열 비율·24px 간격을 사용해 사진 왼쪽은 섹션 제목/목차와, 소개 문구 왼쪽은 이야기 본문 패널과 맞췄습니다. 사진은 PC 너비 210px, 640px 이하에서는 소개글 위에 왼쪽 정렬하여 너비 160px로 표시합니다. 원본 비율과 전체 얼굴을 유지하고 대체 텍스트·이미지 크기를 지정했습니다. JavaScript·기록·문서 데이터에는 변경이 없습니다.
- 주요 파일: `index.html`, `styles.css`, `assets/profile.png`, `PROJECT_CONTEXT.md`. 기존 미커밋 변경·삭제를 보존했습니다.
- 검사: Node/Playwright 인라인 명령으로 로컬 file:// Chrome의 1435·800·390·320px에서 이미지 로드(1140×1380), PC 왼쪽/모바일 위 배치, 사진과 섹션 제목의 왼쪽 기준선 일치, PC 소개 문구와 이야기 패널 왼쪽 기준선 일치, 가로 넘침 없음, 페이지 오류 없음 확인. `.checks/hero-photo-1435.png`, `.checks/hero-photo-390.png`를 갱신했습니다. 최종 PC 화면을 직접 시각 확인했습니다. `git diff --check` 통과(기존 파일 LF/CRLF 안내만). `.checks/`는 Git 제외 임시 자료입니다.
- 실제 배포·Supabase 미확인, SQL 미실행. 새 커밋 해시 없음. 다음 단계: 로컬 `index.html`을 새로고침해 사진 크기와 배치를 검토합니다. 공개 반영은 별도 배포가 필요하며 직접 push하지 않습니다.

## 앞선 완료: 경력기술서 글자 잘림 보정

- 2026-10-16 (Asia/Seoul), main / 85248c71a18877c6a0e636d6b4f11721843b725e 기준. 사용자 화면의 제목 잘림은 원래 19pt 제목에 15pt 고정 줄 높이를 적용했던 설정과 관련됩니다. 사용자가 편집한 최신 compact 파일(32,508바이트)을 입력으로 문서/스타일의 고정 줄 높이 9곳만 최소 줄 높이(atLeast)로 바꾸어 큰 글자에 맞춰 줄이 늘어나게 했습니다.
- 결과 파일: `deliverables/project-experience-url-compact-fixed.docx`. 원본이 Word에서 열려 있어 별도 저장했습니다. 사용자 수정 텍스트·글자 크기·문서 구성·링크·나머지 ZIP 구성 파일은 보존했습니다. 기존 사이트용 Word 파일도 변경하지 않았습니다.
- 검사: 전후 OOXML에서 exact→atLeast 외 변경 없음 및 나머지 ZIP 구성 파일 바이트 일치 확인. `git diff --check` 통과. render_docx.py 재실행은 soffice.exe 부재로 실패(.checks/career-fixed-render.log), 실제 Word 시각 확인은 미완료입니다. 커밋·push·배포·SQL 미실행.
- 다음 단계: 수정 파일을 Word에서 열어 제목과 표 글자 잘림을 확인하고 직접 편집을 이어갑니다.

## 앞선 완료: 경력기술서 표를 페이지에 이어 배치

- 2026-10-16 (Asia/Seoul), main / 85248c71a18877c6a0e636d6b4f11721843b725e 기준. 사용자 요청으로 과제 두 개마다 있던 강제 페이지 나눔과 표 전체 문단 연결, 행 분할 금지를 해제했습니다. 제목만 다음 내용에 연결하고 문단/표 사이 여백을 줄여 페이지의 남은 공간부터 자연스럽게 채우게 했습니다. 내용·글자 크기·링크는 유지했습니다.
- 수정 결과: `deliverables/project-experience-url-compact.docx`. 기존 파일에 Word 잠금 파일(`deliverables/~$oject-experience-url.docx`)이 있어 열린 원본은 덮어쓰지 않고 별도 이름으로 저장했습니다. 다른 화면/Word 변경은 보존했습니다. 주요 파일은 새 Word와 PROJECT_CONTEXT.md이며 임시 편집 스크립트는 `.checks/compact-career-doc.py`입니다.
- 검사: 번들 Python으로 `.checks/compact-career-doc.py` 실행, 전후 전체 텍스트/외부 링크 동일, 표 8개·하이퍼링크 16개 유지, 강제 페이지 구분/행 분할 금지/표 문단 연결 제거 확인. `git diff --check` 통과. 렌더러 재실행은 soffice.exe 부재 및 임시 폴더 정리 WinError5로 실패했습니다. 최종 페이지 수와 시각 배치는 미확인입니다.
- 다음 단계: 새 compact 파일을 Word에서 열어 페이지 경계를 확인하고 직접 문구를 편집합니다. 기존 사이트 다운로드 문서는 변경하지 않았으며 배포·Supabase·SQL·커밋·push는 실행하지 않았습니다.

## 앞선 완료: 내 이야기를 기존 6개 항목으로 복원

- 2026-10-16 (Asia/Seoul), main / 85248c71a18877c6a0e636d6b4f11721843b725e 기준. 사용자 요청으로 content.js의 story 배열을 3항목 재구성 전 6편의 제목·기간·본문·역량 요약·id로 복원했습니다. Git HEAD의 story 블록이 앞선 대화에서 확인한 원본 6편과 일치함을 확인해 그 블록만 사용했습니다. 리추얼 발췌의 관련 이야기 제목도 받았던 배려를 다른 사람에게로 되돌렸습니다.
- app.js에서 3항목에만 쓰던 aliases 로직을 제거하고 기존 실제 패널 id 기반 장면 주소 연결을 복원했습니다. PC 목차/본문과 모바일 펼침 배치는 유지합니다. README의 항목 수와 읽기 설명도 6편으로 복원했습니다.
- 주요 수정: content.js, app.js, README.md, PROJECT_CONTEXT.md. 앞선 제출 카드·썸네일·과제 설명 및 새 경력기술서 deliverables/project-experience-url.docx, Word 다운로드 파일·기록 장치 등 다른 변경은 보존했습니다. 커밋·push·배포 없음.
- 검사: Node assert로 복원 story가 HEAD의 6편과 객체 전체 일치, story/관련 리추얼 설명 외 content 필드 전체가 작업 직전과 일치함을 확인했습니다. node --check app.js, node --check content.js, git diff --check 통과(LF/CRLF 안내만). node .checks/verify-story.cjs 통과: 로컬 file:// Chrome 1280/800/390/320px의 6편 제목·본문 일치·선택/이전다음/Enter·포커스·기존 #story-care 주소·경계 버튼·가로 넘침 없음·페이지 오류 없음. .checks는 Git 제외 임시 검사입니다.
- 실제 배포·Supabase 미확인, SQL 미실행. 제출 카드/외부 URL·Word 렌더링은 이번 복원 범위가 아니므로 재실행하지 않았습니다.
- 다음 단계: index.html → 내 이야기에서 복원한 6편을 확인합니다. 경력기술서 Word는 사용자가 직접 편집하며, 배포 또는 커밋은 요청 시 진행합니다. 직접 push하지 않습니다.

## 앞선 완료: URL이 있는 과제 8개의 경력기술서 작성

- 2026-10-16 (Asia/Seoul), main / 85248c71a18877c6a0e636d6b4f11721843b725e 기준. 사용자가 첨부한 제목과 2열 표 양식으로 `deliverables/project-experience-url.docx`를 작성했습니다. 기존 화면·문서 안내 변경을 보존했습니다. 커밋·push·배포 없음.
- `content.js`의 submissionContents에서 결과물/소스 URL이 있는 T01~T08을 포함하고 URL이 없는 T09~T11은 제외했습니다. 과제마다 해당 능력·기간·상황·행동·결과를 작성하고 결과물/제출 시점 소스 링크를 넣었습니다. 수행 시작일은 확인되지 않아 `record-input/submissions.json`의 제출일을 기간에 명시했습니다. AI 구현과 본인 판단을 구분했으며 현재 서비스 운영을 새로 검증했다고 쓰지 않았습니다.
- 주요 파일: 새 `deliverables/project-experience-url.docx`, 이 문서. 기존 `assets/documents/project-experience.docx`와 다운로드 링크, 이전 JSON/생성기는 변경하지 않았습니다. 이번 산출물은 사용자가 Word에서 직접 편집할 별도 문서입니다. 임시 작성/검사는 Git 제외 `.checks/create-career-doc.py`, `.checks/document-source.json`에 있습니다.
- 검사: 번들 Python으로 `.checks/create-career-doc.py` 실행 성공, Word 재열기로 표 8개/각 5개 필드/하이퍼링크 16개 검증. `git diff --check` 통과(LF/CRLF 안내만). 문서 글꼴은 맑은 고딕, 흰 바탕/회색 테두리 표, 격자 맞춤 해제 및 고정 포인트 줄 간격, 표 내부 연결/행 분할 금지를 적용했습니다.
- 시각 검사 미완료: 문서 스킬 `render_docx.py deliverables/project-experience-url.docx --output_dir .checks/career-render --emit_pdf`를 실행했으나 soffice.exe가 없어 실패했고 임시 폴더 정리에도 WinError5가 발생했습니다. 번들 native 목록에도 LibreOffice가 없으며 Word.Application도 확인되지 않았습니다. 실제 Word 페이지 수와 최종 배치, 외부 URL 현재 접속, 다운로드·배포·Supabase 미확인, SQL 미실행.
- 다음 단계: Word에서 새 파일을 열어 문구·페이지 배치를 검토하고 직접 수정합니다. 사이트 다운로드 파일로 쓰려면 사용자 결정에 따라 완성본을 `assets/documents/project-experience.docx`로 교체하고 배포 후 다운로드를 확인합니다.

## 철회한 변경: 이야기 3항목 재구성

- 2026-10-15에 적용한 고난·극복·더 나은 나 3항목 구성은 2026-10-16 사용자 요청으로 철회했습니다. 현재 사이트는 아래 최신 완료에 기록한 기존 6편이며 세 항목의 문구·새 주소·aliases 로직은 사용하지 않습니다.

## 앞선 완료: URL 없는 썸네일 제목과 과제별 수행 설명

- 2026-10-15 (Asia/Seoul), `main` / `85248c71a18877c6a0e636d6b4f11721843b725e` 기준. 제출 목록을 PC 2열·640px 이하 1열로 바꾸고 T01~T08 결과물 URL을 현재 공개 화면 썸네일·도메인과 연결했습니다. 같은 결과물 URL인 T01/T08, T04/T05, T06/T07은 각각 카드와 썸네일 하나로 묶었습니다. 총 11건을 결과물 5개와 URL 없는 과제 3개, 총 8개 카드로 표시합니다. 각 카드에는 썸네일·사이트 주소·과제별 제출 내용 버튼만 표시합니다. 반복되는 과제 번호 요약/Studio 제목/날짜·상태/구분선을 목록에서 제거하고 연결된 과제 버튼을 가로로 배치했습니다. 좁은 폭에서는 버튼이 줄바꿈합니다. 제출 날짜·상태는 각 제출 내용 모달 상단으로 옮겼으며 11개 원문 접근과 사이트별 그룹을 유지합니다. URL 없는 과제는 썸네일 중앙에 Studio 과제 09/10/11 제목을 표시하고, 아래 사이트 주소 자리에 등록된 URL이 없습니다를 표시합니다. 중복 제목과 썸네일 내부 URL 없음 안내는 제거했습니다. URL 전체가 같은 경우에만 묶으므로 같은 도메인의 다른 경로·쿼리 결과물은 별개로 유지합니다. T09~T11은 URL 미등록 표시와 기존 제출 내용 버튼을 제공합니다.
- `content.js`의 `submissionContents.T01~T11.body` 세 번째 문단에 있던 공통 안내를 과제 목적과 수행 작업 설명으로 교체했습니다. 기존 제출 본문의 재현 절차와 AI/본인 판단에 근거해 작성하고 직접 정한 방향과 AI에 맡긴 작업을 구분했습니다. T04 정보판/T05 계산기, T06 PDS/T07 인증 보강, T01 소개/T08 패스키를 구별합니다. 결과물·저장소 URL, 재현 절차, AI 판단 원문과 첨부파일 목록은 유지했습니다. 새 입력 body가 있으면 기존 규칙대로 그 일반 텍스트 본문이 우선합니다.
- `app.js`는 초기 HTML 또는 새 일반 텍스트 본문 중 ‘결과물 URL’ 항목에서만 HTTP(S) 주소를 추출합니다. 소스 저장소와 참고 링크를 대신 연결하지 않으며 자격 증명이 포함된 URL도 제외합니다. 썸네일·도메인은 새 탭으로 열고 noopener/noreferrer를 설정합니다. 이번 설명 문단 외 제출 본문·기록 갱신 장치·DB는 변경하지 않았습니다. 이미지 오류 시 코드/링크 안내가 남습니다.
- `content.js`의 `submissionPreviews`에 URL별 이미지 경로를 관리합니다. 주소 변경 시 옛 이미지가 다른 결과물에 연결되지 않습니다. 새로운 URL은 링크부터 표시하며 새 캡처/맵 등록이 필요합니다. `assets/submissions/t01.jpg`, `t02.jpg`, `t03.jpg`, `t04.jpg`, `t06.jpg` 5개는 2026-10-15 공개 첫 화면입니다. T06은 비로그인 화면입니다. `index.html`에 현재 캡처이며 제출 당시와 다를 수 있다는 안내를 추가했습니다.
- 주요 수정: `app.js`, `styles.css`, `content.js`, `index.html`, `assets/submissions/*.jpg`, `README.md`, `PROJECT_CONTEXT.md`.
- 검사: `node --check app.js`, `node --check content.js`, `git diff --check` 통과. `node .checks/verify-submissions.cjs`에서 로컬 file:// Chrome으로 11건/8개 카드/고유 링크·썸네일5개/URL없음3건, T01+T08·T04+T05·T06+T07 그룹과 과제별 버튼 11개 일치, 1280·800·390·320px 이미지 로드와 모달 가로 넘침 없음, URL 없는 썸네일 제목3개/주소 대체 안내3개, 11개 과제 설명 문단 및 이전 안내 제거·날짜/상태 표시·Esc·초점 복귀, 이미지 실패 대체 표시, 일반 텍스트 URL 추출·잘못된 스킴 제외·페이지 오류 없음 확인. `.checks/submissions-1280.png`, `submissions-390.png` 화면 캡처를 갱신하고 `.checks/submissions-no-url.png`에서 URL 없는 과제 3개의 모바일 화면을 직접 시각 확인했습니다. 5개 원본 이미지는 직전 작업에서 시각 확인한 파일을 그대로 사용합니다. `.checks/`는 Git 제외 임시 검증 자료입니다.
- 외부 확인 범위: 직전 썸네일 작업에서 공개 결과물 5개 주소의 HTTP 200과 첫 화면을 Chrome으로 확인해 캡처했습니다. 최초 샌드박스 DNS 실패 후 허용된 네트워크 실행에서 성공했고 T06은 networkidle 대기 초과 후 DOM 로드 기준으로 캡처했습니다. 로그인·저장 등 서비스 내부 기능과 실제 Supabase는 미확인, SQL 미실행입니다. 이번 제목·설명 수정 작업에서는 외부 사이트를 재확인하지 않았으며 포트폴리오 변경 배포도 미실행입니다. 기존 기록 장치 33개 검사는 화면 변경과 무관하여 재실행하지 않았습니다. 커밋 없음.
- 다음 단계: 로컬 `index.html` → ‘제출 과제 자세히 보기’에서 화면 확인. 사용자 요청 시 현재 변경을 커밋하고 정적 호스팅 절차로 배포한 뒤 썸네일/새 탭 링크를 재확인합니다. 절대 직접 push하지 않습니다. 지원 Word 문서는 사용자가 완성한 파일로 직접 교체하며 생성기는 실행하지 않습니다.

## 앞선 완료: 지원 문서를 직접 편집·교체하는 방식으로 확정

- 2026-10-15 (Asia/Seoul), `main` / `85248c71a18877c6a0e636d6b4f11721843b725e` 기준. 사용자는 Word 파일을 직접 편집한 뒤 올리고 방문자가 내려받는 방식을 사용합니다. 현재 문서는 최종본이 아닌 임시 파일입니다. Python/JSON으로 지원 문서를 재생성하지 않습니다.
- `README.md`의 지원 문서 절을 직접 파일 교체·배포 안내로 교체했습니다. 자기소개서/경력기술서는 같은 경로로 교체하면 되고, 파일명 변경 또는 이력서 추가 시 `content.js`의 documents와 `index.html`의 #document-list를 함께 수정합니다.
- 주요 수정 파일: `README.md`, `PROJECT_CONTEXT.md`. 기존 Word 파일·생성기·원문 JSON·다운로드 로직은 변경하지 않았습니다. 생성기/JSON은 이전 작업 보존 자료이며 직접 편집한 문서를 덮어쓰므로 실행하지 않습니다. 아래 Python 관련 기록은 과거 작업 경위입니다. 논문용 `scripts/build_paper.py`는 별개입니다.
- 검사: Node 정적 확인으로 content.js에 등록된 두 문서 파일 존재, index.html의 같은 경로/download 속성 일치, README에서 옛 Word 생성 명령 제거 확인. `git diff --check` 통과. 문서/생성기에 신규 diff 없음 확인. 실제 다운로드·브라우저·배포·Supabase는 이번 작업에서 미확인, SQL 미실행, 커밋 없음.
- 다음 단계: 사용자가 완성한 Word 파일로 `assets/documents/self-introduction.docx`, `assets/documents/project-experience.docx`를 교체합니다. 이력서 완성 시 파일과 두 링크를 등록하고, 배포 후 각 다운로드 파일이 최종본인지 확인합니다.

## 앞선 완료: 이야기 목차와 선택 본문 구성

- 2026-10-15 (Asia/Seoul), `main` / `85248c71a18877c6a0e636d6b4f11721843b725e` 기준. 사용자 승인 시안에 맞춰 PC에서 왼쪽 6개 목차, 오른쪽 선택 본문으로 구성했습니다. 선택 목차는 검정 배경이며 본문 아래 이전·다음/현재 순서를 표시합니다. 760px 이하에서는 선택한 제목 바로 아래 본문이 펼쳐집니다.
- 첫 이야기가 기본 표시됩니다. 제목·기간·본문·역량은 기존 `content.js`에서 그대로 읽으며 생략·말줄임·내부 스크롤 없이 전체 표시합니다. 이야기 내부의 문장별 강제 줄바꿈만 일반 문단 흐름으로 바꿨습니다. 원문 데이터는 수정하지 않았습니다.
- 목차는 기본 button의 키보드 조작, aria-expanded/aria-controls를 지원합니다. 이전·다음 전환 시 새 목차로 포커스를 옮기며 처음/마지막 경계 버튼은 비활성화합니다. 기존 `#story-care`, `#story-communication` 주소로 방문하거나 해시가 바뀌면 해당 이야기를 엽니다.
- 주요 수정 파일: `app.js`, `styles.css`, `README.md`, `PROJECT_CONTEXT.md`. 앞선 `index.html` 버튼 제거도 유지합니다. JavaScript 없는 안내와 이야기 외 기록·문서 로직은 유지했습니다.
- 검사: `node --check app.js`, `git diff --check` 통과. `node .checks/verify-story.cjs`에서 로컬 file:// Chrome으로 1280/800/390/320px 각각 6편 제목·본문 원문 일치, 선택한 본문 하나만 표시, 좌우/세로 배치, 가로 넘침 없음, 이전·다음 전환·포커스·Enter 조작·장면 주소·경계 비활성화·페이지 오류 없음 확인했습니다. `.checks/story-desktop.png`, `.checks/story-mobile.png`를 캡처하고 직접 시각 확인했습니다. `.checks/`는 Git 제외 임시 검사입니다.
- 실제 배포·Supabase 미확인, SQL 미실행. 기록 장치 검사와 Word 렌더링은 이번 변경 범위가 아니므로 재실행하지 않았습니다. 커밋 없음.
- 다음 단계: 로컬 `index.html`에서 첫 이야기부터 원하는 순서로 읽어 보고, 사용자 요청 시 배포 절차를 진행합니다. 지원 문서의 남은 작성 및 배포 비로그인 확인은 별도 작업입니다.

## 앞선 완료: 소개 아래 이야기 읽기 버튼 제거

- 2026-10-15 (Asia/Seoul). `index.html`의 소개 문구 바로 아래 ‘내 이야기 읽기’ 링크 하나를 제거했습니다. 해당 링크에 의존하는 JavaScript가 없음을 확인했으며 소개 문구·이야기 본문·상단 메뉴·기존 스타일은 유지했습니다.
- 주요 수정 파일: `index.html`, `PROJECT_CONTEXT.md`.
- 검사: `git diff --check` 통과. Node 정적 확인으로 버튼 문구 제거, 소개 문구·상단 이야기 메뉴·이야기 영역 보존을 확인했습니다.
- 실제 브라우저·배포·Supabase는 이번 작업에서 미확인, SQL 미실행입니다.
- 다음 단계: `index.html`을 브라우저에서 새로고침해 첫 화면을 확인합니다. 지원 문서의 남은 작성 및 실제 배포 확인은 별도 작업입니다.

## 앞선 완료: Word 자기소개서 간격과 페이지 밀림 보정

- 2026-10-15 (Asia/Seoul), main / 27b7cee3ef9054a31582d8afee5f507a822a30ae 기준. 사용자 제공 Word 화면에서 큰 줄 간격과 세 번째 장면의 페이지 이동을 확인했습니다.
- scripts/build_application_documents.py의 자기소개서에만 docGrid 제거 및 Normal/Title/Heading1 snapToGrid=0, 고정 포인트 줄 간격(본문16pt/제목29pt/소제목19pt)을 적용했습니다. 본문 연속 keep_with_next를 해제하고 네 번째 장면 앞 강제 페이지 구분도 제거했습니다. 제목·기간과 첫 문단은 연결하며 본문은 페이지에 따라 자연스럽게 흐릅니다.
- assets/documents/self-introduction.docx를 --only introduction으로 재생성하고 README 설명을 갱신했습니다. 원문 JSON·경력기술서는 이번 보정에서 바꾸지 않았습니다.
- 번들 Python 검사: 6개 장면의 제목·날짜·본문·역량 원문 일치, docGrid 없음, 세 스타일의 snapToGrid 해제/lineRule exact, 본문 연속 묶음과 강제 페이지 구분 없음, Python ast 문법 확인 통과. git diff --check 통과.
- 렌더링 환경은 앞서 확인한 대로 LibreOffice/Word 변환기 부재입니다. 실제 수정본 Word 페이지 수와 최종 시각 배치는 미확인입니다. 사용자 화면의 검은 네모/꺾인 화살표는 Word 편집 표시일 수 있으며 문서 내용으로 추가한 기호가 아닙니다.
- 다음 단계: 수정본을 Word에서 다시 열어 간격·페이지 배치를 확인합니다. 배포·브라우저·Supabase 미확인, SQL 미실행. 커밋·push 없음.

## 앞선 완료: 카드 1 이야기로 자기소개서 Word 작성

- 2026-10-15 (Asia/Seoul). 사용자 제공 이야기 6편과 일치하는 content.js의 장면을 assets/documents/application-content.json의 introduction.scenes에 저장하고 self-introduction.docx에 반영했습니다. 제목·기간·본문 문단·역량 설명을 보존하고 문장 사이 정상 띄어쓰기를 적용했습니다. 사실·문구를 새로 만들지 않았습니다.
- A4, 맑은 고딕 11pt 본문, 검정 제목/소제목, 회색 기간, 역량 강조, 세 장면씩 페이지 구분을 설정했습니다. 실제 페이지 수는 렌더링 전이므로 확정하지 않습니다.
- scripts/build_application_documents.py에 장면형 본문과 --only introduction을 지원했습니다. 경력기술서는 이번에 재생성하지 않았습니다. 기존 다운로드 경로를 유지하고 README의 미작성 안내를 현재 상태로 바꿨습니다.
- 검증: 번들 Python/python-docx로 6개 제목·기간·본문·역량이 원문 JSON과 전부 일치, 페이지 구분 1개, 제목 테두리 없음, Python ast 문법 확인, git diff --check 통과.
- 시각 검증 제한: 스킬 render_docx.py를 실행했으나 번들 LibreOffice가 Windows에 없고 PATH의 soffice.exe도 없어 실패했습니다. Word.Application 등록도 없어 Word 변환 대안 사용 불가. 임시 폴더 정리에도 WinError5가 발생했습니다. PNG/PDF 페이지 렌더링과 육안 검증은 완료하지 못했습니다.
- 변경 파일: assets/documents/self-introduction.docx, assets/documents/application-content.json, scripts/build_application_documents.py, README.md, PROJECT_CONTEXT.md. 사이트 본문/경력기술서/장치 ZIP은 변경하지 않았습니다.
- 다음 단계: Word가 있는 PC에서 두 페이지 배치·줄바꿈을 확인하고 필요 시 조정. 이후 이력서와 경력기술서 내용을 작성하고 배포에서 문서 다운로드 확인. 자기소개서 본문은 작성 완료이며 시각 검증은 미확인입니다.

## 앞선 완료: 사이트를 제외한 장치 전용 ZIP

- 2026-10-15 (Asia/Seoul), main / 9c66a9f891be36e8ba687b9bf45baea0635647fa 기준입니다.
- 제출본은 deliverables/record-updater-device.zip입니다. 기존 533,943바이트/38항목에서 192,271바이트/16항목으로 약 64% 줄였습니다. 사이트 HTML/CSS/JS·이미지·논문·Word·data/·중복 last-result/를 제외하고 scripts 3개, 입력 4개, generated 마지막 결과와 승인 6개, README/상세 안내/비교 파일만 포함했습니다.
- scripts/package_records.js는 별도 사이트 검증용 --site-root를 지원하며 ZIP 기본 이름을 record-updater-device.zip으로 변경했습니다. 저장소 기본 명령도 유지합니다. 기록 집계/후보/승인 장치 본체는 변경하지 않았습니다.
- docs/RECORD_IMPORT.md와 ZIP README에 압축 해제 폴더에서 node scripts/import_records.js --site-root "사이트폴더" 실행·승인·재현·재패키징 방법을 기록했습니다. README.md도 장치 전용 제출본으로 안내합니다.
- 수정 파일: scripts/package_records.js, scripts/test_import_records.js, docs/RECORD_IMPORT.md, README.md, deliverables/comparison.json, 새 deliverables/record-updater-device.zip, PROJECT_CONTEXT.md. 기존 화면 변경은 유지했습니다.
- node --test scripts/test_import_records.js: 최종 33개 통과. 추가 검사는 축소 ZIP 추출/CRC/포함 범위/별도 사이트 경로/다른 cwd/공백 포함 경로/같은 승인으로 두 번 실행해 6개 결과 동일/사이트 content 보존/재패키징 ZIP 바이트 동일을 확인합니다. 일반 실행 spawn EPERM 후 허용된 재실행에서 통과했습니다.
- 실제 제출 ZIP 16항목을 모두 압축 해제해 CRC 검증, 소스·입력 파일 바이트 일치, 다시 압축한 바이트 동일 확인. comparison.json의 5개 결과 동일 확인. node --check scripts/package_records.js, node --check scripts/test_import_records.js, git diff --check 통과.
- 기존 deliverables/record-updater.zip 교체는 일반 및 권한 확장 실행에서 EPERM으로 실패했습니다. 원인은 확정하지 않았고 기존 파일은 남겨 두었습니다. 새 파일 생성은 성공했으며 제출 시 반드시 record-updater-device.zip을 사용합니다. 자동 승인 심사 거절은 아니며 사용자 추가 승인 없이 별도 이름으로 해결했습니다.
- 실제 브라우저·배포·Supabase·메일 앱은 미확인, SQL 미실행. 사이트 파일은 이번 패키징 변경 대상이 아닙니다. 다음 단계: 새 ZIP과 사이트를 별도 제출하고, 지원 문서 본문/이력서·전체 개인정보 검토와 실제 배포 확인을 마무리합니다. ZIP에는 최신 사이트를 따로 넣을 필요가 없습니다.

## 앞선 완료: 이메일 옆 Gmail 색상 아이콘 추가

- assets/gmail.svg에 작은 봉투 아이콘을 추가하고 styles.css에서 Gmail mailto 링크 앞에 24×18px로 표시했습니다. 아이콘과 이메일 주소는 같은 링크이며 JavaScript 동적 표시와 초기 HTML 모두에 적용됩니다. 장식용 CSS 이미지라 읽기 보조 도구에 중복 이름을 만들지 않습니다. 외부 이미지 요청·패키지 없이 기존 연락처 로직을 유지합니다.
- 검사: Node assert로 아이콘 파일/참조 경로/크기 및 외부 요청 코드 없음 확인, git diff --check 통과. 실제 브라우저 시각 확인·메일 앱 실행·배포·ZIP 재생성은 미실행입니다.
- 변경 파일: assets/gmail.svg, styles.css, PROJECT_CONTEXT.md. 다음 단계는 브라우저에서 연락처 표시 확인 후 지원 문서 완성, 최종 ZIP 재생성입니다. 커밋·push는 하지 않았습니다.

## 앞선 완료: 공개 이메일 연락처 연결

- 사용자 제공 이메일을 content.js의 contact 표시와 mailto 주소에 반영했습니다. index.html 초기 HTML에도 동일 링크를 넣어 JavaScript 비활성화 상태에서도 사용할 수 있습니다. 기존 app.js가 mailto를 지원하므로 로직 변경은 없습니다.
- 검사: node --check content.js, Node assert로 연락처 데이터와 초기 HTML 링크 일치 확인, git diff --check 통과. 실제 메일 앱 실행·브라우저·배포 확인 및 ZIP 재생성은 하지 않았습니다.
- 변경 파일: content.js, index.html, PROJECT_CONTEXT.md. 기존 앱 예정일·문서 메뉴 변경을 유지했습니다. 기준 커밋은 위와 같으며 커밋·push는 하지 않았습니다.
- 다음 단계: 지원 문서 본문/이력서 완성, 제출 직전 node scripts/package_records.js로 최신 ZIP 생성, 배포 화면 및 개인정보 검토. 사이트 연락 수단 입력은 완료했으며 Word 연락처 반영은 별도입니다.

## 앞선 완료: 상단 문서 바로가기 추가

- index.html 상단 메뉴의 대표작과 연락처 사이에 문서를 추가하고 기존 #documents 영역으로 연결했습니다. 이력서·자기소개서·경력기술서가 모인 영역으로 이동하며 문서 파일이나 다운로드 로직에는 영향이 없습니다.
- 모바일에는 기존 nav의 flex-wrap 규칙이 적용되어 메뉴 줄바꿈을 허용합니다. CSS 변경은 없습니다.
- 검사: Node assert로 문서 링크와 유일한 이동 대상, 기존 2026-10-18 예정일 보존 확인. git diff --check 통과. 실제 브라우저·배포 확인 및 ZIP 재생성은 미실행입니다.
- 변경 파일: index.html, PROJECT_CONTEXT.md. 다음 단계는 지원 문서 본문과 연락 수단 완성, 제출 직전 최신 ZIP 생성 및 배포 화면 확인입니다. 커밋·push는 하지 않았습니다.

## 앞선 완료: T13 앱 공개 예정일 표시

- 사용자 요청으로 index.html의 13번 앱 카드에 공개 예정일 2026년 10월 18일을 표시했습니다. time 요소의 datetime은 2026-10-18입니다. 정적 문구만 변경하므로 기록 집계·후보 승인 로직에 영향이 없습니다.
- 검사: git diff --check 통과, 해당 카드 문구와 datetime을 직접 확인했습니다. 브라우저·배포 확인 및 ZIP 재생성은 하지 않았습니다.
- 다음 단계: 제출 전 node scripts/package_records.js로 최신 이야기와 예정일을 ZIP에 반영하고, 실제 배포 화면을 확인합니다. 지원 문서·연락 수단·개인정보 검토 등 미완료 항목은 아래 기록을 참고합니다.

## 앞선 검토: 변경 후 T11 충족 현황 재검토

- 2026-10-15 (Asia/Seoul), main / 9c66a9f891be36e8ba687b9bf45baea0635647fa 기준 재검토했습니다. 코드 변경 없이 이 문서만 갱신했습니다.
- 현재 이야기 본문을 Node VM으로 읽어 공백 포함·줄바꿈 제외 1,558자를 확인했습니다. 1,500자 안팎 분량은 충족합니다. 사용자 결정으로 기존 도입/순서를 유지하며, 문서의 고난부터 시작하는 엄격한 순서와는 차이가 있습니다.
- Word ZIP의 word/document.xml을 직접 읽어 자기소개서/경력기술서에 이름·제목만 있음을 확인했습니다. 원문 JSON의 paragraphs/projects도 비어 있고 이력서 파일/공개 연락 수단은 없습니다.
- 제출 ZIP 38항목을 읽어 content.js가 현재 파일과 다름을 확인했습니다. scripts/import_records.js와 data/records-import.js는 현재 파일과 일치합니다. comparison.json의 5개 identical=true는 유지되나 최신 이야기 포함을 증명하지 않습니다. ZIP의 README는 의도적으로 docs/RECORD_IMPORT.md를 사용하므로 루트 README와 다른 것은 결함이 아닙니다.
- node --check content.js, node --check app.js, git diff --check 통과. 기존 기록 장치 32개 검사는 이번에 반복하지 않았습니다. 브라우저·실제 배포·외부 링크·Supabase 미확인, SQL 미실행. ZIP은 재생성하지 않았습니다.
- 충족: 분량, 세 능력 장면, 이름/소개, 날짜, 숫자/출처, 논문/앱 자리, 이야기와 리추얼 연결 및 후보 선택/승인. 남은 구현: 지원 문서 본문/이력서 (앱 예정일·문서 입구·사이트 연락 수단은 이후 반영 완료). 확인 필요: 사실 원문 대조, 동료 검토, 배포 비로그인 접근, 학술 인용 저자명을 제외한 개인정보 전수 검토. 제출 직전 최신 ZIP 생성 필요.

## 앞선 완료: 내 이야기 6편 압축 반영

- 사용자가 채팅에서 승인한 압축문을 `content.js`의 `story`에 반영했습니다. 첫 장면 제목을 ‘컴퓨터에 대한 관심으로 시작한 진로 탐색’으로 바꾸고, 6편의 본문과 역량 설명을 교체했습니다.
- 후속 사실 정정: 사용자 설명에 따라 본인이 다른 부서에 포트 설정 확인을 요청하고, 협력 과정에서 인트라넷·인터넷 포트 설정 오류를 발견한 역할을 명시했습니다. 이후 간부님이 현장에서 설정을 변경해 연결을 복구한 흐름으로 본문과 역량 설명을 정리했습니다. 해당 두 필드 외 데이터가 동일함을 Node VM 객체 비교로 확인했습니다.
- 통신병 장면 첫 문장에 처음으로 혼자 현장 작업에 나갔던 경험임을 명시했습니다. 이번 변경은 해당 본문 첫 문장만이며, Node VM 객체 비교로 나머지 데이터가 동일함을 확인했습니다.
- 도입부터 현재까지의 순서, 날짜, 역량 종류, 장면 연결 ID는 유지했습니다. 화면은 `app.js`가 해당 필드를 그대로 표시하므로 렌더링 코드는 변경하지 않았습니다.
- 공백 포함·줄바꿈 제외 기준 본문 합계 **1,558자**입니다. 앞선 2,394자 기록은 압축 전 본문(줄바꿈 포함) 기준입니다.
- 검사: `node --check content.js`, `node --check app.js`, `git diff --check` 통과. Node VM으로 수정 전후 객체를 비교해 6개 장면의 승인 문구 일치, 날짜·ID·역량 보존, story 외 전체 데이터 동일을 확인했습니다. 별도 테스트 파일은 추가하지 않았습니다.
- 실제 브라우저·배포·외부 링크·Supabase는 이번에 확인하지 않았고 SQL은 실행하지 않았습니다. T09 서사·T11 소설 정본과의 사실 대조는 미확인입니다.
- 변경 파일: `content.js`, `PROJECT_CONTEXT.md`. 다음 단계: 로컬 `index.html`을 열어 내 이야기 6편 표시와 연결 이동을 확인하고, 필요 시 T09/T11 원문과 사실을 대조합니다. 이후 아래 문서 본문·이력서 미작성 항목을 진행합니다. 배포 반영은 별도입니다.

## 이번 완료: T11 요구사항과 현재 구현 대조

- `T11.md`의 BRA-C01~C10과 `content.js`, `index.html`, 지원 문서 원문 JSON, 기록 생성기, 생성 결과, ZIP을 검토했습니다. 외부 원문·배포 브라우저는 열지 않았습니다.
- C01: 사용자 결정으로 고난 이전 도입과 기존 순서를 유지하고, 이야기 6개 본문을 공백 포함·줄바꿈 제외 1,558자로 압축했습니다. T09 서사와 T11 소설 정본의 실제 파일 대조는 미확인입니다.
- C02 세 능력과 장면 표시는 충족: 자기동기력·대인관계력·자기조절력 모두 표시되어 있습니다. 문제해결력 장면도 별도로 있습니다.
- C03 이름과 ‘사람입니다’로 끝나는 소개, C04 날짜가 있는 장면은 충족합니다. 첫 화면에 문서/이력서 바로가기, 한 줄 소개 3안 및 동료 검토 증거는 없습니다.
- C05 현재 누적 숫자와 출처는 구현되어 있습니다. 현재 승인 기준일은 2026-10-15이며 전체 기간 종료일 2026-11-12까지의 최종 집계는 아닙니다. 사용자와의 해석 정리에 따라 고난·배려 이야기와 선택한 리추얼 장면의 연결을 인정하며, 숫자 직접 연결은 필수 수정 대상으로 잡지 않습니다.
- C06 논문 파일/보기/다운로드와 T13 앱 자리는 구현되어 있습니다. 앱 예정일은 없고, 실제 배포에서 비로그인 접근은 미확인입니다. 앱 완성 자체는 이 기준의 요구가 아닙니다.
- C07 미완성: 이력서 없음, 자기소개서/경력기술서는 파일만 있고 이름·제목 외 본문 없음. `assets/documents/application-content.json`의 paragraphs/projects가 빈 배열입니다. C08 과제별 능력·상황·행동·결과도 미작성입니다.
- C09 결정성과 새 폴더 실행은 기존 32개 검사에서 통과했습니다. 날짜·근거가 있는 리추얼 후보를 선택·승인하는 현행 기능은 사용자와 합의한 범위로 충족 처리합니다. 세 능력별 후보 생성은 문서에 있으나 현재 기능의 필수 보완 대상으로 잡지 않습니다.
- C10 최종 확인 필요: 사용자 결정에 따라 정상적인 학술 인용·참고문헌 저자명은 개인정보 위반 판단에서 제외합니다. 동료 실명·연락처 및 비밀값에 대한 전체 제출물 검사는 미완료입니다.
- 이번 검사: `node --test scripts/test_import_records.js` 32개 통과. 일반 실행은 spawn EPERM으로 차단되어 허용된 재실행에서 통과했습니다. `node --check app.js`, `node --check content.js`, `node --check scripts/import_records.js`, `node --check scripts/package_records.js`, `git diff --check` 통과. `deliverables/comparison.json`의 5개 동일 결과도 확인했습니다. 이번 검토에서는 ZIP을 재생성하지 않았습니다.
- 변경 파일: `PROJECT_CONTEXT.md`만. 실제 Supabase·배포·외부 링크 미확인, SQL 미실행.
- 다음 순서: ① 현재 이야기 로컬 표시 및 필요 시 T09/T11 정본 대조 ② 이력서·자기소개서·경력기술서 본문과 연락 수단 완성 ③ 문서 입구·T13 예정일 반영 ④ node scripts/package_records.js로 최신 ZIP 생성 ⑤ 전체 제출물 개인정보 및 실제 배포 비로그인 확인.

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
- BRA-C09 결정성과 새 폴더 실행 확인. BRA-C10 전체 제출물 검토는 미완료이며 학술 인용 저자명은 사용자 결정으로 제외합니다. privacyReviewed만으로 전수 검증을 대신하지 않습니다.
- Node.js20에서 별도로 실행하지 않았고 현재 PC의 Node24에서 검증했습니다. 외부 네트워크와 npm 설치 없이 동작합니다.
- Word 본문·이력서·최종 프로젝트 경험은 미작성. 별도 Word 생성기 scripts/build_application_documents.py는 python-docx, 논문 생성기 scripts/build_paper.py는 Python 표준 모듈을 사용하는 기존 도구입니다. 기록 갱신과 ZIP 실행에는 필요하지 않습니다.
- 업로드 UI·DB·자동 배포는 없습니다. JavaScript 비활성화 시 초기 숫자와 안내만 표시됩니다.
- .checks의 옛 Python 도구 참조/이전 링크·고정 장면 가정 검사는 과거 임시 자료입니다. 현행 검사는 scripts/test_import_records.js이며 선택 화면 검사는 .checks/verify-excerpt-choice.cjs입니다.
