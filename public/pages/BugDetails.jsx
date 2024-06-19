const { useState, useEffect } = React
const { Link,useNavigate, useParams } = ReactRouterDOM

import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    // const { bugId } = useParams()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBug()
    }, [params.bugId])


    function loadBug() {
        bugService.getById(params.bugId)
            .then(bug => {
                console.log(params.bugId, bug)
                return bug
            })
            .then(setBug)
            .catch(err => {
                console.log('err:', err)
                navigate('/bug')
            })
    }

    function onBack() {
        navigate('/bug')
        // navigate(-1)
    }
    // useEffect(() => {
    //     bugService.getById(bugId)
    //         .then(bug => {
    //             setBug(bug)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot load bug')
    //         })
    // }, [])

    if (!bug) return <h1>loadings....</h1>
    return <div>
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <p>Description:<span>{bug.description}</span></p>
        <p>Severity: <span>{bug.severity}</span></p>
        <button onClick={onBack} >Back</button>
        {/* <Link to="/bug/BV82rS">Next Bug</Link> */}
    </div>

}

