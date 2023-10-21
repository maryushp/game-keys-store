import React from "react";
import "../styles/Header.css"

import {Input} from "reactstrap";
import {Cart, List} from "react-bootstrap-icons";
import {Image, Button} from "react-bootstrap";
const Header = () => {
    return(
        <header className="d-flex flex-wrap shadow-lg">

        <div className="col-2 d-flex justify-content-center">
            <Image src="../img/logo.png" className="sc-image d-none d-lg-block"></Image>
            <List color="white" size="36" className="d-block d-lg-none "/>
        </div>

        <div className="d-flex flex-wrap col-9 col-md-8  col-lg-7 p-3 align-items-center justify-content-center gap-2">

            <div className="d-none d-lg-block">
                <Button variant="outline-secondary" className="button btn btn-outline-light rounded-5 fw-bolder ">CATEGORIES</Button>
            </div>

            <div className="col-11 col-lg-8">
                <Input className="input rounded-5 border-0">
                </Input>
            </div>

        </div>

        <div className="d-none d-md-flex flex-wrap  col-2 col-lg-3 justify-content-end align-items-center gap-5">
            <Button variant="outline-secondary" className="d-none d-lg-block button btn btn-outline-light rounded-5 fw-bolder">SIGN IN</Button>
            <Cart color="white" className="me-5 d-none d-md-block" size="28"/>
        </div>

        </header>
    )
};
export default Header;