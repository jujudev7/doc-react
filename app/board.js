"use client";

import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // Array(9).fill(null) crée un tableau de 9 éléments puis les définit tous à null.
  // L’appel useState() qui l’enrobe déclare une variable d’état squares qui vaut initialement ce tableau.
  // Chaque entrée du tableau correspond à la valeur d’une case.
  // Lorsque vous remplirez le plateau par la suite, le tableau aura une valeur ressemblant davantage à ceci :
  // ['O', null, 'X', 'X', 'X', 'O', 'O', null, null]
  // const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Le X était écrasé par un O !
    // Il faut Vérifier si la case a déjà un X ou un O.
    // Si la case est déjà remplie, on fait un return tôt dans la fonction handleClick, avant qu’elle ne tente de mettre à jour l’état du plateau.

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  // La fonction handleClick crée une copie du tableau squares (nextSquares) grâce à la méthode de tableau JavaScript slice().
  // Ensuite, handleClick met à jour le tableau nextSquares pour ajouter un X à la première case (index [0]).
  // On appelle alors la fonction setSquares pour avertir React que l’état du composant a changé.
  // Ça déclenchera un nouvel affichage des composants qui utilisent l’état squares (donc Board), ainsi que de tous leurs composants enfants (les composants Square qui constituent le plateau).

  const winner = calculateWinner(squares);
  let status;
  let statusClass;

  if (winner) {
    status = winner + " a gagné !";
    statusClass = "status winner";
  } else {
    // status = "Prochain tour : " + (xIsNext ? "X" : "O");
    status = (
      <>
        Prochain tour :{" "}
        <span className="next-player-indicator">{xIsNext ? "X" : "O"}</span>
      </>
    );
    statusClass = "status next-player";
  }

  return (
    <>
      <div className={statusClass}>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
// La 1ère ligne définit une fonction appelée Square.
// Le mot-clé JavaScript export rend cette fonction accessible à l’extérieur de ce fichier.
// Le mot-clé default indique aux autres fichiers utilisant votre code qu’il s’agit là de la fonction principale de votre fichier.

// La 2ème ligne renvoie un bouton.
// Le mot-clé JavaScript return indique que tout ce qui le suit est renvoyé comme valeur à l’appelant de la fonction.
// <button> est un élément JSX. Un élément JSX est une combinaison de code JavaScript et de balises similaires à HTML, qui décrit ce que vous aimeriez afficher.
// className="square" est une propriété du bouton, ou prop, qui indique à CSS comment styler le bouton.
// X est le texte affiché à l’intérieur du bouton et
// </button> ferme l’élément JSX en indiquant que tout ce qui suit ne devrait pas figurer dans le bouton.

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    // La condition if vérifie 3 choses :
    // squares[a] : vérifie que la case a n'est pas vide (null ou undefined). Cela signifie qu'un joueur a marqué cette case.
    // squares[a] === squares[b] : vérifie que la case a et la case b contiennent le même symbole.
    // squares[a] === squares[c] : vérifie que la case a et la case c contiennent le même symbole.
    // Si toutes ces conditions sont vraies, cela signifie que les trois cases a, b, et c sont marquées par le même joueur ('X' ou 'O'), ce qui représente une combinaison gagnante.
    // Dans ce cas, la fonction retourne le symbole du joueur (squares[a]), ce qui indique le gagnant.
    // Si la boucle termine toutes les itérations sans trouver de combinaison gagnante, la fonction retourne null pour indiquer qu'il n'y a pas de gagnant à ce stade du jeu.
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Aller au coup #" + move;
    } else {
      description = "Recommencer";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
