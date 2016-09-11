var React = require("react");
var Dungeon = require("../components/Dungeon");
var FuncUtils = require("../utils/FuncUtils");
var DungeonStore = require("../stores/DungeonStore");

class DungeonSelectorContainer  extends React.Component {
	state = {
		selections: this._selections
	};

	constructor() {
		super();
		this._selections = {};
	}

	_handleRoomSelection(ctx) {
		var pos = ctx.pos;
		var {x,y} = pos;
		var rooms = DungeonStore.getConnectedRooms();
		this._selections = rooms.map((floor) => floor.map((room) => room == rooms[y][x]));
		this.setState({
			selections: this._selections
		});
	}

	render() {
		return (
			<Dungeon 
				plan={this.props.plan}
				selections={this.state.selections}
				onRoomClick={FuncUtils.compound(this._handleRoomSelection.bind(this), this.props.onComponentChange)}
			/>
		);
	}
}

DungeonSelectorContainer.propTypes = {
	onComponentChange: React.PropTypes.func,
	plan: React.PropTypes.arrayOf(
		React.PropTypes.arrayOf(
			React.PropTypes.object
			)
		)
};

module.exports = DungeonSelectorContainer;