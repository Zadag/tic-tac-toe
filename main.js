const gameboard = (() => {
    const gameboard = {
        gameSquares : ["x", "o", "o", "x", "o", "x", "o", "x", "x"]
    }

    const isMoveValid = (square) => {
        gameboard.gameSquares[square].length < 1 ? true: false
    }

    const changeSquare = (square, symbol) => {
        gameboard.gameSquares[square] = symbol;
    }

    return {
        isMoveValid, changeSquare
    }
})();



gameboard.isMoveValid(2);
gameboard.changeSquare(2, "x");