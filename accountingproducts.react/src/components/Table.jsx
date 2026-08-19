// src/components/Table.jsx
import { DeleteButton } from './buttons'

export const Table = ({
    data,
    loading,
    error,
    onRowClick,
    onDelete,
    schema,
}) => {
    const normalizeFieldName = (name) => {
        if (!name) return ''
        return name.charAt(0).toLowerCase() + name.slice(1)
    }

    // ============================================================
    // ✅ ИСКЛЮЧАЕМ ПОЛЯ-МАССИВЫ ИЗ КОЛОНОК
    // ============================================================
    const getColumns = () => {
        if (schema && schema.fields) {
            let columns = schema.fields
                .filter(f => f.name !== 'id' && f.name !== 'Id')
                // ✅ Исключаем поля, которые являются массивами
                .filter(f => f.datatype !== 'array' && f.datatype !== 'List`1')
                .map(f => f.name)

            return columns
        }

        if (data && data.length > 0) {
            return Object.keys(data[0])
                .filter(key => key !== 'id' && key !== 'Id')
                // ✅ Исключаем поля, которые являются массивами
                .filter(key => !Array.isArray(data[0][key]))
                .map(key => normalizeFieldName(key))
        }

        return ['name', 'price']
    }

    const getColumnLabel = (fieldName) => {
        const field = schema?.fields?.find(f => f.name === fieldName)
        if (field?.label) return field.label

        const cleanName = fieldName.replace(/Id$/, '').replace(/Ids$/, '').replace(/Name$/, '')
        const baseField = schema?.fields?.find(f => f.name === cleanName)
        if (baseField?.label) {
            if (fieldName.endsWith('Id') || fieldName.endsWith('Ids')) return baseField.label
            if (fieldName.endsWith('Name')) return baseField.label
        }

        return fieldName
    }

    const renderCellValue = (item, key) => {
        let value = item[key]

        if (value === undefined) {
            const altKey = key.charAt(0).toUpperCase() + key.slice(1)
            value = item[altKey]
        }

        if (value === undefined) {
            const altKey = key.charAt(0).toLowerCase() + key.slice(1)
            value = item[altKey]
        }

        if (value === null || value === undefined) return ''

        if (value && typeof value === 'object' && value.name) {
            return value.name
        }

        if (typeof value === 'object') {
            return value.id || JSON.stringify(value)
        }

        if (Array.isArray(value)) {
            return value.map(v => v.name || v).join(', ')
        }

        return value
    }

    if (loading) {
        return (
            <div className="table-container">
                <table className="data-table">
                    <tbody>
                        <tr><td className="empty-message">Загрузка...</td></tr>
                    </tbody>
                </table>
            </div>
        )
    }

    if (error) {
        return (
            <div className="table-container">
                <table className="data-table">
                    <tbody>
                        <tr><td className="empty-message">{error}</td></tr>
                    </tbody>
                </table>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="table-container">
                <table className="data-table">
                    <tbody>
                        <tr><td className="empty-message">Нет данных</td></tr>
                    </tbody>
                </table>
            </div>
        )
    }

    const columns = getColumns()

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col}>{getColumnLabel(col)}</th>
                        ))}
                        <th className="action-column"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} onClick={() => onRowClick(item)}>
                            {columns.map((col) => (
                                <td key={col}>{renderCellValue(item, col)}</td>
                            ))}
                            <td className="action-cell">
                                <DeleteButton
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete(item.id, item.name || item.id)
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}