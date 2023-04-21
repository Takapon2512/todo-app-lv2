import React from 'react'
import { 
    Box
} from '@mui/material'

import { IncompleteTasksItem } from './IncompleteTasksItem'

export const IncompleteTasks = () => {
    return (
        <Box sx={{
            width: '240px',
            mr: 2,
            pt: 1.5
        }}>
            <IncompleteTasksItem />
        </Box>
    )
}
