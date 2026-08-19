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
    const [activeTypeName, setActiveTypeName] = useState(null)
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editData, setEditData] = useState(null)
    const [metadata, setMetadata] = useState(null)
    const [metadataLoading, setMetadataLoading] = useState(true)
    const [referenceData, setReferenceData] = useState({})
    const [dialogKey, setDialogKey] = useState('')

    // ============================================================
    // ЗАГРУЗКА МЕТАДАННЫХ
    // ============================================================
    useEffect(() => {
        const loadMetadata = async () => {
            try {
                const data = await api.getMetadata()
                setMetadata(data)

                const firstEntity = data?.find(m => m.typeName?.endsWith('ResponseDto'))
                if (firstEntity) {
                    setActiveMenu(firstEntity.entityName)
                    setActiveTypeName(firstEntity.typeName)
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
    // ПОЛУЧЕНИЕ ИСТОЧНИКОВ ДЛЯ СУЩНОСТИ
    // ============================================================
    const getSourcesForEntity = (entityName) => {
        if (!metadata) return []
        const entity = metadata.find(m => m.entityName === entityName)
        if (!entity) return []

        const sources = new Set()
        entity.fields?.forEach(field => {
            if (field.source) {
                sources.add(field.source)
            }
        })
        return Array.from(sources)
    }

    // ============================================================
    // ЗАГРУЗКА ДАННЫХ ДЛЯ ВЫПАДАЮЩИХ СПИСКОВ (только нужные)
    // ============================================================
    const refreshReferenceData = async (entityName) => {
        const sources = getSourcesForEntity(entityName)
        if (sources.length === 0) return

        const refs = {}
        await Promise.all(
            sources.map(async (source) => {
                try {
                    const data = await api.getReferenceDataForSource(source)
                    refs[source] = data
                } catch (err) {
                    console.warn(`Не удалось загрузить источник ${source}:`, err)
                    refs[source] = []
                }
            })
        )
        setReferenceData(prev => ({ ...prev, ...refs }))
    }

    // ============================================================
    // ЗАГРУЗКА ДАННЫХ ДЛЯ ТАБЛИЦЫ
    // ============================================================
    const loadTableData = async (typeName) => {
        setLoading(true)
        setError(null)
        try {
            const data = await api.getEntities(typeName)
            setTableData(data)
        } catch (err) {
            console.error('Ошибка загрузки:', err)
            setError('Не удалось загрузить данные')
            setTableData([])
        } finally {
            setLoading(false)
        }
    }

    // ============================================================
    // ЗАГРУЗКА ПРИ СМЕНЕ МЕНЮ
    // ============================================================
    useEffect(() => {
        if (!activeTypeName || !activeMenu) return

        let isMounted = true
        const loadAll = async () => {
            if (!isMounted) return
            await loadTableData(activeTypeName)
            if (isMounted) {
                await refreshReferenceData(activeMenu)
            }
        }
        loadAll()
        return () => { isMounted = false }
    }, [activeTypeName, activeMenu])

    // ============================================================
    // ФИЛЬТРАЦИЯ
    // ============================================================
    const menuItems = metadata
        ?.filter(m => m.typeName?.endsWith('ResponseDto'))
        .map(m => ({ entityName: m.entityName, typeName: m.typeName })) || []

    const responseSchema = metadata
        ?.find(m => m.typeName === activeTypeName && m.typeName?.endsWith('ResponseDto'))

    const createSchema = metadata
        ?.find(m => m.entityName === activeMenu && m.typeName?.endsWith('CreateDto'))

    const updateSchema = metadata
        ?.find(m => m.entityName === activeMenu && m.typeName?.endsWith('UpdateDto'))

    const currentSchema = isEditMode ? updateSchema : createSchema
    const entityList = menuItems.map(m => m.entityName)

    // ============================================================
    // ОБРАБОТЧИКИ
    // ============================================================
    const handleMenuClick = (entityName, typeName) => {
        setActiveMenu(entityName)
        setActiveTypeName(typeName)
    }

    const handleCreate = () => {
        setIsEditMode(false)
        setEditData(null)
        setDialogKey('create_' + Date.now())
        setIsDialogOpen(true)
    }

    const handleEdit = (item) => {
        setIsEditMode(true)
        setEditData(item)
        setDialogKey('edit_' + Date.now())
        setIsDialogOpen(true)
    }

    const handleSave = async (entityName, data) => {
        const createType = metadata?.find(m => m.entityName === entityName && m.typeName?.endsWith('CreateDto'))
        await api.createEntity(createType?.typeName, data)
        await loadTableData(activeTypeName)
        await refreshReferenceData(activeMenu)
    }

    const handleUpdate = async (entityName, id, data) => {
        console.log('🔄 handleUpdate:', { entityName, id, data })

        const updateType = metadata?.find(m => m.entityName === entityName && m.typeName?.endsWith('UpdateDto'))
        if (!updateType) {
            console.error('❌ Не найден UpdateDto для', entityName)
            return
        }

        await api.updateEntity(updateType.typeName, id, data)
        await loadTableData(activeTypeName)
        await refreshReferenceData(activeMenu)
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

    return (
        <div className="app-container">
            <h1 className="page-title">Учет продуктов в магазине</h1>
            <Menu
                items={menuItems}
                activeItem={activeMenu}
                onItemClick={handleMenuClick}
            />
            <div className="table-wrapper">
                <ActionsBar onCreate={handleCreate} />
                <Table
                    data={tableData}
                    loading={loading}
                    error={error}
                    onRowClick={handleRowClick}
                    onDelete={handleDelete}
                    schema={responseSchema}
                />
            </div>
            <CreateDialog
                key={dialogKey}
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false)
                    setDialogKey('')
                }}
                onSave={handleSave}
                onUpdate={handleUpdate}
                activeMenu={activeMenu}
                referenceData={referenceData}
                editData={editData}
                isEditMode={isEditMode}
                schema={currentSchema}
                entityList={entityList}
            />
        </div>
    )
}

export default App