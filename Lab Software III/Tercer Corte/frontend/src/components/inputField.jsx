// src/components/InputField.jsx
import React from 'react';
import '../css/components/inputStyle.css';

function InputField({ placeholder, icon ,type = 'text' }) {
    return (
        <div className="input-container">
            {icon && <span className="input-icon">{icon}</span>}
            <input type={type} placeholder={placeholder}/>
        </div>
    );
}

export default InputField;