import React, {useEffect, useState} from "react";
import {getAllItems} from "../utils/getAllItemsAPI";
import "../styles/HomePage.css"
import {ClipLoader} from "react-spinners";
import ItemCard from "../components/ItemCard";
import {getItemsByCategories} from "../utils/getItemsByCategoriesAPI";
import {Button} from "react-bootstrap";
import {ArrowLeftCircle, ArrowRightCircle} from "react-bootstrap-icons";

const HomePage = ({selectedCategory}) => {
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFirst, setIsFirst] = useState();
    const [isLast, setIsLast] = useState();
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleData = (data) => {
        setItems(data.content);
        setTotalPages(data.totalPages);
        setIsFirst(data.first);
        setIsLast(data.last);
    };

    const handleItemsByCategories = () => {
        setIsLoading(true);
        const fetchData = selectedCategory === null || selectedCategory.length === 0
            ? getAllItems(currentPage)
            : getItemsByCategories(selectedCategory);

        fetchData
            .then(handleData)
            .catch((error) => console.error(error))
            .finally(() => setTimeout(() => setIsLoading(false), 10));
    };

    useEffect(() => {
        handleItemsByCategories();
    },[selectedCategory, currentPage])

    const mainText = items.length === 0
        ? "No matching games found :("
        : selectedCategory.length === 0
            ? "All Games"
            : "Games selected based on your criteria";

    return (
        <div className=" justify-content-center align-content-center">
                {isLoading ? (
                        <div className="d-flex flex-wrap justify-content-center m-5 spinner">
                            <ClipLoader color="#ffffff" size={60}/>
                        </div>
                    ) :
                    (
                        <div className="d-flex flex-column justify-content-center align-content-center">
                            <h1 className="text-center text-white main-text">{mainText}</h1>
                            <div className="d-flex flex-wrap justify-content-center home-page">
                                {items.map((item) => <ItemCard key={item.id} item={item}/>)}
                            </div>
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
                        </div>
                    )
                }

        </div>
    )
}

export default HomePage;