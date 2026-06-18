// src/App.jsx
import { useState } from 'react'
import './App.css'

function App() {
    const [activeMenu, setActiveMenu] = useState('Продукты')
    const menuItems = ['Продукты', 'Категории', 'Производители', 'Магазины', 'Цены']

    const tableData = {
        'Продукты': [
            { id: 1, name: 'Яблоко Голден', price: 150, category: 'Яблоки' },
            { id: 2, name: 'Яблоко Гренни Смит', price: 170, category: 'Яблоки' },
            { id: 3, name: 'Груша Конференц', price: 200, category: 'Груши' },
            { id: 4, name: 'Апельсин', price: 120, category: 'Цитрусовые' },
            { id: 5, name: 'Банан', price: 90, category: 'Тропические' },
            { id: 6, name: 'Киви', price: 110, category: 'Тропические' },
            { id: 7, name: 'Манго', price: 250, category: 'Тропические' },
            { id: 8, name: 'Ананас', price: 300, category: 'Тропические' },
        ],
        'Категории': [
            { id: 1, name: 'Яблоки', productsCount: 2 },
            { id: 2, name: 'Груши', productsCount: 1 },
        ],
        'Производители': [
            { id: 1, name: 'Сад Придонья', productsCount: 3 },
        ],
        'Магазины': [
            { id: 1, name: 'Пятёрочка', address: 'ул. Ленина, 1' },
            { id: 2, name: 'Магнит', address: 'ул. Советская, 15' },
        ],
        'Цены': [
            { id: 1, product: 'Яблоко Голден', price: 150, shop: 'Пятёрочка' },
            { id: 2, product: 'Яблоко Гренни Смит', price: 170, shop: 'Магнит' },
        ]
    }

    const currentData = tableData[activeMenu] || []

    const handleCreate = () => {
        alert('Создание новой записи в разделе: ' + activeMenu)
    }

    const handleDelete = (id, name) => {
        alert(`Удаление: ${name} (ID: ${id})`)
    }

    const handleRowClick = (item) => {
        alert(`Выбрана запись: ${JSON.stringify(item)}`)
    }

    const getColumns = () => {
        if (currentData.length === 0) return []
        const firstItem = currentData[0]
        return Object.keys(firstItem).filter(key => key !== 'id')
    }

    const renderCellValue = (item, key) => {
        const value = item[key]
        if (typeof value === 'object') return JSON.stringify(value)
        return value
    }

    return (
        <div className="app-container">
            <h1 className="page-title">
                Учет продуктов в магазине
            </h1>

            <div className="menu-container">
                {menuItems.map((item) => (
                    <button
                            key={item}
                            className={`menu-button ${activeMenu === item ? 'active' : ''}`}
                            onClick={() => setActiveMenu(item)}>
                        {item}
                    </button>
                ))}
            </div>
            <div className="table-wrapper">
                <div className="actions-bar">
                    <button className="action-button create" onClick={handleCreate}>
                        +
                    </button>
                </div>

                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                {getColumns().map(col => (
                                    <th key={col}>{col}</th>
                                ))}
                                <th className="action-column">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="clickable-row"
                                    onClick={() => handleRowClick(item)}
                                >
                                    {getColumns().map(col => (
                                        <td key={col}>{renderCellValue(item, col)}</td>
                                    ))}
                                    <td className="action-cell">
                                        <button
                                            className="delete-button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDelete(item.id, item.name || item.id)
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {currentData.length === 0 && (
                                <tr>
                                    <td colSpan={getColumns().length + 1} className="empty-message">
                                        Нет данных
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default App