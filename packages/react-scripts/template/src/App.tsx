import * as React from 'react';

const cx = require('classnames/bind').bind(require('./App.scss'));
const logo = require('./logo.svg');

interface Properties {
}

interface State {
}

export class App extends React.Component<Properties, State>  {
  render() {
    return (
      <div className={cx('App')}>
        <header className={cx('App-header')}>
          <img src={logo} className={cx('App-logo')} alt='logo' />
          <h1 className={cx('App-title')}>Welcome to the Azure IoT Baseline UX</h1>
        </header>
        <p className={cx('App-intro')}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
