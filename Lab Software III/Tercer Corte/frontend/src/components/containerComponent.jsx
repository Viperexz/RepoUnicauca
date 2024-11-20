// src/components/InputField.jsx
import React from 'react';
import '../css/components/containerComponent.css';


function ContainerComponent({Title = 'Title', children}) {
    return (
        <div className={'dashContainer'}>
            <div className={'containerTitle'}>
                <h1>{Title}</h1>
            </div>

            {children}
        </div>
    );
}

export default ContainerComponent;