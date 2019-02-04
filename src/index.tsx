// Add polyfills to support IE11. This needs to be declared at the very top.
import 'react-app-polyfill/ie11';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.Suspense fallback='loading...'>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.Suspense>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
