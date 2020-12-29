const game = (() => {
    const gameboard = {
        gameSquares : ["", "", "", 
                       "", "", "", 
                       "", "", ""]
    }

    let playerArray = [];
    let winner = '';

    const whoWon = () => {
        if(isWon() && playerArray[0].isTurnNow === false) return playerArray[0].playerID;
        if(isWon() && playerArray[1].isTurnNow === false) return playerArray[1].playerID;
    }

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
        
        if(typeof isWon() === 'undefined' && fullBoard() === true){
            return true;
        } 
        return false;
    }

    const playerFactory = (playerID, symbol, isTurnNow) => {
        return {playerID, symbol, isTurnNow}
    } 

    let player1 = playerFactory('p1', 'x', true);
    let player2 = playerFactory('p2', 'o', false);
    playerArray.push(player1);
    playerArray.push(player2); 
    
    const playTurn = (chosenSquare) => {
        if(!isGameOver(chosenSquare)){
            if(playerArray[0].isTurnNow === true){
                changeSquare(chosenSquare, playerArray[0].symbol);
                playerArray[0].isTurnNow = false;
                playerArray[1].isTurnNow = true;
                if(isWon()){
                    winner = playerArray[0].symbol;
                }
            }else {
                changeSquare(chosenSquare, playerArray[1].symbol);
                playerArray[1].isTurnNow = false;
                playerArray[0].isTurnNow = true;
                if(isWon()){
                    winner = playerArray[1].symbol;
                }
            }
        }

    }

    const isGameOver = (square) => {
        if(!isWon() && !isDrawn() && isMoveValid(square)){
            return false
        }else return true
    }

    return {
        changeSquare, resetBoard, playTurn, isGameOver, isWon, whoWon, playerArray, gameboard, winner
    }
})();

const controller = (() => {

    const squares = document.querySelectorAll(".game-square");
    Array.from(squares).forEach(square => {
        square.addEventListener('click', () => {
            const chosenSquare = square.getAttribute("data-square");
            game.playTurn(chosenSquare);
            display.updateBoard();
            display.announce();
            
        });
    });

    const newGameButton = document.querySelector('#new-game-button');
    newGameButton.addEventListener('click', () => {
        game.resetBoard();
        game.playerArray[0].isTurnNow = true;
        game.playerArray[1].isTurnNow = false;
        display.updateBoard();
        display.resetAnnounce();

    })

    const player1ID = document.querySelector('#player1')
    const player2ID = document.querySelector('#player2')

    player1ID.addEventListener('input', () => {
        game.playerArray[0].playerID = player1ID.value;
    })
    player2ID.addEventListener('input', () => {
        game.playerArray[1].playerID = player2ID.value;
    })
})();

const display = (() => {
    const updateBoard = () => {
        const gameSquares = document.querySelectorAll('.game-square');
        for(i=0; i<9; i++){
            gameSquares[i].textContent = game.gameboard.gameSquares[i]
        } 
    }

    const announcer = document.querySelector('.announcer');
    const announce = () => {
        if (game.isWon()){
            announcer.textContent = `${game.whoWon()} won playing as ${game.isWon()}`
        }
    }

    const resetAnnounce = () => {
        announcer.textContent = '';
    }

    return {updateBoard, announce, resetAnnounce}
})();
