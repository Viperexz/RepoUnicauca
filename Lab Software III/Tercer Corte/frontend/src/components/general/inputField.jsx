import React, { useState } from 'react';
import '../../css/components/general/inputStyle.css';

function InputField({ placeholder, icon, type = 'text', inputClassName, value, onChange, name, required = false }) {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

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
                onBlur={handleBlur}
                required={required}
            />
        </div>
    );
}

export default InputField;