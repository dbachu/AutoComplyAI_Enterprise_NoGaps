import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import ThreatFeed from "../components/ThreatFeed";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from "recharts";

const COLORS = ["#0073c6", "#70e3a0", "#e89851", "#b98ecb", "#e74c3c"];

export default function Dashboard() {

  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {

    try {

      const res = await axios.get("http://localhost:8000/scans");

      setScans(res.data);

    } catch (err) {

      console.error("Failed to fetch scans:", err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchData();

    const interval = setInterval(fetchData, 4000);

    return () => clearInterval(interval);

  }, []);

  const total = scans.length;

  const phishing = scans.filter(s => s.verdict === "phishing").length;

  const legitimate = scans.filter(s => s.verdict === "legitimate").length;

  const avgRisk =
    total > 0
      ? Math.round(scans.reduce((sum, s) => sum + s.risk_score, 0) / total)
      : 0;

  const verdictData = [
    { name: "Phishing", value: phishing },
    { name: "Legitimate", value: legitimate }
  ];

  const modeCounts = ["rule", "ml", "hybrid", "llm_mock", "openai"].map(mode => ({
    name: mode.toUpperCase(),
    value: scans.filter(s => s.mode === mode).length
  }));

  const mitreFrequency = {};

  scans.forEach(scan => {

    try {

      const techniques = JSON.parse(scan.mitre_mapping || "[]");

      techniques.forEach(t => {

        mitreFrequency[t] = (mitreFrequency[t] || 0) + 1;

      });

    } catch {}

  });

  const mitreData = Object.entries(mitreFrequency).map(([name, value]) => ({
    name,
    value
  }));

  const trendData = scans.map(s => ({
    id: s.id,
    risk: s.risk_score
  }));

  if (loading) {
    return <div style={{ padding: 40 }}>Loading dashboard...</div>;
  }

  return (

    <div style={{ padding: 40, maxWidth: 1400, margin: "auto" }}>

      <h1>AutoComplyAI Enterprise Security Command Center</h1>

      {/* KPI CARDS */}

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>

        <Card title="Total Scans" value={total} />
        <Card title="Phishing Detected" value={phishing} />
        <Card title="Legitimate" value={legitimate} />
        <Card title="Average Risk Score" value={avgRisk} />

      </div>

      {/* TOP GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 30,
          marginTop: 40
        }}
      >

        <Panel title="Risk Score Trend">

          <ResponsiveContainer width="100%" height={320}>

            <LineChart data={trendData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="id" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="risk"
                stroke="#0072C6"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </Panel>

        <ThreatFeed />

      </div>

      {/* DONUT CHARTS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          marginTop: 50
        }}
      >

        <Panel title="Verdict Distribution">

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>

              <Pie
                data={verdictData}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >

                {verdictData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}

              </Pie>

              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />

            </PieChart>
          </ResponsiveContainer>

        </Panel>

        <Panel title="Detection Mode Distribution">

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={modeCounts}
                dataKey="value"
                innerRadius={50}
                outerRadius={90}
                label
              >

                {modeCounts.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </Panel>

      </div>

      {/* MITRE ATTACK */}

      <div style={{ marginTop: 60 }}>

        <Panel title="MITRE ATT&CK Technique Distribution">

          <ResponsiveContainer width="100%" height={420}>

            <BarChart data={mitreData}>

              <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={70}
                />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="value" fill="#0072C6" />

            </BarChart>

          </ResponsiveContainer>

        </Panel>

      </div>

      {/* RECENT ACTIVITY */}

      <div style={{ marginTop: 60 }}>

        <h2>Recent Scan Activity</h2>

        <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>

          <thead>

            <tr style={{ background: "#f4f6f9" }}>
              <th style={th}>ID</th>
              <th style={th}>Verdict</th>
              <th style={th}>Risk</th>
              <th style={th}>Mode</th>
              <th style={th}>Timestamp</th>
            </tr>

          </thead>

          <tbody>

            {scans.slice().reverse().slice(0,10).map(scan => (

              <tr key={scan.id}>

                <td style={td}>{scan.id}</td>

                <td style={td}>
                  <span
                    style={{
                      color:
                        scan.verdict === "phishing"
                          ? "#d9534f"
                          : "#2ECC71",
                      fontWeight: "bold"
                    }}
                  >
                    {scan.verdict}
                  </span>
                </td>

                <td style={td}>{scan.risk_score}</td>

                <td style={td}>{scan.mode}</td>

                <td style={td}>
                  {new Date(scan.created_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>


      {/* DASHBOARD METRICS & VISUALIZATIONS GUIDE */}

      <div style={{ marginTop: 80, maxWidth: 1200, margin: "80px auto 0" }}>
        <h2 style={{ fontSize: 28, textAlign: "center", marginBottom: 20, color: "#003366" }}>
          📊 Understanding Dashboard Metrics & Visualizations
        </h2>
        <p style={{ textAlign: "center", color: "#555", marginBottom: 50, fontSize: 16 }}>
          Comprehensive guide to interpreting Security Operations Center (SOC) dashboard components
        </p>

        {/* KPI CARDS */}
        <div style={{ marginBottom: 60 }}>
          <h3 style={{ fontSize: 22, marginBottom: 25, color: "#003366", fontWeight: 600 }}>
            📊 Key Performance Indicators (KPI Cards)
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20
          }}>
            {[
              {
                title: "Total Scans",
                description: "Cumulative count of all email threat analysis operations performed",
                interpretation: "Higher numbers indicate active security monitoring. Baseline for calculating detection rates and system utilization.",
                calculation: "COUNT(*) from incidents table",
                businessValue: "Demonstrates security team activity and system adoption"
              },
              {
                title: "Phishing Detected",
                description: "Number of emails classified as phishing threats (verdict = 'phishing')",
                interpretation: "Direct measure of threat detection effectiveness. Compare against industry benchmarks (1-3% of email volume).",
                calculation: "COUNT(*) WHERE verdict = 'phishing'",
                businessValue: "Quantifies prevented security incidents and potential data breaches"
              },
              {
                title: "Legitimate",
                description: "Number of emails classified as safe (verdict = 'legitimate')",
                interpretation: "Indicates false positive rate when compared to user reports. High numbers suggest effective filtering.",
                calculation: "COUNT(*) WHERE verdict = 'legitimate'",
                businessValue: "Validates detection accuracy and reduces alert fatigue"
              },
              {
                title: "Average Risk Score",
                description: "Mean risk score across all analyzed emails (0-100 scale)",
                interpretation: "Baseline threat level. Sudden increases may indicate coordinated attack campaigns or compromised infrastructure.",
                calculation: "AVG(risk_score) across all scans",
                businessValue: "Trend analysis for security posture and threat landscape changes"
              }
            ].map((kpi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: "white",
                  padding: 25,
                  borderRadius: 12,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #e0e0e0"
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 16, color: "#0072C6", marginBottom: 12 }}>
                  {kpi.title}
                </div>
                <div style={{ fontSize: 14, color: "#444", marginBottom: 10, lineHeight: 1.6 }}>
                  <strong>What it shows:</strong> {kpi.description}
                </div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 10, lineHeight: 1.6 }}>
                  <strong>Interpretation:</strong> {kpi.interpretation}
                </div>
                <div style={{ fontSize: 12, color: "#888", fontFamily: "monospace", background: "#f5f5f5", padding: 8, borderRadius: 6, marginBottom: 10 }}>
                  {kpi.calculation}
                </div>
                <div style={{ fontSize: 13, color: "#0072C6", fontWeight: 600 }}>
                  💼 {kpi.businessValue}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* VISUALIZATIONS */}
        <div style={{ marginBottom: 60 }}>
          <h3 style={{ fontSize: 22, marginBottom: 25, color: "#003366", fontWeight: 600 }}>
            📈 Chart Interpretations & Axis Explanations
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            
            {/* Risk Trend Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: "white",
                padding: 30,
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#003366" }}>
                  📉 Risk Score Trend (Line Chart)
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25, marginTop: 20 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Chart Type</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Time-series line chart showing risk score evolution
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Update Frequency</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Real-time updates every 4 seconds with new scan data
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>X-Axis (Horizontal)</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    <strong>Scan ID:</strong> Sequential identifier for each email analysis
                  </div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 5 }}>
                    → Represents chronological order of scans (left = older, right = newer)
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Y-Axis (Vertical)</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    <strong>Risk Score:</strong> Individual risk value (0-100 scale) per scan
                  </div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 5 }}>
                    → 0-30 = Low, 31-69 = Medium, 70-100 = High/Critical
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: 20, padding: 15, background: "#f0f7ff", borderRadius: 8, borderLeft: "4px solid #0072C6" }}>
                <div style={{ fontWeight: 600, marginBottom: 8, color: "#003366" }}>📖 How to Read This Chart</div>
                <ul style={{ paddingLeft: 20, margin: 0, fontSize: 14, color: "#444", lineHeight: 1.8 }}>
                  <li><strong>Upward trends:</strong> Increasing threat activity or more sophisticated attacks</li>
                  <li><strong>Downward trends:</strong> Improving security posture or reduced threat volume</li>
                  <li><strong>Spikes:</strong> Individual high-risk emails requiring immediate investigation</li>
                  <li><strong>Plateaus:</strong> Stable threat environment or consistent attack patterns</li>
                  <li><strong>Pattern recognition:</strong> Look for recurring spikes indicating campaign activity</li>
                </ul>
              </div>
            </motion.div>

            {/* Verdict Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: "white",
                padding: 30,
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#003366" }}>
                  🥧 Verdict Distribution (Donut Chart)
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25, marginTop: 20 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Chart Type</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Donut chart showing proportional distribution of verdicts
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Categories</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    <span style={{ color: "#0073c6", fontWeight: 600 }}>● Blue:</span> Phishing threats<br/>
                    <span style={{ color: "#70e3a0", fontWeight: 600 }}>● Green:</span> Legitimate emails
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Slice Size</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Proportional to percentage of total scans in each category
                  </div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 5 }}>
                    → Larger slice = higher proportion of that verdict type
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Tooltip</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Hover over slices to see exact counts and percentages
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: 20, padding: 15, background: "#f0fff4", borderRadius: 8, borderLeft: "4px solid #70e3a0" }}>
                <div style={{ fontWeight: 600, marginBottom: 8, color: "#003366" }}>📖 How to Read This Chart</div>
                <ul style={{ paddingLeft: 20, margin: 0, fontSize: 14, color: "#444", lineHeight: 1.8 }}>
                  <li><strong>Detection rate:</strong> Phishing slice size indicates threat prevalence</li>
                  <li><strong>Baseline comparison:</strong> Industry average phishing rate is 1-3% of email volume</li>
                  <li><strong>Model performance:</strong> Balanced distribution suggests effective detection</li>
                  <li><strong>False positive check:</strong> Unusually large phishing slice may indicate over-detection</li>
                  <li><strong>Trend monitoring:</strong> Track changes over time for threat landscape shifts</li>
                </ul>
              </div>
            </motion.div>

            {/* Detection Mode Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: "white",
                padding: 30,
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#003366" }}>
                  🔧 Detection Mode Distribution (Donut Chart)
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25, marginTop: 20 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Chart Type</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Donut chart showing usage frequency of each detection engine mode
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Detection Modes</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    RULE, ML, HYBRID, LLM_MOCK, OPENAI (GPT-4)
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Slice Meaning</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Each slice represents proportion of scans using that detection mode
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Color Coding</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Different colors distinguish between detection modes
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: 20, padding: 15, background: "#f5f0ff", borderRadius: 8, borderLeft: "4px solid #b98ecb" }}>
                <div style={{ fontWeight: 600, marginBottom: 8, color: "#003366" }}>📖 How to Read This Chart</div>
                <ul style={{ paddingLeft: 20, margin: 0, fontSize: 14, color: "#444", lineHeight: 1.8 }}>
                  <li><strong>HYBRID dominance:</strong> Indicates comprehensive multi-engine analysis preference</li>
                  <li><strong>RULE usage:</strong> Fast, deterministic detection for known patterns</li>
                  <li><strong>ML usage:</strong> Statistical classification for pattern recognition</li>
                  <li><strong>OPENAI usage:</strong> Advanced contextual analysis for complex threats</li>
                  <li><strong>Cost optimization:</strong> Balance between detection accuracy and API costs</li>
                </ul>
              </div>
            </motion.div>

            {/* MITRE ATT&CK */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: "white",
                padding: 30,
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#003366" }}>
                  🎯 MITRE ATT&CK Technique Distribution (Bar Chart)
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25, marginTop: 20 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Chart Type</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Vertical bar chart showing MITRE ATT&CK technique frequency
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Data Source</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Aggregated from MITRE Agent mappings across all detected threats
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>X-Axis (Horizontal)</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    <strong>MITRE Technique ID:</strong> ATT&CK technique identifiers
                  </div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 5 }}>
                    → T1566 = Phishing, T1598 = Phishing for Information, etc.
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Y-Axis (Vertical)</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    <strong>Detection Count:</strong> Number of times each technique was detected
                  </div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 5 }}>
                    → Taller bars = more prevalent attack techniques
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: 20, padding: 15, background: "#fff4e6", borderRadius: 8, borderLeft: "4px solid #e89851" }}>
                <div style={{ fontWeight: 600, marginBottom: 8, color: "#003366" }}>📖 How to Read This Chart</div>
                <ul style={{ paddingLeft: 20, margin: 0, fontSize: 14, color: "#444", lineHeight: 1.8 }}>
                  <li><strong>Tallest bars:</strong> Most frequently used attack techniques by adversaries</li>
                  <li><strong>Coverage gaps:</strong> Techniques with zero detections may indicate blind spots</li>
                  <li><strong>Technique clustering:</strong> Multiple related techniques suggest targeted campaigns</li>
                  <li><strong>Compliance mapping:</strong> Links to ISO 27001, NIST CSF, GDPR requirements</li>
                  <li><strong>Threat intelligence:</strong> Compare against industry threat reports for context</li>
                </ul>
              </div>
            </motion.div>

            {/* Live Threat Feed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                background: "white",
                padding: 30,
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#003366" }}>
                  📡 Live Threat Feed (Real-Time Stream)
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25, marginTop: 20 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Display Type</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Scrolling terminal-style feed with monospace font
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Update Frequency</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    Real-time updates every 3 seconds, showing last 20 events
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Data Format</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    <strong>[Timestamp]</strong> Scan #ID Risk:Score Verdict:Result
                  </div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 5, fontFamily: "monospace" }}>
                    [14:23:45] Scan #127 Risk:85 Verdict:phishing
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: "#0072C6" }}>Color Scheme</div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
                    <span style={{ color: "#00ff9f", fontWeight: 600 }}>● Green text:</span> Active events<br/>
                    <span style={{ background: "#0c0c0c", color: "white", padding: "2px 6px", borderRadius: 3 }}>● Dark background:</span> Terminal theme
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: 20, padding: 15, background: "#e6f7ff", borderRadius: 8, borderLeft: "4px solid #0073c6" }}>
                <div style={{ fontWeight: 600, marginBottom: 8, color: "#003366" }}>📖 How to Read This Feed</div>
                <ul style={{ paddingLeft: 20, margin: 0, fontSize: 14, color: "#444", lineHeight: 1.8 }}>
                  <li><strong>Timestamp:</strong> Exact time of scan execution for incident timeline</li>
                  <li><strong>Scan ID:</strong> Unique identifier for detailed investigation</li>
                  <li><strong>Risk Score:</strong> 0-100 scale (70+ = high priority requiring immediate action)</li>
                  <li><strong>Verdict:</strong> Final classification from ensemble (phishing/legitimate)</li>
                  <li><strong>Auto-scroll:</strong> Latest events appear at bottom, older events scroll up</li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>

        {/* DASHBOARD USAGE GUIDE */}
        <div style={{
          background: "linear-gradient(135deg, #0072C6, #00A3E0)",
          color: "white",
          padding: 40,
          borderRadius: 16,
          marginTop: 60
        }}>
          <h3 style={{ fontSize: 22, marginBottom: 20, fontWeight: 700 }}>
            🎯 Dashboard Best Practices for SOC Analysts
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 25 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>🔍 Daily Monitoring</div>
              <ul style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                <li>Check Phishing Detected KPI for priority incidents</li>
                <li>Review Risk Trend for anomalous spikes</li>
                <li>Monitor MITRE chart for new attack techniques</li>
                <li>Validate detection mode distribution for cost optimization</li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>📊 Trend Analysis</div>
              <ul style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                <li>Compare week-over-week risk score trends</li>
                <li>Identify recurring MITRE techniques</li>
                <li>Track detection rate improvements over time</li>
                <li>Correlate with external threat intelligence feeds</li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>🚨 Incident Response</div>
              <ul style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                <li>Prioritize scans with risk score ≥ 70</li>
                <li>Review Recent Scan Activity table for details</li>
                <li>Validate MITRE technique mappings for compliance</li>
                <li>Generate reports for executive stakeholders</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* DOCUMENTATION FOOTER */}
      <div style={{
        marginTop: 80,
        padding: 40,
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        borderRadius: 16,
        border: "2px solid #dee2e6"
      }}>
        <h3 style={{ fontSize: 22, marginBottom: 20, color: "#003366", textAlign: "center", fontWeight: 700 }}>
          📚 Technical Documentation & Resources
        </h3>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 30, fontSize: 15 }}>
          Comprehensive guides for developers, SOC analysts, and system architects
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 25
        }}>
          {[
            {
              icon: "🔌",
              title: "API Walkthrough Guide",
              description: "Interactive Swagger documentation, endpoint reference, request/response examples, and integration patterns",
              link: "https://github.com/dbachu/AutoComplyAI_Enterprise_NoGaps/blob/main/API_WALKTHROUGH_GUIDE.md",
              localFile: "API_WALKTHROUGH_GUIDE.md",
              highlights: ["Swagger UI at :8000/docs", "10 REST endpoints", "5 detection modes", "Common use cases"]
            },
            {
              icon: "🏗️",
              title: "Architecture Diagrams",
              description: "System architecture, component diagrams, network flows, data pipelines, and deployment configurations",
              link: "https://github.com/dbachu/AutoComplyAI_Enterprise_NoGaps/blob/main/ARCHITECTURE_DIAGRAMS.md",
              localFile: "ARCHITECTURE_DIAGRAMS.md",
              highlights: ["8 Mermaid diagrams", "Multi-agent flow", "Detection pipeline", "Container architecture"]
            },
            {
              icon: "💻",
              title: "Code Walkthrough Demo",
              description: "Step-by-step code explanation, agent orchestration, detection engines, and implementation details",
              link: "https://github.com/dbachu/AutoComplyAI_Enterprise_NoGaps/blob/main/CODE_WALKTHROUGH_DEMO.md",
              localFile: "CODE_WALKTHROUGH_DEMO.md",
              highlights: ["Agent timeline", "Hybrid detection", "MITRE mapping", "PDF generation"]
            }
          ].map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
              style={{
                background: "white",
                padding: 25,
                borderRadius: 12,
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                border: "1px solid #e0e0e0",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onClick={() => window.open(doc.link, '_blank')}
            >
              <div style={{ fontSize: 40, marginBottom: 15, textAlign: "center" }}>
                {doc.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#0072C6", marginBottom: 12, textAlign: "center" }}>
                {doc.title}
              </div>
              <div style={{ fontSize: 14, color: "#555", marginBottom: 15, lineHeight: 1.6, minHeight: 60 }}>
                {doc.description}
              </div>
              <div style={{
                fontSize: 12,
                color: "#888",
                fontFamily: "monospace",
                background: "#f5f5f5",
                padding: 8,
                borderRadius: 6,
                marginBottom: 12
              }}>
                📄 {doc.localFile}
              </div>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 15 }}>
                <strong>Key Topics:</strong>
                <ul style={{ paddingLeft: 20, margin: "8px 0 0 0", lineHeight: 1.8 }}>
                  {doc.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#0072C6",
                fontWeight: 600,
                fontSize: 14
              }}>
                <span>View Documentation</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{
          marginTop: 40,
          padding: 25,
          background: "white",
          borderRadius: 12,
          border: "1px solid #dee2e6"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🌐</span>
              <div>
                <div style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>Frontend</div>
                <div style={{ fontSize: 14, color: "#0072C6", fontWeight: 700 }}>
                  <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#0072C6" }}>
                    localhost:5173
                  </a>
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🔌</span>
              <div>
                <div style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>Backend API</div>
                <div style={{ fontSize: 14, color: "#0072C6", fontWeight: 700 }}>
                  <a href="http://localhost:8000/health" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#0072C6" }}>
                    localhost:8000/health
                  </a>
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>📖</span>
              <div>
                <div style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>Swagger UI</div>
                <div style={{ fontSize: 14, color: "#0072C6", fontWeight: 700 }}>
                  <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#0072C6" }}>
                    localhost:8000/docs
                  </a>
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🏗️</span>
              <div>
                <div style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>Architecture</div>
                <div style={{ fontSize: 14, color: "#0072C6", fontWeight: 700 }}>
                  <a href="http://localhost:5173/architecture" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#0072C6" }}>
                    /architecture
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 25, textAlign: "center", color: "#888", fontSize: 13 }}>
          <p style={{ margin: 0 }}>
            💡 <strong>Tip:</strong> All documentation is available in the project root directory and on GitHub
          </p>
        </div>
      </div>

      </div>

    </div>

  );

}

/* COMPONENTS */

function Card({ title, value }) {

  return (

    <div
      style={{
        flex: 1,
        padding: 25,
        background: "white",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        textAlign: "center"
      }}
    >

      <h4 style={{ color:"#666" }}>{title}</h4>

      <h1 style={{ color:"#0073c6" }}>{value}</h1>

    </div>

  );

}

function Panel({ title, children }) {

  return (

    <div
      style={{
        background: "white",
        padding: 25,
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >

      <h3>{title}</h3>

      {children}

    </div>

  );

}

const th = {
  padding: 12,
  textAlign: "left",
  borderBottom: "1px solid #ddd"
};

const td = {
  padding: 12,
  borderBottom: "1px solid #eee"
};