import React from 'react'
import { useSetRecoilState } from 'recoil'
import { UserState } from '../States/States'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { auth } from '../../Hooks/authFirebase'

export const SignOut = () => {
    const navigate = useNavigate()

    const setUser = useSetRecoilState(UserState)

    const logout = async () => {
        await auth.signOut()
        setUser(false)
        navigate('/')
    }

    return (
        <Button 
            type='submit' 
            variant='contained'
            disableElevation
            sx={{
                mb: 2, 
                bgcolor: red[500], 
                width: '160px',
                position: 'absolute',
                top: 12,
                right: 24,
                ':hover': {
                    bgcolor: red[400]
                }
            }}
            onClick={logout}
        >
            ログアウト
        </Button>
    )
}
