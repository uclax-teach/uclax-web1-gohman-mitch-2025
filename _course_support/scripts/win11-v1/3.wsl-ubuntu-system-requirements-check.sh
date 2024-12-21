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

# Check Visual Studio Code version
echo "Checking Visual Studio Code CLI version..."
if ! command -v code &>/dev/null; then
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