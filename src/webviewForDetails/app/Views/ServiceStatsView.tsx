import * as React from 'react';

interface IServiceStatsProps {
    data: any; // TODO: Use interface instead of any.
}

function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const ServiceStatsView: React.FC<IServiceStatsProps> = props => {
    return (
        <div>
            <h1>Service Stats</h1>
            <dl>
                <dt>Storage</dt><dd>{formatBytes(props.data?.storageSize.usage)}/{formatBytes(props.data?.storageSize.quota)}</dd>
                <dt>Indexes</dt><dd>{props.data?.indexesCount.usage}/{props.data?.indexesCount.quota}</dd>
                <dt>Indexers</dt><dd>{props.data?.indexersCount.usage}/{props.data?.indexersCount.quota}</dd>
                <dt>Data Sources</dt><dd>{props.data?.dataSourcesCount.usage}/{props.data?.dataSourcesCount.quota}</dd>
            </dl>
        </div>
    );
};