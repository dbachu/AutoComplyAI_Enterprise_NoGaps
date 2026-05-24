from fastapi import FastAPI, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from .services.scan_service import ScanService
from .api.threat_feed import router as threat_feed_router
from .api.metrics import router as metrics_router
from .api.threat_stats import router as threat_router
from .api.mitre_heatmap import router as mitre_router
from .api.risk_trend import router as risk_router

import csv
import json

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    ListFlowable,
    ListItem,
    Table,
    TableStyle
)

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib import colors

from .database import Base, engine, SessionLocal
from .models import Scan
from .schemas import ScanRequest
from .reporting.report_builder import build_report
#from .tasks.scan_tasks import process_scan


# =========================
# APP INIT
# =========================

app = FastAPI(title="AutoComplyAI Enterprise")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register analytics routers
app.include_router(metrics_router)
app.include_router(threat_router)
app.include_router(mitre_router)
app.include_router(risk_router)
app.include_router(threat_feed_router)

Base.metadata.create_all(bind=engine)


# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "service": "AutoComplyAI Enterprise",
        "version": "1.0.0"
    }


# =========================
# DB DEPENDENCY
# =========================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================
# SCAN ENDPOINT
# =========================
'''
@app.post("/scan")
def scan(request: ScanRequest, background_tasks: BackgroundTasks):

    background_tasks.add_task(
        process_scan,
        request.text,
        request.mode
    )

    return {
        "message": "Scan started",
        "status": "processing"
    }

'''

@app.post("/scan")
def scan(request: ScanRequest, db: Session = Depends(get_db)):

    scan, result = ScanService.run_scan(
        request.text,
        request.mode,
        db
    )

    report = build_report(scan)

    return {
    "scan_id": scan.id,
    "report": report,
    "decision_breakdown": result.get("decision_breakdown", {}),
    "agent_timeline": result.get("agent_timeline", [])
    }

# =========================
# GET ALL SCANS
# =========================

@app.get("/scans")
def get_scans(db: Session = Depends(get_db)):
    return db.query(Scan).all()


# =========================
# EXPORT PDF (ENTERPRISE REPORT)
# =========================

@app.get("/export/pdf/{scan_id}")
def export_pdf(scan_id: int, db: Session = Depends(get_db)):

    scan = db.query(Scan).filter(Scan.id == scan_id).first()

    if not scan:
        return {"error": "Scan not found"}

    report = build_report(scan)

    file_path = f"report_{scan_id}.pdf"

    doc = SimpleDocTemplate(file_path)

    elements = []
    styles = getSampleStyleSheet()

    # Title
    elements.append(
        Paragraph("AutoComplyAI Security Analysis Report", styles["Title"])
    )
    elements.append(Spacer(1, 0.4 * inch))

    # Summary Table
    data = [
        ["Field", "Value"],
        ["Verdict", report["verdict"]],
        ["Risk Score", report["risk_score"]],
        ["Confidence", report["confidence"]],
        ["Detection Mode", report["mode"]],
    ]

    table = Table(data, colWidths=[2.5 * inch, 3.5 * inch])

    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
                ("GRID", (0, 0), (-1, -1), 1, colors.grey),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ]
        )
    )

    elements.append(table)
    elements.append(Spacer(1, 0.4 * inch))

    # MITRE Mapping
    elements.append(
        Paragraph("MITRE ATT&CK Mapping", styles["Heading2"])
    )

    elements.append(
        ListFlowable(
            [
                ListItem(Paragraph(item, styles["Normal"]))
                for item in report["mitre_mapping"]
            ]
        )
    )

    elements.append(Spacer(1, 0.4 * inch))

    # Compliance Mapping
    elements.append(
        Paragraph("Compliance Mapping", styles["Heading2"])
    )

    elements.append(
        ListFlowable(
            [
                ListItem(Paragraph(item, styles["Normal"]))
                for item in report["compliance_mapping"]
            ]
        )
    )

    elements.append(Spacer(1, 0.4 * inch))

    # Remediation
    elements.append(
        Paragraph("Recommended Remediation", styles["Heading2"])
    )

    elements.append(
        ListFlowable(
            [
                ListItem(Paragraph(item, styles["Normal"]))
                for item in report["remediation"]
            ]
        )
    )

    doc.build(elements)

    return FileResponse(file_path, filename=file_path)


# =========================
# EXPORT JSON
# =========================

