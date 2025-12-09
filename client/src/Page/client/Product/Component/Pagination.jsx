import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <nav className="mt-5 d-flex justify-content-center">
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(page - 1)}>Trước</button>
        </li>

        {[...Array(totalPages)].map((_, i) => (
          <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(page + 1)}>Sau</button>
        </li>
      </ul>
    </nav>
  );
}