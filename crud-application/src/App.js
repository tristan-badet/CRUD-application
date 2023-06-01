// j'importe le fake backend JSON pour pouvoir l'utiliser



//j'importe la bibliothèque REACT

import React from "react";

// j'importe le css pour avoir un rendu présentable

import "./App.css"

// import JsonTable from "./components/table";
import Tables from "./components/Tables";
function App() {
  return (
    <div className="table">
      {/* <JsonTable /> */}
      <Tables />
    </div>
  );
}

export default App;
