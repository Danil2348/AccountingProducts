// src/components/Menu.jsx
export const Menu = ({ items, activeItem, onItemClick }) => {
    if (!items || items.length === 0) {
        return <div className="menu-container">Нет доступных сущностей</div>
    }

    return (
        <div className="menu-container">
            {items.map((item) => (
                <button
                    key={item}
                    className={`menu-button ${activeItem === item ? 'active' : ''}`}
                    onClick={() => onItemClick(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    )
}