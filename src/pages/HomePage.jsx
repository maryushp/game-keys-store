import React, {useEffect, useState} from "react";
import {getAllItems} from "../utils/getAllItemAPI";
import {Image} from "react-bootstrap";
import "../styles/HomePage.css"

const HomePage = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            getAllItems()
                .then((data) => {setItems(data.content);})
                .catch((error) => {console.error(error)})
                .finally(() => setTimeout(() => setIsLoading(false), 1))
    }, []);

    return (
        isLoading ? (
            <div>
                <h1>Loading...</h1>
            </div>
        ) : (
            <div className="d-flex flex-wrap justify-content-center home-page">
                {items.map((item) => (
                        <div key={item.id} className="item rounded-4 col-3">
                            <div className="description-container">
                                <h2 className="text-white text-center fw-bolder">{item.description}</h2>
                            </div>
                            <Image className="item-image rounded-4" src = {`data:image/jpg;base64,${item.imageData}`}/>
                            <div className="info-container">
                                <h4 className="text-white text-center fw-bolder">{item.name}</h4>
                                <h5 className="text-white text-center fw-bolder">{item.price}$</h5>
                            </div>
                        </div>
                    ))
                };
            </div>
        )
    );
}

export default HomePage;