# Part 1: System Setup: Uclax Web 1: macOs

[Back to Main](../../../../readme.md)

## Install Mac Apps

### Heads Up

-   Note: You will be prompted to install Xcode Command Line Tools via a system dialog. This is a separate window, and will require you to provide your macOs System Admin password (the one you use to log into your computer).

### Run Installation Script

1. Open macOS Terminal App
2. paste the following, and press enter

    ```bash
    bash -i -c "$(curl -sSL https://raw.githubusercontent.com/uclax-teach/uclax-web1-gohman-mitch-2025/refs/heads/master/_course_support/scripts/macOs/1.macOs-mac-apps.sh)"
    ```

3. If asked, enter your macOS System password
4. It will perform a buncha updates, this may take a little bit of time depending on your Internet connection and System
5. When prompted, provide your First, Last and Email (this will be used to set up your folder)
6. Answer any prompts that show up
7. Say YES to making ZSH as your default terminal
8. Quit macOS terminal

## Open Your Course Folder in VS Code

Your course folder should now be on your desktop (e.g. UCLAX-Web1-Lastname-First), and should already be open in VS Code. It it is not open in VS Code - do the following:

1. **Open Visual Studio Code**
2. _Tip: you may want to pin to your Dock as this is our go to app for the rest of the course_
3. Choose **File / Open Folder**
4. Select your course folder on the Desktop (e.g. UCLAX-Web1-Lastname-First), and press open

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

_Note: if no keys exist, call Instructor/TA in to your breakout room so we can assist you in manual installation using these instructions: [Add SSH Keys to **macOs)**](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=mac)_.

1.  click your **profile icon** upper right
2.  Choose **Settings**
3.  Select **SSH and GPG Keys** in left sidebar
4.  Click **New SSH Key** button, upper right
5.  Title: Pick something to represent your computer (e.g `Macbook Pro`, `Mac Studio`)
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

## Production Deployment to Render.com

1. Create a `Render` account
    1. https://dashboard.render.com/register
    2. choose `Github` to grant Render access to your Github account
    3. Confirm your email and set up password
2. Render Dashboard
    1. `New / Web Service`
    2. Under `Git Provider` choose `GitHub`
        1. Choose your Github account / configure
        2. Select your Github Repo for your Project (e.g. `uclax-web1-lastname-firstname-2025`)
        3. Build command `npm install; npm run build`
        4. Run command `npm run start`
        5. `Instance Type` > `For hobby projects`: `Free`
        6. Enviornnment Variables
            1. PORT: 5999 (used by Render to serve up port exposed by app)
            2. Add other Environment Variables
        7. Deploy Service
    3. Monitor Build
    4. Once done, check out your site by clicking the link at the top (e.g. https://uclax-web1-gohman-mitch-2025-final.onrender.com)

### Things to Note

-   every time you deploy your work to Github `master`, it will automatically start a new production build
-   You can point a custom domain to your web application [Add Custom Domain](https://render.com/docs/custom-domains?_gl=1*ctzalt*_gcl_au*OTU5MDkzNTI0LjE3MzMzNTA1ODA.*_ga*MzcyNTk4MDg3LjE3MzMzNTA1ODA.*_ga_QK9L9QJC5N*MTczMzM1NDYyMi4yLjEuMTczMzM1NTg0Ny40Mi4wLjA.#2-configure-dns-with-your-provider)
-   The free version has low resources (.1 CPU) so your website app will be slow.
-   Render offers paid for tiers if you want to speed it up

## Run System Requirements Check

With your Project Folder open in VS Code...

1. Choose **Terminal / New Terminal**
2. Paste the following in the terminal, and press enter

    ```bash
    bash -i -c "$(curl -sSL https://raw.githubusercontent.com/uclax-teach/uclax-web1-gohman-mitch-2025/refs/heads/master/_course_support/scripts/macOs/2.macOs-system-requirements-check.sh)"
    ```

Ask Instructor/TA to come in and review your setup and answer any questions you may have.
