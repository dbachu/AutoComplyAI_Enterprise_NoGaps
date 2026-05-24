import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      
      {/* PROJECT TITLE */}

      <div style={logoStyle}>
        🔐 AutoComplyAI - Adaptive Phishing Detection with Built-In Incident Reporting
      </div>

      {/* AUTHOR INFO */}

      <div style={{ fontWeight: "bold", fontSize: 18 }}>
        By: Deepika Kothamasu
        <div style={{ fontSize: 14 }}>
          URN: PES2PGE24DS012 | Project Guide: Mr. Mahesh Ramegowda
        </div>
      </div>

      {/* NAVIGATION LINKS */}

      <div style={linkContainer}>

        <Link style={linkStyle} to="/">Dashboard</Link>

        <Link style={linkStyle} to="/scan">Scan</Link>

        <Link style={linkStyle} to="/reports">Reports</Link>

        <Link style={linkStyle} to="/architecture">Architecture</Link>

        {/* API Docs */}

        <a
          style={linkStyle}
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
        >
          Swagger Docs
        </a>

        {/* PHASE 1 CODE */}

        <a
          style={linkStyle}
          href="https://github.com/dbachu/AutoComplyAI"
          target="_blank"
          rel="noreferrer"
        >
          Phase-1 Code
        </a>

        {/* PHASE 2 CODE */}

        <a
          style={linkStyle}
          href="https://github.com/dbachu/AutoComplyAI_Enterprise_NoGaps"
          target="_blank"
          rel="noreferrer"
        >
          Phase-2 Code
        </a>

        {/* BASE PAPER CODE */}

        <a
          style={linkStyle}
          href="https://colab.research.google.com/drive/10ZiniYdbKYgwC-Mh2uYUPmSB7H8PtUfA#scrollTo=hn16KjhUou5v"
          target="_blank"
          rel="noreferrer"
        >
          📄 Base Paper Code
        </a>

      </div>
    </nav>
  );
}

/* =========================
   STYLES
=========================*/

const navStyle = {
  background: "#0b3d91",
  color: "white",
  padding: "15px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const logoStyle = {
  fontSize: 18,
  fontWeight: "bold"
};

const linkContainer = {
  display: "flex",
  gap: 20,
  alignItems: "center"
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500
};