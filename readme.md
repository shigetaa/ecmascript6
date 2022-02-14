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

## 文字列補完
文字列の中に変数値を入れて出力あるいはロギングするとき、ES6以前はその変数の前後に文字列を付加する必要がありました。
```javascript
var str = "大阪";
console.log("ようこそ " + str + " へいらっしゃいました。");
```

ES6では、バッククォート `` ` `` と `${}` を使って、文字列の中に変数を埋め込む補完が可能です。
```javascript
var str = "大阪";
console.log(`ようこそ ${str} へいらっしゃいました。`);
```
以下のコマンドを実行してみます。
```bash
node console_log.js
```
```bash
ようこそ 大阪 へいらっしゃいました。
ようこそ 大阪 へいらっしゃいました。
```
その結果、コードがきれいになり、読みやすく編集もしやすくなります。

## アロー関数
アロー関数は、ES6によって、より簡潔に読みやすくなったコードの一例です。
アローと呼ばれる矢印のシンボル `=>` と、従来の関数とは異なる構文によって、複数行の関数を1行にする事ができます。

**例 function キーワードで関数を定義する**
```javascript
function printName(name) {
	console.log(`My name is ${name}`);
}
```
上記の例を以下の様に書き直すことができます。

**例 アロー関数で定義する**
```javascript
let printName = name => console.log(`My name is ${name}`);
```

ES6の矢印関数で最も重要なのは、スコープの外側から`this`変数値が保持されるというポイントです。

**例 関数の中で、this キーワードを使う**
```javascript
let dog = {
	name: "Taro",
	printNameAfterTime: function() {
		setTimeout(function(){
			console.log(`My name is ${this.name}`);
		}, 1000);
	}
}
```
上記の例では、`dog.printNameAfterTime()`を実行しても、出力するのは、`My name is undefined` と出力します。
これは、`this.name` が `setTimeout` 関数のスコープに無いからです、けどアロー関数で下記の様に記述すれば、`this.name` が　`setTimeout` 関数でも参照する事ができます。

```javascript
let dog = {
	name: "Taro",
	printNameAfterTime: function() {
		setTimeout(() => {
			console.log(`My name is ${this.name}`);
		}, 1000);
	}
}
```

## REPL
REPLとは、WebブラウザのChromeにあるコンソールウィンドウに似た対話的環境で、どんなJaveScriptコードでも実行できます。
また、アプリケーションの各部テストするために、Node.jsモジュールをrequireすることも可能です。

### REPLでJavaScriptを実行する
REPLを起動するには、コンピュータのターミナルウィンドウで `node` と入力します。
REPLは入力するコマンドに即座に応答するNode.jsアプリケーションだと考えることができます。
つまり、JavaScriptコードを、そのためのファイルに書いてから実行する手間を省いて、そのJavaScriptコードをREPLのウィンドウに直接入力できるのです。

以下の様にREPLに、いくつかの変数を定義してみましょう。
すると、JavaScriptステート面とを実行する度に
REPLは、そおステートメントの戻り値を出力します。
変数に値を代入してものそステートメントの戻り値は未定義です。

```bash
node
```
```javascript
> let x = 42;
undefined
> let sentence = "The meaning of life is ";
undefined
```
では、これらの変数に何らかの演算を実行してみましょう。
```javascript
> sentence + x;
The meaning of life is 42
```
この様に、REPLで変数を連結することが簡単に実行できました。

### アプリケーション開発でREPLを使う
REPLには、もうひとつ、Node.jsアプリケーションのコードに `repl` モジュールをいれて使う有益な使い方があります。
プロジェクトで作成するカスタムモジュールの数が増えてくると、それまでに書いたコードの機能をテストするために、それらのファイルを全てREPLにロードするのが面倒になってきます。
例えば下記のコードで表すように、2つの数をかけ合わせる関数だけを含む`multiply.js`というモジュールを書いたとします。
ところが掛け算を含む機能のテストでは、REPLに`require("./multiply")`と入力して、そのモジュールをロードするだけでなく、それまでに作ったほかのモジュールも全部ロードすることになります。
そればかりか、REPLのセッションを行うたびに、それらのrequire文を、毎回入力する必要があるのです。

```javascript
module.exports = {
	multiply: (x, y) => {
		return x * y;
	}
};
```

個々のREPLセッションで自作のモジュール群を`require`する代わりに、自作のモジュールにREPLを持ち込むことができます。
以下の例では、プロフェクトの中で`repl`モジュールを使う方法を示しています。
プロジェクトディレクトリの中に、`customRepl.js`というファイル名でモジュールを作ります。
その中で、あなたが同時にテストしていモジュールを、すべて`require`します。
そして、このファイルでは`repl`モジュールを`require`してから、REPLサーバーを起動します。
このREPLサーバーは、Node.jsのHTTPサーバーと同じくコンテクストを持っていて、その中にカスタム変数をロードできます。
REPLサーバーを起動した後、ここでは`name`変数と自作の`multiply`モジュールを追加してます。

```javascript
const repl = require("repl");
const replServer = repl.start({
    prompt: "> ",
});
replServer.context.name = "Shigeta";
replServer.context.multiply = require("./multiply").multiply;
```

実行するには、以下のコマンドを実行します。

```bash
node customRepl.js
```

`customRepl.js`で定義した環境で`REPL`セッションで操作できるようになります。

```bash
> multipy(2, 3);
6
> name
'Shigeta'
```

ES6は、いまでは開発コミュニティで広く使われているので、JavaScriptにあける、この最新かつ最大の変化を反映したコードの書き始めることは重要です。REPL と JavaScript の使い方に慣れてしまえば、アプリケーションを素早く開発するのが容易になるはずです。