import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './Components/AddItemForm';
import { ButtonAppBar } from './Components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodolistWithRedux } from './TodolistWithRedux';
import { useCallback } from 'react';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

//  функции тудулистов
    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    },[])

    const changeTodolistName = useCallback((todolistId: string, newValue: string) => {
        const action = changeTodolistTitleAC(todolistId, newValue)
        dispatch(action)
    },[])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

//  функции тасок
    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    },[])

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    },[])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    },[])

    const changeTaskName = useCallback((id: string, newValue: string, todolistId: string) => {
        const action = changeTaskTitleAC(id, newValue, todolistId)
        dispatch(action)
    },[])

    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            // let allTodolistTasks = tasks[todolist.id]
                            // let tasksForTodolist = allTodolistTasks
                            let tasksForTodolist = tasks[todolist.id]

                            // if (todolist.filter === "active") {
                            //     tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            // }
                            // if (todolist.filter === "completed") {
                            //     tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            // }
                            return <Grid item key={todolist.id}>
                                <Paper elevation={5} style={{ padding: '10px' }}>
                                    <Todolist
                                        todolistId={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                        // tasks={tasks[todolist.id]}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskName={changeTaskName}
                                        changeTodolistName={changeTodolistName}
                                    />
                                    {/*<TodolistWithRedux*/}
                                    {/*                   todolistId={todolist.id}*/}
                                    {/*                   title={todolist.title}*/}
                                    {/*                   filter={todolist.filter}*/}
                                    {/* ниже по сути не нужны, ждет 3 параметра  */}
                                    {/*                   // tasks={tasksForTodolist}*/}
                                    {/*                   // removeTask={removeTask}*/}
                                    {/*                   // changeFilter={changeFilter}*/}
                                    {/*                   // addTask={addTask}*/}
                                    {/*                   // changeTaskStatus={changeTaskStatus}*/}
                                    {/*                   // removeTodolist={removeTodolist}*/}
                                    {/*                   // changeTaskName={changeTaskName}*/}
                                    {/*                   // changeTodolistName={changeTodolistName}*/}
                                    {/*/>*/}
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
