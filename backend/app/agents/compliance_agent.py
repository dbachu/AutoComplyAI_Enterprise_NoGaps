def compliance_agent(risk_score):

    mappings = []

    if risk_score >= 50:

        mappings.append("ISO 27001 A.16 – Incident Management")
        mappings.append("NIST CSF PR.DS – Data Security")
        mappings.append("GDPR Article 32 – Security of Processing")

    return mappings