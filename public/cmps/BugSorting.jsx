const { useState, useEffect } = React

export function BugSorting({ onSetSortBy }) {
    const [editSortBy, setEditSortBy] = useState({ sortBy: '', sortDir: 1 })

    function handleChange(event) {
        const { value } = event.target
        const newSortBy = { sortBy: value, sortDir: editSortBy.sortDir }
        setEditSortBy(prevEditSortBy => ({
            ...prevEditSortBy,
            sortBy: value,
        }))
        onSetSortBy(newSortBy)
    }

    function handleSortDirection(event) {
        const { checked } = event.target
        const dir = checked ? -1 : 1

        const newSortBy = { sortBy: editSortBy.sortBy, sortDir: dir }
        setEditSortBy(prevEditSortBy => ({
            ...prevEditSortBy,
            sortDir: dir,
        }))
        onSetSortBy(newSortBy)
    }



    return (
        <section className="bug-sort">
            <select value={editSortBy.sortBy} onChange={handleChange}>
                <option value=" ">Select Sorting</option>
                <option value="title">By Title</option>
                <option value="severity">By Severity</option>
                <option value="createdAt">By createdAt</option>
            </select>
            <label>
                <span>Descending</span>
                <input className="sort-desc" type="checkbox"
                    checked={editSortBy.sortDir === -1}
                    onChange={handleSortDirection} />
            </label>

        </section>
    )

}