import * as vscode from 'vscode';

export class BlockCfgEditorProvider implements vscode.CustomTextEditorProvider {
    private static readonly viewType = 'wpilibcore.blockcfg';

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
    }

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new BlockCfgEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(BlockCfgEditorProvider.viewType, provider);
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

        let has_loaded = false;

        function updateWebview() {
            if(!has_loaded){
                webviewPanel.webview.postMessage({
                    type: 'load',
                    text: document.getText(),
                });

                has_loaded = true;
            }
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
                case 'replace':
                    const edit = new vscode.WorkspaceEdit();
                    // Just replace the entire document every time for this example extension.
                    // A more complete extension should compute minimal edits instead.
                    edit.replace(document.uri, new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end), e.body);
            
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
        // Blockly imports...
        const blocklyPythonGeneratorUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, './node_modules/blockly/python_compressed.js'));
        const blocklyUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, './node_modules/blockly/blockly_compressed.js'));
        const blocklyBlockCFGGeneratorUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, './resources/block/blockcfg.js'));
        const blocklyBlocksUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, './resources/block/cfg/blockcfg_blocks.js'));
        const blocklyEnUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, './node_modules/blockly/msg/en.js'));


        // Local path to script and css for the webview
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, './resources/block/cfg/blockcfg.js'));

        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta http-equiv="Content-Security-Policy">
                <title>WPILib Block Environment</title>
                <script src="${blocklyUri}"></script>
                <script src="${blocklyPythonGeneratorUri}"></script>
                <script src="${blocklyBlockCFGGeneratorUri}"></script>
                <script src="${blocklyBlocksUri}"></script>
                <script src="${blocklyEnUri}"></script>
                <script src="${scriptUri}"></script>
            </head>
            <body>
                <div id="viewport"></div>
                <div id="blockly-workspace" style="height: 480px; width: 600px;"></div>
            </body>
        </html>
        `;
    }
}