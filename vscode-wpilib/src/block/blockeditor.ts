import * as vscode from 'vscode';
// import * as FS from 'fs';
// import * as path from 'path';

export class BlockEditorProvider implements vscode.CustomTextEditorProvider {
    private static readonly viewType = 'wpilibcore.block';

    // private static readonly scratchCharacters = ['😸', '😹', '😺', '😻', '😼', '😽', '😾', '🙀', '😿', '🐱'];

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
    }

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new BlockEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(BlockEditorProvider.viewType, provider);
        return providerRegistration;
    }

    /**
     * Called when our custom editor is opened.
     * 
     * 
     */
    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {
        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        function updateWebview() {
            webviewPanel.webview.postMessage({
                type: 'update',
                text: document.getText(),
            });
        }

        // Hook up event handlers so that we can synchronize the webview with the text document.
        //
        // The text document acts as our model, so we have to sync change in the document to our
        // editor and sync changes in the editor back to the document.
        // 
        // Remember that a single text document can also be shared between multiple custom
        // editors (this happens for example when you split a custom editor)

        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.uri.toString() === document.uri.toString()) {
                updateWebview();
            }
        });

        // Make sure we get rid of the listener when our editor is closed.
        webviewPanel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
        });

        // Receive message from the webview.
        webviewPanel.webview.onDidReceiveMessage((e) => {
            switch (e.type) {
                case 'test':
					const edit = new vscode.WorkspaceEdit();
			
					// Just replace the entire document every time for this example extension.
					// A more complete extension should compute minimal edits instead.
					edit.replace(document.uri, new vscode.Range(document.lineCount, 0, document.lineCount, 0), `${document.lineCount}\n`);
			
					vscode.workspace.applyEdit(edit);

					break;
            }
        });

        updateWebview();
    }

    /**
     * Get the static html used for the editor webviews.
     */
    private getHtmlForWebview(webview: vscode.Webview): string {
        // Local path to script and css for the webview
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, './resources/block/block.js'));

        // const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
        //     this.context.extensionUri, 'media', 'reset.css'));

        // const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(
        //     this.context.extensionUri, 'media', 'vscode.css'));

        // const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(
        //     this.context.extensionUri, 'media', 'catScratch.css'));

        // // Use a nonce to whitelist which scripts can be run
        // const nonce = getNonce();

        return `
		<!DOCTYPE html>
        <html>
			<head>
				<title>WPILib Block Environment</title>
			</head>
			<body>
				<div id="viewport"></div>
				<script src="${scriptUri}"></script>
			</body>
        </html>
        `;
        // FS.readFileSync(path.join(this.context.extensionPath, './resources/webviews/text.html')).toString();
    }

    /**
     * Add a new scratch to the current document.
     */
    // private addNewScratch(document: vscode.TextDocument) {
    //     const json = this.getDocumentAsJson(document);
    //     const character = 't';
    //     json.scratches = [
    //         ...(Array.isArray(json.scratches) ? json.scratches : []),
    //         {
    //             id: getNonce(),
    //             text: character,
    //             created: Date.now(),
    //         }
    //     ];

    //     return this.updateTextDocument(document, json);
    // }

    // /**
    //  * Delete an existing scratch from a document.
    //  */
    // private deleteScratch(document: vscode.TextDocument, id: string) {
    //     const json = this.getDocumentAsJson(document);
    //     if (!Array.isArray(json.scratches)) {
    //         return;
    //     }

    //     json.scratches = json.scratches.filter((note: any) => note.id !== id);

    //     return this.updateTextDocument(document, json);
    // }

    /**
     * Try to get a current document as json text.
     */
    // private getDocumentAsJson(document: vscode.TextDocument): any {
    //     const text = document.getText();
    //     if (text.trim().length === 0) {
    //         return {};
    //     }

    //     try {
    //         return JSON.parse(text);
    //     } catch {
    //         throw new Error('Could not get document as json. Content is not valid json');
    //     }
    // }
}