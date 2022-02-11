# ECMAScript6 について

## ES6の新機能
ECMAScript6がJavaScriptの開発に新しい構文と用法を提供しています。

### let
多分、`var` キーワードで変数を宣言してきたと思います。
ES6では、ある特定のスコープを持つブロックに適用される変数の定義に `let` キーワードを使うのが、より適しています。
その変数は、との特定のコードブロックで定義されるまで、アクセスできません。

たとえば `let` 変数定義が `if` ブロックの中にあれば、そのブロックの外側でアクセスすることはできないのです。

これに反して `var` 変数は、それが定義されている関数をスコープとします。

以下の`let.js` 例を見てく考えてみてください。

**let キーワード例**
```javascript
// let 使用例
function sample() {
	var num = 60;
	if (num > 50) {
		let num = 0;
		console.log(num);
	}
	console.log(num);
}
sample();
```
以下のコマンドを実行してみます。
```bash
node let.js
```
```bash
0
60
```

関数もコードブロックなので、`let` 変数のスコープになります。
モジュールあるいはアプリケーション全体をスコープとするグローバル変数以外は、`let` を使うのが、`var` よりもセキュアな変数定義として好ましい方法です。

## const 変数
`const` 変数には、再代入が出来ません。
コードで値を変えたくない変数には、`let` `var` でなく、`const` を使うべきです。
典型的な使用例として、Node.jsのライブラリやモジュールをロードするときに `const` を使用します。

以下の`const.js` 例を見てく考えてみてください。
```javascript
function sample(val) {
	const price = 1000;
	let price = price - val;
	console.log(price);
}
sample(500);
```
以下のコマンドを実行してみます。
```bash
node const.js
```
```bash
const.js:3
        let price = price - val;
            ^
SyntaxError: Identifier 'price' has already been declared
```
もし、const 変数に値を再代入しようとしたら、「Duplicate Declaration Error(多重宣言エラー)」になります。

