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

# Check VS Code version
echo "Checking Visual Studio Code CLI version..."
if ! code --version &>/dev/null; then
    failed_checks+=("Visual Studio Code CLI: Not installed or unavailable")
else
    passed_checks+=("Visual Studio Code CLI: Installed")
fi

# Check Node Version Manager (NVM)
echo "Checking NVM version..."
if ! command -v nvm &>/dev/null; then
    failed_checks+=("NVM: Not installed")
else
    passed_checks+=("NVM: Installed")
fi

# Check Node version
echo "Checking Node.js version..."
if ! command -v node &>/dev/null; then
    failed_checks+=("Node.js: Not installed")
else
    passed_checks+=("Node.js: Installed")
fi

# Check npm version
echo "Checking npm version..."
if ! command -v npm &>/dev/null; then
    failed_checks+=("npm: Not installed")
else
    passed_checks+=("npm: Installed")
fi

# Check Git version
echo "Checking Git version..."
if ! command -v git &>/dev/null; then
    failed_checks+=("Git: Not installed")
else
    passed_checks+=("Git: Installed")
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
if ! xcode-select -p &>/dev/null; then
    failed_checks+=("Xcode Command Line Tools: Not installed")
else
    passed_checks+=("Xcode Command Line Tools: Installed")
fi

# Check if Google Chrome is installed
echo "Checking if Google Chrome is installed..."
if ! command -v "google-chrome" &>/dev/null; then
    failed_checks+=("Google Chrome: Not installed")
else
    passed_checks+=("Google Chrome: Installed")
fi

# Check if SSH keys are set up
echo "Checking if SSH keys are set up..."
if [ ! -f "$HOME/.ssh/id_rsa" ] || [ ! -f "$HOME/.ssh/id_rsa.pub" ]; then
    failed_checks+=("SSH Keys: Not set up")
else
    passed_checks+=("SSH Keys: Set up")
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