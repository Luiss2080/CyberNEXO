const { contextBridge, ipcRenderer } = require('electron');

// Exponemos APIs extremadamente limitadas al motor de React (Frontend).
// Esto cumple el requisito de aislar React del sistema operativo (Context Isolation).
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform
});
