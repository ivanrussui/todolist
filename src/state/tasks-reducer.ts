import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionType = RemoveTaskActionType | AddTaskActionType |
    changeTaskStatusActionType | changeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType

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

export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    taskId: string,
    title: string
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
            // map
            return {
                ...state, [action.id]: state[action.id]
                    .map(task => task.id === action.taskId ?
                        {...task, checked: action.checked} : task)
            }

        // find попробуй позже дописать
        // let taskNew = {...state, [action.id]: state[action.id]
        //         .find(task => {task.id === action.taskId})}
        // if (taskNew) {
        //         // taskNew.isDone = action.checked
        //     }

        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.id]: state[action.id]
                    .map(task => task.id === action.taskId ?
                        {...task, title: action.title} : task)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

            // через деструктуризацию
            // let {[action.id]: [], ...rest} = state
            // return rest
        default: return state
            // throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, id: todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, id: todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, checked: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, checked, id: todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, id: todolistId} as const
}