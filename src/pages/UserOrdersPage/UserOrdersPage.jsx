import React, { useEffect, useState } from "react";
import "../AdminPages/OrdersPage/OrdersPage.css";
import "../../styles/DefaultPage.css"
import { getUserOrders } from '../../utils/api/OrderAPI';
import {Button, Image} from "react-bootstrap";
import {Link, useNavigate  } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import {ArrowLeftCircle, ArrowRightCircle} from "react-bootstrap-icons";

const UserOrdersPage = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const id = userData ? userData.id : null;
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState();
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    useEffect(() => {
        if (!userData) {
            navigate("/");
            return;
        }
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const userOrders = await getUserOrders(id, currentPage).finally(() => setTimeout(null, 100));
                setOrders(userOrders.content);
                setTotalPages(userOrders.totalPages);
                setIsFirst(userOrders.first);
                setIsLast(userOrders.last);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, currentPage]);

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
        <div className="d-flex flex-column default-page">
            {isLoading ? (
                <Spinner/>
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
                    <div className="mt-5 d-flex flex-wrap justify-content-center mb-5">
                        <ArrowLeftCircle
                            className={`m-2 ${isFirst ? "disabled text-secondary" : "text-white page-arrow"}`}
                            size={36}
                            onClick={isFirst ? null : () => setCurrentPage(currentPage - 1)}
                        />

                        {pageNumbers.map((pageNumber) => (
                            <Button
                                key={pageNumber}
                                variant={pageNumber === currentPage ? "light" : "outline-light"}
                                className={`m-2 rounded-5 ${currentPage === pageNumber ? "disabled" : ""}`}
                                onClick={() => setCurrentPage(pageNumber)}
                            >
                                {pageNumber}
                            </Button>
                        ))}

                        <ArrowRightCircle
                            className={`m-2 ${isLast ? "disabled text-secondary" : "text-white page-arrow"}`}
                            size={36}
                            onClick={isLast ? null : () => setCurrentPage(currentPage + 1)}
                        />
                    </div>
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