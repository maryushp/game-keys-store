import React from "react";
import {Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ItemPage from "./pages/ItemPage/ItemPage";
import CartPage from "./pages/CartPage/CartPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer/Footer";
import UserOrdersPage from "./pages/UserOrdersPage/UserOrdersPage";
import CreateItemPage from "./pages/AdminPages/CreateItemPage/CreateItemPage";
import UpdateItemPage from "./pages/AdminPages/UpdateItemPage/UpdateItemPage";
import OrdersPage from "./pages/AdminPages/OrdersPage/OrdersPage";
import UpdateCategoriesPage from "./pages/AdminPages/UpdateCategoriesPage/UpdateCategoriesPage";
import UpdateAccount from "./pages/UpdateAccount/UpdateAccount";

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
              <Route element={<UserOrdersPage/>} path={"/orders"}/>
              <Route element={<CreateItemPage/>} path={"/new-item"}/>
              <Route element={<UpdateItemPage/>} path={"/update-item/:id"}/>
              <Route element={<OrdersPage/>} path={"/all-orders"}/>
              <Route element={<UpdateCategoriesPage/>} path={"/update-categories"}/>
              <Route element={<UpdateAccount/>} path={"/update-account"}/>
          </Routes>
          <Footer/>
      </>
  );
}
export default App;
