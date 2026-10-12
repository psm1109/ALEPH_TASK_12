# 현재 작업 상태

- 마지막 수정 날짜: 2026-10-12 (Asia/Seoul)
- 현재 브랜치: `main`
- 기준 커밋: `9c64c9d119c5841de392696af9958422468bdd25`
- 이번 작업 시작 시 작업 트리는 깨끗했습니다. 이전 변경은 기준 커밋에 포함되어 있었습니다.
- 커밋과 push는 실행하지 않았습니다. 작성할 커밋 메시지를 채팅으로 전달합니다.

## 완료한 작업

- 논문 숫자 범위의 단일 `~`가 취소선으로 변환되는 오류를 해결했습니다. `paper-view.js`의 Marked del 토크나이저에서 단일 물결표는 일반 본문으로 처리하고 `~~`는 기존 취소선 규칙으로 처리합니다. 다운로드 원문·미리보기 데이터·벤더 코드는 변경하지 않았습니다.
- 이번 주요 수정 파일: `paper-view.js`, `README.md`, `PROJECT_CONTEXT.md`.

- 10번 논문 카드에 사용자 제공 Markdown 원본 다운로드와 보기 모달을 연결했습니다. 원본은 `assets/papers/t10-paper.md`, 미리보기 문자열은 `data/paper-markdown.js`이며 `python scripts/build_paper.py`로 갱신합니다.
- `paper-view.js`가 Marked 17.0.5의 로컬 번들(`assets/vendor/marked.umd.js`, MIT 라이선스 포함)로 서식을 적용합니다. HTML 및 URL 허용 목록을 적용하며 표·코드의 스크롤, 기존 모달의 닫기·초점 복귀·스크롤 잠금을 유지합니다.
- 이번 주요 파일: `app.js`, `content.js`, `index.html`, `styles.css`, `paper-view.js`, `scripts/build_paper.py`, `data/paper-markdown.js`, `assets/papers/t10-paper.md`, `assets/vendor/`, `README.md`, `PROJECT_CONTEXT.md`.

- 전체 컨테이너를 1280px(실제 본문 1200px)로 넓혔고 내 이야기·기록·대표작의 좌우 폭을 일치시켰습니다. 긴 글의 내부 여백은 유지합니다.
- 기록 카드의 수치를 2열로 정리하고 기준일 안내와 상세 버튼을 하단에 나란히 배치했습니다. 900px 이하에서는 달력과 카드를 세로로, 640px 이하에서는 수치를 한 열로 표시합니다. JavaScript 미실행 HTML의 수치 순서도 일치시켰습니다.
- 이번 주요 수정 파일: `styles.css`, `records-ui.js`, `index.html`, `README.md`, `PROJECT_CONTEXT.md`.

- 기간을 제목과 같은 줄의 오른쪽에 배치했습니다. 출석 상세에서 입실·퇴실 안내와 담당 선생님 안내, 반 이름·기준일 문구를 제거했습니다. 숫자·표·필터는 유지합니다. 이번 주요 수정 파일은 `styles.css`, `records-ui.js`, `PROJECT_CONTEXT.md`입니다.

- 사용자가 승인한 최신 시안대로 왼쪽 공통 달력, 오른쪽 출석·리추얼·제출 현황 세로 배치를 구현했습니다. 모바일에서는 달력 다음에 카드가 이어집니다. 세 자세히 보기 버튼의 검은 배경·흰 글씨를 통일했습니다.
- 제목 바로 오른쪽 작은 `8/11 ~ 11/12`, 번호 없는 정사각형 칸, 8월~11월 이동을 유지합니다. 기준일의 월(10월)부터 표시하며 실제 기간 밖 칸은 비웁니다.
- 채팅 출석표 40일을 시각·기호·상태·비고와 함께 `data/records-history.js`에 입력했습니다. 일반 출석 38일·공가 1일·확정 전 1일로 출석 인정 39일, 결석 0일, 출석률 97.5%입니다. 공가는 출석 인정에 포함되고 확정 전도 재적일 분모에 포함됩니다.
- `C:/Users/user/Desktop/ritual-history-2026-10-12.json`의 58일 원문을 그대로 `ritualDays`에 보존했습니다. 아침 58회·마무리 57회·총 115회이며 10/12는 아침만 있습니다. 시안에서 합계를 117회로 잘못 안내했으나 실제 계산과 코드·문서는 115회로 바로잡았습니다.
- 사용자의 요청에 따라 리추얼 요약은 기록 일수·아침·마무리·총 작성만 표시합니다. ‘아침+마무리’, ‘아침만’ 요약 행은 없으며 달력 범례는 유지합니다.
- 출석 모달은 40일 표와 최근 1주(7일)·최근 1달(30일)·개강일부터·직접 날짜 범위를 제공합니다. 기간 필터와 전체 요약을 구분합니다.
- 리추얼 모달은 날짜·이전/다음·아침/마무리 선택과 원문 항목, 접는 동료 피드백·감사 기록을 제공합니다. 달력 칸에서 해당 날짜를 열 수 있습니다. 원문 문자열은 textContent로 표시해 HTML 실행을 방지합니다.
- 미등록 날짜와 기준일 이후 날짜는 미확인입니다. 실제 확인되지 않은 결석·미작성으로 추정하지 않습니다. 출석 날짜에 없는 휴일도 새 행을 만들지 않습니다.
- 기존 제출 11건의 목록·상세 모달과 원문을 유지하고 네 모달의 닫기·Esc·배경·초점·스크롤 잠금 처리를 공통화했습니다.
- 주요 파일: `records-ui.js`, `data/records-history.js`, `app.js`, `content.js`, `index.html`, `styles.css`, `README.md`, `PROJECT_CONTEXT.md`.

