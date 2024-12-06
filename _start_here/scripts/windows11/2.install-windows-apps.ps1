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

# Install Google Chrome
if (-not (Get-Command chrome -ErrorAction SilentlyContinue)) {
    Log "Installing Google Chrome..."
    choco install googlechrome -y
} else {
    Log "Google Chrome is already installed."
}

# Install VS Code
if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
    Log "Installing Visual Studio Code..."
    choco install vscode -y
} else {
    Log "Visual Studio Code is already installed."
}

# Install Windows Terminal
if (-not (Get-Command wt -ErrorAction SilentlyContinue)) {
    Log "Installing Windows Terminal..."
    choco install microsoft-windows-terminal -y
} else {
    Log "Windows Terminal is already installed."
}

# Install Remote Development Plugins for VS Code
Log "Installing Remote Development Plugins for Visual Studio Code..."
$extensions = @(
    "ms-vscode-remote.remote-containers",
    "ms-vscode-remote.remote-ssh",
    "ms-vscode-remote.remote-ssh-edit",
    "ms-vscode-remote.remote-wsl",
    "ms-vscode-remote.vscode-remote-extensionpack"
)

foreach ($extension in $extensions) {
    code --install-extension $extension
    Log "Installed extension: $extension"
}

# Launch Visual Studio Code
Log "Launching Visual Studio Code..."
Start-Process "code"

Log "Setup complete!"