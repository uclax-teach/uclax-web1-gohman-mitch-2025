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
scriptTitle="${courseName} macOS Setup"

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
cd ~/Desktop

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
# Install VS Code
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
# Clone Starter Repository
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
# Completion
#-------------------------------------------------
echo "$scriptTitle Setup Complete!"