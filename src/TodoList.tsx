import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { ValuesType } from './App';

type PropsType = {
    track1: string
    track2?: number
    tasks: Array<TasksType>
    removeTask: (task: string) => void
    changeFilter: (value: ValuesType) => void
    addTask: (title: string) => void
}

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: PropsType) => {
    const [title, setTitle] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const removeTaskHandler = (task: string) => {
        props.removeTask(task)
    }

    const changeFilterHandler = (value: ValuesType) => {
        props.changeFilter(value)
    }

    return (
        <div>
            <h3>{ props.track1 }</h3>
            <div>
                <input onChange={ onChangeHandler}
                       value={title}
                       onKeyDown={ onKeyDownHandler }
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                { props.tasks.map((el) => {
                    return (
                        <li key={ el.id }>
                            <button onClick={ () => removeTaskHandler(el.id) }>
                                ✖
                            </button>
                            <input type="checkbox" checked={ el.isDone } />
                            <span>{ el.title }</span>
                        </li>
                    );
                }) }
            </ul>
            <div>
                <button onClick={ () => changeFilterHandler('all') }>All</button>
                <button onClick={ () => changeFilterHandler('active') }>Active</button>
                <button onClick={ () => changeFilterHandler('completed') }>Completed</button>
            </div>
        </div>
    )
}