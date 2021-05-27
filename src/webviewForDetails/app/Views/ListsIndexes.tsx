import * as React from 'react';
import { Index } from '../../../SimpleSearchClient';

interface IListIndexesProps {
    data: Index[];
}

export const ListIndexes: React.FC<IListIndexesProps> = props => {
    return (
        <table>
            <thead>
                <th>
                    <td>Name</td>
                </th>
            </thead>
            <tbody>
                {props.data?.map(elem =>
                    <tr><td>{elem.name}</td></tr>
                )}
            </tbody>
        </table>
    );
};