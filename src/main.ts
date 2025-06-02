import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { updateElectronApp } from 'update-electron-app';
import dotenv from 'dotenv';
import connectToLive, { disconnectLive } from './services/tiktokLive';
import env from '../env.json';
import { windowControl } from './ipcControl/windowControl';
import { textToMp3 } from './services/textToMp3';
// import { textToMp3 } from './services/textToMp3';
// import { playMp3AndDelete } from './services/playSound';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
let currentConnection: any = null;
console.log(env.githubRepo);

updateElectronApp({
  repo: env.githubRepo, // Repository GitHub của bạn
  updateInterval: '1 hour', // Kiểm tra cập nhật mỗi giờ
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
    frame: false,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
  ipcMain.on('tiktok-connect', async (event, username) => {
    if (currentConnection) {
      try {
        await disconnectLive();
      } catch (error) {
        console.error('Disconnect error:', error);
      }
      currentConnection = null;
    }
    try {
      currentConnection = await connectToLive(username, async (chat) => {
        event.sender.send('tiktok-chat', chat);
        // const path = await textToMp3(`${chat.nickname}, ${chat.comment}`);
        // await playMp3AndDelete(path);
      });
      // Kết nối thành công, mở launcher
    } catch (error) {
      event.sender.send(
        'tiktok-error',
        'Có lỗi xảy ra trong quá trình kết nối'
      );
      console.error('Connect error:', error);
    }
  });
  ipcMain.on('tiktok-disconnect', async (event) => {
    try {
      await disconnectLive();
      event.sender.send('tiktok-disconnected');
      // Nếu có cleanup khác thì thêm ở đây
    } catch (error) {
      console.error('Disconnect error:', error);
    }
    currentConnection = null;
  });
  windowControl(mainWindow);
  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
ipcMain.handle(
  'text-to-mp3',
  async (_event, text: string, filename?: string) => {
    try {
      const path = await textToMp3(text, filename);
      return { success: true, path };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
