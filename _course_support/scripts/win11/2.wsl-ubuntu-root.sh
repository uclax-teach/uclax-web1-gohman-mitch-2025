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
scriptTitle="[${courseName}: WSL Ubuntu: Root:]"

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
# Clone Web Starter Repo
#-------------------------------------------------
courseFolderName="$courseName-$userLastName-$userFirstName"
echo "Course Folder Name: $courseFolderName"
git clone https://github.com/uclax-teach/uclax-web1-gohman-mitch-2025.git "$courseFolderName" || abort "Failed to clone repository."


#-------------------------------------------------
# CD Into User's Project Folder
#-------------------------------------------------
if [ -d "$courseFolderName" ]; then
    echo "Changing directory to $courseFolderName."
    cd "$courseFolderName" || { echo "Failed to change directory to User's Project Folder."; exit 1; }
    echo "Current directory: $(pwd)"
else
    echo "Error: Directory $courseFolderName does not exist."
    exit 1
fi

#-------------------------------------------------
# Opening User's Project Folder in VS Code
#-------------------------------------------------
echo "$scriptTitle Opening User's Project Folder in VS Code"
code .

#-------------------------------------------------
# Create .env from .env.example
#-------------------------------------------------
if [ -f .env.example ]; then
    echo "$scriptTitle Creating .env from .env.example"
    cp .env.example .env || { echo "Failed to create .env file."; exit 1; }
    echo ".env file created successfully."

    # Replace placeholders with actual values
    echo "Replacing placeholders in .env file..."
    sed -i "s/Firstname/${userFirstName}/g" .env
    sed -i "s/Lastname/${userLastName}/g" .env
    sed -i "s/user@somedomain.com/${userEmail}/g" .env

    echo "Placeholders replaced in .env file."
else
    echo "No .env.example file found. Skipping .env creation."
fi

#-------------------------------------------------
# Install NPM Dependencies
#-------------------------------------------------
if [ -f package.json ]; then
    echo "$scriptTitle Running npm install"
    npm install || abort "npm install failed. Please check the error log."
else
    echo "No package.json found. Skipping npm install."
fi

#-------------------------------------------------
# Git: Reset and Fresh Commit
#-------------------------------------------------
echo "$scriptTitle Resetting Git repository"
if [ -d .git ]; then
    sudo rm -rf .git || abort "Failed to remove existing .git directory."
    git init || abort "Failed to initialize a new Git repository."
    git add . || abort "Failed to stage files for commit."
    git commit -m "Initial Commit: Fresh Setup" || abort "Failed to create an initial Git commit."
    echo "Git repository reset and fresh commit completed."
else
    echo "No .git folder found, are you sure you are in the correct directory?"
fi

#-------------------------------------------------
# SSH Keys
#-------------------------------------------------
# Create the .ssh directory if it doesn't exist
mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"
# Define the default SSH key path
SSH_KEY_PATH="$HOME/.ssh/id_ed25519"

if [ ! -f "$SSH_KEY_PATH" ]; then
    ssh-keygen -t ed25519 -f "$SSH_KEY_PATH" -N "" || abort "Failed to generate SSH key."
    echo "SSH key generated successfully."
else
    echo "SSH key already exists at $SSH_KEY_PATH."
fi

# SSH: Opening SSH Public Key in VS Code
#-------------------------------------------------
echo "$scriptTitle Opening SSH Public Key in VS Code"
code "${SSH_KEY_PATH}.pub"

#-------------------------------------------------
# Open GitHub Signup Page
#-------------------------------------------------
echo "$scriptTitle Opening GitHub Signup Page"
open https://github.com/join || echo "Failed to open GitHub signup page. Please open it manually: https://github.com/join"

#-------------------------------------------------
# Install Oh My Zsh
#-------------------------------------------------
echo "$scriptTitle Installing Oh-My-Zsh..."
if [ ! -d "$HOME/.oh-my-zsh" ]; then
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended || abort "Failed to install Oh My Zsh."
else
    echo "Oh My Zsh is already installed."
fi

#-------------------------------------------------
# Customize ~/.zshrc.local
#-------------------------------------------------
ZSHRC_LOCAL="$HOME/.zshrc.local"

# Add NVM_DIR and source NVM
echo "export NVM_DIR=\"$HOME/.nvm\"" >> "$ZSHRC_LOCAL"
echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"" >> "$ZSHRC_LOCAL"
echo "[ -s \"\$NVM_DIR/bash_completion\" ] && . \"\$NVM_DIR/bash_completion\"" >> "$ZSHRC_LOCAL"

#-------------------------------------------------
# Update .zshrc to source .zshrc.local
#-------------------------------------------------
echo "source \$HOME/.zshrc.local" >> "$PROFILE_FILE"

#-------------------------------------------------
# Install Zsh Syntax Highlighting
#-------------------------------------------------
echo "$scriptTitle Installing Zsh Syntax Highlighting..."
ZSH_CUSTOM=${ZSH_CUSTOM:-~/.oh-my-zsh/custom}
SYNTAX_HIGHLIGHTING_PATH="$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"

if [ -d "$SYNTAX_HIGHLIGHTING_PATH" ]; then
    echo "$scriptTitle Zsh Syntax Highlighting is already installed at $SYNTAX_HIGHLIGHTING_PATH."
else
    if command -v git &>/dev/null; then
        git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$SYNTAX_HIGHLIGHTING_PATH" \
            && echo "$scriptTitle Zsh Syntax Highlighting successfully installed."
    else
        abort "Git is not installed. Please install Git and re-run the script."
    fi
fi

#-------------------------------------------------
# Update .zshrc Plugins
#-------------------------------------------------
ZSHRC_FILE="$HOME/.zshrc"
if [ -f "$ZSHRC_FILE" ]; then
    echo "$scriptTitle Updating plugins in .zshrc..."

    # Create a backup of .zshrc
    cp "$ZSHRC_FILE" "$ZSHRC_FILE.bak.$(date +%F-%T)" || abort "Failed to create a backup of .zshrc."

    # Add `nvm` plugin if not already present
    if grep -q "plugins=(" "$ZSHRC_FILE"; then
        sed -i -E 's/plugins=\(([^)]*)\)/plugins=(\1 nvm)/' "$ZSHRC_FILE" \
            && echo "$scriptTitle .zshrc updated to include the nvm plugin." \
            || abort "Failed to update plugins in .zshrc."
    else
        echo "$scriptTitle plugins=(git nvm)" >>"$ZSHRC_FILE"
        echo "$scriptTitle .zshrc updated with default plugins (git nvm)."
    fi
else
    echo "$scriptTitle .zshrc not found. Skipping plugin update."
fi


#-------------------------------------------------
# Completion
#-------------------------------------------------
echo "$scriptTitle Setup Complete!"