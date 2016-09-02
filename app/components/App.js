var React = require("react");
var Link = require("react-router").Link;

var _options = ["crawl", "build", "select"];

var Main = React.createClass({
	propTypes: {
		children: React.PropTypes.any
	},
	getInitialState: function() {
		return {
			options: _options
		};
	},
	applyRouteChange: function(direction) {
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
	},
	render: function() {
		var left = this.state.options[0];
		var right = this.state.options[2];
		return (
			<div>
				<div className="jumbotron col-sm-12 text-center">
					<h1>The Dungeoneer!</h1>
				</div>
				<div style={{position:"relative"}}>
					<Link to={"/" + left} style={{position: "absolute", left:0}} onClick={this.applyRouteChange.bind(this, -1)}>
						<button className="btn">{left}</button>
					</Link>
					<Link to={"/" + right} style={{position: "absolute", right:0}} onClick={this.applyRouteChange.bind(this, 1)}>
						<button className="btn">{right}</button>
					</Link>
				</div>
				<div>
					{this.props.children}
				</div>
			</div>
			);
	}
});

module.exports = Main;