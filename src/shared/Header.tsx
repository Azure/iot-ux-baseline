import * as React from 'react';
import classnames from 'classnames/bind';
import { useTranslation } from '../i18n';
const cx = classnames.bind(require('./Header.module.scss'));

export function Header() {
    const [loc] = useTranslation();
    return (
        <div className={cx('header-container')}>
            <h1 className={cx('header', 'inline-text-overflow')}>{loc('Header.header')}</h1>   
            <h2 className={cx('description', 'inline-text-overflow')}>{loc('Header.description')}</h2>
        </div>
    );
}