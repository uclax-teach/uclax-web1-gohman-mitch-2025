#!/bin/bash

abort() {
    printf "%s\n" "$@"
    exit 1
}

# Fail fast with a concise message when not using bash
if [ -z "${BASH_VERSION:-}" ]; then
    abort "Bash is required to interpret this script."
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    abort "Git is not installed. Please install Git before proceeding."
fi

###################
# Props
###################
courseName="UCLAX-Web1"
scriptTitle="${courseName} Setup: ${osTitle}:"

###################
# Methods
###################
function wordUpperCaseFirst {
    echo "${1^}"
}

function toLowerCase {
    echo "${1,,}"
}

function toTitleCase {
    echo "$(wordUpperCaseFirst "$(toLowerCase "$1")")"
}

###################
# Start the party
###################
echo "$scriptTitle Start"

###################
# Capture User Details in bash prompt
###################
echo "$scriptTitle User specific settings"

read -p "Enter your First Name: " userFirstName
userFirstName=$(toTitleCase "$userFirstName")

read -p "Enter your Last Name: " userLastName
userLastName=$(toTitleCase "$userLastName")

read -p "Enter your Email: " userEmail
userEmail=$(toLowerCase "$userEmail")

echo "$scriptTitle User Details: Name: $userFirstName $userLastName, Email: $userEmail attending $courseName"



###################
# Update Git Settings
###################
echo "$scriptTitle Git: Update Author Name and Email"
git config --global user.name "$userFirstName $userLastName"
git config --global user.email "$userEmail"

echo "$scriptTitle Git: Set git default branch back to the original 'master' branch."
git config --global init.defaultBranch "master"

echo "$scriptTitle Git: Use VS Code as Git Editor"
git config --global core.editor "code --wait"

###################
# Clone Web Starter Repo and CD into the app
###################
courseFolderName="$courseName-$userLastName-$userFirstName"
echo "Course Folder Name: $courseFolderName"

# Clone the repository into a new folder
git clone https://github.com/uclax-teach/uclax-web1-gohman-mitch-2025.git "$courseFolderName" || abort "Failed to clone repository."

# Change into the new folder
cd "$courseFolderName" || abort "Failed to enter $courseFolderName directory."


###################
# Install VS Code Extensions
###################
# Specify the path to your JSON file
json_file="./.vscode/extensions.json"

# Use jq to extract the extensions from the 'recommendations' array
extensions=$(jq -r '.recommendations[]' "$json_file")

# Install each extension using the 'code' CLI
for ext in $extensions; do
    code --install-extension "$ext"
done

