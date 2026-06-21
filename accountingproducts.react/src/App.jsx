import { useState, useEffect } from 'react'
import { api } from './api'
import { Menu } from './components/Menu'
import { ActionsBar } from './components/ActionsBar'
import { Table } from './components/Table'
import './App.css'

function App() {
    const [activeMenu, setActiveMenu] = useState('Продукты')
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const menuItems = ['Продукты', 'Категории', 'Производители', 'Магазины', 'Цены']

    const apiMap = {
        'Продукты': api.getProducts,
        'Категории': api.getCategories,
        'Производители': api.getManufacturers,
        'Магазины': api.getShops,
        'Цены': api.getPrices,
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const fetchFn = apiMap[activeMenu]
                const data = fetchFn ? await fetchFn() : []
                setTableData(data)
            } catch (err) {
                setError('Не удалось загрузить данные', err)
                setTableData([])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [activeMenu])

    const handleCreate = () => alert('Создание: ' + activeMenu)
    const handleDelete = (id, name) => alert(`Удаление: ${name} (ID: ${id})`)
    const handleRowClick = (item) => alert('Выбрано: ' + JSON.stringify(item))

    return (
        <div className="app-container">
            <h1 className="page-title">Учет продуктов в магазине</h1>

            <Menu
                items={menuItems}
                activeItem={activeMenu}
                onItemClick={setActiveMenu}
            />

            <div className="table-wrapper">
                <ActionsBar onCreate={handleCreate} />
                <Table
                    data={tableData}
                    loading={loading}
                    error={error}
                    onRowClick={handleRowClick}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    )
}

export default App