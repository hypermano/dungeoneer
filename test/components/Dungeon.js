var React = require("react");
var shallow = require("enzyme").shallow;
var expect = require("chai").expect;

var DungeonBuilderContainer = require("../../app/containers/DungeonBuilderContainer");
var Dungeon = require("../../app/components/Dungeon");

describe("<DungeonBuilderContainer/>", () => {
	const wrapper = shallow(<DungeonBuilderContainer/>);
	it("It should have a dungeon", () => {
		var dungeon = wrapper.find(Dungeon);
		console.log(dungeon);
		expect(dungeon).to.have.length(1)
	});
	it("It should have a room class", () => {
		expect(wrapper.find(Dungeon).find(("<DungeonWing/>"))).to.have.length(1)
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