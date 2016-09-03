var React = require("react");
var Dungeon = require("../components/Dungeon");
var DungeonStore = require("../stores/DungeonStore");
var DungeonUtils = require("../utils/DungeonUtils");
var KeyBinder = require("../decorators/KeyBinder");

var _position = {
	x: 0,
	y: 0
};

@KeyBinder
class DungeonCrawlerContainer extends React.Component {

	state = {
		position: _position
	};

	_handleAvatarMove(event) {
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
	}

	componentDidMount() {
		this.bindKey(["left", "right", "up", "down"], this._handleAvatarMove.bind(this));
	}

	render() {
		return (
			<Dungeon 
				plan={DungeonUtils.schematicsToDungeonRooms(DungeonStore.get())}
				avatarPosition={this.state.position}
			/>
		);
	}
}

module.exports = DungeonCrawlerContainer;