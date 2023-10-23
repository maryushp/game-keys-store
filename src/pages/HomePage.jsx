import React, {useEffect, useState} from "react";
import {getAllItems} from "../utils/getAllItemsAPI";
import "../styles/HomePage.css"
import {ClipLoader} from "react-spinners";
import ItemCard from "../components/ItemCard";
import {getItemsByCategories} from "../utils/getItemsByCategoriesAPI";

const HomePage = ({selectedCategory}) => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleItemsByCategories = () => {
        console.log("-----------------------------------------------------------------")
        console.log("Is empty - " + selectedCategory);
        setIsLoading(true)
        if(selectedCategory === null || selectedCategory.length === 0) {
            getAllItems()
                .then((data) => {
                    console.log("contet when not filtering in handleItemsByCat" + data.content);
                    setItems(data.content);
                })
                .catch((error) => {
                    console.error(error)
                })
                .finally(() => setTimeout(() => setIsLoading(false), 100))
        } else {
            console.log("categories selected in Home: " + selectedCategory);
            getItemsByCategories(selectedCategory)
                .then((data) => {
                    console.log("contet when filtering in handleItemsByCat" + data.content);
                    setItems(data.content)})
                .catch((error) => console.log(error))
                .finally(() => setTimeout(() => setIsLoading(false), 100))
        }
        console.log("-----------------------------------------------------------------")
    }

    useEffect(() => {
        handleItemsByCategories();
    },[selectedCategory])

    return (
        <div className=" justify-content-center align-content-center">
                { isLoading ?
                    (
                        <div className="d-flex flex-wrap justify-content-center m-5 spinner">
                            <ClipLoader color="#ffffff" size={60}/>
                        </div>
                    ) :
                    (
                        <div className="d-flex flex-column justify-content-center align-content-center">
                            <h1 className="text-center text-white main-text">
                                {items.length === 0
                                    ? "No matching games found :("
                                    : selectedCategory.length === 0
                                        ? "All Games"
                                        : "Games selected based on your criteria"
                                }
                            </h1>
                            <div className="d-flex flex-wrap justify-content-center home-page">
                                {items.map((item) => <ItemCard key={item.id} item={item}/>)}
                            </div>
                        </div>
                    )
                }

        </div>
    )
}

export default HomePage;