#!/bin/bash
# ====================================================================
# ZENITH CRM - GITHUB DRIFT DEMO BOOTSTRAPPER
# ====================================================================
# This script automates the creation of mock issues and pull requests
# in your GitHub repository, so you have a perfect live dataset to test
# Drift and record your Coral hackathon demo video!
# ====================================================================

set -e

# Color helpers for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}       Zenith CRM - GitHub Bootstrapper for Drift      ${NC}"
echo -e "${BLUE}======================================================${NC}"

# 1. Check if Git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}[!] Git is not initialized. Initializing local git repository...${NC}"
    git init -b main
    git add .
    git commit -m "initial: setup Zenith CRM business app"
    echo -e "${GREEN}[✓] Local git repository initialized and committed!${NC}"
fi

# 2. Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}[✗] GitHub CLI ('gh') is not installed.${NC}"
    echo -e "${YELLOW}Please install it via Homebrew: brew install gh${NC}"
    echo -e "${YELLOW}Then authenticate using: gh auth login${NC}"
    exit 1
fi

# 3. Check if gh CLI is authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}[✗] GitHub CLI is not authenticated.${NC}"
    echo -e "${YELLOW}Please run: gh auth login${NC}"
    exit 1
fi

echo -e "${GREEN}[✓] GitHub CLI is installed and authenticated!${NC}"

# 4. Check if remote origin is set
# If it points to the read-only upstream repository, remove it so we can create a personal demo repo
if git remote get-url origin &> /dev/null; then
    ORIGIN_URL=$(git remote get-url origin)
    if [[ "$ORIGIN_URL" == *"ZansSux/Demo-for-Drift"* ]]; then
        echo -e "${YELLOW}[!] Remote 'origin' points to the read-only upstream repository: ZansSux/Demo-for-Drift${NC}"
        echo -e "We will remove this remote and help you set up your own repository for the Drift demo."
        git remote remove origin
    fi
fi

if ! git remote get-url origin &> /dev/null; then
    echo -e "${YELLOW}[!] No writeable remote 'origin' detected.${NC}"
    echo -e "We will help you create a remote repository on GitHub now."
    if [ -n "$1" ]; then
        REPO_NAME="$1"
        echo -e "Using repository name from argument: ${YELLOW}$REPO_NAME${NC}"
    else
        echo -e "Please enter a name for your GitHub demo repository (default: ${YELLOW}coral-drift-demo${NC}): "
        read -r REPO_NAME
        REPO_NAME=${REPO_NAME:-coral-drift-demo}
    fi

    echo -e "${BLUE}[*] Creating GitHub repository '${REPO_NAME}'...${NC}"
    gh repo create "$REPO_NAME" --public --source=. --push
    echo -e "${GREEN}[✓] GitHub repository created and code pushed to origin!${NC}"
else
    echo -e "${GREEN}[✓] Remote origin detected: $(git remote get-url origin)${NC}"
fi

# 5. Bootstrap Issues & PRs
echo -e "\n${BLUE}[*] Bootstrapping mock issues to demonstrate Drift...${NC}"

# Issue 1 (SSO Callback Timeout - Mapped to Linear LIN103)
echo -e " - Creating Issue #1: SSO callback timeout..."
ISSUE_1_NUM=$(gh issue create \
  --title "SSO login page timeout on WayneCorp intranet" \
  --body "WayneCorp intranet users reporting logins timing out on callback authentication. Mapped to Linear task LIN103." \
  --label "bug" \
  --json number --jq '.number')

# Issue 2 (Multi-currency Checkout - Mapped to Linear LIN104)
echo -e " - Creating Issue #2: Multi-currency checkout..."
ISSUE_2_NUM=$(gh issue create \
  --title "Add support for GBP and EUR in checkout" \
  --body "Checkout system needs multi-currency capabilities for CAD, GBP, EUR. Mapped to Linear task LIN104." \
  --label "enhancement" \
  --json number --jq '.number')

# Issue 3 (Dark Mode Theme - Mapped to nothing! Shadow Work!)
echo -e " - Creating Issue #3: Sleek dark mode styling..."
ISSUE_3_NUM=$(gh issue create \
  --title "Create dark mode theme for dashboard" \
  --body "Product wants custom HSL glassmorphism dark theme for Zenith CRM dashboard. Mapped to nothing in Linear (Shadow Work)." \
  --label "design" \
  --json number --jq '.number')

echo -e "${GREEN}[✓] GitHub Issues successfully created!${NC}"

# 6. Bootstrap Pull Requests
echo -e "\n${BLUE}[*] Bootstrapping commits & Pull Requests to demonstrate Drift...${NC}"

# Check current branch name
CURRENT_BRANCH=$(git branch --show-current)

# PR 1 for Multi-currency Checkout (Open PR)
echo -e " - Creating Branch & Open PR for Multi-currency checkout..."
git checkout -B feat/multi-currency
mkdir -p app/js
echo "// Multi-currency exchange rate mapping logic" >> app/js/app.js
git add app/js/app.js
git commit -m "feat: implement GBP and EUR exchange support"
git push -u origin feat/multi-currency

gh pr create \
  --title "feat: add currency selector to checkout" \
  --body "Adds checkout UI selector for GBP and EUR, pulling exchange rates. Closes #$ISSUE_2_NUM. Mapped to LIN104." \
  --head feat/multi-currency

# PR 2 for Shadow Work (Dark Mode Theme - Merged PR!)
echo -e " - Creating Branch & Merged PR for Sleek Dark Mode..."
git checkout "$CURRENT_BRANCH"
git checkout -B design/dark-mode
echo "/* Dark Mode Theme custom CSS overrides */" >> app/css/style.css
git add app/css/style.css
git commit -m "design: add sleek dark mode glassmorphism styles"
git push -u origin design/dark-mode

# Create PR
PR_2_URL=$(gh pr create \
  --title "design: custom CSS adjustments for sleek dark mode" \
  --body "Resolves dashboard styling custom request. Closes #$ISSUE_3_NUM. Shadow work completed." \
  --head design/dark-mode)

# Merge the PR!
echo -e " - Merging PR for Shadow Work..."
gh pr merge --merge --delete-branch "$PR_2_URL"

# Return to main branch
git checkout "$CURRENT_BRANCH"
git pull origin "$CURRENT_BRANCH" || true

echo -e "\n${GREEN}======================================================${NC}"
echo -e "${GREEN}      GitHub Drift Dataset Successfully Bootstrapped! ${NC}"
echo -e "${GREEN}======================================================${NC}"
echo -e "Your GitHub repo is now perfectly populated with:"
echo -e "  - ${YELLOW}Issue #1${NC}: SSO timeout bug (Open, tracks Linear backlog)"
echo -e "  - ${YELLOW}Issue #2${NC}: Multi-currency checkout (Open, tracks Linear Todo)"
echo -e "  - ${YELLOW}Issue #3${NC}: Dark Mode (Closed/Merged, Shadow Work - NO Linear task!)"
echo -e "  - ${YELLOW}PR #1${NC}: Multi-currency selection (Open, links to Issue #2)"
echo -e "  - ${YELLOW}PR #2${NC}: Dark Mode design (Merged, links to Issue #3)"
echo -e "  - ${RED}SSO Codebase${NC}: Zero PRs or Commits! (Ghost Completion - Linear says Done!)"
echo -e "\nYou are now ready to run Coral and record your demo video! 🎬"
echo -e "======================================================\n"