import { commands, ExtensionContext, Uri, workspace } from 'vscode'
import {
  ZOOM_IN_COMMAND_ID,
  ZOOM_OUT_COMMAND_ID,
  ZOOM_RESET_COMMAND_ID,
  ZOOM_060_COMMAND_ID,
  ZOOM_070_COMMAND_ID,
  ZOOM_085_COMMAND_ID,
  ZOOM_100_COMMAND_ID,
  ZOOM_120_COMMAND_ID,
  ZOOM_150_COMMAND_ID,
  ZOOM_175_COMMAND_ID,
  ZOOM_200_COMMAND_ID,
} from './sourceSurgeCommands'

let zoomReset: number
let zoomLevel: number

export function registerEditorZoomCommands(context: ExtensionContext) {
  const zoomSettings = workspace
    .getConfiguration('')
    .get<number>('window.zoomLevel')
  zoomReset = zoomSettings ? zoomSettings : 0
  zoomLevel = zoomReset ? zoomReset : 0
  _registerZoomInCommand(context)
  _registerZoomOutCommand(context)
  _registerZoomResetCommand(context)

  _registerZoomPercentagesCommand(context, ZOOM_060_COMMAND_ID, -3)
  _registerZoomPercentagesCommand(context, ZOOM_070_COMMAND_ID, -2)
  _registerZoomPercentagesCommand(context, ZOOM_085_COMMAND_ID, -1)
  _registerZoomPercentagesCommand(context, ZOOM_100_COMMAND_ID, 0)
  _registerZoomPercentagesCommand(context, ZOOM_120_COMMAND_ID, 1)
  _registerZoomPercentagesCommand(context, ZOOM_150_COMMAND_ID, 2)
  _registerZoomPercentagesCommand(context, ZOOM_175_COMMAND_ID, 3)
  _registerZoomPercentagesCommand(context, ZOOM_200_COMMAND_ID, 4)
}

function _registerZoomInCommand(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    zoomLevel = zoomLevel + 0.25
    workspace.getConfiguration('').update('window.zoomLevel', zoomLevel, true)
  }
  context.subscriptions.push(
    commands.registerCommand(ZOOM_IN_COMMAND_ID, commandHandler)
  )
}
function _registerZoomOutCommand(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    zoomLevel = zoomLevel - 0.25
    workspace.getConfiguration('').update('window.zoomLevel', zoomLevel, true)
  }
  context.subscriptions.push(
    commands.registerCommand(ZOOM_OUT_COMMAND_ID, commandHandler)
  )
}

function _registerZoomResetCommand(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    zoomLevel = zoomReset
    workspace.getConfiguration('').update('window.zoomLevel', zoomLevel, true)
  }
  context.subscriptions.push(
    commands.registerCommand(ZOOM_RESET_COMMAND_ID, commandHandler)
  )
}

function _registerZoomPercentagesCommand(
  context: ExtensionContext,
  command: string,
  percentage: number
) {
  const commandHandler = async (uri: Uri) => {
    workspace.getConfiguration('').update('window.zoomLevel', percentage, true)
  }
  context.subscriptions.push(commands.registerCommand(command, commandHandler))
}
