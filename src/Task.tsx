import React, { ChangeEvent, useCallback } from 'react';
import { FilterValuesType } from './App';
import './App.css';
import { AddItemForm } from './Components/AddItemForm';
import { EditableSpan } from './Components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { changeTodolistFilterAC } from './state/todolists-reducer';
import { TasksType } from './Todolist';

type PropsType = {
    task: TasksType
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskName: (taskId: string, updateTitle: string) => void
    removeTask: (id: string) => void
}

export const Task = React.memo(({
                                    task,
                                    changeTaskStatus,
                                    changeTaskName,
                                    removeTask
                                }: PropsType) => {
    console.log("Task called")

    const removeTaskHandler = () => {
        removeTask(task.id)
    }

    const changeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        let isDone = e.currentTarget.checked
        changeTaskStatus(task.id, isDone)
    }

    const changeTaskNameHandler = useCallback((newValue: string) => {
        changeTaskName(task.id, newValue)
    }, [ changeTaskName, task.id ])


    return (
        <div className={task.isDone ? 'isDone' : ''}>
            <Checkbox
                checked={task.isDone}
                onChange={changeCheckBox}
                color={'secondary'}
            />
            <EditableSpan value={task.title}
                          onChange={changeTaskNameHandler}
            />
            <IconButton onClick={removeTaskHandler} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </div>
    )
})