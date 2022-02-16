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