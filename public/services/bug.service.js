
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

// `http://127.0.0.1:3030/api/bug`

function query(filterBy) {
    const { txt, minSeverity } = filterBy
    return axios.get(`${BASE_URL}?minSeverity=${minSeverity}&txt=${txt}`).then(res => res.data)
    // if (filterBy.txt) {
    //     const regExp = new RegExp(filterBy.txt, 'i')
    //     bugs = bugs.filter(bug => regExp.test(bug.txt))
    // }
    // if (filterBy.minSeverity) {
    //     bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
    // }
    // return bugs
    // })
}


function getById(bugId) {
    return axios.get(BASE_URL + '/' + bugId)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.get(BASE_URL + '/' + bugId + '/remove')
        .then(res => res.data)
}

function save(bug) {
    const queryStr = `/save?title=${bug.title}&description=${bug.description}&severity=${bug.severity}
    &createdAt=${bug.createdAt}&_id=${bug._id || ''}`
    return axios.get(BASE_URL + queryStr)
        .then(res => res.data)
}

function getEmptyBug(title = '', description = '', severity = '', createdAt = '') {
    return { title, description, severity, createdAt }
}

function getDefaultFilter() {
    return { txt: '', minSeverity: 0, }
}

function onDownloadPdf(){
    console.log('hi');
    return axios.get(BASE_URL + '/download').then(res => res.data)
}