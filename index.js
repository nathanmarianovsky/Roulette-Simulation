/*

Declare all of the necessary variables.

	- app, BrowserWindow, Menu, MenuItem, Tray, and ipc provide the means to operate the Electron app.
	- fs and path provide the means to work with local files.
	- contextMenu provides the means to handle the menu associated to a right-click in the app.

*/
const { app, BrowserWindow, Menu, MenuItem, Tray } = require("electron"),
	ipc = require("electron").ipcMain,
	path = require("path"),
	fs = require("fs"),
	contextMenu = require('electron-context-menu');



/*

Executes the creation of the primary window with all necessary parameters.

	- extension refers to the html file name. 
	- width and height are the physical parameters for describing the created window size.

*/
var createWindow = (extension, BrowserWindow, path, width = 1000, height = 800) => {
  	var win = new BrowserWindow({
		"width": width,
    	"height": height,
    	"autoHideMenuBar": true,
    	"center": true,
    	"resizable": true,
    	"webPreferences": {
    		"nodeIntegration": true,
    		"contextIsolation": false
    	}
    	// "icon": __dirname + "/assets/favicon.ico"
	});
	win.loadFile(path.join(__dirname, "pages", extension + ".html"));
  	return win;
};



// Loads the Electron app by creating the primary window. 
app.whenReady().then(() => {
	// Create the Electron app menu.
	const template = [
		{"label": "Edit", "submenu": [
				{ "role": "undo" },
				{ "role": "redo" },
				{ "type": "separator" },
				{ "role": "cut" },
				{ "role": "copy" },
				{ "role": "paste" }
			]
		},
		{"label": "View", "submenu": [
				{ "role": "reload" },
				{ "role": "toggledevtools" },
				{ "type": "separator" },
				{ "role": "resetzoom" },
				{ "role": "zoomin" },
				{ "role": "zoomout" },
				{ "type": "separator" },
				{ "role": "togglefullscreen" }
			]
		},
		{"label": "Window", "submenu": [
				{ "role": "minimize" },
				{ "role": "quit" }
			]
		}
	];
	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
	contextMenu({
		"showSelectAll": true
	});

	// Create the primary window.
  	var primaryWindow = createWindow("primary", BrowserWindow, path);
  	primaryWindow.maximize();

  	// Loads the creation of a primary window upon the activation of the app.
  	app.on("activate", () => {
    	if(BrowserWindow.getAllWindows().length === 0) {
      		createWindow("primary", BrowserWindow, path);
    	}
  	});

  	// Close the Electron app if the primary window is closed.
  	primaryWindow.on("close", () => {
    	primaryWindow = null;
       	app.quit();
    });

    ipc.on("result", (event, data) => {
    	var resultWindow = createWindow("result", BrowserWindow, path);
    	resultWindow.webContents.on("did-finish-load", () => {
    		// console.log(data);
    		resultWindow.webContents.send("resultData", data);
    	});
    });

  	// Handle the load of the home page.
  	// ipc.on("primaryLoad", event => {
  	// 	mainWindow.loadFile(path.join(__dirname, "pages", "", "primary.html"));
  	// });

  	// Create the system tray icon and menu. 
  	// tray = new Tray(path.join(__dirname, "/assets/logo.png"));
	// tools.createTrayMenu("h", primaryWindow, tray, Menu);

	// Add all of the back-end listeners.
	// appListeners.addListeners(app, BrowserWindow, path, fs, exec, ipc, tools, primaryWindow);
});



// Ensures the Electron app closes properly.
app.on("window-all-closed", () => {
	if(process.platform !== "darwin") {
    	app.quit();
  	}
});