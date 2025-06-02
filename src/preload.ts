// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, func) =>
      ipcRenderer.on(channel, (_event, ...args) => func(_event, ...args)),
    removeListener: (channel, func) =>
      ipcRenderer.removeListener(channel, func),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args), // Thêm dòng này
  },
});
