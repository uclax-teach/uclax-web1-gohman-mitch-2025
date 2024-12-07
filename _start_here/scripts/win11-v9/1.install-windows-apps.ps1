# Script 1: Install WSL, Ubuntu, and Chocolatey, then Trigger Restart

#-------------------------------------------------
# Props
#-------------------------------------------------
# Ensure running as Administrator
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "Please run this script as Administrator."
    exit
}

#-------------------------------------------------
# Props
#-------------------------------------------------
# Function to log messages
function Log {
    param ([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

#-------------------------------------------------
# Check for Google Chrome
#-------------------------------------------------
if (-not (Get-Command chrome -ErrorAction SilentlyContinue)) {
    Log "Google Chrome is not installed. Launching default browser to Google Chrome download page..."
    Start-Process "https://www.google.com/chrome/"
} else {
    Log "Google Chrome is already installed."
}

Log "Setup complete!"

#-------------------------------------------------
# Install WSL
#-------------------------------------------------
Log "Installing WSL..."
wsl --install

# Wait for WSL to finish setup
Start-Sleep -Seconds 15

#-------------------------------------------------
# Install Ubuntu (default for WSL installation)
#-------------------------------------------------
Log "Setting up Ubuntu as default WSL distribution..."
wsl --set-default-version 2
wsl --install -d Ubuntu

#-------------------------------------------------
# Install Chocolatey if not installed
#-------------------------------------------------
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Log "Installing Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
} else {
    Log "Chocolatey is already installed."
}

# Make sure Chocolatey and its databases are up to date
choco upgrade chocolatey -y
choco outdated
choco upgrade all -y

#-------------------------------------------------
# Install VS Code
#-------------------------------------------------
if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
    Log "Installing Visual Studio Code..."
    choco install vscode -y --ignore-checksums
} else {
    Log "Visual Studio Code is already installed."
}


# Trigger a system restart
Log "System will restart in 10 seconds..."
Start-Sleep -Seconds 10
Restart-Computer -Force

Log "Restart triggered. The system will reboot shortly."