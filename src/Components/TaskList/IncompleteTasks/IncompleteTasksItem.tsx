import React from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { 
    IncompleteTodosState, 
    TaskState, 
    ClickTodoState, 
    TaskDetailState, 
    ProgressTodosState 
} from '../../States/States'
import { TaskType } from '../../../Types/GlobalType'
import { Check, Delete } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

import { 
    List,
    Card,
    CardContent,
    Typography,
    Button,
    ButtonGroup
} from '@mui/material'

export const IncompleteTasksItem = () => {
    //未着手Todoの配列を管理
    const [incompleteTodos, setIncompleteTodos] = useRecoilState(IncompleteTodosState)
    //進行中Todoの配列に未着手のTodoをセットするために呼び出す
    const [progressTodos, setProgressTodos] = useRecoilState(ProgressTodosState)

    const setTaskStatus = useSetRecoilState(TaskState)

    const setClickTodo = useSetRecoilState(ClickTodoState)

    //クリックしたタスクの詳細情報をセット
    const setTaskDetail = useSetRecoilState(TaskDetailState)

    
    const onCardClick = (item: TaskType, index: number) => {
        setTaskStatus({
            todoTitle: item.todoTitle,
            taskState: item.taskState,
            year: item.year,
            month: item.month,
            date: item.date,
            comment: item.comment
        })
        setTaskDetail(item.comment)
        setClickTodo(index)
    }

    console.log(incompleteTodos)
    const handleStateChange = (item: TaskType, index: number) => {
        //現在の未着手Todoの配列を取得
        const prevIncompleteTodos = [...incompleteTodos]
        //クリックしたTodoを未着手Todoから消去する
        prevIncompleteTodos.splice(index, 1)

        const newIncompleteTodos = [...prevIncompleteTodos]
        setIncompleteTodos(newIncompleteTodos)
        
        const prevProgressTodos = [...progressTodos]
        const newProgressTodos = [...prevProgressTodos, {
            id: prevProgressTodos.length + 1,
            todoTitle: item.todoTitle,
            isComplete: item.isComplete,
            taskState: 'progress',
            year: item.year,
            month: item.month,
            date: item.date,
            comment: item.comment
        }]
        setProgressTodos(newProgressTodos)
    }

    const handleDelete = (index: number) => {
        const prevIncompleteTodos = [...incompleteTodos]
        prevIncompleteTodos.splice(index, 1)
        const newIncompleteTodos = [...prevIncompleteTodos]
        setIncompleteTodos(newIncompleteTodos)
        setIncompleteTodos(prevtodos => prevtodos.map((todo, index) => ({...todo, id: index + 1})))
    }
 
    return (
        <>
        <Typography 
            sx={{
                color: '#ff2c2c', 
                bgcolor: '#f3bed3',
                py: 0.5,
                px: 1,
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '4px'
            }} 
            component='span'>
                未着手
            </Typography>
            <List>
                {
                    incompleteTodos.map((item: TaskType, index) => (
                        <Card sx={{
                            mb: 1,
                            ':hover': {
                                cursor: 'pointer',
                                bgcolor: '#efefef'
                            }
                            }}
                            key={item.id}
                            onClick={() => onCardClick(item, index)}
                            >
                            <CardContent 
                            sx={{
                                p: '12px', 
                                position: 'relative',
                                ':last-child': {p: '12px'}
                            }} 
                            >
                                {item.todoTitle}
                                <ButtonGroup 
                                    size='small'
                                    variant='contained'
                                    sx={{
                                        p: '0px',
                                        position: 'absolute',
                                        zIndex: 2,
                                        top: '10px',
                                        right: '8px',
                                        opacity: 0,
                                        transition: 'opacity 0.2s',
                                        ':last-child': {p: '0px'},
                                        ':hover': {
                                            opacity: 1
                                        }
                                    }}>
                                    <Button 
                                    onClick={() => handleStateChange(item, index)}
                                    sx={{
                                        bgcolor: grey[100],
                                        borderColor: grey[400],
                                        ':hover': {
                                            bgcolor: grey[300]
                                        }
                                    }}>
                                        <Check 
                                        fontSize='small' 
                                        sx={{
                                            color: grey[500],
                                        }}/>
                                    </Button>
                                    <Button
                                    onClick={() => handleDelete(index)}
                                    sx={{
                                        bgcolor: grey[100],
                                        ':hover': {
                                            bgcolor: grey[300]
                                        }
                                    }}>
                                        <Delete 
                                        fontSize='small' 
                                        sx={{color: grey[500]}}
                                        />
                                    </Button>
                                </ButtonGroup>
                            </CardContent>
                        </Card>
                    ))
                }
            </List>
        </>
    )
}
