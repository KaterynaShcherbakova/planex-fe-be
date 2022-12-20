import React, { useRef, useEffect, useState } from 'react'
import AxiosClient from '../../utilities/AxiosClient';
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

const LOGIN_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z -]{2,45}$/u;
///^[\p{L} ,.'-]+$/u
const EMAIL_REGEX = /^[\w.]+@[\w]+\.[\w]+$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export const SignUp = (props) => {
    const url = "/user/register";
    const [user] = useState({
        name: "",
        email: "",
        login: "",
        password: ""
    })

    const [name, setName] = useState('');
    const [inpName, setInpName] = useState(false);


    const [login, setLogin] = useState('');
    const [inpLogin, setInpLogin] = useState(false);

    const [email, setEmail] = useState('');
    const [inpEmail, setInpEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [inpPassword, setInpPassword] = useState(false);

    const [confirmPass, setConfirmPass] = useState('');
    const [inpConfirmPass, setInpConfirmPass] = useState(false);



    const [nameError, setNameError] = useState('Name can not be empty!');
    const [loginError, setLoginError] = useState('Login can not be empty!');
    const [emailError, setEmailError] = useState('Email can not be empty!');
    const [passwordError, setPasswordError] = useState('Password can not be empty!');
    const [matchPassError, setMatchPassError] = useState('Confirm Password can not be empty!');
    const [formValid, setFormValid] = useState(false);

    const currPass = useRef(null);

    useEffect(() => {
        if (loginError || passwordError || nameError || emailError || matchPassError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }

    }, [nameError, loginError, emailError, passwordError, matchPassError])



    const nameHandle = (e) => {
        setName(e.target.value)
        if (!NAME_REGEX.test(e.target.value)) {
            setNameError('Name is not valid!');
            if (!e.target.value) {
                setNameError('Name can not be empty!');
            }
        } else {
            user.name = e.target.value;
            setNameError('');
        }


    }

    const loginHandle = (e) => {
        setLogin(e.target.value)
        if (!LOGIN_REGEX.test(e.target.value)) {
            setLoginError('Login is not valid!');
            if (!e.target.value) {
                setLoginError('Login can not be empty!');
            }
        } else {
            user.login = e.target.value;
            setLoginError('');
        }

    }

    const emailHandle = (e) => {
        setEmail(e.target.value)
        if (!EMAIL_REGEX.test(e.target.value)) {
            setEmailError('Email is not valid!');
            if (!e.target.value) {
                setEmailError('Email can not be empty!');
            }
        } else {
            user.email = e.target.value;
            setEmailError('');
        }



    }

    const passwordHandle = (e) => {

        setPassword(e.target.value)
        if (!password) {
            setPasswordError('Password can not be empty!');
        }
        else if (password.length < 8) {
            setPasswordError('Password must be at least 8 charachters long!');
        }
        else if (!PWD_REGEX.test(password)) {
            setPasswordError('Password must contain no symbols, 1 digit, 1 upper and 1 lower letter!');
           
        } else {
            setPasswordError('');
        }

    }
    const confirmPassHandle = (e) => {
        setConfirmPass(e.target.value)
        if (e.target.value != currPass.current.value) {
            setMatchPassError('Passwords do not match!')

            if (!e.target.value) {
                setMatchPassError('Confirm Password can not be empty!');

            }
        }

        else {
            user.password = e.target.value;
            setMatchPassError('');
        }

    }

    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'name':
                setInpName(true)
                break
            case 'login':
                setInpLogin(true)
                break
            case 'email':
                setInpEmail(true)
                break
            case 'password':
                setInpPassword(true)
                break
            case 'confirmPass':
                setInpConfirmPass(true)
                break



        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const goToMain = () => {
        /* window.location.assign('/weekcalendar');*/
        props.onFormSwitch('login')
    }

    function createUser(e) {
        e.preventDefault();
        AxiosClient.post(url, {
            username: user.name,
            login: user.login,
            email: user.email,
            password: user.password
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                goToMain();
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="containerRegForm">
            <form onSubmit={handleSubmit} className="form" id="signup">
                <h1 className="form_title">{props.title}</h1>
                <div form="form_input">
                    <div className="input_success_div">
                        <input
                            name="name"
                            type="text"
                            className={(nameError && inpName) ? "form_input_error" : "form_input_success"}
                            autofocus placeholder="Enter your name"
                            value={name}
                            onChange={e => nameHandle(e)}
                            onBlur={e => blurHandle(e)}
                        />
                        {(inpName && nameError) && <div className="form_message input_error">{nameError} <BsFillXCircleFill className="form_error_icon" /></div>}

                        {(inpName && !nameError) && <div className="form_message input_success"><BsCheckCircleFill className="form_success_icon" /></div>}
                    </div>
                </div>


                <div form="form_input">
                    <div className="input_success_div">
                        <input name="email"
                            type="email"
                            id="email"
                            className={(emailError && inpEmail) ? "form_input_error" : "form_input_success"}
                            autofocus placeholder="Email"
                            value={email}
                            onChange={e => emailHandle(e)}
                            onBlur={e => blurHandle(e)}
                        />
                        {(inpEmail && emailError) && <div className="form_message input_error">{emailError} <BsFillXCircleFill className="form_error_icon" /></div>}

                        {(inpEmail && !emailError) && <div className="form_message input_success"><BsCheckCircleFill className="form_success_icon" /></div>}
                    </div>

                </div>


                <div form="form_input">
                    <div className="input_success_div">
                        <input name="login"
                            type="text"
                            id="login"
                            className={(loginError && inpLogin) ? "form_input_error" : "form_input_success"}
                            autofocus placeholder="Login"
                            value={login}
                            onChange={e => loginHandle(e)}
                            onBlur={e => blurHandle(e)}
                        />
                        {(inpLogin && loginError) && <div className="form_message input_error">{loginError}<BsFillXCircleFill className="form_error_icon" /></div>}

                        {(inpLogin && !loginError) && <div className="form_message input_success"><BsCheckCircleFill className="form_success_icon" /></div>}
                    </div>
                </div>


                <div form="form_input">
                    <div className="input_success_div">
                        <input
                            ref={currPass}
                            name="password"
                            type="password"
                            id="password"
                            className={(passwordError && inpPassword) ? "form_input_error" : "form_input_success"}
                            autofocus placeholder="Password"
                            value={password}
                            onChange={e => passwordHandle(e)}
                            onBlur={e => blurHandle(e)}
                        />
                        {(inpPassword && passwordError) && <div className="form_message input_error">{passwordError} <BsFillXCircleFill className="form_error_icon" /></div>}

                        {(inpPassword && !passwordError) && <div className="form_message input_success"><BsCheckCircleFill className="form_success_icon" /></div>}
                    </div>
                </div>


                <div form="form_input">
                    <div className="input_success_div">
                        <input name="confirmPass"
                            type="password"
                            id="confirm_password"
                            className={(matchPassError && inpConfirmPass) ? "form_input_error" : "form_input_success"}
                            autofocus placeholder="Confirm Password"
                            value={confirmPass}
                            onChange={e => confirmPassHandle(e)}
                            onBlur={e => blurHandle(e)}
                        />
                        {(inpConfirmPass && matchPassError) && <div className="form_message input_error">{matchPassError} <BsFillXCircleFill className="form_error_icon" /></div>}

                        {(inpConfirmPass && !matchPassError) && <div className="form_message input_success"><BsCheckCircleFill className="form_success_icon" /></div>}
                    </div>
                </div>


                <button
                    disabled={!formValid}
                    className="form_button"
                    type="submit"
                    onClick={(e) => createUser(e)}


                >Join</button>

                <p className="form_link" onClick={() => props.onFormSwitch('login')} >Already have an account? Log in</p>

            </form>

        </div >
    )
}