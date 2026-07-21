// src/components/CreateDialog.jsx
import { useState } from 'react'

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
    // ============================================================
    // 1. СНАЧАЛА ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
    // ============================================================
    const getInitialData = (schema) => {
        const initial = {}
        if (!schema || !schema.fields) return initial

        schema.fields.forEach((field) => {
            if (field.dataType === 'array') {
                initial[field.name] = []
            } else if (field.dataType === 'boolean') {
                initial[field.name] = false
            } else {
                initial[field.name] = ''
            }
        })
        return initial
    }

    // ============================================================
    // 2. ЗАТЕМ ИНИЦИАЛИЗАЦИЯ СОСТОЯНИЯ
    // ============================================================
    const [selectedEntity, setSelectedEntity] = useState(activeMenu || '')
    const [formData, setFormData] = useState(() => {
        if (isEditMode && editData) {
            return editData
        }
        return getInitialData(schema)
    })
    const [loading, setLoading] = useState(false)

    // ============================================================
    // 3. ОСТАЛЬНЫЕ МЕТОДЫ
    // ============================================================
    const handleEntityChange = (entity) => {
        if (isEditMode) return
        setSelectedEntity(entity)
        setFormData(getInitialData(schema))
    }

    const handleFieldChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            if (isEditMode) {
                await onUpdate(selectedEntity, formData)
            } else {
                await onSave(selectedEntity, formData)
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

    // ============================================================
    // 4. ДИНАМИЧЕСКИЙ РЕНДЕРИНГ ПОЛЕЙ
    // ============================================================
    const renderField = (field) => {
        const value = formData[field.name] || ''

        if (field.reference) {
            const refEntityName = field.reference.entityName
            const refData = referenceData[refEntityName?.toLowerCase()] || []

            if (field.dataType === 'array') {
                return (
                    <select
                        multiple
                        value={value}
                        onChange={(e) => {
                            const values = Array.from(e.target.selectedOptions, (option) => option.value)
                            handleFieldChange(field.name, values)
                        }}
                    >
                        {refData.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                )
            } else {
                return (
                    <select
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    >
                        <option value="">Выберите...</option>
                        {refData.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                )
            }
        }

        switch (field.dataType) {
            case 'boolean':
                return (
                    <input
                        type="checkbox"
                        checked={!!value}
                        onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                    />
                )
            case 'number':
                return (
                    <input
                        type="number"
                        step="0.01"
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={field.required}
                        placeholder={field.label}
                    />
                )
            default:
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={field.required}
                        placeholder={field.label}
                        maxLength={field.maxLength}
                    />
                )
        }
    }

    // ============================================================
    // 5. РЕНДЕРИНГ
    // ============================================================
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
                            {entityList?.map((entity) => (
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