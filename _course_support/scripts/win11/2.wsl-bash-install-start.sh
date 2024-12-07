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
osTitle="WSL: Linux: Root: OS Updates, Git, NVM and ZSH"
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
# Update and Upgrade packages
###################
echo "$osTitle Update and Upgrade packages"
sudo apt update -y && apt upgrade -y

###################
# Install Required Packages
###################
echo "$osTitle Install required packages"
sudo apt install -y \
    jq \
    zsh \
    curl \
    fonts-powerline \
    git \
    xdg-utils

###################
# Capture User Details in bash prompt
###################
echo "$scriptTitle User specific settings"

# Change variable names to captured versions as per your request
read -p "Enter your First Name: " userFirstNameCaptured
userFirstName=$(toTitleCase "$userFirstNameCaptured")

read -p "Enter your Last Name: " userLastNameCaptured
userLastName=$(toTitleCase "$userLastNameCaptured")

read -p "Enter your Email: " userEmailCaptured
userEmail=$(toLowerCase "$userEmailCaptured")

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
# Clone Web Starter Repo
###################
courseFolderName="$courseName-$userLastName-$userFirstName"
echo "Course Folder Name: $courseFolderName"

# Clone the repository into a new folder
git clone https://github.com/uclax-teach/uclax-web1-gohman-mitch-2025.git "$courseFolderName" || abort "Failed to clone repository."

# Ensure ownership is updated to the user who invoked sudo
# sudo chown -R "$USER:$USER" "$courseFolderName" || abort "Failed to change ownership of the directory."

# Update permissions to ensure the user has read/write access
# sudo chmod -R u+rw "$courseFolderName" || abort "Failed to update permissions."

###################
# Install NVM, Node, and NPM
###################
echo "$osTitle Install NVM, Node, and NPM"

# Install NVM
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# Source NVM to make it available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js and set as default
echo "$osTitle NVM: Install Node Version 20.18.1 and Set as default"
nvm install v20.18.1
nvm use v20.18.1
nvm alias default v20.18.1

###################
# Install Oh My Zsh and Plugins
###################
echo "$osTitle Install Oh My Zsh"
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install Syntax Highlighting if not already installed
ZSH_CUSTOM=${ZSH_CUSTOM:-~/.oh-my-zsh/custom}
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"

###################
# Done
###################
echo "$osTitle Completed"