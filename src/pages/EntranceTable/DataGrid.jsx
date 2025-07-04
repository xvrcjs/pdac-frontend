import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { OMICS } from "constant/endpoints";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useNavigate } from "react-router-dom";

const filterOptions = [
  { id: "", label: "Ninguno", status: "none" },
  { id: "rojo", label: "Rojo", status: "rojo" },
  { id: "amarillo", label: "Amarillo", status: "amarillo" },
  { id: "verde", label: "Verde", status: "verde" },
  { id: "hv_verde", label: "HV-Verde", status: "hv_verde" },
  { id: "hv_amarillo", label: "HV-Rojo", status: "hv_amarillo" },
  { id: "hv_rojo", label: "HV-Amarillo", status: "hv_rojo" },
  { id: "hv_ive_v", label: "HV-IVE-V", status: "hv_ive_v" },
  { id: "hv_ive_a", label: "HV-IVE-A", status: "hv_ive_a" },
  { id: "hv_ive_r", label: "HV-IVE-R", status: "hv_ive_r" },
];
const CircularItemFilter = ({ status }) => {
  const statusColors = {
    verde: "green",
    rojo: "red",
    amarillo: "yellow",
    hv_verde: "green",
    hv_rojo: "red",
    hv_amarillo: "yellow",
    hv_ive_r: "red",
    hv_ive_a: "yellow",
    hv_ive_v: "green",
    ive: "#B31EA4",
  };

  const color = statusColors[status] || "white"; // Por defecto, gris si el estado no existe

  return (
    <>
      {!status.includes("hv_") ? (
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: color,
            border:color === "white" && "1px solid #000"
          }}
        />
      ) : (
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: status.includes("hv_ive")?"#B31EA4":"black",
            position: "relative",
            border: "2px solid #1DBDCD",
          }}
        >
          {/* Triángulo */}
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderBottom: `14px solid ${color}`,
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      )}
    </>
  );
};
const FilterItem = ({ label, status = "none", selected, onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: "10px",
        backgroundColor: selected ? "#1DBDCD2B" : "transparent",
        "&:hover": { backgroundColor: "#1DBDCD2B", cursor: "pointer" },
        transition: "background-color 0.3s ease",
        width: "70%",
        margin: "auto",
      }}
      onClick={onClick}
      role="button"
      aria-label={`Seleccionar filtro ${label}`}
    >
      <CircularItemFilter status={status} />
      <Typography sx={{ ml: "30px", color: "#000" }}>{label}</Typography>
    </Box>
  );
};

