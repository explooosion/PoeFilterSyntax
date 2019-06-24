import * as vscode from "vscode"
import { FilterColorProvider } from "./FilterColorProvider"
import {FilterCompletionProvider} from "./FilterCompletionItemProvider"

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerColorProvider({ scheme: "file", language: "filter" }, new FilterColorProvider());
  vscode.languages.registerCompletionItemProvider({ scheme: "file", language: "filter" }, new FilterCompletionProvider())
}