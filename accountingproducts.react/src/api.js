// src/api.js
const API_BASE = '/api'

// ============================================================
// БАЗОВЫЙ HTTP КЛИЕНТ
// ============================================================
const request = (url, options = {}) =>
    fetch(url, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options.headers },
    }).then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
    })

// ============================================================
// ДИНАМИЧЕСКИЙ API (по имени сущности)
// ============================================================
export const api = {
    // Метаданные
    getMetadata: () => request(`${API_BASE}/metadata`),

    // ============================================================
    // УНИВЕРСАЛЬНЫЕ МЕТОДЫ (по имени сущности)
    // ============================================================
    getEntities: (entityName) =>
        request(`${API_BASE}/${entityName}`),

    createEntity: (entityName, data) =>
        request(`${API_BASE}/${entityName}/create`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateEntity: (entityName, data) =>
        request(`${API_BASE}/${entityName}/update/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deleteEntity: (entityName, id) =>
        request(`${API_BASE}/${entityName}/delete/${id}`, {
            method: 'DELETE',
        }),

    // ============================================================
    // СПРАВОЧНИКИ (для выпадающих списков)
    // ============================================================
    getReferenceData: async () => {
        const [products, categories, manufacturers, shops] = await Promise.all([
            api.getEntities('Product'),
            api.getEntities('Category'),
            api.getEntities('Manufacturer'),
            api.getEntities('Shop'),
        ])
        return { products, categories, manufacturers, shops }
    },
}