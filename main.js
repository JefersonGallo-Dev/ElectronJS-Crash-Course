const { app, BrowserWindow, Menu, shell, ipcMain  } = require('electron');
// include the Node.js 'path' module at the top of your file
const path = require('node:path')

// Define the menu items and the submenu //
// We can create items with different roles // 
const menuItems = [
  {
    label: "Menu",
    submenu: [
      {
        label: "About",
        click: async () => {
          const winAbout = new BrowserWindow({
            height: 500,
            width: 800,
            show: false,
            minimizable:false,
            movable:false,
            // frame: false,
            
            // webPreferences: {
            //   preload: path.join(__dirname, 'preload.js')
            // }
          });
          
          

          // win3.webContents.openDevTools();
          winAbout.loadURL("https://www.electronjs.org/docs/latest/")
          // win2.loadURL("https://www.electronjs.org/docs/latest/");
          winAbout.once("ready-to-show", () => winAbout.show());
          
        },
      },

    ]
  },
  {
    label: "File",
    submenu: [
      {
        label: "Open Camara",
        click: async () => {
          const win3 = new BrowserWindow({
            height: 500,
            width: 800,
            show: false,
            webPreferences: {
              preload: path.join(__dirname, 'preload.js')
            }
          });
          
          ipcMain.on('close_camerawin', (event, data) => win3.close());

          // win3.webContents.openDevTools();
          win3.loadFile("camera.html")
          // win2.loadURL("https://www.electronjs.org/docs/latest/");
          win3.once("ready-to-show", () => win3.show());
          
        },
      },
      {
        label: "Learn More",
        click: async () => {
          // ?? What is shell
          await shell.openExternal('https://www.electronjs.org/docs/latest/')
        },
      },
      
      {
        label: "New Window",
        click: async () => {
          const win2 = new BrowserWindow({
            height: 300,
            width: 400,
            show: false,
            backgroundColor: '#2e2c29',
            movable: false,
          });

          win2.loadFile("index2.html")
          // win2.loadURL("https://www.electronjs.org/docs/latest/");
          win2.once("ready-to-show", () => win2.show());
        },
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
        click: () => app.quit(),
      },
      {
        role: "close",
      },
    ]
  },
  {
    label: "Window",
    submenu: [
      {
        role: "minimize",
      },
      {
        role: "close",
      },
    ]
  },
];

// Build the menu from template //
const menu = Menu.buildFromTemplate(menuItems);
// Set the menu in the browser window //
Menu.setApplicationMenu(menu);

// Funciton to create the main window //
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      show:false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    ipcMain.on('set-image', (event, data) => {
      // const webContents = event.sender
      // const win = BrowserWindow.fromWebContents(webContents)
      // win.setTitle(title)
      // console.log(data)
      win.webContents.send("get-image", data);
    });
    
    
    // win.webContents.openDevTools();
    win.loadFile('index.html');
    win.once("ready-to-show", () => win.show())
  };

// Create the window when the app is ready //
app.whenReady().then(() => {
    // Create the main vindow //
    createWindow();
    app.on('activate', () => {
      // Create a new window if there is no windows opened //
      if (BrowserWindow.getAllWindows().length === 0){
        createWindow();
      } 
    })
});


app.on('window-all-closed', () => {
  // Implementatio for MacOS //
  if (process.platform !== 'darwin'){
    app.quit();
  } 
});




