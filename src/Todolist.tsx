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
import { Task } from './Task';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TasksType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTodolistName: (todolistId: string, updateTitle: string) => void
    removeTodolist: (id: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskName: (todolistId: string, taskId: string, updateTitle: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    // console.log("Todolist called")

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [ props.addTask, props.todolistId ])

    const changeFilterHandler = useCallback((value: FilterValuesType, todolistId: string) => {
        props.changeFilter(value, todolistId)
    }, [ props.changeFilter, props.todolistId ])

    const changeTodolistNameHandler = useCallback((newValue: string) => {
        props.changeTodolistName(props.todolistId, newValue)
    }, [ props.changeTodolistName, props.todolistId ])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(task => task.isDone)
    }

    const changeTaskNameHandler = useCallback((id: string, newValue: string) => {
        props.changeTaskName(id, newValue, props.todolistId)
    }, [ props.changeTaskName, props.todolistId ])

    const removeTaskHandler = useCallback((id: string) => {
        props.removeTask(id, props.todolistId)
    }, [ props.removeTask, props.todolistId ])

    const changeCheckBox = useCallback((id: string, isDone: boolean) => {
        props.changeTaskStatus(id, isDone, props.todolistId)
    }, [ props.changeTaskStatus, props.todolistId ])

    return (
        <div>
            <div>
                <EditableSpan value={props.title}
                              onChange={changeTodolistNameHandler}
                />
                <IconButton onClick={removeTodolist} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </div>
            <AddItemForm addItem={addTask} />
            <div>
                {/*{props.tasks.map((el) => {*/}
                {tasksForTodolist.map((el) => {
                    return (
                        <Task
                            key={el.id}
                            task={el}
                            changeTaskStatus={changeCheckBox}
                            changeTaskName={changeTaskNameHandler}
                            removeTask={removeTaskHandler}
                        />
                    );
                })}
            </div>
            <div style={{ marginTop: '5px', display: 'flex', gap: '5px' }}>
                <Button color={'success'}
                        variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('all', props.todolistId)}>All
                </Button>
                <Button color={'secondary'}
                        variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('active', props.todolistId)}>Active
                </Button>
                <Button color={'info'}
                        variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => changeFilterHandler('completed', props.todolistId)}>Completed
                </Button>
            </div>
        </div>
    )
})