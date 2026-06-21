const API_BASE = '/api'

export const api = {
    // Продукты
    getProducts: () => fetch(`${API_BASE}/Product`).then(res => res.json()),

    // Категории
    getCategories: () => fetch(`${API_BASE}/Category`).then(res => res.json()),

    // Производители
    getManufacturers: () => fetch(`${API_BASE}/Manufacturer`).then(res => res.json()),

    // Магазины
    getShops: () => fetch(`${API_BASE}/Shop`).then(res => res.json()),

    // Цены
    getPrices: () => fetch(`${API_BASE}/Price`).then(res => res.json()),
}