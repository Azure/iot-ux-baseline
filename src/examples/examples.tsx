import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import classnames from 'classnames/bind';
import { useTranslation } from '../i18n';
import { RoutePaths } from '.';

import { List } from './list';
import { Parameterized } from './parameterized';
import { Inputs } from './inputs';

const cx = classnames.bind(require('./examples.module.scss'));

export default function Examples() {
    const [loc] = useTranslation();    
    return (
        <div className={cx('container')}>
            <h1 className={cx('header')}>
                <Link to={RoutePaths.index} className='link'>{loc('navigation.examples')}</Link>
            </h1>
            <Switch>
                <Route path={RoutePaths.index} exact component={Root} />
                <Route path={RoutePaths.list} component={List} />
                <Route path={RoutePaths.inputs} component={Inputs} />
                <Route path={RoutePaths.parameterized} component={Parameterized} />
            </Switch>
        </div>
    );
}

function Root() {
    return (
        <ul>
            <li><Link to={RoutePaths.list} className='link'>List</Link></li>
            <li><Link to={RoutePaths.inputs} className='link'>Inputs</Link></li>
        </ul>
    );
}
