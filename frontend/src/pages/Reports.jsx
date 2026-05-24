import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [scans, setScans] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const res = await axios.get("http://localhost:8000/scans");
      setScans(res.data.reverse());
    } catch (err) {
      console.error("Failed to load reports:", err);
    }
  };

  const getSeverity = (risk) => {
    if (risk > 75) return { label: "CRITICAL", color: "#8b0000" };
    if (risk > 50) return { label: "HIGH", color: "#d9534f" };
    if (risk > 25) return { label: "MEDIUM", color: "#f0ad4e" };
    return { label: "LOW", color: "#5cb85c" };
  };

  const parseJSON = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: "auto" }}>
      <h1>Threat Intelligence Reports</h1>

      {scans.map((scan) => {
        const severity = getSeverity(scan.risk_score);
        const isOpen = expanded === scan.id;

        const mitre = parseJSON(scan.mitre_mapping);
        const compliance = parseJSON(scan.compliance_mapping);
        const remediation = parseJSON(scan.remediation);

        return (
          <div
            key={scan.id}
            style={{
              marginTop: 25,
              padding: 25,
              borderRadius: 12,
              background: "white",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
            }}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setExpanded(isOpen ? null : scan.id)}
            >
              <h3>
                Report #{scan.id} —
                <span
                  style={{
                    marginLeft: 10,
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: severity.color,
                    color: "white",
                    fontSize: 12
                  }}
                >
                  {severity.label}
                </span>
              </h3>

              <p>
                Verdict: <strong>{scan.verdict}</strong> |
                Mode: {scan.mode} |
                Risk Score: {scan.risk_score}
              </p>

              <p style={{ color: "#777", fontSize: 13 }}>
                {new Date(scan.created_at).toLocaleString()}
              </p>
            </div>

            {isOpen && (
              <div style={{ marginTop: 25 }}>

                <Section title="Executive Summary">
                  {scan.executive_summary || "No summary available."}
                </Section>

                <Section title="MITRE ATT&CK Mapping">
                  <BadgeList items={mitre} />
                </Section>

                <Section title="Compliance Mapping">
                  <BadgeList items={compliance} />
                </Section>

                <Section title="Recommended Remediation">
                  <ul>
                    {remediation.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </Section>

                <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
                  <button
                    style={{
                      padding: "10px 20px",
                      background: "#d9534f",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                    onClick={() =>
                      window.open(
                        `http://localhost:8000/export/pdf/${scan.id}`,
                        "_blank"
                      )
                    }
                  >
                    📄 Export PDF
                  </button>

                  <button
                    style={{
                      padding: "10px 20px",
                      background: "#5cb85c",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                    onClick={() =>
                      window.open(
                        `http://localhost:8000/export/json/${scan.id}`,
                        "_blank"
                      )
                    }
                  >
                    📋 Export JSON
                  </button>

                  <button
                    style={{
                      padding: "10px 20px",
                      background: "#5bc0de",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                    onClick={() =>
                      window.open(
                        `http://localhost:8000/export/csv/${scan.id}`,
                        "_blank"
                      )
                    }
                  >
                    📊 Export CSV
                  </button>
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------ UI COMPONENTS ------------------ */

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

function BadgeList({ items }) {
  if (!items || items.length === 0)
    return <p style={{ color: "#777" }}>No data available.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#f4f6f9",
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 13
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}