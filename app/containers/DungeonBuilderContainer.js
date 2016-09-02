var React = require("react");
var Dungeon = require("../components/Dungeon");
var DungeonStore = require("../stores/DungeonStore");
var DungeonActions = require("../actions/DungeonActions");
var DungeonUtils = require("../utils/DungeonUtils");

var _selections = {};

function getDungeonState() {
	return DungeonUtils.schematicsToDungeonRooms(DungeonStore.get());
}

var DungeonBuilderContainer = React.createClass({
	_onChange: function() {
		this.setState({
			plan: getDungeonState()
		});
	},
	getInitialState: function() {
		return {
			plan: getDungeonState(),
			selections: _selections
		};
	},
	componentDidMount() {
		DungeonStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		DungeonStore.removeChangeListener(this._onChange);
	},
	handleRoomSelection: function(x, y) {
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
	},
	handleDungeonReshape: function(event) {
		_selections = {};
		DungeonActions.updateDungeon(this.state.selections, event.key);
		this.setState({
			selections: _selections
		});
	},
	render: function() {
		return (
			<Dungeon 
				plan={this.state.plan}
				selections={this.state.selections}
				onRoomClick={this.handleRoomSelection}
				onKeyDown={this.handleDungeonReshape}
			/>
		);
	}
});

module.exports = DungeonBuilderContainer;