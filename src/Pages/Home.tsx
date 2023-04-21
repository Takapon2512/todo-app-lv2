import React from 'react'

import { useRecoilValue } from 'recoil'

import { Register } from '../Components/Register/Register'
import { SignIn } from '../Components/SignIn/SignIn'
import { SignInOrRegisterState } from '../Components/States/States'

export const Home: React.FC = () => {
    const registerOrLoginState = useRecoilValue(SignInOrRegisterState)

    return (
        <>
        {
            registerOrLoginState ? (
                <Register />
            ) : (
                <SignIn />
            )
        }
        </>
    )
}
