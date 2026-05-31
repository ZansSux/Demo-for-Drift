/* ====================================================================
   ZENITH CRM - INTERACTIVE DASHBOARD CORE LOGIC
   ==================================================================== */

// Fallback Mock Databases - Used when running via file:/// (No CORS support in browsers)
let NOTION_PRD = [
  {
    "feat_id": "FEAT001",
    "title": "User Authentication via Enterprise SSO",
    "description": "Enable enterprise clients to sign in using SAML 2.0 / OIDC (Okta, Azure AD, Ping Identity). Needs full admin panel control for SSO configurations.",
    "priority": "High",
    "target_release": "v2.1"
  },
  {
    "feat_id": "FEAT002",
    "title": "E-Commerce Order Analytics Dashboard",
    "description": "A comprehensive visualization panel in the CRM for tracking e-commerce orders, total revenue, refund rates, and product categories.",
    "priority": "Medium",
    "target_release": "v2.1"
  },
  {
    "feat_id": "FEAT003",
    "title": "PDF Invoice Auto-Generator",
    "description": "Automatically generate PDF invoices upon successful checkout and email them to customers. Must comply with regional tax formatting.",
    "priority": "Medium",
    "target_release": "v2.2"
  },
  {
    "feat_id": "FEAT004",
    "title": "Multi-currency checkout support",
    "description": "Allow checkout transactions in USD, EUR, GBP, and CAD, automatically pulling live FX exchange rates twice daily.",
    "priority": "Low",
    "target_release": "v2.3"
  }
];

let LINEAR_ISSUES = [
  {
    "task_id": "LIN101",
    "title": "Implement Enterprise SSO Integration",
    "status": "Done",
    "assignee": "Alice Smith",
    "priority": "High",
    "github_issue_number": null,
    "notion_feature_id": "FEAT001"
  },
  {
    "task_id": "LIN102",
    "title": "Build Order Analytics UI Component",
    "status": "In Progress",
    "assignee": "Bob Johnson",
    "priority": "Medium",
    "github_issue_number": null,
    "notion_feature_id": "FEAT002"
  },
  {
    "task_id": "LIN103",
    "title": "Fix SSO Callback redirection bug",
    "status": "Backlog",
    "assignee": "Alice Smith",
    "priority": "High",
    "github_issue_number": 1,
    "notion_feature_id": "FEAT001"
  },
  {
    "task_id": "LIN104",
    "title": "Implement Multi-currency support in checkout",
    "status": "Todo",
    "assignee": "Charlie Brown",
    "priority": "Low",
    "github_issue_number": 2,
    "notion_feature_id": "FEAT004"
  }
];

const GITHUB_WORKSPACE = {
  issues: [
    { "number": 1, "title": "SSO login page timeout on WayneCorp intranet", "state": "open", "type": "bug", "linked_task": "LIN103" },
    { "number": 2, "title": "Add support for GBP and EUR in checkout", "state": "open", "type": "enhancement", "linked_task": "LIN104" },
    { "number": 3, "title": "Create dark mode theme for dashboard", "state": "closed", "type": "design", "linked_task": null }
  ],
  pulls: [
    { "number": 1, "title": "feat: add currency selector to checkout", "state": "open", "author": "charlie_dev", "linked_issue": 2 },
    { "number": 2, "title": "design: custom CSS adjustments for sleek dark mode", "state": "merged", "author": "charlie_dev", "linked_issue": 3 }
  ]
};

