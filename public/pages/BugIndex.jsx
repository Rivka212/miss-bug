import { bugService } from '../services/bug.service.js'
import { utilService } from "../services/util.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from "../cmps/BugFilter.jsx"
import { BugSorting } from "../cmps/BugSorting.jsx"

const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  const [sortBy, setSortBy] = useState()

  const debouncedSetFilterBy = useRef(utilService.debounce(onSetFilterBy, 500))

  useEffect(() => {
    console.log(sortBy);
    bugService.query(filterBy, sortBy)
      .then(bugs => setBugs(bugs))
      .catch(err => console.log('err:', err))
  }, [filterBy, sortBy])


  // useEffect(() => {
  //   bugService.query({ ...filterBy, ...sortBy })
  // },[])

  function onRemoveBug(bugId) {
    bugService
      .remove(bugId)
      .then(() => {
        console.log('Deleted Succesfully!')
        setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
        showSuccessMsg('Bug removed')
      })
      .catch((err) => {
        console.log('Error from onRemoveBug ->', err)
        showErrorMsg('Cannot remove bug')
      })
  }


  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  function handleSetSortBy(newSortBy) {
    console.log(newSortBy)
    setSortBy(newSortBy)
  }

  //  function handleSetSortBy(sortBy) {
  //   console.log(sortBy);
  //     setSortBy(prevsort => ({ ...prevsort, ...sortBy }))
  //   }

  function onDownloadPdf() {
    bugService.onDownloadPdf()
  }

  if (!bugs || !bugs.length) return (<h2>Loading...</h2>)
  return (
    <main>
      <h3>Bugs App</h3>
      <main>
        <button onClick={onDownloadPdf}> Download PDF</button>
        <BugFilter filterBy={filterBy} onSetFilterBy={debouncedSetFilterBy.current} />
        <BugSorting sortBy={sortBy} onSetSortBy={handleSetSortBy} />
        <Link to="/bug/edit" >Add Bug ⛐</Link> |
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} />
      </main>
    </main>
  )
}
