// src/components/ButtonComponent.jsx
import '../../css/components/general/buttonStyle.css';

function ButtonComponent({ title, icon, onClick, className }) {
  return (
    <button onClick={onClick} className={className}>
      {icon && <span className="icon">{icon}</span>}
      {title}
    </button>
  );
}

export default ButtonComponent;