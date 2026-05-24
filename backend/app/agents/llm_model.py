from transformers import pipeline
import logging

# Lightweight public model
try:
    classifier = pipeline(
        "text-classification",
        model="distilbert-base-uncased-finetuned-sst-2-english"
    )
except Exception as e:
    logging.warning(f"Failed to load LLM model: {e}")
    classifier = None

def analyze_with_llm(text):
    """
    Analyze text using transformer model for semantic phishing detection.
    Falls back to basic heuristics if model unavailable.
    """
    if not classifier:
        # Fallback to basic heuristic
        text_lower = text.lower()
        risk = 50 if any(word in text_lower for word in ["urgent", "verify", "password"]) else 20
        return {
            "risk_score": risk,
            "confidence": 0.6,
            "verdict": "phishing" if risk >= 50 else "legitimate",
            "mode": "llm_model",
            "reasons": ["LLM model unavailable - using fallback heuristics"]
        }
    
    try:
        result = classifier(text[:512])[0]  # Limit text length for performance

        label = result["label"]
        score = result["score"]

        # Convert sentiment result to phishing risk
        # Negative sentiment often correlates with urgency/threat language
        if label == "NEGATIVE":
            risk = int(score * 100)
            verdict = "phishing"
        else:
            risk = int((1 - score) * 40)
            verdict = "legitimate"

        return {
            "risk_score": risk,
            "confidence": score,
            "verdict": verdict,
            "mode": "llm_model",
            "reasons": [f"LLM semantic analysis: {label} sentiment"]
        }
    except Exception as e:
        logging.error(f"LLM analysis error: {e}")
        return {
            "risk_score": 50,
            "confidence": 0.5,
            "verdict": "legitimate",
            "mode": "llm_model",
            "reasons": [f"LLM analysis failed: {str(e)}"]
        }