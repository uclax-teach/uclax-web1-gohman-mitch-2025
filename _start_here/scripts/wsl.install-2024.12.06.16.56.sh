#!/bin/bash

osTitle="WSL: Linux"

###################
# Shared Pre Install
###################

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



###################
# WSL Specific Install
###################


# Update and Upgrade packages
echo "$osTitle Update and Upgrade packages"
apt update -y && apt upgrade -y

# Install Zsh if not installed
if ! command -v zsh &> /dev/null; then
    echo "$osTitle Install Zsh"
    apt install zsh -y
    echo "$osTitle Make Zsh Default Shell"
    chsh -s "$(which zsh)"
else
    echo "Zsh is already installed."
fi

# Install Oh My Zsh if not already installed
if [ ! -d "$HOME/.oh-my-zsh" ]; then
    echo "$osTitle Install Oh My Zsh"
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
else
    echo "Oh My Zsh is already installed."
fi

# Install Fonts
echo "$osTitle Install Oh My Zsh Icons/Fonts"
apt install fonts-powerline -y

# Install Syntax Highlighting if not already installed
ZSH_CUSTOM=${ZSH_CUSTOM:-~/.oh-my-zsh/custom}
if [ ! -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ]; then
    echo "$osTitle Install Oh My Zsh Syntax Highlighting"
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
else
    echo "zsh-syntax-highlighting is already installed."
fi

# Update .zshrc plugins
echo "$osTitle Add plugins to .zshrc"
if [ -f ~/.zshrc ]; then
    sed -i '/^plugins=/c\plugins=(git nvm)' ~/.zshrc
else
    echo "plugins=(git nvm)" >> ~/.zshrc
fi

# Install NVM, Node, and NPM
echo "$osTitle Install NVM, Node, and NPM"

# Install NVM if not installed
if [ ! -d "$HOME/.nvm" ]; then
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
else
    echo "NVM is already installed."
fi

# Source NVM to make it available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js and set as default
echo "$osTitle NVM: Install Node Version 20.18.1 and Set as default"
nvm install v20.18.1
nvm use v20.18.1
nvm alias default v20.18.1

# Install dependencies (if package.json exists)
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