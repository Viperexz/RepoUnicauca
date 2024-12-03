import React from 'react';
import '../../css/components/general/card.css';

function Card({ title, icon, className }) {
    return (
        <div className={`card ${className}`}>
            <div className="cardHeader">
                <span className="icon">{icon}</span>
                <h4>{title}</h4>
            </div>
        </div>
    );
}

export default Card;