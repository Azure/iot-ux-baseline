import * as React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import classnames from 'classnames/bind';
import { Shell, NavigationProperties, MastheadProperties } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Shell';

import { TranslationFunction, useTranslation } from '../i18n';
import { Settings, SettingsPanel, Themes } from './Settings';
import { HelpPanel } from './Help';

import './App.fonts.scss';
import { Button } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Button';
const cx = classnames.bind(require('./App.module.scss'));

export default function App() {
  const [loc, i18n] = useTranslation();
  const [expanded, changeExpanded] = React.useState<string>('');
  const [settings, changeSettings] = React.useState({ theme: Themes.light });
  const handleViewCollapse = useExpandCallback('', changeExpanded);
  const handleSettingsSave = React.useCallback((newSettings: Settings) => {
    changeSettings(newSettings);
    handleViewCollapse();
  }, [changeSettings, handleViewCollapse]);

  const navProps = useNavigationProperties(loc);
  const mastheadProps = useMastheadProperties(loc, expanded, changeExpanded, navProps)
  return (
    <Shell
      theme={settings.theme}
      isRtl={i18n.dir() === 'rtl'}
      navigation={navProps}
      masthead={mastheadProps}
      onClick={handleViewCollapse}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </Switch>
      <div onClick={blockViewCollapse}>
        {expanded === 'settingsPanel' && <SettingsPanel settings={settings} onSave={handleSettingsSave} onCancel={handleViewCollapse} loc={loc} />}
        {expanded === 'helpPanel' && <HelpPanel onCancel={handleViewCollapse} loc={loc} />}
      </div>
    </Shell>
  );
}

function Home() {
  const [loc] = useTranslation();
  return (
    <h1 className={cx('header')}>{loc('navigation.home')}</h1>
  );
}

function About() {
  const [loc] = useTranslation();
  return (
    <h1 className={cx('header')}>{loc('navigation.about')}</h1>
  );
}

function useNavigationProperties(loc: TranslationFunction): NavigationProperties {
  const [isExpanded, changeExpanded] = React.useState(true);
  const handleExpandClick = React.useCallback((e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    changeExpanded(!isExpanded);
  }, [ isExpanded, changeExpanded ]);

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
    isExpanded: isExpanded,
    onClick: handleExpandClick,
    attr: {
      navButton: {
        title: isExpanded ? 'Collapse side navigation' : 'Expand side navigation',
      },
    },
    children: items.map(x => (
      <NavLink to={x.to} exact={x.exact} key={x.key} title={x.title} className='global-nav-item' activeClassName='global-nav-item-active'>
        <span className={cx('global-nav-item-icon', x.icon)} />
        <span className={cx('inline-text-overflow', 'global-nav-item-text')}>{x.label}</span>
      </NavLink>
    ))
  }
}

function useMastheadProperties(loc: TranslationFunction, expanded: string, changeExpanded: (expanded: string) => void, navProps: NavigationProperties): MastheadProperties {
  const onClickMore = useExpandCallback('moreMenu', changeExpanded);
  const onOpenSettings = useExpandCallback('settingsPanel', changeExpanded)
  const onOpenHelp = useExpandCallback('helpPanel', changeExpanded);
  const onClickUserIcon = useExpandCallback('userMenu', changeExpanded);
  const onNavMenuClick = useExpandCallback('navMenu', changeExpanded);

  return {
    branding: loc('masthead'),
    more: {
      onClick: onClickMore,
      selected: expanded === 'moreMenu',
      title: loc('more')
    },
    navigation: {
      isExpanded: expanded === 'navMenu',
      onClick: onNavMenuClick,
      attr: navProps.attr,
      children: navProps.children
    },
    toolbarItems: [
      { icon: 'settings', label: loc('settings.title'), onClick: onOpenSettings, selected: expanded === "settingsPanel", attr: { button: { 'aria-label': loc('settings.title') } } },
      { icon: 'help', label: loc('help.title'), onClick: onOpenHelp, selected: expanded === 'helpPanel', attr: { button: { 'aria-label': loc('help.title') } } },
    ],
    user: {
      onMenuClick: onClickUserIcon,
      menuExpanded: expanded === 'userMenu',
      menuItems: useUserMenuItems(loc),
      displayName: 'John P',
      email: 'johnp@contoso.com'
    }
  };
}

function useUserMenuItems(loc: TranslationFunction) {
  const title = loc('logout');
  const onLogout = React.useCallback((e: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    alert('logout');
  }, []);

  return (
    <Button onClick={onLogout} title={title}>
      {title}
    </Button>
  );
}

function blockViewCollapse(e?: React.MouseEvent<any>) {
  e && e.stopPropagation();
}

function useExpandCallback(expand: string, changeExpanded: (expanded: string) => void) {
  return React.useCallback((e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    changeExpanded(expand);
  }, [ expand, changeExpanded ]);
}