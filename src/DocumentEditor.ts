import * as vscode from "vscode";
import * as os from "os";
import * as path from "path";
import * as crypto from "crypto";
import * as fse from "fs-extra";
import { ext } from "./extensionVariables";
import { DialogResponses, UserCancelledError } from "vscode-azureextensionui";
import { IDocumentRepository } from "./IDocumentRepository";

export class DocumentEditor implements vscode.Disposable {
    private fileMap: { [key: string]: IDocumentRepository } = {};

    public async dispose(): Promise<void> {
        for (const f of Object.keys(this.fileMap)) {
            try {
                await fse.remove(f);
            }
            catch {
                ext.outputChannel.appendLine(`Failed to delete temporary file '${f}')`);
            }
        }
    }

    public async showEditor(item: IDocumentRepository): Promise<void> {
        const suffix = DocumentEditor.getRandomSuffix();
        const filename = `${item.namePrefix}-${suffix}.${item.extension}`;
        const localPath = path.join(os.tmpdir(), "vscode-azuresearch-editor", filename);
        await fse.ensureFile(localPath);
        this.fileMap[localPath] = item;

        const result = await item.readContent();

        await fse.writeJson(localPath, result ? result.content : {}, { spaces: 4 });

        const doc = await vscode.workspace.openTextDocument(localPath);
        vscode.languages.setTextDocumentLanguage(doc, "json");
        await vscode.window.showTextDocument(doc);
    }

    public async onDidSaveTextDocument(doc: vscode.TextDocument) : Promise<void> {
        const filename = Object.keys(this.fileMap).find(f => path.relative(doc.fileName, f) === "");
        if (filename) {
            const item = this.fileMap[filename];
            const r: vscode.MessageItem | undefined = await vscode.window.showWarningMessage(`Saving these changes will update ${item.itemKind} '${item.itemName}'`,
                                                                                             DialogResponses.upload,
                                                                                             DialogResponses.cancel);

            if (!r || r === DialogResponses.cancel) {
                throw new UserCancelledError();
            }

            const content: any = await fse.readJson(doc.fileName);
            await item.updateContent(content);
        }
    }

    private static getRandomSuffix(): string {
        const buffer: Buffer = crypto.randomBytes(5);
        return buffer.toString('hex');
    }
}
