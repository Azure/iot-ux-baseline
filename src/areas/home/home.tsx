import * as React from 'react';
import classnames from 'classnames/bind';
import {Header} from '../../shared/Header';
const cx = classnames.bind(require('./home.module.scss'));

export default function Home() {
    return (
        <div>
            <Header />
            <div className={cx('content-body')}></div>
        </div>
    );
}
