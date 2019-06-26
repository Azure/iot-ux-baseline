import * as React from 'react';
import classnames from 'classnames/bind';
const cx = classnames.bind(require('./footer.module.scss'));

export function Footer() {
    return (
        <div className={cx('footer-container')}></div>
    );
}