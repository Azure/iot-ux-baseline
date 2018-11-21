# CHANGELOG

## v2.0.0
### Modified
- Switched to Create React App v2, which supports typescript and sass without ejecting. **This project is no longer a fork of CRA and does not provide a CLI anymore:** to create an Azure IoT UX solution, fork this repo and start modifying `src/pages/App.tsx`.

  This change allows us to track the upstream dependencies (React, Webpack, Babel) and get fixes automatically: this work was prompted because webpack-dev-server@2 has a high-severity vulnerability which is not fixed till its v3. However, its v3 depends on webpack@4, which breaks a lot of our existing webpack scripts.

### Deprecated
- @microsoft/azure-iot-react-scripts
- @microsoft/azure-iot-create-react-app

## v1.0.0
### Added
- Forked [Create React App](https://github.com/facebook/create-react-app) and modified its react-scripts to support typescript, sass, i18-next, Azure IoT Fluent Controls and CSS.