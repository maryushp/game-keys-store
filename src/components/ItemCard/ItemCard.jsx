import React from "react";
import "./ItemCard.css"

import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";
const ItemCard = ({item}) => {
    return(
        <Link to={`/game/${item.id}`}>
            <div key={item.id} className="item rounded-4 col-3 z-5">
                <div className="description-container">
                    <h2 className="text-white text-center fw-bolder">{item.description}</h2>
                </div>
                <Image className="item-image rounded-4" src = {`data:image/jpg;base64,${item.imageData}`}/>
                <div className="info-container mt-4">
                    <h4 className="text-white text-center fw-bolder">{item.name}</h4>
                    <h5 className="text-white text-center fw-bolder">{item.price}$</h5>
                </div>
            </div>
        </Link>
    )
};
export default ItemCard