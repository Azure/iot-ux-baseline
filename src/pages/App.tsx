import * as React from 'react';
import { TranslationFunction } from 'i18next';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
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
  isNavExpanded: boolean;
  isUserMenuExpanded: boolean;
  contextPanel: string | null;
  settings: Settings;
  showInputSearch: boolean;
  searchValue: string;
  isMoreExpanded: boolean;
}

export class App extends React.Component<Properties, State>  {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isNavExpanded: true,
      isUserMenuExpanded: false,
      contextPanel: null,
      settings: {
        theme: Themes.light,
      },
      isMoreExpanded: false,
      searchValue: '',
      showInputSearch: false

    };
  }

  render() {
    return (
      <I18n>{(loc, { i18n }) =>
        <Shell
          theme={this.state.settings.theme}
          isRtl={i18n.dir() === 'rtl'}
          navigation={this.getNav(loc)}
          masthead={this.getMasthead(loc)}
          onClick={this.handleViewCollapse}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
          </Switch>
          {this.state.contextPanel === 'settings' && <SettingsPanel settings={this.state.settings} onSave={this.handleSettingsSave} onCancel={this.handleContextPanelCancel} loc={loc} />}
          {this.state.contextPanel === 'help' && <HelpPanel onCancel={this.handleContextPanelCancel} loc={loc} />}
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
    return (
      <Button onClick={this.handleLogout} className={cx('logout-item')}>
        {loc('logout')}
      </Button>
    );
  }

  getMasthead(loc: TranslationFunction): MastheadProperties {
    return {
      branding: loc('masthead'),
      search: {
        label: loc('search'),
        onChange: this.handleChangeSearch,
        onClick: this.handleClickSearchIcon,
        onSubmit: () => { alert(`searching ${this.state.searchValue}`) },
        hidden: this.state.showInputSearch,
        value: this.state.searchValue,
        attr: { postfix: { 'aria-label': loc('search') } }
      },
      more: {
        onClick: this.handleClickMore,
        selected: this.state.isMoreExpanded,
        attr: { ariaLabel: loc('more') }
      },
      toolBarItems: [
        { icon: 'settings', label: loc('settings.title'), onClick: this.handleContextPanelOpenSettings, selected: this.state.contextPanel === 'settings', attr: { button: { 'aria-label': loc('settings.title') } } },
        { icon: 'help', label: loc('help.title'), onClick: this.handleContextPanelOpenHelp, selected: this.state.contextPanel === 'help', attr: { button: { 'aria-label': loc('help.title') } } },
      ],
      user: {
        userMenuAriaLabel: 'user',
        onUserMenuClick: this.handleClickUserIcon,
        userMenuExpanded: this.state.isUserMenuExpanded,
        userMenuItems: this.getUserMenuItems(loc),
        displayName: 'John P',
        email: 'johnp@contoso.com'
      }

    }
  }

  handleContextPanelOpenHelp = (e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    this.setState({
      contextPanel: 'help'
    });
  }

  handleContextPanelOpenSettings = (e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    this.setState({
      contextPanel: 'settings'
    });
  }

  handleContextPanelCancel = (e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    this.setState({
      contextPanel: null
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
      isUserMenuExpanded: !this.state.isUserMenuExpanded
    });
  }

  handleClickSearchIcon = (e: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    this.setState({
      showInputSearch: true
    });
  }

  handleGlobalNavToggle = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    this.setState({
      isNavExpanded: !this.state.isNavExpanded
    });
  }

  handleChangeSearch = (value: string) => {
    this.setState({
      searchValue: value
    });
  }

  handleClickMore = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    this.setState({
      isMoreExpanded: !this.state.isMoreExpanded
    });
  }

  handleViewCollapse = (e: any) => {
    e.stopPropagation();
    if (e.target.tagName !== 'INPUT') {
      this.setState({
        isUserMenuExpanded: false,
        isMoreExpanded: false,
        showInputSearch: false
      });
    }
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
