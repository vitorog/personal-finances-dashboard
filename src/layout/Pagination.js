import React, { Component } from "react";
import { PropTypes } from "prop-types";

class Pagination extends Component {
  render() {
    let { currentPage, numPages } = this.props.pagination;
    return (
      <nav className="pagination" role="navigation" aria-label="pagination">
        <a
          className="pagination-previous"
          disabled={currentPage === 1}
          onClick={() => this.props.onPageChange(currentPage - 1)}
        >
          Previous
        </a>
        <a
          className="pagination-next"
          disabled={currentPage === numPages}
          onClick={() => this.props.onPageChange(currentPage + 1)}
        >
          Next page
        </a>
        <ul className="pagination-list">
          {Array.from(Array(numPages).keys()).map(pageNum => (
            <li key={pageNum + 1}>
              <a
                className={
                  pageNum + 1 === currentPage
                    ? "pagination-link is-current"
                    : "pagination-link"
                }
                aria-label={"Goto page " + (pageNum + 1)}
                onClick={() => this.props.onPageChange(pageNum + 1)}
              >
                {pageNum + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.shape({
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
  }).isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
