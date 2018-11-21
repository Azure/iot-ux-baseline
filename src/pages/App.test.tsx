import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const i18n = i18next
    .init({
      ns: ['translations'],
      defaultNS: 'translations',
      interpolation: {
        escapeValue: false, // not needed for react!!
      },
      react: {
        wait: true
      }
    });

  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});