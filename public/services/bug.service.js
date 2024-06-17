
const BASE_URL = '/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
}

// `http://127.0.0.1:3030/api/bug`

function query(filterBy = {}) {
    // console.log('query in front');
    return axios.get(BASE_URL)
        .then(res => res.data)
        // .then(bugs => {
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     bugs = bugs.filter(bug => regExp.test(bug.vendor))
            // }
            // if (filterBy.minSpeed) {
            //     bugs = bugs.filter(bug => bug.speed >= filterBy.minSpeed)
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
        .then(res => console.log(res.data))
}

function save(bug) {
    const queryStr = `/save?title=${bug.title}&description=${bug.description}severity=${bug.severity}
    &createdAt=${bug.createdAt}&_id=${bug._id || ''}`
    return axios.get(BASE_URL + queryStr)
        .then(res => res.data)
}

function getEmptyBug(title = '', description = '', severity = '', createdAt = '') {
    return { title, description, severity, createdAt }
    // return { vendor, speed }
}

function getDefaultFilter() {
    return { title: '', description: '', severity: '', createdAt: '' }
    // return { txt: '':'', minSpeed: '' }
}


