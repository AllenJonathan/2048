gameData = [
  [0,4,4,0],
  [2,2,2,4],
  [2,2,0,4],
  [0,2,8,0],
]

numberColors = {
  "0": '#CECFD7',
  "2": '#FCF8E8',
  "4": '#F5E8C7',
  "8": '#ECCCB2',
  "16": '#DEB6AB',
  "32": '#AC7088',
}

score = 0;

function displayData(gameData) {
  for (x = 0; x < 4; x++) {
    for (y = 0; y < 4; y++) {
      id = x.toString() + y.toString();
      num = gameData[y][x];
      if (num != 0) {
        document.getElementById(id).innerText = num;
      } else {
        document.getElementById(id).innerText = "";
      }

    }
  }
}

function giveColor(numberColors) {
  for (x = 0; x < 4; x++) {
    for (y = 0; y < 4; y++) {
      id = x.toString() + y.toString();
      num = document.getElementById(id).innerText;
      color = numberColors["0"];
      switch(num) {
        case '2':
          color = numberColors["2"];
          break;
        case '4':
          color = numberColors["4"];
          break;
        case '8':
          color = numberColors["8"];
          break;
        case '16':
          color = numberColors["16"];
          break;
        case '32':
          color = numberColors["32"];
          break;
      }
      document.getElementById(id).parentNode.style.backgroundColor = color;
    }
  }
}

function addNode(gameData) {
  emptyNodes = []
  for (x = 0; x < 4; x++) {
    for (y = 0; y < 4; y++) {
      if (gameData[y][x] == 0) {
        emptyNodes.push(x.toString() + y.toString());
      }
    }
  }
  if (emptyNodes.length > 0) {
    random = Math.floor(Math.random() * emptyNodes.length);
    choosenNode = emptyNodes[random];
    x = parseInt(choosenNode[0]);
    y = parseInt(choosenNode[1]);
    fourProbability = 0.1;
    if (Math.random() <= fourProbability) {
      num = 4;
    } else {
      num = 2;
    }
    gameData[y][x] = num;
  }

}

function _swap(gameData,x1,y1,x2,y2) {
  temp = gameData[y1][x1];
  gameData[y1][x1] = gameData[y2][x2];
  gameData[y2][x2] = temp;
}

function moveDown(gameData) {
  for (x = 0; x < 4; x++) {
    previous = undefined;
    for (y = 3; y >= 0; y--) {
      if (gameData[y][x] == previous) {
        gameData[y][x] = 0;
        gameData[y+1][x] *= 2;
        previous = undefined;
      } else {
        if (gameData[y][x] != 0) {
          previous = gameData[y][x]
        }
      }
    }
  }
  _pushDown(gameData)
}

function _pushDown(gameData) {
  for (x = 0; x < 4; x++) {
    for (y = 2; y >= 0; y--) {
      if (gameData[y][x] != 0 && gameData[y+1][x] == 0) {
        _swap(gameData,x,y+1,x,y)
        y = 3
      }
    }
  }
}

function moveUp(gameData) {
  for (x = 0; x < 4; x++) {
    previous = undefined;
    for (y = 0; y < 4; y++) {
      if (gameData[y][x] == previous) {
        gameData[y][x] = 0;
        gameData[y-1][x] *= 2;
        previous = undefined;
      } else {
        if (gameData[y][x] != 0) {
          previous = gameData[y][x];
        }
      }
    }
  }
  _pushUp(gameData)
}

function _pushUp(gameData) {
  for (x = 0; x < 4; x++) {
    for (y = 1; y <= 3; y++) {
      if (gameData[y][x] != 0 && gameData[y-1][x] == 0) {
        _swap(gameData,x,y-1,x,y)
        y = 0
      }
    }
  }
}

function moveLeft(gameData) {
  for (y = 0; y < 4; y++) {
    previous = undefined;
    for (x = 0; x < 4; x++) {
      if (gameData[y][x] == previous) {
        gameData[y][x] = 0;
        gameData[y][x-1] *= 2;
        previous = undefined;
      } else {
        if (gameData[y][x] != 0) {
          previous = gameData[y][x];
        }
      }
    }
  }
  _pushLeft(gameData)
}

function _pushLeft(gameData) {
  for (y = 0; y < 4; y++) {
    for (x = 1; x <= 3; x++) {
      if (gameData[y][x] != 0 && gameData[y][x-1] == 0) {
        _swap(gameData,x-1,y,x,y)
        x = 0
      }
    }
  }
}

function moveRight(gameData) {
  for (y = 0; y < 4; y++) {
    previous = undefined;
    for (x = 3; x >= 0; x--) {
      if (gameData[y][x] == previous) {
        gameData[y][x] = 0;
        gameData[y][x+1] *= 2;
        previous = undefined;
      } else {
        if (gameData[y][x] != 0) {
          previous = gameData[y][x];
        }
      }
    }
  }
  _pushRight(gameData)
}

function _pushRight(gameData) {
  for (y = 0; y < 4; y++) {
    for (x = 2; x >= 0; x--) {
      if (gameData[y][x] != 0 && gameData[y][x+1] == 0) {
        _swap(gameData,x+1,y,x,y)
        x = 3
      }
    }
  }
}

function move(event, gameData, numberColors) {
  key = event.key
  console.log(key)
  if (key === "ArrowUp") {
    moveUp(gameData);
  } else if (key === "ArrowDown") {
    moveDown(gameData);
  } else if (key === "ArrowRight") {
    moveRight(gameData);
  } else if (key === "ArrowLeft") {
    moveLeft(gameData);
  }
}

function mainGame(gameData, numberColors) {
  displayData(gameData);
  giveColor(numberColors);
  document.addEventListener('keydown', (event) => {
    if (event.key.startsWith("Arrow")) {
      previousBoard = getBoardCopy(gameData);
      move(event, gameData, numberColors)
      console.log(previousBoard, gameData)
      if (previousBoard !== gameData) {
        score += 20
        document.getElementById("score").innerText = "Score: " + score;
        addNode(gameData)
      }
      gameOver = checkGameOver(gameData)
      if (gameOver) {
        displayGameOver()
      }
      displayData(gameData);
      giveColor(numberColors);
    }
  })
}

function checkGameOver(gameData) {
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {

        if (gameData[y][x] === 0) {
          return false
        }
        if (y < 3) {
          if (gameData[y][x] === gameData[y+1][x]) {
            return false
          }
        }
        if (x < 3) {
          if (gameData[y][x] === gameData[y][x+1]) {
            return false
          }
        }

    }
  }
  return true
}

function displayGameOver() {
  gameOverElement = document.getElementById("game-over");
  gameOverElement.style.visibility = "visible";
}

function getBoardCopy(gameData) {
  boardCopy = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ];
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      boardCopy[j][i] = gameData[j][i];
    }
  }
  return boardCopy
}


mainGame(gameData, numberColors)

// moveDown(gameData);
// moveUp(gameData);
// moveLeft(gameData);
// console.log(gameData);
// console.log(gameData);


// displayData(gameData);
// giveColor(numberColors);
// addNode(gameData);
// displayData(gameData);
// giveColor(numberColors);
