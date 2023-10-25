import React, {useEffect, useRef, useState} from "react";
import "../styles/Header.css"

import {Input} from "reactstrap";
import {Cart, List} from "react-bootstrap-icons";
import {Image, Button} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {getAllCategories} from "../utils/CategoriesAPI";
import _ from "lodash";

const Header = ({ updateCategory, selectedCategory, setInputResult}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const inputRef = useRef(null);


    const handleAllCategories = () => {
        getAllCategories()
            .then((data) => setCategories(data.content))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        handleAllCategories();
    }, []);

    const handleButtonCategories = () => {
        setIsOpen(!isOpen);
    }

    const handleInputChange = _.debounce((e) => {
        setInputResult(e.target.value)
        updateCategory([])
    }, 700)

    const toggleCategory = (categoryId) => {
        if (selectedCategory.includes(categoryId)) {
            updateCategory(selectedCategory.filter((id) => id !== categoryId));
            clearInput()
        } else {
            updateCategory([...selectedCategory, categoryId]);
            clearInput()
        }
    };

    const clearInput = () => {
        inputRef.current.value = "";
        setInputResult("");
    }

    return(
        <header className="d-flex flex-wrap shadow-lg fixed-top">

        <div className="col-2 d-flex justify-content-center">
            <Link to="/">
                <Image src="../img/logo.png" className="sc-image d-none d-lg-block"></Image>
            </Link>
            <List color="white" size="36" className="d-block d-lg-none "/>
        </div>

        <div className="d-flex flex-wrap col-9 col-md-8  col-lg-7 p-3 align-items-center justify-content-center gap-5">

            <div className="d-none d-lg-block">

                {location.pathname.includes("/game") ?
                    (
                        <></>
                    )
                    :
                    (
                        <Button variant="outline-secondary" className="button btn btn-outline-light rounded-5 fw-bolder border-2"
                                onClick={() => handleButtonCategories()}>
                            CATEGORIES
                        </Button>
                    )
                }

            </div>
                {location.pathname.includes("/game") ?
                    (<></>) :
                    (
                        <div className={`w-100 d-lg-flex d-none flex-wrap position-absolute justify-content-center gap-3 align-items-center p-5 dropdown ${isOpen ? 'dropdown-animation show' : 'dropdown-animation'}`}>
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory.includes(category.id) ? "info" : "light"}
                                    className={selectedCategory.includes(category.id) ?
                                        "btn rounded-5 fw-bolder button-category-nav"
                                        :
                                        "btn rounded-5 fw-bolder button-category-nav border-2"
                                    }
                                    onClick={() => toggleCategory(category.id)}
                                >
                                    {category.name}
                                </Button>
                            ))}
                            <Button
                                variant="danger"
                                className="btn rounded-5 fw-bolder button-category-nav"
                                onClick={() => {clearInput(); updateCategory([]) }}
                            >
                                Clear All
                            </Button>
                        </div>
                    )
                }

            {location.pathname.includes("/game") ?
                (<h1 className="text-white">Details</h1>) :
                (
                    <div className="col-11 col-lg-8">
                        <Input className="input rounded-5 border-0" innerRef={inputRef} onChange={(e) => handleInputChange(e)}>
                        </Input>
                    </div>
                )
            }


        </div>

        <div className="d-none d-md-flex flex-wrap  col-2 col-lg-3 justify-content-end align-items-center gap-5">
            <Button variant="outline-secondary" className="d-none d-lg-block button btn btn-outline-light rounded-5 fw-bolder border border-2">SIGN IN</Button>
            <Cart color="white" className="me-5 d-none d-md-block" size="28"/>
        </div>

        </header>
    )
};
export default Header;