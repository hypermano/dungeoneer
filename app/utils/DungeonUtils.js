var DungeonBlock = require("../data/DungeonBlock").DungeonBlock;

module.exports = {
	/**
	* @param {DungeonBlockType[][]} master
	*/
	schematicsToDungeonRooms: (master) => {
		var floors = master.map((schematics, yIndex) => {
			return schematics.map((schematic, xIndex) => {
				var hasHorizontalWall = (mod) => 
					!schematics[xIndex + mod] || 
					schematics[xIndex + mod].name != schematic.name;
				var hasVerticalWall = (mod) =>
					!master[yIndex + mod] ||
					!master[yIndex + mod][xIndex] ||
					master[yIndex + mod][xIndex].name != schematic.name;

				return new DungeonBlock(
					schematic,
					hasHorizontalWall(-1),
					hasHorizontalWall(1),
					hasVerticalWall(-1),
					hasVerticalWall(1)
				);
			});
		});

		return floors;
	},

	/**
	* @param {DungeonBlockType[][]} master)
	*/
	getConnectedRooms: (master) => {
		// create a blank matrix
		var [x,y] = [0,0];
		var res = master.map((floor) => floor.map(() => 0));
		// create a group enumerator
		var groupNumber = 1;
		var groupMaker = () => {
			return {
				v: groupNumber++
			};
		};

		// go through the original plan
		while (master[y] && master[y][x]) {
			var cur = 0;
			// if there's access from the top, mark as same group
			if (master[y-1] && master[y][x].type.name == master[y-1][x].type.name) {
				cur = res[y-1][x]; // top neighbour
			}
			// if there's access from the right
			if (master[y][x-1] && master[y][x-1].type.name == master[y][x].type.name) {
				// if we're already in a group, update the right part to belong
				if (cur) {
					res[y][x-1].v = cur.v;
				}
				// otherwise just join the group
				else {
					cur = res[y][x-1];
				}

			}
			
			//                 when nothing's connected, create a new group
			res[y][x] = cur || groupMaker();

			// keep iterating
			x += 1;
			if (!master[y][x]) {
				x = 0;
				y += 1;
			}
		}

		return res.map((floor) => floor.map((x) => x.v));
	}
};