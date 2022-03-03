import React from "react"
import { Link } from "react-router-dom"

export function Captcha() {
  return (
    <React.Fragment>
      <h1>Captcha</h1>
      <Link to="/locator">Next page</Link>
    </React.Fragment>
  )
}
