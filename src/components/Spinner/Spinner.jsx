import "./Spinner.css"
import {ClipLoader} from "react-spinners";
import React from "react";

const Spinner = () => {
    return (
        <div className="d-flex flex-wrap justify-content-center default-spinner">
            <ClipLoader color="#ffffff" size={60} />
        </div>
    );
};
export default Spinner;