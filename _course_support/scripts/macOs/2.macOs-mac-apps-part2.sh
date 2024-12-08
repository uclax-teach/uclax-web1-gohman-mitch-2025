#!/bin/bash

#-------------------------------------------------
# Prep
#-------------------------------------------------
abort() {
    printf "%s\n" "$@" >&2
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
scriptTitle="${courseName} macOS Apps: Part 2:"

#-------------------------------------------------
# Start
#-------------------------------------------------
echo "$scriptTitle Starting..."

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
# Done
#-------------------------------------------------
echo "$scriptTitle Completed!"