const DataGrid = ({
  api,
  columns,
  rows,
  setRows,
  pageSize = 10,
  hasFilter,
  noDataMessage,
  backgroundColor,
  setClaimSelected,
  setShowTypeAssignClaim,
  setShowMessageConfirmReAssign,
  account,
  cantElement,
  setCantElement,
  currentPage,
  setCurrentPage
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState(null);
  const [filterSelected, setFilterSelected] = useState("");

  const navigate = useNavigate();
  
  // Aplicar filtros si es necesario
  const displayedRows = filterSelected
    ? rows.filter((row) => row.type_of_claim === filterSelected)
    : rows;



  const handleEdit = (index) => {
    navigate(`reclamo/${index.uuid}`);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(cantElement / pageSize);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleAssignClaim = (claim,index)=>{
    setClaimSelected(claim.uuid)
    setShowTypeAssignClaim(true)
  }

  const handleReAssignClaim = (claim,index) =>{
    setClaimSelected(claim.uuid)
    setShowMessageConfirmReAssign(true)
  }

  return (
    <>
      <Box className="data-grid" sx={{ width: "100%", overflowX: "auto" }}>
        {showFilter && (
          <div className="overlay" onClick={() => setShowFilter(false)}></div>
        )}
        <table
          style={{
            width: "100%",
            backgroundColor: backgroundColor ? backgroundColor : "#D9D9D9",
            border: "unset",
          }}
        >
          <thead>
            <tr style={{ width: "100%" }}>
              {columns.map((column, index) => (
                <th
                  key={column.field}
                  style={{
                    textAlign: column.headerAlign || "left",
                    height: column.height || "50px",
                    padding: "5px",
                    cursor: "pointer",
                    color: "#868FA0",
                    width: index === 0 ? "0px" : "auto",
                    backgroundColor: index !== 0 ? "#F3F3F3" : "",
                    borderTopLeftRadius: index === 1 && "20px"
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: index === 0 ? "right" : "center",
                      fontSize: "12px",
                    }}
                  >
                    <Box
                      sx={{ flex: index !== 0 ? 1 : 0, textAlign: "center" }}
                    >
                      {index === 0 ? (
                        <CircularItemFilter status={filterSelected} />
                      ) : (
                        column.headerName
                      )}
                    </Box>
                    <Box sx={{ justifyContent: "right" }}>
                      {index !== 0 ? (
                        <>
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
                              sx={{
                                marginBottom: index === 0 ? "0px" : "-10px",
                              }}
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
                        </>
                      ) : (
                        <Box
                          sx={{
                            marginLeft: "2px",
                            fontSize: "14px",
                            contain: "layout",
                            color:
                              sortField === column.field &&
                              sortDirection === "desc"
                                ? "#000"
                                : "#0000008A",
                          }}
                        >
                          <KeyboardArrowDownOutlinedIcon
                            onClick={() => setShowFilter(true)}
                          />
                          {showFilter && (
                            <Box
                              sx={{
                                position: "fixed",
                                width: "250px",
                                marginLeft: "35px",
                                marginTop: "-30px",
                                border: "1px solid #ccc",
                                backgroundColor: "#fff",
                                borderRadius: "20px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#000",
                                  padding: "10px",
                                }}
                              >
                                Seleccione el filtro deseado
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignContent: "center",
                                }}
                              >
                                {filterOptions.map((option, index) => (
                                  <FilterItem
                                    key={index}
                                    label={option.label}
                                    status={option.status}
                                    selected={filter === option.id}
                                    onClick={() => setFilter(option.id)}
                                  />
                                ))}
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    p: "10px",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Button
                                    sx={{
                                      borderRadius: "4px",
                                      backgroundColor: "unset",
                                      color: "#171717",
                                      padding: "9px 30px",
                                      fontFamily: "Encode Sans",
                                      fontSize: "12px",
                                      fontWeight: "500",
                                      textTransform: "capitalize",
                                      ":hover": {
                                        color: "#FFF",
                                        backgroundColor: "#000",
                                        borderColor: "Blue",
                                      },
                                    }}
                                    onClick={() => {
                                      setFilter(null);
                                      setShowFilter(false);
                                    }}
                                  >
                                    CANCELAR
                                  </Button>
                                  <Button
                                    sx={{
                                      borderRadius: "4px",
                                      backgroundColor:
                                        filter !== null ? "#00AEC3" : "#969494",
                                      color: "#fff",
                                      padding: "9px 30px",
                                      fontFamily: "Encode Sans",
                                      fontSize: "12px",
                                      ml: "10px",
                                      fontWeight: "500",
                                      ":hover": {
                                        color: "#FFF",
                                        backgroundColor: "#000",
                                        borderColor: "Blue",
                                      },
                                    }}
                                    disabled={filter === null}
                                    onClick={() => (
                                      setFilterSelected(filter),
                                      setShowFilter(false)
                                    )}
                                  >
                                    FILTRAR
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </th>
              ))}
              <th style={{ backgroundColor: "#F3F3F3",borderTopRightRadius:"20px" }}></th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{height:"400px", textAlign: "center", padding: "20px" }}>
                  <Typography variant="body1" color="textSecondary">
                    {noDataMessage}
                  </Typography>
                </td>
              </tr>
            ) : (
              [
                ...displayedRows,
                ...Array(pageSize - displayedRows.length).fill({}),
              ].map((row, index) => (
                <React.Fragment key={index}>
                  <tr
                    style={{
                      backgroundColor:
                        selectedRow === index ? "#56D2FF" : "transparent",
                    }}
                  >
                    {columns.map((column, colIndex) => (
                      <>
                        {colIndex === 0 ? (
                          <td
                            key={column.field}
                            style={{
                              fontSize: "14px",
                              textAlign: column.align || "left",
                              padding: "8px",
                              wordBreak: "break-word",
                              width: index === 0 ? "80px" : "auto",
                              backgroundColor: "#F3F3F3",
                              borderBottom:"unset",
                              borderTopLeftRadius: index === 0 ? "30px" : "0px",
                              // borderTopRightRadius: index === 0 ? "30px":"0px",
                              borderBottomLeftRadius:
                                index === pageSize - 1 ? "30px" : "0px",
                              // borderBottomRightRadius: index === (pageSize-1) ? "30px":"0px",
                              display: "block",
                            }}
                          >
                            {column.renderCell({
                              value: row[column.field],
                            })}
                          </td>
                        ) : (
                          <td
                            key={column.field}
                            style={{
                              fontSize: "14px",
                              textAlign: column.align || "left",
                              padding: "8px",
                              wordBreak: "break-word",
                              width: column.width || "200px",
                              borderBottom:
                                colIndex === 0 && hasFilter ? "unset" : "",
                              backgroundColor:
                                colIndex === 0 && hasFilter ? "#fff" : "",
                            }}
                          >
                            {row[column.field] !== undefined
                              ? row[column.field]
                              : ""}
                          </td>
                        )}
                      </>
                    ))}
                    <td>
                      {Object.keys(row).length != 0 &&
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent:"end",
                          mr: "10px",
                          position: "static",
                        }}
                      >
                      {(account.roles && account.roles.some(role => role.name === "Admin")) && 
                        row && Object.keys(row).length > 0 && (
                          <>
                          {row.assigned === "S/A" ?
                              <img src="../../assets/claims/table/paper_plane.svg" alt="asignar-reclamo" onClick={() => handleAssignClaim(row, index)} style={{cursor:"pointer",marginRight:"40px"}}/>
                            :
                              <img src="../../assets/claims/table/forward_circle.svg" alt="re-asignar-reclamo" onClick={() => handleReAssignClaim(row, index)} style={{cursor:"pointer",marginRight:"40px"}}/>
                          }
                          </>
                        )
                      }
                          <IconButton
                            onClick={() => handleEdit(row, index)}
                            aria-label="row"
                            size="medium"
                          >
                            <EditIcon
                              sx={{ cursor: "pointer", width: "fit-content" }}
                            />
                          </IconButton>
                      </Box>
                      }
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && 
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
    </>
  );
};

export default DataGrid;
