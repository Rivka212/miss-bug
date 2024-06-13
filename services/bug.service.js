import { utilService } from "./util.service.js"

// const BASE_URL = '/api/bug'

export const bugService = {
    query,
    getById,
    remove,
    save,
    // getEmptyBug,
    // getDefaultFilter,
}

var bugs = utilService.readJsonFile('./data/bug.json')

function query() {
   return Promise.resolve(bugs)
}


function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    const idx = bugs.findIndex(bug => bug._id === bugId)
    bugs.splice(idx, 1)

    return _saveBugsToFile()
}

function save(bugToSave) {
    if (bugToSave._id) {
        const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs.splice(idx, 1, bugToSave)
    } else {
        bugToSave._id = utilService.makeId()
        bugs.push(bugToSave)
    }
    return _saveBugsToFile()
        .then(() => bugToSave)
}

function _saveBugsToFile() {
    return utilService.writeJsonFile('./data/bug.json', bugs)
}



// function get(bugId) {
//     return axios.get(BASE_URL + '/' + bugId)
//         .then(res => res.data)
// }

// function remove(bugId) {
//     return axios.get(BASE_URL + '/' + bugId + '/remove')
//         .then(res => res.data)
// }

// function save(bug) {
//     const queryStr = `/save?title=${bug.title}&description=${bug.description}severity=${bug.severity}
//     &createdAt=${bug.createdAt}&_id=${bug._id || ''}`
//     return axios.get(BASE_URL + queryStr)
//         .then(res => res.data)
// }

// function getEmptyBug(title = '', description = '', severity = '', createdAt = '') {
//     return { title, description, severity, createdAt }
//     // return { vendor, speed }
// }

// function getDefaultFilter() {
//     return { title: '', description: '', severity: '', createdAt: '' }
//     // return { txt: '':'', minSpeed: '' }
// }
