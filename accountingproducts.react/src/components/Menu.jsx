// src/components/Menu.jsx
export const Menu = ({ items, activeItem, onItemClick }) => {
    if (!items || items.length === 0) {
        return <div className="menu-container">Нет доступных сущностей</div>
    }

    return (
        <div className="menu-container">
            {items.map((item) => (
                <button
                    key={item.entityName}
                    className={`menu-button ${activeItem === item.entityName ? 'active' : ''}`}
                    onClick={() => onItemClick(item.entityName, item.typeName)}
                >
                    {item.entityName}
                </button>
            ))}
        </div>
    )
}