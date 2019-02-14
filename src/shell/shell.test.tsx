import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import Shell from './shell';

it('renders without crashing', () => {
  const div = document.createElement('div');
  i18next
    .use(initReactI18next)
    .init({
      ns: ['translations'],
      defaultNS: 'translations',
      interpolation: {
        escapeValue: false, // not needed for react!!
      },
    });

  ReactDOM.render(
    <React.Suspense fallback=''>
      <Shell />
      </React.Suspense>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});