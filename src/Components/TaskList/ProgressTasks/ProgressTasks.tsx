import React from 'react'
import { 
    Box
} from '@mui/material'

import { ProgressTasksItem } from './ProgressTasksItem'

export const ProgressTasks = () => {
    return (
        <Box sx={{
            width: '240px',
            mr: 2,
            pt: 1.5
        }}>
            <ProgressTasksItem />
        </Box>
    )
}
