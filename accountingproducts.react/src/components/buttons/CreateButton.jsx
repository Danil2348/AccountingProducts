export const CreateButton = ({ onClick, label = '+' }) => {
    return (
        <button className="action-button create" onClick={onClick}>
            {label}
        </button>
    )
}