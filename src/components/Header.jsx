import React from "react";
import "../styles/Header.css"

import {Input} from "reactstrap";
import {ArrowRight, CaretRight, Cart} from "react-bootstrap-icons";
import {Image, Button} from "react-bootstrap";
const Header = () => {
    return(
        <header className=" d-flex flex-wrap">

        <div className="col-2 d-none d-lg-block">
            <Image src="../img/logo.png" className="sc-image"></Image>
        </div>

        <div className="d-flex flex-wrap col-8 p-3">

            <div className="col-2 d-none d-lg-block">
                <Button variant="outline-secondary" className="btn btn-outline-light rounded-5 fw-bolder ">CATEGORIES</Button>
            </div>

            <div className="col-8">
                <Input className="input rounded-5 border-0">
                </Input>
            </div>

        </div>

        <div className="d-flex flex-wrap col-2 justify-content-end align-items-center">
            <Button variant="outline-secondary" className="btn btn-outline-light rounded-5 fw-bolder ">SIGN IN</Button>
            <Cart color="white" className="mx-5" size="11%"/>
        </div>

        </header>
    )
};
export default Header;