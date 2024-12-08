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
scriptTitle="${courseName} Setup: WSL: Ubuntu:"

#-------------------------------------------------
# Methods
#-------------------------------------------------
function wordUpperCaseFirst {
    echo "${1^}"
}

function toLowerCase {
    echo "${1,,}"
}

function toTitleCase {
    echo "$(wordUpperCaseFirst "$(toLowerCase "$1")")"
}


#-------------------------------------------------
# Start the party
#-------------------------------------------------
echo "$scriptTitle Start"

#-------------------------------------------------
# Update and Upgrade packages
#-------------------------------------------------
echo "$scriptTitle Update and Upgrade packages"
sudo apt update -y && apt upgrade -y

#-------------------------------------------------
# Install Required Packages
#-------------------------------------------------
echo "$scriptTitle Install required packages"
sudo apt install -y \
    jq \
    zsh \
    curl \
    fonts-powerline \
    git \
    xdg-utils

#-------------------------------------------------
# Capture User Details in bash prompt
#-------------------------------------------------
echo "$scriptTitle User specific settings"

# Change variable names to captured versions as per your request
read -p "Enter your First Name: " userFirstNameCaptured
userFirstName=$(toTitleCase "$userFirstNameCaptured")

read -p "Enter your Last Name: " userLastNameCaptured
userLastName=$(toTitleCase "$userLastNameCaptured")

read -p "Enter your Email: " userEmailCaptured
userEmail=$(toLowerCase "$userEmailCaptured")

echo "$scriptTitle User Details: Name: $userFirstName $userLastName, Email: $userEmail attending $courseName"

#-------------------------------------------------
# Configure Git
#-------------------------------------------------
echo "$scriptTitle Configuring Git..."
git config --global user.name "$userFirstName $userLastName" || abort "Failed to configure Git user.name."
git config --global user.email "$userEmail" || abort "Failed to configure Git user.email."
git config --global init.defaultBranch "master"
git config --global core.editor "code --wait"

#-------------------------------------------------
# Clone Web Starter Repo
#-------------------------------------------------
courseFolderName="$courseName-$userLastName-$userFirstName"
echo "Course Folder Name: $courseFolderName"
git clone https://github.com/uclax-teach/uclax-web1-gohman-mitch-2025.git "$courseFolderName" || abort "Failed to clone repository."

#-------------------------------------------------
# Install NVM, Node, and NPM
#-------------------------------------------------
echo "$scriptTitle Install NVM, Node, and NPM"

# Install NVM
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# Source NVM to make it available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js and set as default
echo "$scriptTitle NVM: Install Node Version 20.18.1 and Set as default"
nvm install v20.18.1 || abort "Failed to install Node.js."
nvm use v20.18.1 || abort "Failed to use Node.js."
nvm alias default v20.18.1 || abort "Failed to set Node.js as default."

#-------------------------------------------------
# Install Oh My Zsh and Plugins
#-------------------------------------------------
echo "$scriptTitle Install Oh My Zsh"
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install Syntax Highlighting if not already installed
ZSH_CUSTOM=${ZSH_CUSTOM:-~/.oh-my-zsh/custom}
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"

#-------------------------------------------------
# Done
#-------------------------------------------------
echo "$scriptTitle Completed"