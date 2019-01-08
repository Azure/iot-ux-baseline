import * as React from 'react';
import { match as Match, Route, Switch } from 'react-router';
import { I18n } from "../../i18n";
import classnames from 'classnames/bind';

const cx = classnames.bind(require('../../pages/App.module.scss'));

import AboutMe from './aboutMe';
import { Link } from 'react-router-dom';

interface Properties {
    match: Match
}

export default class extends React.Component<Properties, {}> {
    render() {
        return (
            <Switch>
                <Route exact path={`${this.props.match.url}`} component={Main} />
                <Route path={`${this.props.match.url}/me`} component={AboutMe} />
            </Switch>
        );
    }
}

class Main extends React.Component<Properties, {}> {
    render() {
        return <I18n>{loc =>
            <div>
                <h1 className={cx('header')}>{loc('navigation.about')}</h1>
                <Link to={`${this.props.match.url}/me`}>Click here to go to my page</Link>
            </div>
        }</I18n>;
    }
}
