import React from "react";
import {Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";

function App() {

    const [selectedCategory, setSelectedCategory] = React.useState([]);

    const updateCategory = (category) => {
        console.log("Selected Categories:", category);
        setSelectedCategory(category);
    };


    return (
      <>
      <Header updateCategory={updateCategory} selectedCategory={selectedCategory}/>
          <Routes>
              <Route element={<HomePage selectedCategory={selectedCategory}/>} path="/"/>
              <Route element={<ItemPage updateCategory={updateCategory}/>} path="/game/:id"/>
          </Routes>
      </>
  );
}
export default App;
