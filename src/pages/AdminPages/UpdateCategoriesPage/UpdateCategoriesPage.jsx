import React, {useEffect, useState} from "react";
import {getAllCategories, updateCategory} from "../../../utils/api/CategoriesAPI";
import "../../../styles/DefaultPage.css"
import Spinner from "../../../components/Spinner/Spinner";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Input} from "reactstrap";
import {toast} from "react-toastify";


const UpdateCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        if(!localStorage.getItem('userData')) {
            navigate("/");
        } else if (JSON.parse(localStorage.getItem('userData')).role !== "ADMIN") {
            navigate("/");
        }
        getAllCategories()
            .then((data) => setCategories(data.content))
            .finally(() => setTimeout(() => setIsLoading(false), 100));
    }, []);

    const handleInputChange = (categoryID, inputValue) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [categoryID]: inputValue,
        }));
    };

    const handleButtonClick = (categoryID) => {
        const inputValue = inputValues[categoryID];
        updateCategory(inputValue, categoryID)
            .then(() => window.location.reload())
            .catch(() => toast.error('Order not found!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            }));
    };

    return (
        <div className="d-flex flex-column default-page">
            {isLoading ?
                <Spinner/>
                :
                <>
                    <h1 className="text-center text-white my-3">Update Categories</h1>
                    <div className="d-flex flex-wrap gap-5 my-5 justify-content-center">
                        {categories.map((category) => (
                            <div className="d-flex flex-column border p-5">
                                <h2 className="text-center text-white">{category.name}</h2>
                                <Input className="rounded-5 border-0 my-4 input-text"
                                       placeholder={category.name}
                                       onChange={(e) => handleInputChange(category.id, e.target.value)}
                                />
                                <Button className="rounded-5"
                                        variant="success"
                                        onClick={() => handleButtonClick(category.id)}
                                >
                                    Submit
                                </Button>
                            </div>
                        ))}

                    </div>
                </>
            }
        </div>



    )
}

export default UpdateCategoriesPage;