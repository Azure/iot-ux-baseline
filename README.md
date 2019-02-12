# Azure IoT UX Baseline

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and added the following features that are required by almost all Azure IoT UX solutions:

- [Typescript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [I18-Next](https://react.i18next.com) for internationalization.
- [Azure IoT UX Fluent Controls](https://github.com/Azure/iot-ux-fluent-controls) for common UX controls.
- [Azure IoT UX Fluent CSS](https://github.com/Azure/iot-ux-fluent-css) for the common Azure IoT color palette and themes.

## Getting Started

To get started with your own UX solution, fork this repo, run `npm install`, and start editing. `src/examples/index.tsx` is the one of the entry points and has examples of how all the above features work together.

You can learn more about the folder structure [here](#folder-structure) and individual features [here](#learn-more).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Folder Structure
- `public/`: 
    
    Contains the HTML file and public assets that need to exist outside the module system. See the section about [the public folder](https://facebook.github.io/create-react-app/docs/using-the-public-folder) for more information.

- `src/`: 

    You may create subdirectories inside src. For faster rebuilds, only files inside src are processed by Webpack. **You need to put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

    - `index.tsx`: This is the main javascript entry point. It initializes the base libraries (React, React Router, I18Next) and renders the `Shell`.

    - `shell/`: This folder contains all the components required to render the application's Shell (e.g., Masthead, Global Navigation, Workspace...). 

        - `navigation.tsx`: Contains all the components that should be injected into the global navigation.

        - `routes.tsx`: Contains all the `Route`s that should be rendered in the shell `workspace`. 
    
    - `areas/home/`, `areas/examples/`: These folders contain the application's own experiences. In general, an  application will have multiple feature areas (e.g., Homepage, Settings) - probably mapping to the different entry points in the global navigation - that should be loaded as separate javascript bundles. The `examples` feature area, for instance, pulls in several large components to render lists and date-time pickers that are not necessary to render the `home` feature, so we should not fetch and load them until they're needed.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- [React](https://reactjs.org/).
- [Azure IoT UX Fluent Controls](https://aka.ms/iotfluentcontrols).
- [Azure IoT UX Fluent CSS](https://github.com/Azure/iot-ux-fluent-css).
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [React-I18Next](https://react.i18next.com/)
