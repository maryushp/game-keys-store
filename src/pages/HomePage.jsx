import React, {useEffect, useState} from "react";
import {getAllItems} from "../utils/getAllItemAPI";
import "../styles/HomePage.css"
import {ClipLoader} from "react-spinners";
import ItemCard from "../components/ItemCard";

const HomePage = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            getAllItems()
                .then((data) => {setItems(data.content);})
                .catch((error) => {console.error(error)})
                .finally(() => setTimeout(() => setIsLoading(false), 0))
    }, []);

    return (
        <div className="d-flex flex-wrap justify-content-center align-content-center home-page">
            { isLoading ?
                (
                    <div className="d-flex flex-wrap justify-content-center m-5">
                        <ClipLoader color="#ffffff" size={60}/>
                    </div>
                ) :
                (
                    items.map((item) => <ItemCard item={item}/>)
                )
            }
        </div>
    )
}

export default HomePage;