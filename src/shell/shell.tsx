import * as React from 'react';
import { Shell as FluentShell, MastheadProperties } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Shell';
import { HorizontalLoader } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Loader/HorizontalLoader';

import { TranslationFunction, useTranslation } from '../i18n';
import { Settings, SettingsPanel, Themes } from './settings';
import { HelpPanel } from './help';
import { Routes } from './routes';

import './shell.fonts.scss';
import { ErrorBoundary } from '../errorBoundary';

export default function Shell() {
  const [loc, i18n] = useTranslation();
  const [expanded, changeExpanded] = React.useState<string>('');
  const [settings, changeSettings] = React.useState({ theme: Themes.light });
  const [searchInput, setSearchInput] = React.useState<string>('');

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


  const onSearch = React.useCallback((input: string) => {
    setSearchInput(input);
  }, []);

  const onSubmitSearch = React.useCallback(() => {
    alert(`search ${searchInput}`);
  }, [searchInput]);

  const mastheadProps = getMastheadProperties(loc, expanded, changeExpanded, onSearch, onSubmitSearch, searchInput)
  return (
    <FluentShell
      theme={settings.theme}
      isRtl={i18n.dir() === 'rtl'}
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

function getMastheadProperties(
  loc: TranslationFunction,
  expanded: string,
  changeExpanded: (expanded: string) => void,
  onSearch: (input: string) => void,
  onSubmitSearch: () => void,
  searchInput: string
): MastheadProperties {



  return {
    branding: loc('masthead'),
    more: {
      onClick: getExpandCallback('moreMenu', changeExpanded),
      selected: expanded === 'moreMenu',
      title: loc('more')
    },
    search: {
      label: loc('Search'),
      onChange: onSearch,
      onSubmit: onSubmitSearch,
      value: searchInput,
      onExpand: changeExpanded
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
    user: undefined // @todo add implementation for login control 
  };
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
