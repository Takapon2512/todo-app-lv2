import React from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
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
import { 
    SignInOrRegisterState, 
    RegisterEmailState,
    RegisterPasswordState,
    UserState
} from '../States/States'


export const Register = () => {
    const setIsRegister = useSetRecoilState(SignInOrRegisterState)

    const [registerEmail, setRegisterEmail] = useRecoilState(RegisterEmailState)
    const [registerPassword, setRegisterPassword] = useRecoilState(RegisterPasswordState)

    const setUser = useSetRecoilState(UserState)

    const navigate = useNavigate()

    const handleChange = () => {
        setIsRegister(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((currentUser) => {
            console.log(currentUser)
            setUser(true)
            navigate('/tasks')

            setRegisterEmail('')
            setRegisterPassword('')
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
                サインアップ
            </Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <TextField 
                label='メールアドレス'
                variant='standard'
                fullWidth
                required
                sx={{mb: 2}}
                value={registerEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterEmail(e.target.value)}
                />
                <TextField 
                type='password'
                label='パスワード'
                variant='standard'
                fullWidth
                required
                value={registerPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterPassword(e.target.value)}
                />
                <Box mt={5}>
                    <Button 
                    type='submit' 
                    color='primary' 
                    variant='contained'
                    fullWidth
                    sx={{mb: 2}}
                    >
                        登録する
                    </Button>
                    <Typography>
                        <span>
                            アカウントをお持ちの方もしくは
                            <br />
                            Googleアカウントをお持ちの方は
                        </span>
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