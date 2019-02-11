import * as React from 'react';
import { Button } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Button';
import { Shell as FluentShell, NavigationProperties, MastheadProperties } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Shell';
import { HorizontalLoader } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Loader/HorizontalLoader';

import { TranslationFunction, useTranslation } from '../i18n';
import { Settings, SettingsPanel, Themes } from './settings';
import { HelpPanel } from './help';
import { Routes } from './routes';
import { Navigation } from './navigation';

import './shell.fonts.scss';
import { ErrorBoundary } from '../errorBoundary';

export default function Shell() {
  const [loc, i18n] = useTranslation();
  const [expanded, changeExpanded] = React.useState<string>('');
  const [settings, changeSettings] = React.useState({ theme: Themes.light });
  function handleViewCollapse() {
    // reset expanded to its default state. IMPORTANT: don't stop event
    // propagation here: this will block clicking behavior for some html
    // elements like <a>, input checkboxes, and buttons.
    changeExpanded('');
  }

  function handleSettingsSave(newSettings: Settings) {
    changeSettings(newSettings);
    handleViewCollapse();
  }

  const navProps = useNavigationProperties(loc);
  const mastheadProps = getMastheadProperties(loc, expanded, changeExpanded, navProps)
  return (
    <FluentShell
      theme={settings.theme}
      isRtl={i18n.dir() === 'rtl'}
      navigation={navProps}
      masthead={mastheadProps}
      onClick={handleViewCollapse}>
      <ErrorBoundary message={loc('errors.default')}>
        <React.Suspense fallback={<HorizontalLoader />}>
          <Routes />
        </React.Suspense>
      </ErrorBoundary>
      <div onClick={blockViewCollapse}>
        {expanded === 'settingsPanel' && <SettingsPanel settings={settings} onSave={handleSettingsSave} onCancel={handleViewCollapse} loc={loc} />}
        {expanded === 'helpPanel' && <HelpPanel onCancel={handleViewCollapse} loc={loc} />}
      </div>
    </FluentShell>
  );
}

function useNavigationProperties(loc: TranslationFunction): NavigationProperties {
  const [isExpanded, changeExpanded] = React.useState(true);
  return {
    isExpanded: isExpanded,
    onClick: () => {
      // toggle expanded and let the event propagate up to collapse any expanded views:
      changeExpanded(!isExpanded);
    },
    attr: {
      navButton: {
        title: isExpanded ? 'Collapse side navigation' : 'Expand side navigation',
      },
    },
    children: <Navigation loc={loc} />
  }
}

function getMastheadProperties(loc: TranslationFunction, expanded: string, changeExpanded: (expanded: string) => void, navProps: NavigationProperties): MastheadProperties {
  return {
    branding: loc('masthead'),
    more: {
      onClick: getExpandCallback('moreMenu', changeExpanded),
      selected: expanded === 'moreMenu',
      title: loc('more')
    },
    navigation: {
      isExpanded: expanded === 'navMenu',
      onClick: getExpandCallback('navMenu', changeExpanded),
      attr: navProps.attr,
      children: navProps.children
    },
    toolbarItems: [
      {
        icon: 'settings',
        label: loc('settings.title'),
        onClick: getExpandCallback('settingsPanel', changeExpanded),
        selected: expanded === "settingsPanel",
        attr: { button: { 'aria-label': loc('settings.title') } }
      },
      {
        icon: 'help',
        label: loc('help.title'),
        onClick: getExpandCallback('helpPanel', changeExpanded),
        selected: expanded === 'helpPanel',
        attr: { button: { 'aria-label': loc('help.title') } }
      },
    ],
    user: {
      onMenuClick: getExpandCallback('userMenu', changeExpanded),
      menuExpanded: expanded === 'userMenu',
      menuItems: (<Button onClick={logout} title={loc('logout')}>{loc('logout')}</Button>),
      displayName: 'John P',
      email: 'johnp@contoso.com'
    }
  };
}

function logout(e: React.MouseEvent<any>) {
  e && e.stopPropagation();
  alert('logout');
}

function blockViewCollapse(e?: React.MouseEvent<any>) {
  e && e.stopPropagation();
}

function getExpandCallback(expand: string, changeExpanded: (expanded: string) => void) {
  return (e?: React.MouseEvent<any>) => {
    e && e.stopPropagation();
    changeExpanded(expand);
  };
}
