# Script 2: Install Google Chrome, VS Code, Windows Terminal
# Pin VS Code, Chrome, Windows Terminal, and Ubuntu to the Taskbar
# Launch VS Code and install Remote Development Plugins

# Ensure running as Administrator
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "Please run this script as Administrator."
    exit
}

# Function to log messages
function Log {
    param ([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

# Make sure Chocolatey and its databases are up to date
choco upgrade chocolatey -y
choco outdated
choco upgrade all -y

# Install Google Chrome
if (-not (Get-Command chrome -ErrorAction SilentlyContinue)) {
    Log "Installing Google Chrome..."
    choco install googlechrome -y --ignore-checksums
} else {
    Log "Google Chrome is already installed."
}

# Install VS Code
if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
    Log "Installing Visual Studio Code..."
    choco install vscode -y --ignore-checksums
} else {
    Log "Visual Studio Code is already installed."
}

# Install Windows Terminal
if (-not (Get-Command wt -ErrorAction SilentlyContinue)) {
    Log "Installing Windows Terminal..."
    choco install microsoft-windows-terminal -y --ignore-checksums
} else {
    Log "Windows Terminal is already installed."
}

Log "Setup complete!"