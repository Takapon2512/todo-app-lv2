import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { UserState } from '../States/States'

import { Button } from '@mui/material'
import { Camera } from '@mui/icons-material'

import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../Hooks/authFirebase'

export const GoogleLogin = () => {
    const navigate = useNavigate()
    const setIsUser = useSetRecoilState(UserState)
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
        setIsUser(true)
        navigate('/tasks')
    }

    return (
        <>
        <Button 
            type='submit' 
            color='secondary'
            variant='contained'
            fullWidth
            sx={{
                textTransform: 'none',
                mb: 2
            }}
            onClick={signInWithGoogle}
            >
            <Camera fontSize='small' sx={{mr: 1}} />
            <p>Googleアカウントでログイン</p>
        </Button>
        </>
    )
}
