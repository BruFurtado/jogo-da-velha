let players = [
  {
    id: 1,
    name: '',
    points: 0,
  },
  {
    id: 2,
    name: '',
    points: 0,
  },
]

function mostrarVezJogador(mostrar = true) {
  if (mostrar) {
    document.getElementsByClassName('currentPlayer')[0].classList.toggle('d-none')
  } else {
    document.getElementsByClassName('currentPlayer')[0].classList.remove('d-none')
  }
}

function trocarJogadores() {
  document.getElementById('change-players').classList.toggle('d-none')
  document.getElementById('playersName').classList.remove('d-none')
  mostrarVezJogador(false)
  limparCasas()
}

function startGame() {
  const elementJogador1 = document.querySelector("#playersName input#jogador-1");
  const elementJogador2 = document.querySelector("#playersName input#jogador-2");

  const player1 = elementJogador1.value
  const player2 = elementJogador2.value

  if (!player1 && !player2) {
    alert('Insira os nomes do jogadores para começar o jogo!')
    return
  }

  players[0] = { name: player1 }
  players[1] = { name: player2 }

  document.getElementById('playersName').classList.toggle('d-none')
  document.getElementById('change-players').classList.remove('d-none')
  mostrarVezJogador(true)
  atualizarPlacar()
}

function clearBoxes() {
  document.querySelectorAll('.row').forEach(row => {
    row.querySelectorAll('.box').forEach(box => {
      box.style.backgroundImage = ''
    })
  })
}

function restartGame() {
  clearBoxes()
  document.getElementById("restartGame").classList.toggle('d-none')
}

function atualizarPlacar() {
  const table = document.querySelector('table.score')

  table.querySelectorAll('tr').forEach(row => {
    const id = row.id

    if (!id) {
      return
    }

    row.querySelector('td.name').textContent = jogadores[id].name
    row.querySelector('td.points').textContent = jogadores[id].points
  })
}

document.addEventListener("DOMContentLoaded", () => {
  let turn = 1;
  let winner = "";

  function sameBoxes(a, b, c) {
    let boxA = document.querySelector("#box" + a);
    let boxB = document.querySelector("#box" + b);
    let boxC = document.querySelector("#box" + c);

    let bgA = boxA.style.backgroundImage;
    let bgB = boxB.style.backgroundImage;
    let bgC = boxC.style.backgroundImage;

    if ((bgA == bgB) && (bgB == bgC) && (bgA != "none" && bgA != "")) {
      winner = bgA.indexOf("assets/1.png") >= 0 ? "1" : "2";
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
      document.querySelectorAll('box').forEach(box => {
        box.removeEventListener('click');
      })
      atualizarPlacar()
    }
  }

  let currentPlayerImg = document.getElementById('currentPlayerImg');
  currentPlayerImg.style.backgroundImage = "url(assets/1.png)";

  document.querySelectorAll('.box').forEach(box => {
    casa.addEventListener('click', () => {
      const isPlayersReady = !!players[0].name && !!players[1].name

      if (!isPlayersReady) {
        alert('Insira os nomes dos jogadores para iniciar!')
        return
      }

      let bg = box.style.backgroundImage;
      if (bg == "none" || bg == "") {
        let fig = `url(assets/${turn.toString()}.png)`;
        box.style.backgroundImage = fig;
        turn = (turn == 1 ? 2 : 1);
        checkEndGame();
        currentPlayerImg.style.backgroundImage = `url(assets/${turn.toString()}.png)`;
        let currentPlayerName = document.getElementById('currentPlayersName')
        currentPlayerName.innerText = ` - ${players[turn].nome}`
      }
    })
  })
})