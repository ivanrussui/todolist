import React from 'react';
import { ValuesType } from './App';

type PropsType = {
    track1: string
    track2?: number
    tasks: Array<TasksType>
    removeTask: (task: string) => void
    changeFilter: (value: ValuesType) => void
    addTask: () => void
}

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: PropsType) => {
    return (
        <div>
            <h3>{ props.track1 }</h3>
            <div>
                <input />
                <button onClick={props.addTask}>+</button>
            </div>
            <ul>
                { props.tasks.map((el) => {
                    return (
                        <li key={ el.id }>
                            <button onClick={ () => props.removeTask(el.id) }>
                                ✖
                            </button>
                            <input type="checkbox" checked={ el.isDone } />
                            <span>{ el.title }</span>
                        </li>
                    );
                }) }
            </ul>
            <div>
                <button onClick={ () => props.changeFilter('all') }>All</button>
                <button onClick={ () => props.changeFilter('active') }>Active</button>
                <button onClick={ () => props.changeFilter('completed') }>Completed</button>
            </div>
        </div>
    )
}