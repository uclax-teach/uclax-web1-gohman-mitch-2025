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

# Check for code CLI (Visual Studio Code)
if ! command -v code &>/dev/null; then
    abort "The 'code' CLI (Visual Studio Code) is required but not installed. Please install VS Code and ensure the CLI is enabled."
fi

#-------------------------------------------------
# Props
#-------------------------------------------------
courseName="UCLAX-Web1"
scriptTitle="[${courseName}: macOS: System Requirements Check:]"

#-------------------------------------------------
# Start
#-------------------------------------------------
echo "$scriptTitle Start"

# Initialize arrays for passed and failed checks
passed_checks=()
failed_checks=()

#-------------------------------------------------
# App Check
#-------------------------------------------------
# Check macOS version
macos_version=$(sw_vers -productVersion)
echo "Checking macOS version..."
echo "macOS version: $macos_version"
passed_checks+=("macOS: Version $macos_version")

# Check VS Code version
echo "Checking Visual Studio Code CLI version..."
if code_version=$(code --version 2>/dev/null | head -n 1); then
    passed_checks+=("Visual Studio Code CLI: Installed (Version $code_version)")
else
    failed_checks+=("Visual Studio Code CLI: Not installed or unavailable")
fi

echo "Checking if NVM is available..."

# Set NVM_DIR if not already set
if [ -z "$NVM_DIR" ]; then
    export NVM_DIR="/opt/homebrew/opt/nvm"
fi

# Check if NVM is installed and sourced
if [ -n "$NVM_DIR" ] && [ -s "$NVM_DIR/nvm.sh" ]; then
    echo "Sourcing nvm.sh..."
    source "$NVM_DIR/nvm.sh"
    nvm_version=$(nvm --version 2>/dev/null)
    if [ $? -eq 0 ]; then
        passed_checks+=("NVM: Installed (Version $nvm_version)")
    else
        failed_checks+=("NVM: Version check failed")
    fi
else
    failed_checks+=("NVM: Not installed or not set up")
fi

# Check Node version
echo "Checking Node.js version..."
if node_version=$(node --version 2>/dev/null); then
    passed_checks+=("Node.js: Installed (Version $node_version)")
else
    failed_checks+=("Node.js: Not installed")
fi

# Check npm version
echo "Checking npm version..."
if npm_version=$(npm --version 2>/dev/null); then
    passed_checks+=("npm: Installed (Version $npm_version)")
else
    failed_checks+=("npm: Not installed")
fi

# Check Git version
echo "Checking Git version..."
if git_version=$(git --version 2>/dev/null | awk '{print $3}'); then
    passed_checks+=("Git: Installed (Version $git_version)")
else
    failed_checks+=("Git: Not installed")
fi

# Check if the project folder is connected to a GitHub repository
echo "Checking if the project folder is connected to GitHub..."
if git remote -v | grep -q 'github.com'; then
    passed_checks+=("GitHub Repository: Connected")
else
    failed_checks+=("GitHub Repository: Not connected")
fi

# Check that Xcode Command Line Tools are installed
echo "Checking Xcode Command Line Tools installation..."
if xcode_version=$(xcode-select -p &>/dev/null && xcodebuild -version | head -n 1 | awk '{print $2}'); then
    passed_checks+=("Xcode Command Line Tools: Installed (Version $xcode_version)")
else
    failed_checks+=("Xcode Command Line Tools: Not installed")
fi

# Check if Google Chrome is installed
echo "Checking if Google Chrome is installed..."
if [ -d "/Applications/Google Chrome.app" ]; then
    passed_checks+=("Google Chrome: Installed")
else
    failed_checks+=("Google Chrome: Not installed")
fi

# Check if SSH keys are set up
echo "Checking if SSH keys are set up..."
if [ ! -f "$HOME/.ssh/id_ed25519" ] || [ ! -f "$HOME/.ssh/id_ed25519.pub" ]; then
    failed_checks+=("SSH Keys: Not set up")
else
    passed_checks+=("SSH Keys: Set up")
fi

# Retrieve global Git user name and email
git_user_name=$(git config --global user.name 2>/dev/null)
git_user_email=$(git config --global user.email 2>/dev/null)

if [ -n "$git_user_name" ] && [ -n "$git_user_email" ]; then
    passed_checks+=("Git Global User: Name ($git_user_name), Email ($git_user_email)")
else
    failed_checks+=("Git Global User: Name and/or Email not set")
fi

#-------------------------------------------------
# Done
#-------------------------------------------------
echo "$scriptTitle Completed!"

# Print working directory
working_dir=$(pwd)
echo -e "\nWorking Directory: $working_dir"

# Print out macOS version
echo -e "\nmacOS Version: $macos_version"

# Print out passed and failed checks
echo -e "\nPassed Checks:"
for passed in "${passed_checks[@]}"; do
    echo "$passed"
done

echo -e "\nFailed Checks:"
for failed in "${failed_checks[@]}"; do
    echo "$failed"
done

# Exit with a non-zero status if there were any failures
if [ ${#failed_checks[@]} -gt 0 ]; then
    exit 1
fi