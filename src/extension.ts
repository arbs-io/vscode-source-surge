import { ExtensionContext } from 'vscode'
import { registerEditorZoomCommands } from './contexts/registerEditorZoomCommands'
import { registerEditorProxyCommands } from './contexts/registerEditorProxyCommands'
import { registerCryptoCommands } from './contexts/registerCryptoCommands'

export function activate(context: ExtensionContext) {
  registerEditorZoomCommands(context)
  registerEditorProxyCommands(context)
  registerCryptoCommands(context)
}
