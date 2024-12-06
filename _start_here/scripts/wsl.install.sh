#!/bin/bash

# Ensure script runs with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root"
    exit
fi

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Shared Pre Install
source "${__dir}/shared.install.pre.sh"

globalScriptTitle="Setup Script:"
childScriptTitle="Windows:"

echo "$globalScriptTitle $childScriptTitle Start"

# Update and Upgrade packages
echo "$globalScriptTitle $childScriptTitle Update and Upgrade packages"
apt update -y && apt upgrade -y

# Install cURL
echo "$globalScriptTitle $childScriptTitle Install cURL"
apt install curl -y

# Install Git
echo "$globalScriptTitle $childScriptTitle Install Git"
apt install git -y

# Install Zsh
echo "$globalScriptTitle $childScriptTitle Install Zsh"
apt install zsh -y
echo "$globalScriptTitle $childScriptTitle Make Zsh Default Shell"
chsh -s $(which zsh)

# Install Oh My Zsh
echo "$globalScriptTitle $childScriptTitle Install Oh My Zsh"
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install Fonts
echo "$globalScriptTitle $childScriptTitle Install Oh My Zsh Icons/Fonts"
apt install fonts-powerline -y

# Install Syntax Highlighting
ZSH_CUSTOM=${ZSH_CUSTOM:-~/.oh-my-zsh/custom}
echo "$globalScriptTitle $childScriptTitle Install Oh My Zsh Syntax Highlighting"
if [ ! -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ]; then
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting
else
    echo "zsh-syntax-highlighting already installed"
fi

# Update .zshrc plugins
echo "$globalScriptTitle $childScriptTitle Add plugins to .zshrc"
if [ -f ~/.zshrc ]; then
    sed -i '/^plugins=/c\plugins=(git nvm)' ~/.zshrc
else
    echo "plugins=(git nvm)" >> ~/.zshrc
fi

# Install NVM, Node, and NPM
echo "$globalScriptTitle $childScriptTitle Install NVM, Node, and NPM"

# Install NVM
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# Source NVM to make it available in the script
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js and set as default
nvm install v20.9.0
nvm use v20.9.0
nvm alias default v20.9.0

# Install dependencies (if package.json exists)
if [ -f package.json ]; then
    npm install
else
    echo "No package.json found. Skipping npm install."
fi


# Done
echo "Setup complete."