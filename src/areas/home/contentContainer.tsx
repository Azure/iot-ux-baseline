import * as React from 'react';
import classnames from 'classnames/bind';
const cx = classnames.bind(require('./contentContainer.module.scss'));

export function ContentContainer() {
    return (
        <div className={cx('content')}>
            <div className={cx('left-panel')}></div>
            <div className={cx('right-panel')}></div>
        </div>
    );
}
