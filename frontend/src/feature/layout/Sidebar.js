import React from "react";
import { Link } from "react-router-dom";

const isActiveRoute = path => {
  return path === window.location.pathname ? "is-active" : null;
};

const Sidebar = () => {
  return (
    <aside className="menu is-hidden-mobile">
      <p className="menu-label">Finances</p>
      <ul className="menu-list">
        <li>
          <Link to="/dashboard" className={isActiveRoute("/dashboard")}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/expenses" className={isActiveRoute("/expenses")}>
            Expenses
          </Link>
        </li>
        <li>
          <a>Categories</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
