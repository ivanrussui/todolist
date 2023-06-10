import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import './App.css';
import { AddItemForm } from './Components/AddItemForm';
import { EditableSpan } from './Components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}

export function TodolistWithRedux(props: PropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }

    const removeTodolist = () => {
        let action = removeTodolistAC(props.todolistId)
        dispatch(action)
    }
    const changeTodolistNameHandler = (newValue: string) => {
        dispatch(changeTodolistTitleAC(props.todolistId, newValue))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistId, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistId, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistId, "completed"))

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

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
                {tasks.map((el) => {
                    const removeTaskHandler = () => dispatch(removeTaskAC(el.id, props.todolistId))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        // debugger
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(el.id, newIsDoneValue, props.todolistId))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(el.id, newValue, props.todolistId))
                    }

                    return (
                        <div key={el.id} className={el.isDone ? 'isDone' : ''}>
                            <Checkbox
                                checked={el.isDone}
                                color={'secondary'}
                                onChange={onChangeHandler}
                            />
                            <EditableSpan value={el.title} onChange={onTitleChangeHandler} />
                            <IconButton onClick={removeTaskHandler} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    );
                })}
            </div>
            <div>
                <Button color={'success'}
                        variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={'secondary'}
                        variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'info'}
                        variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
                {/*<Button color={'success'}*/}
                {/*        variant={props.filter === 'all' ? 'contained' : 'outlined'}*/}
                {/*        onClick={() => changeFilterHandler('all', props.todolistId)}>All*/}
                {/*</Button>*/}
                {/*<Button color={'secondary'}*/}
                {/*        variant={props.filter === 'active' ? 'contained' : 'outlined'}*/}
                {/*        onClick={() => changeFilterHandler('active', props.todolistId)}>Active*/}
                {/*</Button>*/}
                {/*<Button color={'info'}*/}
                {/*        variant={props.filter === 'completed' ? 'contained' : 'outlined'}*/}
                {/*        onClick={() => changeFilterHandler('completed', props.todolistId)}>Completed*/}
                {/*</Button>*/}
            </div>
        </div>
    )
}
