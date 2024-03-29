let oriBoard;
const huPlayer = '0';
const aiPlayer = 'X';
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
  document.querySelector('.endgame').style.display='none';
  oriBoard = Array.from(Array(9).keys());
  
  for(let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click',turnClick, false);
  }
};

function turnClick(square){
  if(typeof oriBoard[square.target.id] == 'number') {
    turn(square.target.id, huPlayer)
    if(!checkTie()) turn(bestSpot(), aiPlayer)
  }
};

function turn(squareId,player){
    oriBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(oriBoard, player);
    if(gameWon) gameOver(gameWon)
};

function checkWin(board,player){
    let plays = board.reduce((a, e, i) =>
        (e===player) ? a.concat(i) : a, []);
        
        let gameWon = null;

        for(let [index, win] of winCombos.entries()){
            if(win.every(elem =>plays.indexOf(elem) >-1)){
                gameWon = {index,player};
                break;
            }
        }
        return gameWon;
    };

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor =
        gameWon.player == huPlayer ? "blue" : "red";
    }

    for(let i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick,false)
    }
    declareWinner(gameWon.player == huPlayer ? "You Win" : "You Lose")
};

function emptySquares(){
  return oriBoard.filter(s => typeof s == 'number')
};

function bestSpot() {
  return emptySquares()[0];
};

function declareWinner(who) {
  document.querySelector('.endgame').style.display ='block';
  document.querySelector('.endgame .text').innerText = who;

}

function checkTie() {
  if(emptySquares().length == 0) {
    for (let i = 0; i < cells.length; i++){
      cells[i].style.backgroundColor= 'green';
      cells[i].removeEventListener('click', turnClick,false);
      declareWinner('Tie game');
      return true;
    }
    return false;
  }
}