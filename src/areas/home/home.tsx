import * as React from 'react';
import classnames from 'classnames/bind';
import { useTranslation } from '../../i18n';
const cx = classnames.bind(require('./home.module.scss'));

export default function Home() {
    const [loc] = useTranslation();
    return (
        <h1 className={cx('header')}>{loc('home')}</h1>
    );
}
