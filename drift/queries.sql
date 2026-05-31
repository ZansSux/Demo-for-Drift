-- ====================================================================
-- CORAL DRIFT DETECTOR - HERO SQL QUERIES
-- ====================================================================
-- These queries show the magic of Coral. Instead of writing custom API scripts
-- to sync Notion, Linear, and GitHub, we can query all of them as standard
-- SQL tables and detect "drifts" in our development process instantly.
-- ====================================================================

-- --------------------------------------------------------------------
-- QUERY 1: REQUIREMENT DRIFT (Notion ➔ Linear)
-- Find product requirements in Notion that never got turned into Linear tasks.
-- --------------------------------------------------------------------
SELECT 
    n.feat_id AS notion_id,
    n.title AS product_specification,
    n.priority AS notion_priority,
    n.target_release
FROM notion.features AS n
LEFT JOIN linear.issues AS l ON l.notion_feature_id = n.feat_id OR l.title LIKE '%' || n.title || '%'
WHERE l.task_id IS NULL;

-- Expected Demo Result:
-- Shows "FEAT003 - PDF Invoice Auto-Generator" (High-value feature slipped through the cracks!)


-- --------------------------------------------------------------------
-- QUERY 2: SHADOW WORK DRIFT (GitHub ➔ Linear)
-- Find code merged in GitHub that has no tracking ticket in Linear.
-- --------------------------------------------------------------------
SELECT 
    gh.number AS github_pr_number,
    gh.title AS pull_request_title,
    gh.state AS github_status,
    gh.user AS developer
FROM github.pulls AS gh
LEFT JOIN linear.issues AS l ON l.github_issue_number = gh.number OR gh.title LIKE '%' || l.title || '%'
WHERE l.task_id IS NULL AND gh.state = 'merged';

-- Expected Demo Result:
-- Shows PR #2 "design: custom CSS adjustments" (SSO/Dark mode shadow work, completed but untracked!)


-- --------------------------------------------------------------------
-- QUERY 3: GHOST COMPLETION DRIFT (Linear ➔ GitHub)
-- Find tickets marked "Done" in Linear that have no code changes or PRs in GitHub.
-- --------------------------------------------------------------------
SELECT 
    l.task_id AS linear_id,
    l.title AS task_title,
    l.assignee AS developer,
    l.status AS linear_status
FROM linear.issues AS l
LEFT JOIN github.pulls AS pr ON pr.title LIKE '%' || l.title || '%' OR pr.body LIKE '%' || l.task_id || '%'
WHERE l.status = 'Done' AND pr.id IS NULL;

-- Expected Demo Result:
-- Shows "LIN101 - Implement Enterprise SSO Integration" (Alice marked it Done, but no code was ever merged!)
