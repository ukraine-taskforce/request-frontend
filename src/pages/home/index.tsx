import React from "react"
import { Link } from "react-router-dom"

export function Home() {
  return (
    <React.Fragment>
      <h1>Home page</h1>
      <Link to="/captcha">Next page</Link>
    </React.Fragment>
  )
}
