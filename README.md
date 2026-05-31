# ✦ Zenith CRM — Coral Drift Demo Repository

Welcome to **Zenith CRM**! This is a state-of-the-art mock business application specifically designed to showcase the power of **Coral** (the local-first SQL runtime for AI agents) during hackathons.

This repository features a **premium glassmorphism web dashboard** and provides a fully interactive dataset to demonstrate and test **Drift** — the sync gaps that naturally occur between **Notion** (Product Specs), **Linear** (Project Tracking), and **GitHub** (Engineering Code).

---

## 🎬 The Hackathon Demo Concept: "Project Drift"
In typical development pipelines, keeping product specifications, tracking tickets, and codebase commits aligned is incredibly manual and prone to breaking. When these systems get out of sync, we experience three classic types of **Drift**:

1. **Requirement Drift (Notion ➔ Linear)**: A product feature is specified in Notion but never created in Linear. It slips through the cracks and is forgotten by engineering.
2. **Shadow Work Drift (GitHub ➔ Linear)**: Code is written and merged in GitHub, but no ticket ever existed in Linear. Work is done completely untracked.
3. **Ghost Completion Drift (Linear ➔ GitHub)**: A task is marked "Done" in Linear, but no code or PR was ever merged in GitHub. The work is marked complete on the board, but is absent in reality.

Instead of writing complex API scripts to integrate these three distinct tools, **Coral** allows you to query all of them using standard SQL!

---

## 🚀 Quick Start Setup

### Step 1: Bootstrap the GitHub Repository
This project includes an automated script that uses the GitHub CLI (`gh`) to instantly create the exact issues, branches, and PRs required to showcase Drift.

1. Open your terminal in this repository.
2. Run the bootstrapper:
   ```bash
   ./scripts/bootstrap-github.sh
   ```
3. Follow the prompts. The script will initialize git, help you create a public/private GitHub repo, push the code, and **automatically populate it with the mock issues and PRs!**

---

### Step 2: Launch the Visual Dashboard
Open the interactive CRM dashboard to visually present the Zenith CRM codebase and its data silos.

1. Double-click [app/index.html](file:///Users/milankc/.gemini/antigravity/scratch/coral-demo-app/app/index.html) or run a simple local server:
   ```bash
   npx serve ./app
   ```
2. Navigate to the glowing **✨ Drift Monitor** tab to see the visual layout of our three drift scenarios.

---

### Step 3: Install & Register Coral
Now, configure Coral to query this data locally.

1. Install Coral:
   ```bash
   brew install withcoral/tap/coral
   ```
2. Register the local Notion & Linear mock sources so you can query them locally without needing live API tokens:
   ```bash
   coral source add --file ./coral/sources_drift.yaml
   ```
3. Connect your live GitHub repository using Coral's native GitHub connector:
   ```bash
   coral source add github
   ```

---

## 📺 Hackathon Video Walkthrough Script
Use this streamlined, high-impact **2-minute video script** for your hackathon presentation. Focus purely on demonstrating Coral in action and what it accomplishes.

### **Phase 1: The Problem (0:00 - 0:30)**
* **On Screen**: Show the **Zenith CRM Dashboard**. Click through the *Notion PRD*, *Linear Backlog*, and *GitHub Workspace* tabs.
* **Voiceover**: 
  > *"Every product team deals with data silos. Here's our application, Zenith CRM. Product managers define features in Notion, engineering tracks sprints in Linear, and developers merge code in GitHub. But because these tools don't talk to each other, they 'drift' out of sync. High-value requirements get forgotten, shadow code gets merged untracked, and tasks are marked 'Done' in Linear with zero code actually written."*
* **On Screen**: Click on the glowing **✨ Drift Monitor** tab.
  > *"Historically, fixing this meant writing hundreds of lines of complex API integration scripts. Today, we are going to show you how Coral solves this using simple, standard SQL."*

---

### **Phase 2: Introducing Coral (0:30 - 1:00)**
* **On Screen**: Open your terminal. Run:
  ```bash
  coral source discover
  ```
* **Voiceover**: 
  > *"Meet Coral. Coral is an open-source, local-first SQL runtime. It maps our local files, APIs, and databases directly into queryable SQL schemas. By typing a single command, we can discover our schemas across Notion, Linear, and GitHub."*

---

### **Phase 3: The Live Demo (1:00 - 1:45)**
* **On Screen**: Open the query tool or terminal and paste the **Requirement Drift Query**:
  ```sql
  SELECT n.feat_id, n.title AS notion_feature
  FROM notion_features n
  LEFT JOIN linear_issues l ON l.notion_feature_id = n.feat_id
  WHERE l.task_id IS NULL;
  ```
* **Voiceover**: 
  > *"Let's run a simple SQL query. We'll LEFT JOIN our product specs in Notion with our sprint tasks in Linear. Instantly, Coral queries our sources and flags that our 'PDF Invoice Auto-Generator' spec has slipped through the cracks. No Linear ticket exists."*

* **On Screen**: Run the **Shadow Work Query** (joining GitHub and Linear):
  ```sql
  -- Assumes your github connector is active
  SELECT gh.number, gh.title AS github_pr
  FROM github.pulls gh
  LEFT JOIN linear_issues l ON l.github_issue_number = gh.number
  WHERE l.task_id IS NULL AND gh.state = 'merged';
  ```
* **Voiceover**: 
  > *"What about shadow work? Let's query our live GitHub API through Coral. We join our merged pull requests with our Linear issues. Boom! Coral flags that a developer merged a 'dark mode' theme on GitHub, but never tracked it in Linear. Our sprint metrics are safe again."*

* **On Screen**: Run the **Ghost Completion Query** (sprints vs commits):
  ```sql
  SELECT l.task_id, l.title AS task_title
  FROM linear_issues l
  LEFT JOIN github.pulls pr ON pr.title LIKE '%' || l.title || '%'
  WHERE l.status = 'Done' AND pr.id IS NULL;
  ```
* **Voiceover**: 
  > *"And finally, the classic 'Ghost Completion'. We check Linear issues marked 'Done' against merged pull requests. Coral instantly catches that 'Enterprise SSO' was marked complete, but no code was ever committed on GitHub."*

---

### **Phase 4: The Outro (1:45 - 2:00)**
* **On Screen**: Switch back to the dashboard or show the Coral logo.
* **Voiceover**: 
  > *"Coral provides a single, unified SQL interface over all our tools. It runs locally, secures your credentials, and enables AI agents and developers to query APIs, files, and live sources instantly without writing brittle integration glue code. That's the power of Coral. Thank you!"*

---

## 🛠️ Hero Queries Cheat Sheet

All demo queries are neatly organized and fully commented inside [drift/queries.sql](file:///Users/milankc/.gemini/antigravity/scratch/coral-demo-app/drift/queries.sql) for easy copy-pasting during your screen recording!
