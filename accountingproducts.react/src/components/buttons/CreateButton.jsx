export const CreateButton = ({ onClick, label = '+ Создать' }) => (
    <button className="action-button create" onClick={onClick}>
        {label}
    </button>
)