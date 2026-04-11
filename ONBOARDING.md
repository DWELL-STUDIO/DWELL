# DWELL — Collaborator Onboarding Guide

Welcome to the DWELL codebase. Follow these steps to get set up and start collaborating.

---

## Prerequisites

Before you start, make sure you have the following installed on your machine:

- **Git** — [download here](https://git-scm.com/downloads)
- **VS Code** — [download here](https://code.visualstudio.com/)
- A **GitHub account** — [create one here](https://github.com/join)

---

## Step 1 — Get access to the repository

You have already been added as a collaborator on the private repo: `https://github.com/Ttui81/DWELL`

Check your email for a **GitHub invitation** and accept it. Once accepted, you'll have full read/write access.

---

## Step 2 — Clone the repository

Once you have access, open your terminal and run:

```bash
git clone https://github.com/Ttui81/DWELL.git
```

This will download the full project to your machine in a folder called `DWELL`.

Then navigate into the folder:

```bash
cd DWELL
```

---

## Step 3 — Open in VS Code

Open the project in VS Code:

```bash
code .
```

Or open VS Code manually and use **File → Open Folder** and select the `DWELL` folder.

---

## Step 4 — Configure Git with your identity

If this is your first time using Git on this machine, set your name and email (use the same email as your GitHub account):

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## Step 5 — Live collaboration with VS Code Live Share

Live Share lets you and Matteo edit the same files in real time, share a terminal, and see each other's cursors live.

### Install Live Share

1. Open VS Code
2. Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows) to open Extensions
3. Search for **"Live Share"** by Microsoft and click **Install**

### Sign in to Live Share

1. Click the **Live Share** button in the bottom status bar
2. Choose **"Sign in with GitHub"** — it will open the browser to authenticate with your GitHub account (`romeomaigray`)

### Join a session

When Matteo starts a session, he'll send you a link that looks like:
`https://prod.liveshare.vsengsaas.visualstudio.com/join?...`

1. Press `Cmd+Shift+P` → type **"Live Share: Join Collaboration Session"**
2. Paste the link Matteo sent you and press Enter
3. You're in — you'll see Matteo's cursor and he'll see yours

---

## Step 6 — Day-to-day workflow

### Pull the latest changes before you start working

Always start your session by pulling the latest code from GitHub:

```bash
git pull origin main
```

### Make your changes

Edit files in VS Code as needed. The main files you'll work with are in the `01_WEBSITE/` folder.

### Stage and commit your changes

When you're happy with your changes, save them with a commit:

```bash
git add .
git commit -m "Short description of what you changed"
```

### Push your changes to GitHub

```bash
git push origin main
```

---

## Project structure

```
DWELL/
├── 01_WEBSITE/          # Main website files
│   ├── index.html       # Homepage
│   ├── css/style.css    # Stylesheet
│   ├── js/main.js       # JavaScript
│   ├── assets/          # Images (team, projects)
│   └── properties/      # Individual property pages
│       ├── formentera/
│       └── linkebeek/
├── BRAND.md             # Brand guidelines
├── IMAGES.md            # Image documentation
└── ONBOARDING.md        # This file
```

---

## Important notes

- **Never commit sensitive files** — credentials, passwords, or `.env` files should never be pushed.
- The `.vscode/` folder (which contains the FTP config) is already excluded from Git for security reasons.
- If you accidentally commit something sensitive, tell Matteo immediately so we can remove it from history.

---

## Conflict resolution

If you and Matteo edit the same file at the same time, Git may flag a **merge conflict**. VS Code has a built-in merge tool to help resolve these. When in doubt, check with Matteo before overwriting anything.

---

## Questions?

Reach out to Matteo directly — he'll help you get unblocked.
