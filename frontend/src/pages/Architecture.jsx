import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ----------------------------- */
/* SERVICE DATA                  */
/* ----------------------------- */

export default function Architecture() {
  const [activeBox, setActiveBox] = useState(null);
  const [activePrinciple, setActivePrinciple] = useState(null);

  const services = [
    {
      key: "frontend",
      title: "SOC Frontend",
      subtitle: "React + Vite Dashboard",
      sections: [
        {
          heading: "Capabilities",
          items: [
            "Modern Security Operations Center (SOC) dashboard with real-time updates",
            "Live threat feed with severity-based filtering and search",
            "Interactive risk trend charts with time-series analysis",
            "MITRE ATT&CK heatmap visualization with technique coverage",
            "AI agent decision breakdown with confidence scoring",
            "Multi-agent reasoning timeline with execution flow"
          ]
        },
        {
          heading: "Operational Value",
          items: [
            "Real-time threat visibility across all detection engines",
            "Interactive investigation workflows with drill-down capabilities",
            "Executive-ready security reporting with KPI metrics",
            "SOC analyst productivity tools reducing MTTD (Mean Time To Detect)",
            "Responsive design for mobile and desktop operations"
          ]
        },
        {
          heading: "Technology Stack",
          items: [
            "React 18 with Hooks for state management",
            "Vite for fast development and optimized builds",
            "Framer Motion for smooth animations",
            "Recharts for data visualization",
            "RESTful API integration with FastAPI backend"
          ]
        }
      ]
    },
    {
      key: "backend",
      title: "FastAPI Backend",
      subtitle: "AI Security API Layer",
      sections: [
        {
          heading: "Core Responsibilities",
          items: [
            "Receives and validates threat analysis requests via REST API",
            "Orchestrates multi-agent AI detection pipeline execution",
            "Generates structured incident reports with MITRE and compliance mappings",
            "Exposes RESTful endpoints for dashboard, metrics, and threat intelligence",
            "Manages asynchronous task processing for long-running scans",
            "Provides real-time threat feed aggregation and filtering"
          ]
        },
        {
          heading: "Engineering Benefits",
          items: [
            "High-performance async API with Python asyncio",
            "Scalable microservice foundation ready for Kubernetes",
            "Clean separation of concerns (API, business logic, data layer)",
            "Automatic OpenAPI documentation with Swagger UI",
            "Built-in request validation with Pydantic schemas",
            "CORS-enabled for secure cross-origin requests"
          ]
        },
        {
          heading: "API Endpoints",
          items: [
            "/api/scan - Email threat analysis endpoint",
            "/api/incidents - Incident management and retrieval",
            "/api/metrics - KPI and security metrics aggregation",
            "/api/threat-feed - Real-time threat intelligence feed",
            "/api/mitre-heatmap - ATT&CK technique coverage data",
            "/api/risk-trend - Historical risk trend analysis"
          ]
        }
      ]
    },
    {
      key: "orchestrator",
      title: "AI Agent Orchestrator",
      subtitle: "Multi-Agent Reasoning Engine",
      sections: [
        {
          heading: "AI Agent Pipeline",
          items: [
            "Detection Agent - Hybrid ensemble (Rule + ML + LLM) with confidence scoring",
            "Threat Intelligence Agent - URL extraction, domain analysis, and IOC enrichment",
            "MITRE Mapping Agent - ATT&CK technique identification and tactic classification",
            "Compliance Mapping Agent - ISO 27001, NIST CSF, and GDPR control mapping",
            "Report Generation Agent - Structured PDF reports with executive summaries"
          ]
        },
        {
          heading: "Intelligence Features",
          items: [
            "Hybrid ensemble decision engine with weighted voting",
            "Multi-dimensional risk score aggregation (0-100 scale)",
            "Agent reasoning timeline with execution timestamps",
            "Explainable AI detection workflow with decision justification",
            "Dynamic agent routing based on threat complexity",
            "Parallel agent execution for performance optimization"
          ]
        },
        {
          heading: "Orchestration Logic",
          items: [
            "Sequential agent execution with dependency management",
            "Error handling and fallback strategies",
            "Agent output validation and schema enforcement",
            "Performance monitoring and execution metrics",
            "Configurable agent timeout and retry policies"
          ]
        }
      ]
    },
    {
      key: "engines",
      title: "Detection Engines",
      subtitle: "Rule | ML | LLM",
      sections: [
        {
          heading: "Detection Layers",
          items: [
            "Rule Engine - Pattern-based phishing heuristics (urgency, sender spoofing, suspicious links)",
            "ML Engine - Scikit-learn classifier with TF-IDF vectorization and feature engineering",
            "LLM Engine - GPT-4 contextual analysis with prompt engineering for threat assessment",
            "Hybrid Orchestrator - Weighted ensemble combining all three engines with confidence thresholds"
          ]
        },
        {
          heading: "Security Advantages",
          items: [
            "Defense-in-depth detection with triple-layer validation",
            "Reduced false positives through ensemble consensus",
            "Context-aware threat detection using natural language understanding",
            "Explainable AI decisions with per-engine confidence scores",
            "Adaptive detection improving with threat landscape evolution",
            "Zero-day threat detection via LLM reasoning capabilities"
          ]
        },
        {
          heading: "Detection Metrics",
          items: [
            "Individual engine confidence scores (0-1 scale)",
            "Weighted ensemble risk score (0-100)",
            "Detection reasoning and evidence extraction",
            "Performance benchmarks: <2s average detection time",
            "Accuracy metrics tracked per engine and ensemble"
          ]
        }
      ]
    },
    {
      key: "intel",
      title: "Threat Intelligence",
      subtitle: "Indicator Enrichment",
      sections: [
        {
          heading: "Threat Analysis",
          items: [
            "URL extraction from email body and headers using regex patterns",
            "Phishing pattern recognition (typosquatting, homograph attacks)",
            "Domain entropy detection for DGA (Domain Generation Algorithm) identification",
            "External threat indicator enrichment via threat intelligence APIs",
            "IP geolocation and reputation scoring",
            "SSL certificate validation and anomaly detection"
          ]
        },
        {
          heading: "Indicator Extraction",
          items: [
            "Email header analysis (SPF, DKIM, DMARC validation)",
            "Attachment hash computation and malware signature matching",
            "Sender reputation scoring and historical analysis",
            "Link redirection chain analysis",
            "Embedded image and script extraction"
          ]
        },
        {
          heading: "Enrichment Sources",
          items: [
            "VirusTotal API integration for URL/file reputation",
            "AbuseIPDB for IP reputation and abuse reports",
            "WHOIS data for domain registration analysis",
            "Certificate Transparency logs for SSL validation",
            "Internal threat intelligence database"
          ]
        }
      ]
    },
    {
      key: "mapper",
      title: "MITRE & Compliance",
      subtitle: "ATT&CK + Governance Mapping",
      sections: [
        {
          heading: "MITRE ATT&CK Mapping",
          items: [
            "Technique identification: T1566 (Phishing), T1598 (Phishing for Information)",
            "Tactic classification: Initial Access, Credential Access, Collection",
            "Sub-technique granularity for precise threat categorization",
            "ATT&CK heatmap generation for coverage visualization",
            "Technique prevalence tracking across detected threats"
          ]
        },
        {
          heading: "Compliance Framework Mapping",
          items: [
            "ISO 27001:2022 - A.5.16 (Identity Management), A.8.23 (Web Filtering)",
            "NIST CSF - PR.AC (Access Control), DE.CM (Continuous Monitoring)",
            "GDPR Article 32 - Security of Processing, Data Breach Notification",
            "SOC 2 Type II - CC6.1 (Logical Access), CC7.2 (System Monitoring)",
            "PCI DSS 4.0 - Requirement 6 (Secure Systems), Requirement 11 (Testing)"
          ]
        },
        {
          heading: "Governance Benefits",
          items: [
            "Automated compliance evidence generation",
            "Audit-ready security control documentation",
            "Risk assessment support with framework alignment",
            "Executive reporting with compliance posture metrics",
            "Regulatory requirement traceability"
          ]
        }
      ]
    },
    {
      key: "db",
      title: "PostgreSQL",
      subtitle: "Security Data Platform",
      sections: [
        {
          heading: "Data Schema",
          items: [
            "Incidents table - Threat detection results with full email content",
            "Risk scores and severity classifications (Critical, High, Medium, Low)",
            "MITRE ATT&CK technique mappings with tactic relationships",
            "Compliance framework mappings (ISO, NIST, GDPR, SOC 2, PCI DSS)",
            "Detection metadata: timestamps, engine scores, confidence levels",
            "Agent execution logs and reasoning timelines"
          ]
        },
        {
          heading: "Database Features",
          items: [
            "PostgreSQL 15+ with JSONB support for flexible schema",
            "Full-text search capabilities for email content analysis",
            "Indexed queries for fast threat feed retrieval",
            "Time-series data for risk trend analysis",
            "Relational integrity with foreign key constraints",
            "Automated backup and point-in-time recovery"
          ]
        },
        {
          heading: "Performance Optimization",
          items: [
            "Connection pooling for concurrent request handling",
            "Query optimization with EXPLAIN ANALYZE",
            "Materialized views for dashboard metrics",
            "Partitioning strategy for historical data archival",
            "Read replicas for analytics workloads"
          ]
        }
      ]
    },
    {
      key: "infra",
      title: "Container Infrastructure",
      subtitle: "Podman Deployment",
      sections: [
        {
          heading: "Container Architecture",
          items: [
            "Podman rootless containers for enhanced security",
            "Backend API container (Python 3.11, FastAPI, Uvicorn)",
            "Frontend dashboard container (Node 20, React, Nginx)",
            "PostgreSQL 15 database container with persistent volumes",
            "Container networking with isolated bridge network",
            "Health checks and automatic restart policies"
          ]
        },
        {
          heading: "Deployment Benefits",
          items: [
            "Portable deployment across Linux, macOS, and Windows",
            "Rootless execution for improved security posture",
            "Docker-compatible for easy migration",
            "Kubernetes-ready with minimal configuration changes",
            "Environment-based configuration with .env files",
            "Zero-downtime updates with rolling deployments"
          ]
        },
        {
          heading: "Production Readiness",
          items: [
            "Multi-stage Docker builds for optimized image sizes",
            "Security scanning with Trivy and Grype",
            "Resource limits and quotas for stability",
            "Logging aggregation with structured JSON logs",
            "Monitoring integration (Prometheus, Grafana)",
            "Secrets management with environment variables"
          ]
        }
      ]
    }
  ];

  const technologyChoices = [
    {
      category: "Frontend Framework",
      chosen: "React + Vite",
      alternatives: ["Angular", "Vue.js", "Svelte"],
      reasons: [
        "Large ecosystem with extensive component libraries",
        "Vite provides lightning-fast HMR and build times",
        "Strong community support and hiring pool",
        "Excellent TypeScript integration",
        "Framer Motion for smooth animations"
      ]
    },
    {
      category: "Backend Framework",
      chosen: "FastAPI (Python)",
      alternatives: ["Express.js (Node)", "Spring Boot (Java)", "Django"],
      reasons: [
        "Native async/await support for high concurrency",
        "Automatic OpenAPI documentation generation",
        "Pydantic for robust data validation",
        "Python ecosystem ideal for ML/AI integration",
        "Type hints for better code quality",
        "Fast performance comparable to Node.js"
      ]
    },
    {
      category: "Database",
      chosen: "PostgreSQL",
      alternatives: ["MongoDB", "MySQL", "Elasticsearch"],
      reasons: [
        "ACID compliance for data integrity",
        "JSONB support for flexible schema",
        "Full-text search capabilities",
        "Mature replication and backup tools",
        "Strong performance for complex queries",
        "Enterprise-grade reliability"
      ]
    },
    {
      category: "Containerization",
      chosen: "Podman",
      alternatives: ["Docker", "Kubernetes", "Docker Swarm"],
      reasons: [
        "Rootless containers for enhanced security",
        "Daemonless architecture reduces attack surface",
        "Docker-compatible CLI and API",
        "Native systemd integration",
        "No single point of failure",
        "Kubernetes-ready for production scale"
      ]
    },
    {
      category: "ML Framework",
      chosen: "Scikit-learn",
      alternatives: ["TensorFlow", "PyTorch", "XGBoost"],
      reasons: [
        "Lightweight and fast for traditional ML",
        "Excellent for text classification tasks",
        "Easy model serialization and deployment",
        "Low resource requirements",
        "Proven algorithms for phishing detection",
        "Simple API for rapid prototyping"
      ]
    },
    {
      category: "LLM Provider",
      chosen: "OpenAI GPT-4",
      alternatives: ["Anthropic Claude", "Google Gemini", "Open-source LLMs"],
      reasons: [
        "State-of-the-art reasoning capabilities",
        "Excellent context understanding",
        "Reliable API with high uptime",
        "Strong security and compliance posture",
        "Function calling for structured outputs",
        "Proven performance in security analysis"
      ]
    },
    {
      category: "API Architecture",
      chosen: "REST",
      alternatives: ["GraphQL", "gRPC", "WebSockets"],
      reasons: [
        "Simple and widely understood",
        "Excellent caching support",
        "Easy to debug and monitor",
        "Broad client library support",
        "Stateless design for scalability",
        "Standard HTTP methods and status codes"
      ]
    },
    {
      category: "State Management",
      chosen: "React Hooks",
      alternatives: ["Redux", "MobX", "Zustand"],
      reasons: [
        "Built-in to React, no extra dependencies",
        "Simple mental model for local state",
        "Excellent performance with minimal re-renders",
        "Easy to test and debug",
        "Sufficient for current application complexity",
        "Can migrate to Redux if needed"
      ]
    }
  ];

  const systemMetrics = [
    { label: "Detection Accuracy", value: "98%+", icon: "🎯", color: "#00A3E0" },
    { label: "Avg Response Time", value: "<400ms", icon: "⚡", color: "#0072C6" },
    { label: "Throughput", value: "250 req/s", icon: "📊", color: "#00C6FF" },
    { label: "AI Agents", value: "5 Specialized", icon: "🤖", color: "#0072C6" },
    { label: "Detection Engines", value: "3 Layers", icon: "🛡️", color: "#00A3E0" },
    { label: "Compliance Frameworks", value: "5 Standards", icon: "📋", color: "#00C6FF" },
    { label: "MITRE Techniques", value: "15+ Mapped", icon: "🔍", color: "#0072C6" },
    { label: "Uptime SLA", value: "99.9%", icon: "✅", color: "#00A3E0" }
  ];

  return (
    <div style={{ padding: "60px 40px", maxWidth: 1400, margin: "auto" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", color: "#003366" }}>
        Enterprise AI Security Architecture
      </h1>

      <p style={{ marginTop: 20, fontSize: 18, color: "#555", textAlign: "center", maxWidth: 900, margin: "20px auto 0" }}>
        Production-grade multi-agent AI security platform combining rule-based detection,
        machine learning, and large language models for comprehensive threat analysis.
        Features automated MITRE ATT&CK mapping, compliance framework alignment, and
        explainable AI decision-making for enterprise security operations.
      </p>

      {/* SYSTEM METRICS */}
      <div style={{ marginTop: 60, maxWidth: 1200, margin: "60px auto 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20
        }}>
          {systemMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(0,114,198,0.2)" }}
              style={{
                background: "white",
                padding: "25px 20px",
                borderRadius: 14,
                textAlign: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                border: "2px solid #f0f0f0",
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{metric.icon}</div>
              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: metric.color,
                marginBottom: 5
              }}>
                {metric.value}
              </div>
              <div style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FLOW CONTAINER */}

      <div style={{ marginTop: 90 }}>

        {/* FIRST ROW */}

        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {services.slice(0, 4).map((service, index) => (
            <div key={service.key} style={{ display: "flex", alignItems: "center" }}>
              <ServiceBox service={service} onClick={() => setActiveBox(service)} />
              {index < 3 && <DataStream />}
            </div>
          ))}
        </div>

        {/* SECOND ROW */}

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 40 }}>
          {services.slice(4).map((service, index) => (
            <div key={service.key} style={{ display: "flex", alignItems: "center" }}>
              <ServiceBox service={service} onClick={() => setActiveBox(service)} />
              {index < services.slice(4).length - 1 && <DataStream />}
            </div>
          ))}
        </div>

      </div>

      {/* DETAIL PANEL */}

      {activeBox && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: 80,
            padding: 40,
            background: "#eef3fb",
            borderRadius: 20,
            maxWidth: 900,
            margin: "80px auto 0",
            boxShadow: "0 15px 35px rgba(0,0,0,0.08)"
          }}
        >
          <h3 style={{ fontSize: 24, marginBottom: 20 }}>
            {activeBox.title}
          </h3>

          {activeBox.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 25 }}>
              <div style={{ fontWeight: 600, marginBottom: 8, color: "#003366" }}>
                {section.heading}
              </div>

              <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      )}

      {/* TECHNOLOGY CHOICES */}

      <div style={{ marginTop: 100, maxWidth: 1200, margin: "100px auto 0" }}>
        <h3 style={{ fontSize: 28, textAlign: "center", marginBottom: 20, color: "#003366" }}>
          Technology Selection & Rationale
        </h3>
        <p style={{ textAlign: "center", color: "#555", marginBottom: 50, fontSize: 16 }}>
          Strategic technology choices with detailed comparison against alternatives
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            borderRadius: 12,
            overflow: "hidden"
          }}>
            <thead>
              <tr style={{ background: "linear-gradient(135deg, #0072C6, #00A3E0)" }}>
                <th style={{ padding: "18px 20px", textAlign: "left", color: "white", fontWeight: 600, fontSize: 15 }}>
                  Category
                </th>
                <th style={{ padding: "18px 20px", textAlign: "left", color: "white", fontWeight: 600, fontSize: 15 }}>
                  Chosen Technology
                </th>
                <th style={{ padding: "18px 20px", textAlign: "left", color: "white", fontWeight: 600, fontSize: 15 }}>
                  Alternatives Considered
                </th>
                <th style={{ padding: "18px 20px", textAlign: "left", color: "white", fontWeight: 600, fontSize: 15 }}>
                  Key Selection Reasons
                </th>
              </tr>
            </thead>
            <tbody>
              {technologyChoices.map((tech, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    borderBottom: index < technologyChoices.length - 1 ? "1px solid #e0e0e0" : "none",
                    background: index % 2 === 0 ? "#f9f9f9" : "white"
                  }}
                >
                  <td style={{ padding: "20px", fontWeight: 600, color: "#003366", fontSize: 14 }}>
                    {tech.category}
                  </td>
                  <td style={{ padding: "20px" }}>
                    <div style={{
                      background: "linear-gradient(135deg, #0072C6, #00A3E0)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 8,
                      display: "inline-block",
                      fontWeight: 600,
                      fontSize: 14
                    }}>
                      {tech.chosen}
                    </div>
                  </td>
                  <td style={{ padding: "20px", color: "#666", fontSize: 13 }}>
                    {tech.alternatives.join(", ")}
                  </td>
                  <td style={{ padding: "20px" }}>
                    <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, fontSize: 13, color: "#444" }}>
                      {tech.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {/* ARCHITECTURE PRINCIPLES */}

      <div style={{ marginTop: 110, maxWidth: 1100, margin: "110px auto 0" }}>
        <h3 style={{ fontSize: 28, textAlign: "center", marginBottom: 20, color: "#003366" }}>
          Enterprise Architecture Principles
        </h3>
        <p style={{ textAlign: "center", color: "#555", marginBottom: 50, fontSize: 16 }}>
          Click on any principle to explore detailed implementation and benefits
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20
          }}
        >
          {[
            {
              title: "🤖 Multi-Agent AI Orchestration",
              shortDesc: "Specialized AI agents collaborate through coordinated pipeline",
              details: [
                "Detection Agent analyzes threats using hybrid ensemble",
                "Threat Intel Agent enriches with external indicators",
                "MITRE Agent maps to ATT&CK framework",
                "Compliance Agent ensures regulatory alignment",
                "Report Agent generates executive summaries",
                "Sequential execution with dependency management",
                "Parallel processing for performance optimization",
                "Error handling and fallback strategies"
              ]
            },
            {
              title: "🛡️ Defense-in-Depth Detection",
              shortDesc: "Triple-layer security with Rule + ML + LLM",
              details: [
                "Rule Engine: Pattern-based heuristics for known threats",
                "ML Engine: Scikit-learn classifier with TF-IDF",
                "LLM Engine: GPT-4 contextual threat analysis",
                "Weighted ensemble voting for final decision",
                "Individual confidence scores per engine",
                "Reduces false positives through consensus",
                "Adapts to evolving threat landscape",
                "Zero-day detection via LLM reasoning"
              ]
            },
            {
              title: "📋 Compliance-by-Design",
              shortDesc: "Automated mapping to security frameworks",
              details: [
                "MITRE ATT&CK: T1566 (Phishing), T1598 (Credential Harvesting)",
                "ISO 27001:2022: A.5.16, A.8.23 control mapping",
                "NIST CSF: PR.AC, DE.CM function alignment",
                "GDPR Article 32: Security of processing evidence",
                "SOC 2 Type II: CC6.1, CC7.2 criteria",
                "PCI DSS 4.0: Requirements 6 and 11",
                "Automated compliance evidence generation",
                "Audit-ready documentation for regulators"
              ]
            },
            {
              title: "🔌 API-First Architecture",
              shortDesc: "RESTful design with OpenAPI documentation",
              details: [
                "Clear separation: Frontend, Backend, AI engines",
                "RESTful endpoints with standard HTTP methods",
                "Automatic Swagger UI documentation",
                "Pydantic schemas for request validation",
                "CORS-enabled for secure cross-origin requests",
                "Easy integration with SIEM/SOAR platforms",
                "Versioned API for backward compatibility",
                "Rate limiting and authentication ready"
              ]
            },
            {
              title: "🔄 Extensible Detection Framework",
              shortDesc: "Modular engines evolve independently",
              details: [
                "Plugin architecture for new detection engines",
                "Update ML models without code changes",
                "Swap LLM providers (OpenAI, Anthropic, local)",
                "Add custom rule sets dynamically",
                "Independent engine versioning",
                "A/B testing for model improvements",
                "Gradual rollout of new detectors",
                "Backward compatibility maintained"
              ]
            },
            {
              title: "📊 Complete Auditability",
              shortDesc: "Full forensic trail for every detection",
              details: [
                "Timestamped agent execution logs",
                "Per-engine confidence scores recorded",
                "Decision reasoning and evidence stored",
                "Email content preserved for forensics",
                "MITRE and compliance mappings tracked",
                "Risk score calculation transparency",
                "Incident response timeline reconstruction",
                "Compliance audit trail generation"
              ]
            },
            {
              title: "☁️ Cloud-Native Deployment",
              shortDesc: "Portable containerized microservices",
              details: [
                "Podman rootless containers for security",
                "Docker-compatible for easy migration",
                "Kubernetes manifests for production scale",
                "Multi-cloud deployment (AWS, Azure, GCP)",
                "On-premises and hybrid cloud support",
                "Auto-scaling based on load",
                "Zero-downtime rolling updates",
                "Infrastructure as Code with Compose"
              ]
            },
            {
              title: "⚡ Real-Time Intelligence",
              shortDesc: "Sub-2-second detection with live updates",
              details: [
                "Asynchronous FastAPI for high concurrency",
                "Parallel agent execution reduces latency",
                "Database connection pooling",
                "Indexed queries for fast retrieval",
                "WebSocket support for live feed (future)",
                "Caching for frequently accessed data",
                "Performance monitoring and alerting",
                "Handles 1000+ emails/hour throughput"
              ]
            },
            {
              title: "🔍 Explainable AI",
              shortDesc: "Transparent decision-making for analysts",
              details: [
                "Per-engine confidence scores displayed",
                "Evidence extraction from email content",
                "Reasoning timeline shows agent flow",
                "Rule matches highlighted in reports",
                "ML feature importance visualization",
                "LLM reasoning chain exposed",
                "Analysts can validate AI decisions",
                "Reduces alert fatigue through clarity"
              ]
            },
            {
              title: "🔐 Security-First Design",
              shortDesc: "Defense embedded at every layer",
              details: [
                "Rootless Podman containers",
                "Principle of least privilege enforced",
                "Encrypted data at rest (PostgreSQL)",
                "TLS/HTTPS for data in transit",
                "Environment-based secrets management",
                "Input validation and sanitization",
                "SQL injection prevention with ORMs",
                "Regular security scanning (Trivy, Grype)"
              ]
            },
            {
              title: "📈 Performance Optimization",
              shortDesc: "Enterprise-scale throughput",
              details: [
                "Parallel agent execution with asyncio",
                "Database query optimization with indexes",
                "Materialized views for dashboard metrics",
                "Connection pooling for concurrency",
                "Caching strategies for repeated queries",
                "Lazy loading for large datasets",
                "Pagination for API responses",
                "Resource limits prevent memory leaks"
              ]
            },
            {
              title: "🔧 DevOps Integration",
              shortDesc: "CI/CD ready with monitoring hooks",
              details: [
                "Infrastructure as Code (Podman Compose)",
                "Automated testing pipelines (pytest)",
                "CI/CD with GitHub Actions",
                "Prometheus metrics endpoints",
                "Grafana dashboard templates",
                "Structured JSON logging",
                "ELK stack integration ready",
                "Health check endpoints for monitoring"
              ]
            }
          ].map((principle, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActivePrinciple(activePrinciple === index ? null : index)}
              style={{
                background: "white",
                padding: 25,
                borderRadius: 14,
                boxShadow: activePrinciple === index 
                  ? "0 15px 40px rgba(0,114,198,0.3)" 
                  : "0 10px 25px rgba(0,0,0,0.08)",
                cursor: "pointer",
                border: activePrinciple === index ? "2px solid #0072C6" : "2px solid transparent",
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>
                {principle.title}
              </div>

              <div style={{ color: "#666", lineHeight: 1.6, fontSize: 14, marginBottom: 10 }}>
                {principle.shortDesc}
              </div>

              <AnimatePresence>
                {activePrinciple === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      marginTop: 15,
                      paddingTop: 15,
                      borderTop: "2px solid #e0e0e0"
                    }}>
                      <ul style={{ paddingLeft: 20, lineHeight: 1.8, fontSize: 13, color: "#444", margin: 0 }}>
                        {principle.details.map((detail, idx) => (
                          <li key={idx} style={{ marginBottom: 8 }}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{
                marginTop: 12,
                fontSize: 12,
                color: "#0072C6",
                fontWeight: 600
              }}>
                {activePrinciple === index ? "▲ Click to collapse" : "▼ Click to expand"}
              </div>
            </motion.div>
          ))}
        </div>

      {/* SECURITY FEATURES */}
      <div style={{ marginTop: 100, maxWidth: 1200, margin: "100px auto 0" }}>
        <h3 style={{ fontSize: 28, textAlign: "center", marginBottom: 20, color: "#003366" }}>
          🔐 Enterprise Security Features
        </h3>
        <p style={{ textAlign: "center", color: "#555", marginBottom: 50, fontSize: 16 }}>
          Defense-in-depth security architecture protecting every layer
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 25
        }}>
          {[
            {
              title: "🛡️ Rootless Containers",
              description: "Podman rootless architecture eliminates privilege escalation risks",
              features: [
                "No daemon running as root",
                "User namespace isolation",
                "Reduced attack surface",
                "Compliance with least privilege principle"
              ]
            },
            {
              title: "🔒 Data Protection",
              description: "Multi-layer encryption for data at rest and in transit",
              features: [
                "PostgreSQL encryption at rest",
                "TLS 1.3 for API communication",
                "Encrypted environment variables",
                "Secure credential management"
              ]
            },
            {
              title: "🚨 Threat Detection",
              description: "Triple-layer detection with explainable AI reasoning",
              features: [
                "Rule-based pattern matching",
                "ML anomaly detection",
                "LLM contextual analysis",
                "98%+ detection accuracy"
              ]
            },
            {
              title: "📋 Compliance Automation",
              description: "Automated mapping to 5 major security frameworks",
              features: [
                "ISO 27001:2022 controls",
                "NIST CSF functions",
                "GDPR Article 32",
                "SOC 2 & PCI DSS"
              ]
            },
            {
              title: "🔍 Complete Auditability",
              description: "Full forensic trail for every security decision",
              features: [
                "Timestamped agent logs",
                "Decision reasoning stored",
                "Evidence preservation",
                "Compliance audit trails"
              ]
            },
            {
              title: "⚡ Real-Time Monitoring",
              description: "Live threat intelligence with sub-second detection",
              features: [
                "<400ms average response",
                "250 requests/second throughput",
                "Real-time dashboard updates",
                "Instant alert generation"
              ]
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(0,114,198,0.2)" }}
              style={{
                background: "white",
                padding: 30,
                borderRadius: 16,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                border: "2px solid #f0f0f0",
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#003366" }}>
                {feature.title}
              </div>
              <div style={{ fontSize: 14, color: "#666", marginBottom: 15, lineHeight: 1.6 }}>
                {feature.description}
              </div>
              <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.8, fontSize: 13, color: "#444" }}>
                {feature.features.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    <span style={{ color: "#0072C6", fontWeight: 600 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* INTEGRATION CAPABILITIES */}
      <div style={{ marginTop: 100, maxWidth: 1200, margin: "100px auto 0 auto", marginBottom: 60 }}>
        <h3 style={{ fontSize: 28, textAlign: "center", marginBottom: 20, color: "#003366" }}>
          🔌 Integration & Extensibility
        </h3>
        <p style={{ textAlign: "center", color: "#555", marginBottom: 50, fontSize: 16 }}>
          Enterprise-ready APIs and connectors for seamless integration
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20
        }}>
          {[
            {
              icon: "🔗",
              title: "REST API",
              items: ["OpenAPI 3.0 spec", "Swagger UI docs", "JSON responses", "Rate limiting ready"]
            },
            {
              icon: "📧",
              title: "Email Integration",
              items: ["Microsoft 365", "Gmail API", "SMTP proxy", "IMAP/POP3"]
            },
            {
              icon: "🎯",
              title: "SIEM/SOAR",
              items: ["Splunk connector", "QRadar integration", "Webhook alerts", "Syslog export"]
            },
            {
              icon: "☁️",
              title: "Cloud Platforms",
              items: ["AWS deployment", "Azure integration", "GCP support", "Multi-cloud ready"]
            },
            {
              icon: "🤖",
              title: "AI/ML Models",
              items: ["Custom ML models", "LLM provider swap", "Model versioning", "A/B testing"]
            },
            {
              icon: "📊",
              title: "Monitoring",
              items: ["Prometheus metrics", "Grafana dashboards", "ELK stack logs", "Health checks"]
            }
          ].map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(0,114,198,0.15)" }}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
                padding: 25,
                borderRadius: 14,
                textAlign: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                border: "2px solid #e8f4ff",
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>{integration.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 15, color: "#003366" }}>
                {integration.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13, color: "#555" }}>
                {integration.items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 8, lineHeight: 1.5 }}>
                    <span style={{ color: "#0072C6", marginRight: 6 }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 60,
            padding: 40,
            background: "linear-gradient(135deg, #0072C6 0%, #00A3E0 100%)",
            borderRadius: 20,
            textAlign: "center",
            color: "white",
            boxShadow: "0 15px 40px rgba(0,114,198,0.3)"
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 15, color: "white" }}>
            Ready to Deploy Enterprise Security?
          </h3>
          <p style={{ fontSize: 16, marginBottom: 25, opacity: 0.95, maxWidth: 700, margin: "0 auto 25px" }}>
            AutoComplyAI Enterprise provides production-ready phishing detection with AI-powered
            threat intelligence, automated compliance mapping, and explainable decision-making.
          </p>
          <div style={{ display: "flex", gap: 15, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://github.com/dbachu/AutoComplyAI_Enterprise_NoGaps"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 30px",
                background: "white",
                color: "#0072C6",
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              📚 View Documentation
            </a>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 30px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "2px solid white",
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#0072C6";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
                e.target.style.color = "white";
              }}
            >
              🚀 API Documentation
            </a>
          </div>
        </motion.div>
      </div>
      </div>

    </div>
  );
}

