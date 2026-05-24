import re
import math


def shannon_entropy(text):
    """Calculate Shannon entropy of text to detect suspicious domains."""
    if not text or len(text) == 0:
        return 0.0
    
    try:
        prob = [float(text.count(c)) / len(text) for c in dict.fromkeys(list(text))]
        entropy = -sum([p * math.log2(p) for p in prob if p > 0])
        return entropy
    except (ValueError, ZeroDivisionError):
        return 0.0


def detect(text):

    text_lower = text.lower()

    risk = 0
    reasons = []

    # -----------------------------
    # URL Detection
    # -----------------------------
    urls = re.findall(r'https?://\S+', text_lower)

    if urls:
        risk += 30
        reasons.append("Contains URL")

    # -----------------------------
    # URL Entropy (suspicious domain)
    # -----------------------------
    for url in urls:
        try:
            domain = url.split("/")[2] if len(url.split("/")) > 2 else url
            
            if shannon_entropy(domain) > 3.5:
                risk += 20
                reasons.append("High entropy domain (possible phishing)")
        except (IndexError, AttributeError):
            # Skip malformed URLs
            continue

    # -----------------------------
    # Urgency indicators
    # -----------------------------
    urgency = [
        "urgent",
        "immediately",
        "action required",
        "within 24 hours",
        "account suspended"
    ]

    for word in urgency:
        if word in text_lower:
            risk += 10
            reasons.append(f"Urgency language: {word}")

    # -----------------------------
    # Credential harvesting
    # -----------------------------
    credentials = [
        "verify your account",
        "confirm identity",
        "login",
        "password",
        "credentials"
    ]

    for word in credentials:
        if word in text_lower:
            risk += 20
            reasons.append(f"Credential request: {word}")

    # -----------------------------
    # Banking phishing patterns
    # -----------------------------
    banking = [
        "bank",
        "security alert",
        "suspicious activity",
        "account locked"
    ]

    for word in banking:
        if word in text_lower:
            risk += 15
            reasons.append(f"Bank phishing indicator: {word}")

    # -----------------------------
    # Attachment phishing
    # -----------------------------
    if "attachment" in text_lower:
        risk += 10
        reasons.append("Attachment mentioned")

    # -----------------------------
    # Cap score
    # -----------------------------
    risk = min(risk, 100)

    verdict = "phishing" if risk >= 50 else "legitimate"

    return {
        "risk_score": risk,
        "confidence": 0.88,
        "verdict": verdict,
        "reasons": reasons
    }