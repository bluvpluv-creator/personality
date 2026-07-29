# Antigravity QUOTA Button

> [!CAUTION]
> **⚠️ 重要：この拡張機能はデバッグモード（`--remote-debugging-port=9222` オプション付き）で起動されたAntigravity環境でのみ動作します。**
>
> 通常モードで起動した場合、設定画面は開きますが「Models」タブへの自動遷移は行われません。
>
> ### デバッグモードでの起動方法
> Antigravityの起動ショートカットのプロパティを開き、「リンク先」の末尾に以下を追記してください：
> ```
> --remote-debugging-port=9222
> ```
> 例：`"C:\...\Antigravity.exe" --remote-debugging-port=9222`

---

Antigravityエディタ（VS Code互換環境）の右下（ステータスバー）に、ワンクリックで設定の「Models（モデルクォータ）」画面を開く便利な **QUOTA** ボタンを追加する、シンプルで軽量な拡張機能です。

## 主な機能 (Features)

- **ワンクリック・アクセス:** 右下のステータスバーに追加される `$(server-environment) QUOTA` ボタンをクリックするだけです。
- **自動ナビゲーション:** 自動的にAntigravityの設定画面が開き、即座に「Models」タブへ切り替わります。
- **堅牢な裏口アクセス (CDP通信):** マウスの座標やGUIからのマクロに依存せず、内部の「Chrome DevTools Protocol (CDP)」を通じてDOMを直接操作するため、解像度やウィンドウサイズの違いによるクリックミスが100%発生しない安定した動作を実現しています。

## 使い方 (How to Use)

1. 右下のステータスバーにある **QUOTA** ボタンをクリックします。
2. Antigravityの設定(Settings)画面が開きます。
3. そのまま約1秒待つと、画面が自動的に **Models** タブへ切り替わります！

## 動作要件 (Requirements)

この拡張機能は、実行環境のNode.js上でHTTP(WebSocket)通信を使用して内部操作を行います。
Antigravity（VS Codeプロトコル環境）が `--remote-debugging-port=9222` のデバッグポートを解放している環境で動作します。

> [!IMPORTANT]
> **通常起動ではこのポートは閉じられているため、必ず起動オプションに `--remote-debugging-port=9222` を追加してください。**
> 詳しくは本READMEの冒頭にある「デバッグモードでの起動方法」をご確認ください。

## 既知の問題 (Known Issues)

- 通常モード（デバッグポート未開放）では、Modelsタブへの自動遷移が動作しません。

## リリースノート (Release Notes)

### 1.1.0
- READMEの更新。デバッグモード必須の注意事項を明記。

### 1.0.0
- Antigravity MODEL QUOTA の初期リリース。
- 座標依存のマウス操作マクロから、より安定したCDP通信による確実なDOM操作クリックへと内部ロジックを改良しました。
