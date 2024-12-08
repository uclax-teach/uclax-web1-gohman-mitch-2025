#!/bin/bash

#-------------------------------------------------
# Prep
#-------------------------------------------------
abort() {
    printf "%s\n" "$@" >&2
    exit 1
}

# Fail fast with a concise message when not using bash
if [ -z "${BASH_VERSION:-}" ]; then
    abort "Bash is required to interpret this script."
fi

# Check for jq dependency
if ! command -v jq &>/dev/null; then
    abort "jq is required but not installed. Please install jq and re-run the script."
fi

# Check for code CLI (Visual Studio Code)
if ! command -v code &>/dev/null; then
    abort "The 'code' CLI (Visual Studio Code) is required but not installed. Please install VS Code and ensure the CLI is enabled."
fi

#-------------------------------------------------
# Props
#-------------------------------------------------
courseName="UCLAX-Web1"
scriptTitle="${courseName} Setup: macOS:"

#-------------------------------------------------
# Start
#-------------------------------------------------
echo "$scriptTitle Start"

#-------------------------------------------------
# Create .env from .env.example
#-------------------------------------------------
if [ -f .env.example ]; then
    echo "$scriptTitle Creating .env from .env.example"
    cp .env.example .env || abort "Failed to create .env file."
    echo ".env file created successfully."
else
    echo "No .env.example file found. Skipping .env creation."
fi

#-------------------------------------------------
# Install Dependencies
#-------------------------------------------------
if [ -f package.json ]; then
    echo "$scriptTitle Running npm install"
    npm install || abort "npm install failed. Please check the error log."
else
    echo "No package.json found. Skipping npm install."
fi

#-------------------------------------------------
# Install VS Code Extensions
#-------------------------------------------------
# Path to extensions.json
json_file="./.vscode/extensions.json"

if [ -f "$json_file" ]; then
    echo "$scriptTitle Installing VS Code extensions from $json_file"
    extensions=$(jq -r '.recommendations[]' "$json_file")
    for ext in $extensions; do
        echo "Installing extension: $ext"
        code --install-extension "$ext" || abort "Failed to install extension: $ext"
    done
    echo "All VS Code extensions installed successfully."
else
    echo "No extensions.json file found at $json_file. Skipping VS Code extensions installation."
fi

#-------------------------------------------------
# Git: Reset and Fresh Commit
#-------------------------------------------------
echo "$scriptTitle Resetting Git repository"
if [ -d .git ]; then
    sudo rm -rf .git || abort "Failed to remove existing .git directory."
fi

git init || abort "Failed to initialize a new Git repository."
git add . || abort "Failed to stage files for commit."
git commit -m "Initial Commit: Fresh Setup" || abort "Failed to create an initial Git commit."
echo "Git repository reset and fresh commit completed."

#-------------------------------------------------
# Open GitHub Signup Page
#-------------------------------------------------
echo "$scriptTitle Opening GitHub Signup Page"
open https://github.com/join || echo "Failed to open GitHub signup page. Please open it manually: https://github.com/join"

#-------------------------------------------------
# Run the App
#-------------------------------------------------
if [ -f package.json ]; then
    echo "$scriptTitle Starting app with npm run dev"
    npm run dev || echo "Failed to start the app. Please debug the issue manually."
else
    echo "No package.json found. Skipping npm run dev."
fi

#-------------------------------------------------
# Done
#-------------------------------------------------
echo "$scriptTitle Completed!"