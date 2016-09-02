var React = require("react");
var Dungeon = require("../components/Dungeon");
var DungeonStore = require("../stores/DungeonStore");
var DungeonUtils = require("../utils/DungeonUtils");

var _position = {
	x: 0,
	y: 0
};

var DungeonContainer = React.createClass({	
	getInitialState: function() {
		return {			
			position: _position
		};
	},
	handleAvatarMove: function(event) {
		switch(event.key) {
		case "ArrowDown":
			_position.y += 1; break;
		case "ArrowUp":
			_position.y -= 1; break;
		case "ArrowRight":
			_position.x += 1; break;
		case "ArrowLeft":
			_position.x -= 1; break;
		}

		this.setState({
			position: _position
		});
	},
	render: function() {
		return (
			<Dungeon 
				plan={DungeonUtils.schematicsToDungeonRooms(DungeonStore.get())}
				avatarPosition={this.state.position}
				onKeyDown={this.handleAvatarMove}
			/>
		);
	}
});

module.exports = DungeonContainer;