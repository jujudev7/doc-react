"use client";

import { useState } from "react";

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    // console.log("cliqué !");
    setValue("X");
  }
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
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
