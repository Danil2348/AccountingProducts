export const Menu = ({ items, activeItem, onItemClick }) => {
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