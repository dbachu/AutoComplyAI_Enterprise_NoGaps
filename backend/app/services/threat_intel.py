import requests
import re


PHISHTANK_URL = "https://checkurl.phishtank.com/checkurl/"


def extract_urls(text):

    urls = re.findall(r'https?://\S+', text)

    return urls


def check_phishtank(url):
    """
    Check if URL is in PhishTank database.
    Returns False on any error to avoid blocking scans.
    """
    try:
        res = requests.post(
            PHISHTANK_URL,
            data={"url": url},
            timeout=5  # Add timeout to prevent hanging
        )
        
        if res.status_code == 200:
            data = res.json()
            return data.get("results", {}).get("valid", False)
        
        return False

    except (requests.RequestException, ValueError, KeyError):
        # Silently fail - don't block scans due to external API issues
        return False


def enrich_threat_intel(text):

    urls = extract_urls(text)

    indicators = []

    for url in urls:

        if check_phishtank(url):

            indicators.append(
                f"Known phishing URL detected: {url}"
            )

    return indicators