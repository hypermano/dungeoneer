const keyboardjs = require("keyboardjs");

module.exports = function decorateWithKeyBinding(ComposedComponent) {
	class KeybinderEnhancer extends ComposedComponent {
		bindKey(keyCombos, fn) {
			if (!(keyCombos instanceof Array)) {
				keyCombos = [keyCombos];
			}
			this._keyBindings = this._keyBindings || [];
			var handler = e => {
				if (["INPUT", "TEXTAREA"].indexOf(e.target.tagName) >= 0) {
					return;
				}
				fn(e);
			};
			keyboardjs.on(keyCombos, null, handler);
			this._keyBindings.push([keyCombos, handler]);
		}

		componentWillUnmount() {
			if (super.componentWillUnmount) {
				super.componentWillUnmount();
			}

			if (this._keyBindings) {
				this._keyBindings.forEach(binding => {
					keyboardjs.off(binding[0], null, binding[1]);
				});
			}
		}
	}

	Object.keys(ComposedComponent).forEach(key => {
		KeybinderEnhancer[key] = ComposedComponent[key];
	});

	return KeybinderEnhancer;
};