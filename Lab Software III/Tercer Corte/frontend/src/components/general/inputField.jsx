import React from 'react';
import '../../css/components/general/inputStyle.css';

function InputField({ placeholder, icon, type = 'text', inputClassName, value, onChange, name }) {
    return (
        <div className="input-container">
            {icon && <span className="input-icon">{icon}</span>}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={inputClassName}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputField;