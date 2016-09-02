var roomStyle = {
	"display": "inline-block",
	"height": "50px",
	"width": "50px",
};

var styles = {
	rightExtraSpace: {
		"paddingRight": "1em"
	},
	room: {
		...roomStyle,
		"backgroundColor": "blue",
		"border": "3px solid blue"
	},
	emptyRoom: {
		...roomStyle,
		"border": "3px solid white"
	},
	brickWallBorder: "3px solid black"
};

module.exports = styles; 