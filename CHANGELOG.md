# CHANGELOG

## v2.1.1
### Modified
- Change font url

## v2.1.0
### Modified
- Point to font files hosted on https://static.azureiotcentral.com/

## v2.0.0
### Modified
- Switched to Create React App v2, which supports typescript and sass without ejecting. **This project is no longer a fork of CRA and does not provide a CLI anymore:** to create an Azure IoT UX solution, fork this repo and start modifying `src/pages/App.tsx`.

  This change allows us to track the upstream dependencies (React, Webpack, Babel) and get fixes automatically: this work was prompted because webpack-dev-server@2 has a high-severity vulnerability which is not fixed till its v3. However, its v3 depends on webpack@4, which breaks a lot of our existing webpack scripts.

### Migration Guide
  If you're migrating from baseline v1:

  1. Copy the following files from this repo to yours:

      * `package.json` and `package-lock.json` (and add back any additional packages on top: this avoids pulling in extra/conflicting dependencies.)
      * tsconfig.json
      * Everything in `src/`. In particular:
          * App.tsx has a few changes to work the new libraries, so get the latest version and add back your modifications.
          * App.scss has been renamed to App.modules.scss - add back your modifications there.
          * index.js and registerServiceWorker.js have been replaced with index.tsx and serviceWorker.ts

  2. Rename all your custom `.scss` files to `.module.scss` to enable classname mangling - this is the new [convention required by Create-React-App](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)

  3. The new webpack scripts have a slightly different way of resolving default imports, so you'll probably have to replace:
      * `import * as classnames from 'classnames/bind'` -> `import classnames from 'classnames/bind';`

     to avoid build errors.

### Deprecated
- @microsoft/azure-iot-react-scripts
- @microsoft/azure-iot-create-react-app

## v1.0.0
### Added
- Forked [Create React App](https://github.com/facebook/create-react-app) and modified its react-scripts to support typescript, sass, i18-next, Azure IoT Fluent Controls and CSS.