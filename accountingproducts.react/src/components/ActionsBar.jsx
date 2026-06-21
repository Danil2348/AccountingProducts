import { CreateButton } from './buttons'

export const ActionsBar = ({ onCreate }) => {
    return (
        <div className="actions-bar">
            <CreateButton onClick={onCreate} />
        </div>
    )
}