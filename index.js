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
    	"resizable": false,
    	"webPreferences": {
    		"nodeIntegration": true,
    		"contextIsolation": false
    	},
    	"icon": __dirname + "/assets/casinoIcon.ico"
	});
	win.loadFile(path.join(__dirname, "pages", extension + ".html"));
  	return win;
};



/*

Create the system tray icon and menu. 

	- mode is either "h" or "s" depending on whether the system icon menu should have the option to hide or show the app.
	- win is an object that represents the primary window of the Electron app. 
	- trayObj and Menu are objects provided by the Electron app to handle the loading of the app tray and menu.

*/ 
var createTrayMenu = (mode, win, trayObj, Menu) => {
	var label = (mode == "h" ? "Hide" : "Show");
	trayObj.setToolTip("Roulette Simulator");
	trayObj.setContextMenu(Menu.buildFromTemplate([
		{ "label": label, click: () => {
			if(mode == "h") {
				win.hide();
				createTrayMenu("s", win, trayObj, Menu);
			}
			else {
				win.show();
				createTrayMenu("h", win, trayObj, Menu);
			}
		}},
		{ "label": "Quit", "role": "quit" }
	]));
};



/*

Remove duplicates of the result window.

	- browser is the BrowserWindow object provided by the Electron app.

*/ 
var removeResultWindows = browser => {
	var list = browser.getAllWindows();
	if(list.length >= 2) {
		for(var i = 0; i < list.length; i++) {
			if(list[i].getTitle() == "Roll Results") {
				list[i].close();
			}
		}
	}
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
    	removeResultWindows(BrowserWindow);
    	var resultWindow = createWindow("result", BrowserWindow, path);
    	resultWindow.webContents.on("did-finish-load", () => {
    		resultWindow.webContents.send("resultData", data);
    	});
    });

  	// Create the system tray icon and menu. 
  	tray = new Tray(path.join(__dirname, "assets", "casinoIcon.png"));
	createTrayMenu("h", primaryWindow, tray, Menu);
});



// Ensures the Electron app closes properly.
app.on("window-all-closed", () => {
	if(process.platform !== "darwin") {
    	app.quit();
  	}
});