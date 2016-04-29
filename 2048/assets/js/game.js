function Tile(args) {
	args = args ? args : {};
	this.value = args.value || 0
}

Tile.prototype.randomizeTile = function(){
	var random = _.sample([2, 4])
	this.value = random
}

function Game(args) {
	args = args ? args : {};
	this.tiles = args.tiles || [
		[new Tile, new Tile, new Tile, new Tile],
		[new Tile, new Tile, new Tile, new Tile],
		[new Tile, new Tile, new Tile, new Tile],
		[new Tile, new Tile, new Tile, new Tile]
	]
	this.score = 0
}

Game.prototype.reset = function(){
	this.tiles = [
		[new Tile, new Tile, new Tile, new Tile],
		[new Tile, new Tile, new Tile, new Tile],
		[new Tile, new Tile, new Tile, new Tile],
		[new Tile, new Tile, new Tile, new Tile]
	]
	this.score = 0;
}

Game.prototype.start = function(){
	this.reset();
	var indices = [0,1,2,3];

	var rowIndex1 = _.sample(indices);
	var rowIndex2 = _.sample(indices);
	var tileIndex1 = _.sample(indices);
	var	tileIndex2 = _.sample(indices);
	while(tileIndex2 === tileIndex1 && rowIndex1 === rowIndex2){
		rowIndex2 = _.sample(indices);
		tileIndex2 = _.sample(indices);
	}

	this.tiles[rowIndex1][tileIndex1].randomizeTile();
	this.tiles[rowIndex2][tileIndex2].randomizeTile();
}

Game.prototype.toString = function(){
	_.each(this.tiles, function(row){
		console.log(row[0].value + '|' + row[1].value + '|' + row[2].value + '|' + row[3].value);
	})
	console.log('---------------')
}

Game.prototype.zipRight = function(){
	_.each(this.tiles, function(row){
		_.each(row, function(tile, i){
			if(tile.value === 0){
				row.splice(i, 1);
				while(row.length < 4){
					row.unshift(new Tile);
				}
			}
		})
	})
}

Game.prototype.addRight = function(){
	var game = this
	_.each(this.tiles, function(row){
		for(var i = row.length - 1; i >= 0; i --){
			if(i > 0 && row[i].value != 0 && row[i].value === row[i - 1].value){
				var combined = row[i].value + row[i - 1].value;
				game.score += combined;
				row[i].value = combined;
				row[i - 1].value = 0;
				game.zipRight();
			}
		}
	})
}

function zipCloneRight(clone) {
	_.each(clone, function(row){
		_.each(row, function(tile, i){
			if(tile.value === 0){
				row.splice(i, 1);
				while(row.length < 4){
					row.unshift(new Tile);
				}
			}
		})
	})
	_.each(clone, function(row){
		for(var i = row.length - 1; i >= 0; i --){
			if(i > 0 && row[i].value != 0 && row[i].value === row[i - 1].value){
				var combined = row[i].value + row[i - 1].value;
				row[i].value = combined;
				row[i - 1].value = 0;
				_.each(clone, function(row){
					_.each(row, function(tile, i){
						if(tile.value === 0){
							row.splice(i, 1);
							while(row.length < 4){
							row.unshift(new Tile);
							}
						}
					})
				})
			}
		}
	})
	return clone;
}

Game.prototype.canZipRight = function(){
	var tileJson = JSON.stringify(this.tiles)
	var clone = JSON.parse(JSON.stringify(this.tiles));
	zipCloneRight(clone)
	return !(tileJson == JSON.stringify(clone));
}

Game.prototype.canZipLeft = function(){
	var tileJson = JSON.stringify(this.tiles)
	var clone = JSON.parse(JSON.stringify(this.tiles));
	_.each(clone, function(row){
		row.reverse();
	});
	zipCloneRight(clone);
	_.each(clone, function(row){
		row.reverse();
	});
	return !(tileJson == JSON.stringify(clone));
}

Game.prototype.canZipUp = function(){
	var tileJson = JSON.stringify(this.tiles)
	var clone = JSON.parse(JSON.stringify(this.tiles));
	clone = _.zip.apply(_, clone);
	_.each(clone, function(row){
		row.reverse();
	});
	zipCloneRight(clone);
	_.each(clone, function(row){
		row.reverse();
	});
	clone = _.zip.apply(_, clone);
	return !(tileJson == JSON.stringify(clone));
}

Game.prototype.canZipDown = function(){
	var tileJson = JSON.stringify(this.tiles)
	var clone = JSON.parse(JSON.stringify(this.tiles));
	clone = _.zip.apply(_, clone);
	zipCloneRight(clone);
	clone = _.zip.apply(_, clone);
	return !(tileJson == JSON.stringify(clone));
}

Game.prototype.canMove = function(){
	if(this.canZipRight() === true || this.canZipLeft() === true || this.canZipUp() === true || this.canZipDown() === true){
		return true;
	} else {
		return false;
	}
}

Game.prototype.insertRandom = function(){
	var Indices = [0,1,2,3];

	var rowIndex = _.sample(Indices);
	var tileIndex = _.sample(Indices);

	while(this.tiles[rowIndex][tileIndex].value != 0){
		rowIndex = _.sample(Indices);
		tileIndex = _.sample(Indices);
	}
		this.tiles[rowIndex][tileIndex].randomizeTile();
}

Game.prototype.moveRight = function(){
	if(this.canZipRight() === true){
			this.zipRight();
			this.addRight();
			this.insertRandom();
		};
}

Game.prototype.move = function(direction){
	if(direction === 'right'){
		this.moveRight();
		this.toString();
	}
	if(direction === 'left'){
		_.each(this.tiles, function(row){
			row.reverse();
		});
		this.moveRight();
		_.each(this.tiles, function(row){
			row.reverse();
		})
		this.toString();
	}
	if(direction === 'up'){
		this.tiles = _.zip.apply(_, this.tiles)
		_.each(this.tiles, function(row){
			row.reverse();
		});
		this.moveRight();
		_.each(this.tiles, function(row){
			row.reverse();
		});
		this.tiles = _.zip.apply(_, this.tiles)
		this.toString();
	}
	if(direction === 'down'){
		this.tiles = _.zip.apply(_, this.tiles)
		this.moveRight();
		this.tiles = _.zip.apply(_, this.tiles)
		this.toString();
	}
}


Game.prototype.bindDir = function(keys, dir){
	Mousetrap.bind(keys, function(e){
		this.move(dir)
	}.bind(this))
}

Game.prototype.bindAll = function(){
	this.bindDir(['right'], 'right');
	this.bindDir(['left'], 'left');
	this.bindDir(['up'], 'up');
	this.bindDir(['down'], 'down');
}