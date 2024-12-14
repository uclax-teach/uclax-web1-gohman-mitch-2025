# Favicon Lesson

1. open `favicon.psd` in photoshop and edit until you get your desired icon
2. save for web as png 28 and overwrite `favicon.png`
3. Head over to https://favicon.io/favicon-converter/
    1. drop `favicon.png` into well
    2. download and extract the zip of favicon files
4. place inside of public dir `/public/favicon`
5. copy and paste meta into `index.html`
6. Update index.html meta and `site.webmanifest` link references to point to `/public/favicon` folder
7. Update `site.webmanifest` name and short_name to match your app.
