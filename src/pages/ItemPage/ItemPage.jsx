import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "./ItemPage.css"
import {getItemById, deleteItem} from "../../utils/api/ItemsAPI";
import {ClipLoader} from "react-spinners";
import {Button, Image, Modal} from "react-bootstrap";
import {Cart, Check} from "react-bootstrap-icons";
import {toast} from 'react-toastify';
import {setCookie, getCookie} from '../../utils/CookiesManager'

const ItemPage = ({updateCategory}) => {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [added, setAdded] = useState(false)
    const [show, setShow] = useState(false);

    useEffect(() => {
        getItemById(id)
            .then((data) => setItem(data))
            .catch((error) => console.error(error))
            .finally(() => setTimeout(() => setIsLoading(false), 100));
    }, [id]);


    const handleCartUpdate = () => {
        if (!localStorage.getItem('userData')) {
            toast.error('You need to Sign in!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        const cart = getCookie('cart');
        const itemIdToCheck = item.id;

        if (cart) {

            cart.orderItems.push({
                item: {id: itemIdToCheck},
                amount: 1,
            });

            setCookie('cart', JSON.stringify(cart));

            toast.success('Product added to the cart!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });

            setAdded(true);

        } else {
            const newCart = {
                orderItems: [
                    {
                        item: {id: itemIdToCheck},
                        amount: 1,
                    },
                ],
            };

            setCookie('cart', JSON.stringify(newCart))

            toast.success('Product added to the cart!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });

            setAdded(true);
        }
    }
    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const handleDelete = () => {
        setIsLoading(true);
        deleteItem(item.id);
        navigate("/");
    }

    const handleUpdate = () => {
        navigate(`/update-item/${id}`);
    }

    const isItemInCart = () => {
        const cart = getCookie('cart');
        if (!cart) {
            return false;
        }

        const itemInCart = cart.orderItems.find((orderItem) => orderItem.item.id === item.id);
        return !!itemInCart;
    }

    return (

        <div className="d-flex flex-column flex-lg-row flex-wrap item-page justify-content-around align-content-center">
            {isLoading ?
                (
                    <div className="d-flex flex-wrap justify-content-center m-5">
                        <ClipLoader color="#ffffff" size={60}/>
                    </div>
                ) :
                (
                    <>
                        <div
                            className="purchase-container  col-6 col-md-5 col-lg-3 d-flex flex-column align-items-center align-self-center align-self-lg-auto ">
                            <div>
                                <Image className="details-image rounded-5"
                                       src={`data:image/jpg;base64,${item.imageData}`}/>
                                <div className="d-flex justify-content-between my-3">
                                    <h1 className="text-white mx-4">{item.price}$</h1>
                                    {localStorage.getItem('userData') ?
                                        (JSON.parse(localStorage.getItem('userData')).role === "ADMIN" ?
                                            (
                                                <>
                                                    <Button
                                                        variant="danger"
                                                        className="rounded-5 fw-bolder mx-4"
                                                        onClick={handleShow}
                                                    >
                                                        DELETE
                                                    </Button>

                                                    <Button
                                                        variant="warning"
                                                        className="rounded-5 fw-bolder"
                                                        onClick={handleUpdate}
                                                    >
                                                        UPDATE
                                                    </Button>
                                                </>
                                            )
                                            :
                                            (<Button
                                                variant="outline-secondary"
                                                className={isItemInCart() || added ? `btn btn-outline-success button rounded-5 fw-bolder w-25 mx-4 disabled` : `btn btn-outline-success button rounded-5 fw-bolder w-25 mx-4`}
                                                onClick={handleCartUpdate}>
                                                {isItemInCart() || added ? <Check size={35}/> : <Cart size={35}/>}
                                            </Button>))
                                        :
                                        (<Button
                                            variant="outline-secondary"
                                            className={isItemInCart() || added ? `btn btn-outline-success button rounded-5 fw-bolder w-25 mx-4 disabled` : `btn btn-outline-success button rounded-5 fw-bolder w-25 mx-4`}
                                            onClick={handleCartUpdate}>
                                            {isItemInCart() || added ? <Check size={35}/> : <Cart size={35}/>}
                                        </Button>)
                                    }
                                </div>
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose} backdrop="static">
                            <Modal.Header closeButton>
                                <Modal.Title>Delete confirmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want delete this product?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleClose}>
                                    Decline
                                </Button>
                                <Button variant="success"
                                        onClick={handleDelete}>
                                    Confirm
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div
                            className="d-flex flex-column bio-container col-10  col-lg-7 align-items-center text-center ">
                            <h1 className="text-white fw-bolder text-uppercase">{item.name}</h1>
                            <hr className="border-2 border my-3 w-100"/>
                            <h2 className="text-white m-3">{item.description}</h2>
                            <h4 className="text-white">{item.longDescription}</h4>
                            <hr className="text-white border-2 border my-5 w-100"/>
                            <h3 className="text-white">Categories:</h3>
                            <div className="d-flex flex-wrap justify-content-center gap-5 mt-5">
                                {item.categories.map((category) => (
                                    <div key={category.id}>
                                        <Button
                                            className="btn btn-light button-category text-black fw-bolder rounded-4 fs-5"
                                            onClick={() => {
                                                navigate("/")
                                                updateCategory([category.id]);
                                            }}
                                        >
                                            {category.name}</Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </>
                )
            }
        </div>

    )
}

export default ItemPage;