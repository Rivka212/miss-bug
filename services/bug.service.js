import { utilService } from "./util.service.js"


export const bugService = {
    query,
    getById,
    remove,
    save,
}

var bugs = utilService.readJsonFile('./data/bug.json')

function query(filterBy = { txt: '', minSeverity: 0 }) {
    const regExp = new RegExp(filterBy.txt, 'i')
    var filteredBugs = bugs.filter(bug => regExp.test(bug.description) || regExp.test(bug.title) && bug.severity >= filterBy.minSeverity)
    return Promise.resolve(filteredBugs)
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

