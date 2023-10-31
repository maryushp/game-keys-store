import React, { useEffect, useState } from "react";
import "../styles/UserOrdersPage.css";
import { ClipLoader } from "react-spinners";
import { getUserOrders } from '../utils/OrderAPI';
import {Button, Image} from "react-bootstrap";
import {Link, useNavigate  } from "react-router-dom";

const UserOrdersPage = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const id = userData ? userData.id : null;
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            navigate("/");
            return;
        }
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const userOrders = await getUserOrders(id).finally(() => setTimeout(null, 100));
                setOrders(userOrders.content);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const formattedDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleString(undefined, options).replace(/,/g, '');
    };


    return (
        <div className="d-flex flex-column user-orders-page">
            {isLoading ? (
                <div className="d-flex flex-wrap justify-content-center cart-spinner">
                    <ClipLoader color="#ffffff" size={60} />
                </div>
            ) : orders.length > 0 ?
                (<>
                    {orders.map((order) => (
                        <div key={order.id} className="d-flex flex-column text-white my-4">

                            <div className="col-12 text-center">
                                <h1>Order #{order.id}</h1>
                            </div>

                            <div className="d-flex flex-wrap align-items-center mt-4">
                                <div className="col-6 text-start">
                                    <h3>{formattedDate(order.creationDate)}</h3>
                                </div>
                                <div className="col-6 ">
                                    <h3 className="fw-bolder text-end">{order.cost}$</h3>
                                </div>
                            </div>

                            <div className="my-4 d-flex flex-column align-items-center gap-3">

                                {order.orderItems.map((orderItem) => (
                                    <div key={orderItem.item.id} className="d-flex flex-wrap gap-4">
                                        <Image className="order-items-image" src={`data:image/jpg;base64,${orderItem.item.imageData}`}/>
                                        <h4>{orderItem.item.name}</h4>
                                        <h4>x{orderItem.amount}</h4>
                                    </div>
                                ))}
                            </div>

                            <hr></hr>
                        </div>
                    ))}
                </>)
                :
                ( <div className="empty-cart d-flex flex-column align-items-center">
                    <h1 className="text-white text-center">You have no orders :(</h1>
                    <Link to="/" className="my-5">
                        <Button variant="success" className="rounded-5 fw-bolder">
                            GO SHOPPING
                        </Button>
                    </Link>
                </div>)}
        </div>
    );
}

export default UserOrdersPage;