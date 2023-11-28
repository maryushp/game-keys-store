import React, {useEffect, useState} from "react";
import {searchItemsByName, getAllItems} from "../../utils/api/ItemsAPI";
import "./HomePage.css"
import {ClipLoader} from "react-spinners";
import ItemCard from "../../components/ItemCard/ItemCard";
import {getItemsByCategories} from "../../utils/api/CategoriesAPI";
import {Button} from "react-bootstrap";
import {ArrowLeftCircle, ArrowRightCircle} from "react-bootstrap-icons";

const HomePage = ({selectedCategory, inputResult}) => {
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFirst, setIsFirst] = useState();
    const [isLast, setIsLast] = useState();
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const size = Math.floor((window.innerWidth * 0.9) / 350) * 2

    const handleData = (data) => {
        setItems(data.content);
        setTotalPages(data.totalPages);
        setIsFirst(data.first);
        setIsLast(data.last);
    };

    const handleGetItems = () => {
        setIsLoading(true);

        const fetchData = selectedCategory === null || selectedCategory.length === 0
            ? getAllItems(currentPage, size)
            : getItemsByCategories(selectedCategory, currentPage, size);

        fetchData
            .then(handleData)
            .catch((error) => console.error(error))
            .finally(() => setTimeout(() => setIsLoading(false), 10));

    };

    const handleSearchItems = () => {
        setIsLoading(true);

        searchItemsByName(inputResult, currentPage, size)
            .then(handleData)
            .catch(() => setItems([]))
            .finally(() => setTimeout(() => setIsLoading(false), 100));
    };

    useEffect(() => {
        if (inputResult == "" || selectedCategory.length > 0)
            handleGetItems();
    },[selectedCategory, currentPage])

    useEffect(() => {
        if (inputResult === "") {
            handleGetItems()
        } else {
            handleSearchItems()
        }
    }, [inputResult, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [inputResult, selectedCategory])

    const mainText = items.length === 0
        ? "No matching games found :("
        : selectedCategory.length === 0 && inputResult == ""
            ? "All Games"
            : "Games selected based on your criteria";

    return (
        <div className="justify-content-center align-content-center">
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