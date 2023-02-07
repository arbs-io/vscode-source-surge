import { ExtensionContext } from 'vscode'
import { registerEditorZoom } from './contexts/registerEditorZoom'
import { registerEditorFormatDocument } from './contexts/registerEditorFormatDocument'

export function activate(context: ExtensionContext) {
  registerEditorZoom(context)
  registerEditorFormatDocument(context)
}
