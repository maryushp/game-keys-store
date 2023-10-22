import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import "../styles/ItemPage.css"
import {getItemById} from "../utils/getItemById";
import {ClipLoader} from "react-spinners";
import {Button, Image} from "react-bootstrap";
import {Cart} from "react-bootstrap-icons";

const ItemPage = () => {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getItemById(id)
            .then((data) => setItem(data))
            .catch((error) => console.error(error))
            .finally(() => setTimeout(() => setIsLoading(false), 10));
    }, [id]);


    return (

        <div className="d-flex flex-column flex-lg-row flex-wrap item-page justify-content-around align-content-center">
            { isLoading ?
                (
                    <div className="d-flex flex-wrap justify-content-center m-5">
                        <ClipLoader color="#ffffff" size={60}/>
                    </div>
                ) :
                (
                    <>
                        <div className="purchase-container  col-6 col-md-5 col-lg-3 d-flex flex-column align-items-center align-self-center align-self-lg-auto ">
                            <div>
                                <Image className="details-image rounded-5" src = {`data:image/jpg;base64,${item.imageData}`}/>
                                <div className="d-flex justify-content-between my-3">
                                    <h1 className="text-white mx-4">{item.price}$</h1>
                                    <Button variant="outline-secondary" className="btn btn-outline-success button rounded-5 fw-bolder w-25 mx-4"><Cart size={35}/></Button>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column bio-container col-10  col-lg-7 align-items-center text-center ">
                            <h1 className="text-white fw-bolder text-uppercase">{item.name}</h1>
                            <hr className="border-2 border my-3 w-100"/>
                            <h2 className="text-white m-3">{item.description}</h2>
                            <h4 className="text-white">{item.longDescription}</h4>
                            <hr className="text-white border-2 border my-5 w-100"/>
                            <h3 className="text-white">Categories:</h3>
                            <div className="d-flex flex-wrap justify-content-center gap-5 mt-5">
                                {item.categories.map((category) => (
                                    <div key={category.id}>
                                        <Button className="btn btn-light button-category text-black fw-bolder rounded-4 fs-5">{category.name}</Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </>
                )
            }
        </div>

    )
}

export default ItemPage;