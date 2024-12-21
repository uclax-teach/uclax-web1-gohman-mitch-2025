# Part 1: System Setup: Uclax Web 1: Windows

[Back to Main](../../../../readme.md)

## Pre Installation: Important Please Read

-   This tutorial covers Windwows 11 which is required for this course. If you are using Windows 10, in theory, as long as you have the latest version of 10 - you should be able to complete this setup. However, this has not been tested and you will have to resolve any differences that are not supported by your Operating System.
-   Make sure your Operating System is up to date
    -   Windows Search > `Check for Updates`
    -   Rinse and repeat until there are no more updates
-   Unlike macOS and Linux (at least out of the box), Windows does not support bash/terminal. In order to get Windows to act more like macOS and Linux, we need to enable Windows Subsystem for Linux (WSL).
-   Most of the time, you will want to open up apps as Administrator (e.g. **"Run as Administrator"**). This is called out throughout this setup tutorial
-   I am using Parallels WIndows 11 on MacOS. Its close to a 1:1 Windows, but not 100%. So there may be differences for us to troubleshoot.

## Install Windows WSL, Ubuntu and VS Code

_Note: When you run these installations scripts at some point your computer will restart. Please make sure to save any work and close out of any unlreated applications._

1. Windows Search > **Windows Powershell** - **!Important!** be sure to choose **"Run as Administrator"** on the right
2. type the following command and press enter

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-WebRequest -Uri "https://raw.githubusercontent.com/uclax-teach/uclax-web1-gohman-mitch-2025/refs/heads/master/_course_support/scripts/win11-v2/1.install-windows-apps.ps1" -UseBasicParsing | Invoke-Expression
    ```

3. Install Google Chrome, if you have not already (we will all use this browser to normalize instruction)
4. Once script completes you will be asked to restart your computer. Type "Y" for yes.

## Complete WSL Ubuntu Configuration

1. Windows Search > **Ubuntu** - **!Important!** be sure to choose **"Run as Administrator"** on the right
2. _Note: It may hang at "Installing, this may take a few minutes...". If it takes longer than 3 minutes press "enter" and "control + c"_
3. You will be asked to create a username and password - read the note below before entering
    1. Important: when you enter password, it will not show you typing. You have to trust its entering the characters you type
    2. Important: these are up to you, but make sure its something you remember
    3. press enter after each entry
4. Close out of the Ubuntu window

## VS Code and WSL: Add Course Folder and Install WSL Apps

1. Windows Search > **Visual Studio Code** _Note: You may want to pin this app to your taskbar_
2. Click the blue double arrows in bottom left
3. Start typing WSL, and choose the option to `WSL` (or `Connect to WSL`)
4. File > Open Folder
    1. Leave as default, and press "ok" (e.g. /home/username/, where username is the ubuntu username you set up)
    2. trust the authors if prompted
5. View > Terminal
6. Run the following command

    ```bash
    bash -i -c "$(curl -sSL https://raw.githubusercontent.com/uclax-teach/uclax-web1-gohman-mitch-2025/refs/heads/master/_course_support/scripts/win11-v2/2.wsl-ubuntu-root.sh)"
    ```

7. If asked, enter your Ubuntu WSL password your set up earlier
8. It will perform a buncha updates, this may take a little bit of time depending on your Internet connection and System
9. When prompted, provide your First, Last and Email (this will be used to set up your folder)
10. Answer any prompts that show up
11. Say YES to making ZSH as your default terminal
12. Close terminal by clicking trash icon in upper right of terminal

## Setup and Connect to Github

Git and Github are essential tools used by developers to share and collaborate on application code. You will be submitting all of your work through Github. We will also use this to collaborate when you run into issues with the lessons and your final project.

### Create and/or Login to Github

1. Sign up for a [Github account](https://github.com/join)
2. Log in to your [Github account](https://github.com/login)

### Github: Set default repo branch to master

1. After logging into your Github account, click your **profile icon** upper right
2. Click **Settings**
3. In left sidebar, click **Repositories**
4. Under **Repository default branch** set value to **master**
5. Click **Update**

### Github: Adding SSH Keys

SSH keys are a secure way to connect to your Github account without having to constantly provide username and password. SSH keys should have been set up when you ran the installation script. And the public key should be open in VS Code.

If you do not see it, try running the following command in any terminal.

`code ~/.ssh/id_ed25519.pub`

_Note: if no keys exist, call Instructor/TA in to your breakout room so we can assist you in manual installation using these instructions: [Add SSH Keys to **Windows WSL (Linux)**](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=linux)_.

1.  click your **profile icon** upper right
2.  Choose **Settings**
3.  Select **SSH and GPG Keys** in left sidebar
4.  Click **New SSH Key** button, upper right
5.  Title: Pick something to help you identify your computer (e.g `Windows Laptop`)
6.  Key: copy and paste the contents of `id_ed25519.pub` that is open in VS Code
7.  Click **Add SSH Key**

### Github: Create and Connect New Repo

1. After logging into your Github account, click on the **Plus Symbol** in upper right
2. Click **New Repository**
3. Fill in **Repository name:** `UCLAX-WEB1-Last-First` (e.g. UCLAX-WEB1-Gohman-Mitch)
4. Leave everything else as is (e.g. Public, defaults, etc)
5. Click **Create Repository** button at bottom
6. Make sure **SSH** is enabled (not https)
7. Click the **Copy** button of the section titled: **"…or push an existing repository from the command line"**
8. Back in VS Code, open terminal from prior steps (if you closed out **Menu > Terminal > New Terminal**)
9. **Paste** your clipboard into the terminal and **press enter**
10. Once it is done, you can refresh your Github Repo Page in the browser and you will see your project is now connected.

## Run System Requirements Check

With your Project Folder open in VS Code...

1. Choose **Terminal / New Terminal**
2. Paste the following in the terminal, and press enter

    ```bash
    bash -i -c "$(curl -sSL https://raw.githubusercontent.com/uclax-teach/uclax-web1-gohman-mitch-2025/refs/heads/master/_course_support/scripts/win11-v2/3.wsl-ubuntu-system-requirements-check.sh)"
    ```

Ask Instructor to come in and review your setup and answer any questions you may have.

[Windows Troubelshooting](./Troubleshooting.md)
