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
# Properties
#-------------------------------------------------
courseName="UCLAX-Web1"
scriptTitle="[${courseName} macOS: Apps:]"

#-------------------------------------------------
# Helper Methods
#-------------------------------------------------
function toTitleCase {
    echo "$1" | awk '{for (i=1; i<=NF; ++i) $i=toupper(substr($i,1,1)) tolower(substr($i,2));} 1'
}

function toLowerCase {
    echo "$1" | tr '[:upper:]' '[:lower:]'
}

#-------------------------------------------------
# Start
#-------------------------------------------------
echo "$scriptTitle Starting"

#-------------------------------------------------
# Make sure they are on Desktop
#-------------------------------------------------
desktop="$HOME/Desktop"  # Use $HOME for proper expansion
if [ -d "$desktop" ]; then
    echo "Changing directory to $desktop."
    cd "$desktop" || { echo "Failed to change directory to User's Desktop Folder."; exit 1; }
    echo "Current directory: $(pwd)"
else
    echo "Error: Directory $desktop does not exist."
    exit 1
fi

#-------------------------------------------------
# Capture User Details
#-------------------------------------------------
read -p "Enter your First Name: " userFirstName
userFirstName=$(toTitleCase "$userFirstName")

read -p "Enter your Last Name: " userLastName
userLastName=$(toTitleCase "$userLastName")

read -p "Enter your Email: " userEmail
userEmail=$(toLowerCase "$userEmail")

echo "$scriptTitle User: $userFirstName $userLastName, Email: $userEmail"

#-------------------------------------------------
# XCode
#-------------------------------------------------
if ! xcode-select --print-path &>/dev/null; then
    echo "$scriptTitle Xcode Command Line Tools will now install. Follow the on-screen instructions to complete installation."

    xcode-select --install

    echo "Waiting for Xcode Command Line Tools to finish installation..."

    until xcode-select --print-path &>/dev/null; do
        sleep 5
    done
else
    echo "$scriptTitle Xcode Command Line Tools already installed."
fi

#-------------------------------------------------
# Install or Update Homebrew
#-------------------------------------------------
scriptTitle="Homebrew Installation Script"
echo "$scriptTitle Checking Homebrew..."
if ! command -v brew &>/dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || abort "Homebrew installation failed."
else
    echo "Updating Homebrew..."
    brew update || abort "Homebrew update failed."
fi

# Homebrew path
BREW_PATH="/opt/homebrew/bin"

# Add Homebrew to the PATH in .zshrc
PROFILE_FILE="$HOME/.zshrc"
ZSH_LOCAL_FILE="$HOME/.zshrc.local"

# Check if Homebrew is already in PATH to avoid duplicates
if ! grep -q "$BREW_PATH" "$PROFILE_FILE"; then
    echo "Adding Homebrew to PATH in $PROFILE_FILE..."
    echo "export PATH=\"$BREW_PATH:\$PATH\"" >> "$PROFILE_FILE"
else
    echo "Homebrew is already in PATH in $PROFILE_FILE."
fi

# Add Homebrew to .zshrc.local if not already added
if ! grep -q "$BREW_PATH" "$ZSH_LOCAL_FILE"; then
    echo "Adding Homebrew to $ZSH_LOCAL_FILE..."
    echo "export PATH=\"$BREW_PATH:\$PATH\"" >> "$ZSH_LOCAL_FILE"
fi

# Add NVM_DIR to .zshrc.local if not already added
if ! grep -q "export NVM_DIR=\"$HOME/.nvm\"" "$ZSH_LOCAL_FILE"; then
    echo "Adding NVM_DIR to $ZSH_LOCAL_FILE..."
    echo "export NVM_DIR=\"$HOME/.nvm\"" >> "$ZSH_LOCAL_FILE"
fi

# Source the profile to apply changes
echo "Sourcing $PROFILE_FILE to apply changes..."
source "$PROFILE_FILE" || echo "Failed to source $PROFILE_FILE. Please restart your shell."

#-------------------------------------------------
# Install jq
#-------------------------------------------------
if ! command -v jq &> /dev/null; then
    echo "jq is not installed. Installing jq..."
    brew install jq || abort "Failed to install jq"
else
    echo "jq is already installed."
fi

