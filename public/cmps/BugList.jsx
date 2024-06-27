const { Link } = ReactRouterDOM

import { userService } from "../services/user.service.js";
import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug, userId }) {

  const user = userService.getLoggedinUser()

  function isCreator(bug) {
    if (!user) return false
    if (!bug.creator) return true
    return  user.isAdmin || bug.creator._id === user._id
}


  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <section>
            <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
            {
              isCreator(bug) &&
              <div>
                <button onClick={() => { onRemoveBug(bug._id) }} >x</button>
                <button><Link to={`/bug/edit/${bug._id}`}>Edit</Link></button>
              </div>
            }
          </section>
        </li>
      ))}
    </ul>
  )
}
