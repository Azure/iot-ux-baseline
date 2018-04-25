import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';
import { I18nContainer } from './i18n';

ReactDOM.render(
  <I18nContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </I18nContainer>,
  document.getElementById('root')
);

registerServiceWorker();
