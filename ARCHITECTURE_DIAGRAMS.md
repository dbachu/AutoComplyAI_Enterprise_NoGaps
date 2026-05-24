# AutoComplyAI Enterprise - Architecture Diagrams

This document provides visual representations of the system architecture, including component diagrams and network flow diagrams.

---

## 📋 Table of Contents

1. [High-Level System Architecture](#high-level-system-architecture)
2. [Component Diagram](#component-diagram)
3. [Network Flow Diagram](#network-flow-diagram)
4. [Data Flow Diagram](#data-flow-diagram)
5. [Multi-Agent Orchestration Flow](#multi-agent-orchestration-flow)
6. [Detection Engine Pipeline](#detection-engine-pipeline)
7. [Deployment Architecture](#deployment-architecture)
8. [Database Schema](#database-schema)

---

## 🏗️ High-Level System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        API_Client[API Clients<br/>Python/JavaScript/cURL]
    end

    subgraph "Frontend Layer - Port 5173"
        React[React 18 + Vite]
        Router[React Router]
        Components[UI Components<br/>Dashboard, Scan, Reports, Architecture]
    end

    subgraph "Backend Layer - Port 8000"
        FastAPI[FastAPI Server]
        CORS[CORS Middleware]
        Routers[API Routers<br/>metrics, threat_feed, etc.]
    end

    subgraph "Business Logic Layer"
        Orchestrator[Agent Orchestrator]
        DetectionAgent[Detection Agent]
        ThreatIntelAgent[Threat Intel Agent]
        MitreAgent[MITRE Agent]
        ComplianceAgent[Compliance Agent]
        ReportAgent[Report Agent]
    end

    subgraph "Detection Engines"
        RuleEngine[Rule Engine<br/>Pattern Matching]
        MLEngine[ML Engine<br/>TF-IDF + Classifier]
        LLMEngine[LLM Engine<br/>GPT-4 / Mock]
        HybridEngine[Hybrid Engine<br/>Ensemble Voting]
    end

    subgraph "Data Layer"
        SQLite[(SQLite Database<br/>scans.db)]
        ThreatDB[(Threat Intelligence<br/>IOC Database)]
    end

    subgraph "External Services"
        OpenAI[OpenAI API<br/>GPT-4]
        ThreatFeeds[Threat Feeds<br/>External IOCs]
    end

    Browser --> React
    API_Client --> FastAPI
    React --> Router
    Router --> Components
    Components --> FastAPI
    FastAPI --> CORS
    CORS --> Routers
    Routers --> Orchestrator
    Orchestrator --> DetectionAgent
    Orchestrator --> ThreatIntelAgent
    Orchestrator --> MitreAgent
    Orchestrator --> ComplianceAgent
    Orchestrator --> ReportAgent
    DetectionAgent --> RuleEngine
    DetectionAgent --> MLEngine
    DetectionAgent --> LLMEngine
    DetectionAgent --> HybridEngine
    HybridEngine --> RuleEngine
    HybridEngine --> MLEngine
    HybridEngine --> LLMEngine
    LLMEngine --> OpenAI
    ThreatIntelAgent --> ThreatDB
    ThreatIntelAgent --> ThreatFeeds
    Routers --> SQLite
    ReportAgent --> SQLite

    style Browser fill:#e1f5ff
    style React fill:#61dafb
    style FastAPI fill:#009688
    style Orchestrator fill:#ff9800
    style SQLite fill:#003b57
    style OpenAI fill:#10a37f
```

---

## 🧩 Component Diagram

### Frontend Components

```mermaid
graph TB
    subgraph "Frontend Application - React 18"
        App[App.jsx<br/>Main Application]
        
        subgraph "Routing"
            Router[React Router<br/>BrowserRouter]
        end
        
        subgraph "Pages"
            Dashboard[Dashboard.jsx<br/>Main Analytics View]
            Scan[Scan.jsx<br/>Email Scanning Interface]
            Reports[Reports.jsx<br/>Historical Reports]
            Architecture[Architecture.jsx<br/>System Documentation]
        end
        
        subgraph "Shared Components"
            Navbar[Navbar.jsx<br/>Navigation Bar]
            KPICards[KPICards.jsx<br/>Metrics Display]
            ThreatFeed[ThreatFeed.jsx<br/>Live Threat Stream]
            MitreChart[MitreChart.jsx<br/>ATT&CK Heatmap]
            RiskTrend[RiskTrendChart.jsx<br/>Time Series Chart]
            AgentTimeline[AgentTimeline.jsx<br/>Agent Execution Flow]
            DecisionBreakdown[DecisionBreakdown.jsx<br/>Engine Analysis]
        end
        
        subgraph "State Management"
            LocalState[Component State<br/>useState]
            Effects[Side Effects<br/>useEffect]
            APIClient[Fetch API Client]
        end
        
        subgraph "Styling & Animation"
            TailwindCSS[Tailwind CSS<br/>Utility Classes]
            FramerMotion[Framer Motion<br/>Animations]
        end
    end

    App --> Router
    Router --> Dashboard
    Router --> Scan
    Router --> Reports
    Router --> Architecture
    
    Dashboard --> Navbar
    Dashboard --> KPICards
    Dashboard --> ThreatFeed
    Dashboard --> MitreChart
    Dashboard --> RiskTrend
    
    Scan --> Navbar
    Scan --> AgentTimeline
    Scan --> DecisionBreakdown
    
    Reports --> Navbar
    Architecture --> Navbar
    
    Dashboard --> LocalState
    Dashboard --> Effects
    Effects --> APIClient
    
    KPICards --> TailwindCSS
    ThreatFeed --> FramerMotion
    MitreChart --> TailwindCSS

    style App fill:#61dafb
    style Dashboard fill:#4caf50
    style Scan fill:#ff9800
    style APIClient fill:#2196f3
```

### Backend Components

```mermaid
graph TB
    subgraph "Backend Application - FastAPI"
        Main[main.py<br/>FastAPI App Entry]
        
        subgraph "API Layer"
            HealthEndpoint[/health<br/>Health Check]
            ScanEndpoint[/scan<br/>POST Email Scan]
            ScansEndpoint[/scans<br/>GET All Scans]
            MetricsRouter[/metrics<br/>KPI Metrics]
            ThreatFeedRouter[/threat-feed<br/>Recent Threats]
            MitreRouter[/mitre-heatmap<br/>ATT&CK Data]
            RiskTrendRouter[/risk-trend<br/>Time Series]
            ThreatStatsRouter[/threat-stats<br/>Statistics]
            ExportPDF[/export/pdf/{id}<br/>PDF Report]
            ExportJSON[/export/json/{id}<br/>Enhanced PDF]
        end
        
        subgraph "Service Layer"
            ScanService[scan_service.py<br/>Scan Orchestration]
            ThreatIntelService[threat_intel.py<br/>IOC Enrichment]
        end
        
        subgraph "Agent Layer"
            AgentOrchestrator[agent_orchestrator.py<br/>Multi-Agent Coordinator]
            DetectionAgent[detection_agent.py<br/>Threat Detection]
            ThreatIntelAgent[threat_intel_agent.py<br/>IOC Analysis]
            MitreAgent[mitre_agent.py<br/>ATT&CK Mapping]
            ComplianceAgent[compliance_agent.py<br/>Framework Mapping]
            ReportAgent[report_agent.py<br/>Report Generation]
            OpenAIAgent[openai_agent.py<br/>GPT-4 Integration]
        end
        
        subgraph "Detection Layer"
            DetectionOrchestrator[orchestrator.py<br/>Engine Coordinator]
            RuleEngine[rule_engine.py<br/>Pattern Matching]
            MLEngine[ml_engine.py<br/>ML Classifier]
            HybridEngine[hybrid_engine.py<br/>Ensemble Voting]
            LLMModel[llm_model.py<br/>LLM Interface]
        end
        
        subgraph "Data Layer"
            Database[database.py<br/>SQLAlchemy Session]
            Models[models.py<br/>ORM Models]
            Schemas[schemas.py<br/>Pydantic Schemas]
        end
        
        subgraph "Reporting Layer"
            ReportBuilder[report_builder.py<br/>PDF Generation]
        end
    end

    Main --> HealthEndpoint
    Main --> ScanEndpoint
    Main --> ScansEndpoint
    Main --> MetricsRouter
    Main --> ThreatFeedRouter
    Main --> MitreRouter
    Main --> RiskTrendRouter
    Main --> ThreatStatsRouter
    Main --> ExportPDF
    Main --> ExportJSON
    
    ScanEndpoint --> ScanService
    ScanService --> AgentOrchestrator
    
    AgentOrchestrator --> DetectionAgent
    AgentOrchestrator --> ThreatIntelAgent
    AgentOrchestrator --> MitreAgent
    AgentOrchestrator --> ComplianceAgent
    AgentOrchestrator --> ReportAgent
    
    DetectionAgent --> DetectionOrchestrator
    DetectionOrchestrator --> RuleEngine
    DetectionOrchestrator --> MLEngine
    DetectionOrchestrator --> HybridEngine
    
    HybridEngine --> RuleEngine
    HybridEngine --> MLEngine
    HybridEngine --> LLMModel
    
    OpenAIAgent --> LLMModel
    ThreatIntelAgent --> ThreatIntelService
    
    MetricsRouter --> Database
    ThreatFeedRouter --> Database
    MitreRouter --> Database
    RiskTrendRouter --> Database
    
    ExportPDF --> ReportBuilder
    ExportJSON --> ReportBuilder
    ReportBuilder --> Database
    
    Database --> Models
    ScanService --> Schemas

    style Main fill:#009688
    style AgentOrchestrator fill:#ff9800
    style DetectionOrchestrator fill:#f44336
    style Database fill:#3f51b5
```

---

## 🌐 Network Flow Diagram

### Request/Response Flow

```mermaid
sequenceDiagram
    participant User as User Browser
    participant Frontend as React Frontend<br/>:5173
    participant Backend as FastAPI Backend<br/>:8000
    participant DB as SQLite Database
    participant AI as AI Engines<br/>(Rule/ML/LLM)
    participant External as External APIs<br/>(OpenAI)

    Note over User,External: Email Scan Flow
    
    User->>Frontend: 1. Navigate to /scan
    Frontend->>User: 2. Display scan form
    
    User->>Frontend: 3. Submit email + mode
    Frontend->>Backend: 4. POST /scan<br/>{text, mode}
    
    Backend->>Backend: 5. Validate request
    Backend->>AI: 6. Route to detection engine
    
    alt Mode: rule
        AI->>AI: Pattern matching
    else Mode: ml
        AI->>AI: TF-IDF + Classifier
    else Mode: hybrid
        AI->>AI: Rule + ML + LLM
        AI->>External: Call GPT-4 (if configured)
        External-->>AI: LLM analysis
    else Mode: openai
        AI->>External: Call GPT-4
        External-->>AI: LLM analysis
    end
    
    AI-->>Backend: 7. Detection result
    Backend->>Backend: 8. Enrich with MITRE/Compliance
    Backend->>DB: 9. Save scan result
    DB-->>Backend: 10. Scan ID
    
    Backend-->>Frontend: 11. JSON response<br/>{scan_id, report, timeline}
    Frontend->>Frontend: 12. Render results
    Frontend-->>User: 13. Display verdict + metrics

    Note over User,External: Dashboard Polling Flow
    
    loop Every 4 seconds
        Frontend->>Backend: GET /metrics
        Backend->>DB: Query aggregations
        DB-->>Backend: Metrics data
        Backend-->>Frontend: JSON response
        Frontend->>Frontend: Update KPI cards
    end
    
    loop Every 3 seconds
        Frontend->>Backend: GET /threat-feed
        Backend->>DB: Query recent scans
        DB-->>Backend: Latest 20 scans
        Backend-->>Frontend: JSON response
        Frontend->>Frontend: Update live feed
    end

    Note over User,External: PDF Export Flow
    
    User->>Frontend: 14. Click "Export PDF"
    Frontend->>Backend: 15. GET /export/pdf/{scan_id}
    Backend->>DB: 16. Fetch scan details
    DB-->>Backend: 17. Scan data
    Backend->>Backend: 18. Generate PDF (ReportLab)
    Backend-->>Frontend: 19. PDF file (binary)
    Frontend->>User: 20. Download PDF
```

### Network Communication Ports

```mermaid
graph LR
    subgraph "Client Network"
        Browser[Web Browser<br/>User Machine]
    end
    
    subgraph "Application Network - Docker/Podman"
        Frontend[Frontend Container<br/>Port 5173<br/>Vite Dev Server]
        Backend[Backend Container<br/>Port 8000<br/>FastAPI + Uvicorn]
        Database[SQLite Volume<br/>scans.db]
    end
    
    subgraph "External Network"
        OpenAI[OpenAI API<br/>api.openai.com:443<br/>HTTPS]
        ThreatFeeds[Threat Intel Feeds<br/>Various Providers]
    end

    Browser -->|HTTP :5173| Frontend
    Browser -->|HTTP :8000| Backend
    Frontend -->|HTTP :8000| Backend
    Backend -->|File I/O| Database
    Backend -->|HTTPS :443| OpenAI
    Backend -->|HTTPS :443| ThreatFeeds

    style Browser fill:#e1f5ff
    style Frontend fill:#61dafb
    style Backend fill:#009688
    style Database fill:#003b57
    style OpenAI fill:#10a37f
```

---

## 📊 Data Flow Diagram

### Email Scan Data Flow

```mermaid
flowchart TD
    Start([User Submits Email]) --> Input[Email Text + Mode]
    Input --> Validate{Valid Input?}
    
    Validate -->|No| Error[Return 422 Error]
    Validate -->|Yes| Route{Route by Mode}
    
    Route -->|rule| RuleEngine[Rule Engine<br/>Pattern Matching]
    Route -->|ml| MLEngine[ML Engine<br/>TF-IDF Vectorization]
    Route -->|hybrid| HybridEngine[Hybrid Engine<br/>Ensemble]
    Route -->|openai| OpenAIEngine[OpenAI Engine<br/>GPT-4]
    Route -->|llm_mock| MockEngine[Mock LLM<br/>Simulated]
    
    RuleEngine --> RuleResult[Rule Verdict<br/>+ Confidence]
    MLEngine --> MLResult[ML Verdict<br/>+ Confidence]
    
    HybridEngine --> CallRule[Call Rule Engine]
    HybridEngine --> CallML[Call ML Engine]
    HybridEngine --> CallLLM[Call LLM Engine]
    
    CallRule --> RuleResult
    CallML --> MLResult
    CallLLM --> LLMResult[LLM Verdict<br/>+ Confidence]
    
    RuleResult --> Vote{Weighted Voting}
    MLResult --> Vote
    LLMResult --> Vote
    
    Vote --> FinalVerdict[Final Verdict<br/>+ Risk Score]
    
    OpenAIEngine --> GPT4[GPT-4 API Call]
    GPT4 --> LLMResult
    
    MockEngine --> MockResult[Mock Verdict<br/>+ Confidence]
    MockResult --> FinalVerdict
    
    FinalVerdict --> Enrich[Enrich with Context]
    Enrich --> MITRE[MITRE ATT&CK Mapping]
    Enrich --> Compliance[Compliance Mapping]
    Enrich --> Remediation[Remediation Steps]
    
    MITRE --> BuildReport[Build Report Object]
    Compliance --> BuildReport
    Remediation --> BuildReport
    
    BuildReport --> SaveDB[(Save to Database)]
    SaveDB --> Timeline[Generate Agent Timeline]
    Timeline --> Response[Return JSON Response]
    Response --> End([Display to User])
    
    Error --> End

    style Start fill:#4caf50
    style End fill:#2196f3
    style Vote fill:#ff9800
    style SaveDB fill:#3f51b5
```

### Dashboard Data Aggregation Flow

```mermaid
flowchart TD
    Request[Frontend Requests Metrics] --> Parallel{Parallel API Calls}
    
    Parallel --> Metrics[GET /metrics]
    Parallel --> ThreatFeed[GET /threat-feed]
    Parallel --> MitreHeatmap[GET /mitre-heatmap]
    Parallel --> RiskTrend[GET /risk-trend]
    Parallel --> ThreatStats[GET /threat-stats]
    
    Metrics --> MetricsDB[(Query: COUNT, AVG<br/>Group by mode)]
    ThreatFeed --> FeedDB[(Query: ORDER BY<br/>created_at DESC<br/>LIMIT 20)]
    MitreHeatmap --> MitreDB[(Query: Extract JSON<br/>Count techniques)]
    RiskTrend --> TrendDB[(Query: GROUP BY date<br/>AVG risk_score)]
    ThreatStats --> StatsDB[(Query: COUNT<br/>Group by verdict)]
    
    MetricsDB --> MetricsJSON[Metrics JSON]
    FeedDB --> FeedJSON[Feed JSON]
    MitreDB --> MitreJSON[Heatmap JSON]
    TrendDB --> TrendJSON[Trend JSON]
    StatsDB --> StatsJSON[Stats JSON]
    
    MetricsJSON --> Render[Render Components]
    FeedJSON --> Render
    MitreJSON --> Render
    TrendJSON --> Render
    StatsJSON --> Render
    
    Render --> KPICards[Update KPI Cards]
    Render --> LiveFeed[Update Live Feed]
    Render --> Heatmap[Update Heatmap]
    Render --> Chart[Update Trend Chart]
    Render --> PieChart[Update Pie Charts]
    
    KPICards --> Display[Display Dashboard]
    LiveFeed --> Display
    Heatmap --> Display
    Chart --> Display
    PieChart --> Display
    
    Display --> Poll{Poll Timer<br/>3-4 seconds}
    Poll -->|Repeat| Request

    style Request fill:#61dafb
    style Display fill:#4caf50
    style Poll fill:#ff9800
```

---

## 🤖 Multi-Agent Orchestration Flow

```mermaid
sequenceDiagram
    participant User
    participant API as FastAPI Endpoint
    participant Orch as Agent Orchestrator
    participant Det as Detection Agent
    participant Threat as Threat Intel Agent
    participant Mitre as MITRE Agent
    participant Comp as Compliance Agent
    participant Rep as Report Agent
    participant DB as Database

    User->>API: POST /scan {text, mode}
    API->>Orch: orchestrate_scan(text, mode)
    
    Note over Orch: Initialize agent timeline
    
    Orch->>Det: Step 1: Detect threats
    activate Det
    Det->>Det: Route to engine (rule/ml/hybrid)
    Det->>Det: Execute detection
    Det-->>Orch: verdict, risk_score, confidence
    deactivate Det
    
    Note over Orch: Log: Detection Agent completed
    
    Orch->>Threat: Step 2: Enrich with IOCs
    activate Threat
    Threat->>Threat: Extract indicators (URLs, IPs)
    Threat->>Threat: Query threat intelligence
    Threat-->>Orch: ioc_data, threat_context
    deactivate Threat
    
    Note over Orch: Log: Threat Intel Agent completed
    
    Orch->>Mitre: Step 3: Map to MITRE ATT&CK
    activate Mitre
    Mitre->>Mitre: Analyze tactics & techniques
    Mitre->>Mitre: Map to ATT&CK framework
    Mitre-->>Orch: mitre_techniques[]
    deactivate Mitre
    
    Note over Orch: Log: MITRE Agent completed
    
    Orch->>Comp: Step 4: Map to compliance
    activate Comp
    Comp->>Comp: Map to ISO 27001
    Comp->>Comp: Map to NIST CSF
    Comp->>Comp: Map to GDPR
    Comp-->>Orch: compliance_controls[]
    deactivate Comp
    
    Note over Orch: Log: Compliance Agent completed
    
    Orch->>Rep: Step 5: Generate report
    activate Rep
    Rep->>Rep: Build executive summary
    Rep->>Rep: Generate remediation steps
    Rep->>Rep: Create analyst guide
    Rep-->>Orch: full_report
    deactivate Rep
    
    Note over Orch: Log: Report Agent completed
    
    Orch->>DB: Save scan result
    DB-->>Orch: scan_id
    
    Orch-->>API: Complete response with timeline
    API-->>User: JSON {scan_id, report, timeline}
```

---

## ⚙️ Detection Engine Pipeline

```mermaid
flowchart TD
    Input[Email Text Input] --> Preprocess[Text Preprocessing]
    
    Preprocess --> Clean[Clean & Normalize]
    Clean --> Tokenize[Tokenize]
    Tokenize --> Features[Extract Features]
    
    Features --> RulePath{Rule Engine Path}
    Features --> MLPath{ML Engine Path}
    Features --> LLMPath{LLM Engine Path}
    
    RulePath --> RulePatterns[Pattern Matching]
    RulePatterns --> UrgencyCheck[Check Urgency Keywords]
    RulePatterns --> URLCheck[Check Suspicious URLs]
    RulePatterns --> SenderCheck[Check Sender Patterns]
    
    UrgencyCheck --> RuleScore[Calculate Rule Score]
    URLCheck --> RuleScore
    SenderCheck --> RuleScore
    
    RuleScore --> RuleVerdict[Rule Verdict<br/>Confidence: 0-1]
    
    MLPath --> Vectorize[TF-IDF Vectorization]
    Vectorize --> MLModel[Trained Classifier<br/>Logistic Regression]
    MLModel --> MLPredict[Predict Probability]
    MLPredict --> MLVerdict[ML Verdict<br/>Confidence: 0-1]
    
    LLMPath --> Prompt[Build LLM Prompt]
    Prompt --> LLMCall{LLM Type}
    
    LLMCall -->|OpenAI| GPT4[GPT-4 API]
    LLMCall -->|Mock| MockLLM[Mock Response]
    
    GPT4 --> LLMParse[Parse LLM Response]
    MockLLM --> LLMParse
    LLMParse --> LLMVerdict[LLM Verdict<br/>Confidence: 0-1]
    
    RuleVerdict --> Ensemble{Hybrid Mode?}
    MLVerdict --> Ensemble
    LLMVerdict --> Ensemble
    
    Ensemble -->|Yes| WeightedVote[Weighted Voting<br/>Rule: 30%<br/>ML: 30%<br/>LLM: 40%]
    Ensemble -->|No| SingleEngine[Single Engine Result]
    
    WeightedVote --> FinalDecision[Final Verdict + Risk Score]
    SingleEngine --> FinalDecision
    
    FinalDecision --> Breakdown[Decision Breakdown<br/>Per-Engine Details]
    Breakdown --> Output[Return to Orchestrator]

    style Input fill:#4caf50
    style FinalDecision fill:#ff9800
    style Output fill:#2196f3
    style WeightedVote fill:#9c27b0
```

---

## 🐳 Deployment Architecture

### Container Architecture (Podman/Docker)

```mermaid
graph TB
    subgraph "Host Machine"
        Podman[Podman/Docker Engine]
        
        subgraph "Container Network - autocomplyai_default"
            Frontend[Frontend Container<br/>Node 18 + Vite<br/>Port: 5173<br/>Image: autocomplyai-frontend]
            Backend[Backend Container<br/>Python 3.11 + FastAPI<br/>Port: 8000<br/>Image: autocomplyai-backend]
        end
        
        subgraph "Volumes"
            DBVolume[Database Volume<br/>./backend/scans.db<br/>Persistent Storage]
            BackendCode[Backend Code Volume<br/>./backend/app<br/>Hot Reload]
            FrontendCode[Frontend Code Volume<br/>./frontend/src<br/>Hot Reload]
        end
        
        subgraph "Environment"
            EnvFile[.env File<br/>OPENAI_API_KEY<br/>Configuration]
        end
    end
    
    subgraph "External"
        Browser[Web Browser<br/>localhost:5173]
        APIClient[API Clients<br/>localhost:8000]
    end

    Podman --> Frontend
    Podman --> Backend
    
    Frontend --> FrontendCode
    Backend --> BackendCode
    Backend --> DBVolume
    Backend --> EnvFile
    
    Browser --> Frontend
    APIClient --> Backend
    Frontend -.->|HTTP Proxy| Backend

    style Podman fill:#326ce5
    style Frontend fill:#61dafb
    style Backend fill:#009688
    style DBVolume fill:#3f51b5
```

### Deployment Configuration (podman-compose.yml)

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend/app:/app/app
      - ./backend/scans.db:/app/scans.db
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    networks:
      - autocomplyai_default

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend/src:/app/src
    depends_on:
      - backend
    networks:
      - autocomplyai_default

networks:
  autocomplyai_default:
    driver: bridge
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
    SCAN {
        int id PK "Primary Key"
        text text "Email content"
        string verdict "phishing or legitimate"
        int risk_score "0-100 scale"
        float confidence "0-1 scale"
        string mode "rule, ml, hybrid, etc"
        json mitre_mapping "ATT&CK techniques"
        json compliance_mapping "ISO, NIST, GDPR"
        json remediation "Action items"
        text executive_summary "Report summary"
        json decision_breakdown "Per-engine analysis"
        json agent_timeline "Multi-agent flow"
        datetime created_at "Timestamp"
    }
    
    SCAN ||--o{ METRICS : aggregates
    SCAN ||--o{ THREAT_FEED : displays
    SCAN ||--o{ MITRE_HEATMAP : maps
    SCAN ||--o{ RISK_TREND : trends
    
    METRICS {
        int total_scans "COUNT(*)"
        int high_risk_scans "COUNT WHERE risk_score >= 70"
        float average_risk_score "AVG(risk_score)"
        json scan_modes "COUNT GROUP BY mode"
    }
    
    THREAT_FEED {
        int scan_id FK
        string verdict
        int risk_score
        datetime created_at
    }
    
    MITRE_HEATMAP {
        string technique_id "T1566.002"
        int count "Frequency"
    }
    
    RISK_TREND {
        date date "YYYY-MM-DD"
        float average_risk "AVG(risk_score)"
    }
```

### Database Queries

**Metrics Query:**
```sql
SELECT 
    COUNT(*) as total_scans,
    COUNT(CASE WHEN risk_score >= 70 THEN 1 END) as high_risk_scans,
    AVG(risk_score) as average_risk_score,
    COUNT(CASE WHEN mode = 'rule' THEN 1 END) as rule_scans,
    COUNT(CASE WHEN mode = 'ml' THEN 1 END) as ml_scans,
    COUNT(CASE WHEN mode = 'hybrid' THEN 1 END) as hybrid_scans
FROM scan;
```

**Threat Feed Query:**
```sql
SELECT id, verdict, risk_score, mode, created_at
FROM scan
ORDER BY created_at DESC
LIMIT 20;
```

**Risk Trend Query:**
```sql
SELECT 
    DATE(created_at) as date,
    AVG(risk_score) as average_risk
FROM scan
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 🔄 System Integration Points

```mermaid
graph LR
    subgraph "AutoComplyAI Enterprise"
        System[Core System]
    end
    
    subgraph "Integration Points"
        EmailGateway[Email Gateway<br/>Real-time Scanning]
        SIEM[SIEM Platform<br/>Event Forwarding]
        ThreatIntel[Threat Intel Platform<br/>IOC Enrichment]
        TicketSystem[Ticketing System<br/>Incident Creation]
        Dashboard[Custom Dashboards<br/>Metrics API]
    end
    
    subgraph "External Services"
        OpenAI[OpenAI GPT-4<br/>LLM Analysis]
        ThreatFeeds[Threat Feeds<br/>IOC Updates]
    end

    EmailGateway -->|POST /scan| System
    System -->|Webhook| SIEM
    System -->|API Query| ThreatIntel
    System -->|API Create| TicketSystem
    Dashboard -->|GET /metrics| System
    System -->|HTTPS| OpenAI
    System -->|HTTPS| ThreatFeeds

    style System fill:#009688
    style OpenAI fill:#10a37f
```

---

## 📈 Performance Characteristics

| Component | Response Time | Throughput | Scalability |
|-----------|--------------|------------|-------------|
| Rule Engine | <100ms | 1000+ req/s | Horizontal |
| ML Engine | ~500ms | 100+ req/s | Horizontal |
| Hybrid Engine | ~2s | 50+ req/s | Vertical |
| OpenAI Engine | 1-2s | 10+ req/s | API Limited |
| Database Queries | <50ms | 500+ req/s | Indexed |
| PDF Generation | ~200ms | 50+ req/s | CPU Bound |

---

## 🔐 Security Architecture

```mermaid
graph TB
    subgraph "Security Layers"
        Input[User Input] --> Validation[Input Validation<br/>Pydantic Schemas]
        Validation --> Sanitization[Text Sanitization<br/>XSS Prevention]
        Sanitization --> CORS[CORS Middleware<br/>Origin Control]
        CORS --> RateLimit[Rate Limiting<br/>DDoS Protection]
        RateLimit --> Auth[Authentication<br/>API Keys]
        Auth --> Authorization[Authorization<br/>Role-Based Access]
        Authorization --> Encryption[Data Encryption<br/>At Rest & Transit]
        Encryption --> Audit[Audit Logging<br/>Activity Tracking]
        Audit --> Response[Secure Response]
    end

    style Input fill:#f44336
    style Response fill:#4caf50
    style Auth fill:#ff9800
```

---

## 📝 Summary

This document provides comprehensive visual representations of:

✅ **High-level system architecture** with all layers  
✅ **Component diagrams** for frontend and backend  
✅ **Network flow diagrams** showing request/response patterns  
✅ **Data flow diagrams** for email scanning and dashboard aggregation  
✅ **Multi-agent orchestration** sequence diagrams  
✅ **Detection engine pipeline** with all modes  
✅ **Deployment architecture** using Podman/Docker  
✅ **Database schema** with relationships  
✅ **Integration points** for external systems  
✅ **Security architecture** layers  

**Viewing Diagrams:**
- All diagrams use Mermaid syntax
- View in GitHub, GitLab, or any Mermaid-compatible viewer
- Use VS Code with Mermaid extension for local viewing
- Export to PNG/SVG using Mermaid CLI or online tools

**Related Documentation:**
- [API Walkthrough Guide](./API_WALKTHROUGH_GUIDE.md)
- [Code Walkthrough Demo](./CODE_WALKTHROUGH_DEMO.md)
- [Architecture Page](http://localhost:5173/architecture)

---

**Updated By: Deepika Kothamasu**  
**Version 1.0.0**  
**Last Updated: 2026**