import React, { useEffect, useMemo, useState, } from 'react';
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table';
import ReactPaginate from 'react-paginate';
import '../assets/css/Table.css';
import prev from '../assets/icons/Vector 2.svg'

const Table = ({ data, columns, selectedOrgDetails, handlePageChange, pageCounts }) => {

  console.log("data in tables", data)

  const [selectedRow, setSelectedRow] = useState(null);
  // console.log("selectedRow----------", selectedRow, "selectedOrgDetails----------", selectedOrgDetails);
  useEffect(() => {
    if (selectedOrgDetails?.id) {
      setSelectedRow(selectedOrgDetails.id); // Set it only when the data is loaded
    }
  }, [selectedOrgDetails]);
  useEffect(() => {
    if (selectedOrgDetails?.user_id) {
      setSelectedRow(selectedOrgDetails.user_id); // Set it only when the data is loaded
    }
  }, [selectedOrgDetails]);

  // const selectedrow = null;
  const toggleRow = (rowId) => {
    // console.log("rowId2222---", rowId);
    // console.log("selectedRow2222", selectedRow)
    setSelectedRow(selectedRow === rowId ? rowId : rowId); // Toggle active row
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
    // state: { pageIndex: pageNo, pageSize: pageSizeNo }
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
    useRowSelect, // 🔥 Required for row selection to work!
  );


  // console.log('pagesize', pageSize);
  const pageCount = Math.ceil(rows.length / 10);
  console.log("pageCount----", rows.length)
  //   const pageCount = page.length > 0 ? Math.ceil(page.length / 10) : 0;
  //   const pageCount = rows.length > 0 ? Math.ceil(rows.length / pageSize) : 0;
  // console.log('pageCount--', pageCount)
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
                // <th {...column.getHeaderProps()}>{column.render('Header')}</th>\
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ cursor: 'pointer' }}>
                  {column.render('Header')}
                  {/* Always show arrows if sorting is enabled */}
                  {column.canSort && (
                    <span style={{ marginLeft: '10px', display: 'inline-flex', flexDirection: 'column', fontSize: '12px', lineHeight: '6px',gap:'3px' }}>
                      {/* Up arrow */}
                      <span style={{ color: column.isSorted && !column.isSortedDesc ? '#6B778C' : '#6B778C' }}>
                        &#x2C4;
                      </span>
                      {/* Down arrow */}
                      <span style={{ color: column.isSortedDesc ? '#6B778C' : '#6B778C' }}>
                        &#x2C5;
                      </span>
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
        {/* <ReactPaginate
          previousLabel={<img src={prev} />}
          nextLabel={<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 1L5.5 6L0.5 11" stroke="#7F56DA" stroke-linecap="round" />
          </svg>
          }
          breakLabel={'...'}
          //   pageCount={Math.ceil(rows.length / pageSize)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          onPageChange={(selectedPage) => gotoPage(selectedPage.selected)}
          //   forcePage={pageNo}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
        /> */}
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
          // onPageChange={handlePageChange?handlePageChange:(selectedPage) => gotoPage(selectedPage.selected)}
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
