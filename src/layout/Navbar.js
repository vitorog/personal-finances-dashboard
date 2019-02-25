import React from "react";
import styled from "styled-components";
import FileControls from "../feature/fileLoader/FileControls";
import NubankImporter from "../feature/importer/NubankImporter";

const StyledNav = styled.nav`
  margin-bottom: 10px;
`;

const Navbar = () => {
  return (
    <StyledNav className="navbar is-white">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item brand-text" href="../">
            Personal Finances
          </a>
          <div className="tags">
            {" "}
            <div className="tag is-danger">WIP</div>
          </div>
        </div>
        <div className="navbar-end">
          <NubankImporter />
          <FileControls />
        </div>
      </div>
    </StyledNav>
  );
};

export default Navbar;
