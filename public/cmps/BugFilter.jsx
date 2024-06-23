const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy, labels: availableLabels, pageCount }) {

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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value, pageIdx: 0 }))
    }

    function handleLabelChange({ target }) {
        const { name: label, checked: isChecked } = target

        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            pageIdx: 0,
            labels: isChecked
                ? [...prevFilter.labels, label]
                : prevFilter.labels.filter(lbl => lbl !== label)
        }))
    }


    function onGetPage(diff) {
        let pageIdx = filterByToEdit.pageIdx + diff
        if (pageIdx < 0) pageIdx = pageCount - 1
        if (pageIdx > pageCount - 1) pageIdx = 0
        setFilterByToEdit(prev => ({ ...prev, pageIdx }))
    }

    const { txt, minSeverity, labels } = filterByToEdit
    return (
        <section className="bug-filter">
            <h2>Filter Our Bugs</h2>
            <label htmlFor="txt">Text: </label>
            <input value={txt} onChange={handleChange} type="text" placeholder="By Text" id="txt" name="txt" />

            <label htmlFor="minSeverity">Min Severity: </label>
            <input value={minSeverity} onChange={handleChange} type="number" placeholder="By Min Severity" id="minSeverity" name="minSeverity" />

            <div>
                <h3>Labels:</h3>
                {availableLabels.map(label => (
                    <label key={label}>
                        <input
                            type="checkbox"
                            name={label}
                            checked={labels.includes(label)}
                            onChange={handleLabelChange}
                        />
                        {label}
                    </label>
                ))}
            </div>

            <button onClick={() => onGetPage(-1)}>-</button>
            <span>{filterByToEdit.pageIdx + 1}</span>
            <button onClick={() => onGetPage(1)}>+</button>
        </section>
    )
}