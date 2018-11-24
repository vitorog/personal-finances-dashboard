import React, { Component } from "react";

const Sidebar = () => {
    return (
        <aside class="menu is-hidden-mobile">
            <p class="menu-label">
                Contas
                </p>
            <ul class="menu-list">
                <li><a class="is-active">Dashboard</a></li>
                <li><a>Categorias</a></li>
            </ul>
        </aside>
    )
}

export default Sidebar;