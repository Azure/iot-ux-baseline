import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export function Parameterized({ match }: RouteComponentProps<{ id: string }>) {
    return (
        <h4>This is a parameterized route for: {match.params.id}</h4>
    );
}
