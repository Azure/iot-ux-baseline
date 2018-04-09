import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(require('./App.scss'));
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;


const Home = () => (
  <div>
    <p className={cx('App-intro')}>
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>
    <p className={cx('App-intro')}>
      <Link to='/about'>About</Link>
    </p>
  </div>
);

const About = () => (
  <div>
    <p className={cx('App-intro')}>
      Click <Link to='/'>here</Link> to go to the homepage.
    </p>
  </div>
);
