var React = require("react");

var Main = React.createClass({
	propTypes: {
		children: React.PropTypes.any
	},
	render: function() {
		return (
			<div>
				<div className="jumbotron col-sm-12 text-center">
					<h1>The Dungeoneer</h1>
				</div>
				<div>
					{this.props.children}
				</div>
			</div>
			);
	}
});

module.exports = Main;