#!/bin/bash

abort() {
    printf "%s\n" "$@"
    exit 1
}

# Fail fast with a concise message when not using bash
if [ -z "${BASH_VERSION:-}" ]; then
    abort "Bash is required to interpret this script."
fi

#-------------------------------------------------
# Props
#-------------------------------------------------
courseName="UCLAX-Web1"
scriptTitle="[${courseName}: WSL Ubuntu: Course Folder:]"

#-------------------------------------------------
# Start the party
#-------------------------------------------------
echo "$scriptTitle Start"

#-------------------------------------------------
# Create env from example
#-------------------------------------------------
echo "$scriptTitle Create .env from .env.example"
cp .env.example .env

#-------------------------------------------------
# Install Dependencies
#-------------------------------------------------
if [ -f package.json ]; then
    echo "$scriptTitle Running npm install"
    npm install
else
    echo "No package.json found. Skipping npm install."
fi

#-------------------------------------------------
# Install VS Code Extensions
#-------------------------------------------------
# Specify the path to your JSON file
json_file="./.vscode/extensions.json"

# Check if the file exists
[[ -f "$json_file" ]] || abort "File not found at $json_file. Please ensure the file exists and try again."

# Use jq to extract the extensions from the 'recommendations' array
extensions=$(jq -r '.recommendations[]' "$json_file")

# Install each extension using the 'code' CLI
for ext in $extensions; do
    echo "Installing extension: $ext"
    code --install-extension "$ext" || abort "Failed to install extension $ext"
done

echo "All extensions installed successfully."


#-------------------------------------------------
# Git: Reset and Fresh Commit
#-------------------------------------------------
echo "$scriptTitle Git: Reset and Fresh Commit"
sudo rm -rf .git
git init
git add .
git commit -m "Git Clean and First Commit"

#-------------------------------------------------
# GitHub: Reset and Fresh Commit
#-------------------------------------------------
echo "$scriptTitle Opening Github Signup"
xdg-open https://github.com/join

#-------------------------------------------------
# Run the app
#-------------------------------------------------
if [ -f package.json ]; then
    echo "$scriptTitle NPM run dev"
    npm run dev
else
    echo "No package.json found. Skipping NPM run dev."
fi

#-------------------------------------------------
# Done
#-------------------------------------------------
echo "$scriptTitle Completed"