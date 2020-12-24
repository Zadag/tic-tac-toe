const game = (() => {
    const gameboard = {
        gameSquares : ["", "", "", 
                       "", "", "", 
                       "", "", ""]
    }

    let playerArray = [];

    const isMoveValid = (square) => {
        return gameboard.gameSquares[square].length < 1 ? true: false
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
            else if(isSquareEmpty(b) === false && gameboard.gameSquares[b] === gameboard.gameSquares[b + 3] && gameboard.gameSquares[b + 3] === gameboard.gameSquares[b + 6]){
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

    const resetBoard = () => gameboard.gameSquares = ["", "", "", 
                                                      "", "", "", 
                                                      "", "", "",];


    const isDrawn = () => {
        const fullBoard = () => {
            let isFull = true;
            gameboard.gameSquares.forEach(gameSquare => {
                if(gameSquare.length < 1) {
                    isFull = false;
            }
        }) 
            return isFull;
        }
        //console.log(typeof isWon());
        if(typeof isWon() === 'undefined' && fullBoard() === true){
            return true;
        } 
        return false;
    }

    const playerFactory = (playerID, symbol, isTurnNow) => {
        return {playerID, symbol, isTurnNow}
    } 

    let player1 = playerFactory('p1', 'x', false);
    let player2 = playerFactory('p2', 'o', false);
    playerArray.push(player1);
    playerArray.push(player2); 
    
    const playTurn = (chosenSquare) => {
        console.log(isWon());
        console.log(isDrawn());
        console.log(isMoveValid(chosenSquare));
        if(!isWon() && !isDrawn() && isMoveValid(chosenSquare)){
            if(playerArray[0].isTurnNow === true){
                changeSquare(chosenSquare, playerArray[0].symbol);
                playerArray[0].isTurnNow = false;
                playerArray[1].isTurnNow = true;
            }else {
                changeSquare(chosenSquare, playerArray[1].symbol);
                playerArray[1].isTurnNow = false;
                playerArray[0].isTurnNow = true;
            }
        }else console.log('playTurn failed');
    }

    return {
        isMoveValid, changeSquare, isWon, isDrawn, resetBoard, playTurn, playerArray, gameboard
    }
})();

const controller = (() => {
    const squares = document.querySelectorAll(".game-square");
    Array.from(squares).forEach(square => {
        square.addEventListener('click', () => {
            const chosenSquare = square.getAttribute("data-square");
            game.playTurn(chosenSquare);
            display.updateBoard();
            
        })
    })

    const playerSelection = document.querySelector(".x-or-o");
    playerSelection.addEventListener('click', (e) => {
        game.playerArray[0].symbol = e.target.id;
        if(game.playerArray[0].symbol === 'x'){
            game.playerArray[0].isTurnNow = true;
            game.playerArray[1].symbol = 'o';
            game.playerArray[1].isTurnNow = false;
            console.log(game.playerArray[1]);
            console.log(game.playerArray[0]);
        }else {
            game.playerArray[1].symbol = 'x'
            game.playerArray[1].isTurnNow = true;
            game.playerArray[0].isTurnNow = false;
            console.log(game.playerArray[1]);
            console.log(game.playerArray[0]);
        }
    })

    const newGameButton = document.querySelector('#new-game-button');
    newGameButton.addEventListener('click', () => {
        game.resetBoard();
        display.updateBoard();
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



//Game module (gameboard)
//-Get move from controller
//-Check if the move is valid 
//-Determine whos turn it is 
//-Update gameboard array
//-Deterimine if the game is over
//-Send gameboard to controller
//-Create player objects 
//-

//Display module
//-Get board state from controller and update DOM
//-
//-
//-
//-
//-
//-

//Controller module 
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
