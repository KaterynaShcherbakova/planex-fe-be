import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Home } from './Home';
import { useHistory } from 'react-router';

export const RedirectToHome = () => {

    return (
        <>
            {

                window.location.replace('/home')

            }
        </>
    )
}

