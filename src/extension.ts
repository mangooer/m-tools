import * as vscode from 'vscode';
import MToolsViewProvider from './views/MToolsView';

export function activate(context: vscode.ExtensionContext) {
	const mToolsViewProvider = new MToolsViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			MToolsViewProvider.viewType,
			mToolsViewProvider
		)
	);
}

export function deactivate() {}
