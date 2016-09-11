var React = require("react");
var Link = require("react-router").Link;
var KeyBinder = require("../decorators/KeyBinder");
var DungeonActions = require("../actions/DungeonActions");
var DungeonStore = require("../stores/DungeonStore");

var _options = ["crawl", "build", "select"];

function getDungeonState() {
	return DungeonStore.get();
}

@KeyBinder
class App extends React.Component {
	state = {
		options: _options,
		extra: "",
		plan: getDungeonState()
	};

	constructor() {
		super();
		this._onChildComponentChange = this._onChildComponentChange.bind(this);
		this._onChange = this._onChange.bind(this);

		this._lastPos = {};
	}

	_onChange() {
		this.setState({
			plan: getDungeonState()
		});
	}

	_onChildComponentChange(ctx) {
		var newExtra;
		switch (ctx.source) {
		case "text":
			newExtra = ctx.text;
			DungeonActions.updateRoomDescription(this._lastPos.x, this._lastPos.y, newExtra);
			break;
		case "click":
			this._lastPos = {
				x: ctx.pos.x,
				y: ctx.pos.y
			};
			newExtra = ctx.room.description;
			break;
		}
		this.setState({
			extra: newExtra
		});
	}

	_applyRouteChange(direction) {
		if (direction < 0) {
			_options.unshift(_options[2]);
			_options = _options.slice(0,3);
		} else {
			_options.push(_options[0]);
			_options = _options.slice(1,4);
		}
		this.setState({
			options: _options
		});
	}

	componentDidMount() {
		DungeonStore.addChangeListener(this._onChange);
		this.bindKey(["ctrl+left"], () => {
			this.context.router.push({
				pathname: "/" + this.state.options[0]
			});
			this._applyRouteChange(-1);
		});
		this.bindKey(["ctrl+right"], () => {
			this.context.router.push({
				pathname: "/" + this.state.options[2]
			});
			this._applyRouteChange(1);
		});
	}

	componentWillUnmount() {
		DungeonStore.removeChangeListener(this._onChange);
	}

	render() {
		var left = this.state.options[0];
		var right = this.state.options[2];

		var main = React.cloneElement(this.props.main, {
			onComponentChange: this._onChildComponentChange,
			plan: this.state.plan
		});
		var rest;
		if (this.props.rest) {
			rest = React.cloneElement(this.props.rest, {
				extra: this.state.extra,
				onComponentChange: this._onChildComponentChange
			});
		}

		return (
			<div>
				<div className="jumbotron col-sm-12 text-center">
					<h1>The Dungeoneer!</h1>
				</div>
				<div className="navigation">
					<Link to={"/" + left} className="navigation--button__left" onClick={this._applyRouteChange.bind(this, -1)}>
						<button className="btn">{left}</button>
					</Link>
					<Link to={"/" + right} className="navigation--button__right" onClick={this._applyRouteChange.bind(this, 1)}>
						<button className="btn">{right}</button>
					</Link>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-6">{main}</div>
						<div className="col-md-6">{rest}</div>
					</div>
				</div>
			</div>
			);
	}
}

App.propTypes = {
	children: React.PropTypes.any,
	main: React.PropTypes.any,
	rest: React.PropTypes.any,
};

App.contextTypes = {
	router: React.PropTypes.object.isRequired
};

module.exports = App;