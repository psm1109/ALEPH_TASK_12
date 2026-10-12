# 현재 작업 상태

- 마지막 수정 날짜: 2026-10-12 (Asia/Seoul)
- 현재 브랜치: `main`
- 기준 커밋: `5056d0a9311b84866af212a2925b33c5185abe5a`
- 시작 시 이전 문서 추가 작업의 변경 사항이 남아 있었습니다: `PROJECT_CONTEXT.md`, `README.md`, `app.js`, `content.js`, `index.html`, `assets/documents/`, `scripts/build_application_documents.py`.
- 커밋과 push는 실행하지 않았습니다. 작성할 커밋 메시지를 채팅으로 전달합니다.

## 이번에 완료한 작업

- 사용자 요청에 따라 자기소개서와 경력기술서의 본문을 삭제했습니다. 두 Word 파일에는 이름과 문서 제목만 있습니다. 지원 분야·소제목·표·과제·기준일도 출력하지 않습니다.
- `assets/documents/application-content.json`의 자기소개서 원문·출처·과제 목록·범위 설명·역할 설명·기준일을 비웠습니다. 이전 본문을 재생성하지 않습니다.
- 생성기는 빈 입력을 처리하며, 나중에 본문을 채워 다시 생성할 수 있습니다. 지원 분야를 코드에 고정하지 않고 선택 입력으로 바꿨습니다.
- 기존 다운로드 버튼과 문서 경로는 그대로 유지합니다. 사이트의 이야기 카드·제출 기록·논문 원문은 이번 삭제 대상이 아닙니다.
- 이력서는 사용자가 별도로 작성 중이며 사이트의 기존 준비 중 상태입니다.

## 주요 파일

- `assets/documents/self-introduction.docx`: 제목만 있는 자기소개서.
- `assets/documents/project-experience.docx`: 제목만 있는 경력기술서.
- `assets/documents/application-content.json`: 비운 문서 데이터.
- `scripts/build_application_documents.py`: 빈 입력 처리 및 선택 지원 분야 입력.
- `README.md`, `PROJECT_CONTEXT.md`: 현재 상태와 나중에 내용을 넣는 방법.
- 이전 작업의 `content.js`, `app.js`, `index.html` 다운로드 연결은 유지했습니다.

## 이번 검사 결과

- `git status --short`, `git branch --show-current`, `git rev-parse HEAD`: 기존 변경 사항, main, 위 기준 커밋 확인.
- Codex 번들 Python으로 `scripts/build_application_documents.py`: 두 문서 재생성 성공.
- python-docx 및 JSON 검사: 각 문서에 제목 문단 1개, 표 0개, 원문 문단·과제 배열이 비어 있음 확인.
- 설치된 Word를 숨김 상태로 실행해 두 문서를 검사용 PDF로 출력하고 번들 pypdfium2로 PNG 생성. 두 페이지 이미지를 열어 제목만 있고 본문이 없는 상태 확인. LibreOffice는 이전 작업에서 미설치로 확인되어 이번에는 Word를 사용했습니다.
- `node .checks/verify-application.cjs`: 승인된 로컬 Chrome 검사 통과. 실제 다운로드와 빈 Word 원본 바이트 일치, JavaScript 비활성화 HTML 링크·반환 파일 일치, 390px 가로 넘침 없음, file:// 링크 2개, 브라우저 오류 없음. JavaScript 비활성화 상태의 클릭 다운로드 완료는 확인하지 않았습니다.
- `git diff --check`: 통과.
- 실제 Supabase·배포 브라우저·외부 링크는 확인하지 않았습니다. SQL은 실행하지 않았습니다.
- `.checks/`는 Git 제외 검증 경로입니다. 검사용 PDF/PNG는 `.checks/application/`에만 있습니다.

## 남은 항목과 다음 단계

1. 사용자가 문서 내용을 나중에 작성합니다. 현재 파일은 지원서 제출용 완성 문서가 아닙니다. BRA-C07·C08의 내용 충족은 보류 상태입니다.
2. `assets/documents/application-content.json`의 `introduction.field`(선택), `title`, `paragraphs`를 채우고 경력기술서의 `experience.scope`, `role`, `projects`를 채웁니다. 과제는 `code`, `title`, `submitted`, `ability`, `situation`, `action`, `result`를 사용하며 과제를 넣을 때 `asOf`도 입력합니다.
3. Python과 python-docx로 `python scripts/build_application_documents.py` 실행 후 Word에서 확인합니다. Codex에서는 `load_workspace_dependencies`가 반환한 번들 Python을 사용합니다. Word 파일만 직접 편집한 경우 생성기를 다시 실행하면 JSON 내용으로 덮어쓰므로 JSON과 함께 관리하세요.
4. `python -m http.server 8000 --bind 127.0.0.1` 후 `http://localhost:8000/#documents`에서 다운로드를 확인합니다. 배포에 `assets/documents/`를 포함합니다.
5. 기존 기록의 10/12 출석 확정·마무리 리추얼, 외부 링크 가용성, 카드 1 표시 날짜(2026년 3월)와 date(2026-04)의 불일치는 미확인/미해결입니다. 출석·리추얼 원문은 `data/records-history.js`, 제출은 `content.js`, 논문 갱신은 `python scripts/build_paper.py`를 사용합니다. 자세한 내용은 README에 있습니다.
6. 남아 있는 변경을 검토하고 필요한 파일만 커밋합니다. 직접 push하지 않습니다.
