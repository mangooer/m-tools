import * as vscode from 'vscode';
import DeveloperToolsViewProvider from './views/DeveloperToolsView';

export function activate(context: vscode.ExtensionContext) {
	const developerToolsViewProvider = new DeveloperToolsViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			DeveloperToolsViewProvider.viewType,
			developerToolsViewProvider
		)
	);
}

export function deactivate() {}
