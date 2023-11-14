import React, {useState} from "react";
import "../styles/Menu.css"
import {Button} from "react-bootstrap";
import AuthPanel from "./AuthPanel";
import {useNavigate} from "react-router-dom";

const Menu = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);
    const navigate = useNavigate();

    const toggleAuthPanel = () => {
        setIsAuthOpen(!isAuthOpen);
        setIsMainMenuOpen(!isMainMenuOpen);
    }

    const toCart = () => {
        navigate("/cart");
    }

    return (
        <>
            {isMainMenuOpen &&
                <div className="d-flex flex-column position-absolute menu-panel pt-3">
                    <Button
                        className="text-center text-white w-25 rounded-5"
                        onClick={toggleAuthPanel}
                    >
                        {localStorage.getItem('userData') ? "Account" : "Sign In"}
                    </Button>

                    <Button
                        className="text-center text-white rounded-5 w-25 my-4"
                        onClick={toCart}
                    >
                        Cart
                    </Button>

                </div>
            }


            {isAuthOpen && <AuthPanel/>}
        </>

    );
};
export default Menu;