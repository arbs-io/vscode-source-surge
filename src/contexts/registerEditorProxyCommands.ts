import { commands, ExtensionContext, Uri } from 'vscode'
import {
  FORMATDOC_COMMAND_ID,
  FORMATDOC_VSCOMMAND_ID,
  TRANSFORM_KEBAB_COMMAND_ID,
  TRANSFORM_KEBAB_VSCOMMAND_ID,
  TRANSFORM_UPPER_COMMAND_ID,
  TRANSFORM_UPPER_VSCOMMAND_ID,
  TRANSFORM_LOWER_COMMAND_ID,
  TRANSFORM_LOWER_VSCOMMAND_ID,
  TRANSFORM_SNAKE_COMMAND_ID,
  TRANSFORM_SNAKE_VSCOMMAND_ID,
  TRANSFORM_TITLE_COMMAND_ID,
  TRANSFORM_TITLE_VSCOMMAND_ID,
  FOLDALL_COMMAND_ID,
  FOLDALL_VSCOMMAND_ID,
  UNFOLDALL_COMMAND_ID,
  UNFOLDALL_VSCOMMAND_ID,
} from './sourceSurgeCommands'

export function registerEditorProxyCommands(context: ExtensionContext) {
  _registerCommand(context, FORMATDOC_COMMAND_ID, FORMATDOC_VSCOMMAND_ID)
  _registerCommand(context, FOLDALL_COMMAND_ID, FOLDALL_VSCOMMAND_ID)
  _registerCommand(context, UNFOLDALL_COMMAND_ID, UNFOLDALL_VSCOMMAND_ID)
  _registerCommand(
    context,
    TRANSFORM_KEBAB_COMMAND_ID,
    TRANSFORM_KEBAB_VSCOMMAND_ID
  )
  _registerCommand(
    context,
    TRANSFORM_UPPER_COMMAND_ID,
    TRANSFORM_UPPER_VSCOMMAND_ID
  )
  _registerCommand(
    context,
    TRANSFORM_LOWER_COMMAND_ID,
    TRANSFORM_LOWER_VSCOMMAND_ID
  )
  _registerCommand(
    context,
    TRANSFORM_SNAKE_COMMAND_ID,
    TRANSFORM_SNAKE_VSCOMMAND_ID
  )
  _registerCommand(
    context,
    TRANSFORM_TITLE_COMMAND_ID,
    TRANSFORM_TITLE_VSCOMMAND_ID
  )
}

function _registerCommand(
  context: ExtensionContext,
  sourceSurgeCommand: string,
  vscodeCommand: string
) {
  const commandHandler = async (uri: Uri) => {
    try {
      await commands.executeCommand(vscodeCommand)
    } catch (error) {
      console.log(error)
    }
  }
  context.subscriptions.push(
    commands.registerCommand(sourceSurgeCommand, commandHandler)
  )
}
