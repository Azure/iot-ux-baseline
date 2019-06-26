import * as React from 'react';
import classnames from 'classnames/bind';
import { useTranslation } from '../i18n';
const cx = classnames.bind(require('./linkPanel.module.scss'));

export function LinkPanel() {
    return (
        <div className={cx('linkPanel-container')}>
            <div className={cx('linkPanel-content')}>
                <Solution />
                <Partner />
            </div>
        </div>
    );
}

function Solution() {
    const [loc] = useTranslation();
    return (
        <div className={cx('solutions')}>
            <div className={cx('link-panel-header')}>{loc('linkPanel.solutions.solutions')}</div>
            <div className={cx('solutions-description')}>{loc('linkPanel.solutions.description')}</div>
            <a className={cx('linkPanel-link', 'link', 'solutions-learnMore')}>{loc('linkPanel.solutions.learnMore')}</a>
        </div>
    );
}

function Partner() {
    const [loc] = useTranslation();
    return (
        <div className={cx('partners')}>
            <div className={cx('link-panel-header')}>{loc('linkPanel.partners.partners')}</div>
            <div className={cx('partners-description-pnp')}>
                <span className={cx('partners-description')}>{loc('linkPanel.partners.joinPnP')}</span>
                <a className={cx('linkPanel-link', 'link')}>{loc('linkPanel.partners.learnMore')}</a>
            </div>
            <div>
            <span className={cx('partners-description')}>{loc('linkPanel.partners.certifyNonPnP')}</span>
                <a className={cx('linkPanel-link', 'link')}>{loc('linkPanel.partners.learnMore')}</a>
            </div>
        </div>
    );
}