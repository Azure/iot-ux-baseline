import * as React from 'react';
import { Manifest } from '../manifest';
import { NavLink, Route } from 'react-router-dom';
import classnames from 'classnames/bind';
import { I18n } from '../../i18n';

const Home = React.lazy(() => import('./home'));

const cx = classnames.bind(null);

const manifest: Manifest = {
    panel: (
        <Route key='home' path='/' exact component={Home} />
    ),
    navItem: (
        <I18n key='home'>{loc =>
            <NavLink to='/' exact title={loc('navigation.home')} className='global-nav-item' activeClassName='global-nav-item-active'>
                <span className={cx('global-nav-item-icon', 'icon', 'icon-home')} />
                <span className={cx('inline-text-overflow', 'global-nav-item-text')}>{loc('navigation.home')}</span>
            </NavLink>
        }</I18n>
    )
}

export default manifest;
