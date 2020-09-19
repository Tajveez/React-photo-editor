import React from "react";
import "./App.css";
import Slider from "./components/Slider";

function App() {
  return (
    <div className="container">
      <div className="main-image">
        <div className="sidbar"></div>
        <Slider />
      </div>
    </div>
  );
}

export default App;