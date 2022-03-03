import React from "react";
import { Link } from "react-router-dom";

export function People() {
  return (
    <React.Fragment>
      <h1>People</h1>
      <Link to="/supplies">Next page</Link>
    </React.Fragment>
  );
}
