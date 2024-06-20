const { useState, useEffect } = React

export function BugSorting({ onSetSortBy }) {
    // const [sortByToEdit, setSortByToEdit] = useState(sortBy)
    const [sortBy, setSortBy] = useState({ sortBy: '', dir: 1 })

    // useEffect(() => {
    //     onSetsortBy(sortByToEdit)
    // }, [sortByToEdit])

    useEffect(() => {
        onSetSortBy(sortBy);
    }, [sortBy, onSetSortBy]);


    // function handleChange(event) {
    //     const { value } = event.target;
    //     setSortBy({
    //       sortBy: value,
    //       dir: sortBy.dir,
    //       pageIdx: 0
    //     });
    //   }

    function handleChange(event) {
        const { value } = event.target;
        setSortBy(prevSortBy => ({
            ...prevSortBy,
            sortBy: value,
            pageIdx: 0
        }));
    }

    // const { value } = event.target;
    // setSortByToEdit(value);

    // setSortByToEdit(prevSort => ({ ...prevSort, [field]: value, pageIdx: 0 }))



    function handleSortDirection(event) {
        const { checked } = event.target;
        const dir = checked ? -1 : 1

        setSortBy(prevSortBy => ({
            ...prevSortBy,
            dir: dir,
            pageIdx: 0
        }));
    }



    // function onSetSortBy() {
    //     const sortBy = sortBy.value
    //     const dir = dir.checked ? -1 : 1

    //     if (sortBy === 'title') {
    //         gQueryOptions.sortBy = { title: dir }
    //     } else if (sortBy === 'maxSeverity') {
    //         gQueryOptions.sortBy = { maxSeverity: dir }
    //     }
    // }
    // const { title, severity,createdAt } = sotrByToEdit
    // const { sortBy: sortByField, dir } = sortByToEdit


    return (
        <section>
            <div className="sort-by">
                {/* <select onChange={handleChange}> */}
                <select value={sortBy.sortBy} onChange={handleChange}>
                    <option value=" ">Select Sorting</option>
                    <option value="title">By Title</option>
                    <option value="severity">By Severity</option>
                    <option value="createdAt">By createdAt</option>
                </select>
                <label>
                    <span>Descending</span>
                    <input className="sort-desc" type="checkbox"
                        checked={sortBy.dir === -1}
                        onChange={handleSortDirection} />
                </label>
            </div>
        </section>
    )

}