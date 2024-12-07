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

# Make sure they are Set to WSL 2
wsl --set-default-version 2

# Make sure Chocolatey and its databases are up to date
choco upgrade chocolatey -y
choco outdated
choco upgrade all -y

# Install VS Code
if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
    Log "Installing Visual Studio Code..."
    choco install vscode -y --ignore-checksums
} else {
    Log "Visual Studio Code is already installed."
}

# FIXME: I do not think we need this terminal
# Install Windows Terminal
# if (-not (Get-Command wt -ErrorAction SilentlyContinue)) {
#     Log "Installing Windows Terminal..."
#     choco install microsoft-windows-terminal -y --ignore-checksums
# } else {
#     Log "Windows Terminal is already installed."
# }

# Check for Google Chrome
if (-not (Get-Command chrome -ErrorAction SilentlyContinue)) {
    Log "Google Chrome is not installed. Launching default browser to Google Chrome download page..."
    Start-Process "https://www.google.com/chrome/"
} else {
    Log "Google Chrome is already installed."
}

Log "Setup complete!"