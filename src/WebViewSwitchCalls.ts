import { SimpleSearchClient } from './SimpleSearchClient';

const switchCalls = (exp: string, searchList: SimpleSearchClient, callback: any, resource?: any) => {
    switch (exp) {
        case 'listIndexes':
            searchList.listIndexes()
                .then((response: any) => {
                    console.log('response', response);
                    return callback({
                        title: exp,
                        data: response
                    });
                });

        case 'listResources':
            searchList.listResources(resource)
                .then((response: any) => {
                    console.log('response', response);
                    return callback({
                        title: exp,
                        data: response
                    });
                });
    }
};

export default switchCalls;