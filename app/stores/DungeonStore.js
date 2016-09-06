var AppDispatcher = require("../dispatcher/AppDispatcher");
var DungeonBlockType = require("../data/DungeonBlock").DungeonBlockType;
var EmittingStore = require("./EmittingStore");
var DungeonConstants = require("../constants/DungeonConstants");

var __ = DungeonBlockType.EMPTY;
var $$ = new DungeonBlockType("normal1", "blue");
var ROOM_TYPES = {
	1: $$,
	2: new DungeonBlockType("normal2", "blue"),
	3: new DungeonBlockType("normal3", "blue"),
	4: new DungeonBlockType("normal4", "blue"),
	5: new DungeonBlockType("normal5", "blue")
};
	
var _storage = window.localStorage.getItem("schematics");	
var _schematics = (_storage && JSON.parse(_storage)) ||
[
	[$$,$$,$$,$$,$$],
	[$$,$$,$$,$$,$$],
	[$$,$$,$$,$$,$$],
	[$$,$$,$$,$$,$$],
	[$$,$$,$$,$$,$$]
];

var acceptedValues = new Set();
[1,2,3,4,5].forEach((v)=>acceptedValues.add(v));
function updateDungeon(selections, type) {
	if (acceptedValues.has(+type)) {
		type = ROOM_TYPES[type];
	} else {
		type = __;
	}

	for (var x in selections) {
		for (var y in selections[x]) {
			_schematics[x][y] = type;
		}
	}

	window.localStorage.setItem("schematics", JSON.stringify(_schematics));
}

class DungeonStore extends EmittingStore {
	get() {
		return _schematics;
	}
}

var dungeonStore = new DungeonStore();

AppDispatcher.register(function(payload) {
	if (payload.source == DungeonConstants.SourceTypes.VIEW_ACTION) {
		var action = payload.action;

		switch (action.actionType) {
		case DungeonConstants.ActionTypes.SCHEMATICS_UPDATE:
			updateDungeon(action.selections, action.roomType);
			break;
		default:
			return false;

		}

		dungeonStore.emitChange();

		return true;
	}

	return false;
});

module.exports = dungeonStore;