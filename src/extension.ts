import { ExtensionContext } from 'vscode'
import { registerEditorZoomCommands } from './contexts/registerEditorZoomCommands'
import { registerEditorProxyCommands } from './contexts/registerEditorProxyCommands'
import { registerHashCommands } from './contexts/registerHashCommands'

export function activate(context: ExtensionContext) {
  registerEditorZoomCommands(context)
  registerEditorProxyCommands(context)
  registerHashCommands(context)
}
