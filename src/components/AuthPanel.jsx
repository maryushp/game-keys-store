import React, {useRef, useState} from "react";
import {Button} from "react-bootstrap";
import "../styles/AuthPanel.css"
import {Input} from "reactstrap";
import {authenticate, register} from "../utils/AuthApi";
import {getUser} from "../utils/UserApi";
import {setCookie, removeCookie} from '../utils/CookiesManager'

const AuthPanel = () => {
    const [signInIsClicked, setSignInClicked] = useState(true)
    const [signUpIsClicked, setSignUpClicked] = useState(false)

    const inputRefEmailSignIn = useRef(null)
    const inputRefPassSignIn = useRef(null)

    const inputRefNameSignUp = useRef(null)
    const inputRefSurnameSignUp = useRef(null)
    const inputRefEmailSignUp = useRef(null)
    const inputRefPassSignUp = useRef(null)

    const [signInEmail, setSignInEmail] = useState("")
    const [signInPassword, setSignInPassword] = useState("")

    const [error, setError] = useState(false)

    const [signUpName, setSignUpName] = useState("")
    const [signUpSurname, setSignUpSurname] = useState("")
    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPass, setSignUpPass] = useState("")

    const [signUpError, setSignUpError] = useState(false)

    const [errorText, setErrorText] = useState("")

    const toggleSignInOption = () => {
        setSignUpClicked(false)
        setSignInClicked(true)
        clearSignUpInput()
    }

    const toggleSignUpOption = () => {
        setSignUpClicked(true)
        setSignInClicked(false)
        clearSignInInput()
    }

    const clearSignInInput = () => {
        inputRefEmailSignIn.current.value = ""
        inputRefPassSignIn.current.value = ""
    }

    const clearSignUpInput = () => {
        inputRefNameSignUp.current.value = ""
        inputRefSurnameSignUp.current.value = ""
        inputRefEmailSignUp.current.value = ""
        inputRefPassSignUp.current.value = ""
    }

    const handleData = (data) => {
        setCookie("token", data.token)
    }

    const handleSignIn = () => {
        handleAuthenticate()
    }

    const handleUserData = (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
    }

    const handleSignOut = () => {
        removeCookie('token')
        removeCookie('cart')
        localStorage.removeItem('userData')
        window.location.reload();
    }

    const handleAuthenticate = () => {
        authenticate(signInEmail, signInPassword)
            .then((data) => {
                handleData(data);
                getUser(data.id)
                    .then((data) => handleUserData(data))
                    .catch(() => setError(true))
                    .finally(() => {
                        if (!error) {
                            setTimeout(() => window.location.reload(), 100);
                        }
                    });
            })
            .catch(() => setError(true))
            .finally();
    }

    const handleSignUp = () => {
        if (signUpPass.length < 8) {
            setErrorText("Password should have at least 8 chars!");
            setSignUpError(true);
        }
        else if (!signUpEmail.includes("@")) {
            setErrorText("Enter a valid email!");
            setSignUpError(true);
        }
        else if (signUpName === "") {
            setErrorText("Name cannot be empty!");
            setSignUpError(true);
        }
        else if (signUpSurname === ""){
            setErrorText("Surname cannot be empty!");
            setSignUpError(true);
        }
        else
            handleRegister()
    }

    const handleRegister = () => {
        register(signUpName, signUpSurname, signUpEmail, signUpPass)
            .then((data) => {
                handleData(data);
                getUser(data.id)
                    .then((data) => handleUserData(data))
                    .catch(() => {setSignUpError(true); setErrorText("Try another credentials!")})
                    .finally(() => {
                        if (!signUpError) {
                            setTimeout(() => window.location.reload(), 100)
                        }
                    });
            })
            .catch(() => {setSignUpError(true); setErrorText("Try another credentials!")})
            .finally();
    }

    return (
        <div className={`d-lg-flex d-none flex-column position-absolute gap-3 p-5 auth-panel shadow-lg`}>

            { localStorage.getItem('userData') ?
                (   <>
                        <h1 className="text-white text-center">Welcome,</h1>
                        <div className="d-flex flex-wrap gap-2">
                            <h3 className="text-white text-center">{JSON.parse(localStorage.getItem('userData')).name}</h3>
                            <h3 className="text-white text-center">{JSON.parse(localStorage.getItem('userData')).surname}</h3>
                        </div>
                        <Button variant="danger" className="rounded-5" onClick={handleSignOut}>Sign Out</Button>
                    </>
                )
                :
                (<>
                        <div className="d-flex flex-wrap gap-5">
                            <Button variant={signInIsClicked ? `info` : `outline-light`} className={signInIsClicked ? `disabled mx-3 rounded-5 fw-bolder`: `mx-3 rounded-5 fw-bolder`} onClick={toggleSignInOption}>SIGN IN</Button>
                            <Button variant={signUpIsClicked ? `info` : `outline-light`} className={signUpIsClicked ? `disabled mx-3 rounded-5 fw-bolder`: `mx-3 rounded-5 fw-bolder`} onClick={toggleSignUpOption}>SIGN UP</Button>
                        </div>

                        <div className="d-flex flex-column align-items-center my-5 p-3">
                            {signInIsClicked ?
                                (
                                    <div className="d-flex flex-column align-items-center">
                                        <h3 className="text-white text-center">Email</h3>
                                        <Input placeholder="Email" innerRef={inputRefEmailSignIn} onChange={(e) => {setSignInEmail(e.target.value); setError(false)}} className="rounded-5 userDataInput my-3"/>
                                        <h3 className="text-white text-center">Password</h3>
                                        <Input type="password" innerRef={inputRefPassSignIn} onChange={(e) => {setSignInPassword((e.target.value)); setError(false)}} placeholder="Password" className="rounded-5 userDataInput my-3"/>
                                        <Button variant="success"
                                                className="my-5 w-50 rounded-5"
                                                onClick={handleSignIn}>SUBMIT</Button>
                                        {error ? <h4 className="text-danger text-center">Wrong credentials!</h4> : <></>}

                                    </div>
                                )
                                :
                                (
                                    <div className="d-flex flex-column align-items-center">
                                        <h3 className="text-white text-center">Name</h3>
                                        <Input placeholder="Name"
                                               innerRef={inputRefNameSignUp}
                                               className="rounded-5 userDataInput my-3"
                                               onChange={(e) => {setSignUpName(e.target.value); setSignUpError(false)}}
                                        />

                                        <h3 className="text-white text-center">Surname</h3>
                                        <Input placeholder="Surname"
                                               innerRef={inputRefSurnameSignUp}
                                               className="rounded-5 userDataInput my-3"
                                               onChange={(e) => {setSignUpSurname(e.target.value); setSignUpError(false)}}
                                        />

                                        <h3 className="text-white text-center">Email</h3>
                                        <Input placeholder="Email"
                                               innerRef={inputRefEmailSignUp}
                                               className="rounded-5 userDataInput my-3"
                                               type = "email"
                                               onChange={(e) => {setSignUpEmail(e.target.value); setSignUpError(false)}}
                                        />

                                        <h3 className="text-white text-center">Password</h3>
                                        <Input type="password"
                                               innerRef={inputRefPassSignUp}
                                               placeholder="Password"
                                               className="rounded-5 userDataInput my-3"
                                               onChange={(e) => {setSignUpPass(e.target.value); setSignUpError(false)}}/>

                                        <Button variant="success" className="my-3 w-50 rounded-5" onClick={handleSignUp}>SUBMIT</Button>
                                        {signUpError ? <h4 className="text-danger text-center">{errorText}</h4> : <></>}
                                    </div>
                                )
                            }
                        </div>
                    </>)
            }




        </div>
    )
}

export default AuthPanel;