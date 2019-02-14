import * as React from 'react';
import classnames from 'classnames/bind';
import { TranslationFunction } from '../i18n';

import { Paths } from './routes';
import { NavLink } from 'react-router-dom';

const cx = classnames.bind(null);

/** Declares all the items that need to be injected into the global navigation. */
export function Navigation({ loc }: { loc: TranslationFunction}) {
    return (
        <>
            <NavItem to={Paths.home.index} exact title={loc('navigation.home')} icon='icon-home' text={loc('navigation.home')} />
            <NavItem to={Paths.examples.index} title={loc('navigation.examples')} icon='icon-education' text={loc('navigation.examples')} />
        </>
    );
}

function NavItem({ to, exact, title, icon, text }: {
    to: string;
    exact?: boolean;
    title: string;
    icon: string;
    text: string;
}) {
    return (
        <NavLink to={to} exact={exact} title={title} className='global-nav-item' activeClassName='global-nav-item-active'>
            <span className={cx('global-nav-item-icon', 'icon', icon)} />
            <span className={cx('inline-text-overflow', 'global-nav-item-text')}>{text}</span>
        </NavLink>
    );
}
