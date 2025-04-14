import React, { useState } from "react";
import { Box, Typography, IconButton,Button } from "@mui/material";
import { Menu, MenuItem } from "react-pro-sidebar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';


const DataGrid = ({ columns, rows, pageSize = 10, handleEdit,hasFilter,noDataMessage,backgroundColor, handleDelete }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});
  
  const sortedRows = [...rows].sort((a, b) => {
    if (!sortField) return 0;
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleRowDetails = (rowIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  const totalPages = Math.ceil(rows.length / pageSize);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Box className="data-grid" sx={{ width: "100%", overflowX: "auto" }}>
      <table style={{ width: "100%", backgroundColor: backgroundColor ? backgroundColor:"#D9D9D9",border:"unset" }}>
        <thead>
          <tr style={{ width: "100%", backgroundColor: "#F3F3F3" }}>
            {columns.map((column, index) => (
              <th
                key={column.field}
                style={{
                  textAlign: column.headerAlign || "left",
                  height: column.height || "50px",
                  padding: "10px",
                  cursor: "pointer",
                  color:"#868FA0",
                  borderTopLeftRadius: index === 0 ? "20px":""
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    {column.headerName}
                  </Box>
                  {(column.sortered === true)  && (
                    <Box sx={{justifyContent:"right"}}>
                      <Box
                        sx={{
                          marginLeft: "2px",
                          fontSize: "14px",
                          color:
                            sortField === column.field &&
                            sortDirection === "asc"
                              ? "#000"
                              : "#0000008A",
                        }}
                      >
                        <ArrowDropUpIcon
                          sx={{ marginBottom: "-10px" }}
                          onClick={() => handleSort(column.field)}
                        />
                      </Box>
                      <Box
                        sx={{
                          marginLeft: "2px",
                          fontSize: "14px",
                          color:
                            sortField === column.field &&
                            sortDirection === "desc"
                              ? "#000"
                              : "#0000008A",
                        }}
                      >
                        <ArrowDropDownIcon
                          sx={{ marginTop: "-10px" }}
                          onClick={() => handleSort(column.field)}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </th>
            ))}
            <th style={{borderTopRightRadius:"20px"}}></th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{height:"400px", textAlign: "center", padding: "20px" }}>
                <Typography variant="body1" color="textSecondary">
                  {noDataMessage}
                </Typography>
              </td>
            </tr>
          ) : (
          [
            ...paginatedRows,
            ...Array(pageSize - paginatedRows.length).fill({}),
          ].map((row, index) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className={selectedRow === row ? "selected" : ""}
                onClick={() => handleRowClick(row)}
                style={{
                  borderLeft:"1px solid #F3F3F3",
                  borderRight:"1px solid #F3F3F3"
                }}
              >
                {columns.map((column, colIndex) => (
                    <td
                    key={column.field}
                    style={{
                        textAlign: column.align || "left",
                        padding: "8px",
                        wordBreak: "break-word",
                        width: column.width || "auto",
                        borderBottom: (colIndex === 0 && hasFilter) ? "unset" : "",
                        backgroundColor: (colIndex === 0 && hasFilter)? "#F3F3F3" : "",
                    }}
                    >
                    {Object.keys(row).length != 0 &&
                      column.renderCell
                      ? column.renderCell({
                          value: row[column.field],
                          id: index,
                        })
                      : row[column.field]
                      }
                  </td>
                ))}
                <td>
                  {Object.keys(row).length != 0 &&
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      mr: "20px",
                    }}
                  >
                    <IconButton
                      onClick={() => toggleRowDetails(index)}
                      aria-label="expand row"
                      size="small"
                      sx={{ ml: "10px" }}
                    >
                      {expandedRows[index] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={() => handleEdit(row.id)}
                      aria-label="expand row"
                      size="small"
                      sx={{ ml: "10px" }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                  }
                </td>
              </tr>
              {expandedRows[index] && (
                <tr
                  className={`data-table-details ${
                    selectedRow === row ? "selected" : ""
                  }`}
                  style={{minHeight:"150px !important"}}
                >
                  <td colSpan="1"></td>
                  <td colSpan="4" style={{wordWrap: "break-word", whiteSpace: "normal",wordBreak: "break-word"}}>{row.details.more_details}</td>
                </tr>
              )}
            </React.Fragment>
          ))
        )}
        </tbody>
      </table>
      {totalPages >1 &&
        <Box
          className="data-table-pagination"
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            justifyContent: "right",
          }}
        >
          {currentPage !== 1 && (
            <IconButton
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <KeyboardArrowLeftIcon
                sx={{ color: "#000", cursor: "pointer" }}
              />
            </IconButton>
          )}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn ${
                currentPage === index + 1 ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handlePageChange(index + 1)}
              style={{ margin: "0 5px", cursor: "pointer" }}
            >
              {index + 1}
            </button>
          ))}
          {currentPage !== totalPages && (
            <IconButton
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <KeyboardArrowRightIcon
                sx={{ color: "#000", cursor: "pointer" }}
              />
            </IconButton>
          )}
        </Box>
      }
    </Box>
  );
};

export default DataGrid;
