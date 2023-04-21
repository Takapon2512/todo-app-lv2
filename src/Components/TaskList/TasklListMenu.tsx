import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { 
    IncompleteTodosState,
    SearchDateState, 
    SearchIncompleteTodosState,
    SearchState
} from '../States/States'
// import { DateType } from '../../Types/GlobalType'

import { 
    Box,
    Typography,
    Button,
    List,
    ListItem,
    TextField
} from '@mui/material'

import { KeyboardArrowDown } from '@mui/icons-material'
import { grey, green } from '@mui/material/colors'

export const TasklListMenu = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()

    //表示・非表示の共通化
    const [isFilter, setIsFilter] = useState(true) 
    //作成日の検索バーの表示管理
    const [isCreateDate, setIsCreateDate] = useState(false)
    
    // const [isStatus, setIsStatus] = useState(false)
    // const [isTask, setIsTask] = useState(false)

    //年・月・日のインプット管理
    const [inputYear, setInputYear] = useState(String(year))
    const [inputMonth, setInputMonth] = useState(String(month))
    const [inputDate, setInputDate] = useState(String(date))

    const [dateInfo, setDateInfo] = useRecoilState(SearchDateState)

    //各状態のタスクを取得
    const incompleteTodos= useRecoilValue(IncompleteTodosState)

    //検索用の配列にセット
    const setSearchIncompleteTodos = useSetRecoilState(SearchIncompleteTodosState)

    //モード管理（通常・検索モード）
    const setIsSearch =  useSetRecoilState(SearchState)

    const FilterStyle = {
        width: '120px',
        height: '32px',
        border: '1px solid #393939',
        borderRadius: '16px',
        color: "#393939",
        mr: '12px',
        px: '8px',
        py: '4px',
        fontSize: '12px',
        cursor: 'pointer',
        justifyContent: 'center',
        ':hover': {
            bgcolor: grey[300]
        }
    }

    const dateNumberStyle = {
        width: '100px',
        mr: '8px'
    }

    const dateStyle = {
        fontSize: '14px',
        lineHeight: '40px',
        marginRight: '16px'
    }

    const handleFilterChange = () => {
        setIsFilter(!isFilter)
        if (isCreateDate === true) {
            setIsCreateDate(!isCreateDate)
        }
    }

    const handleIsCreateDate = () => {
        setIsCreateDate(!isCreateDate)
        console.log(isCreateDate)
    }

    const handleInputYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (inputYear.length < 4) {
            setInputYear(e.target.value)
        }
    }

    const handleInputMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMonth(e.target.value)
    }

    const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputDate(e.target.value)
    }

    const onClickSearch = () => {
        setIsSearch(true)

        setDateInfo({
            year: inputYear,
            month: inputMonth,
            date: inputDate
        })
        console.log(dateInfo)
        console.log(incompleteTodos)

        const prevIncompleteTodos = [...incompleteTodos]
        const newIncompleteTodos = prevIncompleteTodos.filter(todo => todo.year === dateInfo.year && todo.month === dateInfo.month && todo.date === dateInfo.date)
        setSearchIncompleteTodos(newIncompleteTodos)

    }


    return (
        <>
        <Box 
            sx={{
                width: '90%',
                maxWidth: '720px',
                borderBottom: '1px solid #696969',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
                mx: 'auto'
            }}>
                <Typography 
                variant={'subtitle1'}
                sx={{
                    fontWeight: '600'
                }}
                >
                    タスク一覧
                </Typography>
                <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Button 
                    variant="text" 
                    onClick={handleFilterChange}
                    sx={{
                        color: '#393939', 
                        ':hover': {
                            bgcolor: '#dddddd' 
                            }}}
                        >
                            フィルター
                        </Button>
                </Box>
            </Box>
            {
                isFilter ? (
                <List 
                sx={{
                    width: '90%', 
                    maxWidth: '720px',
                    display: 'flex',
                    marginX: 'auto',
                    mb: 2
                }}>
                    <ListItem 
                    sx={FilterStyle}
                    onClick={handleIsCreateDate}
                    >
                        作成日
                        <KeyboardArrowDown
                        fontSize='small'
                        sx={{ml: '8px'}}
                        />
                    </ListItem>
                    <ListItem sx={FilterStyle}>
                        ステータス
                        <KeyboardArrowDown
                        fontSize='small'
                        sx={{ml: '8px'}}
                        />
                    </ListItem>
                    <ListItem sx={FilterStyle}>
                        タスク名
                        <KeyboardArrowDown
                        fontSize='small'
                        sx={{ml: '8px'}}
                        />
                    </ListItem>
                </List>
                ) : (<></> )
            }
            {
                isCreateDate ? (
                    <Box
                    sx={{
                        width: '90%',
                        maxWidth: '720px',
                        mx: 'auto'
                    }}
                    >
                        <TextField 
                        label='年'
                        value={inputYear}
                        variant='outlined'
                        type='number'
                        size='small'
                        sx={dateNumberStyle}
                        onChange={handleInputYear}
                        />
                        <span style={dateStyle}>年</span>
                        <TextField 
                        label='月'
                        value={inputMonth}
                        variant='outlined'
                        type='number'
                        size='small'
                        sx={dateNumberStyle}
                        onChange={handleInputMonth}
                        />
                        <span style={dateStyle}>月</span>
                        <TextField 
                        label='日'
                        value={inputDate}
                        variant='outlined'
                        type='number'
                        size='small'
                        sx={dateNumberStyle}
                        onChange={handleInputDate}
                        />
                        <span style={dateStyle}>日</span>
                        <Button 
                        variant='contained'
                        disableElevation
                        onClick={onClickSearch}
                        sx={{
                            mb: 0,
                            bgcolor: green[600], 
                            width: '80px',
                            ':hover': {
                                bgcolor: green[500]
                            }
                        }}
                        >
                            検索
                        </Button>
                    </Box>
                ) : (<></>)
            }
        </>
    )
}
