<h1 align="center">Roulette Simulation</h1>


# Table of Contents

- [Setting Up](#setting-up)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)


# Setting Up

This assumes that npm, git, and electron are installed. First copy the repository over to the local machine and inside the root directory of the project as administrator run:
```js
npm install
```
This will handle the installation of all node_modules.


# Running the App

In the root directory of the repository run:
```js
electron .
```
in order to load the app.


# Building the App

This assumes that electron-packager is installed along with electron-wix-msi (for Windows) or electron-installer-debian (for Debian based Linux distributions). In the root directory of the repository, as administrator, build an installer for Windows x64 via:
```js
npm run buildWindows-amd64
```
For Debian based Linux distributions build an installer via:
```js
npm run buildLinux-amd64
```
or
```js
npm run buildLinux-arm64
```
depending on the desired architecture. The resulting msi or deb files will be placed inside of /build. 