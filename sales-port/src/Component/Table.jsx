import React, { useEffect, useMemo, useState, } from 'react';
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table';
import ReactPaginate from 'react-paginate';
import '../assets/css/Table.css';
import prev from '../assets/icons/Vector 2.svg'

const SortIcon = ({ isSorted, isSortedDesc }) => (
  <svg width="12" height="15" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Up arrow */}
    <path
      d="M1 3L3.5 1L6 3"
      stroke={isSorted && !isSortedDesc ? "#6B778C" : "#A0A0A0"}
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    {/* Down arrow */}
    <path
      d="M1 7L3.5 9L6 7"
      stroke={isSortedDesc ? "#6B778C" : "#A0A0A0"}
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);

const Table = ({ data, columns, selectedData, handlePageChange, pageCounts }) => {

  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (selectedData?.id) {
      setSelectedRow(selectedData.id);
    }
  }, [selectedData]);

  useEffect(() => {
    if (selectedData?.user_id) {
      setSelectedRow(selectedData.user_id);
    }
  }, [selectedData]);

  const toggleRow = (rowId) => {
    setSelectedRow(selectedRow === rowId ? rowId : rowId);
  };


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageIndex,
    pageSize,
    gotoPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,

  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },

    },
    useSortBy,
    usePagination,
    useRowSelect,
  );


  // console.log('pagesize', pageSize);
  const pageCount = Math.ceil(rows.length / 10);
  console.log("pageCount----", rows.length)

  useEffect(() => {
    setSelectedRow(data[0]?.id || null)
    console.log("pageCounts------New", pageCounts)
    // console.log("selectedRow-------22", selectedRow)
  }, [])
  return (
    <div className="table-container p-0 mt-3">
      <table {...getTableProps()} className="student-table">
        <thead>
          {headerGroups?.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers?.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ cursor: 'pointer', }}>
                  {column.render('Header')}
                  {column.canSort && (
                    <span style={{ marginLeft: '10px', display: 'inline-flex', alignItems: 'center' }}>
                      <SortIcon isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} />
                    </span>
                  )}
                </th>

              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page?.map(row => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}
                onClick={() => {
                  toggleRow(row.original.id)
                    ; row.original.handleRowClick(row.original.id, row)
                }
                } // Toggle active state on click
                className={selectedRow === row.original.id ? 'active-row' : ''}>
                {row?.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={<img src={prev} />}
          nextLabel={<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 1L5.5 6L0.5 11" stroke="#7F56DA" stroke-linecap="round" />
          </svg>}
          breakLabel={"..."}
          pageCount={pageCounts ? pageCounts : pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={pageCounts ? handlePageChange : (selectedPage) => gotoPage(selectedPage.selected)}
          containerClassName={'pagination'}
          activeClassName={'active'}
          disabledClassName={'disabled'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
        />

      </div>
    </div>
  );
};

export default Table;
