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
# Install VS Code using Winget
#-------------------------------------------------
if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
    Log "Installing Visual Studio Code using Winget..."
    winget install -e --id Microsoft.VisualStudioCode

    # Wait for the installation to complete
    Start-Sleep -Seconds 10

    # Add Shortcut to Desktop
    #-------------------------------------------------
    Log "Adding a shortcut to the desktop..."
    $shortcutPath = [System.IO.Path]::Combine([Environment]::GetFolderPath("Desktop"), "Visual Studio Code.lnk")
    $vscodeExe = "$env:ProgramFiles\Microsoft VS Code\Code.exe"  # Adjust path if needed

    $shell = New-Object -ComObject WScript.Shell
    $shortcut = $shell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $vscodeExe
    $shortcut.Save()

    Log "Shortcut to Visual Studio Code added on the desktop."

    # Pin to Taskbar
    #-------------------------------------------------
    Log "Pinning Visual Studio Code to the taskbar..."
    $appUserModelId = "Microsoft.VisualStudioCode"  # App ID for VS Code
    $pinCommand = "powershell -command `& {Start-Process -FilePath 'explorer.exe' -ArgumentList @('-n', 'shell:AppsFolder\{0}', '{0}') -NoNewWindow}" -f $appUserModelId
    Invoke-Expression $pinCommand

    Log "Pinned Visual Studio Code to the taskbar."
} else {
    Log "Visual Studio Code is already installed."
}


Log "Restart triggered. The system will reboot shortly."