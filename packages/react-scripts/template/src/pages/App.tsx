import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import * as classnames from 'classnames/bind';
import Shell from '../views/shell';
import Navigation from '../views/navigation';
import Masthead from '../views/masthead';

const cx = classnames.bind(require('./App.scss'));
const logo = require('./logo.svg');

interface Properties {
}

interface State {
  isNavExpanded: boolean;
}

export class App extends React.Component<Properties, State>  {
  constructor(props: Properties) {
      super(props);
      this.state = {
        isNavExpanded: false
      };
  }

  render() {
    return (
      <Shell theme='light'>
        <div className={cx('app')} onClick={this.handleViewCollapse}>
          {this.renderNav()}
          {this.renderMasthead()}
          <header className={cx('header')}>
            <img src={logo} className={cx('logo')} alt='logo' />
            <h1 className={cx('title')}>Welcome to the Azure IoT Baseline UX</h1>
          </header>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
            </Switch>
        </div>
      </Shell>
    );
  }

  renderNav() {
    const items = [
      {
        key: 'home',
        to: '/',
        icon: 'icon icon-home',
        label: 'Home',
        title: 'Home'
      },
      {
        key: 'about',
        to: '/about',
        icon: 'icon icon-multitask',
        label: 'About',
        title: 'About'
      }
    ];

    return <Navigation items={items} isExpanded={this.state.isNavExpanded} onClick={this.handleGlobalNavToggle} />;
  }

  renderMasthead() {
    return <Masthead
      branding={<Link to='/'>Azure IoT Baseline UX</Link>}
      user={{
          displayName: 'John Smith',
          email: 'jsmith@example.com'
      }}
    />;
  }

  handleGlobalNavToggle = (e: React.MouseEvent<any>) => {
      e.stopPropagation();
      this.setState({
          isNavExpanded: !this.state.isNavExpanded
      });
  }

  handleViewCollapse = (e: React.MouseEvent<any>) => {
      e.stopPropagation();
      if (this.state.isNavExpanded) {
        this.setState({
          isNavExpanded: false
        });
      }
  }
}

export default App;

const Home = () => (
  <div>
    <p className={cx('intro')}>
      To get started, edit <code>src/pages/App.tsx</code> and save to reload.
    </p>
  </div>
);

const About = () => (
  <div>
    <p className={cx('intro')}>
      Hello, World!
    </p>
  </div>
);
