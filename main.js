const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

function createWindow(incognito = false) {
    const win = new BrowserWindow({
        autoHideMenuBar: true,
        show: false,
        icon: path.join(__dirname, "assets", "youtube.ico"),
        backgroundColor: "#0f0f0f",
        webPreferences: {
            partition: incognito ? "nopersist:youtube-incognito" : "persist:youtube"
        }
    });

    win.maximize();
    win.loadURL("https://www.youtube.com");

    win.once("ready-to-show", () => {
        win.show();
    });

    return win;
}

app.whenReady().then(() => {
    // Open the normal YouTube window
    createWindow(false);

    // Ctrl + Shift + N opens an incognito window
    globalShortcut.register("CommandOrControl+Shift+N", () => {
        createWindow(true);
    });
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});