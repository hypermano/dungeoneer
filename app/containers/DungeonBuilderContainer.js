var React = require("react");
var Dungeon = require("../components/Dungeon");
var DungeonStore = require("../stores/DungeonStore");
var DungeonActions = require("../actions/DungeonActions");
var DungeonUtils = require("../utils/DungeonUtils");
var KeyBinder = require("../decorators/KeyBinder");

var _selections = {};

function getDungeonState() {
	return DungeonUtils.schematicsToDungeonRooms(DungeonStore.get());
}

@KeyBinder
class DungeonBuilderContainer extends React.Component {
	_onChange() {
		this.setState({
			plan: getDungeonState()
		});
	}

	state = {
		plan: getDungeonState(),
		selections: _selections
	};

	componentDidMount() {
		DungeonStore.addChangeListener(this._onChange.bind(this));
		this.bindKey(["space", "1", "2", "3", "4", "5"], this.handleDungeonReshape.bind(this));
	}

	componentWillUnmount() {
		DungeonStore.removeChangeListener(this._onChange.bind(this));
	}

	handleRoomSelection(x, y) {
		if (!_selections[x]) {
			_selections[x] = {};
		}
		if (_selections[x][y]) {
			delete _selections[x][y];
		} else {
			_selections[x][y] = true;
		}
		if (Object.keys(_selections[x]).length === 0) {
			delete _selections[x];
		}
		this.setState({
			selections: _selections
		});
	}

	handleDungeonReshape(event) {
		_selections = {};
		DungeonActions.updateDungeon(this.state.selections, event.key);
		this.setState({
			selections: _selections
		});
	}

	render() {
		return (
			<Dungeon 
				plan={this.state.plan}
				selections={this.state.selections}
				onRoomClick={this.handleRoomSelection.bind(this)}
			/>
		);
	}
}

module.exports = DungeonBuilderContainer;