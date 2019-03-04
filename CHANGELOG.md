# CHANGELOG

## v4.0.0
## Modified
- Update to react@16.8 to get support for [Hooks](https://reactjs.org/docs/hooks-intro.html).
- Update to i18next@14, which contains breaking API contract changes and supports react suspense and hooks
- Update folder structure to align with team structure and make code contributions easier. Main changes:
    - Move all the bootstrapping code to `src/shell`. 
    - Create `src/areas` to hold all feature code. `src/areas/home/home.tsx` is a good place to start.
    - Create `src/examples` to demonstrate how to use Routing and Fluent Controls.

### Migration Guide
If you're migrating from baseline v2/v3:
- Update your packages to match the new `package.json`.
- Pull in `shell/`, `index.tsx`, `i18n.tsx`, and `errorBoundary.tsx` from `src/`.
- Add your global navigation items in `shell/navigation.tsx`.
- Add your routes in `shell/routes.tsx`.
- `react-i18next` no longer provides a `TranslationFunction` or `I18n` HOC, so get it from `src/i18n.tsx` instead.

## v3.0.1
### Modified
- Update to latest fluent controls library to fix minor uialignment issues.
- The collapse/expand behavior of the nav menu in masthead (shown on small screen sizes) is decoupled from the main navbar, so we don't have multiple menus expanded in the masthead.

## v3.0.0
### Modified
- Updated to v6 of the fluent css and control libraries. 
- Masthead and Navigation are now part of Shell to ensure good responsive behavior. The App now passes MastheadProperties and NavigationProperties to FluentShell instead of creating the components separately.

### Added
- Settings context panel to control the theme.

## v2.1.2
### Modified
- Updated to react-scripts@2.1.3 to fix npm audit.

## v2.1.1
### Modified
- Change font url
- Update control lib version

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