let players = {
  1: {
    id: 1,
    name: '',
    points: 0
  },
  2: {
    id: 2,
    name: '',
    points: 0
  }
}
let currentPlayer = {}
let currentPlayerId = 1
const currentPlayerImgRef = document.querySelector('#currentPlayerImg')
const currentPlayerNameRef = document.querySelector('#currentPlayerName')
let winner

const possibleMatches = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

function getPlayersNames() {
  const player1 = document.querySelector('#player1-name').value
  const player2 = document.querySelector('#player2-name').value

  if (!player1 && !player2) {
    alert('Insira os nomes dos jogadores para começar a partida!')
    return
  }

  players[1].name = player1
  players[2].name = player2
}

function setCurrentPlayer(id) {
  console.trace('here')

  currentPlayer = players[id]
  currentPlayerImg.style.backgroundImage = `url(assets/${currentPlayer.id}.png)`
  currentPlayerName.innerText = ` - ${currentPlayer.name}`
}

function sameBoxes(a, b, c) {
  let boxA = document.querySelector(`#box${a}`).style.backgroundImage
  let boxB = document.querySelector(`#box${b}`).style.backgroundImage
  let boxC = document.querySelector(`#box${c}`).style.backgroundImage

  if ((boxA == boxB) && (boxB == boxC) && (boxA != "none" && boxA != "")) {
    winner = boxA.indexOf("assets/1.png") >= 0 ? 1 : 2;
    return true;
  } else {
    return false;
  }
}

function checkEndGame() {
  if (
    sameBoxes(1, 2, 3) || sameBoxes(4, 5, 6) || sameBoxes(7, 8, 9) ||
    sameBoxes(1, 4, 7) || sameBoxes(2, 5, 8) || sameBoxes(3, 6, 9) ||
    sameBoxes(1, 5, 9) || sameBoxes(3, 5, 7)
  ) {
    players[winner].points += 1
    document.getElementById("restartGame").classList.toggle('d-none');
    document.getElementById("score").innerHTML = `🏆 ${players[winner].name} ganhou!`;

    atualizarPlacar()
  }
}

function startGame() {
  getPlayersNames()

  document.querySelector('.players-name').classList.toggle('d-none')
  document.querySelector('.switch-players').classList.toggle('d-none')

  document.querySelector('.current-player').classList.toggle('d-none')

  setCurrentPlayer(currentPlayerId)

  document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => {
      box.style.backgroundImage = `url(assets/${currentPlayer.id}.png)`
      checkEndGame()
      const id = currentPlayerId === 1 ? 2 : 1
      setCurrentPlayer(id)
    })
  })
}