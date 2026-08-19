// src/utils/typeMapper.js

const isDto = (dataType) => {
    return dataType && (dataType.endsWith('Dto') ||
        dataType.endsWith('ResponseDto') ||
        dataType.endsWith('CreateDto') ||
        dataType.endsWith('UpdateDto'))
}

const isCollection = (dataType) => {
    return dataType && (dataType.startsWith('List`') ||
        dataType.startsWith('IEnumerable`') ||
        dataType.startsWith('ICollection`') ||
        dataType.startsWith('IList`'))
}

export const mapDataType = (dataType) => {
    if (!dataType) return 'string'

    if (isCollection(dataType)) return 'array'
    if (isDto(dataType)) return 'object'

    if (dataType === 'Int32' || dataType === 'Int64' ||
        dataType === 'Decimal' || dataType === 'Double' ||
        dataType === 'Float' || dataType === 'Single') return 'number'

    if (dataType === 'Boolean') return 'boolean'
    if (dataType === 'DateTime' || dataType === 'DateTimeOffset') return 'datetime'
    if (dataType === 'Guid') return 'guid'
    if (dataType === 'String' || dataType === 'string') return 'string'

    return 'string'
}