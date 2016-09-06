var React = require("react");
var Link = require("react-router").Link;
var KeyBinder = require("../decorators/KeyBinder");

var _options = ["crawl", "build", "select"];

@KeyBinder
class App extends React.Component {
	state = {
		options: _options,
		extra: ""
	};

	constructor() {
		super();
		this._onExtraChange = this._onExtraChange.bind(this);
	}

	_onExtraChange(extra, isUpdate) {
		var value = (isUpdate)? extra : JSON.stringify(extra);
		this.setState({
			extra: value
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

	render() {
		var left = this.state.options[0];
		var right = this.state.options[2];

		var main = React.cloneElement(this.props.main, {
			onExtraChange: this._onExtraChange
		});
		var rest;
		if (this.props.rest) {
			rest = React.cloneElement(this.props.rest, {
				extra: this.state.extra,
				onExtraChange: this._onExtraChange
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