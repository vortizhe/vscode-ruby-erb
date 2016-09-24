const vscode = require('vscode');

const erb_regex = /<%(=?|-?|#?)\s.*(-?)%>/;
const erb_opener_regex = /<%[\=\#\-]?/;
const erb_closer_regex = /-?%>/;

const erb_blocks = [
        ['<%=', '%>'],
        ['<%', '%>'],
        ['<%#', '%>']
      ];

function activate(context) {
  console.log('Congratulations, your extension "erb-plus" is now active!');

  let disposable = vscode.commands.registerCommand('extension.toggleErb', function () {
    let editor = vscode.window.activeTextEditor;
    if (!editor) return;
    toggleTags(editor);
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;


function deactivate() {
}
exports.deactivate = deactivate;

function findSorroundingBlock(text) {
  return [text.match(erb_opener_regex)[0], text.match(erb_closer_regex)[0]];
}

function insertErbBlock(text) {
  return `${erb_blocks[0][0]} ${text} ${erb_blocks[0][1]}`;
}


function replaceErbBlock(text) {
  let tags = findSorroundingBlock(text);
  let next_tags = getNextErbBlock(tags);
  return text.replace(tags[0], next_tags[0]).replace(tags[1], next_tags[1]);
}

function getNextErbBlock(tags) {
  let tags_str = JSON.stringify(tags);
  for (let i = 0; i < erb_blocks.length; i++) {
    if (JSON.stringify(erb_blocks[i]) == tags_str) {
      if (i+1 >= erb_blocks.length) {
        return erb_blocks[0];
      } else {
        return erb_blocks[i+1]
      }
    }
  }

  return erb_blocks[0]
}

function toggleTags(editor) {
  let selectionsMap = {};
  let selections = editor.selections.filter(function (selection) { return selection.isSingleLine && !selection.isEmpty; });
  selections.forEach(function (selection) { return selectionsMap[selection.start.line] ?
    selectionsMap[selection.start.line].push(selection) :
    selectionsMap[selection.start.line] = [selection]; });
  let newSelections = [];
  let lineOffset = 0;
  editor.edit(function(editBuilder) {
    for (let key in selectionsMap) {
      if (selectionsMap.hasOwnProperty(key)) {
        lineOffset = 0;
        selectionsMap[key] = selectionsMap[key].sort(function (first, second) { return first.end.isBefore(second.start) ? -1 : 1; });
        selectionsMap[key].forEach(function (selection) {
          let selectedRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
          let selectedText = editor.document.getText(selectedRange);
          let newText = '';
          if (selectedText.match(erb_regex)) {
            newText = replaceErbBlock(selectedText);
          } else {
            newText = insertErbBlock(selectedText);
          }
          let delta = newText.length - selectedText.length;
          newSelections.push(new vscode.Selection(selection.start.line, selection.start.character + lineOffset, selection.end.line, selection.end.character + lineOffset + delta));
          lineOffset += delta;
          editBuilder.replace(selectedRange, newText);
        });
      }
    }
  });
  editor.selections = newSelections;
}