import React, {useEffect, useState} from "react";
import "../styles/DefaultPage.css"
import Spinner from "../components/Spinner";
import {useNavigate} from "react-router-dom";
import {Input} from "reactstrap";
import {Button} from "react-bootstrap";
import {updateAccount} from "../utils/UserApi";
import {toast} from "react-toastify";

const UpdateAccount = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    useEffect(() => {
        if(!localStorage.getItem('userData')) {
            navigate("/");
        }
        setName(JSON.parse(localStorage.getItem('userData')).name);
        setSurname(JSON.parse(localStorage.getItem('userData')).surname);

        setTimeout(() => setIsLoading(false), 100);
    }, []);

    const handleUpdate = () => {

        const jsonData = JSON.stringify({
            "name":name,
            "surname":surname
        });

        updateAccount(JSON.parse(localStorage.getItem('userData')).id, jsonData)
            .then((data) => {
                localStorage.removeItem('userData');
                localStorage.setItem('userData', JSON.stringify(data));
                window.location.reload();
            })
            .catch(() => toast.error('Failed to update!',{
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                }));
    };

    return (
        <div className="d-flex flex-column default-page">
            {isLoading ? <Spinner/> :
                <div className="d-flex flex-column align-items-center mt-5 gap-5">
                    <h2 className="text-white">Name</h2>
                    <Input className="rounded-5 flex-wrap w-25 input-text border-0 text-center"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                    <h2 className="text-white">Surname</h2>
                    <Input className="rounded-5 flex-wrap w-25 input-text border-0 text-center"
                           value={surname}
                           onChange={(e) => setSurname(e.target.value)}
                    />
                    <Button variant={"success"}
                            className="fw-bolder rounded-5"
                            onClick={() => handleUpdate()}
                    >
                        Confirm
                    </Button>
                </div>
            }
        </div>
    )
}
export default UpdateAccount;