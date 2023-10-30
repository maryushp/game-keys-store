import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Image} from "react-bootstrap";
import {getItemById} from "../utils/ItemsAPI";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import "../styles/CartPage.css";
import {getCookie, setCookie} from "../utils/CookiesManager";
import {ClipLoader} from "react-spinners";

const CartPage = () => {
    const orderItems = getCookie('cart');
    const [itemsWithQuantity, setItemsWithQuantity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const totalOrderCost = itemsWithQuantity.reduce((total, itemInCart) => {
        const itemPrice = itemInCart.item.price;
        const itemAmount = itemInCart.amount;
        return total + itemPrice * itemAmount;
    }, 0);

    useEffect(() => {
        const fetchItems = async () => {
            if (orderItems) {
                setIsLoading(true);
                const itemPromises = orderItems.orderItems.map(async (orderItem) => {
                    const item = await getItemById(orderItem.item.id);
                    return {item, amount: orderItem.amount};
                });

                const items = await Promise.all(itemPromises);
                setItemsWithQuantity(items);
            }
            setIsLoading(false);
        };

        fetchItems();
    }, []);

    const decreaseQuantity = (id) => {
        const updatedItemsWithQuantity = itemsWithQuantity.map((itemInCart) => {
            if (itemInCart.item.id === id) {
                const updatedItem = { ...itemInCart };
                if (updatedItem.amount > 1) {
                    updatedItem.amount--;
                } else {
                    return null;
                }
                return updatedItem;
            }
            return itemInCart;
        });

        const updatedItemsWithQuantityFiltered = updatedItemsWithQuantity.filter((item) => item !== null);

        setItemsWithQuantity(updatedItemsWithQuantityFiltered);
        updateCart(updatedItemsWithQuantityFiltered);
    };

    const increaseQuantity = (id) => {
        const updatedItemsWithQuantity = itemsWithQuantity.map((itemInCart) => {
            if (itemInCart.item.id === id) {
                const updatedItem = { ...itemInCart };
                updatedItem.amount++;
                return updatedItem;
            }
            return itemInCart;
        });
        setItemsWithQuantity(updatedItemsWithQuantity);
        updateCart(updatedItemsWithQuantity);
    };

    const deleteItemFromCart = (id) => {
        const updatedItemsWithQuantity = itemsWithQuantity.filter((itemInCart) => itemInCart.item.id !== id);
        setItemsWithQuantity(updatedItemsWithQuantity);
        updateCart(updatedItemsWithQuantity);
    };

    const updateCart = (updatedItemsWithQuantity) => {
        const updatedOrderItems = updatedItemsWithQuantity.map((itemInCart) => ({
            item: { id: itemInCart.item.id },
            amount: itemInCart.amount,
        }));
        const updatedCart = { orderItems: updatedOrderItems };
        setCookie('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="d-flex flex-column cart-page">
            {isLoading ? (
                <div className="d-flex flex-wrap justify-content-center cart-spinner">
                    <ClipLoader color="#ffffff" size={60}/>
                </div>
            ) : orderItems && itemsWithQuantity.length > 0 ? (
                <div className=" d-flex flex-column">
                    <div className="d-flex flex-column mt-4">
                        {itemsWithQuantity.map((itemInCart) => (
                            <div className="d-flex flex-wrap gap-5 justify-content-around py-3 border-bottom">
                                <Link to={`/game/${itemInCart.item.id}`}>
                                    <Image className="item-small-image rounded-4"
                                           src={`data:image/jpg;base64,${itemInCart.item.imageData}`}/>
                                </Link>
                                <div className="d-flex flex-column col-4 justify-content-center">
                                    <h2 className="text-center text-white">{itemInCart.item.name}</h2>
                                    <h2 className="text-center text-white">{itemInCart.item.price}$</h2>
                                </div>
                                <div className="d-flex flex-wrap align-content-center justify-content-center gap-3">
                                    <PlusCircle className="rounded-5 text-success icon-buttons" size={40} onClick={() => increaseQuantity(itemInCart.item.id)}>+</PlusCircle>
                                    <h2 className="text-center text-white">{itemInCart.amount}</h2>
                                    <DashCircle className="rounded-5 text-danger icon-buttons" size={40} onClick={() => decreaseQuantity(itemInCart.item.id)}>-</DashCircle>
                                    <Button variant={"danger"} className="rounded-5 mb-1 fw-bolder" onClick={() => deleteItemFromCart(itemInCart.item.id)}>DELETE</Button>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <h2 className="text-center text-white">Total price</h2>
                                    <h2 className="text-center text-white">{(itemInCart.item.price * itemInCart.amount).toFixed(2)}$</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex flex-column align-items-center gap-5 my-5">
                        <h2 className="text-center text-white">Order cost: ${totalOrderCost.toFixed(2)}</h2>
                        <Button variant="success" className="rounded-5 order-button text-center fw-bolder">PLACE
                            ORDER</Button>
                    </div>


                </div>


            ) : (
                <div className="empty-cart d-flex flex-column align-items-center">
                    <h1 className="text-white text-center">Your cart is empty :(</h1>
                    <Link to="/" className="my-5">
                        <Button variant="success" className="rounded-5 fw-bolder">
                            GO SHOPPING
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
