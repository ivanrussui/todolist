import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';

function App() {
    const forTrack = 'My TodoList'

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Rest API", isDone: true },
        { id: 5, title: "GraphQL", isDone: false },
    ])

    const removeTask = (task: number) => {
        let filteredTasks = tasks.filter((item) => item.id !== task);
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <TodoList track1={ forTrack }
                      track2={ 2222 }
                      tasks={ tasks }
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
