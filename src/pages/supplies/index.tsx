import React from "react"
import  { Link} from "react-router-dom"


export function Supplies() {
    return (
        <React.Fragment>
            <h1>Supplies</h1>
            <Link to="/review">Next page</Link>
        </React.Fragment>
    )
}