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

## ロギングとグローバルオブジェクトの使い方
ロギングによって、実行されている関数とミドルウェアがわかり、アプリケーションが出しているエラーを見ることができるので、何が起きているのかを理解できるようになります。

`console`モジュールは、Node.jsのコアモジュールであり、グローバルオブジェクトでもあります。
つまり`console`キーワードは、アプリケーションのどこからでもアクセス出来るものです。
`console.log()`を実行する時文字列テキストとして渡すメッセージは、ターミナルウィンドウに出力するか、ファイルに出力するのが典型的です。
`console`モジュールは、アプリケーションのコードを調べるのに適切なツールを提供しています。

`console`モジュールには、標準(standard)とエラー(error)の2つの出力があります。
どちらの出力も、ターミナルウィンドウにテキストを表示するのですが、ブラウザコンソールに置ける振る舞いが異なります。
`console`で利用出来るロギング関数の一部を下記で紹介します。

**例 ロギング関数**
```javascript
// ログメッセージをコンソールに出力する
console.log("Standard output log message");

// エラー出力を使ってログメッセージを出力する
console.error("Error output log message");

// console.log の別名 (ログメッセージを出力する)
console.info("Standard output log message");

// console.error の別名 (ログメッセージを出力する)
console.warn("Error output log message");
```

Node.js アプリケーションの中で、これら4つの関数は、サーバー上では同様にふるまいます。

これらのロギング関数をクライアントサイドのJavaScriptで使うときは、ブラウザのコンソールウィンドウで、ログメッセージがメッセージの型に対応したフォーマットで出力されます。

たとえば警告のメッセージにはオレンジ色の背景が使われ、エラーメッセージは赤で強調される、と言った具合です。

ほかに、便利に使える関数として、`console.time` と `console.timeEnd` があります。
この2つの関数を併用することによって、コードで処理の開始から終了までにかかった時間をロギングできるのです。
タイマーを利用するには、2つの関数に渡すテキストを一致させる必要があります。
以下の`console_time.js`例では、関数 xyz を1秒かけて実行してからメッセージをロギングします。
この処理でログ出力される時間表示は1秒よりわずかに長くなります。

**例 処理時間をロギングする**
```javascript
// console のタイマーを始動
console.time("function xyz");
(function xyz() {
	setTimeout(function () {
		// この関数の処理の一部として、先にconsole.log のメッセージが出力される
		console.log("print first");
		// タイムアウトの時刻が記録される。
		console.timeEnd("function xyz");
	}, 1000);
})();
```
実行するには、以下のコマンドを実行します。


```bash
node console_time.js
```
```bash
print first
function xyz: 1024.258ms
```

バグを見つけるのに役立つログを残す `console.log` は、Web開発で最良の友の一人になるはずです。

### グローバルオブジェクト
Node.js のグローバルオブジェクトは、どのアプリケーションでも全体でアクセス可能です。
これらのオブジェクトはNode.jsアプリケーションから、いつでも使う事ができます。
これらのオブジェクトに含まれるのは、アプリケーションに関する情報です。
Node.jsアプリケーションで、最もよく使われるグローバルオブジェクトを次に示します。

- `console` は、アプリケーションの実行中に、どこからでもコンソールまたは標準出力に出力できます。
- `__dirname` は、現在のモジュールのディレクトリ名を、マシンにおける絶対パスで、次のように返します。
  ```javascript
  console.log(__dirname);
  ```
  ```bash
  /Users/Shigeta/Desktop
  ```
- `__filename` は、現在のモジュールのファイル名を、マシンにおけるアプリケーションディレクトリへの絶対パスを使って、次のように返します。
  ```javascript
  console.log(__filename);
  ```
  ```bash
  /Users/Shigeta/Desktop/filename.js
  ```
- `process` は、アプリケーションを実行しているプロセス(スレッド)を参照します。
 このオブジェクトを主なソースとして、アプリケーションのリソース及びファイルシステムへの接続が行われます。

 Node.js のグローバルオブジェクトと同じに見えて、実はプロジェクトで`require`したライブラリから入ってくるオブジェクトもあります。
 下記の「モジュールスコープ」オブジェクトも、ほとんどのNode.jsアプリケーションで利用できます。
 これらのオブジェクトの使い方を学べばユースケースが明らかになるでしょう。

 - `module` は、今使っている「現在のモジュール」(JavaScriptファイル)を参照します。
  これによって、そのファイルにある他の変数をアクセスできます。
- `exports` は、キーと値のペアによるオブジェクトを参照します。
  これは、他のモジュールと共有出来るように、モジュールの関数やオブジェクトを格納する機構です。
  このオブジェクトの使い方は`、module.exports` の使い方と、ほとんどおなじです。
  次の例にある `accessibleFunction` は他のモジュールで使えるようにエクスポートされます。
  ```javascript
  exports.accessibleFunction = () => {
	  console.log("hello!");
  }
  ```
- `require` は、他のモジュールのコードを現在のモジュールにインポートするので、いま使っているファイルの外で書かれたコードをアクセス出来ます。
  `require` キーワードは、次のように使います。
  ```javascript
  const http = require("http");
  ```
