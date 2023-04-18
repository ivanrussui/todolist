import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { ValuesType } from './App';
import './App.css';

type PropsType = {
  track1: string
  track2?: number
  tasks: Array<TasksType>
  removeTask: (task: string) => void
  changeFilter: (value: ValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (id: string, isDoneValue: boolean) => void
  filter: string
}

type TasksType = {
  id: string
  title: string
  isDone: boolean
}

export const TodoList = (props: PropsType) => {
  const [ title, setTitle ] = useState('');
  const [ error, setError ] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }

  const addTaskHandler = () => {
    if (title.trim() !== '') {
      setTitle('')
      props.addTask(title.trim())
    } else {
      setError('Title is required')
    }
  }

  const removeTaskHandler = (task: string) => {
    props.removeTask(task)
  }

  const changeFilterHandler = (value: ValuesType) => {
    props.changeFilter(value)
  }

  const changeCheckBox = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    let isDoneValue = e.currentTarget.checked
    props.changeTaskStatus(id, isDoneValue)
  }

  return (
      <div>
        <h3>{ props.track1 }</h3>
        <div>
          <input onChange={ onChangeHandler }
                 value={ title }
                 onKeyDown={ onKeyDownHandler }
                 className={ error ? 'error' : '' }
          />
          <button onClick={ addTaskHandler }>+</button>
        </div>
        { error && <div className={ 'errorMessage' }>{ error }</div> }
        <ul>
          { props.tasks.map((el) => {
            return (
                <li key={ el.id } className={ el.isDone ? 'isDone' : ''}>
                  <button onClick={ () => removeTaskHandler(el.id) }>
                    ✖
                  </button>
                  <input type="checkbox" checked={ el.isDone }
                         onChange={ (e) => changeCheckBox(el.id, e) } />
                  <span>{ el.title }</span>
                </li>
            );
          }) }
        </ul>
        <div>
          <button className={ props.filter === 'all' ? 'activeFilter' : '' }
                  onClick={ () => changeFilterHandler('all') }>All
          </button>
          <button className={ props.filter === 'active' ? 'activeFilter' : '' }
                  onClick={ () => changeFilterHandler('active') }>Active
          </button>
          <button className={ props.filter === 'completed' ? 'activeFilter' : '' }
                  onClick={ () => changeFilterHandler('completed') }>Completed
          </button>
        </div>
      </div>
  )
}