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