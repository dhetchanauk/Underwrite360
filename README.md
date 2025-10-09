# UnderWrite360 — AI‑Powered Commercial Insurance Underwriting Platform

UnderWrite360 accelerates and standardizes commercial auto underwriting by automating submission intake, AI document parsing, third‑party risk enrichment, eligibility rules, explainable risk scoring, recommendations, and quote & bind — all in a modern web UI.

> Short description (for GitHub repo settings): AI underwriting workbench that automates doc parsing, risk enrichment, rules, scoring, and quote/bind.

## ✨ Key Capabilities
- Automated submission workflow from intake to policy binding
- AI document parsing for ACORD forms, loss runs, vehicle schedules, driver lists
- One‑click third‑party risk enrichment (MVR, credit, telematics, territory)
- Rules‑based eligibility evaluation with clear rationales
- Explainable risk scoring with score drivers
- Actionable recommendations and decision package
- Quote generation and guided binding steps

## 🧭 Underwriting Workflow
1. Overview
   - KPI tiles (pipeline, time‑to‑quote, eligibility/referral rates) and throughput chart.
2. Company Selection
   - Triage submissions with risk badges, claims history, and document availability.
3. Doc Parsing & Prefill
   - Extracts insured details, vehicles, drivers, loss history; confidence scoring; expandable results.
4. Risk Data Pull
   - Simulated MVR, credit, telematics, and territory enrichment; indicators and flags.
5. Risk Assessment & Scoring
   - Eligibility rules (Pass/Conditional) with rationales; overall score and explainable drivers.
6. Final Review & Summary
   - Decision package: status, tier, indicative premium, recommendations, positives/attention areas.
7. Quote & Bind
   - Final quote, premium breakdown, policy creation (policy number), document delivery.

## 🧱 Tech Stack
- Next.js 15 · React 19 · TypeScript
- Tailwind CSS · Radix UI · ShadCN‑style components
- Recharts (charts)

## 📁 Project Structure (high level)
```
app/
  page.tsx                # Landing page
  dashboard/page.tsx      # Wizard host
  layout.tsx              # Theme + global state providers
components/
  landing-page.tsx        # Home pitch + Start CTA
  main-layout.tsx         # Left nav + top bar + content area
  left-nav.tsx            # Stepper navigation
  top-bar.tsx             # App title + Home
  overview-step.tsx
  company-selection-step.tsx
  enhanced-doc-parsing-step.tsx
  risk-data-step.tsx
  combined-risk-assessment-step.tsx
  combined-recommendations-step.tsx
  quote-bind-step.tsx
```

## 🚀 Getting Started
Prereqs: Node.js 18.18+ (or 20+). Recommended package manager: pnpm.

### Dev (Windows PowerShell)
```powershell
cd D:\College\Internship\Trigent\underwrite-360-project
pnpm.cmd install
pnpm.cmd dev
```
Open http://localhost:3000 (Next will auto‑switch to 3001/3002 if busy).

If PowerShell blocks scripts (ExecutionPolicy), either use `pnpm.cmd` as above or run:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

### Using npm instead of pnpm
```powershell
cd D:\College\Internship\Trigent\underwrite-360-project
npm install
npm run dev
```

### Production build
```powershell
pnpm.cmd build
pnpm.cmd start
```

## 🛠️ Scripts
- dev  → Start Next.js dev server
- build → Production build
- start → Run built app
- lint  → Next lint (if configured)

## ❗ Troubleshooting
- Port already in use
  ```powershell
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  pnpm.cmd dev
  ```
- Stale cache / manifest errors (ENOENT/EPERM)
  ```powershell
  Remove-Item -Recurse -Force .next
  pnpm.cmd dev
  ```
- “Ignored build scripts: sharp” warning
  - Informational with pnpm’s safe‑build defaults. Optionally approve: `pnpm approve-builds`.

## 🧪 Demo Script (suggested talk track)
- Open Home → press Start to enter the workbench.
- Walk the left stepper; highlight KPI tiles and throughput chart.
- Select a company; note risk badge, claims, documents.
- Run “Extract All with AI”; expand results (insured details, vehicles, drivers, losses) and call out confidence.
- Pull risk data; show indicators and flags.
- Review rules evaluation (Pass/Conditional) and explainable score drivers.
- Present the decision package (status, tier, indicative premium, recommendations).
- Generate quote and bind to create a policy number; show delivery actions.

## 🔒 Notes
This repository is a demo application for showcasing underwriting automation concepts. Replace sample data and rules with your carrier guidelines and integrations before production use.


