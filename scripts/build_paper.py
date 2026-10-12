"""논문 Markdown을 파일 직접 열기에서도 사용할 수 있는 JS 문자열로 내보냅니다."""
import json
from pathlib import Path

root = Path(__file__).resolve().parent.parent
source = root / 'assets/papers/t10-paper.md'
markdown = source.read_text(encoding='utf-8-sig')
output = root / 'data/paper-markdown.js'
output.write_text('// 원본: assets/papers/t10-paper.md · 갱신: python scripts/build_paper.py\nwindow.PORTFOLIO_PAPER_MARKDOWN = ' + json.dumps(markdown, ensure_ascii=False) + ';\n', encoding='utf-8')
print(f'논문 미리보기 데이터 생성: {output.relative_to(root)}')
