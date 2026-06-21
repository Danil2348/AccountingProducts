import { DeleteButton } from './buttons'

export const Table = ({ data, loading, error, onRowClick, onDelete }) => {
    const getColumns = () => {
        if (data.length === 0) return []
        return Object.keys(data[0]).filter(key => key !== 'id')
    }

    const renderCellValue = (item, key) => {
        const value = item[key]
        if (value === null || value === undefined) return ''
        if (typeof value === 'object') return JSON.stringify(value)
        return value
    }

    const columns = getColumns()

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map(col => <th key={col}>{col}</th>)}
                        <th className="action-column"></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={columns.length + 1} className="empty-message">Загрузка...</td></tr>
                    ) : error ? (
                        <tr><td colSpan={columns.length + 1} className="empty-message">{error}</td></tr>
                    ) : data.length === 0 ? (
                        <tr><td colSpan={columns.length + 1} className="empty-message">Нет данных</td></tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id} onClick={() => onRowClick(item)}>
                                {columns.map(col => <td key={col}>{renderCellValue(item, col)}</td>)}
                                <td className="action-cell">
                                    <DeleteButton onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete(item.id, item.name || item.id)
                                    }} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}