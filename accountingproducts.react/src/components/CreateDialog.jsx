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
    allSchemas = [],
    entityList,
    onLoadReferenceData,  // ← новый пропс для загрузки связей
}) => {
    // ============================================================
    // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
    // ============================================================
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

    const normalizeKeys = (data) => {
        if (!data) return {}
        const normalized = {}
        Object.keys(data).forEach(key => {
            const normalizedKey = key.charAt(0).toUpperCase() + key.slice(1)
            normalized[normalizedKey] = data[key]
        })
        return normalized
    }

    const getActualKey = (data, fieldName) => {
        if (data[fieldName] !== undefined) return fieldName
        const lowerKey = fieldName.toLowerCase()
        if (data[lowerKey] !== undefined) return lowerKey
        const upperKey = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        if (data[upperKey] !== undefined) return upperKey
        return fieldName
    }

    // ============================================================
    // ПОЛУЧЕНИЕ СХЕМЫ ПО СУЩНОСТИ И РЕЖИМУ
    // ============================================================
    const getSchemaForEntity = (entity, mode) => {
        const suffix = mode === 'edit' ? 'UpdateDto' : 'CreateDto'
        return allSchemas.find(s =>
            s.entityName === entity &&
            s.typeName?.endsWith(suffix)
        ) || null
    }

    // ============================================================
    // СОСТОЯНИЕ
    // ============================================================
    const [selectedEntity, setSelectedEntity] = useState(activeMenu || '')
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [isLoadingRefs, setIsLoadingRefs] = useState(false)

    // ============================================================
    // ЗАГРУЗКА СВЯЗЕЙ ПРИ СМЕНЕ СУЩНОСТИ
    // ============================================================
    const loadReferencesForEntity = async (entity) => {
        if (!onLoadReferenceData) return
        setIsLoadingRefs(true)
        try {
            await onLoadReferenceData(entity)
        } catch (err) {
            console.warn('Ошибка загрузки связей:', err)
        } finally {
            setIsLoadingRefs(false)
        }
    }

    // ============================================================
    // СИНХРОНИЗАЦИЯ ФОРМЫ ПРИ ОТКРЫТИИ
    // ============================================================
    useEffect(() => {
        if (!isOpen) return

        const entity = activeMenu || ''
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedEntity(entity)

        // Загружаем данные для связей текущей сущности
        loadReferencesForEntity(entity)

        if (isEditMode && editData) {
            const updateSchema = getSchemaForEntity(entity, 'edit')
            const normalizedData = normalizeKeys(editData)

            if (updateSchema) {
                setFormData(normalizedData)
            } else {
                const responseSchema = allSchemas.find(s =>
                    s.entityName === entity &&
                    s.typeName?.endsWith('ResponseDto')
                )
                if (responseSchema) {
                    const filteredData = {}
                    responseSchema.fields?.forEach(field => {
                        if (field.name in normalizedData) {
                            filteredData[field.name] = normalizedData[field.name]
                        }
                    })
                    setFormData(filteredData)
                } else {
                    setFormData(normalizedData)
                }
            }
        } else {
            const createSchema = getSchemaForEntity(entity, 'create')
            const emptyData = getInitialData(createSchema)
            setFormData(emptyData)
        }
    }, [isOpen, isEditMode, editData, activeMenu, allSchemas])

    // ============================================================
    // СМЕНА СУЩНОСТИ (только при создании)
    // ============================================================
    const handleEntityChange = async (entity) => {
        if (isEditMode) {
            alert('Редактирование: смена сущности недоступна')
            return
        }

        setSelectedEntity(entity)

        // Загружаем данные для связей новой сущности
        await loadReferencesForEntity(entity)

        const createSchema = getSchemaForEntity(entity, 'create')
        if (createSchema) {
            const newData = getInitialData(createSchema)
            setFormData(newData)
        }
    }

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

        const currentSchema = getSchemaForEntity(selectedEntity, isEditMode ? 'edit' : 'create')
        const field = currentSchema?.fields?.find(f => f.name === fieldName)
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

    // ============================================================
    // ОСТАЛЬНЫЕ МЕТОДЫ
    // ============================================================
    const handleFieldChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // ============================================================
    // ОТПРАВКА
    // ============================================================
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const dataToSend = { ...formData }

            const currentSchema = getSchemaForEntity(selectedEntity, isEditMode ? 'edit' : 'create')

            currentSchema?.fields?.forEach(field => {
                const type = field.datatype || field.dataType
                const value = dataToSend[field.name]

                if (type === 'array' && Array.isArray(value) && value.length > 0 && value[0]?.id) {
                    const idFieldName = field.name + 'Ids'
                    dataToSend[idFieldName] = value.map(item => item.id)
                    delete dataToSend[field.name]
                }

                if (type === 'object' && value && typeof value === 'object' && value.id) {
                    const idFieldName = field.name + 'Id'
                    dataToSend[idFieldName] = value.id
                    delete dataToSend[field.name]
                }

                if (type === 'Decimal' || type === 'Int32' || type === 'Int64') {
                    if (value !== undefined && value !== null && value !== '') {
                        dataToSend[field.name] = parseFloat(value)
                    }
                }
            })

            if (isEditMode) {
                const updateFields = currentSchema?.fields?.map(f => f.name) || []
                Object.keys(dataToSend).forEach(key => {
                    if (!updateFields.includes(key) && key !== 'id') {
                        delete dataToSend[key]
                    }
                })
                delete dataToSend.id
            }

            console.log('📤 Отправляем данные:', dataToSend)

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
            console.error('Ошибка:', err)
            alert('Не удалось выполнить операцию: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    const currentSchema = getSchemaForEntity(selectedEntity, isEditMode ? 'edit' : 'create')

    // ============================================================
    // РЕНДЕРИНГ
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

        if (field.source) {
            const refData = referenceData?.[field.source] || []

            if (refData.length === 0 && !isLoadingRefs) {
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

            if (isLoadingRefs) {
                return (
                    <select disabled>
                        <option value="">Загрузка...</option>
                    </select>
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

        if (type === 'boolean') {
            return (
                <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => handleFieldChange(fieldName, e.target.checked)}
                />
            )
        }

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
                            disabled={isEditMode || isLoadingRefs}
                            style={isEditMode ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                        >
                            {entityList?.map(entity => (
                                <option key={entity} value={entity}>{entity}</option>
                            ))}
                        </select>
                        {isEditMode && (
                            <div className="field-hint">Редактирование: смена сущности недоступна</div>
                        )}
                        {isLoadingRefs && (
                            <div className="field-hint">Загрузка данных для связей...</div>
                        )}
                    </div>

                    {currentSchema?.fields?.map((field) => (
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
                    <button className="dialog-save" onClick={handleSubmit} disabled={loading || isLoadingRefs}>
                        {isEditMode ? (loading ? 'Сохранение...' : 'Сохранить') : (loading ? 'Создание...' : 'Создать')}
                    </button>
                </div>
            </div>
        </div>
    )
}