import * as React from 'react';
import { ContextPanel } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/ContextPanel';
import { Button } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Button';
import { SelectField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Field/SelectField';
import { TranslationFunction } from 'i18next';

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

export class SettingsPanel extends React.Component<Properties, Settings> {
    constructor(props: Properties) {
        super(props);
        // copy the settings over to state so we can change it before hitting save:
        this.state = {
            theme: props.settings.theme,
        };
    }

    render() {
        const { loc, onCancel } = this.props;
        return (
            <ContextPanel 
                header={loc('settings.title')}
                footer={this.renderFooter()}
                onClose={onCancel}
            >
                <SelectField
                    name='theme'
                    label={loc('settings.theme')}
                    value={this.state.theme}
                    options={[
                        { label: loc('settings.themes.dark'), value: Themes.dark }, 
                        { label: loc('settings.themes.light'), value: Themes.light }
                    ]}
                    autoFocus
                    onChange={this.handleThemeChange}
                />
            </ContextPanel>
        );
    }

    renderFooter() {
        const { loc, onCancel } = this.props;
        return (
            <>
                <Button onClick={this.handleSave} primary>{loc('save')}</Button>
                <Button onClick={onCancel}>{loc('cancel')}</Button>
            </>
        )
    }

    private handleThemeChange = (newValue: string) => {
        this.setState({
            theme: newValue
        });
    }

    private handleSave = () => {
        this.props.onSave({
            theme: this.state.theme
        });
    }
}
