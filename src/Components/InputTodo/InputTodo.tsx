import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { IncompleteTodosState } from '../States/States';

import { 
    Box, 
    Paper, 
    TextField, 
    Typography 
} from '@mui/material'
import { TaskOutlined } from '@mui/icons-material';

export const InputTodo = () => {
    const [inputTodo, setInputTodo] = useState('')
    const [todos, setTodos] = useRecoilState(IncompleteTodosState)

    const onChangeTodotext = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTodo(e.target.value)
    }

    const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (inputTodo !== '' && e.keyCode === 13) {
            const now = new Date()

            const year = now.getFullYear()
            const month = now.getMonth() + 1
            const date = now.getDate()

            const oldTodos = [...todos]
            const newTodos = [...oldTodos, 
                {
                    id: oldTodos.length + 1,
                    todoTitle: inputTodo,
                    isComplete: false,
                    taskState: 'incomplete',
                    year: String(year),
                    month: String(month),
                    date: String(date),
                    comment: ''
                }
            ]

            setTodos(newTodos)
            setInputTodo('')
            console.log(newTodos)
        }
    }

    return (
        <Box sx={{width: '90%', maxWidth: '720px', m: 'auto', color: 'rgb(54, 54, 54)'}}>
            <Box sx={{display: 'flex', mb: 2}}>
                <TaskOutlined fontSize='large' sx={{mr: 1, pt: '3px'}} />
                <Typography variant={'h4'} fontWeight={'600'}>
                    タスク管理
                </Typography>
            </Box>
            <Paper sx={{p: 2}}>
                <TextField 
                id="outlined-search" 
                label="新規ToDoを入力後にEnter" 
                fullWidth
                onChange={onChangeTodotext}
                value={inputTodo}
                onKeyDown={addTodo}
                />
            </Paper>
        </Box>
    )
}
