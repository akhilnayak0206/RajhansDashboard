import React from "react";
import { HashRouter } from "react-router-dom";
import MainRouter from "./routers/MainRouter";
import "./App.css";

function App() {
  return (
    <HashRouter>
        <MainRouter />
    </HashRouter>
  );
}

export default App;
