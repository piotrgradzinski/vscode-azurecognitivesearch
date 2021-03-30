import * as React from 'react';
import styled from 'styled-components';

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

export const MainContainer: React.FC = () => {

    const [data, setData] = React.useState<any>(undefined);

    React.useEffect(() => {
        window.addEventListener('message', event => {
            setData(event.data);
            console.log('event.data', event.data);
        });
    }, []);

    return (
        <>
            {data ? (
                <Wrapper>
                    <span><strong>Id:</strong> {data.id}</span>
                    <span><strong>Location:</strong> {data.location}</span>
                    <span><strong>Name:</strong> {data.name}</span>
                    <span><strong>SKU name:</strong> {data.sku?.name}</span>
                    <span><strong>Tag - Client:</strong> {data.tags?.client}</span>
                    <span><strong>Tag - environment:</strong> {data.tags?.environment}</span>
                    <span><strong>Tag - instance:</strong> {data.tags?.instance}</span>
                    <span><strong>Tag - project:</strong> {data.tags?.project}</span>
                    <span><strong>Type:</strong> {data.type}</span>
                </Wrapper>
            ) : (
                <span>Loading data...</span>
            )}
        </>
    );
};