import * as React from 'react';
import { ContextPanel } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/ContextPanel';
import { Button } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Button';
import { SelectField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Field/SelectField';
import { TranslationFunction } from '../i18n';

export interface Settings {
    theme: string;
}

export interface Properties {
    loc: TranslationFunction;
    settings: Settings;
    onSave: (newSettings: Settings) => void;
    onCancel: () => void;
}

export const Themes = {
    dark: 'dark',
    light: 'light',
}

export function SettingsPanel({ loc, onSave, onCancel, settings }: Properties) {
    const [ theme, changeTheme ] = React.useState(settings.theme);
    const handleSave = React.useCallback(() => {
        onSave({ theme });
    }, [ onSave, theme ])

    return (
        <ContextPanel 
            header={loc('settings.title')}
            footer={<>
                <Button onClick={handleSave} primary>{loc('save')}</Button>
                <Button onClick={onCancel}>{loc('cancel')}</Button>
            </>}
            onClose={onCancel}
        >
            <SelectField
                name='theme'
                label={loc('settings.theme')}
                value={theme}
                options={[
                    { label: loc('settings.themes.dark'), value: Themes.dark }, 
                    { label: loc('settings.themes.light'), value: Themes.light }
                ]}
                autoFocus
                onChange={changeTheme}
            />
        </ContextPanel>
    );
}
