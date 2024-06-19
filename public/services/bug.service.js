
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


function query(filterBy = {}) {

    return axios.get(BASE_URL, { params: filterBy })
        //   const { txt, minSeverity } = filterBy
        // return axios.get(`${BASE_URL}?minSeverity=${minSeverity}&txt=${txt}`)
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
    if(bug._id) {
        return axios.put(BASE_URL+ '/' + bug._id, bug)
            .then(res => res.data)
    } else {
        return axios.post(BASE_URL, bug)
            .then(res => res.data)
    }
}

function getEmptyBug(title = '', description = '', severity = '', createdAt = '') {
    return { title, description, severity, createdAt }
}

function getDefaultFilter() {
    return { txt: '', minSeverity: 0, }
}

function onDownloadPdf() {
    console.log('hi');
    return axios.get(BASE_URL + '/download').then(res => res.data)
}