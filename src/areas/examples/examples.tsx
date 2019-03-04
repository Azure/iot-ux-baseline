import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import classnames from 'classnames/bind';
import { useTranslation } from '../../i18n';
import { Paths } from '../../shell/routes';

import { List } from './list';
import { Parameterized } from './parameterized';
import { Inputs } from './inputs';

const cx = classnames.bind(require('./examples.module.scss'));

export default function Examples() {
    const [loc] = useTranslation();    
    return (
        <div className={cx('container')}>
            <h1 className={cx('header')}>
                <Link to={Paths.examples.index} className='link'>{loc('navigation.examples')}</Link>
            </h1>
            <Switch>
                <Route path={Paths.examples.index} exact component={Root} />
                <Route path={Paths.examples.list} component={List} />
                <Route path={Paths.examples.inputs} component={Inputs} />
                <Route path={Paths.examples.parameterized} component={Parameterized} />
            </Switch>
        </div>
    );
}

function Root() {
    return (
        <ul>
            <li><Link to={Paths.examples.list} className='link'>List</Link></li>
            <li><Link to={Paths.examples.inputs} className='link'>Inputs</Link></li>
        </ul>
    );
}
