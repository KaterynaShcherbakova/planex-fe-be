import React, { useState } from 'react'
import styled from "styled-components";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const RegisterForms = (props) => {

    const [currForm, setCurrForm] = useState(props.def_form);
    const toggleForm = (formName) => {
        setCurrForm(formName);
    }
    return (
        
        <div className="RegisterForm">
            {
                currForm === 'login' ? <Login title="Log In" onFormSwitch={toggleForm} />: <SignUp title="Sign Up" onFormSwitch={toggleForm} />
            }

        </div>

    )

}