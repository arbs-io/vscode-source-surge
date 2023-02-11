import {
  commands,
  ExtensionContext,
  Uri,
  window,
  env,
  Range,
} from 'vscode'
import * as crypto from 'crypto'

export function registerCryptoCommands(context: ExtensionContext) {
  _registerUuid4Command(context)
  _registerSha512Command(context)
}

function _registerUuid4Command(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    const uuid4 = crypto.randomUUID()
    env.clipboard.writeText(uuid4)
    window.showInformationMessage(
      `SourceSurge: UUID(v4) copied to clipboard\n${uuid4}`
    )
  }
  context.subscriptions.push(
    commands.registerCommand('sourceSurge.action.newUuid', commandHandler)
  )
}

function _registerSha512Command(context: ExtensionContext) {
  const commandHandler = async (uri: Uri) => {
    const editorValue = _getActiveTextEditorValue()
    const hash = crypto.createHash('sha512').update(editorValue).digest('hex')
    env.clipboard.writeText(hash)
    window.showInformationMessage(
      `SourceSurge: SHA512 copied to clipboard\n${hash}`
    )
  }
  context.subscriptions.push(
    commands.registerCommand('sourceSurge.action.newSha512', commandHandler)
  )
}

async function _insertActiveTextEditorValue(value: string) {
  const editor = window.activeTextEditor
  await editor?.edit((editBuilder) => {
    const activePos = editor.selection.active
    editBuilder.insert(activePos, value)
  })
}

function _getActiveTextEditorValue(): string {
  const editor = window.activeTextEditor
  let value = ''
  if (editor) {
    const selection = editor.selection
    if (selection && !selection.isEmpty) {
      const selectionRange = new Range(
        selection.start.line,
        selection.start.character,
        selection.end.line,
        selection.end.character
      )
      value = editor.document.getText(selectionRange)
    } else {
      value = editor.document.getText()
    }
  }
  return value
}
