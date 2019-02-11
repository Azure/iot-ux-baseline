// Add polyfills to support IE11. This needs to be declared at the very top.
import 'react-app-polyfill/ie11';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as i18n from './i18n';
import { ErrorBoundary } from './errorBoundary';
import Shell from './shell/shell';
import * as serviceWorker from './serviceWorker';

// initialize the i18next instance before rendering anything:
i18n.initInstance();

// Render <Shell> in the #root dom element. Shell requires:
// 1. <BrowserRouter> that provides the routing functionality.
// 2. <Suspense> that provides a fallback when we're async-loading the js bundles
//    and i18n resjsons. The fallback should result in an empty #root element,
//    which triggers the default loading styles in public/index.html.
// 3. <ErrorBoundary> that displays an error message if something fails with the 
//    async request. At this point, we can't rely on anything else working so 
//    just display a static hardcoded message.
ReactDOM.render(
    <ErrorBoundary message='Something went wrong'>
        <React.Suspense fallback=''>
            <BrowserRouter>
                <Shell />
            </BrowserRouter>
        </React.Suspense>
    </ErrorBoundary>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
