import { ExtensionContext } from 'vscode'
import { registerEditorZoomCommands } from './contexts/registerEditorZoomCommands'
import { registerEditorProxyCommands } from './contexts/registerEditorProxyCommands'

export function activate(context: ExtensionContext) {
  registerEditorZoomCommands(context);
  registerEditorProxyCommands(context);
}
