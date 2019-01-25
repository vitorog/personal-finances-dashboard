import React from "react";

const Breadcrumb = () => {
  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="../">Contas</a>
        </li>
        <li className="is-active">
          <a href="#/">Dashboard</a>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
