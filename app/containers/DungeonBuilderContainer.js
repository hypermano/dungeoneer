var React = require("react");
var Dungeon = require("../components/Dungeon");
var DungeonActions = require("../actions/DungeonActions");
var KeyBinder = require("../decorators/KeyBinder");
var DungeonBlock = require("../data/DungeonBlock").DungeonBlock;

@KeyBinder
class DungeonBuilderContainer extends React.Component {

	state = {
		selections: this._selections
	};

	constructor() {
		super();
		this._selections = [];
	}

	componentDidMount() {
		this.bindKey(["space", "1", "2", "3", "4", "5"], this.handleDungeonReshape.bind(this));
	}

	_handleRoomSelection({pos}) {
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
				plan={this.props.plan}
				selections={this.state.selections}
				onRoomClick={this._handleRoomSelection.bind(this)}
			/>
		);
	}
}

DungeonBuilderContainer.propTypes = {
	plan: React.PropTypes.arrayOf(
		React.PropTypes.arrayOf(
			React.PropTypes.instanceOf(
				DungeonBlock
				)
			)
		)
};

module.exports = DungeonBuilderContainer;