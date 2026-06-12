import React from 'react'
import './Pagination.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages: (number | string)[] = []

    const delta = 1
    const left = currentPage - delta
    const right = currentPage + delta

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i)
      } else if (i === left - 1 || i === right + 1) {
        pages.push('...')
      }
    }

    return pages
  }

  const pages = getPages()

  return (
    <div className="bg-gray-100 flex flex-wrap justify-center items-center gap-2 mt-3 py-3 fixed inset-x-0 bottom-0">
      <button
        disabled={currentPage == 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 -mt-2 rounded-md pagination-next-previous-button-class ${currentPage == 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
      >
        ‹
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={`w-5 h-5 flex items-center justify-center rounded-full border pagination-page-number-class ${
              currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-blue-50'
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage == totalPages || totalPages <= 1}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 -mt-2 rounded-md  pagination-next-previous-button-class ${
          currentPage == totalPages || totalPages <= 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        ›
      </button>
    </div>
  )
}

export default Pagination
