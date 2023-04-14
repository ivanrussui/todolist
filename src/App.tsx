import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import { v1 } from 'uuid';

export type ValuesType = 'all' | 'active' | 'completed';

function App() {
    const forTrack = 'My TodoList'

    let [ filter, setFilter ] = useState<ValuesType>('all');

    let [ tasks, setTasks ] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: true },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    const removeTask = (task: string) => {
        let filteredTasks = tasks.filter((item) => item.id !== task);
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        let task = { id: v1(), title: title, isDone: true }
        let newTasks = [ task, ...tasks ]
        setTasks(newTasks)

    }

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter((task) => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((task) => task.isDone)
    }

    function changeFilter(value: ValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <TodoList track1={ forTrack }
                      track2={ 2222 }
                      tasks={ tasksForTodolist }
                      removeTask={ removeTask }
                      changeFilter={ changeFilter }
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
