const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }


    const { title, minSeverity } = filterByToEdit
    return (
        <section className="bug-filter">
            <h2>Filter Our Bugs</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title: </label>
                <input value={title} onChange={handleChange} type="text" placeholder="By Title" id="title" name="title" />

                <label htmlFor="minSeverity">Min Severity: </label>
                <input value={minSeverity} onChange={handleChange} type="number" placeholder="By Min Severity" id="minSeverity" name="minSeverity" />

                <button>Set Filter</button>
            </form>
        </section>
    )
}