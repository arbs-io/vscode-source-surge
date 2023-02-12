import { commands, ExtensionContext, Uri, window, env, Range } from 'vscode'
import * as crypto from 'crypto'
import {
  CRYPTO_SHA512_COMMAND_ID,
  CRYPTO_UUID_COMMAND_ID,
} from './sourceSurgeCommands'

export function registerCryptoCommands(context: ExtensionContext) {
  _registerUuid4Command(context)
  _registerSha512Command(context, CRYPTO_SHA512_COMMAND_ID, 'sha512')

  // _registerSha512Command(context, CRYPTO_MD4_COMMAND_ID, 'md4')
  // _registerSha512Command(context, CRYPTO_MD5_COMMAND_ID, 'md5')
  // _registerSha512Command(context, CRYPTO_SHA1_COMMAND_ID, 'sha1')
  // _registerSha512Command(context, CRYPTO_SHA256_COMMAND_ID, 'sha256')
  // _registerSha512Command(context, CRYPTO_SHA384_COMMAND_ID, 'sha384')
  // _registerSha512Command(context, CRYPTO_SHA512_COMMAND_ID, 'sha512')
  // _registerSha512Command(context, CRYPTO_SHA512_224_COMMAND_ID, 'sha512_224')
  // _registerSha512Command(context, CRYPTO_SHA512_256_COMMAND_ID, 'sha512_256')
  // _registerSha512Command(context, CRYPTO_RIPEMDL160_COMMAND_ID, 'ripemd160')
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
    commands.registerCommand(CRYPTO_UUID_COMMAND_ID, commandHandler)
  )
}

function _registerSha512Command(
  context: ExtensionContext,
  sourceSurgeCommand: string,
  hashType: string
) {
  const commandHandler = async (uri: Uri) => {
    const editorValue = _getActiveTextEditorValue()
    const hash = crypto.createHash(hashType).update(editorValue).digest('hex')
    env.clipboard.writeText(hash)
    window.showInformationMessage(
      `SourceSurge: ${hashType.toUpperCase()} copied to clipboard\n${hash}`
    )
  }
  context.subscriptions.push(
    commands.registerCommand(sourceSurgeCommand, commandHandler)
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
