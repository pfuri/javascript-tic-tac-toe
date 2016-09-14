// The tic-tac-toe game state prototype
// if first isn't provided, first player is chosen randomly
function State(first) {
		// self reference
		var self = this;
	
		// playing status
		this.playing = true;
		
		// the current number of moves
		this.moves = 0;
		
		// who is the winner
		this.winner = 'Nobody';
	
		// the tic-tac-toe board
		this.board = [[null, null, null], 
		              [null, null, null], 
		              [null, null, null]];
		
		// check for end game conditions
		this.checkEndGame = function () {
			if (self.moves < 3) {
				return;
			}
			
			// Winning Conditions
			var winningConditions = [
             	[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}], // first row
             	[{x:0, y:1}, {x:1, y:1}, {x:2, y:1}], // second row
             	[{x:0, y:2}, {x:1, y:2}, {x:2, y:2}], // third row
             	[{x:0, y:0}, {x:0, y:1}, {x:0, y:2}], // first column
             	[{x:1, y:0}, {x:1, y:1}, {x:1, y:2}], // second column
             	[{x:2, y:0}, {x:2, y:1}, {x:2, y:2}], // third column
             	[{x:0, y:0}, {x:1, y:1}, {x:2, y:2}], // diagonal top left to bot right
             	[{x:0, y:2}, {x:1, y:1}, {x:2, y:0}] // diagonal bottom left to top right
     		];
			
			// Check For Winning Conditions
			for(var i = 0; i < winningConditions.length; i++) {
				// extract the tuples
				var x1 = winningConditions[i][0].x;
				var y1 = winningConditions[i][0].y;
				var x2 = winningConditions[i][1].x;
				var y2 = winningConditions[i][1].y;
				var x3 = winningConditions[i][2].x;
				var y3 = winningConditions[i][2].y;
				
				// extract the cells
				var cell1 = self.board[x1][y1];
				var cell2 = self.board[x2][y2];
				var cell3 = self.board[x3][y3];
				
				// check for winning condition
				if (cell1 != null && cell1 == cell2 && cell2 == cell3) {
					self.winner = cell1;
					self.playing = false;
					return;
				}
			}
			
			// check for cats game
			if (self.moves == 9) {
				self.playing = false;
			}
		}
		
		
		// make a move for the current player, change turns, then checks for end game
		this.move = function (x, y) {
			if (self.playing && self.board[x][y] == null) {
				self.board[x][y] = self.turn;
				self.turn = self.turn == 'X' ? 'O' : 'X';
				self.moves++;
				self.checkEndGame();
				return true;
			}
			return false;
		}
		
		// A textual status of the game
		this.status = function () {
			if (self.playing) {
				return 'Its ' + self.turn + "'s turn";
			} else {
				return self.winner + ' is the winner!';
			}
		}
		
		// set who goes first
		var firstUpper = typeof this.first == "string" ? first.toUpperCase() : null;
		if ($.inArray(firstUpper, ['X', 'O']) != -1) {
			this.turn = firstUpper;
		} else {
			if (Math.random() < 0.5) {
				this.turn = 'X';
			} else {
				this.turn = 'O';
			}
		}
}

// global game state
var state = new State();

$(document).ready(function () {
	$('.label-status').html(state.status);
	
	$('.cell').click(function (e) {		
		if ($(this).is(':empty')) {
			// send move to the state
			var x = $(this).parent().index();
			var y = $(this).index();
			var letterToPlace = state.turn;
			if (state.move(x, y)) {
				$(this).html(letterToPlace);
			}
			
			// update the status label
			$('.label-status').html(state.status);
			
			// if the game is over, disable all the cells (by adding &nbsp; into them)
			if (!state.playing) {
				$('.cell:empty').html('&nbsp;');
			}
		}
	});
	
	$('.button-reset').click(function (e) {
		state = new State();
		$('.cell').html('');
		$('.label-status').html(state.status);
	});
	
	
});