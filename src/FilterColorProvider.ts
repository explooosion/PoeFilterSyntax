import * as vscode from "vscode"

export class FilterColorProvider implements vscode.DocumentColorProvider {
  provideDocumentColors(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.ColorInformation[]> {
    let result: vscode.ColorInformation[] = [];

    for (let i = 0; i < document.lineCount; i++) {
      let line = document.lineAt(i);
      let matchResult: RegExpMatchArray;

      if (matchResult = line.text.match(/^(\s*(?:SetBorderColor|SetTextColor|SetBackgroundColor)\s+)(\d+)\s+(\d+)\s+(\d+)(?:\s+(\d+))?/i)) {
        result.push(new vscode.ColorInformation(
          new vscode.Range(
            new vscode.Position(line.lineNumber, matchResult[1].length),
            new vscode.Position(line.lineNumber, matchResult[0].length)
          ),
          new vscode.Color(
            Number(matchResult[2]) / 255,
            Number(matchResult[3]) / 255,
            Number(matchResult[4]) / 255,
            matchResult[5] == null ? 1 : (Number(matchResult[5]) / 255)
          )
        ));
      }
    }

    return result;
  }
  provideColorPresentations(color: vscode.Color, context: { document: vscode.TextDocument; range: vscode.Range; }, token: vscode.CancellationToken): vscode.ProviderResult<vscode.ColorPresentation[]> {
    let result = new vscode.ColorPresentation("Color Picker");
    if (color.alpha == 1) {
      result.textEdit = new vscode.TextEdit(context.range, `${Math.round(color.red * 255)} ${Math.round(color.green * 255)} ${Math.round(color.blue * 255)}`);
    } else {
      result.textEdit = new vscode.TextEdit(context.range, `${Math.round(color.red * 255)} ${Math.round(color.green * 255)} ${Math.round(color.blue * 255)} ${Math.round(color.alpha * 255)}`);
    }
    
    return [result];
  }  
}