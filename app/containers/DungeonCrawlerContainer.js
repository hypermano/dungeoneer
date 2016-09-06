var React = require("react");
var Dungeon = require("../components/Dungeon");
var DungeonStore = require("../stores/DungeonStore");
var XYStore = require("../stores/XYStore");
var XYActions = require("../actions/XYActions");
var DungeonUtils = require("../utils/DungeonUtils");
var KeyBinder = require("../decorators/KeyBinder");

function getPosition() {
	return {
		x: XYStore.getX(),
		y: XYStore.getY()
	};
}

@KeyBinder
class DungeonCrawlerContainer extends React.Component {

	constructor() {
		super();
		this._onChange = this._onChange.bind(this);
	}

	state = {
		position: getPosition()
	};

	_onChange() {
		this.setState({
			position: getPosition()
		});
	}

	_handleAvatarMove(event) {
		var yMod = 0, xMod = 0;
		switch(event.key) {
		case "ArrowDown":
			yMod = 1; break;
		case "ArrowUp":
			yMod = -1; break;
		case "ArrowRight":
			xMod = 1; break;
		case "ArrowLeft":
			xMod = -1; break;
		}

		XYActions.updateCoordinates(this.state.position.x + xMod, this.state.position.y + yMod);
	}

	componentDidMount() {
		XYStore.addChangeListener(this._onChange);
		this.bindKey(["left", "right", "up", "down"], this._handleAvatarMove.bind(this));
	}

	componentWillUnmount() {
		XYStore.removeChangeListener(this._onChange);
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