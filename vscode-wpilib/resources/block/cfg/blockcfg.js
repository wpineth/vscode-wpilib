(function () {
    window.addEventListener('load', () => {
        const vscode = acquireVsCodeApi();
    
        const workspace = Blockly.inject('blockly-workspace', {
            toolbox: {
                kind: 'categoryToolbox',
                contents: [
                    {
                        kind: 'category',
                        name: 'Things',
                        categorystyle: 'logic_category',
                        contents: [
                            {
                                kind: 'block',
                                type: 'define_command'
                            }
                        ]
                    }
                ]
            }
        });

        function updateText(){
            const viewport = document.querySelector('#viewport');
    
            viewport.innerHTML = '';
    
            const document_contents = document.createElement('p');
    
            document_contents.innerText = Blockly.BlockCFG.workspaceToCode(workspace) + '\n\n#' + JSON.stringify(Blockly.serialization.workspaces.save(workspace));
    
            viewport.appendChild(document_contents);
        }

        function onChange(e){
            if(!workspace.isDragging() && [
                Blockly.Events.BLOCK_CHANGE,
                Blockly.Events.BLOCK_CREATE,
                Blockly.Events.BLOCK_DELETE,
                Blockly.Events.BLOCK_MOVE
            ].includes(e.type)){
                const intermediate = Blockly.BlockCFG.workspaceToCode(workspace) + '\n\n#' + JSON.stringify(Blockly.serialization.workspaces.save(workspace));

                vscode.postMessage({
                    type: 'replace',
                    body: intermediate
                });

                vscode.setState({
                    text: intermediate
                });

                updateText();
            }
        }

        function onFinishedLoading(e){
            if(e.type === 'finished_loading'){
                workspace.removeChangeListener(onFinishedLoading);

                workspace.addChangeListener(onChange);
            }
        }

        function updateContent(text){
            try{
                const sections = text.split('\n#');
    
                const json = sections[sections.length - 1];
                
                workspace.addChangeListener(onFinishedLoading);
                Blockly.serialization.workspaces.load(JSON.parse(json), workspace);
            }catch(err){
                workspace.addChangeListener(onChange);
                console.log('Failed to deserialize document. Reason:', err.message);
            }
            
            updateText();
        }

        // Handle messages sent from the extension to the webview
        window.addEventListener('message', (e) => {
            const message = e.data; // The json data that the extension sent
            switch (message.type) {
                case 'load':
                    // Update our webview's content
                    updateContent(message.text);
    
                    // Then persist state information.
                    // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
                    vscode.setState({
                        text: message.text
                    });
    
                    break;
            }
        });
    
        // Webviews are normally torn down when not visible and re-created when they become visible again.
        // State lets us save information across these re-loads
        const state = vscode.getState();
        if(state){
            updateContent(state.text);
        }
    });
}());