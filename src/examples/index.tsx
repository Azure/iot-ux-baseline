// This file serves as the public entry point of this experience in the react
// app. It will be included in the main webpack bundle file, so like C header
// files, only import the basic minimum here so other parts of the app can 
// interface with it: everything else should be lazy loaded.

import classnames from 'classnames/bind';
import { NavLink, Route } from 'react-router-dom';
import React from 'react';
import { TranslationFunction } from '../i18n';

// Load the container component lazily in a separate bundle. In general,
// each experience should be loaded into a single bundle:
const Test = React.lazy(() => import('./examples'));

const cx = classnames.bind(null);

/**
 * Declares all the route paths supported by this experience so other parts of
 * the app can deep-link into them without constructing strings manually:
 */
export const RoutePaths = {
    index: '/examples',
    parameterized: '/examples/parameterizedRoutes/:id',
    list: '/examples/list',
    inputs: '/examples/inputs',
}

/** Declares all the components to be injected into the global navigation: */
export function Navigation({ loc }: { loc: TranslationFunction }) {
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <NavLink to={RoutePaths.index} title={loc('navigation.examples')} className='global-nav-item' activeClassName='global-nav-item-active'>
            <span className={cx('global-nav-item-icon', 'icon', 'icon-education')} />
            <span className={cx('inline-text-overflow', 'global-nav-item-text')}>{loc('navigation.examples')}</span>
        </NavLink>
    );
}

/** Declares all the routes components to be rendered in the main shell workspace */
export function Routes() {
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return <Route path={RoutePaths.index} component={Test} />;
}
