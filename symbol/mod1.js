function A() {
	this.foo = 'hello';
}

if (!window._foo) {
	window._foo = new A();
	console.log('window._foo', window._foo)
}


export default {
	mod1: window._foo
}