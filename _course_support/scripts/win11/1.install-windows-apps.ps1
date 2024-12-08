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
    Write-Host "[UCLAX-Web1: Win Apps] $Message" -ForegroundColor Green
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
# Ensure Required Windows Features are Enabled
#-------------------------------------------------
function Enable-Feature {
    param ([string]$FeatureName)

    $feature = Get-WindowsOptionalFeature -FeatureName $FeatureName -Online
    if ($feature.State -ne "Enabled") {
        Log "Enabling Windows feature: $FeatureName"
        Enable-WindowsOptionalFeature -FeatureName $FeatureName -Online -NoRestart
    } else {
        Log "Windows feature already enabled: $FeatureName"
    }
}

Log "Checking and enabling required Windows features..."
Enable-Feature -FeatureName "Microsoft-Hyper-V-All"
Enable-Feature -FeatureName "VirtualMachinePlatform"
Enable-Feature -FeatureName "Microsoft-Windows-Subsystem-Linux"

#-------------------------------------------------
# Install WSL
#-------------------------------------------------
Log "Installing WSL..."
wsl --update
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
# Install VS Code using Winget
#-------------------------------------------------
if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
    Log "Installing Visual Studio Code using Winget..."
    winget install -e --id Microsoft.VisualStudioCode

    # Wait for the installation to complete
    Start-Sleep -Seconds 10
} else {
    Log "Visual Studio Code is already installed."
}


#-------------------------------------------------
# Prompt for Restart
#-------------------------------------------------
Log "Installation complete. Some changes may require a restart to take effect."
$restartPrompt = Read-Host "Would you like to restart your computer now? (Y/N)"

if ($restartPrompt -match "^[Yy]$") {
    Log "Restarting the system..."
    Restart-Computer -Force
} else {
    Log "You chose not to restart. Please restart your computer before moving on to next step to apply all changes."
}