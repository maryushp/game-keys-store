import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import "../styles/OrdersPage.css"
import {getAllOrders, getOrderById} from "../utils/OrderAPI";
import {Button, Image} from "react-bootstrap";
import {Input} from "reactstrap";
import {ArrowLeftCircle, ArrowRightCircle} from "react-bootstrap-icons";
import {toast} from "react-toastify";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState();
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const navigate = useNavigate();

    const [id, setId] = useState("");

    const handleData = (data) => {
        if(data.content) {
            setOrders(data.content);
            setTotalPages(data.totalPages);
            setIsFirst(data.first);
            setIsLast(data.last);
        }
        else {
            setOrders([data]);
            setTotalPages(1);
            setIsFirst(true);
            setIsLast(true);
        }
    }

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

    useEffect(() => {
        setIsLoading(true);
        if(!localStorage.getItem('userData')) {
            navigate("/");
        } else if (JSON.parse(localStorage.getItem('userData')).role !== "ADMIN") {
            navigate("/");
        }
        getAllOrders(currentPage, 6)
            .then((data) => handleData(data))
            .catch((error) => console.log(error))
            .finally(() => setTimeout(() => setIsLoading(false), 100));
    }, [currentPage]);

    const handleSearchByID = () => {
        getOrderById(id)
            .then((data) => handleData(data))
            .catch(() => toast.error('Order not found!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            }))
            .finally(() => setTimeout(() => setIsLoading(false), 100));
    }

    const findAll = () => {
        setId("");
        getAllOrders(currentPage, 6)
            .then((data) => handleData(data))
            .catch((error) => console.log(error))
            .finally(() => setTimeout(() => setIsLoading(false), 100));
    }

    return (
        <div className="d-flex flex-column orders-page">
            {isLoading ? (
                <div className="d-flex flex-wrap justify-content-center orders-spinner">
                    <ClipLoader color="#ffffff" size={60} />
                </div>
            ) :
                <>
                    <div className="d-flex flex-wrap justify-content-center my-5 gap-3">
                        <Input className="rounded-5 w-25 input-text border-0"
                               placeholder="ID"
                               onChange={(e) => setId(e.target.value)}
                               value={id}
                        />
                        <Button className="rounded-5 fw-bolder" onClick={() => handleSearchByID()}>Search</Button>
                        <Button variant="danger" className="rounded-5 fw-bolder" onClick={() => findAll()}>Clear</Button>
                    </div>

                    {orders.map((order) => (
                        <div key={order.id} className="d-flex flex-column text-white my-4">

                            <div className="col-12 text-center">
                                <h1>Order #{order.id}</h1>
                            </div>

                            <div>
                                <h3 className="fw-semibold text-center">{order.user.email}</h3>
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

                </>

            }

        </div>
    )
}

export default OrdersPage;