from ..detectors.rule_engine import detect as rule_detect
from ..detectors.ml_engine import detect as ml_detect
from ..agents.llm_model import analyze_with_llm


def run_detection_agent(text):

    rule = rule_detect(text)
    ml = ml_detect(text)
    llm = analyze_with_llm(text)

    rule_score = rule.get("risk_score", 0)
    ml_score = ml.get("risk_score", 0)
    llm_score = llm.get("risk_score", 0)

    weighted = (
        rule_score * 0.3 +
        ml_score * 0.3 +
        llm_score * 0.4
    )

    risk = max(rule_score, ml_score, llm_score, weighted)

    verdict = "phishing" if risk >= 50 else "legitimate"

    return {
        "risk_score": int(risk),
        "verdict": verdict,
        "confidence": 0.94,
        "decision_breakdown": {
            "rule_engine": rule_score,
            "ml_model": ml_score,
            "llm_model": llm_score,
            "weighted_score": int(weighted)
        }
    }