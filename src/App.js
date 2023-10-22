import React from "react";
import {Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";

function App() {
  return (
      <>
      <Header/>
          <Routes>
              <Route element={<HomePage/>} path="/"/>
              <Route element={<ItemPage/>} path="/game/:id"/>
          </Routes>
      </>
  );
}
export default App;
