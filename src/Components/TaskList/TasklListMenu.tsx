import React, { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { 
    IncompleteTodosState,
    ProgressTodosState,
    CompleteTodosState,
    SearchIncompleteTodosState,
    SearchProgressTodosState,
    SearchCompleteTodosState,
    SearchDateState, 
    SearchState,
    SearchTaskNameState,
} from '../States/States'

import { 
    Box,
    Typography,
    Button,
    List,
    ListItem,
    TextField
} from '@mui/material'

import { KeyboardArrowDown } from '@mui/icons-material'
import { grey, green, red } from '@mui/material/colors'

export const TasklListMenu = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()

    const [isFilter, setIsFilter] = useState(true) 
    //作成日の検索バーの表示管理
    const [isCreateDate, setIsCreateDate] = useState(false)
    // //タスク名の検索バーの表示管理
    const [isSearchTask, setIsSearchTask] = useState(true)

    const [inputSearchTask, setInputSearchTask] = useState('')
    const [searchTaskName, setSearchTaskName] = useRecoilState(SearchTaskNameState)
    
    // const [isStatus, setIsStatus] = useState(false)
    // const [isTask, setIsTask] = useState(false)

    //年・月・日のインプット管理
    const [inputYear, setInputYear] = useState(`${year}`)
    const [inputMonth, setInputMonth] = useState(`${month}`)
    const [inputDate, setInputDate] = useState(`${date}`)

    const [dateInfo, setDateInfo] = useRecoilState(SearchDateState)

    //各状態のタスクを取得
    const incompleteTodos= useRecoilValue(IncompleteTodosState)
    const progressTodos = useRecoilValue(ProgressTodosState)
    const completeTodos = useRecoilValue(CompleteTodosState)

    //検索用の配列にセット
    const setSearchIncompleteTodos = useSetRecoilState(SearchIncompleteTodosState)
    const setSearchProgressTodos = useSetRecoilState(SearchProgressTodosState)
    const setSearchCompleteTodos = useSetRecoilState(SearchCompleteTodosState)

    //モード管理（通常・検索モード）
    const [isSearch, setIsSearch] =  useRecoilState(SearchState)

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
        //フィルターを押したときに作成日もしくはタスク名の検索バーが表示されている場合は閉じる
        if (isCreateDate === true) setIsCreateDate(!isCreateDate)
        if (isSearchTask === true) setIsSearchTask(!isSearchTask)
    }

    const handleIsCreateDate = () => {
        //作成日ボタンを押したときの処理
        setIsCreateDate(!isCreateDate)
        if (isSearchTask === true) setIsSearchTask(!isSearchTask)
    }

    const handleInputYear = (e: React.ChangeEvent<HTMLInputElement>) => setInputYear(e.target.value)
    const handleInputMonth = (e: React.ChangeEvent<HTMLInputElement>) => setInputMonth(e.target.value)
    const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => setInputDate(e.target.value)
    const handleInputSearchTask = (e: React.ChangeEvent<HTMLInputElement>) => setInputSearchTask(e.target.value)
    
    const handleSearchTaskName = () => {
        setIsSearch((prevState) => ({ ...prevState, isTaskNameSearch: true }))
        setSearchTaskName(inputSearchTask)

        const prevIncompleteTodos = [...incompleteTodos]
        const newIncompleteTodos = prevIncompleteTodos.filter(todo => todo.todoTitle === inputSearchTask)
        setSearchIncompleteTodos(newIncompleteTodos)

        const prevProgressTodos = [...progressTodos]
        const newProgressTodos = prevProgressTodos.filter(todo => todo.todoTitle === inputSearchTask)
        setSearchProgressTodos(newProgressTodos)

        const prevCompleteTodos = [...completeTodos]
        const newCompleteTodos = prevCompleteTodos.filter(todo => todo.todoTitle === inputSearchTask)
        setSearchCompleteTodos(newCompleteTodos)

        //ログ確認用
        const Todos = [...newIncompleteTodos, ...newProgressTodos, ...newCompleteTodos]
        console.log(Todos)
    }

    const handleSearchTask = () => {
        //タスク名ボタンを押したときの処理
        setIsSearchTask(!isSearchTask)
        if (isCreateDate === true) setIsCreateDate(!isCreateDate)
    }

    const onClickSearch = () => {
        setIsSearch((prevState) => ({ ...prevState, isCreateDateSearch: true }))
        setIsCreateDate(false)
        
        //未着手Todoをフィルタリング
        const prevIncompleteTodos = [...incompleteTodos]
        const newIncompleteTodos = prevIncompleteTodos.filter(todo => todo.year === dateInfo.year && todo.month === dateInfo.month && todo.date === dateInfo.date)
        setSearchIncompleteTodos(newIncompleteTodos)

        //進行中Todoをフィルタリング
        const prevProgressTodos = [...progressTodos]
        const newProgressTodos = prevProgressTodos.filter(todo => todo.year === dateInfo.year && todo.month === dateInfo.month && todo.date === dateInfo.date)
        setSearchProgressTodos(newProgressTodos)

        //完了Todoをフィルタリング
        const prevCompleteTodos = [...completeTodos]
        const newCompleteTodos = prevCompleteTodos.filter(todo => todo.year === dateInfo.year && todo.month === dateInfo.month && todo.date === dateInfo.date )
        setSearchCompleteTodos(newCompleteTodos)
    }

    useEffect(() => {
        setDateInfo({
            year: inputYear,
            month: inputMonth,
            date: inputDate
        })
    }, [setDateInfo, inputYear, inputMonth, inputDate])

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
                    mb: 1
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
                    <ListItem 
                    sx={FilterStyle}
                    onClick={handleSearchTask}
                    >
                        タスク名
                        <KeyboardArrowDown
                        fontSize='small'
                        sx={{ml: '8px'}}
                        />
                    </ListItem>
                </List>
                ) : (<></>)
            }
            {
                isCreateDate && isFilter ? (
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
            {
                isSearchTask && isFilter ? (
                    <Box
                    sx={{
                        width: '90%',
                        maxWidth: '720px',
                        mx: 'auto',
                    }}
                    >
                        <TextField 
                        sx={{
                            mr: '8px',
                        }}
                        id="outlined-search" 
                        label="タスク名を入力" 
                        size='small'
                        value={inputSearchTask}
                        onChange={handleInputSearchTask}
                        />
                        <Button 
                        variant='contained'
                        disableElevation
                        onClick={handleSearchTaskName}
                        sx={{
                            mb: 0,
                            bgcolor: green[600], 
                            width: '80px',
                            height: '40px',
                            ':hover': {
                                bgcolor: green[500]
                            }
                        }}
                        >
                            検索
                        </Button>
                    </Box>
                ):(<></>)
            }
            {
                isSearch.isCreateDateSearch ? (
                    <Box
                    sx={{
                        width: '90%',
                        maxWidth: '720px',
                        mx: 'auto',
                        display: 'flex'
                    }}
                    >
                        <Typography 
                        sx={{
                            color: '#fff', 
                            bgcolor: '#43a047',
                            py: 0.5,
                            px: 1,
                            fontSize: '12px',
                            borderTopLeftRadius: '4px',
                            borderBottomLeftRadius: '4px',
                            width: '160px'
                        }} 
                        component='div'
                        >
                            <span style={{marginRight: '4px'}}>{inputYear} 年</span>
                            <span style={{marginRight: '4px'}}>{inputMonth} 月</span>
                            <span style={{marginRight: '4px'}}>{inputDate} 日</span>
                            で検索中
                        </Typography>
                        <Button
                        variant='contained'
                        disableElevation
                        onClick={() => setIsSearch((prevState) => ({ ...prevState, isCreateDateSearch: false }))}
                        sx={{
                            bgcolor: red[500], 
                            width: '40px',
                            p: 0,
                            borderRadius: 0,
                            borderTopRightRadius: '4px',
                            borderBottomRightRadius: '4px',
                            ':hover': {
                                bgcolor: red[400]
                            }
                        }}
                        >
                            削除
                    </Button>
                    </Box>
                ) : (<></>)
            }
        </>
    )
}
