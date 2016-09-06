var AppDispatcher = require("../dispatcher/AppDispatcher");
var EmittingStore = require("./EmittingStore");
var DungeonConstants = require("../constants/DungeonConstants");

var _position = {
	x: 0,
	y: 0
};

function updateCoordinates(x, y) {
	_position.x = x;
	_position.y = y;
}

class XYStore extends EmittingStore {
	constructor() {
		super();
	}

	getX() {
		return _position.x;
	}
	getY() {
		return _position.y;
	}
}

var xyStore = new XYStore();

AppDispatcher.register(function(payload) {
	if (payload.source == DungeonConstants.SourceTypes.VIEW_ACTION) {
		var action = payload.action;

		switch (action.actionType) {
		case DungeonConstants.ActionTypes.UPDATE_COORDINATES:
			updateCoordinates(action.x, action.y);
			break;
		default:
			return false;
		}

		xyStore.emitChange();

		return true;
	}

	return false;
});

module.exports = xyStore;