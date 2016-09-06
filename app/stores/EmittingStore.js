var EventEmitter = require("events").EventEmitter;

const CHANGE_EVENT = "change";

class EmittingStore extends EventEmitter {
	emitChange () {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
}

module.exports = EmittingStore;