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

# Install WSL
Log "Installing WSL..."
wsl --install

# Wait for WSL to finish setup
Start-Sleep -Seconds 15

# Install Ubuntu (default for WSL installation)
Log "Setting up Ubuntu as default WSL distribution..."
wsl --set-default-version 2
wsl --install -d Ubuntu

# Install Chocolatey if not installed
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Log "Installing Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
} else {
    Log "Chocolatey is already installed."
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

# Function to pin items to the Taskbar
function Pin-ToTaskbar {
    param (
        [string]$AppName
    )
    $shell = New-Object -ComObject Shell.Application
    $folder = $shell.Namespace("$env:ProgramData\Microsoft\Windows\Start Menu\Programs")

    foreach ($item in $folder.Items()) {
        if ($item.Name -like "$AppName*") {
            $verb = $item.Verbs() | Where-Object { $_.Name -eq "Pin to Taskbar" }
            if ($verb) {
                $verb.DoIt()
                Log "Pinned $AppName to the Taskbar."
                return
            }
        }
    }
    Log "Failed to pin $AppName to the Taskbar. Item not found or already pinned."
}

# Pin VS Code, Google Chrome, Windows Terminal, and Ubuntu
Log "Pinning applications to the Taskbar..."
Pin-ToTaskbar "Visual Studio Code"
Pin-ToTaskbar "Google Chrome"
Pin-ToTaskbar "Windows Terminal"
Pin-ToTaskbar "Ubuntu"

# Launch Visual Studio Code
Log "Launching Visual Studio Code..."
Start-Process "code"

Log "Setup complete!"