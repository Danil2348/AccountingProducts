// src/components/CreateDialog.jsx
import { useState, useEffect } from 'react'
import { RelationList } from './RelationList'
import { mapDataType } from '../utils/typeMapper'

export const CreateDialog = ({
    isOpen,
    onClose,
    onSave,
    onUpdate,
    activeMenu,
    referenceData,
    editData,
    isEditMode,
    schema,
    entityList,
}) => {
    const getInitialData = (schema) => {
        const initial = {}
        if (!schema?.fields) return initial

        schema.fields.forEach((field) => {
            const type = field.datatype || field.dataType
            if (type === 'array' || type === 'List`1') {
                initial[field.name] = []
            } else if (type === 'boolean' || type === 'Boolean') {
                initial[field.name] = false
            } else {
                initial[field.name] = ''
            }
        })
        return initial
    }

    const [selectedEntity, setSelectedEntity] = useState(activeMenu || '')
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)

    const normalizeKeys = (data) => {
        if (!data) return {}
        const normalized = {}
        Object.keys(data).forEach(key => {
            const normalizedKey = key.charAt(0).toUpperCase() + key.slice(1)
            normalized[normalizedKey] = data[key]
        })
        return normalized
    }

    useEffect(() => {
        if (!isOpen) return

        if (isEditMode && editData) {
            const normalizedData = normalizeKeys(editData)
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(normalizedData)
            setSelectedEntity(activeMenu || '')
        } else {
            const emptyData = getInitialData(schema)
            setFormData(emptyData)
            setSelectedEntity(activeMenu || '')
        }
    }, [isOpen, isEditMode, editData, schema, activeMenu])

    // ============================================================
    // УПРАВЛЕНИЕ СВЯЗЯМИ
    // ============================================================
    const toggleRelationCheck = (fieldName, itemId) => {
        setFormData(prev => {
            const actualKey = getActualKey(prev, fieldName)
            const items = prev[actualKey] || []
            const newItems = items.map(item =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
            )
            return { ...prev, [actualKey]: newItems }
        })
    }

    const addRelationItem = (fieldName, itemId) => {
        if (!itemId) return

        const field = schema?.fields?.find(f => f.name === fieldName)
        const refKey = field?.source || fieldName
        const refData = referenceData?.[refKey] || []

        const item = refData.find(i => i.id === itemId)
        if (!item) return

        setFormData(prev => {
            const actualKey = getActualKey(prev, fieldName)
            const currentItems = prev[actualKey] || []
            if (currentItems.some(i => i.id === itemId)) return prev
            const newItems = [...currentItems, { ...item, checked: false }]
            return {
                ...prev,
                [actualKey]: newItems
            }
        })
    }

    const removeSelectedRelations = (fieldName) => {
        setFormData(prev => {
            const actualKey = getActualKey(prev, fieldName)
            const items = prev[actualKey] || []
            const remainingItems = items.filter(item => !item.checked)
            return { ...prev, [actualKey]: remainingItems }
        })
    }

    const getActualKey = (data, fieldName) => {
        if (data[fieldName] !== undefined) return fieldName
        const lowerKey = fieldName.toLowerCase()
        if (data[lowerKey] !== undefined) return lowerKey
        const upperKey = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        if (data[upperKey] !== undefined) return upperKey
        return fieldName
    }

    const handleEntityChange = (entity) => {
        if (isEditMode) return
        setSelectedEntity(entity)
        const newData = getInitialData(schema)
        setFormData(newData)
    }

    const handleFieldChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // ============================================================
    // ✅ ОТПРАВКА — С ЛОГАМИ
    // ============================================================
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const dataToSend = { ...formData }

            // ============================================================
            // 1. ПРЕОБРАЗОВАНИЕ ОБЪЕКТОВ → ID
            // ============================================================
            schema?.fields?.forEach(field => {
                const value = dataToSend[field.name]
                const type = mapDataType(field.datatype || field.dataType)

                // ✅ Массив объектов → список GUID
                if (type === 'array' && Array.isArray(value)) {
                    if (value.length > 0 && value[0]?.id) {
                        dataToSend[field.name] = value.map(item => item.id)
                    } else {
                        dataToSend[field.name] = value
                            .map(item => item?.id || item)
                            .filter(id => id && id !== '')
                    }
                }

                // ✅ Одиночный объект → GUID
                if (type === 'object' && value && typeof value === 'object' && value.id) {
                    dataToSend[field.name] = value.id
                }

                // ✅ Числовые поля
                if (type === 'number' && value !== undefined && value !== null && value !== '') {
                    dataToSend[field.name] = parseFloat(value)
                }
            })

            // ============================================================
            // 2. ФИЛЬТРАЦИЯ ДЛЯ ОБНОВЛЕНИЯ
            // ============================================================
            if (isEditMode) {
                const allowedFields = schema?.fields?.map(f => f.name) || []
                Object.keys(dataToSend).forEach(key => {
                    if (!allowedFields.includes(key) && key !== 'id') {
                        console.warn(`⚠️ Удаляем лишнее поле: ${key}`)
                        delete dataToSend[key]
                    }
                })
                delete dataToSend.id
            }

            // ============================================================
            // 3. УДАЛЯЕМ ПУСТЫЕ GUID
            // ============================================================
            Object.keys(dataToSend).forEach(key => {
                if (Array.isArray(dataToSend[key])) {
                    dataToSend[key] = dataToSend[key]
                        .filter(id => id && id !== '' && id !== '00000000-0000-0000-0000-000000000000')
                }
            })

            // ============================================================
            // 4. ОТПРАВКА
            // ============================================================
            if (isEditMode) {
                const entityId = formData.id || editData?.id
                if (!entityId) {
                    alert('ID сущности не найден для обновления')
                    setLoading(false)
                    return
                }
                await onUpdate(selectedEntity, entityId, dataToSend)
            } else {
                await onSave(selectedEntity, dataToSend)
            }
            onClose()
        } catch (err) {
            console.error('❌ Ошибка:', err)
            alert('Не удалось выполнить операцию: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    // ============================================================
    // РЕНДЕРИНГ ПОЛЯ
    // ============================================================
    const renderField = (field) => {
        const fieldName = field.name
        let value = formData[fieldName]

        if (value === undefined) {
            const lowerKey = fieldName.toLowerCase()
            value = formData[lowerKey]
        }
        if (value === undefined) {
            const upperKey = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
            value = formData[upperKey]
        }
        if (value === undefined) value = ''

        const dataType = field.datatype || field.dataType
        const type = mapDataType(dataType)

        // ============================================================
        // 1. СПИСОК (array)
        // ============================================================
        if (type === 'array') {
            let items = value
            if (!Array.isArray(items)) items = []

            const refKey = field.source || fieldName
            const allRefData = referenceData?.[refKey] || []

            const availableItems = allRefData.filter(
                refItem => !items.some(i => i.id === refItem.id)
            )

            return (
                <RelationList
                    fieldName={fieldName}
                    label={field.label}
                    items={items}
                    availableItems={availableItems}
                    onToggleCheck={toggleRelationCheck}
                    onAddItem={addRelationItem}
                    onRemoveSelected={removeSelectedRelations}
                />
            )
        }

        // ============================================================
        // 2. ССЫЛКА (source) — ВЫПАДАЮЩИЙ СПИСОК
        // ============================================================
        if (field.source) {
            const refData = referenceData?.[field.source] || []

            if (refData.length === 0) {
                return (
                    <input
                        type="text"
                        value={value?.name || value || ''}
                        onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                        placeholder={`Нет данных для ${field.label}`}
                        disabled
                    />
                )
            }

            const currentId = value && typeof value === 'object' && value.id ? value.id : value || ''

            return (
                <select
                    value={currentId}
                    onChange={(e) => {
                        const selectedId = e.target.value
                        const selectedItem = refData.find(item => item.id === selectedId)
                        handleFieldChange(fieldName, selectedItem || null)
                    }}
                    required={field.required}
                >
                    <option value="">Выберите...</option>
                    {refData.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            )
        }

        // ============================================================
        // 3. ЧЕКБОКС (boolean)
        // ============================================================
        if (type === 'boolean') {
            return (
                <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => handleFieldChange(fieldName, e.target.checked)}
                />
            )
        }

        // ============================================================
        // 4. ЧИСЛО (number)
        // ============================================================
        if (type === 'number') {
            return (
                <input
                    type="number"
                    step="0.01"
                    value={value || ''}
                    onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                    required={field.required}
                    placeholder={field.label}
                />
            )
        }

        // ============================================================
        // 5. ДАТА (datetime)
        // ============================================================
        if (type === 'datetime') {
            return (
                <input
                    type="date"
                    value={value || ''}
                    onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                    required={field.required}
                    placeholder={field.label}
                />
            )
        }

        // ============================================================
        // 6. ТЕКСТ (по умолчанию)
        // ============================================================
        return (
            <input
                type="text"
                value={value || ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                required={field.required}
                placeholder={field.label}
                maxLength={field.maxLength}
            />
        )
    }

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                    <h2>{isEditMode ? `Редактирование: ${selectedEntity}` : `Создание: ${selectedEntity}`}</h2>
                    <button className="dialog-close" onClick={onClose}>✕</button>
                </div>

                <div className="dialog-body">
                    <div className="dialog-field">
                        <label>Сущность</label>
                        <select
                            value={selectedEntity}
                            onChange={(e) => handleEntityChange(e.target.value)}
                            disabled={isEditMode}
                            style={isEditMode ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                        >
                            {entityList?.map(entity => (
                                <option key={entity} value={entity}>{entity}</option>
                            ))}
                        </select>
                        {isEditMode && (
                            <div className="field-hint">Редактирование: смена сущности недоступна</div>
                        )}
                    </div>

                    {schema?.fields?.map((field) => (
                        <div key={field.name} className="dialog-field">
                            <label>
                                {field.label}
                                {field.required && <span className="required-star">*</span>}
                            </label>
                            {renderField(field)}
                            {field.maxLength && (
                                <div className="field-hint">Максимум {field.maxLength} символов</div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="dialog-footer">
                    <button className="dialog-cancel" onClick={onClose}>Отмена</button>
                    <button className="dialog-save" onClick={handleSubmit} disabled={loading}>
                        {isEditMode ? (loading ? 'Сохранение...' : 'Сохранить') : (loading ? 'Создание...' : 'Создать')}
                    </button>
                </div>
            </div>
        </div>
    )
}