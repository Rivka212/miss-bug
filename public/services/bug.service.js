
const BASE_URL = '/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
    onDownloadPdf,
    getLabels,
    getPageCount,
}


function query(filterBy = {}) {
    return axios.get(BASE_URL, { params: filterBy })
        .then(res => res.data)
}


function getById(bugId) {
    return axios.get(BASE_URL + '/' + bugId)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.delete(BASE_URL + '/' + bugId)
        .then(res => res.data)
}

function save(bug) {
    if (bug._id) {
        return axios.put(BASE_URL + '/' + bug._id, bug)
            .then(res => res.data)
    } else {
        return axios.post(BASE_URL, bug)
            .then(res => res.data)
    }
}

function getLabels() {
    return axios.get(BASE_URL + '/labels').then(res => res.data)
}

function getPageCount() {
    return axios.get(BASE_URL + '/pageCount').then(res => res.data)
}

function getEmptyBug(title = '', description = '', severity = '', createdAt = '', labels = '') {
    return { title, description, severity, createdAt, labels }
}

function getDefaultFilter() {
    return { txt: '', minSeverity: '', pageIdx: 0, sortBy: '', sortDir: 1, labels: [] }
}

function onDownloadPdf() {
    return axios.get(BASE_URL + '/download').then(res => res.data)
}