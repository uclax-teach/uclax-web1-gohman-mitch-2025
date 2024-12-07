#!/bin/bash

abort() {
    printf "%s\n" "$@"
    exit 1
}

# Fail fast with a concise message when not using bash
if [ -z "${BASH_VERSION:-}" ]; then
    abort "Bash is required to interpret this script."
fi

###################
# Props
###################
osTitle="WSL: Linux"
courseName="UCLAX-Web1"
scriptTitle="${courseName} Setup: ${osTitle}: Finish:"


###################
# Start the party
###################
echo "$scriptTitle Start"

###################
# Add nvm to .zshrc plugins
# plugins=(git nvm)
###################
sed -i '' 's/plugins=(git)/plugins=(git nvm)/' ~/.zshrc

###################
# CD Into Course Folder
###################
cd "UCLAX-Web1*" || abort "Failed to enter UCLAX-Web1* directory."

###################
# Install Dependencies
###################
if [ -f package.json ]; then
    echo "$osTitle Running npm install"
    npm install
else
    echo "No package.json found. Skipping npm install."
fi

###################
# Done
###################
echo "$osTitle Completed"