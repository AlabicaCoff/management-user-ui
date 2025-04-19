# Management User Web UI

## Introduction
Management User Web UI is a web-based application interface designed to integrate with the Management User Web API, enabling system administrators to manage user accounts, roles, and permissions.

## Management User Web UI Features
* Public (non-authenticated) users can not access to the website
* Login Page: Users can signup and login to their accounts
* Documents Page: Users can see list of documents mock data
* Users Dashboard: Only authenticated users can manage existing user on the system based on their assigned permissions
* For example, employee role's user can read only other user details but can not create, update, and delete user details, roles, and permissions

## Development Quickstart
This section offers a basic tutorial to tell you how to set up the UI project.

### Prerequisites
* [VS Code](https://code.visualstudio.com/download)
* [Node.js](https://nodejs.org/en/download)
* [Angular CLI 16.0.2](https://angular.dev/tools/cli/setup-local)

## Installation Guide
* Clone this repository [here](https://github.com/AlabicaCoff/management-user-ui.git)
* Run ```npm install``` to install all dependencies

## Usage
* Run ```ng serve --open``` to start the application
* Run the API project and Connect to the frontend on port 7263
* Go to localhost port 4200 to see the website

## Technologies Used
* [NodeJS](https://nodejs.org/)
* [Angular](https://angular.dev/)
* [Bootstrap](https://getbootstrap.com/)

## Authors
* [AlabicaCoff](https://github.com/AlabicaCoff)
