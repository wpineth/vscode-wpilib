(function () {

	// Get a reference to the VS Code webview api.
	// We use this API to post messages back to our extension.

	const vscode = acquireVsCodeApi();

	const button = document.createElement('button');

    button.id = 'test-button';

    button.innerText = 'This is a test button!';

	button.addEventListener('click', () => {
		vscode.postMessage({
			type: 'test'
		});
	});

	/**
	 * Render the document in the webview.
	 */
	function updateContent(text) {
        const viewport = document.querySelector('#viewport');

        viewport.innerHTML = '';

		viewport.appendChild(button);

        const p = document.createElement('p');

        p.innerText = text;

        viewport.appendChild(p);
	}

	// Handle messages sent from the extension to the webview
	window.addEventListener('message', event => {
		const message = event.data; // The json data that the extension sent
		switch (message.type) {
			case 'update':
				const text = message.text;

				// Update our webview's content
				updateContent(text);

				// Then persist state information.
				// This state is returned in the call to `vscode.getState` below when a webview is reloaded.
				vscode.setState({ text });

				return;
		}
	});

	// Webviews are normally torn down when not visible and re-created when they become visible again.
	// State lets us save information across these re-loads
	const state = vscode.getState();
	if (state) {
		updateContent(state.text);
	}
}());