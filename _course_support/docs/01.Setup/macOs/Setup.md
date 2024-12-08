# Part 1: System Setup: Uclax Web 1: macOs

[Back to Main](../../../../readme.md)

## Install Mac Apps

### Heads Up

-   Note: You will be prompted to install Xcode Command Line Tools via a system dialog. This is a separate window, and will require you to provide your macOs System Admin password (the one you use to log into your computer).

### Steps

1. Open macOS Terminal App
2. paste the following, and press enter

    ```bash
    bash -i -c "$(curl -sSL https://raw.githubusercontent.com/uclax-teach/uclax-web1-gohman-mitch-2025/refs/heads/master/_course_support/scripts/macOs-v7/1.macOs-mac-apps-part1.sh)"
    ```

3. If asked, enter your macOS System password
4. It will perform a buncha updates, this may take a little bit of time depending on your Internet connection and System
5. When prompted, provide your First, Last and Email (this will be used to set up your folder)
6. Answer any prompts that show up
7. Say YES to making ZSH as your default terminal
8. Run the following command

    ```bash
    bash -i -c "$(curl -sSL https://raw.githubusercontent.com/uclax-teach/uclax-web1-gohman-mitch-2025/refs/heads/master/_course_support/scripts/macOs-v7/2.macOs-mac-apps-part2.sh)"
    ```

9. Quit macOS terminal

## Setup Course Folder

Your course folder should now be on your desktop (e.g. UCLAX-Web1-Lastname-First).

1. **Open Visual Studio Code**
2. _Tip: you may want to pin to your Dock as this is our go to app for the rest of the course_
3. Choose **File / Open Folder**
4. Select your course folder on the Desktop (e.g. UCLAX-Web1-Lastname-First), and press open
5. Choose **Terminal / New Terminal**
6. paste the following in the terminal, and press enter

    ```bash
    bash -i -c "$(curl -sSL https://raw.githubusercontent.com/uclax-teach/uclax-web1-gohman-mitch-2025/refs/heads/master/_course_support/scripts/macOs-v7/3.macOs-zsh-course-folder.sh)"
    ```

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

SSH keys are a secure way to connect to your Github account without having to constantly provide username and password.

1. Follow instruction to [Add SSH Keys to **macOs)**](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=mac)
    - Note: All commands will be entered in VS Code terminal
2. Add SSH Key to Github
    1. click your **profile icon** upper right
    2. Choose **Settings**
    3. Select **SSH and GPG Keys** in left sidebar
    4. Click **New SSH Key** button, upper right
    5. Title: Pick something to represent your computer (e.g `Macbook Pro`, `Mac Studio`)
    6. Key
        1. Obtain Key
            1. Open VS Code Terminal
            2. Type `code ~/.ssh/id_ed25519.pub`
            3. Copy the text in the new file that shows up e.g. `ssh-ed25519 AAAAC3Nsfsddfsfgsdfgsdfgsdtrg meatched+ghub-win1@gmail.com`
        2. Paste into Github SSH Key field
    7. Click **Add SSH Key**

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

## Completion

Ask Instructor to come in and review your setup and answer any questions you may have.
