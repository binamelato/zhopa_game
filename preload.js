const { contextBridge, ipcRenderer } = require('electron');

// Экспортируем API для рендер-процесса
contextBridge.exposeInMainWorld('electronAPI', {
    openPopup: (width, height) => ipcRenderer.invoke('open-popup', width, height)
});

