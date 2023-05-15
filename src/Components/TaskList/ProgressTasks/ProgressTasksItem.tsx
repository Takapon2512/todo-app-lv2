import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { 
    ProgressTodosState,
    SearchProgressTodosState, 
    TaskState, 
    ClickTodoState, 
    TaskDetailState, 
    CompleteTodosState, 
    IncompleteTodosState,
    SearchState
} from '../../States/States'
import { TaskType } from '../../../Types/GlobalType'
import { Check, Delete, Undo } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

import { 
    List,
    Card,
    CardContent,
    Typography,
    Button,
    ButtonGroup
} from '@mui/material'

export const ProgressTasksItem = () => {
    //進行中のTodoを管理
    const [progressTodos, setProgressTodos] = useRecoilState(ProgressTodosState)
    //進行中（検索モード）のTodoを管理
    const searchProgressTodos = useRecoilValue(SearchProgressTodosState)

    const [completeTodos, setCompleteTodos] = useRecoilState(CompleteTodosState)
    const [incompleteTodos, setIncompleteTodos] = useRecoilState(IncompleteTodosState)

    const setTaskStatus = useSetRecoilState(TaskState)

    const setClickTodo = useSetRecoilState(ClickTodoState)

    //クリックしたタスクの詳細情報をセット
    const setTaskDetail = useSetRecoilState(TaskDetailState)

    //モード(通常・検索)の受け取り
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

    const handleStateChange = (item: TaskType, index: number) => {
        const prevProgressTodos = [...progressTodos]
        prevProgressTodos.splice(index, 1)
        const newProgressTodos = [...prevProgressTodos]
        setProgressTodos(newProgressTodos)

        const prevCompleteTodos = [...completeTodos]
        const newCompleteTodos = [...prevCompleteTodos, {
            id: prevCompleteTodos.length + 1,
            todoTitle: item.todoTitle,
            isComplete: item.isComplete,
            taskState: 'complete',
            year: item.year,
            month: item.month,
            date: item.date,
            comment: item.comment
        }]
        setCompleteTodos(newCompleteTodos)
    }

    const handleBack = (item: TaskType, index: number) => {
        const prevProgressTodos = [...progressTodos]
        prevProgressTodos.splice(index, 1)

        const newProgressTodos = [...prevProgressTodos]
        setProgressTodos(newProgressTodos)


        const prevIncompleteTodos = [...incompleteTodos]
        const newIncompleteTodos =  [...prevIncompleteTodos, 
            {
                id: item.id,
                todoTitle: item.todoTitle,
                isComplete: item.isComplete,
                taskState: 'incomplete',
                year: item.year,
                month: item.month,
                date: item.date,
                comment: item.comment
            }
        ]
        const newIdIncompleteTodos = newIncompleteTodos.map((todo, index) => ({...todo, id: index + 1}) )
        setIncompleteTodos(newIdIncompleteTodos)
    }

    const handleDelete = (index: number) => {
        const prevProgressTodos = [...progressTodos]
        prevProgressTodos.splice(index, 1)
        const newProgressTodos = [...prevProgressTodos]
        setProgressTodos(newProgressTodos)
        setProgressTodos(prevTodos => (prevTodos.map((todo, index) => ({...todo, id: index + 1}))))
    }

    return (
        <>
        <Typography 
            sx={{
                color: '#337236', 
                bgcolor: '#91e595',
                py: 0.5,
                px: 1,
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '4px'
            }} 
            component='span'>
                進行中
            </Typography>
            <List>
                {   //検索モード
                    isSearch.isCreateDateSearch || isSearch.isTaskNameSearch ? (
                        searchProgressTodos.map((item, index) => (
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
                                    ':last-child': { p: '12px' }
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
                                            }}
                                            />
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
                        //通常モード
                        progressTodos.map((item, index) => (
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
                                    ':last-child': { p: '12px' }
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
                                            }}
                                            />
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