#-------------------------------------------------
# Install VS Code with Brew, which automatically add `code` cli
#-------------------------------------------------
echo "$scriptTitle Installing VS Code..."
brew install --cask visual-studio-code || abort "Failed to install VS Code."

#-------------------------------------------------
# Install NVM, Node.js, and NPM
#-------------------------------------------------
echo "$scriptTitle Installing NVM..."
if [ ! -d "$HOME/.nvm" ]; then
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash || abort "Failed to install NVM."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" || abort "Failed to source NVM."
else
    echo "NVM is already installed."
fi

echo "$scriptTitle NVM: Install Node Version 20.18.1 and Set as default"
nvm install v20.18.1 || abort "Failed to install Node.js."
nvm alias default v20.18.1 || abort "Failed to set Node.js as default."

#-------------------------------------------------
# Install Google Chrome
#-------------------------------------------------
echo "$scriptTitle Installing Google Chrome..."
if [ ! -d "/Applications/Google Chrome.app" ]; then
    brew install --cask google-chrome || abort "Failed to install Google Chrome."
else
    echo "Google Chrome is already installed."
fi

#-------------------------------------------------
# Install/Update Git
#-------------------------------------------------
if brew ls --versions git &>/dev/null; then
    echo "Git already installed. Updating Git..."
    brew upgrade git
else
    echo "Installing Git..."
    brew install git
fi

# Configure Git
#-------------------------------------------------
echo "$scriptTitle Configuring Git..."
git config --global user.name "$userFirstName $userLastName" || abort "Failed to configure Git user.name."
git config --global user.email "$userEmail" || abort "Failed to configure Git user.email."
git config --global init.defaultBranch "master"
git config --global core.editor "code --wait"

#-------------------------------------------------
# Clone Starter Repository as User's Project Folder
#-------------------------------------------------
courseFolderName="$courseName-$userLastName-$userFirstName"
echo "$scriptTitle Cloning repository into $courseFolderName"

# Check if the directory exists
if [ -d "$courseFolderName" ]; then
    echo "$scriptTitle Directory $courseFolderName already exists. Skipping repository clone."
else
    git clone https://github.com/uclax-teach/uclax-web1-gohman-mitch-2025.git "$courseFolderName" || abort "Failed to clone repository."
fi

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
# Create .env from .env.example
#-------------------------------------------------
if [ -f .env.example ]; then
    echo "$scriptTitle Creating .env from .env.example"
    cp .env.example .env || abort "Failed to create .env file."
    echo ".env file created successfully."

    # Replace placeholders with actual values
    echo "Replacing placeholders in .env file..."
    sed -i '' "s/Firstname/${userFirstName}/g" .env
    sed -i '' "s/Lastname/${userLastName}/g" .env
    sed -i '' "s/user@somedomain.com/${userEmail}/g" .env

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
# Define the default SSH key path
SSH_KEY_PATH="$HOME/.ssh/id_ed25519"

# Check if the default SSH key already exists
if [ -f "$SSH_KEY_PATH" ]; then
    echo "Default SSH key already exists at $SSH_KEY_PATH."
else
    echo "Default SSH key not found. Generating a new passwordless SSH key pair..."

    # Create the .ssh directory if it doesn't exist
    mkdir -p "$HOME/.ssh"
    chmod 700 "$HOME/.ssh"

    # Generate the SSH key pair
    ssh-keygen -t ed25519 -f "$SSH_KEY_PATH" -N ""

    if [ $? -eq 0 ]; then
        echo "SSH key generated successfully."
    else
        echo "Failed to generate SSH key."
        exit 1
    fi
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
# Install Zsh
#-------------------------------------------------
echo "$scriptTitle Installing Zsh..."
if [ -n "$ZSH_VERSION" ]; then
    echo "Zsh is already the default shell."
else
    brew install zsh || abort "Failed to install Zsh."

    # Check if Zsh is in the list of valid shells
    if ! grep -Fxq "/opt/homebrew/bin/zsh" /etc/shells; then
        echo "/opt/homebrew/bin/zsh" | sudo tee -a /etc/shells || abort "Failed to add Zsh to /etc/shells."
    fi

    # Set Zsh as the default shell
    chsh -s "$(which zsh)" || abort "Failed to set Zsh as the default shell."
fi

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
        sed -i '' -E 's/plugins=\(([^)]*)\)/plugins=(\1 nvm)/' "$ZSHRC_FILE" \
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