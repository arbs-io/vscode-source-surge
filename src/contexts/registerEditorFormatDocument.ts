import assert = require('assert')
import { commands, ExtensionContext, Uri, workspace } from 'vscode'
import { EDITOR_FORMATDOC_COMMAND_ID } from './sourceSurgeCommands'

let zoomReset: number
let zoomLevel: number

export function registerEditorFormatDocument(context: ExtensionContext) {
  const zoomSettings = workspace
    .getConfiguration('')
    .get<number>('window.zoomLevel')
  zoomReset = zoomSettings ? zoomSettings : 0
  zoomLevel = zoomReset ? zoomReset : 0
  _registerFormatDocumentCommand(context)
}

function _registerFormatDocumentCommand(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    try {
      await commands.executeCommand('editor.action.formatDocument')
    } catch (error) {
      console.log(error)
    }
  }
  context.subscriptions.push(
    commands.registerCommand(EDITOR_FORMATDOC_COMMAND_ID, commandHandler)
  )
}
