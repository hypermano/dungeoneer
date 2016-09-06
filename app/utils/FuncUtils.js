module.exports = {
	compound: (...functions) => {
		return (...args) => {
			for (var i in functions) {
				if (functions[i]) {
					functions[i](...args);
				}
			}
		};
	}
};