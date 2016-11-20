# Simple Ruby ERB extension for Visual Studio Code

This extensions tries to provide simple Ruby and ERB support to Visual Studio Code without messing with linting or debugging.

## Features

* Both Ruby and ERB Syntax Highlighting
* Command for toggle between ERB tags
* Code Snippets

## Command erb.toggleTags

Supports multiple line/selection. Cycles through the tags `<%= %>`, `<% %>` and `<%# %>`.

![Simple Ruby ERB](images/toggleTags.gif?raw=true)

Keyboard shortcut by default <code>ctrl+shift+`</code> but you can always personalize:

```
// Your keyboard shortcuts
{
  "key": "ctrl+shift+`",
  "command": "erb.toggleTags",
  "when": "editorTextFocus && editorLangId == erb"
},
```

Inspired by [@eddorre](https://github.com/eddorre) SublimeText plugin [SublimeERB](https://github.com/eddorre/SublimeERB).

## TODO

* Better code snippets integration
* Add rails helpers snippets
* Modularize extension
* erb.toggleTags
  * Add tests
  * Improve selection after erb tag insertion

## Release Notes

### 0.1.0

Initial release

## License

This extension is [licensed under the MIT License](LICENSE.txt).
