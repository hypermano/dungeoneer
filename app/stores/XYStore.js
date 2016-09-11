var AppDispatcher = require("../dispatcher/AppDispatcher");
var EmittingStore = require("./EmittingStore");
var DungeonConstants = require("../constants/DungeonConstants");

var _avatarPosition = {
	x: 0,
	y: 0
};
var _clickPosition = {
	x: null,
	y: null
};

function updateAvatarCoordinates(x, y) {
	_avatarPosition.x = x;
	_avatarPosition.y = y;
}

class XYStore extends EmittingStore {
	constructor() {
		super();
	}

	getAvatarX() {
		return _avatarPosition.x;
	}
	getAvatarY() {
		return _avatarPosition.y;
	}
	getClickX() {
		return _clickPosition.x;
	}
	getClickY() {
		return _clickPosition.y;
	}
}

var xyStore = new XYStore();

AppDispatcher.register(function(payload) {
	if (payload.source == DungeonConstants.SourceTypes.VIEW_ACTION) {
		var action = payload.action;

		switch (action.actionType) {
		case DungeonConstants.ActionTypes.UPDATE_AVATAR_COORDINATES:
			updateAvatarCoordinates(action.x, action.y);
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