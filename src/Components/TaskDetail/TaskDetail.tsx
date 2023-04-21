import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { TaskState, IncompleteTodosState, ClickTodoState, TaskDetailState } from '../States/States'

import { 
    Box,
    Input,
    Button
} from '@mui/material'
import { green } from '@mui/material/colors'

import { 
    Shield,
    AccessTime
} from '@mui/icons-material'

export const TaskDetail = () => {
    const taskStatus = useRecoilValue(TaskState)
    const setTaskStatus = useSetRecoilState(TaskState)

    const incompleteTodos = useRecoilValue(IncompleteTodosState)
    const setIncompleteTodos = useSetRecoilState(IncompleteTodosState)
    
    const [currentTitle, setCurrentTitle] = useState('')
    
    const [isEditing, setIsEditing] = useState(false)
    
    const todoIndex = useRecoilValue(ClickTodoState)


    const [taskComment, setTaskComment] = useState('')

    //タスクの詳細情報を受け取る
    const taskDetail = useRecoilValue(TaskDetailState)

    useEffect(() => {
        setTaskComment(taskDetail)
    }, [taskDetail])

    const translation = () => {
        switch(taskStatus.taskState) {
            case 'incomplete':
                return '未着手'
            case 'progress':
                return '進行中'
            case 'complete':
                return '完了'
            default:
                return ''
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value)
    }

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskComment(e.target.value)
    }

    const editingTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (currentTitle !== '' && e.keyCode === 13) {
            setTaskStatus((prevTodoTitle) => (
                {...prevTodoTitle, todoTitle: currentTitle}
            ))
            setIncompleteTodos((prevTodos) => (
                prevTodos.map((todo, index) => (
                    todoIndex === index ? {...todo, todoTitle: currentTitle} : {...todo, todoTitle: todo.todoTitle} 
                ))
            ))
            setIsEditing(false)
            console.log(incompleteTodos)
        }
    }

    const onFocusJudge = () => {
        setCurrentTitle(taskStatus.todoTitle)
        setIsEditing(true)
    }

    const onBlurJudge = () => {
        if (currentTitle !== '') {
            setTaskStatus((prevTodoTitle) => (
                {...prevTodoTitle, todoTitle: currentTitle}
            ))
        }
        
        setIsEditing(false)
    }

    const onClickComment = () => {
        setIncompleteTodos((prevTodos) => (
            prevTodos.map((todo, index) => (
                todoIndex === index ? {...todo, comment: taskComment} : {...todo, comment: todo.comment}
            ))
        ))
    }

    return (
        <>
        <Box>
            <Box>
                <Input 
                fullWidth
                value={ isEditing ? currentTitle : taskStatus.todoTitle }
                onFocus={onFocusJudge}
                onBlur={onBlurJudge}
                onChange={handleTitleChange}
                onKeyDown={editingTitle}
                sx={{
                    fontSize: '36px',
                    fontWeight: '600'
                }}
                />
            </Box>
            <Box mt={3}>
                <Box sx={{display: 'flex'}}>
                    <Box sx={{
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '160px',
                        height: '38px'
                    }}>
                        <Shield sx={{ mr: '8px', pb: '2px' }} fontSize='small' />
                        <span>
                            ステータス
                        </span>
                    </Box>
                    <span style={{
                        lineHeight: '38px'
                    }}>
                        {translation()}
                    </span>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <Box sx={{
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '160px',
                        height: '38px'
                    }}>
                        <AccessTime sx={{ mr: '8px', pb: '2px' }} fontSize='small' />
                        <span>
                            作成日
                        </span>
                    </Box>
                    <span style={{
                        lineHeight: '38px'
                    }}>
                        <span style={{marginRight: '8px'}}>{taskStatus.year}</span>年
                        <span style={{marginRight: '8px', marginLeft: '12px'}}>{taskStatus.month}</span>月
                        <span style={{marginRight: '8px', marginLeft: '12px'}}>{taskStatus.date}</span>日
                    </span>
                </Box>
                <textarea 
                placeholder='コメントを追加'
                value={taskComment}
                onChange={handleCommentChange}
                style={{
                    minHeight: '4em',
                    width: '100%',
                    padding: '12px 8px',
                    marginTop: '24px',
                    marginBottom: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    border: 'none',
                }} />
                <Button 
                    type='submit' 
                    variant='contained'
                    disableElevation
                    onClick={onClickComment}
                    sx={{
                        mb: 2, 
                        bgcolor: green[600], 
                        width: '160px',
                        ':hover': {
                            bgcolor: green[500]
                        }
                    }}
                >
                    コメントする
                </Button>
            </Box>
        </Box>
        </>
    )
}
