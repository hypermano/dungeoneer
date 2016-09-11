require('babel-register')();
require('jsdom-global')();

var jsdom = require('jsdom');

var exposedProperties = ['window', 'navigator', 'document'];

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
		exposedProperties.push(property);
		global[property] = document.defaultView[property];
	}
});

global.navigator = {
	userAgent: 'node.js'
};

global.window.localStorage = {
	getItem: function() {}
};