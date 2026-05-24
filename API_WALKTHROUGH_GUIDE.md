# AutoComplyAI Enterprise API Walkthrough Guide

## 📚 Interactive API Documentation: http://localhost:8000/docs

This guide provides a comprehensive walkthrough of the AutoComplyAI Enterprise REST API using the interactive Swagger UI documentation.

---

## 🎯 Table of Contents

1. [Getting Started](#getting-started)
2. [Core Endpoints](#core-endpoints)
3. [Analytics Endpoints](#analytics-endpoints)
4. [Export Endpoints](#export-endpoints)
5. [Common Use Cases](#common-use-cases)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)

---

## 🚀 Getting Started

### Accessing Swagger UI

1. **Start the backend server:**
   ```bash
   podman-compose up --build
   ```

2. **Open Swagger UI in your browser:**
   ```
   http://localhost:8000/docs
   ```

3. **You'll see an interactive API documentation interface with:**
   - List of all available endpoints
   - Request/response schemas
   - "Try it out" functionality for testing
   - Example values and data models

### Swagger UI Features

- **Expand/Collapse Endpoints:** Click on any endpoint to see details
- **Try It Out:** Test endpoints directly from the browser
- **Schemas:** View request/response data structures at the bottom
- **Authorization:** Configure authentication (if required)

---

## 🔧 Core Endpoints

### 1. Health Check

**Endpoint:** `GET /health`

**Purpose:** Verify that the API service is running and healthy.

**How to Test:**
1. Click on `GET /health` in Swagger UI
2. Click "Try it out"
3. Click "Execute"

**Expected Response:**
```json
{
  "status": "healthy",
  "service": "AutoComplyAI Enterprise",
  "version": "1.0.0"
}
```

**Use Cases:**
- Monitoring and alerting systems
- Load balancer health checks
- Deployment verification
- Service discovery

---

### 2. Email Threat Scan

**Endpoint:** `POST /scan`

**Purpose:** Analyze email content for phishing threats using AI detection engines.

**Request Body Schema:**
```json
{
  "text": "string",
  "mode": "string"
}
```

**Parameters:**

| Parameter | Type | Required | Description | Valid Values |
|-----------|------|----------|-------------|--------------|
| `text` | string | Yes | Email content to analyze (subject + body) | Any text |
| `mode` | string | No | Detection engine mode | `rule`, `ml`, `hybrid`, `llm_mock`, `openai` |

**Detection Modes Explained:**

- **`rule`** (Default): Fast pattern-based detection using heuristics
  - Best for: Known phishing patterns, quick scans
  - Speed: <100ms
  - Accuracy: Good for common threats

- **`ml`**: Machine learning classifier with TF-IDF vectorization
  - Best for: Statistical pattern recognition
  - Speed: ~500ms
  - Accuracy: Better for unknown variants

- **`hybrid`**: Ensemble of Rule + ML + LLM (Recommended)
  - Best for: Comprehensive analysis, high-stakes decisions
  - Speed: ~2s
  - Accuracy: Highest (weighted voting)

- **`llm_mock`**: Simulated LLM for testing without API costs
  - Best for: Development and testing
  - Speed: ~100ms
  - Accuracy: Mock data

- **`openai`**: GPT-4 contextual analysis
  - Best for: Complex threats, zero-day detection
  - Speed: ~1-2s
  - Accuracy: Excellent for sophisticated attacks

**How to Test:**

1. Click on `POST /scan`
2. Click "Try it out"
3. Replace the example JSON with:

```json
{
  "text": "URGENT: Your account will be suspended! Click here immediately to verify: http://suspicious-link.com/verify",
  "mode": "hybrid"
}
```

4. Click "Execute"

**Expected Response:**
```json
{
  "scan_id": 1,
  "report": {
    "verdict": "phishing",
    "risk_score": 85,
    "confidence": 0.92,
    "mode": "hybrid",
    "mitre_mapping": [
      "T1566.002 - Phishing: Spearphishing Link",
      "T1598.003 - Phishing for Information: Spearphishing via Service"
    ],
    "compliance_mapping": [
      "ISO 27001: A.5.16 - Identity Management",
      "NIST CSF: PR.AC-7 - Users authenticated",
      "GDPR: Article 32 - Security of Processing"
    ],
    "remediation": [
      "Block sender domain in email gateway",
      "Add URL to threat intelligence blocklist",
      "Conduct user awareness training"
    ],
    "executive_summary": "High-risk phishing attempt detected..."
  },
  "decision_breakdown": {
    "rule_engine": {
      "verdict": "phishing",
      "confidence": 0.85,
      "reasoning": "Detected urgency keywords and suspicious URL"
    },
    "ml_engine": {
      "verdict": "phishing",
      "confidence": 0.88,
      "reasoning": "Text features match phishing patterns"
    },
    "llm_engine": {
      "verdict": "phishing",
      "confidence": 0.95,
      "reasoning": "Contextual analysis indicates social engineering"
    }
  },
  "agent_timeline": [
    {
      "agent": "Detection Agent",
      "timestamp": "2024-01-15T10:30:00Z",
      "action": "Analyzed email content",
      "result": "Phishing detected"
    },
    {
      "agent": "Threat Intel Agent",
      "timestamp": "2024-01-15T10:30:01Z",
      "action": "Enriched with IOCs",
      "result": "URL flagged as malicious"
    }
  ]
}
```

**Response Fields Explained:**

- **`scan_id`**: Unique identifier for this scan (use for exports)
- **`report.verdict`**: Final classification (`phishing` or `legitimate`)
- **`report.risk_score`**: 0-100 scale (70+ = high risk)
- **`report.confidence`**: 0-1 scale (model certainty)
- **`report.mitre_mapping`**: ATT&CK techniques identified
- **`report.compliance_mapping`**: Relevant security controls
- **`report.remediation`**: Recommended actions
- **`decision_breakdown`**: Per-engine analysis details
- **`agent_timeline`**: Multi-agent execution flow

---

### 3. Get All Scans

**Endpoint:** `GET /scans`

**Purpose:** Retrieve all historical scan results from the database.

**How to Test:**
1. Click on `GET /scans`
2. Click "Try it out"
3. Click "Execute"

**Expected Response:**
```json
[
  {
    "id": 1,
    "text": "Email content...",
    "verdict": "phishing",
    "risk_score": 85,
    "confidence": 0.92,
    "mode": "hybrid",
    "mitre_mapping": "[\"T1566.002\"]",
    "compliance_mapping": "[\"ISO 27001: A.5.16\"]",
    "created_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "text": "Another email...",
    "verdict": "legitimate",
    "risk_score": 15,
    "confidence": 0.88,
    "mode": "rule",
    "mitre_mapping": "[]",
    "compliance_mapping": "[]",
    "created_at": "2024-01-15T11:00:00Z"
  }
]
```

**Use Cases:**
- Dashboard data population
- Historical analysis
- Trend identification
- Audit trail review

---

## 📊 Analytics Endpoints

### 4. Get Metrics

**Endpoint:** `GET /metrics`

**Purpose:** Retrieve aggregated security metrics and KPIs.

**How to Test:**
1. Click on `GET /metrics`
2. Click "Try it out"
3. Click "Execute"

**Expected Response:**
```json
{
  "total_scans": 150,
  "high_risk_scans": 23,
  "average_risk_score": 42.5,
  "scan_modes": {
    "rule": 50,
    "ml": 45,
    "hybrid": 55
  }
}
```

**Response Fields:**

| Field | Description | Business Value |
|-------|-------------|----------------|
| `total_scans` | Total number of scans performed | System utilization metric |
| `high_risk_scans` | Scans with risk_score ≥ 70 | Priority incident queue size |
| `average_risk_score` | Mean risk across all scans | Baseline threat level |
| `scan_modes` | Count per detection mode | Cost and performance analysis |

**Dashboard Integration:**
- Powers KPI cards on the dashboard
- Updates every 4 seconds via polling
- Used for executive reporting

---

### 5. Get Threat Feed

**Endpoint:** `GET /threat-feed`

**Purpose:** Retrieve the 20 most recent threat detections for real-time monitoring.

**How to Test:**
1. Click on `GET /threat-feed`
2. Click "Try it out"
3. Click "Execute"

**Expected Response:**
```json
[
  {
    "id": 150,
    "verdict": "phishing",
    "risk_score": 92,
    "mode": "hybrid",
    "created_at": "2024-01-15T14:30:00Z"
  },
  {
    "id": 149,
    "verdict": "legitimate",
    "risk_score": 12,
    "mode": "rule",
    "created_at": "2024-01-15T14:25:00Z"
  }
  // ... 18 more recent scans
]
```

**Features:**
- Ordered by `created_at` descending (newest first)
- Limited to 20 most recent events
- Updates every 3 seconds in the dashboard
- Powers the Live Threat Feed component

---

### 6. Get MITRE Heatmap

**Endpoint:** `GET /mitre-heatmap`

**Purpose:** Retrieve MITRE ATT&CK technique frequency distribution.

**How to Test:**
1. Click on `GET /mitre-heatmap`
2. Click "Try it out"
3. Click "Execute"

**Expected Response:**
```json
{
  "T1566.002": 45,
  "T1598.003": 32,
  "T1566.001": 28,
  "T1204.002": 15
}
```

**Response Format:**
- Key: MITRE ATT&CK Technique ID
- Value: Number of times detected

**Use Cases:**
- Identify most prevalent attack techniques
- Prioritize security control investments
- Compliance reporting (NIST, ISO 27001)
- Threat intelligence correlation

---

### 7. Get Risk Trend

**Endpoint:** `GET /risk-trend`

**Purpose:** Retrieve time-series risk score data for trend analysis.

**How to Test:**
1. Click on `GET /risk-trend`
2. Click "Try it out"
3. Click "Execute"

**Expected Response:**
```json
[
  {
    "date": "2024-01-15",
    "average_risk": 45.2
  },
  {
    "date": "2024-01-14",
    "average_risk": 38.7
  },
  {
    "date": "2024-01-13",
    "average_risk": 52.1
  }
]
```

**Dashboard Visualization:**
- Powers the Risk Score Trend line chart
- X-axis: Date
- Y-axis: Average Risk Score
- Helps identify threat campaigns and anomalies

---

### 8. Get Threat Stats

**Endpoint:** `GET /threat-stats`

**Purpose:** Retrieve detailed threat statistics and distributions.

**How to Test:**
1. Click on `GET /threat-stats`
2. Click "Try it out"
3. Click "Execute"

**Expected Response:**
```json
{
  "verdict_distribution": {
    "phishing": 45,
    "legitimate": 105
  },
  "mode_distribution": {
    "rule": 50,
    "ml": 45,
    "hybrid": 55
  },
  "risk_distribution": {
    "low": 80,
    "medium": 47,
    "high": 23
  }
}
```

**Use Cases:**
- Verdict distribution pie chart
- Detection mode analysis
- Risk severity breakdown
- Model performance evaluation

---

## 📤 Export Endpoints

### 9. Export PDF Report

**Endpoint:** `GET /export/pdf/{scan_id}`

**Purpose:** Generate and download a professional PDF security report for a specific scan.

**Path Parameter:**
- `scan_id` (integer, required): The ID of the scan to export

**How to Test:**
1. First, perform a scan using `POST /scan` and note the `scan_id`
2. Click on `GET /export/pdf/{scan_id}`
3. Click "Try it out"
4. Enter the scan ID (e.g., `1`)
5. Click "Execute"
6. Click "Download file" to save the PDF

**PDF Report Contents:**
- **Title:** AutoComplyAI Security Analysis Report
- **Summary Table:** Verdict, Risk Score, Confidence, Detection Mode
- **MITRE ATT&CK Mapping:** Identified techniques and tactics
- **Compliance Mapping:** ISO 27001, NIST CSF, GDPR controls
- **Recommended Remediation:** Actionable security steps
- **Analyst Guide:** Interpretation instructions

**Use Cases:**
- Executive reporting
- Compliance audits
- Incident documentation
- Customer deliverables
- SOC case files

---

### 10. Export JSON Report

**Endpoint:** `GET /export/json/{scan_id}`

**Purpose:** Generate and download an enhanced PDF report with additional metadata.

**Path Parameter:**
- `scan_id` (integer, required): The ID of the scan to export

**How to Test:**
1. Click on `GET /export/json/{scan_id}`
2. Click "Try it out"
3. Enter a scan ID
4. Click "Execute"
5. Download the generated PDF

**Enhanced PDF Contents:**
- **Report Header:** Project branding and title
- **Metadata Table:** Scan ID, generation date, detection mode
- **Executive Summary:** High-level analysis overview
- **Risk Assessment Summary:** Detailed metrics table
- **MITRE ATT&CK Mapping:** Comprehensive technique list
- **Compliance Mapping:** Multi-framework alignment
- **Recommended Remediation:** Prioritized action items
- **Analyst Interpretation Guide:** Risk score explanation
- **Footer:** Updated By: Deepika Kothamasu

**Difference from `/export/pdf`:**
- More detailed metadata
- Executive summary section
- Enhanced formatting
- Analyst interpretation guide
- Professional branding

---

## 💡 Common Use Cases

### Use Case 1: Real-Time Email Scanning

**Scenario:** Integrate AutoComplyAI into your email gateway for real-time threat detection.

**API Workflow:**
```
1. Email arrives → Extract subject + body
2. POST /scan with text and mode="hybrid"
3. Receive scan_id and risk_score
4. If risk_score >= 70:
   - Quarantine email
   - Alert SOC team
   - GET /export/pdf/{scan_id} for investigation
5. Else:
   - Deliver email
   - Log scan result
```

**Example cURL:**
```bash
curl -X POST "http://localhost:8000/scan" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Suspicious email content here",
    "mode": "hybrid"
  }'
```

---

### Use Case 2: Dashboard Data Population

**Scenario:** Build a real-time security dashboard showing threat metrics.

**API Workflow:**
```
1. On page load:
   - GET /metrics → Display KPI cards
   - GET /threat-feed → Populate live feed
   - GET /mitre-heatmap → Render heatmap
   - GET /risk-trend → Draw trend chart

2. Set up polling (every 3-4 seconds):
   - Refresh /metrics
   - Refresh /threat-feed
   - Update visualizations
```

**Example JavaScript:**
```javascript
// Fetch metrics
const response = await fetch('http://localhost:8000/metrics');
const metrics = await response.json();

// Update KPI cards
document.getElementById('total-scans').textContent = metrics.total_scans;
document.getElementById('high-risk').textContent = metrics.high_risk_scans;
```

---

### Use Case 3: Batch Email Analysis

**Scenario:** Analyze a batch of historical emails for threat hunting.

**API Workflow:**
```
1. Load emails from mailbox
2. For each email:
   - POST /scan with text and mode="ml"
   - Store scan_id and risk_score
3. After all scans:
   - GET /scans to retrieve all results
   - Filter by risk_score >= 70
   - GET /export/pdf/{scan_id} for each high-risk email
4. Generate summary report
```

**Example Python:**
```python
import requests

emails = load_emails_from_mailbox()
high_risk_scans = []

for email in emails:
    response = requests.post('http://localhost:8000/scan', json={
        'text': email['subject'] + ' ' + email['body'],
        'mode': 'ml'
    })
    result = response.json()
    
    if result['report']['risk_score'] >= 70:
        high_risk_scans.append(result['scan_id'])

# Export reports for high-risk emails
for scan_id in high_risk_scans:
    pdf = requests.get(f'http://localhost:8000/export/pdf/{scan_id}')
    with open(f'report_{scan_id}.pdf', 'wb') as f:
        f.write(pdf.content)
```

---

### Use Case 4: Compliance Reporting

**Scenario:** Generate monthly compliance reports for auditors.

**API Workflow:**
```
1. GET /scans → Retrieve all scans for the month
2. Filter scans by date range
3. For each scan:
   - Extract MITRE and compliance mappings
   - Categorize by framework (ISO, NIST, GDPR)
4. Aggregate statistics:
   - Total threats detected
   - Techniques by MITRE tactic
   - Controls by compliance framework
5. GET /export/json/{scan_id} for sample incidents
6. Compile into compliance report
```

---

### Use Case 5: Threat Intelligence Integration

**Scenario:** Feed detected threats into your SIEM or threat intelligence platform.

**API Workflow:**
```
1. Poll GET /threat-feed every 30 seconds
2. For each new scan:
   - Extract IOCs (URLs, domains, IPs)
   - Map to MITRE ATT&CK techniques
   - Enrich with compliance context
3. Push to SIEM:
   - Create security event
   - Tag with MITRE techniques
   - Set priority based on risk_score
4. Update threat intelligence database
```

**Example Integration:**
```python
import requests
import time

last_scan_id = 0

while True:
    # Get latest threats
    response = requests.get('http://localhost:8000/threat-feed')
    threats = response.json()
    
    for threat in threats:
        if threat['id'] > last_scan_id:
            # New threat detected
            if threat['risk_score'] >= 70:
                # Push to SIEM
                push_to_siem({
                    'event_type': 'phishing_detected',
                    'severity': 'high',
                    'risk_score': threat['risk_score'],
                    'mitre_techniques': threat['mitre_mapping']
                })
            
            last_scan_id = threat['id']
    
    time.sleep(30)  # Poll every 30 seconds
```

---

## ⚠️ Error Handling

### Common HTTP Status Codes

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| 200 | Success | Request completed successfully |
| 404 | Not Found | Invalid scan_id in export endpoints |
| 422 | Validation Error | Invalid request body schema |
| 500 | Internal Server Error | Database connection issues, AI model errors |

### Example Error Response

```json
{
  "detail": [
    {
      "loc": ["body", "mode"],
      "msg": "value is not a valid enumeration member",
      "type": "type_error.enum",
      "ctx": {
        "enum_values": ["rule", "ml", "hybrid", "llm_mock", "openai"]
      }
    }
  ]
}
```

### Error Handling Best Practices

1. **Always check HTTP status codes**
   ```python
   response = requests.post('http://localhost:8000/scan', json=data)
   if response.status_code == 200:
       result = response.json()
   else:
       print(f"Error: {response.status_code} - {response.text}")
   ```

2. **Validate request data before sending**
   - Ensure `mode` is one of the valid values
   - Check that `text` is not empty
   - Verify `scan_id` exists before exporting

3. **Implement retry logic for transient errors**
   ```python
   import time
   
   max_retries = 3
   for attempt in range(max_retries):
       try:
           response = requests.post('http://localhost:8000/scan', json=data)
           response.raise_for_status()
           break
       except requests.exceptions.RequestException as e:
           if attempt < max_retries - 1:
               time.sleep(2 ** attempt)  # Exponential backoff
           else:
               raise
   ```

4. **Handle missing scan IDs gracefully**
   ```python
   response = requests.get(f'http://localhost:8000/export/pdf/{scan_id}')
   if response.status_code == 404:
       print(f"Scan {scan_id} not found")
   ```

---

## 🎯 Best Practices

### 1. Choose the Right Detection Mode

| Mode | When to Use | Performance | Cost |
|------|-------------|-------------|------|
| `rule` | Known patterns, high volume | Fastest (<100ms) | Free |
| `ml` | Unknown variants, medium volume | Fast (~500ms) | Free |
| `hybrid` | Critical emails, comprehensive analysis | Moderate (~2s) | API costs |
| `openai` | Sophisticated threats, zero-day | Moderate (~1-2s) | API costs |
| `llm_mock` | Development and testing | Fast (~100ms) | Free |

### 2. Optimize API Performance

- **Batch Processing:** Use `rule` or `ml` mode for bulk scans
- **Caching:** Cache `/metrics` and `/mitre-heatmap` responses (5-minute TTL)
- **Polling Intervals:**
  - `/threat-feed`: 3-5 seconds
  - `/metrics`: 4-5 seconds
  - `/risk-trend`: 30-60 seconds
- **Connection Pooling:** Reuse HTTP connections for multiple requests

### 3. Security Considerations

- **Rate Limiting:** Implement client-side rate limiting to avoid overwhelming the API
- **Authentication:** Add API key authentication for production deployments
- **HTTPS:** Use HTTPS in production (currently HTTP for local development)
- **Input Validation:** Sanitize email content before sending to API
- **Secrets Management:** Store API keys in environment variables, not code

### 4. Monitoring and Logging

- **Log all API calls** with timestamps and response codes
- **Monitor error rates** and set up alerts for 500 errors
- **Track response times** to identify performance degradation
- **Set up health check monitoring** using `/health` endpoint

### 5. Data Management

- **Archive old scans** to prevent database bloat
- **Implement data retention policies** (e.g., 90 days)
- **Export critical scans** to PDF for long-term storage
- **Back up the database** regularly

---

## 🔗 API Integration Examples

### Python (requests)

```python
import requests

# Scan email
response = requests.post('http://localhost:8000/scan', json={
    'text': 'Email content here',
    'mode': 'hybrid'
})
result = response.json()
print(f"Risk Score: {result['report']['risk_score']}")

# Get metrics
metrics = requests.get('http://localhost:8000/metrics').json()
print(f"Total Scans: {metrics['total_scans']}")

# Export PDF
pdf_response = requests.get(f"http://localhost:8000/export/pdf/{result['scan_id']}")
with open('report.pdf', 'wb') as f:
    f.write(pdf_response.content)
```

### JavaScript (fetch)

```javascript
// Scan email
const scanResponse = await fetch('http://localhost:8000/scan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Email content here',
    mode: 'hybrid'
  })
});
const result = await scanResponse.json();
console.log(`Risk Score: ${result.report.risk_score}`);

// Get metrics
const metricsResponse = await fetch('http://localhost:8000/metrics');
const metrics = await metricsResponse.json();
console.log(`Total Scans: ${metrics.total_scans}`);

// Export PDF
const pdfResponse = await fetch(`http://localhost:8000/export/pdf/${result.scan_id}`);
const blob = await pdfResponse.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'report.pdf';
a.click();
```

### cURL

```bash
# Scan email
curl -X POST "http://localhost:8000/scan" \
  -H "Content-Type: application/json" \
  -d '{"text":"Email content","mode":"hybrid"}'

# Get metrics
curl "http://localhost:8000/metrics"

# Export PDF
curl "http://localhost:8000/export/pdf/1" --output report.pdf
```

---

## 📖 Additional Resources

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc (Alternative UI):** http://localhost:8000/redoc
- **OpenAPI JSON:** http://localhost:8000/openapi.json
- **Frontend Dashboard:** http://localhost:5173/
- **Architecture Page:** http://localhost:5173/architecture

---

## 🆘 Troubleshooting

### Issue: "Connection refused" error

**Solution:** Ensure the backend server is running:
```bash
podman-compose up --build
```

### Issue: 422 Validation Error

**Solution:** Check that your request body matches the schema:
- `text` must be a string
- `mode` must be one of: `rule`, `ml`, `hybrid`, `llm_mock`, `openai`

### Issue: 404 Not Found on export

**Solution:** Verify the scan_id exists:
```bash
curl "http://localhost:8000/scans" | grep "\"id\":"
```

### Issue: Slow response times

**Solution:**
- Use `rule` or `ml` mode instead of `hybrid` for faster scans
- Check database performance
- Monitor system resources (CPU, memory)

---

## 📝 Summary

The AutoComplyAI Enterprise API provides a comprehensive set of endpoints for:

✅ **Real-time threat detection** with multiple AI engines  
✅ **Analytics and metrics** for security dashboards  
✅ **MITRE ATT&CK mapping** for threat intelligence  
✅ **Compliance reporting** for audits and governance  
✅ **PDF export** for documentation and deliverables  

**Next Steps:**
1. Explore the Swagger UI at http://localhost:8000/docs
2. Test each endpoint using "Try it out"
3. Integrate the API into your security workflows
4. Build custom dashboards and reports
5. Automate threat detection and response

For questions or support, refer to the main project documentation or contact the development team.

---

**Documented by: Deepika Kothamasu**  
**Version 1.0.0**  
**Last Updated: 2026**