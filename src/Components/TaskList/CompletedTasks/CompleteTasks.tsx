import React from 'react'
import { 
    Box
} from '@mui/material'

import { CompleteTasksItem } from './CompleteTasksItem'

export const CompleteTasks = () => {
    return (
        <Box sx={{
            width: '240px',
            mr: 2,
            pt: 1.5,
            ':last-child': {
                mr: 0
            }
        }}>
            <CompleteTasksItem />
        </Box>
    )
}
