import * as React from 'react';
import { Index } from '../../../SimpleSearchClient';

interface IListIndexesProps {
    data: Index[];
}

export const ListIndexes: React.FC<IListIndexesProps> = props => {
    return (
        <>
            {props.data?.map(elem => 
                <span>{elem.name}</span>
            )}
        </>
    );
};