let CRM_CUSTOMERS = [
  { "id": "CUST001", "name": "Sarah Connor", "email": "sarah.c@cyberdyne.com", "company": "Cyberdyne Systems", "tier": "Enterprise", "spend": 2500.00 },
  { "id": "CUST002", "name": "Bruce Wayne", "email": "bruce@waynecorp.com", "company": "Wayne Enterprises", "tier": "Enterprise", "spend": 5000.00 },
  { "id": "CUST003", "name": "Tony Stark", "email": "tony@starkindustries.com", "company": "Stark Industries", "tier": "Enterprise", "spend": 7500.00 },
  { "id": "CUST004", "name": "Peter Parker", "email": "peter.p@dailybugle.com", "company": "Daily Bugle", "tier": "Pro", "spend": 150.00 },
  { "id": "CUST005", "name": "Clark Kent", "email": "clark.k@dailyplanet.com", "company": "Daily Planet", "tier": "Pro", "spend": 150.00 },
  { "id": "CUST006", "name": "Diana Prince", "email": "diana@museum.org", "company": "The Louvre", "tier": "Enterprise", "spend": 3000.00 },
  { "id": "CUST007", "name": "Barry Allen", "email": "barry.a@ccpd.gov", "company": "Central City Police", "tier": "Free", "spend": 0.00 },
  { "id": "CUST008", "name": "Hal Jordan", "email": "hal.j@ferris.com", "company": "Ferris Aircraft", "tier": "Pro", "spend": 120.00 },
  { "id": "CUST009", "name": "Arthur Curry", "email": "arthur@atlantis.gov", "company": "Atlantis Marine", "tier": "Free", "spend": 0.00 },
  { "id": "CUST010", "name": "Selina Kyle", "email": "selina@gothamcats.com", "company": "Gotham Feline Rescue", "tier": "Pro", "spend": 120.00 }
];

let CRM_TICKETS = [
  { "id": "TKT001", "customer_id": "CUST002", "subject": "Login page timeout on WayneCorp intranet", "priority": "high", "status": "open", "created_at": "2026-05-28", "github_issue_number": 1 },
  { "id": "TKT002", "customer_id": "CUST003", "subject": "Stark Core Infrastructure Pack API throws 500 error", "priority": "high", "status": "open", "created_at": "2026-05-29", "github_issue_number": 2 },
  { "id": "TKT003", "customer_id": "CUST001", "subject": "Database sync latency exceeding SLAs", "priority": "medium", "status": "open", "created_at": "2026-05-29", "github_issue_number": 3 },
  { "id": "TKT004", "customer_id": "CUST004", "subject": "UI typo in profile setting page", "priority": "low", "status": "open", "created_at": "2026-05-30", "github_issue_number": 4 },
  { "id": "TKT005", "customer_id": "CUST005", "subject": "Invoice email not sending automatically", "priority": "medium", "status": "closed", "created_at": "2026-05-25", "github_issue_number": null },
  { "id": "TKT006", "customer_id": "CUST006", "subject": "Enterprise SSO configuration fails", "priority": "high", "status": "open", "created_at": "2026-05-30", "github_issue_number": 5 },
  { "id": "TKT007", "customer_id": "CUST008", "subject": "Starter pack billing renewal failed", "priority": "medium", "status": "open", "created_at": "2026-05-31", "github_issue_number": null },
  { "id": "TKT008", "customer_id": "CUST010", "subject": "Cannot delete outdated contacts", "priority": "low", "status": "closed", "created_at": "2026-05-26", "github_issue_number": null }
];

document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  await loadDataFromSources();
  renderCRMDashboard();
  renderCRMTickets();
  renderNotionSpecs();
  renderLinearBacklog();
  renderGitHubWorkspace();
  renderDriftMonitor();
  updateMetrics();
});

// Setup active tab panel switching
function setupNavigation() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPanelId = button.getAttribute('data-target');

      // Remove active states
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Add active state to selected
      button.classList.add('active');
      const targetEl = document.getElementById(targetPanelId);
      if (targetEl) targetEl.classList.add('active');
    });
  });
}

