import { ExtensionContext } from 'vscode'
import { registerZoomIn } from './contexts/registerZoomIn'

export function activate(context: ExtensionContext) {
  registerZoomIn(context)
}
