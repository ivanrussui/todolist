import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';

export type ValuesType = 'all' | 'active' | 'completed';

function App() {
    const forTrack = 'My TodoList'

    let [ filter, setFilter ] = useState<ValuesType>('all');

    let [ tasks, setTasks ] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Rest API", isDone: true },
        { id: 5, title: "GraphQL", isDone: false },
    ]);

    const removeTask = (task: number) => {
        let filteredTasks = tasks.filter((item) => item.id !== task);
        setTasks(filteredTasks)
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
            />
        </div>
    );
}

export default App;
