function Draw() {
    this.LAST_SQUARE = Constants.LAST_BOARD_SQUARE;
    this.FIRST_SQUARE = Constants.FIRST_BOARD_SQUARE;
    this.CLASS_WHITE_SQUARE = 'white_square';
    this.CLASS_BLACK_SQUARE = 'black_square';
    this.IMG_WHITE_QUEEN = '<img src="assets/img/white_queen.png" />';
    this.IMG_BLACK_QUEEN = '<img src="assets/img/black_queen.png" />';
    this.DOMQueens = null;
    this.initialize.apply(this, arguments);
};

Draw.prototype.initialize = function () {
    this.DOMQueens = document.getElementsByTagName('td');
};

Draw.prototype.putQueen = function (iSquare) {
    if (iSquare >= this.FIRST_SQUARE && iSquare <= this.LAST_SQUARE) {
        var queen = this.DOMQueens[iSquare];

        if (queen.getAttribute('class') == this.CLASS_WHITE_SQUARE) {
            queen.innerHTML = this.IMG_WHITE_QUEEN;
        } else if (queen.getAttribute('class') == this.CLASS_BLACK_SQUARE) {
            queen.innerHTML = this.IMG_BLACK_QUEEN;
        }
    }
}

Draw.prototype.remove = function (iSquare) {
    if (iSquare >= this.FIRST_SQUARE && iSquare <= this.LAST_SQUARE) {
        this.DOMQueens[iSquare].innerHTML = '';
    }
}

Draw.prototype.drawBoard = function (board) {
    for (var iSquare = this.FIRST_SQUARE; iSquare <= this.LAST_SQUARE; iSquare++) {
        this.removeQueen(iSquare);
    }

    for (var iQueen = 0; iQueen <= board.length; iQueen++) {
        if (board[iQueen] >= this.FIRST_SQUARE && board[iQueen] <= this.LAST_SQUARE) {
            this.putQueen(board[iQueen]);
        }
    }
}