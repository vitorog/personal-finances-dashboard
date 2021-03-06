import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActiveRoute = (currentRoute, menuPath) => {
  return menuPath === currentRoute ? "is-active" : null;
};

const Sidebar = props => {
  const currentRoute = props.location.pathname;
  return (
    <aside className="menu is-hidden-mobile">
      <p className="menu-label">Finances</p>
      <ul className="menu-list">
        <li>
          <Link
            to="/reports"
            className={isActiveRoute(currentRoute, "/reports")}
          >
            Reports
          </Link>
        </li>
        <li>
          <Link to="/income" className={isActiveRoute(currentRoute, "/income")}>
            Income
          </Link>
        </li>
        <li>
          <Link
            to="/expenses"
            className={isActiveRoute(currentRoute, "/expenses")}
          >
            Expenses
          </Link>
        </li>
        <li>
          <Link
            to="/configuration"
            className={isActiveRoute(currentRoute, "/configuration")}
          >
            Configuration
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default withRouter(Sidebar);
