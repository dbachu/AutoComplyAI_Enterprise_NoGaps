import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);

  const isActive = (path) => location.pathname === path;

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

        <Link
          style={{
            ...linkStyle,
            ...(isActive('/') || isActive('/dashboard') ? activeLinkStyle : {}),
            ...(hoveredLink === 'dashboard' ? linkHoverStyle : {})
          }}
          to="/"
          onMouseEnter={() => setHoveredLink('dashboard')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Dashboard
        </Link>

        <Link
          style={{
            ...linkStyle,
            ...(isActive('/scan') ? activeLinkStyle : {}),
            ...(hoveredLink === 'scan' ? linkHoverStyle : {})
          }}
          to="/scan"
          onMouseEnter={() => setHoveredLink('scan')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Scan
        </Link>

        <Link
          style={{
            ...linkStyle,
            ...(isActive('/reports') ? activeLinkStyle : {}),
            ...(hoveredLink === 'reports' ? linkHoverStyle : {})
          }}
          to="/reports"
          onMouseEnter={() => setHoveredLink('reports')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Reports
        </Link>

        <Link
          style={{
            ...linkStyle,
            ...(isActive('/architecture') ? activeLinkStyle : {}),
            ...(hoveredLink === 'architecture' ? linkHoverStyle : {})
          }}
          to="/architecture"
          onMouseEnter={() => setHoveredLink('architecture')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Architecture
        </Link>

        {/* API Docs */}

        <a
          style={{
            ...linkStyle,
            ...(hoveredLink === 'swagger' ? linkHoverStyle : {})
          }}
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setHoveredLink('swagger')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Swagger Docs
        </a>

        <a
          style={{
            ...linkStyle,
            ...(hoveredLink === 'phase1' ? linkHoverStyle : {})
          }}
          href="https://github.com/dbachu/AutoComplyAI"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setHoveredLink('phase1')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Phase-1 Code
        </a>

        <a
          style={{
            ...linkStyle,
            ...(hoveredLink === 'phase2' ? linkHoverStyle : {})
          }}
          href="https://github.com/dbachu/AutoComplyAI_Enterprise_NoGaps"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setHoveredLink('phase2')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Phase-2 Code
        </a>

        <a
          style={{
            ...linkStyle,
            ...(hoveredLink === 'paper' ? linkHoverStyle : {})
          }}
          href="https://colab.research.google.com/drive/10ZiniYdbKYgwC-Mh2uYUPmSB7H8PtUfA#scrollTo=hn16KjhUou5v"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setHoveredLink('paper')}
          onMouseLeave={() => setHoveredLink(null)}
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
  background: 'linear-gradient(135deg, #0B3D91 0%, #1E5BA8 100%)',
  color: "white",
  padding: "16px 48px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backdropFilter: 'blur(10px)'
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
  fontWeight: 500,
  padding: '8px 16px',
  borderRadius: 6,
  transition: 'all 0.2s ease',
  position: 'relative'
};

const linkHoverStyle = {
  background: 'rgba(255,255,255,0.1)',
  transform: 'translateY(-1px)'
};

const activeLinkStyle = {
  background: 'rgba(255,255,255,0.15)',
  fontWeight: 600
};