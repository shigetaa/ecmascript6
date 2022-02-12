//
/*function printName(name) {
	console.log(`My name is ${name}`);
}*/

let printName = name => console.log(`My name is ${name}`);

printName('Shigeta');

//
/*let dog = {
	name: "Taro",
	printNameAfterTime: function () {
		setTimeout(function () {
			console.log(`My name is ${this.name}`);
		}, 1000);
	}
}*/

let dog = {
	name: "Taro",
	printNameAfterTime: function () {
		setTimeout(() => {
			console.log(`My name is ${this.name}`);
		}, 1000);
	}
}
dog.printNameAfterTime();