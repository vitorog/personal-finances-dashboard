import React, { Component } from "react";

const Breadcrumb = () => {
    return (
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="../">Contas</a></li>                  
                <li class="is-active"><a href="#" aria-current="page">Dashboard</a></li>
            </ul>
        </nav>)
}

export default Breadcrumb;