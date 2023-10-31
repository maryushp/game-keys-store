import React from "react";
import {Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";
import UserOrdersPage from "./pages/UserOrdersPage";

function App() {

    const [selectedCategory, setSelectedCategory] = React.useState([]);
    const [inputResult, setInputResult] = React.useState("")

    const updateCategory = (category) => {
        console.log("Selected Categories:", category);
        setSelectedCategory(category);
    };

    return (
      <>
          <ToastContainer
              position="bottom-right"
              autoClose={3000}
              limit={5}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="dark"/>
          <Header updateCategory={updateCategory} selectedCategory={selectedCategory} setInputResult={setInputResult}/>
          <Routes>
              <Route element={<HomePage selectedCategory={selectedCategory} inputResult={inputResult}/>} path="/"/>
              <Route element={<ItemPage updateCategory={updateCategory}/>} path="/game/:id"/>
              <Route element={<CartPage/>} path="/cart"/>
              <Route element={<UserOrdersPage/>} path={"orders"}/>
          </Routes>
          <Footer/>
      </>
  );
}
export default App;