@app.get("/export/json/{scan_id}")
def export_json(scan_id: int, db: Session = Depends(get_db)):

    from datetime import datetime

    scan = db.query(Scan).filter(Scan.id == scan_id).first()

    if not scan:
        return {"error": "Scan not found"}

    report = build_report(scan)

    file_path = f"report_{scan_id}.pdf"

    doc = SimpleDocTemplate(file_path)

    elements = []
    styles = getSampleStyleSheet()

    # =========================
    # REPORT HEADER
    # =========================

    elements.append(
        Paragraph("AutoComplyAI Enterprise Security Report", styles["Title"])
    )

    elements.append(
        Paragraph("AI-Powered Phishing Detection & Compliance Analysis", styles["Heading3"])
    )

    elements.append(Spacer(1, 0.3 * inch))

    # =========================
    # REPORT METADATA
    # =========================

    generated_date = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")

    metadata = [
        ["Project", "AutoComplyAI Enterprise"],
        ["Scan ID", str(scan_id)],
        ["Generated Date", generated_date],
        ["Detection Mode", report["mode"]],
    ]

    meta_table = Table(metadata, colWidths=[2.5 * inch, 3.5 * inch])

    meta_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 1, colors.grey),
                ("BACKGROUND", (0, 0), (0, -1), colors.lightgrey),
            ]
        )
    )

    elements.append(meta_table)
    elements.append(Spacer(1, 0.4 * inch))

    # =========================
    # EXECUTIVE SUMMARY
    # =========================

    elements.append(
        Paragraph("Executive Summary", styles["Heading2"])
    )

    summary = report.get(
        "executive_summary",
        "This report summarizes the AI-driven analysis performed by AutoComplyAI."
    )

    elements.append(Paragraph(summary, styles["Normal"]))
    elements.append(Spacer(1, 0.3 * inch))

    # =========================
    # RISK SUMMARY
    # =========================

    elements.append(
        Paragraph("Risk Assessment Summary", styles["Heading2"])
    )

    risk_table_data = [
        ["Metric", "Value"],
        ["Verdict", report["verdict"]],
        ["Risk Score", report["risk_score"]],
        ["Confidence", report["confidence"]],
    ]

    risk_table = Table(risk_table_data, colWidths=[2.5 * inch, 3.5 * inch])

    risk_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
                ("GRID", (0, 0), (-1, -1), 1, colors.grey),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ]
        )
    )

    elements.append(risk_table)
    elements.append(Spacer(1, 0.4 * inch))

    # =========================
    # MITRE ATT&CK
    # =========================

    elements.append(
        Paragraph("MITRE ATT&CK Mapping", styles["Heading2"])
    )

    elements.append(
        ListFlowable(
            [
                ListItem(Paragraph(item, styles["Normal"]))
                for item in report["mitre_mapping"]
            ]
        )
    )

    elements.append(Spacer(1, 0.4 * inch))

    # =========================
    # COMPLIANCE
    # =========================

    elements.append(
        Paragraph("Compliance Mapping", styles["Heading2"])
    )

    elements.append(
        ListFlowable(
            [
                ListItem(Paragraph(item, styles["Normal"]))
                for item in report["compliance_mapping"]
            ]
        )
    )

    elements.append(Spacer(1, 0.4 * inch))

    # =========================
    # REMEDIATION
    # =========================

    elements.append(
        Paragraph("Recommended Remediation", styles["Heading2"])
    )

    elements.append(
        ListFlowable(
            [
                ListItem(Paragraph(item, styles["Normal"]))
                for item in report["remediation"]
            ]
        )
    )

    elements.append(Spacer(1, 0.4 * inch))

    # =========================
    # ANALYST GUIDE
    # =========================

    elements.append(
        Paragraph("Analyst Interpretation Guide", styles["Heading2"])
    )

    guide_text = """
    Risk Score indicates the likelihood of phishing activity based on rule-based 
    and machine learning detection models. Scores above 70 indicate high-risk 
    phishing indicators and should be investigated immediately.

    MITRE ATT&CK mappings provide insight into the adversarial tactics 
    potentially represented by the detected patterns.

    Compliance mappings identify security controls relevant to the detected 
    activity across frameworks such as ISO 27001, NIST, and GDPR.
    """

    elements.append(Paragraph(guide_text, styles["Normal"]))

    elements.append(Spacer(1, 0.5 * inch))

    # =========================
    # FOOTER
    # =========================

    elements.append(
        Paragraph(
            "Updated By: Deepika Kothamasu — AI Security Command Center",
            styles["Italic"],
        )
    )

    doc.build(elements)

    return FileResponse(file_path, filename=file_path)