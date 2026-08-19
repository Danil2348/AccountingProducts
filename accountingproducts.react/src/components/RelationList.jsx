// src/components/RelationList.jsx
import { useState } from 'react'

export const RelationList = ({
    fieldName,
    label,
    items = [],
    availableItems = [],
    onToggleCheck,
    onAddItem,
    onRemoveSelected,
}) => {
    const [isAdding, setIsAdding] = useState(false)
    const [newItemId, setNewItemId] = useState('')

    const handleAddNew = () => {
        if (!newItemId) return
        onAddItem(fieldName, newItemId)
        setNewItemId('')
        setIsAdding(false)
    }

    const hasCheckedItems = items.some(item => item.checked)

    return (
        <div className="relation-section">
            <div className="relation-header">
                <h3>{label}</h3>
                <div className="relation-header-actions">
                    <button
                        className="relation-remove-btn"
                        onClick={() => onRemoveSelected(fieldName)}
                        disabled={!hasCheckedItems}
                    >
                        🗑️
                    </button>
                    <button
                        className="relation-add-btn"
                        onClick={() => setIsAdding(true)}
                        disabled={isAdding}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="relation-list">
                {items.map(item => (
                    <div key={item.id} className="relation-item">
                        <input
                            type="checkbox"
                            checked={!!item.checked}
                            onChange={() => onToggleCheck(fieldName, item.id)}
                        />
                        <span>{item.name}</span>
                    </div>
                ))}

                {isAdding && (
                    <div className="relation-item relation-item-add">
                        <select
                            value={newItemId}
                            onChange={(e) => setNewItemId(e.target.value)}
                            autoFocus
                        >
                            <option value="">Выберите...</option>
                            {availableItems.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <button
                            className="relation-confirm-btn"
                            onClick={handleAddNew}
                            disabled={!newItemId}
                        >
                            ✓
                        </button>
                        <button
                            className="relation-cancel-btn"
                            onClick={() => {
                                setIsAdding(false)
                                setNewItemId('')
                            }}
                        >
                            ✕
                        </button>
                    </div>
                )}

                {items.length === 0 && !isAdding && (
                    <div className="relation-empty">Нет связанных элементов</div>
                )}
            </div>
        </div>
    )
}