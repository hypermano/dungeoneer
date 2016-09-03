var React = require("react");
var Dungeon = require("../components/Dungeon");
var DungeonStore = require("../stores/DungeonStore");
var DungeonUtils = require("../utils/DungeonUtils");

var _selections = {};
var _plan;

class DungeonSelectorContainer  extends React.Component {
	state = {
		selections: _selections
	};

	componentWillMount() {
		_plan = DungeonUtils.schematicsToDungeonRooms(DungeonStore.get());
	}

	_handleRoomSelection(y, x) {
		var rooms = DungeonUtils.getConnectedRooms(_plan);
		_selections = rooms.map((floor) => floor.map((room) => room == rooms[y][x]));
		// convert to object
		_selections = _selections.reduce((obj, cur, i) => {
			obj[i] = cur;
			return obj;
		}, {});

		this.setState({
			selections: _selections
		});
	}

	render() {
		return (
			<Dungeon 
				plan={_plan}
				selections={this.state.selections}
				onRoomClick={this._handleRoomSelection.bind(this)}
			/>
		);
	}
}

module.exports = DungeonSelectorContainer;