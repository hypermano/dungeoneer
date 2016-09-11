var React = require("react");
var styles = require("../styles/styles");
var DungeonBlock = require("../data/DungeonBlock").DungeonBlock;
require("../styles/styles.scss");

var NOOP = function() {};

/**
*/
const DungeonRoom = ({room, hasAvatar, isSelected, onRoomClick}) => {
	var createRoomStyles = function(target) {
		var res = {};
		if (!target.isEmpty) {
			var borders = {
				"borderLeft": (room) => room.hasLeftWall,
				"borderRight": (room) => room.hasRightWall,
				"borderTop": (room) => room.hasTopWall,
				"borderBottom": (room) => room.hasBottomWall
			};

			for (var b in borders) {
				if (borders[b](target)) {
					res[b] = styles.brickWallBorder;
				}
			}

			if (target.type.color) {
				res["backgroundColor"] = target.type.color;
			}
		}

		return res;
	};

	var optionalAvatar;
	if (hasAvatar) {
		optionalAvatar = <div className="character--avatar"/>;
	}

	var roomStyles = createRoomStyles(room);
	if (isSelected) {
		roomStyles.backgroundColor = "gold";
	}
	var className = !room.isEmpty? "dungeon--room__normal" : "dungeon--room__empty";
	var handleMouseDrag = (e) => {
		if (e.buttons == 1) {
			onRoomClick();
		}
	};

	return (
		<div 
			className={className}
			style={roomStyles} 
			onClick={onRoomClick}
			onMouseOver={handleMouseDrag}		
		>
			{optionalAvatar}
		</div>
	);
};

DungeonRoom.propTypes = {
	isSelected: React.PropTypes.bool,
	hasAvatar: React.PropTypes.bool,
	onRoomClick: React.PropTypes.func,
	room: React.PropTypes.instanceOf(
		DungeonBlock
	)
};

/**
*/
var DungeonFloor = ({rooms, level, selections, avatarPosition, onRoomClick, ...rest}) => {
	var rendered = rooms.map((room, index) => {
		var ctx = {
			source: "click",
			pos: {
				x: index,
				y: level
			},
			room: room
		};
		var hasAvatar = (avatarPosition && avatarPosition.y == level && avatarPosition.x == index);
		return <DungeonRoom
					key={"dr-" + index}
					room={room}
					isSelected={selections && selections[index]}
					onRoomClick={(onRoomClick || NOOP).bind(null, ctx)}
					hasAvatar={hasAvatar}
					{...rest}
				/>;
	});
	
	return (
		<div style={{"height":"52px"}}>
			{rendered}
		</div>
	);
};

DungeonFloor.propTypes = {
	level: React.PropTypes.number.isRequired,
	selections: React.PropTypes.array,
	onRoomClick: React.PropTypes.func,
	avatarPosition: React.PropTypes.object,
	rooms: React.PropTypes.arrayOf(
		React.PropTypes.instanceOf(
			DungeonBlock
			)
		).isRequired
};

/**
*/
const DungeonWing = ({plan, selections, ...rest}) => {
	var floors = plan.map(function(floor, yIndex) {
		return <DungeonFloor
					key={"dw-" + yIndex} 
					level={yIndex} 
					rooms={floor}
					selections={selections? selections[yIndex] : []}
					{...rest}
				/>;
	});

	return (
		<div>
			{floors}
		</div>
	);
};

DungeonWing.propTypes = {
	plan: React.PropTypes.arrayOf(
		React.PropTypes.arrayOf(
			React.PropTypes.instanceOf(
				DungeonBlock
				)
			)
		).isRequired,
	selections: React.PropTypes.array,
	onRoomClick: React.PropTypes.func
};

/**
*/
const Dungeon = function(props) {
	return (
		<div>
			<h1>Dungeon</h1>
			<DungeonWing {...props} />
		</div>
	);
};

Dungeon.propTypes = {
	selections: React.PropTypes.array
};

module.exports = Dungeon;