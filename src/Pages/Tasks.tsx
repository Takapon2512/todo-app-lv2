import React from 'react'
import { UserState } from '../Components/States/States'
import { useRecoilValue } from 'recoil'
import { Navigate } from 'react-router-dom'

import { Header } from '../Components/Header/Header'
import { SignOut } from '../Components/SignOut/SignOut'
import { InputTodo } from '../Components/InputTodo/InputTodo'
import { TaskList } from '../Components/TaskList/TaskList'

export const Tasks = () => {
    const isUser = useRecoilValue(UserState)
    return (
        <>
        {
            isUser ? (
                <>
                <Header />
                <SignOut />
                <InputTodo />
                <TaskList />
                </>
            ) : (
                <Navigate to='/'/>
            )
        }
        </>
    )
}
