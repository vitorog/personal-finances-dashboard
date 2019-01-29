import React from "react";
import { withRouter } from "react-router-dom";

const toPascalCase = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Breadcrumb = props => {
  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="../">Finances</a>
        </li>
        <li className="is-active">
          <a href="#/">{toPascalCase(props.location.pathname.substring(1))}</a>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Breadcrumb);
