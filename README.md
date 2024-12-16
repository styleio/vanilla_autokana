
# AutoKana Vanilla JavaScript

## 概要 (Overview)

このプロジェクトは、姓や名の入力フィールドに基づいて、自動的にカナ文字（ひらがなまたはカタカナ）を生成するVanilla JavaScriptライブラリです。`jQuery` に依存しない軽量な実装で、簡単にフォームに組み込むことができます。

This project is a Vanilla JavaScript library that automatically generates kana characters (Hiragana or Katakana) based on input in fields for family names and given names. It is a lightweight implementation without `jQuery` dependencies and can be easily integrated into forms.

---

## 特徴 (Features)

- **軽量**: `jQuery` 不要で、Vanilla JavaScriptのみで動作します。
- **設定可能**: カタカナに変換するオプション (`katakana: true`) をサポート。
- **簡単な統合**: HTMLフォームに簡単に追加可能。
- **リアルタイム変換**: 入力内容をリアルタイムで変換。

- **Lightweight**: No `jQuery` required, works purely with Vanilla JavaScript.
- **Configurable**: Supports options for Katakana conversion (`katakana: true`).
- **Easy Integration**: Easily add to your HTML forms.
- **Real-time Conversion**: Converts input in real time.

---

## セットアップ (Setup)

### ファイル構成 (File Structure)
```
project/
├── src/
│   └── vanilla_autokana.js
├── test/
│   └── index.html
└── README.md
```

---

## 使用方法 (Usage)

### 1. ライブラリの読み込み (Include the Library)

HTMLファイルに `vanilla_autokana.js` を読み込む:
Include the `vanilla_autokana.js` script in your HTML file:

```html
<script src="../src/vanilla_autokana.js" defer></script>
```

---

### 2. フォームフィールドの設定 (Set Up Form Fields)

以下のように姓や名のフィールドを準備してください:
Prepare fields for family name and given name as follows:

```html
<form>
    <label for="shipping_address_family_name">姓</label>
    <input type="text" id="shipping_address_family_name" placeholder="例: 山田">

    <label for="shipping_address_family_name_kana">姓 (カナ)</label>
    <input type="text" id="shipping_address_family_name_kana" placeholder="例: ヤマダ" readonly>

    <label for="shipping_address_first_name">名</label>
    <input type="text" id="shipping_address_first_name" placeholder="例: 太郎">

    <label for="shipping_address_first_name_kana">名 (カナ)</label>
    <input type="text" id="shipping_address_first_name_kana" placeholder="例: タロウ" readonly>
</form>
```

---

### 3. JavaScriptで初期化 (Initialize with JavaScript)

`autoKana` 関数を使って自動カナ変換を設定します:
Use the `autoKana` function to configure automatic Kana conversion:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    try {
        autoKana(
            "#shipping_address_family_name", // 姓の入力フィールド
            "#shipping_address_family_name_kana", // 姓のカナフィールド
            { katakana: true } // カタカナ変換を有効化
        );

        autoKana(
            "#shipping_address_first_name", // 名の入力フィールド
            "#shipping_address_first_name_kana", // 名のカナフィールド
            { katakana: true } // カタカナ変換を有効化
        );
    } catch (e) {
        console.error("autoKanaの初期化に失敗しました:", e);
    }
});
```

---

## 動作確認 (Testing)

`test/index.html` をブラウザで開くことで、ライブラリの動作を確認できます。
Open `test/index.html` in your browser to test the functionality of the library.

---

## ライセンス (License)

このプロジェクトはMITライセンスのもとで公開されています。
This project is licensed under the MIT License.
