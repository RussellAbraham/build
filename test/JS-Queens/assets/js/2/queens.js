function Queens() {
    this.NUM_QUEENS = 8;
    this.NUM_BOARD_SQUARES = 64;
    this.currentQueensPositions = [];
    this.newQueensPositions = [];
};

Queens.prototype.generateRandomPositions = function () {
    var done = false;
    for (var iQueen = 0; iQueen < this.NUM_QUEENS; iQueen++) {
        var repetitions = true;
        this.currentQueensPositions[iQueen] = {};
        while (repetitions) {
            this.currentQueensPositions[iQueen].x = parseInt(Math.random() * 8);
            this.currentQueensPositions[iQueen].y = parseInt(Math.random() * 8);

            if (!this.checkRepetitions(this.currentQueensPositions)) {
                repetitions = false;
            }
        }
    }
    return this.calculateAttacks(this.currentQueensPositions);
};

Queens.prototype.calculateAttacks = function (board) {
    var numAttacks = 0;
    for (var iQueen = 0; iQueen < this.NUM_QUEENS - 1; iQueen++) {
        for (var iAttackingQueen = iQueen + 1; iAttackingQueen < this.NUM_QUEENS; iAttackingQueen++) {
            if (board[iQueen].x == board[iAttackingQueen].x) {
                numAttacks++;
            } else if (board[iQueen].y == board[iAttackingQueen].y) {
                numAttacks++;
            } else if (board[iQueen].x + board[iQueen].y ==
                board[iAttackingQueen].x + board[iAttackingQueen].y) {
                numAttacks++;
            } else if (board[iQueen].y - board[iQueen].x ==
                board[iAttackingQueen].y - board[iAttackingQueen].x) {
                numAttacks++;
            }
        }
    }
    return numAttacks;
};

Queens.prototype.generateNeighbor = function () {
    for (var iQueen = 0; iQueen < this.NUM_QUEENS; iQueen++) {
        this.newQueensPositions[iQueen] = {
            x: this.currentQueensPositions[iQueen].x,
            y: this.currentQueensPositions[iQueen].y
        };
    }

    var changingQueen = parseInt(Math.random() * this.NUM_QUEENS);
    var repetitions = true;

    while (repetitions) {
        var oldX = this.newQueensPositions[changingQueen].x;
        var oldY = this.newQueensPositions[changingQueen].y;

        this.newQueensPositions[changingQueen].x = (((this.newQueensPositions[changingQueen].x + (parseInt(Math.random() * 3) - 1)) % 8) + 8) % 8;
        this.newQueensPositions[changingQueen].y = (((this.newQueensPositions[changingQueen].y + (parseInt(Math.random() * 3) - 1)) % 8) + 8) % 8;

        if (!_checkRepetitions(this.newQueensPositions)) {
            repetitions = false;
        }
        else {
            this.newQueensPositions[changingQueen].x = oldX;
            this.newQueensPositions[changingQueen].y = oldY;
        }
    }

    return this.calculateAttacks(this.newQueensPositions);    
};

Queens.prototype.checkRepetitions = function () {
    var howMany = board.length;
    for (var iQueen = 0; iQueen < howMany - 1; iQueen++) {
        for (var iCheckQueen = iQueen + 1; iCheckQueen < howMany; iCheckQueen++) {
            if (board[iQueen].x === board[iCheckQueen].x &&
                board[iQueen].y === board[iCheckQueen].y) {
                return true;
            }
        }
    }
    return false;    
};

Queens.prototype.acceptNeighbor = function () {
    for (var iQueen = 0; iQueen < this.NUM_QUEENS; iQueen++) {
        this.currentQueensPositions[iQueen] = { x: this.newQueensPositions[iQueen].x, y: this.newQueensPositions[iQueen].y } ;
    }    
};


Queens.prototype.getCurrentPositions = function () {
    var positions = [];
    for (var iQueen = 0; iQueen < this.NUM_QUEENS; iQueen++) {
        positions[iQueen] = this.currentQueensPositions[iQueen].x + (this.currentQueensPositions[iQueen].y * 8);
    }
    return positions;
};