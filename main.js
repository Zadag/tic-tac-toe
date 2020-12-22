const game = (() => {
    const gameboard = {
        gameSquares : ["0", "1", "2", 
                       "3", "4", "5", 
                       "6", "7", "8"]
    }

    const isMoveValid = (square) => {
        gameboard.gameSquares[square].length < 1 ? true: false
    }

    const changeSquare = (square, symbol) => {
        gameboard.gameSquares[square] = symbol;
    }

    const isWon = () => {
        let a = 0;
        let b = 0;
        const isSquareEmpty = (square) => gameboard.gameSquares[square].length < 1 ? true: false; 
        
        for (let i = 0; i < 3; i++){
            //check for 3 in a row
            if(isSquareEmpty(a) === false && gameboard.gameSquares[a] === gameboard.gameSquares[a + 1] && gameboard.gameSquares[a + 1] === gameboard.gameSquares[a + 2]){
                return gameboard.gameSquares[a]
            } 
            //check for 3 in a column
            else if(isSquareEmpty(a) === false && gameboard.gameSquares[b] === gameboard.gameSquares[b + 3] && gameboard.gameSquares[b + 3] === gameboard.gameSquares[b + 6]){
                return gameboard.gameSquares[b]
            }
            a += 3;
            b += 1;
        }
        //check diagonals
        if (isSquareEmpty(0) === false && gameboard.gameSquares[0] === gameboard.gameSquares[4] && gameboard.gameSquares[4] === gameboard.gameSquares[8]){
            return gameboard.gameSquares[0]
        }
        if (isSquareEmpty(2) === false && gameboard.gameSquares[2] === gameboard.gameSquares[4] && gameboard.gameSquares[4] === gameboard.gameSquares[6]){
            return gameboard.gameSquares[2]
        }
    }

    //const isDrawn = () => {
    //   const fullBoard = () => {
    //        gameboard.gameSquares.forEach(gameSquare => gameSquare.length < 1 ? true: false);

    //    }
    //    if(typeof isWon() === 'undefined' && fullBoard){
    //  } 
    //    }


    return {
        isMoveValid, changeSquare, isWon, gameboard
    }
})();

const controller = (() => {
    const squares = document.querySelectorAll(".game-square");
    Array.from(squares).forEach(square => {
        square.addEventListener('click', () =>{
            const chosenSquare = square.getAttribute("data-square");
            if(game.isMoveValid(chosenSquare) === true) playRound()
            
        })
    })

})();

const display = (() => {
    const updateBoard = () => {
        const gameSquares = document.querySelectorAll('.game-square');
        for(i=0; i<9; i++){
            gameSquares[i].textContent = game.gameboard.gameSquares[i]
        } 
    }
    return {updateBoard}
})();




const playerFactory = (humanOrComp, playerID, symbol) => {
    return {humanOrComp, playerID, symbol}
} 



//Game module (gameboard)
//-Get move from controller
//-Check if the move is valid 
//-Determine whos turn it is 
//-Update gameboard array
//-Deterimine if the game is over
//-Send gameboard to controller
//- 
//-

//Display module
//-Get board state from controller
//-Push gameboard updates to the controller
//-
//-
//-
//-
//-

//Controller module
//-Create player objects 
//-Get moves 
//-Send player names and moves to the game module
//-
//-
//-


//Things left to do
//-
//-
//-
//-
//-
//-
