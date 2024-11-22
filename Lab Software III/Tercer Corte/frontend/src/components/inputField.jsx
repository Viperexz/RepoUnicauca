// src/components/InputField.jsx
import React from 'react';
import '../css/components/inputStyle.css';

function InputField({ placeholder, icon ,type = 'text', inputClassName }) {
    return (
        <div className="input-container">
            {icon && <span className="input-icon">{icon}</span>}
            <input type={type} placeholder={placeholder} className={inputClassName}/>
        </div>
    );
}

export default InputField;