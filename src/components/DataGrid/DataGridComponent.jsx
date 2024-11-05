import React, { useState } from "react";
import "./DataGridStyles.scss";
import { Box, Typography, IconButton } from "@mui/material";
import { Menu, MenuItem } from "react-pro-sidebar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const CircularItem = ({ status }) => {
  const statusColors = {
    archived: "black",
    default: "white",
    red: "red",
    yellow: "yellow",
    green: "green",
    hv: "black",
    ive: "violet",
  };

  const color = statusColors[status] || "grey";

  return (
    <Box
      sx={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: color === "white" ? "0.5px solid #000" : "",
        backgroundColor: color,
        margin: "10px auto",
        "&:hover": {
            transform: "scale(1.1)",
        },
      }}
    >
      {status === "hv" && (
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "yellow",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {status === "ive" && (
        <Box
          sx={{
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: "14px solid red",
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </Box>
  );
};

const MenuFilterStatus = ({ filterStatusOpen, setFilterStatusOpen }) => {
  const handleClose = () => {
    setFilterStatusOpen(!filterStatusOpen);
  };

  const status = ["default", "archived", "red", "yellow", "green", "hv", "ive"];

  return (
    <Box
      sx={{
        position: "fixed",
        width: "80px",
        marginTop: "50px",
        marginLeft: "-50px",
      }}
    >
      <Menu
        aria-labelledby="demo-positioned-button"
        open={filterStatusOpen}
        onClose={handleClose}
        className="data-table-filter-status"
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {status.map((value) => (
            <MenuItem sx={{ backgroundColor: "#fff" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularItem status={value} />
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

const DataGrid = ({ columns, rows, pageSize = 10, handleEdit }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});
  const [filterStatusOpen, setFilterStatusOpen] = useState(false);

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
      <table style={{ width: "100%", backgroundColor: "#fff" }}>
        <thead>
          <tr style={{ width: "100%", backgroundColor: "#CCC" }}>
            {columns.map((column, index) => (
              <th
                key={column.field}
                style={{
                  textAlign: column.headerAlign || "left",
                  height: column.height || "50px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {column.renderHeader
                    ? column.renderHeader({
                        value: "error",
                      })
                    : column.headerName}
                  {index != 0 ? (
                    <Box>
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
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        contain: "layout",
                        mr: "-10px",
                        ml: "-25px",
                      }}
                    >
                      <IconButton
                        onClick={() => setFilterStatusOpen(!filterStatusOpen)}
                        aria-label="expand row"
                        size="small"
                      >
                        {filterStatusOpen ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                      {filterStatusOpen && (
                        <MenuFilterStatus
                          filterStatusOpen={filterStatusOpen}
                          setFilterStatusOpen={setFilterStatusOpen}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, index) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className={selectedRow === row ? "selected" : ""}
                onClick={() => handleRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                    <td
                    key={column.field}
                    style={{
                        textAlign: column.align || "left",
                        padding: "8px",
                        wordBreak: "break-word",
                        width: column.width || "auto",
                        borderBottom: colIndex === 0 ? "unset" : "",
                        backgroundColor: colIndex === 0 ? "#CCC" : "",
                    }}
                    >
                    {column.renderCell
                      ? column.renderCell({
                          value: row[column.field],
                          id: index,
                        })
                      : row[column.field]}
                  </td>
                ))}
                <td>
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
                </td>
              </tr>
              {expandedRows[index] && row.details && (
                <tr
                  className={`data-table-details ${
                    selectedRow === row ? "selected" : ""
                  }`}
                >
                  <td
                    colSpan="1"
                    style={{
                      border: "unset !important",
                      backgroundColor: "#ccc",
                    }}
                  ></td>
                  <td colSpan="3">{row.details.date}</td>
                  <td colSpan="2">{row.details.more_details}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <Box
        className="data-table-pagination"
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          justifyContent: "right",
        }}
      >
        <IconButton
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1 ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => handlePageChange(index + 1)}
            style={{ margin: "0 5px" }}
          >
            {index + 1}
          </button>
        ))}

        <IconButton
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DataGrid;
