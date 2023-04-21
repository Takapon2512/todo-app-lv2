import React from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    Typography
} from '@mui/material'

export const Header: React.FC = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar 
                position='static' 
                sx={{
                    bgcolor: '#66bb6a',
                    boxShadow: 'none',
                    mb: '2.5rem'
                }}>
                <Toolbar>
                    <Typography 
                        variant='h6' 
                        sx={{
                            flexGrow: 1, 
                            textAlign: 'center'
                        }}
                    >
                        ToDoアプリ
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
