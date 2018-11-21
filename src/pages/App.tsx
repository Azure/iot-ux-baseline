import * as React from 'react';
import { TranslationFunction } from 'i18next';
import { Route, Switch, Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { Navigation } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Navigation';
import { Masthead } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Masthead';
import { Shell } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Shell';
import { I18n } from '../i18n';

const cx = classnames.bind(require('./App.scss'));

interface Properties {
}

interface State {
  isNavExpanded: boolean;
  isUserMenuExpanded: boolean;
  theme: string;
}

export class App extends React.Component<Properties, State>  {
  constructor(props: Properties) {
      super(props);
      this.state = {
        isNavExpanded: false,
        isUserMenuExpanded: false,
        theme: 'dark'
      };
  }

  render() {
    return (
      <I18n>{(loc, { i18n }) =>
        <Shell theme={this.state.theme} isRtl={i18n.dir() === 'rtl'}>
          <div className={cx('app')} onClick={this.handleViewCollapse}>
            {this.renderNav(loc)}
            {this.renderMasthead(loc)}
            <div className={cx('content')}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
              </Switch>
            </div>
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

    return (
      <Navigation
        isExpanded={this.state.isNavExpanded}
        onClick={this.handleGlobalNavToggle}
        attr={{
          navButton: {
            title: this.state.isNavExpanded ? 'Collapse side navigation' : 'Expand side navigation',
          },
        }}
      >
        {items.map(x => (
            <Link to={x.to} className={cx('link-container')} key={x.key} title={x.title}>
                <div className={cx('link-thumbnail', x.icon)} />
                <div className={cx('link-label', 'inline-text-overflow')}>{x.label}</div>
            </Link>
        ))}
      </Navigation>
    );
  }

  renderMasthead(loc: TranslationFunction) {
    return <Masthead
      branding={<Link to='/' title={loc('navigation.home')} className={cx('link', 'masthead-branding')}>{loc('masthead')}</Link>}
      user={{
        displayName: 'John Smith',
        email: 'jsmith@example.com',
        menuExpanded: this.state.isUserMenuExpanded,
        onMenuClick: this.handleUserMenuToggle,
        menuItems: [
          {
            key: 'toggle-theme',
            label: 'Toggle theme',
            onClick: this.handleThemeToggle
          }
        ]
      }}
      attr={{
        userMenuAriaLabel: 'User Menu',
        mobileMenuAriaLabel: 'Application Menu'
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

  handleThemeToggle = () => {
    this.setState({
      theme: this.state.theme === 'light' ? 'dark' : 'light'
    });
  }

  handleUserMenuToggle = () => {
    this.setState({
      isUserMenuExpanded: !this.state.isUserMenuExpanded
    });
  }
}

export default App;

const Home = () => (
  <I18n>{loc =>
    <h1>{loc('navigation.home')}</h1>
  }</I18n>
);

const About = () => (
  <I18n>{loc =>
    <h1>{loc('navigation.about')}</h1>
  }</I18n>
);
