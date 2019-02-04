import * as React from 'react';
import { ContextPanel } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/ContextPanel';
import { TranslationFunction } from '../i18n';

export interface Properties {
    loc: TranslationFunction;
    onCancel: () => void;
}

export function HelpPanel({ loc, onCancel }: Properties) {
    return (
        <ContextPanel 
            header={loc('help.title')}
            onClose={onCancel}
        >
            <a href="https://github.com/Azure/iot-ux-baseline" target="_blank">{loc('help.getStarted')}</a>
        </ContextPanel>
    );
}
