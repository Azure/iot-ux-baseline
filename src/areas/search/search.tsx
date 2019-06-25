import * as React from 'react';
import { Switch } from 'react-router-dom';
import classnames from 'classnames/bind';
import { useTranslation } from '../../i18n';

const cx = classnames.bind(require('./search.module.scss'));

export default function Search() {
    const [loc] = useTranslation();
    return (
        <div className={cx('container')}>
            <h1 className={cx('header')}> {loc('search')} </h1>
            <Switch>

            </Switch>
        </div>
    );
}

