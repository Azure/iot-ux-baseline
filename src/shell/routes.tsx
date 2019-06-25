import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

// Load the container components of each area lazily in its own bundle.
// In general, each area should be isolated to its own bundle.
const Home = React.lazy(() => import('../areas/home/home'));
const Examples = React.lazy(() => import('../areas/search/search'));

/**
 * Declares all the route paths in this app so we can deep link anywhere 
 * without having to construct route path strings manually:
 */
export const Paths = {
    home: '/',
    search: '/search',
    detail: '/detail/:id',
    faq: '/faq'
};

/** 
 * Declares all routes that need to be rendered in the main shell workspace. In most
 * cases, we just need one container component per area that should be loaded lazily:
 * all descendant routes should be declared within the container.
 */
export function Routes() {
    return (
        <Switch>
            <Route exact path={Paths.home} component={Home} />
            <Route path={Paths.search} component={Examples} />
            <Route path={Paths.detail} component={Examples} />
            <Route path={Paths.faq} component={Examples} />
        </Switch>
    );
}
