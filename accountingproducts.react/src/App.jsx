// src/App.jsx
import { useState, useEffect } from 'react'
import { api } from './api'
import { Menu } from './components/Menu'
import { ActionsBar } from './components/ActionsBar'
import { Table } from './components/Table'
import { CreateDialog } from './components/CreateDialog'
import './App.css'

function App() {
    const [activeMenu, setActiveMenu] = useState(null)
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editData, setEditData] = useState(null)
    const [metadata, setMetadata] = useState(null)
    const [metadataLoading, setMetadataLoading] = useState(true)
    const [referenceData, setReferenceData] = useState({
        products: [],
        categories: [],
        manufacturers: [],
        shops: [],
    })

    // ============================================================
    // 1. ЗАГРУЗКА МЕТАДАННЫХ
    // ============================================================
    useEffect(() => {
        const loadMetadata = async () => {
            try {
                const data = await api.getMetadata()
                setMetadata(data)
                if (data && data.length > 0) {
                    setActiveMenu(data[0].entityName)
                }
            } catch (err) {
                console.error('Ошибка загрузки метаданных:', err)
            } finally {
                setMetadataLoading(false)
            }
        }
        loadMetadata()
    }, [])

    // ============================================================
    // 2. ЗАГРУЗКА СПРАВОЧНИКОВ
    // ============================================================
    useEffect(() => {
        const loadReferences = async () => {
            try {
                const data = await api.getReferenceData()
                setReferenceData(data)
            } catch (err) {
                console.error('Ошибка загрузки справочников:', err)
            }
        }
        loadReferences()
    }, [])

    // ============================================================
    // 3. ЗАГРУЗКА ДАННЫХ ДЛЯ ТАБЛИЦЫ
    // ============================================================
    useEffect(() => {
        if (!activeMenu) return

        let isMounted = true
        const loadData = async () => {
            if (!isMounted) return
            setLoading(true)
            setError(null)
            try {
                // ✅ ДИНАМИЧЕСКИЙ ВЫЗОВ
                const data = await api.getEntities(activeMenu)
                if (isMounted) setTableData(data)
            } catch (err) {
                if (isMounted) {
                    console.error('Ошибка загрузки:', err)
                    setError('Не удалось загрузить данные')
                    setTableData([])
                }
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        loadData()
        return () => { isMounted = false }
    }, [activeMenu])

    // ============================================================
    // 4. ОБРАБОТЧИКИ
    // ============================================================
    const handleCreate = () => {
        setIsEditMode(false)
        setEditData(null)
        setIsDialogOpen(true)
    }

    const handleEdit = (item) => {
        setIsEditMode(true)
        setEditData(item)
        setIsDialogOpen(true)
    }

    const handleSave = async (entity, data) => {
        // ✅ ДИНАМИЧЕСКИЙ ВЫЗОВ
        await api.createEntity(entity, data)
        const newData = await api.getEntities(entity)
        setTableData(newData)
    }

    const handleUpdate = async (entity, data) => {
        // ✅ ДИНАМИЧЕСКИЙ ВЫЗОВ
        await api.updateEntity(entity, data)
        const newData = await api.getEntities(entity)
        setTableData(newData)
    }

    const handleDelete = (id, name) => {
        alert(`Удаление: ${name} (ID: ${id})`)
    }

    const handleRowClick = (item) => {
        handleEdit(item)
    }

    if (metadataLoading) {
        return <div className="loading">Загрузка метаданных...</div>
    }

    const menuItems = metadata ? metadata.map(m => m.entityName) : []
    const currentSchema = metadata?.find(m => m.entityName === activeMenu)

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
                    schema={currentSchema}
                />
            </div>
            <CreateDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleSave}
                onUpdate={handleUpdate}
                activeMenu={activeMenu}
                referenceData={referenceData}
                editData={editData}
                isEditMode={isEditMode}
                schema={currentSchema}
            />
        </div>
    )
}

export default App