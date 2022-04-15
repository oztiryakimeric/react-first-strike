# React First Strike

Pre-configured and ready to use CRA template. To save time in setting common things -firebase, authentication, localization etc- up for new project. Just clone and start developing without wasting time in doing same stuffs for every project.


- **Check the example app:** [Demonstrating the features](https://react-first-strike.web.app)

- **Browse in VS Code:** [![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github1s.com/oztiryakimeric/react-first-strike)

## Overview
Things included in this starter app;
- React 18 💞
- Routing system with restricted routes
- React MUI library with theming support
- Firebase auth, remote config, analytics and some other services
  - Authenticate with social providers
  - Remote config for config management, in the starter code you can change the theme color remotely
  - User interactions across app -page navigation, modal openings etc- automatically logged to firebase analytics
- i18next localization
- Overlay management which handles modals and drawers in an easy way
  - Manage overlays with utilizing useDialog and useDrawer hooks
  - These overlays can be queued in order to adapt your needs
- Data driven form generation
  - Create forms with plain json objects and validate them
- Eslint & Prettier, absolute imports

## Details
- #### Folder Structure
  ```
	📦 src
	┣ 📂 common - Common components used across application
	┣ 📂 context - Context providers
	┃ ┗ 📜 OverlayContext.js - Manages modal and drawers.
	┃ ┗ 📜 SnackbarContext.js - Manages snackbar messages.
	┃ ┗ 📜 ThemeContext.js - Responsible with theme modes and coloring.
	┃ ┗ 📜 UserContext.js - Responsible with authentication
	┣ 📂 scene - Each scene -Page, Dialog etc- defined in this folder
	┃ ┣ 📂 example-scene
	┃ ┃ ┣ 📂 component - Scene related components here
	┃ ┃ ┣ 📂 dialog - Scene's dialogs here
	┃ ┃ ┣ 📂 page - Scene's pages here
	┃ ┃ ┣ 📂 service - Scene's services here 
	┃ ┣ 📂 ...
	┃ ┗ 📜 Navigation.js - Route definitions here
	┗ 📜 App.js - Application's main component 
	┗ 📜 index.js - The main entry point
	┗ 📜 Constants.js - Contants used across project
	
	```


## Install & Start

Create React App with the template

```shell
npm create react-app --template cra-template-rfs my-app
```

In order to run this application, you have to create firebase app on firebase console and add credentials to **.env** file like in the **.env.example** file.

[Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)


Start and check our example app, if you want

```shell
cd my-app
npm start
```

## Docs

Coming soon

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)