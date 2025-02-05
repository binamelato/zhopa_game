const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let mainWindow;
let popupWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
		transparent: true,
        width: 1300,
        height: 740,
		icon: path.join(__dirname, 'ico/logo.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false,
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
	
	mainWindow.webContents.openDevTools();
}

// Функция для создания popup окна с заданными размерами
function createPopupWindow(width, height) {
    popupWindow = new BrowserWindow({
		titleBarStyle: 'hidden',
		transparent: true,
        width: width,
        height: height,
        parent: mainWindow,
        modal: true,
        resizable: false,
		icon: path.join(__dirname, 'ico/logo.ico'),
        webPreferences: {
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false,
        }
    });

    popupWindow.loadFile('popup.html'); // Загрузим HTML для popup окна
    popupWindow.on('closed', () => {
        popupWindow = null;
    });	
	
}

// Запуск основного окна
app.whenReady().then(createMainWindow);

// Слушаем события от рендер-процесса (вызов из index.html)
ipcMain.handle('open-popup', (event, width, height) => {
    createPopupWindow(width, height);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
