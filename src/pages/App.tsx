import * as React from 'react';
import { TranslationFunction } from 'i18next';
import { Switch, NavLink } from 'react-router-dom';
import classnames from 'classnames/bind';
import { Shell, NavigationProperties, MastheadProperties } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Shell';
import { I18n } from '../i18n';
import { manifests } from '../packages/manifest';

import './App.fonts.scss';
const cx = classnames.bind(require('./App.module.scss'));

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
        isNavExpanded: true,
        isUserMenuExpanded: false,
        theme: 'dark'
      };
  }

  render() {
    return (
      <I18n>{(loc, { i18n }) =>
        <Shell 
          theme={this.state.theme} 
          isRtl={i18n.dir() === 'rtl'} 
          navigation={this.getNav(loc)}
          masthead={this.getMasthead(loc)}
          onClick={this.handleViewCollapse}>
          <Switch>
            {manifests.map(x => x.panel)};
          </Switch>
        </Shell>
      }</I18n>
    );
  }

  getNav(loc: TranslationFunction): NavigationProperties {
    return {
      isExpanded: this.state.isNavExpanded,
      onClick: this.handleGlobalNavToggle,
      attr: {
        navButton: {
          title: this.state.isNavExpanded ? 'Collapse side navigation' : 'Expand side navigation',
        },
      }, 
      children: manifests.map(x => x.navItem),
    }
  };

  getMasthead(loc: TranslationFunction): MastheadProperties {
    return {
      branding: loc('masthead'),
      user: {
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
      },
      attr: {
        userMenuAriaLabel: 'User Menu',
        mobileMenuAriaLabel: 'Application Menu'
      }
    }
  }

  handleGlobalNavToggle = (e: React.MouseEvent<any>) => {
      e.stopPropagation();
      this.setState({
          isNavExpanded: !this.state.isNavExpanded
      });
  }

  handleViewCollapse = (e: React.MouseEvent<any>) => {
      e.stopPropagation();
      this.setState({
        isUserMenuExpanded: false
      });
  }

  handleThemeToggle = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    this.setState({
      theme: this.state.theme === 'light' ? 'dark' : 'light'
    });
  }

  handleUserMenuToggle = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    this.setState({
      isUserMenuExpanded: !this.state.isUserMenuExpanded
    });
  }
}

export default App;
