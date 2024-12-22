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
scriptTitle="[${courseName}: WSL Ubuntu: System Requirements Check:]"

#-------------------------------------------------
# Start the party
#-------------------------------------------------
echo "$scriptTitle Start"

#-------------------------------------------------
# App Check
#-------------------------------------------------
# Check Ubuntu version
ubuntu_version=$(lsb_release -a 2>/dev/null | grep 'Description' | cut -f2)
echo "Checking Ubuntu version..."
echo "Ubuntu version: $ubuntu_version"

# Initialize passed and failed checks arrays
passed_checks=()
failed_checks=()

# Check Visual Studio Code version
echo "Checking Visual Studio Code CLI version..."
if ! command -v code &>/dev/null; then
    failed_checks+=("Visual Studio Code CLI: Not installed or unavailable")
else
    vscode_version=$(code --version | head -n 1)
    passed_checks+=("Visual Studio Code CLI: Installed -- version $vscode_version")
fi

# Check Node Version Manager (NVM)
echo "Checking NVM version..."
if ! command -v nvm &>/dev/null; then
    failed_checks+=("NVM: Not installed")
else
    nvm_version=$(nvm --version)
    passed_checks+=("NVM: Installed -- version $nvm_version")
fi

# Check Node version
echo "Checking Node.js version..."
if ! command -v node &>/dev/null; then
    failed_checks+=("Node.js: Not installed")
else
    node_version=$(node -v)
    passed_checks+=("Node.js: Installed -- version $node_version")
fi

# Check npm version
echo "Checking npm version..."
if ! command -v npm &>/dev/null; then
    failed_checks+=("npm: Not installed")
else
    npm_version=$(npm -v)
    passed_checks+=("npm: Installed -- version $npm_version")
fi

# Check Git version
echo "Checking Git version..."
if ! command -v git &>/dev/null; then
    failed_checks+=("Git: Not installed")
else
    git_version=$(git --version | awk '{print $3}')
    passed_checks+=("Git: Installed -- version $git_version")
fi

# Check if the project folder is connected to a GitHub repository
echo "Checking if the project folder is connected to GitHub..."
if git remote -v | grep -q 'github.com'; then
    passed_checks+=("GitHub Repository: Connected")
else
    failed_checks+=("GitHub Repository: Not connected")
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

# Print out Ubuntu version
echo -e "\nUbuntu Version: $ubuntu_version"

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