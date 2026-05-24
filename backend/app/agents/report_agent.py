def report_agent(result):

    if result["verdict"] == "phishing":

        summary = (
            "The analyzed message shows strong indicators "
            "of phishing activity including credential "
            "harvesting patterns and suspicious links."
        )

        remediation = [
            "Block the domain in email gateway",
            "Reset potentially exposed credentials",
            "Alert SOC team for investigation"
        ]

    else:

        summary = (
            "The analyzed message appears legitimate "
            "with no significant phishing indicators."
        )

        remediation = [
            "No action required"
        ]

    result["executive_summary"] = summary
    result["remediation"] = remediation

    return result