import styled from 'styled-components';

import React, { useRef, useEffect, useState } from 'react'

import './Settings.css';
import { confirmAlert } from 'react-confirm-alert';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AxiosClient from '../../utilities/AxiosClient';
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import ToggleSwitch from './ToggleSwitch';
import { apiDeleteUser, apiEditUser, apiGetUser } from '../../api/user_api';

const LOGIN_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z -]{2,45}$/u;
const EMAIL_REGEX = /^[\w.]+@[\w]+\.[\w]+$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;


const SettingsProfileCont = styled('div')`
    margin: 10% 20% 5% 20%;
`;
const ChangePasswordCont = styled('div')`
    margin-top: 5%;
`;
const ExitDeleteCont = styled('div')`
    margin-top: 5%;
`;
const NotificationCont = styled('div')`
    margin-top: 5%;
`;
const SettingsProfile = () => {
    const [user] = useState({
        updated_name: "",
        updated_email: "",
        updated_login: "",
        password: "",
        updated_password: ""
    })

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => async () => {
        let response = await AxiosClient.get("/user", {});
        if (response.status === 200) {
            console.log(response);
            setUserInfo(response.data);
        }
        else {
            console.log(response);
        }
    }, []);

    function getUserName() {
        return userInfo['username'];
    }
    function getLogin() {
        return userInfo['login'];
    }
    function getEmail() {
        return userInfo['email'];
    }

    const current_password = 'password1Curr'; /*test*/
    const [updated_name, setName] = useState(getUserName());
    const [inpName, setInpName] = useState(false);

    const [updated_login, setLogin] = useState(getLogin());
    const [inpLogin, setInpLogin] = useState(false);

    const [updated_email, setEmail] = useState(getEmail());
    const [inpEmail, setInpEmail] = useState(false);

    const [oldpassword, setOldPassword] = useState('');
    const [inpOldPassword, setInpOldPassword] = useState(false);

    const [updated_password, setPassword] = useState('');
    const [inpPassword, setInpPassword] = useState(false);

    const [confirmPass, setConfirmPass] = useState('');
    const [inpConfirmPass, setInpConfirmPass] = useState(false);



    const [nameError, setNameError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('Current password can not be empty!');
    const [passwordError, setPasswordError] = useState('New password can not be empty!');
    const [matchPassError, setMatchPassError] = useState('Confirm new password can not be empty!');

    const [profileFormValid, setProfileFormValid] = useState(false);
    const [passwordFormValid, setPasswordFormValid] = useState(false);

    const currPass = useRef(null);

    const [currUser, setCurrUser] = useState({});


    useEffect(() => async () => {
        setCurrUser(await apiGetUser());
        console.log(currUser);
    }, []);


    useEffect(() => {
        if (loginError || nameError || emailError) {
            setProfileFormValid(false)
        } else {
            setProfileFormValid(true)
        }
    }, [nameError, loginError, emailError])

    useEffect(() => {
        if (passwordError || oldPasswordError || matchPassError) {
            setPasswordFormValid(false)
        } else {
            setPasswordFormValid(true)
        }
    }, [passwordError, oldPasswordError, matchPassError])

    /* useEffect(() => {
         if (loginError || passwordError || nameError || emailError || matchPassError || oldPassworError) {
             setProfileFormValid(false)
         } else {
             setProfileFormValid(true)
         }
     }, [nameError, loginError, emailError, passwordError, matchPassError, oldPasswordError])
 
 */

   

    const nameHandle = (e) => {
        setName(e.target.value)
        if (!NAME_REGEX.test(e.target.value)) {
            setNameError('Name is not valid!');
            if (!e.target.value) {
                user.updated_name = e.target.placeholder;
                setNameError('');
            }
        } else {
            user.updated_name = e.target.value;
            setNameError('');
        }
    }

    const loginHandle = (e) => {
        setLogin(e.target.value)
        if (!LOGIN_REGEX.test(e.target.value)) {
            setLoginError('Login is not valid!');
            if (!e.target.value) {
                user.updated_login = e.target.placeholder;
                setLoginError('');
            }
        } else {
            user.updated_login = e.target.value;
            setLoginError('');
        }
    }

    const emailHandle = (e) => {
        setEmail(e.target.value)
        if (!EMAIL_REGEX.test(e.target.value)) {
            setEmailError('Email is not valid!');
            if (!e.target.value) {
                user.updated_email = e.target.placeholder;
                setEmailError('');
            }
        } else {
            user.updated_email = e.target.value;
            setEmailError('');
        }
    }

    const oldPasswordHandle = (e) => {
        setOldPassword(e.target.value)
        //if (e.target.value != current_password) {
        //     setOldPasswordError('Incorrect password!')
        if (!e.target.value) {
            setOldPasswordError('Current password can not be empty!');
        }
        // } 
        else {
            setOldPasswordError('');
        }
    }

    const passwordHandle = (e) => {
        setPassword(e.target.value)
        if (!updated_password) {
            setPasswordError('New password can not be empty!');
        }
        else if (updated_password.length < 8) {
            setPasswordError('New password must be at least 8 charachters long!');
        }
        else if (!PWD_REGEX.test(updated_password)) {
            setPasswordError('New password must contain no symbols, 1 digit, 1 upper and 1 lower letter!');

        } else {
            setPasswordError('');
        }
    }

    const confirmPassHandle = (e) => {
        setConfirmPass(e.target.value)
        if (e.target.value != currPass.current.value) {
            setMatchPassError('Passwords do not match!')

            if (!e.target.value) {
                setMatchPassError('Confirm new password can not be empty!');
            }
        }
        else {
            user.updated_password = e.target.value;
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
            case 'curr_password':
                setInpOldPassword(true)
                break
            case 'password':
                setInpPassword(true)
                break
            case 'confirmPass':
                setInpConfirmPass(true)
                break
        }
    }

    const goToMain = () => {
        window.location.assign('/home');
    }

    async function updateUser(e) {
        e.preventDefault();
        console.log(user);
        await apiEditUser(user);
    }

    async function changePass(e) {
        e.preventDefault();
        user.password = oldpassword;
        console.log(user);
        await apiEditUser(user);
    }


    function deleteAccount() {

        confirmAlert({
            title: 'Delete account',
            message: `Are you sure you want to delete account?`,
            buttons: [
                {
                    label: 'Cancel',
                    className: 'settings_del_button'
                },
                {
                    label: 'Delete',
                    onClick: async () => {
                        await apiDeleteUser();
                        goToMain();
                        {/* appState.deleteUser(user)
                  .then(() => {
                    toast.success(`User deleted.`);
                  })
                  .catch(err => {
                    toast.error(`Failed to delete user ${user.username}: ${err.message}`);
                  });*/}
                    }
                }
            ]
        });
    }

    return (
        <SettingsProfileCont>
            <h3 className='settings_title'>Profile<hr className='sett-hr' /></h3>
            <div style={{ "marginTop": "3%" }}>
                <p className='setting_title_item'>Name</p>
                <div className="updated_form_input" form="form_input">
                    <div className="updated_input_success_div">
                        <input
                            name="name"
                            type="text"
                            className={(nameError && inpName) ? "updated_form_input_error" : "updated_form_input_success"}
                            autofocus placeholder={getUserName()}
                            value={updated_name}
                            onChange={e => nameHandle(e)}
                            onBlur={e => blurHandle(e)}
                        />
                        {(inpName && nameError) && <div className="updated_form_message updated_input_error">{nameError}
                            <BsFillXCircleFill className="updated_form_error_icon" /></div>}
                        {(inpName && !nameError) && <div className="form_message updated_input_success">
                            <BsCheckCircleFill className="updated_form_success_icon" /></div>}
                    </div>
                    <p className='setting_title_item'>Login</p>
                    <div className="updated_form_input" form="form_input" style={{ "marginTop": "-7%" }}>
                        <div className="updated_input_success_div">
                            <input name="login"
                                type="text"
                                id="login"
                                className={(loginError && inpLogin) ? "updated_form_input_error" : "updated_form_input_success"}
                                autofocus placeholder={getLogin()}
                                value={updated_login}
                                onChange={e => loginHandle(e)}
                                onBlur={e => blurHandle(e)}
                            />
                            {(inpLogin && loginError) && <div className="updated_form_message updated_input_error">{loginError}
                                <BsFillXCircleFill className="updated_form_error_icon" /></div>}
                            {(inpLogin && !loginError) && <div className="form_message updated_input_success">
                                <BsCheckCircleFill className="updated_form_success_icon" /></div>}
                        </div>
                    </div>
                    <p className='setting_title_item'>Email</p>
                    <div className="updated_form_input" form="form_input" style={{ "marginTop": "-7%" }}>
                        <div className="updated_input_success_div">
                            <input name="email"
                                type="email"
                                id="email"
                                className={(emailError && inpEmail) ? "updated_form_input_error" : "updated_form_input_success"}
                                autofocus placeholder={getEmail()}
                                value={updated_email}
                                onChange={e => emailHandle(e)}
                                onBlur={e => blurHandle(e)}
                            />
                            {(inpEmail && emailError) && <div className="updated_form_message updated_input_error">{emailError}
                                <BsFillXCircleFill className="updated_form_error_icon" /></div>}
                            {(inpEmail && !emailError) && <div className="form_message updated_input_success">
                                <BsCheckCircleFill className="updated_form_success_icon" /></div>}
                        </div>
                    </div>
                </div>
                <div className='set_button'>
                    <button
                        disabled={!profileFormValid}
                        className="settings_button"
                        onClick={(e) => updateUser(e)}
                    >Save</button>
                </div>
            </div>

            <ChangePasswordCont>
                <h3 className='settings_title'>Password<hr className='sett-hr' /></h3>
                <div style={{ "marginTop": "3%" }}>
                    <p className='setting_title_item'>Current password</p>
                    <div className="updated_form_input" form="form_input" style={{ "marginTop": "-2.5%" }}>
                        <div className="updated_input_success_div">
                            <input
                                name="curr_password"
                                type="password"
                                className={(oldPasswordError && inpOldPassword) ? "updated_form_input_error" : "updated_form_input_success"}
                                autofocus placeholder="current password"
                                value={oldpassword}
                                onChange={e => oldPasswordHandle(e)}
                                onBlur={e => blurHandle(e)}

                            />
                            {(inpOldPassword && oldPasswordError) && <div className="updated_form_message updated_input_error">{oldPasswordError}
                                <BsFillXCircleFill className="updated_form_error_icon" /></div>}
                            {(inpOldPassword && !oldPasswordError) && <div className="form_message updated_input_success">
                                <BsCheckCircleFill className="updated_form_success_icon" /></div>}
                        </div>
                    </div>
                    <p className='setting_title_item' style={{ "marginTop": "0%" }}>New password</p>
                    <div className="updated_form_input" form="form_input" style={{ "marginTop": "-2.5%" }}>
                        <div className="updated_input_success_div">
                            <input
                                ref={currPass}
                                name="password"
                                type="password"
                                id="password"
                                className={(passwordError && inpPassword) ? "updated_form_input_error" : "updated_form_input_success"}
                                autofocus placeholder="new password"
                                value={updated_password}
                                onChange={e => passwordHandle(e)}
                                onBlur={e => blurHandle(e)}
                            />
                            {(inpPassword && passwordError) && <div className="updated_form_message updated_input_error">{passwordError}
                                <BsFillXCircleFill className="updated_form_error_icon" /></div>}
                            {(inpPassword && !passwordError) && <div className="form_message updated_input_success">
                                <BsCheckCircleFill className="updated_form_success_icon" /></div>}
                        </div>
                    </div>
                    <p className='setting_title_item' style={{ "marginTop": "0%" }}>Confirm new password</p>
                    <div className="updated_form_input" form="form_input" style={{ "marginTop": "-2.5%" }}>
                        <div className="updated_input_success_div">
                            <input
                                name="confirmPass"
                                type="password"
                                id="confirm_password"
                                className={(matchPassError && inpConfirmPass) ? "updated_form_input_error" : "updated_form_input_success"}
                                autofocus placeholder="new password"
                                value={confirmPass}
                                onChange={e => confirmPassHandle(e)}
                                onBlur={e => blurHandle(e)}
                            />
                            {(inpConfirmPass && matchPassError) && <div className="updated_form_message updated_input_error">{matchPassError}
                                <BsFillXCircleFill className="updated_form_error_icon" /></div>}
                            {(inpConfirmPass && !matchPassError) && <div className="form_message updated_input_success">
                                <BsCheckCircleFill className="updated_form_success_icon" /></div>}
                        </div>
                    </div>
                    <div className='set_button'>
                        <button
                            disabled={!passwordFormValid}
                            className="settings_button"
                            onClick={(e) => changePass(e)}
                        >Change Password</button>
                    </div>
                </div>
            </ChangePasswordCont>
            <NotificationCont>
                <h3 className='settings_title'>Notification<hr className='sett-hr' /></h3>
                <div style={{ "marginTop": "3%" }}>
                    <ToggleSwitch />
                </div>
            </NotificationCont>
            <ExitDeleteCont>
                <h3 className='settings_title'>Delete Account<hr className='sett-hr' /></h3>
                <div style={{ "marginTop": "3%" }}>
                    <p className='setting_title_item' style={{ "marginTop": "0%" }}>If you delete your account, you will permanently lose your profile, events, tasks.<br /> You can't undo this action.</p>
                    <div className='set_button'>
                        <button
                            className="settings_button settings_del_button"
                            onClick={() => deleteAccount()}
                        >Delete Account</button>
                    </div>
                </div>
            </ExitDeleteCont>
        </SettingsProfileCont>

    );
};
export { SettingsProfile };