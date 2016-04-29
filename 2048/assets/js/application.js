$(document).ready(function() {
	var game = new Game
	var controller = new GameController({game: game})
	controller.startNewGame();
	controller.setUpReset();
	controller.setUpCurrentScore();
	
	$(this).keydown(function(e){
		if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
			controller.continueGame();
		}
	});

});
