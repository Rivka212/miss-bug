const { NavLink } = ReactRouterDOM
const { useEffect } = React

import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
  useEffect(() => {
    // component did mount when dependancy array is empty
  }, [])

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>Bugs are Forever</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/bug">Bugs</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
