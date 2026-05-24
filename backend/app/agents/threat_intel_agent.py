import re


def threat_intel_agent(text):

    indicators = []

    urls = re.findall(r'https?://\S+', text)

    for url in urls:

        indicators.append(
            f"External URL detected: {url}"
        )

    if "bank" in text.lower():

        indicators.append(
            "Possible banking phishing pattern"
        )

    if "verify" in text.lower():

        indicators.append(
            "Credential verification request"
        )

    return indicators