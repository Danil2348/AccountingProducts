// src/api.js
const API_BASE = '/api'

const request = (url, options = {}) =>
    fetch(url, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options.headers },
    }).then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
    })

const getControllerName = (typeName) => {
    if (!typeName) return ''
    return typeName
        .replace('ResponseDto', '')
        .replace('CreateDto', '')
        .replace('UpdateDto', '')
}

export const api = {
    getMetadata: () => request(`${API_BASE}/metadata`),

    getEntities: (typeName) =>
        request(`${API_BASE}/${getControllerName(typeName)}`),

    createEntity: (typeName, data) =>
        request(`${API_BASE}/${getControllerName(typeName)}/create`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateEntity: (typeName, id, data) => {
        const controller = getControllerName(typeName);
        const url = `${API_BASE}/${controller}/update/${id}`;
        return request(url, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    deleteEntity: (typeName, id) =>
        request(`${API_BASE}/${getControllerName(typeName)}/delete/${id}`, {
            method: 'DELETE',
        }),

    getReferenceDataForSource: (source) =>
        request(`${API_BASE}/${source}`),
}