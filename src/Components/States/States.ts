import { atom } from "recoil";
import { TaskType, TaskStateType, DateType } from "../../Types/GlobalType";

export const SignInOrRegisterState = atom<boolean>({
    key: 'SignInOrRegisterState',
    default: true
})

export const RegisterEmailState = atom<string>({
    key: 'RegisterEmailState',
    default: ''
})

export const RegisterPasswordState = atom<string>({
    key: 'RegisterPassswordState',
    default: ''
})

export const LoginEmailState = atom<string>({
    key: 'LoginEmailState',
    default: ''
})

export const LoginPasswordState = atom<string>({
    key: 'LoginPasswordState',
    default: ''
})

export const UserState = atom<boolean>({
    key: 'UserState',
    default: true   //開発中はtrue
})

export const CardState = atom<boolean>({
    key: 'CardState',
    default: false
})

export const IncompleteTodosState = atom<TaskType[]>({
    key: 'IncompleteTodos',
    default: [
        {
            id: 1, 
            todoTitle: 'あいうえお',
            isComplete: false,
            taskState: 'incomplete',
            year: '2023',
            month: '1',
            date: '23',
            comment: 'おおおおおおおお'
        },
        {
            id: 2, 
            todoTitle: 'かきくけこ',
            isComplete: false,
            taskState: 'incomplete',
            year: '2023',
            month: '2',
            date: '3',
            comment: 'ひゃははははははは'
        }
    ]
})

export const SearchIncompleteTodosState = atom<TaskType[]>({
    key: 'SearchIncompleteTodosState',
    default: []
})

export const ProgressTodosState = atom<TaskType[]>({
    key: 'ProgressTodosState',
    default: [
        {
            id: 1, 
            todoTitle: 'さしすせそ',
            isComplete: false,
            taskState: 'progress',
            year: '2023',
            month: '3',
            date: '29',
            comment: 'わああああああああ'
        },
        {
            id: 2, 
            todoTitle: 'たちつてと',
            isComplete: false,
            taskState: 'progress',
            year: '2023',
            month: '5',
            date: '21',
            comment: 'あーーーーーーー'
        }
    ]
})

export const CompleteTodosState = atom<TaskType[]>({
    key: 'CompleteTodosState',
    default: [
        {
            id: 1,
            todoTitle: 'なにぬねの',
            isComplete: false,
            taskState: 'complete',
            year: '2023',
            month: '6',
            date: '23',
            comment: 'はははははははは'
        },
        {
            id: 2,
            todoTitle: 'まみむめも',
            isComplete: false,
            taskState: 'complete',
            year: '2023',
            month: '8',
            date: '12',
            comment: 'しゃーーーーーー'
        }
    ]
})

export const TaskState = atom<TaskStateType>({
    key: 'TaskState',
    default: {
        todoTitle: '',
        taskState: '',
        year: '',
        month: '',
        date: '',
        comment: ''
    }
})

export const ClickTodoState = atom<number>({
    key: 'ClickTodoState',
    default: 0
})

export const TaskDetailState = atom<string>({
    key: 'TaskDetailState',
    default: ''
})

export const SearchDateState = atom<DateType>({
    key: 'SearchDateState',
    default: {
        year: '',
        month: '',
        date: ''
    }
})

export const SearchState = atom<boolean>({
    key: 'SearchState',
    default: false
})
