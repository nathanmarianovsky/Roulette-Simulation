/*

Declare all of the necessary variables.

    - MSICreator and debInstaller provide the means to create msi and deb files.
    - fs and path provide the means to work with local files.

*/
const { MSICreator } = require("electron-wix-msi"),
    debInstaller = require('electron-installer-debian'),
    path = require("path"),
    fs = require("fs");



/*

Builds the msi installer for Windows.

*/
var windowsBuild = () => {
    // Provide all of the necessary details for the creation of the msi build file.
    const msiCreator = new MSICreator({
        "appDirectory": path.resolve(__dirname, "Roulette-Simulation-win32-x64"),
        "outputDirectory": path.resolve(__dirname, "build", "Installer-Windows-amd64"),
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
    // Generate the msi file and remove the folder created by electron-packager in the process.
    msiCreator.create().then(() => {
        msiCreator.compile().then(() => {
            fs.rmSync(path.resolve(__dirname, "Roulette-Simulation-win32-x64"), {"recursive": true, "force": true});
        });
    });
};



/*

Builds the deb installer for Debian based Linux distributions.

   - arch is a string being either the value "amd64" or "arm64" representing the desired architecture of the build file.

*/
var debBuild = arch => {
    // Provide all of the necessary details for the creation of the deb build file.
    const options = {
        "src": arch == "amd64" ? path.resolve(__dirname, "Roulette-Simulation-linux-x64") : path.resolve(__dirname, "roulette-simulation-linux-arm64"),
        "dest": path.resolve(__dirname, "build", "Installer-Debian-" + (arch == "amd64" ? "amd64" : "arm64")),
        "icon": path.resolve(__dirname, "assets", "casinoIcon.ico"),
        "productName": "Roulette Simulation",
        "arch": arch
    }
    // Generate the deb file and remove the folder created by electron-packager in the process.
    debInstaller(options).then(() => {
        arch == "amd64" ? fs.rmSync(path.resolve(__dirname, "Roulette-Simulation-linux-x64"), {"recursive": true, "force": true}) : fs.rmSync(path.resolve(__dirname, "roulette-simulation-linux-arm64"), {"recursive": true, "force": true});
        const buildPath = path.resolve(__dirname, "build", "Installer-Debian-" + (arch == "amd64" ? "amd64" : "arm64")),
            list = fs.readdirSync(buildPath);
        fs.renameSync(path.join(buildPath, list[0]), path.join(buildPath, "roulette-simulation-" + (arch == "amd64" ? "amd64" : "arm64") + ".deb"));
    });
};



// Build all of the desired installers.
for(var i = 0; i < process.argv.length; i++) {
    var current = process.argv[i];
    if(current == "-amd64Windows") { windowsBuild(); }
    else if(current == "-amd64Debian") { debBuild("amd64"); }
    else if(current == "-armDebian") { debBuild("arm64"); }
}