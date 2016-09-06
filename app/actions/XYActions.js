var AppDispatcher = require("../dispatcher/AppDispatcher");
var DungeonConstants = require("../constants/DungeonConstants");

var ActionTypes = DungeonConstants.ActionTypes;

var XYActions = {
	updateCoordinates: function(x, y) {
		AppDispatcher.handleViewAction({
			actionType: ActionTypes.UPDATE_COORDINATES,
			x: x,
			y: y
		});
	}
};

module.exports = XYActions;