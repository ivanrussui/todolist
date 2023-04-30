import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import './App.css';

type PropsType = {
  todolistId: string
  title: string
  filter: FilterValuesType
  tasks: Array<TasksType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
}

export type TasksType = {
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
      props.addTask(title.trim(), props.todolistId)
    } else {
      setError('Title is required')
    }
  }

  const removeTaskHandler = (id: string) => {
    props.removeTask(id, props.todolistId)
  }

  const changeFilterHandler = (value: FilterValuesType, todolistId: string) => {
    props.changeFilter(value, todolistId)
  }

  const changeCheckBox = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    let isDone = e.currentTarget.checked
    props.changeTaskStatus(id, isDone, props.todolistId)
  }

  const removeTodolist = () => {
    props.removeTodolist(props.todolistId)
  }

  return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <h3>{props.title}</h3>
          <button onClick={removeTodolist}>x</button>
        </div>
        <div>
          <input onChange={onChangeHandler}
                 value={title}
                 onKeyDown={onKeyDownHandler}
                 className={error ? 'error' : ''}
          />
          <button onClick={addTaskHandler}>+</button>
        </div>
        {error && <div className={'errorMessage'}>{error}</div>}
        <ul>
          {props.tasks.map((el) => {
            return (
                <li key={el.id} className={el.isDone ? 'isDone' : ''}>
                  <button onClick={() => removeTaskHandler(el.id)}>
                    ✖
                  </button>
                  <input type="checkbox" checked={el.isDone}
                         onChange={(e) => changeCheckBox(el.id, e)} />
                  <span>{el.title}</span>
                </li>
            );
          })}
        </ul>
        <div>
          <button className={props.filter === 'all' ? 'activeFilter' : ''}
                  onClick={() => changeFilterHandler('all', props.todolistId)}>All
          </button>
          <button className={props.filter === 'active' ? 'activeFilter' : ''}
                  onClick={() => changeFilterHandler('active', props.todolistId)}>Active
          </button>
          <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                  onClick={() => changeFilterHandler('completed', props.todolistId)}>Completed
          </button>
        </div>
      </div>
  )
}