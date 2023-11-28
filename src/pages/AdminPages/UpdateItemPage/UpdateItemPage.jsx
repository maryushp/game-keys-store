import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getItemById, updateItem} from "../../../utils/api/ItemsAPI";
import "./UpdateItemPage.css"
import {Button, Form, Image, InputGroup} from "react-bootstrap"
import {Input} from "reactstrap";
import {getAllCategories} from "../../../utils/api/CategoriesAPI";
import {toast} from "react-toastify";
import "../../../styles/DefaultPage.css"
import Spinner from "../../../components/Spinner/Spinner";

const UpdateItemPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageBlob, setImageBlob] = useState(null);

    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    const handleData = (data) => {
        setSelectedCategories(data.categories);
        setName(data.name);
        setDescription(data.description);
        setLongDescription(data.longDescription);
        setPrice(data.price);
        setImageBlob(data.imageData);
    }

    useEffect(() => {
        if(!localStorage.getItem('userData')) {
            navigate("/");
        } else if (JSON.parse(localStorage.getItem('userData')).role !== "ADMIN") {
            navigate("/");
        }
        getAllCategories()
            .then((data) => setCategories(data.content))

        getItemById(id)
            .then((data) => handleData(data))
            .finally(() => setTimeout(() => setIsLoading(false), 100))
    }, []);

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
            setImageBlob(new Blob([selectedImage], { type: selectedImage.type }));
        }
    }

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat.id !== category.id));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleUpdateItem = () => {
        const formData = new FormData();

        formData.append('image', imageBlob);

        const itemObject = {
            name: name,
            price: price,
            description: description,
            longDescription: longDescription,
            categories: selectedCategories.map((category) => ({name: category.name})),
        };

        formData.append('patch', new Blob([JSON.stringify(itemObject)], { type: 'application/json' }));

        updateItem(formData, id)
            .then(() => {
                toast.success('Successfully updated!', {
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            })
            .catch( () => toast.error('Error while updating product!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            }))
    }

    return (
        <div className="d-flex flex-column default-page">
            {isLoading ? <Spinner/> :
                (
                    <>
                        <h1 className="text-center text-white fw-bolder mt-4 mb-5">Update product</h1>
                        <div className="d-flex flex-wrap justify-content-center">

                            <div className="d-flex flex-column col-lg-4 col-md-12 col-sm-12 align-items-center">
                                <div className="d-flex flex-column justify-content-center">
                                    <Image src={image ? `${image}` : `data:image/jpg;base64,${imageBlob}`} className="rounded-4 img"></Image>
                                    <Form.Group controlId="formFile" className="my-2">
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="d-flex flex-column col-lg-4 col-md-12 align-items-center">
                                <h2 className="text-white text-center fw-bolder">Name</h2>
                                <Input className="rounded-5 w-75 input-text border-0 my-2"
                                       onChange={(e) => setName(e.target.value)}
                                       value={name}
                                />
                                <h2 className="text-white text-center fw-bolder my-4">Categories</h2>
                                <div className="d-flex flex-wrap justify-content-around gap-5 m-3 text-white">
                                    {categories.map( (category) =>
                                        <Form.Check
                                            inline
                                            type="checkbox"
                                            label={category.name}
                                            checked={selectedCategories.some((selectedCat) => selectedCat.id === category.id)}
                                            onChange={() => toggleCategory(category)}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="d-flex flex-column col-lg-4 col-md-12 align-items-center px-5">
                                <h2 className="text-white text-center fw-bolder">Description</h2>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        aria-label="With textarea"
                                        className="input-text border-0 rounded-3"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </InputGroup>
                                <h2 className="text-white text-center fw-bolder">Long Description</h2>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        aria-label="With textarea"
                                        className="input-text border-0 rounded-3"
                                        value={longDescription}
                                        onChange={(e) => setLongDescription(e.target.value)}
                                    />
                                </InputGroup>
                                <h2 className="text-white text-center fw-bolder">Price</h2>
                                <InputGroup>
                                    <Form.Control
                                        className="rounded-3 input-text border-0"
                                        aria-label="Dollar amount (with dot and two decimal places)"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <InputGroup.Text className="rounded-3 input-text border-0" >$</InputGroup.Text>
                                </InputGroup>
                            </div>

                        </div>

                        <div className="d-flex flex-wrap justify-content-center">
                            <Button variant="success" className="fw-bolder my-5 rounded-5" onClick={handleUpdateItem}>Confirm</Button>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default UpdateItemPage;