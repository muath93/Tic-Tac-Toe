//tow arrayes for each player

let playerOne = {
  Name: "",
  wins: 0,
  stack: []
};
let playerTwo = {
  Name: "",
  wins: 0,
  stack: []
};

function checkWin(pStck) {
  //all the possible patterns to win
  let pattrenOfWin = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"]
  ];

  let caontMatches = 0;
  let win = false;
  for (var out of pattrenOfWin) {
    for (var i = 0; i < pStck.length; i++) {
      if (out.includes(pStck[i])) {
        caontMatches++;
        if (caontMatches === 3) {
          win = true;
          //   console.log(out);
          return true;
        }
      }
    }
    caontMatches = 0;
  }
}

let area = $("#area");

let playerOneTurn = true;
let playerTwoTurn = false;

function playerOnePlay(event) {
  let item = event.target;
  let itemId = item.id;
  // let value = $(item).text();
  console.log('this is itemId ' + itemId);
  if ((itemId === 'area' || playerTwo.stack.includes(itemId) || playerOne.stack.includes(itemId))) {
    $(item).removeClass("red");
    console.log("Play some thing else");
  } else {
    const sta = playerOne.stack.push(itemId);
    console.log(sta);

    $(item).addClass("red");
    const tic = document.querySelector('#tic');
    tic.currentTime = 0;
    tic.play();
    console.log(playerOne.stack);
    if (checkWin(playerOne.stack)) {
      const result = document.querySelector('#result');
      const winSound1 = document.querySelector('#winSound1');
      result.classList.add('result');
      result.textContent = `player one wins`
      winSound1.play();

    }
    if (playerOne.stack.length === 5) {
      console.log("Draw");
    }
    playerOneTurn = false;
    playerTwoTurn = true;
  }
}

function playerTwoPlay(event) {
  let item = event.target;
  let itemId = item.id;
  // let value = $(item).text();
  console.log(itemId);
  if ((itemId === 'area' || playerTwo.stack.includes(itemId) || playerOne.stack.includes(itemId))) {
    $(item).removeClass("red");
    console.log("Play some thing else");
  } else {
    playerTwo.stack.push(itemId);
    $(item).addClass("blue");
    const woosh = document.querySelector('#woosh');
    woosh.currentTime = 0;
    woosh.play();
    console.log(playerTwo.stack);
    if (checkWin(playerTwo.stack)) {
      console.log("Player Two Win");
      const result = document.querySelector('#result');
      const winSound2 = document.querySelector('#winSound2');
      result.classList.add('result');
      result.textContent = `player tow wins`
      winSound2.play();
    }
    if (playerTwo.stack.length === 5) {
      console.log("Draw");
    }
    playerOneTurn = true;
    playerTwoTurn = false;
  }
}

function whoPlay(event) {
  if (playerOneTurn) {
    playerOnePlay(event);
  } else playerTwoPlay(event);
}
area.on("click", whoPlay);