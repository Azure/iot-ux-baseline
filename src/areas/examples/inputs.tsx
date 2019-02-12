import * as React from 'react';
import * as classnames from 'classnames/bind';
import { TextField, CheckboxField, ToggleField, RadioField, SelectField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Field'
import { DateTimeField } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/DateTime'

const cx = classnames.bind(require('./inputs.module.scss'));

export function Inputs() {
    const [textValue, changeTextValue] = React.useState('');
    const [checkboxValue, changeCheckboxValue] = React.useState(true);
    const [toggleValue, changeToggleValue] = React.useState(true);
    const [radioValue, changeRadioValue] = React.useState('option1');
    const [selectValue, changeSelectValue] = React.useState('option1');
    const [dateTimeValue, changeDateTimeValue] = React.useState('');

    return (
        <div className={cx('container')}>
            <h2>Inputs</h2>
            <TextField 
                name='textField'
                value={textValue}
                onChange={changeTextValue}
                label='Text Field'
                tooltip='Description for a text field'
                required
            />
            <CheckboxField 
                name='checkboxField'
                value={checkboxValue}
                onChange={changeCheckboxValue}
                label='Checkbox Field'
            />
            <ToggleField
                name='toggleField'
                value={toggleValue}
                onChange={changeToggleValue}
                label='Toggle Field'
                onLabel='Enabled'
                offLabel='Disabled'
            />
            <RadioField
                name='radioField'
                value={radioValue}
                onChange={changeRadioValue}
                label='Radio Field'
                options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                ]}
            />
            <SelectField
                name='selectField'
                value={selectValue}
                onChange={changeSelectValue}
                label='Select Field'
                options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                ]}
            />
            <DateTimeField
                name='dateTimeField'
                initialValue={dateTimeValue}
                onChange={changeDateTimeValue}
                label='Date Time Field'
            />
        </div>
    );
}
