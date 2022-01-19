
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, filterBy, delay = 300) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []

    const sortBy = filterBy ? filterBy.sortBy : 'name'
    const sortedEntities = getSortedEntities(entities, sortBy)
    const filteredEntities = getFilteredEntities(sortedEntities, filterBy)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(filteredEntities)
        }, delay)
    })
}

function getSortedEntities(entities, sortBy = 'name') {
    switch (sortBy) {
        case 'name':
            return entities.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                return 0;
            })
        case 'price':
            return entities.sort(function (a, b) { return a.price - b.price });
    }
}

function getFilteredEntities(entities, filterBy) {
    if (!filterBy) return entities
    let filteredToys = entities
    filteredToys = entities.filter(toy => toy.name.toLowerCase().includes(filterBy.name.toLowerCase()))

    if (filterBy.selectedLabels.length) {
        filteredToys = filteredToys.filter(toy => {
            const isOutsideFilter = toy.labels.some(label => {
                const isFilter = filterBy.selectedLabels.some(selectedLabel => {
                    return selectedLabel.value.includes(label.value)
                })
                return isFilter
            })
            if (isOutsideFilter) return toy
        })
    }

    switch (filterBy.type) {
        case 'all':
            return filteredToys;
        case 'inStock':
            return filteredToys.filter(toy => toy.inStock);
        case 'finished':
            return filteredToys.filter(toy => !toy.inStock);
    }
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
        .then(entity => {
            // entity.reviews = reviews
            return entity
        })
}
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    newEntity.createdAt = Date.now()
    newEntity.inStock = true
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}



function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    console.log('entityType FROM SAVE!', entityType)
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}