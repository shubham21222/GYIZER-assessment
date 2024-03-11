// Modal.jsx
import React from 'react';
import '../Components/Model.css'; 

const Modal = ({ task, onConfirm, onCancel }) => {
 return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Delete this task?</p>
        <div className='btn-div'>
        <button onClick={() => onConfirm(task)}>Yes</button>
        <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
 );
};

export default Modal;
