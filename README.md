# Simple Ruby ERB extension for Visual Studio Code

![Simple Ruby ERB](images/icon.png?raw=true)

This extensions tries to provide simple Ruby and ERB support to Visual Studio Code without messing with linting or debugging.

## Features

* Both Ruby and ERB Syntax Highlighting
* Command for toggle between ERB tags
* Code Snippets

## Command erb.toggleTags

Supports multiple line/selection. Cycles through the tags `<%= %>`, `<% %>` and `<%# %>`.

Keyboard shortcut by default <code>ctrl+shift+`</code> but you can always personalize:

```
// Your keyboard shortcuts
{
  "key": "ctrl+shift+`",
  "command": "editor.action.indentLines",
  "when": "editorTextFocus && !editorReadonly && !editorTabMovesFocus""
},
```

## TODO

* Better code snippets integration
* erb.toggleTags
  * Modularize extension
  * Add tests
  * Improve selection after erb tag insertion

## Release Notes

### 0.1.0

Initial release

## License

This extension is [licensed under the MIT License](LICENSE.txt).
