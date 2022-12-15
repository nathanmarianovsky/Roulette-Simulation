
const { MSICreator } = require("electron-wix-msi"),
    debInstaller = require('electron-installer-debian'),
    path = require("path"),
    fs = require("fs");

var windowsBuild = () => {
    const msiCreator = new MSICreator({
        "appDirectory": path.resolve(__dirname, "Roulette-Simulation-win32-x64"),
        "outputDirectory": path.resolve(__dirname, "build", "Installer-Windows-x64"),
        "description": "Simulates all possible rolls for a given layout.",
        "exe": "Roulette-Simulation",
        "name": "Roulette Simulation",
        "manufacturer": "Nathan Marianovsky",
        "shortcutName": "Roulette Simulation",
        "shortcutFolderName": "Roulette Simulation",
        "version": "1.0.0",
        "icon": path.resolve(__dirname, "assets", "casinoIcon.ico"),
        "arch": "x64",
        "ui": {
            "chooseDirectory": true
        }
    });

    msiCreator.create().then(() => {
        msiCreator.compile().then(() => {
            fs.rmSync(path.resolve(__dirname, "Roulette-Simulation-win32-x64"), {"recursive": true, "force": true});
        });
    });
};



var debBuild = arch => {
    const options = {
        "src": path.resolve(__dirname, "Roulette-Simulation-linux-x64"),
        "dest": path.resolve(__dirname, "build", "Installer-Debian-" + (arch == "amd64" ? "x64" : "ARM")),
        "icon": path.resolve(__dirname, "assets", "casinoIcon.ico"),
        "productName": "Roulette Simulation",
        "arch": arch
    }
    debInstaller(options).then(() => {
        fs.rmSync(path.resolve(__dirname, "Roulette-Simulation-linux-" + (arch == "amd64" ? "x64" : "arm")), {"recursive": true, "force": true});
        const buildPath = path.resolve(__dirname, "build", "Installer-Debian-" + (arch == "amd64" ? "x64" : "ARM")),
            list = fs.readdirSync(buildPath);
        fs.renameSync(path.join(buildPath, list[0]), path.join(buildPath, "roulette-simulation-x64.deb"));
    });
};


for(var i = 0; i < process.argv.length; i++) {
    var current = process.argv[i];
    if(current == "-x64Windows") { windowsBuild(); }
    else if(current == "-x64Debian") { debBuild("amd64"); }
    else if(current == "-armDebian") { debBuild("arm"); }
}