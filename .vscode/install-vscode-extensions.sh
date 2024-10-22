#!/bin/bash

# extensions.json ファイルのパス
EXTENSIONS_FILE="./extensions.json"

# extensions.json が存在するか確認
if [ ! -f "$EXTENSIONS_FILE" ]; then
    echo "extensions.json ファイルが見つかりません: $EXTENSIONS_FILE"
    exit 1
fi

# それぞれの拡張機能をインストール
for ext in $(jq -r '.recommendations[]' $EXTENSIONS_FILE); do
    echo "拡張機能をインストール中: $ext"
    code --install-extension $ext
done

echo "すべての拡張機能のインストールが完了"