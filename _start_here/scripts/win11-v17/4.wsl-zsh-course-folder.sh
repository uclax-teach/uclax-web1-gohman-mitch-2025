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
osTitle="WSL: Linux: Project Folder:"
courseName="UCLAX-Web1"
scriptTitle="${courseName} Setup: ${osTitle}: Finish:"


#-------------------------------------------------
# Start the party
#-------------------------------------------------
echo "$scriptTitle Start"

#-------------------------------------------------
# Create env from example
#-------------------------------------------------
echo "$osTitle Create .env from .env.example"
cp .env.example .env

#-------------------------------------------------
# Install Dependencies
#-------------------------------------------------
if [ -f package.json ]; then
    echo "$osTitle Running npm install"
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
# Done
#-------------------------------------------------
echo "$osTitle Completed"