/* SERVICE BOX */

function ServiceBox({ service, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.07, boxShadow: "0 18px 35px rgba(0,0,0,0.25)" }}
      onClick={onClick}
      style={{
        background: "white",
        padding: 35,
        borderRadius: 18,
        width: 230,
        textAlign: "center",
        cursor: "pointer"
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 600 }}>
        {service.title}
      </div>

      <div style={{ fontSize: 18, color: "#777", marginTop: 6 }}>
        {service.subtitle}
      </div>

      {service.key === "orchestrator" && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            marginTop: 12,
            fontSize: 12,
            background: "#0072C6",
            color: "white",
            padding: "6px 10px",
            borderRadius: 20
          }}
        >
          AI Decision Engine
        </motion.div>
      )}
    </motion.div>
  );
}

/* DATA STREAM */

function DataStream() {
  return (
    <div
      style={{
        position: "relative",
        width: 80,
        height: 6,
        margin: "0 20px",
        background: "linear-gradient(90deg,#0072C6,#00c6ff)",
        borderRadius: 6,
        overflow: "hidden"
      }}
    >
      <motion.div
        animate={{ x: [-40, 100] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        style={{
          position: "absolute",
          width: 30,
          height: 6,
          background: "white",
          opacity: 0.6
        }}
      />
    </div>
  );
}

// Made with Bob