// Zero-dependency CSV Parser
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  return lines.slice(1).map(line => {
    const values = [];
    let insideQuote = false;
    let currentVal = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        values.push(currentVal.trim().replace(/^["']|["']$/g, ''));
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim().replace(/^["']|["']$/g, ''));
    
    const obj = {};
    headers.forEach((header, index) => {
      let val = values[index];
      if (val === undefined || val === 'null' || val === '') {
        val = null;
      } else if (!isNaN(val) && val.trim() !== '') {
        val = parseFloat(val);
      }
      obj[header] = val;
    });
    return obj;
  });
}

// Load data files dynamically
async function loadDataFromSources() {
  console.log("Zenith CRM: Attempting to dynamically load datasets from source files...");
  
  const dataPrefix = '../data/';
  const driftPrefix = '../drift/';

  try {
    const notionRes = await fetch(driftPrefix + 'notion_prd_mock.json');
    if (notionRes.ok) {
      NOTION_PRD = await notionRes.json();
      console.log("  [✓] Loaded Notion Specs:", NOTION_PRD.length);
    }
  } catch (e) {
    console.warn("  [!] Failed to load notion_prd_mock.json (using fallback):", e.message);
  }

  try {
    const linearRes = await fetch(driftPrefix + 'linear_issues_mock.json');
    if (linearRes.ok) {
      LINEAR_ISSUES = await linearRes.json();
      console.log("  [✓] Loaded Linear Issues:", LINEAR_ISSUES.length);
    }
  } catch (e) {
    console.warn("  [!] Failed to load linear_issues_mock.json (using fallback):", e.message);
  }

  try {
    const customersRes = await fetch(dataPrefix + 'customers.csv');
    if (customersRes.ok) {
      const csvText = await customersRes.text();
      const parsed = parseCSV(csvText);
      if (parsed.length > 0) {
        CRM_CUSTOMERS = parsed.map(c => {
          c.spend = c.monthly_spend !== undefined ? c.monthly_spend : c.spend;
          return c;
        });
        console.log("  [✓] Loaded Customer Ledger:", CRM_CUSTOMERS.length);
      }
    }
  } catch (e) {
    console.warn("  [!] Failed to load customers.csv (using fallback):", e.message);
  }

  try {
    const ticketsRes = await fetch(dataPrefix + 'support_tickets.csv');
    if (ticketsRes.ok) {
      const csvText = await ticketsRes.text();
      const parsed = parseCSV(csvText);
      if (parsed.length > 0) {
        CRM_TICKETS = parsed;
        console.log("  [✓] Loaded Support Tickets:", CRM_TICKETS.length);
      }
    }
  } catch (e) {
    console.warn("  [!] Failed to load support_tickets.csv (using fallback):", e.message);
  }
}

// Update the metric card totals
function updateMetrics() {
  const totalSpend = CRM_CUSTOMERS.reduce((sum, c) => sum + (c.spend || 0), 0);
  const activeTickets = CRM_TICKETS.filter(t => t.status === 'open').length;
  const enterpriseAccounts = CRM_CUSTOMERS.filter(c => c.tier === 'Enterprise').length;

  const totalSpendEl = document.querySelector('.metric-card:nth-child(1) .metric-value');
  const activeTicketsEl = document.querySelector('.metric-card.secondary .metric-value');
  const enterpriseAccountsEl = document.querySelector('.metric-card.warning .metric-value');

  if (totalSpendEl) totalSpendEl.textContent = `$${totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (activeTicketsEl) activeTicketsEl.textContent = activeTickets;
  if (enterpriseAccountsEl) enterpriseAccountsEl.textContent = enterpriseAccounts;
}

// Render CRM Dashboard Ledger
function renderCRMDashboard() {
  const tableBody = document.querySelector('#crm-customers-table tbody');
  if (!tableBody) return;

  tableBody.innerHTML = CRM_CUSTOMERS.map(c => `
    <tr>
      <td><span style="font-family: monospace; color: var(--secondary);">${c.id}</span></td>
      <td><strong>${c.name}</strong></td>
      <td style="color: var(--text-secondary);">${c.company}</td>
      <td><span class="badge ${c.tier === 'Enterprise' ? 'success' : c.tier === 'Pro' ? 'info' : 'warning'}">${c.tier}</span></td>
      <td style="font-family: monospace; text-align: right; font-weight: 500;">$${(c.spend || 0).toFixed(2)}</td>
    </tr>
  `).join('');
}

// Render CRM Support Tickets
function renderCRMTickets() {
  const tableBody = document.querySelector('#crm-tickets-table tbody');
  if (!tableBody) return;

  tableBody.innerHTML = CRM_TICKETS.map(t => `
    <tr>
      <td><span style="font-family: monospace; color: var(--color-warning);">${t.id}</span></td>
      <td><span style="font-family: monospace; color: var(--text-muted);">${t.customer_id}</span></td>
      <td><strong>${t.subject}</strong></td>
      <td><span class="badge ${t.priority === 'high' ? 'danger' : t.priority === 'medium' ? 'warning' : 'info'}">${t.priority}</span></td>
      <td><span class="badge ${t.status === 'open' ? 'warning' : 'success'}">${t.status}</span></td>
      <td style="font-family: monospace; color: var(--accent-gold);">${t.github_issue_number ? '#' + t.github_issue_number : '-'}</td>
    </tr>
  `).join('');
}

// Render Notion PRD Panel
function renderNotionSpecs() {
  const grid = document.getElementById('notion-prd-grid');
  if (!grid) return;

  grid.innerHTML = NOTION_PRD.map(f => `
    <div class="glass-card data-card">
      <div>
        <div class="card-header">
          <span class="card-id">${f.feat_id}</span>
          <span class="badge ${f.priority === 'High' ? 'danger' : f.priority === 'Medium' ? 'warning' : 'info'}">${f.priority} Priority</span>
        </div>
        <h3 class="card-title">${f.title}</h3>
        <p class="card-body">${f.description}</p>
      </div>
      <div class="card-footer">
        <div class="card-meta-item">📦 Release: <strong>${f.target_release}</strong></div>
        <div class="card-meta-item">📝 Source: Notion</div>
      </div>
    </div>
  `).join('');
}

// Render Linear Backlog Panel
function renderLinearBacklog() {
  const tableBody = document.querySelector('#linear-table tbody');
  if (!tableBody) return;

  tableBody.innerHTML = LINEAR_ISSUES.map(t => `
    <tr>
      <td><span style="font-family: monospace; color: var(--secondary);">${t.task_id}</span></td>
      <td><strong>${t.title}</strong></td>
      <td style="color: var(--text-secondary);">${t.assignee}</td>
      <td>
        <span class="badge ${
          t.status === 'Done' ? 'success' : 
          t.status === 'In Progress' ? 'warning' : 'info'
        }">${t.status}</span>
      </td>
      <td><span class="badge ${t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'warning' : 'success'}">${t.priority}</span></td>
      <td style="font-family: monospace; color: var(--accent-gold);">${t.github_issue_number ? '#' + t.github_issue_number : '-'}</td>
    </tr>
  `).join('');
}

// Render GitHub Workspace lists
function renderGitHubWorkspace() {
  const issuesBody = document.querySelector('#github-issues-table tbody');
  const pullsBody = document.querySelector('#github-pulls-table tbody');

  if (issuesBody) {
    issuesBody.innerHTML = GITHUB_WORKSPACE.issues.map(i => `
      <tr>
        <td><span style="font-family: monospace; color: var(--secondary);">#${i.number}</span></td>
        <td><strong>${i.title}</strong></td>
        <td><span class="badge ${i.type === 'bug' ? 'danger' : i.type === 'design' ? 'info' : 'warning'}">${i.type}</span></td>
        <td><span class="badge ${i.state === 'closed' ? 'success' : 'warning'}">${i.state}</span></td>
        <td style="font-family: monospace; color: var(--text-muted);">${i.linked_task ? i.linked_task : 'None'}</td>
      </tr>
    `).join('');
  }

  if (pullsBody) {
    pullsBody.innerHTML = GITHUB_WORKSPACE.pulls.map(p => `
      <tr>
        <td><span style="font-family: monospace; color: var(--secondary);">#${p.number}</span></td>
        <td><strong>${p.title}</strong></td>
        <td><span style="font-family: monospace; color: var(--text-secondary);">${p.author}</span></td>
        <td>
          <span class="badge ${
            p.state === 'merged' ? 'success' : 'warning'
          }">${p.state}</span>
        </td>
        <td style="font-family: monospace; color: var(--accent-gold);">#${p.linked_issue}</td>
      </tr>
    `).join('');
  }
}

// Render Drift Monitor Calculations
function renderDriftMonitor() {
  const driftGrid = document.getElementById('drift-list-container');
  if (!driftGrid) return;

  const drifts = [
    {
      type: "Requirement Drift",
      title: "Feature Slipped Through Cracks (Notion ➔ Linear)",
      desc: "Product requirements exist in Notion, but no tracking issue was ever created in Linear. The engineering team has zero visibility of this commitment.",
      impact: "Feature is completely forgotten and will fail to release in target version.",
      details: [
        { label: "Notion Spec ID", val: "FEAT003" },
        { label: "Specification Title", val: "PDF Invoice Auto-Generator" },
        { label: "Linear Ticket Status", val: "🚨 MISSING (NULL)" }
      ],
      query: `SELECT n.feat_id, n.title\nFROM notion.features n\nLEFT JOIN linear.issues l ON l.notion_feature_id = n.feat_id\nWHERE l.task_id IS NULL;`
    },
    {
      type: "Shadow Work Drift",
      title: "Untracked Code Deliverables (GitHub ➔ Linear)",
      desc: "Pull request merged and issue closed in GitHub, but no Linear ticket was ever created. Developers are performing untracked shadow work outside of sprint plans.",
      impact: "Engineering capacity metrics are highly inaccurate, and managers are out of the loop.",
      details: [
        { label: "GitHub Closed Issue", val: "#3 Create dark mode theme" },
        { label: "GitHub Merged PR", val: "#2 design: custom CSS adjustments" },
        { label: "Linear Task Status", val: "🚨 UNTRACKED (NULL)" }
      ],
      query: `SELECT gh.number, gh.title\nFROM github.pulls gh\nLEFT JOIN linear.issues l ON gh.number = l.github_issue_number\nWHERE l.task_id IS NULL AND gh.state = 'merged';`
    },
    {
      type: "Ghost Completion Drift",
      title: "Premature Ticket Closure (Linear ➔ GitHub)",
      desc: "A task is marked as 'Done' in Linear, but no code changes or merged Pull Requests exist in GitHub. The work is marked complete on the board, but is absent in reality.",
      impact: "Product release is broken. Stakeholders assume a feature exists when it doesn't.",
      details: [
        { label: "Linear Task ID", val: "LIN101" },
        { label: "Task Title", val: "Implement Enterprise SSO Integration" },
        { label: "GitHub PR Status", val: "🚨 GHOST (No commits/PRs found)" }
      ],
      query: `SELECT l.task_id, l.title\nFROM linear.issues l\nLEFT JOIN github.pulls pr ON pr.title LIKE '%' || l.title || '%'\nWHERE l.status = 'Done' AND pr.id IS NULL;`
    }
  ];

  driftGrid.innerHTML = drifts.map((d, index) => `
    <div class="glass-card drift-card">
      <div class="drift-header-section">
        <span class="drift-type-badge">${d.type}</span>
        <h3 class="drift-title">${d.title}</h3>
        <p class="drift-description">${d.desc}</p>
        <div class="drift-impact">
          <span>⚠️</span>
          <strong>Impact:</strong> ${d.impact}
        </div>
      </div>
      <div class="drift-demo-section">
        <div class="drift-compare">
          ${d.details.map(item => `
            <div class="compare-item">
              <span>${item.label}</span>
              <span class="val ${item.val.includes('🚨') ? 'trend-down' : ''}">${item.val}</span>
            </div>
          `).join('')}
        </div>
        <div class="drift-query-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <h4>Coral SQL Drift Detector</h4>
            <button class="run-query-btn" onclick="simulateQuery(${index})">⚡ Run Simulation</button>
          </div>
          <pre><code>${d.query}</code></pre>
          <div class="query-results-container" id="query-results-${index}" style="display: none; margin-top: 1rem;">
            <!-- Sim results go here -->
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Simulates Coral SQL Query Engine in the UI
window.simulateQuery = function(index) {
  const container = document.getElementById(`query-results-${index}`);
  if (!container) return;

  // Toggle open/close if already populated
  if (container.style.display === 'block' && container.getAttribute('data-active') === 'true') {
    container.style.display = 'none';
    container.setAttribute('data-active', 'false');
    return;
  }

  container.style.display = 'block';
  container.setAttribute('data-active', 'true');
  container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem; font-family: var(--font-mono);">Executing local Coral SQL engine...</div>`;

  setTimeout(() => {
    let data = [];
    let headers = [];

    if (index === 0) { // Requirement Drift
      data = NOTION_PRD.filter(n => !LINEAR_ISSUES.some(l => l.notion_feature_id === n.feat_id || l.title.includes(n.title)))
        .map(n => ({ "notion_id": n.feat_id, "product_specification": n.title, "notion_priority": n.priority, "target_release": n.target_release }));
      headers = ["Notion ID", "Product Specification", "Notion Priority", "Target Release"];
    } else if (index === 1) { // Shadow Work Drift
      data = GITHUB_WORKSPACE.pulls.filter(pr => pr.state === 'merged' && !LINEAR_ISSUES.some(l => l.github_issue_number === pr.number || pr.title.includes(l.title)))
        .map(pr => ({ "github_pr_number": `#${pr.number}`, "pull_request_title": pr.title, "developer": pr.author, "github_status": pr.state }));
      headers = ["GitHub PR Number", "Pull Request Title", "Developer", "GitHub Status"];
    } else if (index === 2) { // Ghost Completion Drift
      data = LINEAR_ISSUES.filter(l => l.status === 'Done' && !GITHUB_WORKSPACE.pulls.some(pr => pr.title.includes(l.title) || (pr.linked_issue === l.github_issue_number && l.github_issue_number !== null)))
        .map(l => ({ "linear_id": l.task_id, "task_title": l.title, "developer": l.assignee, "linear_status": l.status }));
      headers = ["Linear ID", "Task Title", "Developer", "Linear Status"];
    }

    if (data.length === 0) {
      container.innerHTML = `<div style="color: var(--color-success); font-size: 0.85rem; padding: 0.5rem; background: rgba(16, 185, 129, 0.1); border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.2); font-family: var(--font-sans);">No sync drift detected. Systems aligned!</div>`;
      return;
    }

    // Build query table response UI
    const headerCols = headers.map(h => `<th style="font-size: 0.75rem; padding: 0.5rem; text-transform: uppercase;">${h}</th>`).join('');
    const rows = data.map(row => {
      const keys = Object.keys(row);
      const cols = keys.map(k => {
        let val = row[k];
        let style = '';
        if (k === 'notion_id' || k === 'github_pr_number' || k === 'linear_id') {
          style = 'font-family: monospace; color: var(--secondary);';
        }
        return `<td style="font-size: 0.8rem; padding: 0.5rem 0.6rem; ${style}">${val}</td>`;
      }).join('');
      return `<tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">${cols}</tr>`;
    }).join('');

    container.innerHTML = `
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem; font-family: var(--font-mono);">
        Query execution complete (${data.length} row${data.length > 1 ? 's' : ''} returned)
      </div>
      <table style="width: 100%; border-collapse: collapse; text-align: left; background: #0c0d14; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 6px; overflow: hidden;">
        <thead>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02);">
            ${headerCols}
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }, 400);
};