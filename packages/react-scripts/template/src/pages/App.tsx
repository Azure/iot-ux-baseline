import * as React from 'react';
import { Trans, TranslationFunction } from 'react-i18next';
import { Route, Switch, Link } from 'react-router-dom';
import * as classnames from 'classnames/bind';
import { Navigation } from '@azure-iot/ux-fluent-controls/lib/components/Navigation';
import { Masthead } from '@azure-iot/ux-fluent-controls/lib/components/Masthead';
import { Shell } from '@azure-iot/ux-fluent-controls/lib/components/Shell';
import { I18n, i18nInstance } from '../i18n';

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
      <I18n>{loc =>
        <Shell theme='light' isRtl={isRtl()}>
          <div className={cx('app')} onClick={this.handleViewCollapse}>
            {this.renderNav(loc)}
            {this.renderMasthead(loc)}
            <header className={cx('header')}>
              <img src={logo} className={cx('logo')} alt='logo' />
              <h1 className={cx('title')}>{loc('title')}</h1>
            </header>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
              </Switch>
          </div>
        </Shell>
      }</I18n>
    );
  }

  renderNav(loc: TranslationFunction) {
    const items = [
      {
        key: 'home',
        to: '/',
        icon: 'icon icon-home',
        label: loc('navigation.home'),
        title: loc('navigation.home')
      },
      {
        key: 'about',
        to: '/about',
        icon: 'icon icon-multitask',
        label: loc('navigation.about'),
        title: loc('navigation.about')
      }
    ];

    return <Navigation items={items} isExpanded={this.state.isNavExpanded} onClick={this.handleGlobalNavToggle} />;
  }

  renderMasthead(loc: TranslationFunction) {
    return <Masthead
      branding={<Link to='/'>{loc('masthead')}</Link>}
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
      <Trans i18nKey='description.home'>
        To get started, edit <code>src/pages/App.tsx</code> and save to reload.
      </Trans>
    </p>
  </div>
);

const About = () => (
  <I18n>{loc =>
    <p className={cx('intro')}>
      {loc('description.about')}
    </p>
  }</I18n>
);

function isRtl() {
  return i18nInstance.dir() as any === 'rtl';
}
