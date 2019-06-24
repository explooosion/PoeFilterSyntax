import * as vscode from "vscode"
import * as CompletionStrings from "./CompletionStrings"

export class FilterCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    let line = document.lineAt(position.line);
    let completionList = new vscode.CompletionList();
    let strPool: string[] | { label: string, detail: string, doc: string }[];
    let includequotes: boolean = false;
    let withDescription: boolean;

    if (line.text.match(/^\s*Class\s/i)) {
      strPool = CompletionStrings.CLASSES;
      includequotes = true;
    } else if (line.text.match(/^\s*Rarity\s/i)) {
      strPool = CompletionStrings.RARITIES;
    } else if (line.text.match(/^\s*BaseType\s/i)) {
      strPool = CompletionStrings.BASE_TYPES;
      includequotes = true;
    } else if (line.text.match(/^\s*Prophecy\s/i)) {
      strPool = CompletionStrings.PROPHECIES;
      includequotes = true;
    } else if (line.text.match(/^\s*HasEnchantment\s/i)) {
      strPool = CompletionStrings.ENCHANTMENTS;
      includequotes = true;
    } else if (line.text.match(/^\s*\w+$/)) {
      strPool = CompletionStrings.KEYWORDS;
      withDescription = true;
    } else if (line.text.match(/^\s*(AnyEnchantment|Identified|Corrupted|ElderItem|ShaperItem|FracturedItem|SynthesisedItem|ShapedMap)\s/i)) {
      strPool = CompletionStrings.BOOLEAN;
    } else if (line.text.match(/^\s*PlayEffect\s/i)) {
      strPool = CompletionStrings.EFFECTS;
    } else if (line.text.match(/^\s*MinimapIcon\s/i)) {
      let words = line.text.split(/\s/);
      if (words.length == 2) {
        strPool = CompletionStrings.ICON_SIZE;
      } else if (words.length == 3) {
        strPool = CompletionStrings.ICON_COLORS;
      } else {
        strPool = CompletionStrings.ICON_SHAPES;
      }
    }

    if (withDescription) {
      (strPool as { label: string, detail: string, doc: string }[]).forEach((item) => {
        let completeItem = new vscode.CompletionItem(item.label);
        completeItem.documentation = item.doc;
        completeItem.detail = item.detail;
        completionList.items.push(completeItem);
      });
    } else {
      (strPool as string[]).forEach(text => completionList.items.push(new vscode.CompletionItem(text)));
    }
    if (includequotes) {
      completionList.items.forEach(item => item.insertText = `"${item.label}"`);
    }
    return completionList;
  }
}