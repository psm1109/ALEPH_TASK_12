# 현재 작업 상태

- 마지막 수정 날짜: 2026-10-08 (Asia/Seoul)
- 현재 브랜치: `main`
- 기준 커밋: `629d4607218a8514279a8ee69e866735f7c467c3`

## 완료한 작업

- 제출내용 11건의 제목과 본문을 `content.js`의 `submissionContents`로 통합했습니다. 기존 데이터와 모든 제목·본문이 완전히 같습니다.
- `app.js`는 `PORTFOLIO_CONTENT.submissionContents`의 과제 코드로 기존 모달을 엽니다. `index.html`의 별도 데이터 스크립트 참조를 제거했습니다.
- `data/submissions/T01-submission.md`~`T11-submission.md`, `submissions-content.js`, `scripts/build_submissions.py`를 제거했습니다. `data/records.json`과 `scripts/update_records.py`는 유지했습니다.
- README에 콘텐츠 수정 방법과 배포 파일 목록을 갱신했습니다. 제출내용은 이제 `content.js`만 편집하면 반영되며 별도 Markdown·생성 도구·제출 HTML 페이지·다운로드 기능이 없습니다.
- 기존 모달 열기·닫기·Esc·배경 클릭·초점 복귀, 기록 숫자·표 디자인·세 카드 높이 통일, 일반 텍스트 선택·복사 및 깜빡이는 입력 표시 숨김을 유지했습니다.
- 주요 수정 경로: `content.js`, `app.js`, `index.html`, `README.md`, `PROJECT_CONTEXT.md`.
- 작업 시작 당시 `README.md`, `app.js`, `content.js`, `index.html`, `styles.css`가 수정 상태였고, `AGENTS.md`, 이 문서, 생성 도구, 모달 데이터, Markdown 원본은 미추적 상태였습니다. 기존 변경을 보존했습니다.

## 검사 결과

- `git status --short`, `git branch --show-current`, `git rev-parse HEAD`로 기존 변경·브랜치·기준 커밋을 재확인했습니다.
- Node `vm` 검사: 통합 전후 제출내용 11건의 제목·본문 완전 일치 및 과제 코드 연결을 확인했습니다. 결과: PASS.
- `node --check app.js`, `node --check content.js`: 통과했습니다.
- `git diff --check`: 통과했습니다.
- 통합 후 로컬 브라우저 `http://localhost:5500/#records`에서 T11~T01 11개 모달을 모두 열고 닫았습니다. 제목·본문 표시 및 페이지 주소 유지가 모두 정상입니다. 임시 검증 탭을 닫았습니다.
- 실제 외부 결과물·저장소·출석/리추얼 서비스, 첨부파일, 배포 환경, Supabase는 확인하지 않았으며 SQL도 실행하지 않았습니다.

## 미확인 항목과 다음 단계

- 제출내용 수정: `content.js`의 `submissionContents.Txx.title`과 `body`를 편집합니다. 본문은 HTML 문자열이며 텍스트 특수문자는 HTML 이스케이프합니다. 숫자·시각·상태 목록은 `records.submissions`에서 관리합니다.
- 배포 대상은 `index.html`, `styles.css`, `app.js`, `content.js`, `assets/`입니다. 제출 Markdown 파일은 필요하지 않습니다.
- 기존 이야기 날짜 불일치: 표시 날짜는 2026년 3월이지만 `date`는 `2026-04`이며 이전 대화에서는 2026년 4월을 확인했습니다. 실제 시점 확인 후 맞춰야 합니다. 마지막 이야기 기간의 종료월 11월도 확인이 필요합니다.
- 원본 첨부파일은 이름 목록만 제공되고 실제 파일은 미제공입니다. 외부 링크의 현재 가용성도 미확인입니다.
- 로컬 서버가 없으면 `python -m http.server 8000 --bind 127.0.0.1`을 실행하고 `http://localhost:8000/#records`를 엽니다.
- 기존 변경과 이번 변경을 검토한 뒤 필요한 파일만 커밋합니다. 이번 작업에서는 커밋과 push를 실행하지 않았습니다.
