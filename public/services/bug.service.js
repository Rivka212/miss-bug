
const BASE_URL = '/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
    onDownloadPdf,
}


function query(filterBy = {}, sortBy = {}) {
    console.log(filterBy, sortBy);
    const queryParams = {
        ...filterBy, ...sortBy
    }
    console.log(queryParams);
    return axios.get(BASE_URL, { params: queryParams })
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

function getEmptyBug(title = '', description = '', severity = '', createdAt = '', labels = '') {
    return { title, description, severity, createdAt, labels }
}

function getDefaultFilter() {
    return { txt: '', minSeverity: '', pageIdx: 0 }
}

function onDownloadPdf() {
    console.log('hi');
    return axios.get(BASE_URL + '/download').then(res => res.data)
}