var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;

var App = require("../components/App");
var DungeonBuilderContainer = require("../containers/DungeonBuilderContainer");
var DungeonSelectorContainer = require("../containers/DungeonSelectorContainer");
var DungeonCrawlerContainer = require("../containers/DungeonCrawlerContainer");

var routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="/build" component={DungeonBuilderContainer}/>
			<Route path="/select" component={DungeonSelectorContainer}/>
			<Route path="/crawl" component={DungeonCrawlerContainer}/>
		</Route>
	</Router>
	);
 
module.exports = routes;