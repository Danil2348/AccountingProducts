// src/components/ActionsBar.jsx
export const ActionsBar = ({ onCreate }) => {
    return (
        <div className="actions-bar">
            <button className="action-button create" onClick={onCreate}>
                + Создать
            </button>
        </div>
    )
}