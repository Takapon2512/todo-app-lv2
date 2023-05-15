import React from 'react'
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { 
    CompleteTodosState, 
    ProgressTodosState, 
    SearchCompleteTodosState, 
    TaskDetailState, 
    TaskState ,
    ClickTodoState,
    SearchState
} from '../../States/States'
import { TaskType } from '../../../Types/GlobalType'
import { Undo, Delete } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

import { 
    List,
    Card,
    CardContent,
    Typography,
    Button,
    ButtonGroup
} from '@mui/material'

export const CompleteTasksItem = () => {
    //完了Todoを管理
    const [completeTodos, setCompleteTodos] = useRecoilState(CompleteTodosState)
    //完了（検索モード）Todoを管理
    const searchCompleteTodos = useRecoilValue(SearchCompleteTodosState)

    const [progressTodos, setProgressTodos] = useRecoilState(ProgressTodosState)

    const setTaskStatus = useSetRecoilState(TaskState)
    const setClickTodo = useSetRecoilState(ClickTodoState)

    const setTaskDetail = useSetRecoilState(TaskDetailState)

    //モード（通常・検索）を取得
    const isSearch = useRecoilValue(SearchState)

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

    const handleBack = (item: TaskType, index: number) => {
        const prevCompleteTodos = [...completeTodos]
        prevCompleteTodos.splice(index, 1)
        const newCompleteTodos = [...prevCompleteTodos]
        setCompleteTodos(newCompleteTodos)
        
        const prevProgressTodos = [...progressTodos]
        const newProgressTodos = [...prevProgressTodos, 
            {
                id: item.id,
                todoTitle: item.todoTitle,
                isComplete: item.isComplete,
                taskState: 'progress',
                year: item.year,
                month: item.month,
                date: item.date,
                comment: item.comment
            }
        ]
        const newIdProgressTodos = newProgressTodos.map((todo, index) => ({...todo, id: index + 1}))
        setProgressTodos(newIdProgressTodos)
    }

    const handleDelete = (index: number) => {
        const prevCompleteTodos = [...completeTodos]
        prevCompleteTodos.splice(index, 1)
        const newCompleteTodos = [...prevCompleteTodos]
        setCompleteTodos(newCompleteTodos)
    }

    return (
        <>
        <Typography 
            sx={{
                color: '#4a481b', 
                bgcolor: '#f7f06c',
                py: 0.5,
                px: 1,
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '4px'
            }} 
            component='span'>
                完了
            </Typography>
            <List>
                {   //検索モード
                    isSearch.isCreateDateSearch || isSearch.isTaskNameSearch ? (
                        searchCompleteTodos.map((item: TaskType, index: number) => (
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
                                <CardContent sx={{
                                    p: '12px', 
                                    position: 'relative',
                                    ':last-child': {p: '12px'}
                                }}>
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
                                        onClick={() => handleBack(item, index)}
                                        sx={{
                                            bgcolor: grey[100],
                                            borderColor: grey[400],
                                            ':hover': {
                                                bgcolor: grey[300]
                                            }
                                        }}>
                                            <Undo 
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
                    ) : (
                        completeTodos.map((item: TaskType, index: number) => (
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
                                <CardContent sx={{
                                    p: '12px', 
                                    position: 'relative',
                                    ':last-child': {p: '12px'}
                                }}>
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
                                        onClick={() => handleBack(item, index)}
                                        sx={{
                                            bgcolor: grey[100],
                                            borderColor: grey[400],
                                            ':hover': {
                                                bgcolor: grey[300]
                                            }
                                        }}>
                                            <Undo 
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
                    )
                }
            </List>
        </>
    )
}
