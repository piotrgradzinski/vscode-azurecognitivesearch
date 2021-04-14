import * as React from 'react';
import styled from 'styled-components';

import { ListIndexes } from './Views/listsIndexes';

const Wrapper = styled.div`
    background: white;
    padding: 16px;
    display: flex;
    flex-direction: column;
    > span {
        font-size: 14px;
        color: black;
        margin: 0 0 8px 0;
    }
`;
declare const acquireVsCodeApi: () => any;
const vscode = acquireVsCodeApi();

export const MainContainer: React.FC = () => {

    const [data, setData] = React.useState<any>(undefined);
    const [viewsData, setViewsData] = React.useState<any>('default');

    React.useEffect(() => {
        window.addEventListener('message', (event: { data: { title: string; data: any } }) => {
            console.log('event.data', event.data)
            switch (event.data.title) {
                case 'listIndexes': {
                    setViewsData(event.data);
                }

                case 'listResources': {
                    setViewsData(event.data);
                }

                default: setData(event.data?.data);
            }
        });
    }, []);

    const getIndexes = () => {
        vscode.postMessage('listIndexes');
    };

    return (
        <>
            {data ? (
                <Wrapper>
                    <button onClick={getIndexes}>Get indexes - button example</button>
                    {/* <span><strong>Id:</strong> {data.id}</span>
                    <span><strong>Location:</strong> {data.location}</span>
                    <span><strong>Name:</strong> {data.name}</span>
                    <span><strong>SKU name:</strong> {data.sku?.name}</span>
                    <span><strong>Tag - Client:</strong> {data.tags?.client}</span>
                    <span><strong>Tag - environment:</strong> {data.tags?.environment}</span>
                    <span><strong>Tag - instance:</strong> {data.tags?.instance}</span>
                    <span><strong>Tag - project:</strong> {data.tags?.project}</span>
                    <span><strong>Type:</strong> {data.type}</span> */}
                    {viewsData.title === 'listIndexes' &&
                        <ListIndexes data={viewsData.data} />
                    }
                </Wrapper>
            ) : (
                <span>Loading data...</span>
            )}
        </>
    );
};