# Zenith CRM - "Drift" Demo Scenarios

This document explains the **3 classic types of development drift** built into this demo repository. It provides the narrative backbone for your hackathon video, explaining how **Coral** can detect these gaps instantly using SQL queries.

---

### Scenario Overview
In standard product development, three sources should ideally remain aligned:
1. **Notion** (Product Specs & Requirements)
2. **Linear** (Project Management & Task Tracking)
3. **GitHub** (Actual Code Implementation & Pull Requests)

When these systems fall out of sync, we experience **"Drift."**

---

### 1. Requirement Drift (Notion ➔ Linear)
* **What it is**: The product team writes a feature specification in Notion, but it is never created as a task in Linear. It slips through the cracks and is completely forgotten by engineering.
* **In this Demo**:
  * **Notion** has feature `FEAT003`: `"PDF Invoice Auto-Generator"`.
  * **Linear** has **no** task corresponding to this feature.
* **How Coral detects it**: Coral runs a `LEFT JOIN` from Notion features to Linear tasks. Since the Linear task is `NULL`, it immediately flags this as a forgotten requirement.

---

### 2. Shadow Work Drift (GitHub ➔ Linear)
* **What it is**: A developer writes code and merges a Pull Request in GitHub, but never logs a ticket in Linear. Project managers are completely in the dark, and work is done with zero tracking or sprint planning.
* **In this Demo**:
  * **GitHub** has **Issue #3**: `"Create dark mode theme for dashboard"`, which is **Closed** because **PR #2** was successfully merged.
  * **Linear** has **no** issue tracking a dark mode feature.
* **How Coral detects it**: Coral queries the live GitHub API for closed issues or merged PRs, joins them with Linear tasks, and displays any merged code that lacks a Linear ticket.

---

### 3. Ghost Completion Drift (Linear ➔ GitHub)
* **What it is**: A developer or project manager marks a task as **"Done"** in Linear, but no actual code was ever written or merged in GitHub. The task was checked off, but the product was never delivered!
* **In this Demo**:
  * **Linear** has task `LIN101`: `"Implement Enterprise SSO Integration"`, marked as **"Done"**.
  * **GitHub** has **no** pull requests, commits, or issues indicating SSO code was ever touched or merged.
* **How Coral detects it**: Coral queries Linear tasks where `status = 'Done'`, joins them with GitHub pull requests or code commits matching the title, and flags any "completed" tasks that have zero code representation in the codebase.
