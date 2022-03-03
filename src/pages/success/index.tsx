import React from "react"
import  { Link} from "react-router-dom"


export function Success() {
    return (
        <React.Fragment>
            <h1>Success</h1>
            <Link to="/captcha">Next page</Link>
        </React.Fragment>
    )
}