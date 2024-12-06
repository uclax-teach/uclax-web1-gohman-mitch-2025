# Part 1: System Setup: Uclax Web 1: Windows

[Back to Main](../SETUP.md)

## Pre Installation Notes

-   Make sure your Operating System is up to date
    -   Windows Search > `Check for Updates`
    -   Rinse and repeat until there are no more updates
-   This tutorial covers Windwows 11 which is required for this course. If you are using Windows 10, in theory, as long as you have the latest version of 10 - you should be able to complete this setup. However, this has not been tested and you will have to resolve any differences that are not supported by your Operating System.
-   Unlike macOS and Linux (at least out of the box), Windows does not support bash/terminal. In order to get Windows to act more like macOS and Linux, we need to enable Windows Subsystem for Linux (WSL).

## Install Windows Applications

1. Windows Search > Windows Powershell - **!Important!** be sure to choose **"Run as Administrator"** on the right
2. type the following command and press enter

TODO: UPDATE THE FOLLOWING TO MATCH ACTUAL PATH ON REMOTE REPO

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-WebRequest -Uri "https://github.com/uclax-teach/uclax-web1-gohman-mitch-2025/blob/master/_start_here/scripts/windows11/1.install-windows-wsl.ps1" -UseBasicParsing | Invoke-Expression
```

3. Restart your computer
4. Windows Search > Windows Powershell - **!Important!** be sure to choose **"Run as Administrator"** on the right
5. type the following command and press enter

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-WebRequest -Uri "https://github.com/uclax-teach/uclax-web1-gohman-mitch-2025/blob/master/_start_here/scripts/windows11/2.install-windows-apps.ps1" -UseBasicParsing | Invoke-Expression
```

---

## CAN I REMOVE BELOW???!!!!!

## Windows Step 1: Install WSL

1. Windows Global Search
    1. Start typing **"Command Prompt"** - **!Important!** be sure to choose **"Run as Administrator"** on the right
    2. In the Command Prompt terminal type `wsl --install` and press **enter**
    3. **Restart Your Computer** (power down and power up)
2. Open Ubuntu App - Windows Global Search
    1. Type **"Ubuntu"**
    2. Choose **Ubuntu (App)** - **!Important!** be sure to choose **"Run as Administrator"** on the right
    3. Press any key, installation may take some time

## Windows Step 2: Installing Windows Apps

1. Install enhanced Windows Terminal
    1. **Open Windows Store**
    2. Search for **Windows Terminal** and **install**
2. Download & Install <a href="https://www.google.com/chrome/" target="googleChrome">Google Chrome</a>
3. Download the Course [UCLAX-WEB1-Starter](https://github.com/uclax-teach/UCLAX-Web1-Starter/archive/refs/heads/master.zip) Resource
    1. Extract the zip contents (Note: When Windows extracts the zip, it creates a duplicate subfolder. We only need the duplicate subfolder.)
    2. Inside the extracted folder, you will find the duplicate folder called **UCLAX-WEB1-Starter-master**
    3. Move the **UCLAX-WEB1-Starter-master** folder to a place that works for you (e.g. Desktop, external drive)
    4. Delete original zip and the extracted folder to avoid any confusion
    5. Rename the duplicate subfolder **UCLAX-WEB1-Starter-master** to **UCLAX-WEB1-Lastname-Firstname** (e.g. UCLAX-WEB1-Starter-master becomes UCLAX-WEB1-Gohman-Mitch)
4. Install <a href="https://code.visualstudio.com/download" target="vsCodeInstall">VS Code</a>
    1. After downloading, run installer
    2. Make sure all of the following is checked:
        1. **Add "Open with Code" Windows Explorer file context menu**
        2. **Add "Open with Code" Windows Explorer directory context menu**
        3. **Add to PATH**
    3. Open **UCLAX-WEB1-lastname-First** folder in **VS Code**
    4. Install App extensions
        1. Choose **Extensions** icon in left sidebar
        2. in search, type `@recommended`
        3. Next to **"WORKSPACE RECCOMMENDARIONS"**, click the **Cloud Download icon** to install all extensions

---

## Windows Step 3: Open Project in VS Code WSL

1. Open VS Code
2. Click the blue double arrows in bottom left
3. Start typing WSL, and choose the option to `WSL Connect`
4. Once VS Code is connected to your Ubuntu instance, we can right-click on any file on the left, and choose `Reveal in Explorer`
5. Move or Copy your **UCLAX-WEB1-lastname-First** to this directory
6. Back in VS Code, choose File > Open Folder > and Select your **UCLAX-WEB1-lastname-First** folder
7. Open Terminal: **Menu > Terminal > New Terminal**
8. Run the following command: `bash ./_setup/scripts/win.install.sh`
9. CAN I OMIT THE FOLLOWING? Now in Script?
    1. Choose File > Open Folder > and Select your **/home/username** folder
    2. Open `.zshrc` in left sidebar
    3. Change plugins section (around line 73) to include nvm as follows: `plugins=(git nvm)`
    4. Choose File > Open Folder > and Select your **UCLAX-WEB1-lastname-First** folder
    5. Open new terminal **Menu > Terminal > New Terminal**
    6. In terminal, upper right, click on down caret and choose `Select Default Profile`
    7. In option window, choose `zsh`
    8. Open new terminal **Menu > Terminal > New Terminal**
    9. Run Command: `nvm install v20.9.0`
    10. Run Command: `nvm use v20.9.0`
    11. Run Command: `nvm alias default v20.9.0`
    12. Run command: `npm install`

[Part 2: Shared Setup](./Shared-Setup.md)
