var keyMirror = require("keymirror");

module.exports = {
	SourceTypes: keyMirror({
		VIEW_ACTION: null
	}),
	ActionTypes: keyMirror({
		SCHEMATICS_UPDATE: null,
		ROOM_DESCRIPTION_CHANGE: null,
		UPDATE_AVATAR_COORDINATES: null
	})
};