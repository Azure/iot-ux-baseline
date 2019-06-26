import * as React from 'react';
import classnames from 'classnames/bind';
import {Header} from '../../shared/header';
import {LinkPanel} from '../../shared/linkPanel';
import {Footer} from '../../shared/footer';
import {ContentContainer} from './contentContainer';
const cx = classnames.bind(require('./home.module.scss'));

export default function Home() {
    return (
        <div className={cx('home')}>
            <Header />
            <ContentContainer />
            <LinkPanel />
            <Footer />
        </div>
    );
}
