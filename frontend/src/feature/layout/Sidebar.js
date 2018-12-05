import React from "react";

const Sidebar = () => {
  return (
    <aside className="menu is-hidden-mobile">
      <p className="menu-label">Contas</p>
      <ul className="menu-list">
        <li>
          <a className="is-active">Dashboard</a>
        </li>
        <li>
          <a>Gastos</a>
        </li>
        <li>
          <a>Categorias</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
