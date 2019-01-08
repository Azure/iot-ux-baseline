import * as React from 'react';
import { I18n } from "../../i18n";
import classnames from 'classnames/bind';

const cx = classnames.bind(require('../../pages/App.module.scss'));

const AboutMe = () => (
    <I18n>{loc =>
        <h1 className={cx('header')}>Me!</h1>
    }</I18n>
);

export default AboutMe;