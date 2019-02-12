import * as React from 'react';
import { GenericManagementList } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/List';
import { Link, generatePath } from 'react-router-dom';
import { Paths } from '../../shell/routes';

export interface Properties {
}

interface Row {
    id: string;
    name: string;
    location: string;
}

export function List() {
    const [rows] = React.useState(() => [
        { id: 'foo', name: 'Foo', location: 'Seattle' },
        { id: 'bar', name: 'Bar', location: 'Redmond' },
    ]);

    const [selected, changeSelected] = React.useState(new Set<string>());
    function isSelected(row: Row) {
        return selected.has(row.id);
    }

    function onSelect(row: Row) {
        const newSelection = new Set<string>(selected);
        if (!newSelection.delete(row.id)) {
            newSelection.add(row.id);
        }

        changeSelected(newSelection);
    }

    function onSelectAll() {
        const newSelected = new Set<string>();
        if (rows.length !== selected.size) {
            for (const row of rows) {
                newSelected.add(row.id);
            }
        }
        
        changeSelected(newSelected);
    }
    
    return (
        <>
            <h2>List</h2>
            <GenericManagementList<Row>
                rows={rows}
                columns={[
                    { label: 'Name', mapColumn: mapNameCol },
                    { label: 'Location', mapColumn: 'location' },
                ]}
                isSelected={isSelected}
                onSelect={onSelect}
                onSelectAll={onSelectAll}
            />
        </>
    )
}

function mapNameCol(row: Row) {
    return (
        <Link to={generatePath(Paths.examples.parameterized, { id: row.id })} className='link'>{row.name}</Link>
    )
}
