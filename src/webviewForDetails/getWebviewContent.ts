import * as vscode from 'vscode';
import * as path from 'path';
import { ext } from '../extensionVariables';


const getWebviewContent = (panel: vscode.WebviewPanel) => {
	const onDiskPath = vscode.Uri.file(
		path.join(ext.context.extensionPath, 'resources', "webviewForDetails", 'webview.js')
	);
	const reactWebviewSrc = panel.webview.asWebviewUri(onDiskPath);
	
	return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
        </head>
        <body>
            <div id="root"></div>
			<script crossorigin="anonymous" src="${reactWebviewSrc}"></script>
        </body>
    </html>`;
};

export default getWebviewContent;