var React = require("react");
var styles = require("../styles/styles");
var DungeonBlock = require("../data/DungeonBlock").DungeonBlock;
var FuncUtils = require("../utils/FuncUtils");
require("../styles/styles.scss");

/**
*/
var DungeonRoom = (props) => {
	var createRoomStyles = function(room) {
		var res = {};
		if (!room.isEmpty) {
			var borders = {
				"borderLeft": (room) => room.hasLeftWall,
				"borderRight": (room) => room.hasRightWall,
				"borderTop": (room) => room.hasTopWall,
				"borderBottom": (room) => room.hasBottomWall
			};

			for (var b in borders) {
				if (borders[b](room)) {
					res[b] = styles.brickWallBorder;
				}
			}

			if (room.type.color) {
				res["backgroundColor"] = room.type.color;
			}
		}

		return res;
	};

	var optionalAvatar;
	if (props.hasAvatar) {
		optionalAvatar = <div className="character--avatar"/>;
	}

	var roomStyles = createRoomStyles(props.room);
	if (props.isSelected) {
		roomStyles.backgroundColor = "gold";
	}
	var className = !props.room.isEmpty? "dungeon--room__normal" : "dungeon--room__empty";
	var handleMouseDrag = (e) => {
		if (e.buttons == 1) {
			props.onRoomClick();
		}
	};

	return (
		<div 
			className={className}
			style={roomStyles} 
			onClick={props.onRoomClick}
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
var DungeonFloor = (props) => {
	var rendered = props.rooms.map((room, index) => {
		var pos = {
			x: index,
			y: props.level
		};
		var extraProps = {};
		if (props.avatarPosition && props.avatarPosition.x == index) {
			extraProps.hasAvatar = true;
		}
		return <DungeonRoom 					
					key={"dr-" + index}
					room={room}
					isSelected={props.selections && props.selections[index]}
					onRoomClick={FuncUtils.compound(props.onRoomClick, props.onExtraChange).bind(null, pos, false)}
					{...extraProps}
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
	onExtraChange: React.PropTypes.func,
	rooms: React.PropTypes.arrayOf(
		React.PropTypes.instanceOf(
			DungeonBlock
			)
		).isRequired
};

/**
*/
var DungeonWing = (props) => {
	var floors = props.plan.map(function(floor, yIndex) {
		var {selections, avatarPosition, ...rest} = props;
		if (avatarPosition && avatarPosition.y == yIndex) {
			rest.avatarPosition = props.avatarPosition;
		}
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
	onRoomClick: React.PropTypes.func,
	avatarPosition: React.PropTypes.object
};

/**
*/
var Dungeon = function(props) {
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