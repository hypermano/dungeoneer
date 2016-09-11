var keyMirror = require("keymirror");

var _CONSTANTS = keyMirror({
	EMPTY_ROOM: null
});

class DungeonBlockType {
	constructor(name, color) {
		this.name = name;
		this.color = color;
	}

	static get EMPTY() {
		return _EMPTY_ROOM; }
}

var _EMPTY_ROOM = new DungeonBlockType(_CONSTANTS.EMPTY_ROOM);

class DungeonBlock {

	constructor(type, hasLeftWall, hasRightWall, hasTopWall, hasBottomWall,description) {
		this.type = type;
		this.hasLeftWall = hasLeftWall;
		this.hasRightWall = hasRightWall;
		this.hasTopWall = hasTopWall;
		this.hasBottomWall = hasBottomWall;
		this.description = description || "move along, nothing to see here";
	}

	get isEmpty() {
		return this.type.name == _CONSTANTS.EMPTY_ROOM;
	}

}

module.exports = {
	DungeonBlockType: DungeonBlockType,
	DungeonBlock: DungeonBlock
};
