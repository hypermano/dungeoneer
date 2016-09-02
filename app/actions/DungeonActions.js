var AppDispatcher = require("../dispatcher/AppDispatcher");
var DungeonConstants = require("../constants/DungeonConstants");

var ActionTypes = DungeonConstants.ActionTypes;

var DungeonActions = {
	updateDungeon: function(selections, type) {
		AppDispatcher.handleViewAction({
			actionType: ActionTypes.SCHEMATICS_UPDATE,
			selections: selections,
			roomType: type
		});
	}
};

module.exports = DungeonActions;