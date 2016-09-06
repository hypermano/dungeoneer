var React = require("react");
var Dungeon = require("../components/Dungeon");
var DungeonStore = require("../stores/DungeonStore");
var DungeonActions = require("../actions/DungeonActions");
var DungeonUtils = require("../utils/DungeonUtils");
var KeyBinder = require("../decorators/KeyBinder");

function getDungeonState() {
	return DungeonUtils.schematicsToDungeonRooms(DungeonStore.get());
}

@KeyBinder
class DungeonBuilderContainer extends React.Component {

	state = {
		plan: getDungeonState(),
		selections: this._selections
	};

	constructor() {
		super();
		this._selections = {};
		this._onChange = this._onChange.bind(this);
	}

	_onChange() {
		this.setState({
			plan: getDungeonState()
		});
	}

	componentDidMount() {
		DungeonStore.addChangeListener(this._onChange);
		this.bindKey(["space", "1", "2", "3", "4", "5"], this.handleDungeonReshape.bind(this));
	}

	componentWillUnmount() {
		DungeonStore.removeChangeListener(this._onChange);
	}

	_handleRoomSelection(pos) {
		var {x,y} = pos;
		if (!this._selections[y]) {
			this._selections[y] = {};
		}
		if (this._selections[y][x]) {
			delete this._selections[y][x];
		} else {
			this._selections[y][x] = true;
		}
		if (Object.keys(this._selections[y]).length === 0) {
			delete this._selections[y];
		}
		this.setState({
			selections: this._selections
		});
	}

	handleDungeonReshape(event) {
		this._selections = {};
		DungeonActions.updateDungeon(this.state.selections, event.key);
		this.setState({
			selections: this._selections
		});
	}

	render() {
		return (
			<Dungeon 
				plan={this.state.plan}
				selections={this.state.selections}
				onRoomClick={this._handleRoomSelection.bind(this)}
			/>
		);
	}
}

module.exports = DungeonBuilderContainer;