## 검사 결과

- 이번 변경: `node --check paper-view.js`, `git diff --check` 통과.
- `node .checks/verify-paper.cjs` 이번 재실행 통과. 문제 문단의 숫자 범위와 원문 문자열 완전 일치, 논문 본문의 del 요소 0개, 명시적인 `~~취소선~~`·굵게·코드·물결표가 포함된 링크 정상 표시를 확인했습니다. 기존 다운로드 원본 일치·Markdown 서식·모달·모바일·보안 검사도 함께 통과했습니다.
- 아래 논문 최초 추가 및 이전 기능 설명은 기존 작업 결과입니다.

- `git status --short`, `git branch --show-current`, `git rev-parse HEAD`: 깨끗한 main과 기준 커밋 확인.
- `python scripts/build_paper.py`: 미리보기 JS 생성 완료.
- `node --check app.js`, `node --check paper-view.js`, `node --check data/paper-markdown.js`, `node --check content.js`, `git diff --check`: 통과.
- `node .checks/verify-paper.cjs`: 승인된 로컬 Chrome 검사 통과. 사용자 원본/저장소 원본/실제 다운로드의 SHA-256 일치와 파일명, 미리보기 Markdown 문자열 일치, 제목·표·코드 블록·참고문헌, 닫기·Esc·배경·초점 복귀, 390px 모바일 표 스크롤·페이지 넘침 없음, file:// 직접 열기, 위험 HTML/URL 비실행, 브라우저 오류 없음을 확인했습니다.
- `.checks/paper-modal.png`를 열어 실제 논문 모달 레이아웃을 확인했습니다. `.checks/`는 임시 검증 경로입니다.
- 이전 기록 영역·본문 폭의 전체 기능 검사는 이전 작업 결과입니다. 이번에는 논문 기능과 공통 모달 영향 범위를 확인했습니다.
- 외부 참고문헌·OSF 링크 가용성과 배포 브라우저·Supabase는 미확인입니다. SQL과 논문 안의 분석/재현 명령은 실행하지 않았습니다.
## 미확인 항목과 다음 단계

1. 원문을 갱신하려면 `data/records-history.js`의 `PORTFOLIO_HISTORY.asOf`, `attendance`, `ritualDays`를 변경합니다. 형식은 README에 있습니다. 원본 Desktop JSON은 다른 PC에 없으므로 사이트 실행에는 저장소의 JS만 필요합니다.
2. 10/12 출석 확정과 마무리 리추얼은 이후 제공 자료로 갱신해야 합니다. 파일에 없는 8/15~17, 8/22~23의 리추얼 미작성 여부는 확인하지 않았습니다. 10/13 이후는 미래/미확인입니다.
3. 파일 자동 가져오기와 능력별 문단 후보 재생성 장치는 별도 작업입니다. 기존 `scripts/update_records.py`는 계획·완료·다시 시작 집계용이며 새 UI 원문과 자동 연결되지 않습니다.
4. 새 데이터를 넣을 때 `index.html`의 JavaScript 미실행 요약, `content.js`의 예비 누적 숫자·연결 문구도 갱신합니다. 표시 중인 실제 숫자는 `records-ui.js`가 원문에서 집계합니다. 제출 목록·상태·본문은 `content.js`에서 관리합니다.
5. 서버가 필요하면 `python -m http.server 8000 --bind 127.0.0.1` 후 `http://localhost:8000/#records`를 엽니다. 배포 파일에 `records-ui.js`와 `data/records-history.js`를 반드시 포함합니다.
6. 이전 이야기 날짜 불일치(표시 2026년 3월, date 2026-04), 외부 링크 가용성, 원본 첨부파일, 실제 운영 환경은 미확인입니다.
7. 논문을 바꾸려면 `assets/papers/t10-paper.md`를 편집하고 `python scripts/build_paper.py`를 실행합니다. 다른 PC에서는 Desktop 원본이 없어도 저장소 파일만으로 동작합니다. 배포에 `paper-view.js`, `data/paper-markdown.js`, `assets/papers/`, `assets/vendor/`도 포함합니다. 다운로드에는 원본 Markdown만 포함되며 논문에 언급된 ZIP·CSV·분석 코드는 별도 제공되지 않았습니다.
8. 변경을 검토하고 필요한 파일만 커밋합니다. 직접 push하지 않습니다.
