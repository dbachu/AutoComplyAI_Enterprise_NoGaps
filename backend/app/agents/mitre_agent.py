def mitre_agent(text):

    text_lower = text.lower()

    mappings = []

    if "http" in text_lower:
        mappings.append("T1566.002 – Phishing: Link")

    if "attachment" in text_lower:
        mappings.append("T1566.001 – Phishing: Attachment")

    if "password" in text_lower:
        mappings.append("T1556 – Credential Harvesting")

    return mappings