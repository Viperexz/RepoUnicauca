import React from 'react';
import '../../css/components/general/card.css';

function Card({ title, icon }) {
    return (
        <div className="card">
            <div className="cardHeader">
                <span className="icon">{icon}</span>
                <h4>{title}</h4>
            </div>
        </div>
    );
}

export default Card;