import re
import os
import joblib

model = None
vectorizer = None

MODEL_PATH = "app/models/phishing_model.pkl"
VECT_PATH = "app/models/vectorizer.pkl"

# Load models only if they exist
if os.path.exists(MODEL_PATH) and os.path.exists(VECT_PATH):
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECT_PATH)


def detect(text):
    """
    Detect phishing using ML model with fallback to heuristics.
    """
    text_lower = text.lower()

    ml_score = 0
    prob = 0.5

    # If ML model exists use it
    if model and vectorizer:
        try:
            X = vectorizer.transform([text])
            prob = model.predict_proba(X)[0][1]
            ml_score = int(prob * 100)
        except Exception as e:
            # Fallback to heuristic scoring if model fails
            print(f"ML model error: {e}")
            ml_score = 0

    indicators = 0
    reasons = []

    if "http://" in text_lower or "https://" in text_lower:
        indicators += 1
        reasons.append("External link detected")

    if "verify" in text_lower or "confirm" in text_lower:
        indicators += 1
        reasons.append("Credential verification request")

    if "bank" in text_lower or "account" in text_lower:
        indicators += 1
        reasons.append("Financial institution reference")

    if "urgent" in text_lower or "immediately" in text_lower:
        indicators += 1
        reasons.append("Urgency language")

    if re.search(r"login|secure|password", text_lower):
        indicators += 1
        reasons.append("Authentication keyword detected")

    boost = indicators * 20

    risk = max(ml_score, boost)

    verdict = "phishing" if risk >= 50 else "legitimate"

    return {
        "risk_score": risk,
        "confidence": round(prob, 2),
        "verdict": verdict,
        "reasons": reasons
    }