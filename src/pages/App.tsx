import * as React from 'react';
import { TranslationFunction } from 'i18next';
import { Route, Switch, NavLink } from 'react-router-dom';
import classnames from 'classnames/bind';
import { Shell, NavigationProperties, MastheadProperties } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Shell';

import { I18n } from '../i18n';
import { Settings, SettingsPanel, Themes } from './Settings';
import { HelpPanel } from './Help';

import './App.fonts.scss';
import { Button } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Button';
const cx = classnames.bind(require('./App.module.scss'));

interface Properties {
}

interface State {
  expanded?: 'userMenu' | 'settingsPanel' | 'helpPanel' | 'moreMenu' | null;
  isNavExpanded: boolean;
  settings: Settings;
}

export class App extends React.Component<Properties, State>  {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isNavExpanded: true,
      settings: {
        theme: Themes.light,
      },
    };
  }

  render() {
    const { expanded, settings } = this.state;
    return (
      <I18n>{(loc, { i18n }) =>
        <Shell
          theme={settings.theme}
          isRtl={i18n.dir() === 'rtl'}
          navigation={this.getNav(loc)}
          masthead={this.getMasthead(loc)}
          onClick={this.handleViewCollapse}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
          </Switch>
          <div onClick={this.blockViewCollapse}>
            {expanded === 'settingsPanel' && <SettingsPanel settings={settings} onSave={this.handleSettingsSave} onCancel={this.handleViewCollapse} loc={loc} />}
            {expanded === 'helpPanel' && <HelpPanel onCancel={this.handleViewCollapse} loc={loc} />}
          </div>
        </Shell>
      }</I18n>
    );
  }

  getNav(loc: TranslationFunction): NavigationProperties {
    const items = [
      {
        key: 'home',
        to: '/',
        exact: true,
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

    return {
      isExpanded: this.state.isNavExpanded,
      onClick: this.handleGlobalNavToggle,
      attr: {
        navButton: {
          title: this.state.isNavExpanded ? 'Collapse side navigation' : 'Expand side navigation',
        },
      },
      children: items.map(x => (
        <NavLink to={x.to} exact={x.exact} key={x.key} title={x.title} className='global-nav-item' activeClassName='global-nav-item-active'>
          <span className={cx('global-nav-item-icon', x.icon)} />
          <span className={cx('inline-text-overflow', 'global-nav-item-text')}>{x.label}</span>
        </NavLink>
      ))
    }
  };

  getUserMenuItems(loc: TranslationFunction) {
    const title = loc('logout');
    return (
      <Button onClick={this.handleLogout} title={title}>
        {title}
      </Button>
    );
  }

  getMasthead(loc: TranslationFunction): MastheadProperties {
    const { expanded } = this.state;
    return {
      branding: loc('masthead'),
      more: {
        onClick: this.handleClickMore,
        selected: expanded === 'moreMenu',
        title: loc('more')
      },
      toolbarItems: [
        { icon: 'settings', label: loc('settings.title'), onClick: this.handleContextPanelOpenSettings, selected: expanded === "settingsPanel", attr: { button: { 'aria-label': loc('settings.title') } } },
        { icon: 'help', label: loc('help.title'), onClick: this.handleContextPanelOpenHelp, selected: expanded === 'helpPanel', attr: { button: { 'aria-label': loc('help.title') } } },
      ],
      user: {
        onMenuClick: this.handleClickUserIcon,
        menuExpanded: expanded === 'userMenu',
        menuItems: this.getUserMenuItems(loc),
        displayName: 'John P',
        email: 'johnp@contoso.com'
      }
    };
  }

  handleContextPanelOpenHelp = (e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    this.setState({
      expanded: this.state.expanded !== 'helpPanel' ? 'helpPanel' : null,
    });
  }

  handleContextPanelOpenSettings = (e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    this.setState({
      expanded: this.state.expanded !== 'settingsPanel' ? 'settingsPanel' : null,
    });
  }

  handleSettingsSave = (newSettings: Settings) => {
    this.setState({
      settings: newSettings
    });
  }

  handleLogout = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    alert('logout');
  }


  handleClickUserIcon = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    this.setState({
      expanded: this.state.expanded !== 'userMenu' ? 'userMenu' : null,
    });
  }

  handleGlobalNavToggle = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    this.setState({
      isNavExpanded: !this.state.isNavExpanded
    });
  }

  handleClickMore = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    this.setState({
      expanded: this.state.expanded !== 'moreMenu' ? 'moreMenu' : null,
    });
  }

  handleViewCollapse = (e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    this.setState({
      expanded: null,
    });
  }

  blockViewCollapse = (e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
  }
}

export default App;


const Home = () => (
  <I18n>{loc =>
    <h1 className={cx('header')}>{loc('navigation.home')}</h1>
  }</I18n>
);

const About = () => (
  <I18n>{loc =>
    <h1 className={cx('header')}>{loc('navigation.about')}</h1>
  }</I18n>
);
