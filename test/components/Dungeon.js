var React = require("react");
var shallow = require("enzyme").shallow;
var expect = require("chai").expect;

var Dungeon = require("../../app/components/Dungeon");

describe("<Dungeon/>", () => {
	it("should have props for email and src", () => {
		const wrapper = shallow(<Dungeon/>);
		console.log("[" + email + "]");
		expect(wrapper.props().src).to.not.be.undefined;
	});
});

describe("Isolation test", () => {
	it("should exist", () => {
		expect(document).to.not.be.undefined;
	});
});

describe("foo", () => {
	it("should equal bar", () => {
		expect(foo).to.equal("bar");
		expect(foo).to.not.equal("baz");
	});
});