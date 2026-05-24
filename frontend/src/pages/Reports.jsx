import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { THEME, SPACING, SHADOWS, BORDERS } from "../theme";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    phishing: {
      background: '#FEE2E2',
      color: '#991B1B',
      border: '1px solid #FCA5A5'
    },
    legitimate: {
      background: '#D1FAE5',
      color: '#065F46',
      border: '1px solid #6EE7B7'
    }
  };
  
  return (
    <span style={{
      ...styles[status],
      padding: '6px 16px',
      borderRadius: 12,
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: 'inline-block'
    }}>
      {status}
    </span>
  );
};

// Severity Badge Component
const SeverityBadge = ({ severity }) => {
  const styles = {
    CRITICAL: { background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5' },
    HIGH: { background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' },
    MEDIUM: { background: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A' },
    LOW: { background: '#D1FAE5', color: '#065F46', border: '1px solid #6EE7B7' }
  };
  
  return (
    <span style={{
      ...styles[severity.label],
      padding: '6px 16px',
      borderRadius: 12,
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: 'inline-block',
      marginLeft: 12
    }}>
      {severity.label}
    </span>
  );
};

export default function Reports() {
  const [scans, setScans] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all'); // all, phishing, legitimate
  const [searchTerm, setSearchTerm] = useState('');

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
    if (risk > 75) return { label: "CRITICAL", color: THEME.status.error };
    if (risk > 50) return { label: "HIGH", color: THEME.status.warning };
    if (risk > 25) return { label: "MEDIUM", color: '#FCD34D' };
    return { label: "LOW", color: THEME.status.success };
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

  // Filter and search logic
  const filteredScans = scans.filter(scan => {
    const matchesFilter = filter === 'all' || scan.verdict === filter;
    const matchesSearch = searchTerm === '' || 
      scan.id.toString().includes(searchTerm) ||
      scan.verdict.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.mode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '40px 60px',
        maxWidth: 1400,
        margin: '0 auto',
        background: THEME.neutral[50],
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: SPACING.xl }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: THEME.neutral[900],
          marginBottom: SPACING.sm,
          paddingBottom: SPACING.sm,
          borderBottom: `2px solid ${THEME.neutral[200]}`
        }}>
          📊 Threat Intelligence Reports
        </h1>
        <p style={{
          fontSize: 16,
          color: THEME.neutral[500],
          marginBottom: SPACING.lg
        }}>
          View and manage all security scan reports
        </p>

        {/* Filters and Search */}
        <div style={{
          display: 'flex',
          gap: SPACING.md,
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: SPACING.lg
        }}>
          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: SPACING.sm }}>
            {['all', 'phishing', 'legitimate'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  background: filter === f ? THEME.primary.main : 'white',
                  color: filter === f ? 'white' : THEME.neutral[700],
                  border: filter === f ? 'none' : BORDERS.light,
                  borderRadius: BORDERS.radius.md,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: filter === f ? SHADOWS.md : SHADOWS.sm,
                  textTransform: 'capitalize'
                }}
                onMouseEnter={(e) => {
                  if (filter !== f) {
                    e.target.style.background = THEME.neutral[100];
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== f) {
                    e.target.style.background = 'white';
                  }
                }}
              >
                {f === 'all' ? '🔍 All Reports' : f === 'phishing' ? '🚨 Phishing' : '✅ Legitimate'}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search by ID, verdict, or mode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: 250,
              padding: '10px 16px',
              fontSize: 14,
              border: BORDERS.light,
              borderRadius: BORDERS.radius.md,
              background: 'white',
              color: THEME.neutral[900],
              boxShadow: SHADOWS.sm,
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = THEME.primary.main;
              e.target.style.boxShadow = SHADOWS.md;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = THEME.neutral[200];
              e.target.style.boxShadow = SHADOWS.sm;
            }}
          />

          {/* Results Count */}
          <div style={{
            padding: '10px 16px',
            background: THEME.primary.light,
            borderRadius: BORDERS.radius.md,
            fontSize: 14,
            fontWeight: 600,
            color: THEME.primary.main
          }}>
            {filteredScans.length} {filteredScans.length === 1 ? 'Report' : 'Reports'}
          </div>
        </div>
      </div>

      {/* Reports List */}
      <AnimatePresence>
        {filteredScans.map((scan, index) => {
          const severity = getSeverity(scan.risk_score);
          const isOpen = expanded === scan.id;
          const mitre = parseJSON(scan.mitre_mapping);
          const compliance = parseJSON(scan.compliance_mapping);
          const remediation = parseJSON(scan.remediation);

          return (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{
                marginBottom: SPACING.lg,
                background: 'white',
                borderRadius: BORDERS.radius.lg,
                boxShadow: SHADOWS.md,
                border: BORDERS.light,
                overflow: 'hidden'
              }}
            >
              {/* Report Header - Clickable */}
              <div
                onClick={() => setExpanded(isOpen ? null : scan.id)}
                style={{
                  padding: SPACING.lg,
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  borderBottom: isOpen ? BORDERS.light : 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = THEME.neutral[50]}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: SPACING.sm
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
                    <h3 style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: THEME.neutral[900],
                      margin: 0
                    }}>
                      Report #{scan.id}
                    </h3>
                    <StatusBadge status={scan.verdict} />
                    <SeverityBadge severity={severity} />
                  </div>
                  <span style={{
                    fontSize: 24,
                    color: THEME.neutral[400],
                    transition: 'transform 0.2s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    display: 'inline-block'
                  }}>
                    ▼
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  gap: SPACING.lg,
                  fontSize: 14,
                  color: THEME.neutral[600]
                }}>
                  <span><strong>Mode:</strong> {scan.mode.toUpperCase()}</span>
                  <span><strong>Risk Score:</strong> {scan.risk_score}</span>
                  <span><strong>Confidence:</strong> {scan.confidence}%</span>
                  <span style={{ color: THEME.neutral[400] }}>
                    {new Date(scan.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: SPACING.lg }}>
                      {/* Executive Summary */}
                      <Section title="📋 Executive Summary">
                        <p style={{
                          fontSize: 14,
                          lineHeight: 1.6,
                          color: THEME.neutral[700],
                          margin: 0
                        }}>
                          {scan.executive_summary || "No summary available."}
                        </p>
                      </Section>

                      {/* MITRE ATT&CK Mapping */}
                      <Section title="🎯 MITRE ATT&CK Mapping">
                        <BadgeList items={mitre} />
                      </Section>

                      {/* Compliance Mapping */}
                      <Section title="✅ Compliance Mapping">
                        <BadgeList items={compliance} />
                      </Section>

                      {/* Recommended Remediation */}
                      <Section title="🛠️ Recommended Remediation">
                        <ul style={{
                          margin: 0,
                          paddingLeft: SPACING.lg,
                          color: THEME.neutral[700],
                          fontSize: 14,
                          lineHeight: 1.8
                        }}>
                          {remediation.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </Section>

                      {/* Export Buttons */}
                      <div style={{
                        display: 'flex',
                        gap: SPACING.sm,
                        marginTop: SPACING.lg,
                        paddingTop: SPACING.lg,
                        borderTop: BORDERS.light
                      }}>
                        <ExportButton
                          label="📄 Export PDF"
                          color={THEME.status.error}
                          onClick={() => window.open(`http://localhost:8000/export/pdf/${scan.id}`, "_blank")}
                        />
                        <ExportButton
                          label="📋 Export JSON"
                          color={THEME.status.success}
                          onClick={() => window.open(`http://localhost:8000/export/json/${scan.id}`, "_blank")}
                        />
                        <ExportButton
                          label="📊 Export CSV"
                          color={THEME.primary.main}
                          onClick={() => window.open(`http://localhost:8000/export/csv/${scan.id}`, "_blank")}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Empty State */}
      {filteredScans.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: SPACING.xl * 2,
            background: 'white',
            borderRadius: BORDERS.radius.lg,
            boxShadow: SHADOWS.sm
          }}
        >
          <div style={{ fontSize: 48, marginBottom: SPACING.md }}>📭</div>
          <h3 style={{ color: THEME.neutral[700], marginBottom: SPACING.sm }}>
            No reports found
          </h3>
          <p style={{ color: THEME.neutral[500] }}>
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your filters or search term'
              : 'Run a scan to generate your first report'}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ------------------ UI COMPONENTS ------------------ */

