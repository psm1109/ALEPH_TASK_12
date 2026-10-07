"""표준 라이브러리만 사용하는 결정적 기록 집계 도구."""
import argparse
import datetime as dt
import json
from pathlib import Path


def integer(record, key):
    value = record.get(key)
    if type(value) is not int or value < 0:
        raise ValueError(f"{key}: 0 이상의 정수가 필요합니다.")
    return value


def aggregate(payload):
    records = payload.get("records")
    if not isinstance(records, list):
        raise ValueError("records 배열이 필요합니다.")
    seen = set()
    normalized = []
    for record in records:
        if not isinstance(record, dict):
            raise ValueError("각 기록은 객체여야 합니다.")
        date = dt.date.fromisoformat(record["date"])
        if date in seen:
            raise ValueError(f"중복 날짜: {date}")
        seen.add(date)
        planned = integer(record, "planned")
        completed = integer(record, "completed")
        restarts = integer(record, "restarts")
        if completed > planned:
            raise ValueError("완료 건수는 계획 건수를 넘을 수 없습니다.")
        source = record.get("source")
        if not isinstance(source, str) or not source.strip():
            raise ValueError("모든 기록에는 공개 가능한 출처가 필요합니다.")
        normalized.append((date, planned, completed, restarts, source.strip()))
    normalized.sort()
    planned = sum(r[1] for r in normalized)
    completed = sum(r[2] for r in normalized)
    restarts = sum(r[3] for r in normalized)
    result = {
        "weeks": len({r[0].isocalendar()[:2] for r in normalized}),
        "start": normalized[0][0].isoformat() if normalized else None,
        "end": normalized[-1][0].isoformat() if normalized else None,
        "planned": planned,
        "completed": completed,
        "persistenceRate": round(completed / planned * 100, 1) if planned else None,
        "restarts": restarts,
        "sources": sorted({r[4] for r in normalized}),
    }
    result["paragraphCandidates"] = [] if not normalized else [
        f"{result['start']}부터 {result['end']}까지 {result['weeks']}개 주에 기록을 남겼습니다. 계획한 과제 {planned}건 중 {completed}건을 완료했습니다.",
        f"기록에 남긴 다시 시작한 횟수는 {restarts}회입니다. 이 수치는 행동의 기록이며, 회복탄력성의 심리검사 점수를 뜻하지 않습니다."
    ]
    return result


def main():
    root = Path(__file__).resolve().parent.parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=root / "data/records.json")
    parser.add_argument("--output", type=Path, default=root)
    args = parser.parse_args()
    try:
        result = aggregate(json.loads(args.input.read_text(encoding="utf-8-sig")))
    except (ValueError, KeyError, TypeError, OSError) as error:
        parser.exit(1, f"기록을 확인하세요: {error}\n")
    serialized = json.dumps(result, ensure_ascii=False, sort_keys=True, indent=2)
    args.output.mkdir(parents=True, exist_ok=True)
    (args.output / "records-result.json").write_text(serialized + "\n", encoding="utf-8")
    (args.output / "records-result.js").write_text("window.PORTFOLIO_RECORDS = " + serialized + ";\n", encoding="utf-8")
    candidates = "# 기록 기반 문단 후보\n\n" + (
        "\n\n".join(result["paragraphCandidates"]) if result["paragraphCandidates"]
        else "실제 기록이 없어 문단 후보를 생성하지 않았습니다."
    )
    (args.output / "paragraph-candidates.md").write_text(candidates + "\n", encoding="utf-8")
    print(f"기록 {result['weeks']}개 주 집계 완료: {args.output}")


if __name__ == "__main__":
    main()
