/* ====================================================================
   ZENITH CRM - INTERACTIVE DASHBOARD CORE LOGIC
   ==================================================================== */

// Mock Databases - Inlined to allow direct file:/// loading in browser (No CORS blocks!)
const NOTION_PRD = [
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

const LINEAR_ISSUES = [
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

const CRM_CUSTOMERS = [
  { "id": "CUST001", "name": "Sarah Connor", "email": "sarah.c@cyberdyne.com", "company": "Cyberdyne Systems", "tier": "Enterprise", "spend": 2500.00 },
  { "id": "CUST002", "name": "Bruce Wayne", "email": "bruce@waynecorp.com", "company": "Wayne Enterprises", "tier": "Enterprise", "spend": 5000.00 },
  { "id": "CUST003", "name": "Tony Stark", "email": "tony@starkindustries.com", "company": "Stark Industries", "tier": "Enterprise", "spend": 7500.00 },
  { "id": "CUST004", "name": "Peter Parker", "email": "peter.p@dailybugle.com", "company": "Daily Bugle", "tier": "Pro", "spend": 150.00 },
  { "id": "CUST005", "name": "Clark Kent", "email": "clark.k@dailyplanet.com", "company": "Daily Planet", "tier": "Pro", "spend": 150.00 }
];

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  renderCRMDashboard();
  renderNotionSpecs();
  renderLinearBacklog();
  renderGitHubWorkspace();
  renderDriftMonitor();
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
      document.getElementById(targetPanelId).classList.add('active');
    });
  });
}

// Render CRM Dashboard lists
function renderCRMDashboard() {
  const tableBody = document.querySelector('#crm-customers-table tbody');
  if (!tableBody) return;

  tableBody.innerHTML = CRM_CUSTOMERS.map(c => `
    <tr>
      <td><span style="font-family: monospace; color: var(--secondary);">${c.id}</span></td>
      <td><strong>${c.name}</strong></td>
      <td style="color: var(--text-secondary);">${c.company}</td>
      <td><span class="badge ${c.tier === 'Enterprise' ? 'success' : 'info'}">${c.tier}</span></td>
      <td style="font-family: monospace; text-align: right; font-weight: 500;">$${c.spend.toFixed(2)}</td>
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
          <span class="badge ${f.priority === 'High' ? 'danger' : 'warning'}">${f.priority} Priority</span>
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

  driftGrid.innerHTML = drifts.map(d => `
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
          <h4>Coral SQL Drift Detector</h4>
          <pre><code>${d.query}</code></pre>
        </div>
      </div>
    </div>
  `).join('');
}
