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
    // ============================================================
    // 1. УНИВЕРСАЛЬНАЯ ТРАНСФОРМАЦИЯ (по метаданным)
    // ============================================================
    const transformData = (data) => {
        if (!data || data.length === 0) return []

        // Находим поля-массивы в метаданных
        const arrayFields = schema?.fields?.filter(f => f.dataType === 'array') || []

        // Если нет полей-массивов → возвращаем как есть
        if (arrayFields.length === 0) {
            return data.map(item => ({ ...item }))
        }

        const result = []

        data.forEach((item) => {
            // Берём первое поле-массив (например, categories)
            const firstArrayField = arrayFields[0]
            const arrayValues = item[firstArrayField.name] || []

            if (arrayValues.length > 0) {
                // Разворачиваем: одна строка на каждый элемент массива
                arrayValues.forEach((arrayItem) => {
                    const newItem = {
                        id: item.id,
                        ...item,
                        // Добавляем Id и Name из элемента массива
                        [`${firstArrayField.name}Id`]: arrayItem.id,
                        [`${firstArrayField.name}Name`]: arrayItem.name,
                        // Убираем оригинальный массив, чтобы не путать
                        [firstArrayField.name]: undefined,
                    }
                    // Добавляем остальные поля-массивы как есть (если есть)
                    arrayFields.slice(1).forEach(f => {
                        if (item[f.name]) {
                            newItem[f.name] = item[f.name]
                        }
                    })
                    result.push(newItem)
                })
            } else {
                // Если массив пуст → одна запись с "Без категории"
                const newItem = {
                    id: item.id,
                    ...item,
                    [`${firstArrayField.name}Id`]: null,
                    [`${firstArrayField.name}Name`]: 'Без категории',
                    [firstArrayField.name]: undefined,
                }
                result.push(newItem)
            }
        })

        return result
    }

    // ============================================================
    // 2. ПОЛУЧЕНИЕ КОЛОНОК (из метаданных + развёрнутые)
    // ============================================================
    const getColumns = () => {
        // Если есть метаданные — берём колонки из них
        if (schema && schema.fields) {
            let columns = schema.fields
                .filter(f => f.name !== 'id')
                .map(f => f.name)

            // Если есть поля-массивы — разворачиваем первое
            const arrayFields = schema.fields.filter(f => f.dataType === 'array')
            if (arrayFields.length > 0) {
                const firstArrayField = arrayFields[0]
                const nameIndex = columns.indexOf(firstArrayField.name)
                if (nameIndex !== -1) {
                    columns.splice(nameIndex, 1,
                        `${firstArrayField.name}Id`,
                        `${firstArrayField.name}Name`
                    )
                }
            }

            return columns
        }

        // Fallback (если метаданных нет)
        return ['name', 'price']
    }

    // ============================================================
    // 3. ПОЛУЧЕНИЕ ЛЕЙБЛОВ (из метаданных или fallback)
    // ============================================================
    const getColumnLabel = (fieldName) => {
        // Ищем поле в метаданных
        const field = schema?.fields?.find(f => f.name === fieldName)
        if (field?.label) return field.label

        // Проверяем, не является ли поле развёрнутым (CategoryId → Category)
        const cleanName = fieldName.replace(/Id$/, '').replace(/Name$/, '')
        const baseField = schema?.fields?.find(f => f.name === cleanName)
        if (baseField?.label) {
            if (fieldName.endsWith('Id')) return `${baseField.label} ID`
            if (fieldName.endsWith('Name')) return baseField.label
        }

        // Финальный fallback
        return fieldName
    }

    // ============================================================
    // 4. ОТОБРАЖЕНИЕ ЗНАЧЕНИЙ
    // ============================================================
    const renderCellValue = (item, key) => {
        const value = item[key]
        if (value === null || value === undefined) return ''
        if (Array.isArray(value)) {
            return value.map(v => v.name || v).join(', ')
        }
        if (typeof value === 'object') return JSON.stringify(value)
        return value
    }

    // ============================================================
    // 5. СОСТОЯНИЯ
    // ============================================================
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

    // ============================================================
    // 6. РЕНДЕРИНГ ТАБЛИЦЫ
    // ============================================================
    const transformedData = transformData(data)
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
                    {transformedData.map((item, index) => (
                        <tr key={item.id + '-' + index} onClick={() => onRowClick(item)}>
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