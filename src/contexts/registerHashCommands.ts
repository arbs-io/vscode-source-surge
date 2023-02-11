import { commands, ExtensionContext, Position, Uri, window } from 'vscode'
import * as crypto from 'crypto'

let zoomReset: number
let zoomLevel: number

export function registerHashCommands(context: ExtensionContext) {
  _registerZoomInCommand(context)
}

function _registerZoomInCommand(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    const editor = window.activeTextEditor
    await editor?.edit((editBuilder) => {
      const uuid4 = crypto.randomUUID()
      //const uuid = crypto.randomBytes(16).toString('hex')
      const activePos = editor.selection.active
      editBuilder.insert(activePos, uuid4)
    })
  }
  context.subscriptions.push(
    commands.registerCommand('sourceSurge.action.newUuid', commandHandler)
  )
}
