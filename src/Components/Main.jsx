import React, { useState } from 'react';
import "../Components/main.css";
import Modal from '../Components/Model';

const Main = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [visibleTaskId, setVisibleTaskId] = useState(null);
    const [deletingTask, setDeletingTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const addTask = () => {
        const title = document.getElementById('titleInput').value;
        const input = document.getElementById('inputField').value;

        if (title.trim() === '' || input.trim() === '') {
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            input,
        };

        if (editingTask !== null) {
            const updatedTasks = tasks.map(task => task.id === editingTask.id ? newTask : task);
            setTasks(updatedTasks);
            setEditingTask(null);
        } else {
            setTasks([...tasks, newTask]);
        }

        document.getElementById('titleInput').value = '';
        document.getElementById('inputField').value = '';
    };

    const editTask = (task) => {
        document.getElementById('titleInput').value = task.title;
        document.getElementById('inputField').value = task.input;
        setEditingTask(task);
        setVisibleTaskId(null);
    };

    const deleteTask = (id) => {
        setDeletingTask(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        const updatedTasks = tasks.filter(task => task.id !== deletingTask);
        setTasks(updatedTasks);
        setShowModal(false);
        setDeletingTask(null);
    };

    const cancelDelete = () => {
        setShowModal(false);
        setDeletingTask(null);
    };

    const toggleOptionsVisibility = (id) => {
        if (visibleTaskId === id) {
            setVisibleTaskId(null);
        } else {
            setVisibleTaskId(id); 
        }
    };

    return (
        <div className='main'>
            <div className='Navbar'>
                <div className="logo">
                    <div className='heading'>
                        GYIZER
                    </div>
                    <div className='sub_heading'>
                        TODO APP
                    </div>
                </div>
            </div>
            <br></br>
            <div className="input-container">
                <div className="input-fields">
                    <input id="titleInput" placeholder='Title...' />
                    <input id="inputField" placeholder='Input...' />
                </div>
                <div className="btn">
                    <button onClick={addTask}>
                        {editingTask !== null ? 'Update' : '+'}
                    </button>
                </div>
            </div>
            <div className='card-div'>
                {tasks.length === 0 ? (
                    <div className="no-tasks">No tasks</div>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="task-card">
                            <div className='output'>
                                <div className="task-title">{task.title}</div>
                                <div className="task-details">{task.input}</div>
                            </div>
                            <div className="icons">
                                <span className="icon" onClick={() => toggleOptionsVisibility(task.id)}>&#8505;</span>
                                {visibleTaskId === task.id && (
                                    <>
                                        <span className="icon" onClick={() => editTask(task)}>&#9998;</span>
                                        <span className="icon" onClick={() => deleteTask(task.id)}>&#10006;</span>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            {showModal && <Modal task={deletingTask} onConfirm={confirmDelete} onCancel={cancelDelete} />}
        </div>
    )
}

export default Main;
