import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../Hooks/authFirebase'

import { 
    Box, 
    Paper, 
    Grid, 
    Avatar,
    Typography,
    TextField,
    Button
} from '@mui/material'
import { green } from '@mui/material/colors'
import { LockOutlined } from '@mui/icons-material'

import { Header } from '../Header/Header'
import { GoogleLogin } from '../GoogleLogin/GoogleLogin'
import { 
    SignInOrRegisterState, 
    LoginEmailState,
    LoginPasswordState, 
    UserState
} from '../States/States'

export const SignIn = () => {
    const setIsRegister = useSetRecoilState(SignInOrRegisterState)

    const [loginEmail, setLoginEmail] = useRecoilState(LoginEmailState)
    const [loginPassword, setLoginPassword] = useRecoilState(LoginPasswordState)

    const toTasksNavigate = useNavigate()

    const setUser = useSetRecoilState(UserState)

    const handleChange = () => {
        setIsRegister(true)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((currentUser) => {
                console.log(currentUser)
                setUser(true)
                toTasksNavigate('/tasks')

                setLoginEmail('')
                setLoginPassword('')
            })
            .catch((error) => {
                alert(error.message)
                console.error(error)
            })
    }

    return (
        <Box>
            <Header />
            <Paper
                elevation={1}
                sx={{
                    p: 4,
                    width: '320px',
                    m: '20px auto'
                }}>
            <Grid
                container
                direction='column'
                justifyContent='flex-start'
                alignItems='center'
            >
            <Avatar sx={{bgcolor: green[400]}}>
                <LockOutlined />
            </Avatar>
            <Typography variant={'h5'} sx={{m: '30px'}}>
                サインイン
            </Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <TextField 
                label='メールアドレス'
                variant='standard'
                fullWidth
                required
                sx={{mb: 2}}
                value={loginEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value)}
                />
                <TextField 
                type='password'
                label='パスワード'
                variant='standard'
                fullWidth
                required
                value={loginPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)}
                />
                <Box mt={5}>
                    <Button 
                    type='submit' 
                    color='primary' 
                    variant='contained'
                    fullWidth
                    sx={{mb: 2}}
                    >
                        ログインする
                    </Button>
                    <GoogleLogin />
                    <Typography>
                        <span>パスワードを忘れましたか？</span>
                    </Typography>
                    <Typography>
                        <span>アカウントを持っていない方は</span>
                        <span 
                        onClick={() => handleChange()}
                        style={{
                            color: '#1976d2',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}>
                            こちらへ
                        </span>
                    </Typography>
                </Box>
            </form>
            </Paper>
        </Box>
    )
}