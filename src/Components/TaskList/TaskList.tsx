import React from 'react'
import { 
    Box, 
} from '@mui/material'

import { IncompleteTasks } from './IncompleteTasks/IncompleteTasks'
import { ProgressTasks } from './ProgressTasks/ProgressTasks'
import { CompleteTasks } from './CompletedTasks/CompleteTasks'
import { TasklListMenu } from './TasklListMenu'
import { TaskDetail } from '../TaskDetail/TaskDetail'

export const TaskList = () => {

    return (
        <>
        <TasklListMenu />
        <Box 
        sx={{
            width: '90%', 
            maxWidth: '720px',
            mx: 'auto', 
            mt: 1, 
            color: '#363636',
        }}>
            <Box sx={{
                display: 'flex'
            }}>
                <IncompleteTasks />
                <ProgressTasks />
                <CompleteTasks />
            </Box>
        </Box>
        <TaskDetail />
        </>
    )
}
