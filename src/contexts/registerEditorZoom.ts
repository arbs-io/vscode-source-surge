import { commands, ExtensionContext, Uri, workspace } from 'vscode'
import {
  EDITOR_ZOOM_IN_COMMAND_ID,
  EDITOR_ZOOM_OUT_COMMAND_ID,
  EDITOR_ZOOM_PRINT_COMMAND_ID,
  EDITOR_ZOOM_RESET_COMMAND_ID,
} from './sourceSurgeCommands'

let zoomReset: number
let zoomLevel: number

export function registerEditorZoom(context: ExtensionContext) {
  const zoomSettings = workspace
    .getConfiguration('')
    .get<number>('window.zoomLevel')
  zoomReset = zoomSettings ? zoomSettings : 0
  zoomLevel = zoomReset ? zoomReset : 0
  _registerZoomInCommand(context)
  _registerZoomOutCommand(context)
  _registerZoomResetCommand(context)
  _registerZoomPrintCommand(context)
}

function _registerZoomInCommand(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    zoomLevel++
    workspace.getConfiguration('').update('window.zoomLevel', zoomLevel, true)
  }
  context.subscriptions.push(
    commands.registerCommand(EDITOR_ZOOM_IN_COMMAND_ID, commandHandler)
  )
}
function _registerZoomOutCommand(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    zoomLevel--
    workspace.getConfiguration('').update('window.zoomLevel', zoomLevel, true)
  }
  context.subscriptions.push(
    commands.registerCommand(EDITOR_ZOOM_OUT_COMMAND_ID, commandHandler)
  )
}

function _registerZoomResetCommand(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    zoomLevel = zoomReset
    workspace.getConfiguration('').update('window.zoomLevel', zoomLevel, true)
  }
  context.subscriptions.push(
    commands.registerCommand(EDITOR_ZOOM_RESET_COMMAND_ID, commandHandler)
  )
}

function _registerZoomPrintCommand(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    const zoomSettings = workspace
      .getConfiguration('')
      .get<number>('window.zoomLevel')
    console.log(zoomSettings)
  }
  context.subscriptions.push(
    commands.registerCommand(EDITOR_ZOOM_PRINT_COMMAND_ID, commandHandler)
  )
}