function Section({ title, children }) {
  return (
    <div style={{
      marginBottom: SPACING.lg,
      padding: SPACING.md,
      background: THEME.neutral[50],
      borderRadius: BORDERS.radius.md,
      border: BORDERS.light
    }}>
      <h4 style={{
        fontSize: 16,
        fontWeight: 600,
        color: THEME.neutral[900],
        marginBottom: SPACING.sm
      }}>
        {title}
      </h4>
      <div>{children}</div>
    </div>
  );
}

function BadgeList({ items }) {
  if (!items || items.length === 0)
    return <p style={{ color: THEME.neutral[500], margin: 0, fontSize: 14 }}>No data available.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: SPACING.sm }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: 'white',
            padding: "8px 16px",
            borderRadius: BORDERS.radius.md,
            fontSize: 13,
            color: THEME.neutral[700],
            border: BORDERS.light,
            fontFamily: 'monospace'
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function ExportButton({ label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontSize: 14,
        fontWeight: 600,
        background: 'white',
        color: color,
        border: `2px solid ${color}`,
        borderRadius: BORDERS.radius.md,
        cursor: 'pointer',
        boxShadow: SHADOWS.sm,
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = color;
        e.target.style.color = 'white';
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = SHADOWS.md;
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'white';
        e.target.style.color = color;
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = SHADOWS.sm;
      }}
    >
      {label}
    </button>
  );
}

