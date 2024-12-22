#!/bin/bash

#-------------------------------------------------
# Prep
#-------------------------------------------------
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
# Completion
#-------------------------------------------------
echo "$scriptTitle Setup Complete!"