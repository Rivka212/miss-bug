import { utilService } from "./util.service.js"


export const bugService = {
    query,
    getById,
    remove,
    save,
    getLabels,
    getPageCount,

}
const PAGE_SIZE = 4
var bugs = utilService.readJsonFile('./data/bug.json')

function query(filterBy) {
    var filteredBugs = bugs
    if (!filterBy) return Promise.resolve(filteredBugs)
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        filteredBugs = filteredBugs.filter(bug => regExp.test(bug.description) || regExp.test(bug.title))
    }
    if (filterBy.minSeverity) {
        filteredBugs = filteredBugs.filter(bug => bug.severity >= filterBy.minSeverity)
    }

    if (filterBy.sortBy) {
        if (filterBy.sortBy === 'severity') {
            filteredBugs.sort((bug1, bug2) => (bug1.severity - bug2.severity) * filterBy.sortDir)
        } else if (filterBy.sortBy === 'createdAt') {
            filteredBugs.sort((bug1, bug2) => ((bug1.createdAt - bug2.createdAt)) * filterBy.sortDir)
        } else if (filterBy.sortBy === 'title') {
            filteredBugs.sort((bug1, bug2) => bug1.title.localeCompare(bug2.title) * filterBy.sortDir)
        }
    }
    if (filterBy.labels?.length) {
        filteredBugs = filteredBugs.filter(bug => filterBy.labels.every(label => bug.labels.includes(label)))
    }

    const startIdx = filterBy.pageIdx * PAGE_SIZE
    filteredBugs = filteredBugs.slice(startIdx, startIdx + PAGE_SIZE)
    return Promise.resolve(filteredBugs)
}


function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId,loggedinUser) {
    const idx = bugs.findIndex(bug => bug._id === bugId)
    if (idx === -1) return Promise.reject('No Such Bug')
        const bug = bugs[idx]
        if (bug.creator._id !== loggedinUser._id) {
            return Promise.reject('Not your bug')
        }
    bugs.splice(idx, 1)
    
    return _saveBugsToFile()
}

function getLabels() {
    return query().then(bugs => {
        const bugsLabels = bugs.reduce((acc, bug) => {
            return [...acc, ...bug.labels]
        }, [])
        return [...new Set(bugsLabels)]
    })
}

function getPageCount() {
    return query().then(bugs => {
        return Math.ceil(bugs.length / PAGE_SIZE)
    })
}

function save(bugToSave) {
    if (bugToSave._id) {
        const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs.splice(idx, 1, bugToSave)
    } else {
        bugToSave._id = utilService.makeId()
        bugToSave.createdAt = Date.now()
        console.log(bugToSave.createdAt)
        bugs.push(bugToSave)
    }
    return _saveBugsToFile()
        .then(() => bugToSave)
}

function _saveBugsToFile() {
    return utilService.writeJsonFile('./data/bug.json', bugs)
}

