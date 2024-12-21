# Windows Troubleshooting

1. Run System Requirements Check
1. Windows Search > **Turn Windows Features on or off**, and make sure the following is enabled
    1. Hyper-V
    2. Virtual Machine Platform
    3. Window Subsystem for Linux
1. Confirm WSL Version 2 > Windows Search > **Windows Powershell** `wsl --list --verbose`
    1. Virtualization Enabled Through BIOS (How old is your computer?) We may have to rely oin WSL 1
