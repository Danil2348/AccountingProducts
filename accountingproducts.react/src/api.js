const API_BASE = import.meta.env.VITE_API_URL || '/api'

const request = (url, options = {}) =>
    fetch(`${API_BASE}${url}`, {
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
    getMetadata: () => request('/metadata'),

    getEntities: (typeName) =>
        request(`/${getControllerName(typeName)}`),

    createEntity: (typeName, data) =>
        request(`/${getControllerName(typeName)}/create`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateEntity: (typeName, id, data) =>
        request(`/${getControllerName(typeName)}/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deleteEntity: (typeName, id) =>
        request(`/${getControllerName(typeName)}/delete/${id}`, {
            method: 'DELETE',
        }),

    getReferenceDataForSource: (source) =>
        request(`/${source}`),
}