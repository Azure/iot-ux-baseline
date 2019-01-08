import * as React from 'react';
import { I18n } from "../../i18n";
import classnames from 'classnames/bind';

const cx = classnames.bind(require('../../pages/App.module.scss'));

const Home = () => (
    <I18n>{loc =>
      <h1 className={cx('header')}>{loc('navigation.home')}</h1>
    }</I18n>
);

export default Home;