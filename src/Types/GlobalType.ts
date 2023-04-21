export type TaskType = {
    id: number,
    todoTitle: string,
    isComplete: boolean,
    taskState: string,
    year: string,
    month: string,
    date: string,
    comment: string
}

export type TaskStateType = {
    todoTitle: string,
    taskState: string,
    year: string,
    month: string,
    date: string,
    comment: string
}

export type DateType = {
    year: string,
    month: string,
    date: string
}