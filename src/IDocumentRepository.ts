/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface IDocumentRepository {
    readonly namePrefix: string;

    readonly itemName: string;

    readonly itemKind: string;

    readonly extension: string;

    readContent(): Promise<any>;

    updateContent(content: any, etag?: string): Promise<void>;
}
