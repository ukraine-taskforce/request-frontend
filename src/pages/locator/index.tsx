import React from "react"
import  { Link} from "react-router-dom"


export function Locator() {
    return (
        <React.Fragment>
            <h1>Locator</h1>
            <Link to="/people">Next page</Link>
        </React.Fragment>
    )
}