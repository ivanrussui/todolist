import {FilterValuesType, TasksStateType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTaskActionType | AddTaskActionType | changeTaskStatusActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string,
    taskId: string,
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    id: string,
    title: string,
}

export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    taskId: string,
    checked: boolean
}

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.id]: state[action.id]
                    .filter(task => task.id != action.taskId)
            }
        case "ADD-TASK":
            let task = {id: action.id, title: action.title, isDone: false}
            return {
                ...state, [action.id]: [task, ...state[action.id]]
            }
        case "CHANGE-TASK-STATUS":
            // // достанем нужный массив по todolistId
            // let todolistTasks = tasks[todolistId]
            //
            // // найдем нужную таксу
            // let task = todolistTasks.find(task => task.id === id)
            //
            // // изменим таксу, если она нашлась
            // if (task) {
            //     task.isDone = isDone
            //
            //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            //     setTasks({...tasks})
            // }
            // let todolistTasks = [action.id]
            // let newTask = [...todolistTasks].find()
            // debugger

            // let taskNew = {...state, [action.id]: state[action.id]
            //         .find(task => {task.id === action.taskId})}
            // console.log(taskNew)
            // if (taskNew) {
            //         // taskNew.isDone = action.checked
            //     }

            return {
                ...state
            }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, id: todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, id: todolistId} as const
}

export const changeTaskStatusAC = (
    taskId: string, checked: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, checked, id: todolistId} as const
}