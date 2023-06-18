import React from 'react'
import { Link } from 'react-router-dom'
function Index() {
  return (
    <div>
      <li>
        <Link to="/register">Subscribe to the Newsletter.
        Hurry up!!!</Link>
      </li>
      <br />
      <li>
        <Link to="/send">Send a Newsletter</Link>
      </li>
    </div>
  )
}

export default Index