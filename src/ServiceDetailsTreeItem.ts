/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureTreeItem, AzureParentTreeItem } from "vscode-azureextensionui";
import { IDocumentRepository } from "./IDocumentRepository";
import { SearchService } from "azure-arm-search/lib/models";
import { getResourcesPath } from "./constants";
import * as vscode from 'vscode';
import * as path from 'path';
import getWebviewContent from './webviewForDetails/getWebviewContent';
import { SimpleSearchClient } from "./SimpleSearchClient";
import { SearchServiceTreeItem } from "./SearchServiceTreeItem";
import switchCalls from './WebViewSwitchCalls';

export class ServiceDetailsTreeItem extends AzureTreeItem implements IDocumentRepository {
    public readonly commandId: string = "azureCognitiveSearch.openDocument";
    public readonly contextValue: string = "azureCognitiveSearchServiceDetails";
    public readonly label: string = "Service Details";
    public readonly namePrefix: string;
    readonly itemName: string;
    readonly itemKind: string = "service";
    readonly extension: string = "azssvc";

    public constructor(
        parent: SearchServiceTreeItem,
        private readonly searchService: SearchService,
        private readonly searchClient: SimpleSearchClient) {
        super(parent);
        this.itemName = searchService.name || "";
        this.namePrefix = `service-${searchService.name}`;
    }

    public iconPath: { light: string | vscode.Uri; dark: string | vscode.Uri } = {
        light: path.join(getResourcesPath(), 'light', 'info.svg'),
        dark: path.join(getResourcesPath(), 'dark', 'info.svg')
    };

    async readContent(): Promise<vscode.WebviewPanel> {
        const panel = vscode.window.createWebviewPanel(
            this.searchService.name as string,
            this.searchService.name as string,
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );
        panel.webview.html = getWebviewContent(panel);
        panel.webview.postMessage({data: this.searchService});
        panel.webview.onDidReceiveMessage(message => {
            switchCalls(message, this.searchClient, (response: any) => {
                panel.webview.postMessage(response);
            });
        });
        return panel;
    }

    async updateContent(content: any, etag?: string | undefined): Promise<void> {
        throw new Error("Updating service details not supported.");
    }
}