#!/bin/bash

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
scriptTitle="[${courseName}: WSL Ubuntu: Root Part2: Oh My Zsh Config:]"


#-------------------------------------------------
# Start the party
#-------------------------------------------------
echo "$scriptTitle Start"

#-------------------------------------------------
# Install Syntax Highlighting if not already installed
#-------------------------------------------------
ZSH_CUSTOM=${ZSH_CUSTOM:-~/.oh-my-zsh/custom}
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"

#-------------------------------------------------
# Add nvm to .zshrc plugins
# plugins=(git nvm)
#-------------------------------------------------
if [ -f ~/.zshrc ]; then
    sed -i 's/plugins=(git)/plugins=(git nvm)/' ~/.zshrc
    echo ".zshrc updated with nvm plugin"
else
    echo ".zshrc file not found. Skipping update."
fi

#-------------------------------------------------
# Done
#-------------------------------------------------
echo "$scriptTitle Completed"