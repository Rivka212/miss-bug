import { bugService } from "../services/bug.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


export function BugEdit() {

    const [bugToEdit, setBugToEdit] = useState(bugService.getEmptyBug())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bugId) loadBug()
    }, [])


    function loadBug() {
        bugService.getById(params.bugId)
            .then(setBugToEdit)
            .catch(err => console.log('err:', err))
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        setBugToEdit(prevbugToEdit => ({ ...prevbugToEdit, [field]: value }))
    }


    function onSaveBug(ev) {
        ev.preventDefault()
        bugService.save(bugToEdit)
            .then(() => navigate('/bug'))
            .catch(err => console.log('err:', err))
    }


    const { title, severity } = bugToEdit

    return (
        <section className="bug-edit">
            <form onSubmit={onSaveBug} >
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="vendor" />

                <label htmlFor="severity">Severity:</label>
                <input onChange={handleChange} value={severity} type="number" name="severity" id="severity" />

                <button>Save</button>
            </form>
        </section>
    )
}