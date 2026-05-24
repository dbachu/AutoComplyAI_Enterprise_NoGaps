import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

const THEME = {
  primary: { main: '#3B82F6' },
  status: { error: '#EF4444', warning: '#F59E0B', success: '#10B981' },
  neutral: { 50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 500: '#6B7280', 700: '#374151', 900: '#111827' }
};

const SPACING = { xs: 8, sm: 12, md: 16, lg: 24 };
const BORDERS = { light: '1px solid #E5E7EB', radius: { md: 8, lg: 12 } };

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0];
  const score = data.value;
  
  return (
    <div style={{
      background: 'white',
      padding: '12px 16px',
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      border: '1px solid #E5E7EB'
    }}>
      <div style={{ fontWeight: 600, marginBottom: 4, color: THEME.neutral[900] }}>
        {data.payload.name}
      </div>
      <div style={{ fontSize: 14, color: THEME.neutral[700] }}>
        Score: <strong style={{ color: data.fill }}>{score}</strong>
      </div>
      <div style={{ fontSize: 12, color: THEME.neutral[500], marginTop: 4 }}>
        {score > 75 && '🔴 High threat detected'}
        {score > 50 && score <= 75 && '🟠 Moderate threat'}
        {score > 25 && score <= 50 && '🟡 Low threat'}
        {score <= 25 && '🟢 Minimal threat'}
      </div>
    </div>
  );
};

export default function DecisionBreakdown({ data }) {

  if (!data) return null;

  const chartData = [
    {
      name: "Rule Engine",
      score: data.rule_engine || 0,
      description: "Pattern-based detection"
    },
    {
      name: "ML Model",
      score: data.ml_model || 0,
      description: "Machine learning analysis"
    },
    {
      name: "LLM Model",
      score: data.llm_model || 0,
      description: "AI language understanding"
    },
    {
      name: "Final Score",
      score: data.hybrid_final || data.weighted_score || 0,
      description: "Combined weighted result"
    }
  ];

  // Color bars based on score
  const getBarColor = (score) => {
    if (score > 75) return THEME.status.error;
    if (score > 50) return THEME.status.warning;
    if (score > 25) return '#FCD34D';
    return THEME.status.success;
  };

  return (
    <div style={{
      padding: SPACING.lg,
      background: THEME.neutral[50],
      borderRadius: BORDERS.radius.lg,
      border: BORDERS.light
    }}>
      <h3 style={{
        fontSize: 18,
        fontWeight: 600,
        color: THEME.neutral[900],
        marginBottom: SPACING.sm,
        display: 'flex',
        alignItems: 'center',
        gap: SPACING.sm
      }}>
        📊 AI Engine Scores Breakdown
      </h3>
      
      <p style={{
        fontSize: 13,
        color: THEME.neutral[600],
        marginBottom: SPACING.lg
      }}>
        Each detection engine independently analyzed the content. The final score combines all engines with weighted averaging.
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.neutral[200]} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: THEME.neutral[700] }}
            axisLine={{ stroke: THEME.neutral[300] }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: THEME.neutral[700] }}
            axisLine={{ stroke: THEME.neutral[300] }}
            label={{ value: 'Risk Score', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: THEME.neutral[600] } }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
          <Bar
            dataKey="score"
            radius={[8, 8, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Engine Descriptions */}
      <div style={{
        marginTop: SPACING.lg,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: SPACING.sm
      }}>
        {chartData.map((engine, idx) => (
          <div key={idx} style={{
            padding: SPACING.sm,
            background: 'white',
            borderRadius: BORDERS.radius.md,
            border: BORDERS.light,
            fontSize: 12
          }}>
            <div style={{ fontWeight: 600, color: THEME.neutral[900], marginBottom: 4 }}>
              {engine.name}
            </div>
            <div style={{ color: THEME.neutral[600] }}>
              {engine.description}
            </div>
            <div style={{
              marginTop: 4,
              fontWeight: 700,
              fontSize: 16,
              color: getBarColor(engine.score)
            }}>
              {engine.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}