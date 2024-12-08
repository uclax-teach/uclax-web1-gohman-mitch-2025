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
# Clone Starter Repository
#-------------------------------------------------
courseFolderName="$courseName-$userLastName-$userFirstName"
echo "$scriptTitle Cloning repository into $courseFolderName"
git clone https://github.com/uclax-teach/uclax-web1-gohman-mitch-2025.git "$courseFolderName" || abort "Failed to clone repository."


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
echo "$scriptTitle Checking Homebrew..."
if ! command -v brew &>/dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || abort "Homebrew installation failed."
else
    echo "Updating Homebrew..."
    brew update || abort "Homebrew update failed."
fi

brew tap homebrew/cask || abort "Failed to tap Homebrew cask."

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
# Install Zsh
#-------------------------------------------------
echo "$scriptTitle Installing Zsh..."
if [ -n "$ZSH_VERSION" ]; then
    echo "Zsh is already the default shell."
else
    brew install zsh || abort "Failed to install Zsh."
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
# Completion
#-------------------------------------------------
echo "$scriptTitle Setup Complete!"