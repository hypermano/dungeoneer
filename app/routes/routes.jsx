var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRedirect = ReactRouter.IndexRedirect;
var hashHistory = ReactRouter.hashHistory;

var App = require("../components/App");
var DungeonBuilderContainer = require("../containers/DungeonBuilderContainer");
var DungeonSelectorContainer = require("../containers/DungeonSelectorContainer");
var DungeonCrawlerContainer = require("../containers/DungeonCrawlerContainer");
var TextArea = require("../components/TextEditor");

var routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRedirect to="/build" />
			<Route path="/build" components={{main: DungeonBuilderContainer}}/>
			<Route path="/select" components={{main: DungeonSelectorContainer, rest: TextArea}}/>
			<Route path="/crawl" components={{main: DungeonCrawlerContainer}}/>
		</Route>
	</Router>
	);
 
module.exports = routes;