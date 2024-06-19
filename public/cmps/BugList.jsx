const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug }) {
  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <section>
            <button onClick={() => { onRemoveBug(bug._id) }} >x</button>
            <button><Link to={`/bug/edit/${bug._id}`}>Edit</Link></button>
            <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
          </section>
        </li>
      ))}
    </ul>
  )
}
