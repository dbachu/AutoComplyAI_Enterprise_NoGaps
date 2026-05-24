# 🔐 AutoComplyAI Enterprise
AI-Driven Phishing Detection & Compliance Intelligence Platform

AutoComplyAI Enterprise is an AI-powered cybersecurity platform designed to detect phishing threats, map them to industry frameworks, and generate executive-ready threat intelligence reports.

The system combines Rule Engines, Machine Learning, Large Language Models, and Agentic AI orchestration to create an explainable and enterprise-grade threat detection platform.

---

# 👩‍💻 Author

**Deepika Kothamasu**  
URN: PES2PGE24DS012  

**Project Guide:**  
Mr. Mahesh Ramegowda

---

# 🧠 Project Overview

Phishing attacks remain one of the most common cyber threats. Traditional detection systems rely on either rules or machine learning, often leading to false positives or missed threats.

AutoComplyAI solves this by introducing a **Hybrid Multi-Agent Detection Architecture** combining:

• Rule-based heuristics  
• Machine learning classification  
• LLM semantic reasoning  
• Threat intelligence indicators  
• Compliance and MITRE ATT&CK mapping  
• Explainable AI reasoning timeline  

The platform provides SOC-style dashboards and automated compliance reporting, making it suitable for enterprise security teams.

---

# 📚 Documentation

Comprehensive documentation is available in the following guides:

### 🏗️ [Architecture Diagrams](ARCHITECTURE_DIAGRAMS.md)
Visual system architecture with 8 detailed Mermaid diagrams covering:
- High-level system architecture
- Component diagrams (frontend/backend)
- Network and data flows
- Multi-agent orchestration
- Detection pipeline
- Deployment architecture
- Database schema

### 🔌 [API Walkthrough Guide](API_WALKTHROUGH_GUIDE.md)
Complete REST API documentation with:
- 10 documented endpoints with request/response examples
- 5 detection modes explained (rule, ml, hybrid, llm_mock, openai)
- Python, JavaScript, and cURL code samples
- Error handling and integration patterns
- Common use cases and workflows

### 💻 [Code Walkthrough Demo](CODE_WALKTHROUGH_DEMO.md)
Step-by-step code explanation covering:
- Agent orchestration flow
- Detection engines implementation
- MITRE ATT&CK mapping
- PDF report generation
- Database models and schemas

### 🚀 [Local Execution Guide](AutoComplyAI_Local_Execution_Guide.md)
Setup and deployment instructions

---

# ⚙️ Technology Stack

| Layer | Technology |
|------|-------------|
| Frontend | React + Vite |
| Backend | FastAPI |
| Database | PostgreSQL |
| AI Models | Scikit-learn + HuggingFace Transformers |
| Visualization | Recharts |
| Deployment | Podman / Docker |
| Reporting | ReportLab |
| Architecture | Multi-Agent AI |

---

# 🚀 Quick Start

## Prerequisites
- Podman or Docker
- Node.js 18+
- Python 3.11+

## Run with Podman
```bash
podman-compose up --build
```

## Run with Docker
```bash
docker-compose up --build
```

## Access the Application

**Frontend Dashboard**  
http://localhost:5173

**Backend API Docs (Swagger)**  
http://localhost:8000/docs

**Backend Health Check**  
http://localhost:8000/health

---

# 🔍 Detection Engines

AutoComplyAI implements multiple detection engines that work together:

## 1. Rule-Based Detection
Detects known phishing patterns:
- Suspicious URLs
- Credential harvesting keywords
- Urgency language

## 2. Machine Learning Detection
Trained classifier with security feature engineering:
- Link detection
- Credential request patterns
- Financial institution references
- Urgency signals

## 3. LLM Semantic Detection
Transformer models for semantic intent analysis to detect sophisticated phishing attempts.

## 4. Hybrid Detection Engine
Combines all three engines for optimal accuracy and reduced false negatives.

---

# 🤖 Multi-Agent AI System

Specialized agents perform different security tasks:

| Agent | Purpose |
|-------|---------|
| **Detection Agent** | Calculates phishing risk score |
| **Threat Intelligence Agent** | Extracts IOCs (URLs, patterns, indicators) |
| **MITRE ATT&CK Agent** | Maps threats to adversary techniques (T1566.002, T1204) |
| **Compliance Agent** | Maps to ISO 27001, NIST CSF, GDPR controls |
| **Report Agent** | Generates executive summaries |

---

# 📊 SOC Dashboard Features

Enterprise-style Security Operations Center dashboard with:

### Key Metrics
- Total scans
- Phishing detection rate
- Average risk score
- Detection confidence

### Interactive Visualizations
- Detection mode distribution
- Phishing vs legitimate analysis
- Risk trend timeline
- MITRE ATT&CK heatmap
- Threat intelligence feed

### Explainable AI
- **Decision Breakdown Chart**: Shows how each engine contributed
- **Agent Reasoning Timeline**: Displays AI agent processing flow

---

# 📑 Intelligence Reports

Each scan generates a structured threat report including:

- Risk Score & Confidence Level
- Detection Mode Used
- Executive Summary
- MITRE ATT&CK Mapping
- Compliance Framework Mapping
- Remediation Guidance

### Export Formats
- PDF (executive-ready)
- JSON (API integration)
- CSV (data analysis)

---

# 🧪 Sample Phishing Test

Try this sample phishing email:

```
Security Alert from Bank of America

We detected unusual activity on your account.

Please verify your credentials immediately:  
http://secure-bank-verification-login.com

Failure to comply within 24 hours will result in account suspension.
```

**Expected Result:**
- Verdict: PHISHING
- Risk Score: High (85-95)
- MITRE Mapping: T1566.002 (Phishing: Link)
- Compliance: ISO 27001 A.16.1.4

---

# 🎯 Key Features

This project demonstrates:

✅ Hybrid AI phishing detection  
✅ Explainable AI decision analysis  
✅ Automated compliance mapping  
✅ SOC-style threat intelligence dashboards  
✅ Agentic AI orchestration architecture  
✅ Real-time threat visualization  
✅ Executive-ready PDF reports  

---

# 🔗 Related Resources

- **Phase-1 Code**: [AutoComplyAI](https://github.com/dbachu/AutoComplyAI)
- **Base Paper Code**: [Google Colab Notebook](https://colab.research.google.com/drive/10ZiniYdbKYgwC-Mh2uYUPmSB7H8PtUfA)

---

# 🚀 Future Enhancements

- Real-time threat feeds integration
- Domain reputation scoring
- Email header analysis
- Graph-based attack visualization
- SIEM platform integration
- Advanced ML model fine-tuning

---

# 📜 License

Educational / Academic Project

---

# 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

---

**Built with ❤️ for Enterprise Cybersecurity**
