import * as React from 'react';
import { Manifest } from '../manifest';
import { NavLink, Route } from 'react-router-dom';
import classnames from 'classnames/bind';
import { I18n } from '../../i18n';

const About = React.lazy(() => import('./about'));

const cx = classnames.bind(null);

const manifest: Manifest = {
    panel: (
        <Route key='about' path='/about' component={About} />
    ),
    navItem: (
        <I18n key='about'>{loc =>
        <React.Fragment>
            <NavLink to='/about' title={loc('navigation.about')} className='global-nav-item' activeClassName='global-nav-item-active'>
                <span className={cx('global-nav-item-icon', 'icon', 'icon-multitask')} />
                <span className={cx('inline-text-overflow', 'global-nav-item-text')}>{loc('navigation.about')}</span>
            </NavLink>
        </React.Fragment>
        }</I18n>
    )
}

export default manifest;
