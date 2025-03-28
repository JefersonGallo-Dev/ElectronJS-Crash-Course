

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

const { contextBridge, ipcRenderer } = require('electron/renderer')
contextBridge.exposeInMainWorld('electronAPI', {
  sendImage: (data) => ipcRenderer.send('set-image', data),
  getImage: (callback) => ipcRenderer.on('get-image', callback),
  closeCameraWin: () => ipcRenderer.send("close_camerawin"),
})

