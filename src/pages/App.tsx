import * as React from 'react';
import { TranslationFunction } from 'i18next';
import { Route, Switch, NavLink } from 'react-router-dom';
import classnames from 'classnames/bind';
import { Shell, NavigationProperties, MastheadProperties } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Shell';
import { I18n } from '../i18n';
import { ContextPanel } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/ContextPanel/ContextPanel'
import { Button } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Button';
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
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
          </Switch>
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

  getMasthead(loc: TranslationFunction): MastheadProperties {
    return {
      branding: loc('masthead'),
      toolBarItems: {
        settings: { title: 'settings', content: 'Settings', actions: { cancel: { event: undefined, label: 'cancel' } } },
        help: { title: 'help', content: 'Help content', actions: { cancel: { event: undefined, label: 'cancel' } } }
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

class Home extends React.Component<{
  handleViewCollapse: React.EventHandler<any>;
}, {
  showPanel?: string | null;
}> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const Btn = Button as any;
    return (<I18n>{loc =>
      <React.Fragment>
        <h1 className={cx('header')}>{loc('navigation.home')}</h1>
        <Btn onClick={this.togglePanel1}>Toggle Panel</Btn>
        <Btn onClick={this.togglePanel2}>Toggle Panel2</Btn>
        {this.state.showPanel === 'panel1' && (
          <ContextPanel 
            header='Hello'
            footer={<Btn icon='cancel' onClick={this.cancelPanel}>Cancel</Btn>}
            onClose={this.cancelPanel}
          >
            This is context panel 1
            <Btn onClick={this.togglePanel2} attr={{ button: { autoFocus: undefined }}}>Toggle Panel2</Btn>          
          </ContextPanel>
        )}
        {this.state.showPanel === 'panel2' && (
          <ContextPanel header='World' onClose={this.cancelPanel} footer={
            <React.Fragment>
              <Btn icon='cancel' onClick={this.cancelPanel}>Cancel</Btn>
              <Btn icon='save' onClick={this.cancelPanel} primary>Save</Btn>
            </React.Fragment>
          }>
          This is context panel 2
          </ContextPanel>
        )}
        <Btn onClick={this.togglePanel3}>Toggle Panel 3</Btn>
        {this.state.showPanel === 'panel3' && (
          <ContextPanel header='Panel with no footer' onClose={this.cancelPanel}>
            This is a context panel with no footer
          </ContextPanel>
        )}
      </React.Fragment>
    }</I18n>);
  }
  
  cancelPanel = () => {
    this.setState({ showPanel: null });
  }

  togglePanel1 = () => {
    this.setState({ showPanel: 'panel1' });
  }
  
  togglePanel2 = () => {
    this.setState({ showPanel: 'panel2' });
  }

  togglePanel3 = () => {
    this.setState({ showPanel: 'panel3' });
  }
}

const About = () => (
  <I18n>{loc =>
    <h1 className={cx('header')}>{loc('navigation.about')}</h1>
  }</I18n>
);
