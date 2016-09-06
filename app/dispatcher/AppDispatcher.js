var Dispatcher = require("flux").Dispatcher;
var SourceTypes  = require("../constants/DungeonConstants").SourceTypes;

var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action) {
	this.dispatch({
		source: SourceTypes.VIEW_ACTION,
		action: action
	});
};

module.exports = AppDispatcher;