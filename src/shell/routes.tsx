import * as React from 'react';
import { Switch } from 'react-router-dom';

import * as Home from '../home';
import * as Examples from '../examples';

/** Declares all routes that need to be rendered in the main shell workspace. */
export function Routes() {
    return (
        <Switch>
            {/* Routes need to be immediate children of Switch, so call the functions directly instead of creating a stateless component: */}
            {Home.Routes()}
            {Examples.Routes()}
        </Switch>
    );
}
