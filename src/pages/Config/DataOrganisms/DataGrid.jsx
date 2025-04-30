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
import { useNavigate } from "react-router-dom";

const DataGrid = ({
  api,
  columns,
  rows,
  setRows,
  pageSize = 10,
  hasFilter,
  noDataMessage,
  backgroundColor,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRows, setEditingRows] = useState({});
  const [originalRows, setOriginalRows] = useState({});
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [rowToConfirm, setRowToConfirm] = useState(null);
  const [showConfirmChangeDetectedMessage, setShowConfirmChangeDetectedMessage] = useState(false);

  const navigate = useNavigate();

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


  const handleEdit = (index,rowIndex) => {
    if (Object.keys(editingRows).length > 0) {
        const original = originalRows[Object.keys(editingRows)[0]];
        const current = rows[Object.keys(editingRows)[0]];
        const hasChanges = JSON.stringify(original) !== JSON.stringify(current);
    
        if (hasChanges) {
          setShowConfirmChangeDetectedMessage(true);
          setRowToConfirm(rowIndex);
          return;
        }
    }
    setSelectedRow(index)
    
    setEditingRows((prev) => {
      const isEditing = prev[rowIndex];
      if (isEditing) {
        return {};
      }
      return { [rowIndex]: true };
    });
    if (!editingRows[rowIndex]) {
      setOriginalRows((prev) => ({
        ...prev,
        [rowIndex]: { ...rows[rowIndex] },
      }));
    } else {
      setOriginalRows((prev) => {
        const updated = { ...prev };
        delete updated[rowIndex];
        return updated;
      });
    }
  };
  const handleConfirmSwitchRow = () => {
    setSelectedRow(rows[rowToConfirm]);
    rows[Object.keys(editingRows)[0]] = originalRows[Object.keys(editingRows)[0]];
    setEditingRows({});
    setEditingRows((prev) => {
      const isEditing = prev[rowToConfirm];
      if (isEditing) {
        return {};
      }
      return { [rowToConfirm]: true };
    });
    setOriginalRows({});
    setShowConfirmChangeDetectedMessage(false);
  };

  const handleCancelSwitchRow = () => {
    setShowConfirmChangeDetectedMessage(false);
    setRowToConfirm(null);
  };

  const handleCancel = (rowIndex) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex] = { ...originalRows[rowIndex] };
      return updatedRows;
    });
    setEditingRows({});
  };

  const handleOpenDialog = (rowIndex) => {
    setRowToConfirm(rowIndex);
    setShowConfirmMessage(true);
  };

  const handleConfirmChanges = async (rowIndex) => {
    if (rowToConfirm !== null) {
      const updatedRow = rows[rowToConfirm];

      api(OMICS + "/" + updatedRow.uuid + "/", {
        method: "PATCH",
        body: updatedRow,
      })
        .then(({ ok, body }) => {
          if (ok) {
            handleEdit(rowIndex);
            navigate(0);
          } else {
            console.log("not ok");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(rows.length / pageSize);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setRowToConfirm(null);
  };

  return (
    <>
      <Box className="data-grid" sx={{ width: "100%", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            backgroundColor: backgroundColor ? backgroundColor : "#D9D9D9",
            border: "unset",
          }}
        >
          <thead>
            <tr style={{ width: "100%"}}>
              {columns.map((column, index) => (
                <th
                  key={column.field}
                  style={{
                    textAlign: column.headerAlign || "left",
                    height: column.height || "50px",
                    padding: "10px",
                    cursor: "pointer",
                    color: "#868FA0",
                    backgroundColor: "#F3F3F3",
                    borderTopLeftRadius: index === 0 && "20px"
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
                      {column.renderHeader
                        ? column.renderHeader({
                            value: "error",
                          })
                        : column.headerName}
                    </Box>

                    <Box sx={{ justifyContent: "right" }}>
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
                  </Box>
                </th>
              ))}
              <th style={{ backgroundColor: "#F3F3F3",borderTopRightRadius:"20px" }}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    height: "400px",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <Typography variant="body1" color="textSecondary">
                    {noDataMessage}
                  </Typography>
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, index) => (
                <React.Fragment key={index}>
                  <tr
                    key={index}
                    className={selectedRow === row ? "selected" : ""}
                    style={{border: "1px solid #F3F3F3"}}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={column.field}
                        style={{
                          fontSize:"14px",
                          textAlign: column.align || "left",
                          padding: "8px",
                          wordBreak: "break-word",
                          width: column.width || "auto",
                          height: editingRows[index] ? "120px" : "auto",
                          borderBottom:
                            colIndex === 0 && hasFilter ? "unset" : "",
                          backgroundColor:
                            colIndex === 0 && hasFilter ? "#F3F3F3" : "",
                        }}
                      >
                        {editingRows[index] ? (
                          <TextField
                            type="text"
                            value={row[column.field]}
                            onChange={(e) => {
                              const updatedRows = [...rows];
                              updatedRows[index][column.field] = e.target.value;
                              setRows(updatedRows);
                            }}
                            sx={{
                              mt: "5px",
                              mb: "10px",
                              "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                background: "#fff",
                                borderRadius: "10px",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderRadius: "10px",
                                border: "unset",
                              },
                              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                p: "9px",
                              },
                              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#E81F76 !important",
                                },
                            }}
                          />
                        ) : (
                          row[column.field]
                        )}
                      </td>
                    ))}
                    <td style={{
                          borderBottomRightRadius: "20px"}}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          mr: "10px",
                          ml: "10px",
                        }}
                      >
                        {editingRows[index] ? (
                          <>
                            <Button
                              sx={{
                                borderRadius: "50px",
                                backgroundColor: "#00AEC3",
                                color: "#fff",
                                cursor: "pointer",
                                padding: "5px 12px",
                                fontFamily: "Encode Sans",
                                fontSize: "12px",
                                fontWeight: "500",
                                width: "150px",
                                textTransform: "capitalize",
                                ":hover": {
                                  color: "#fff",
                                  backgroundColor: "#E81F76",
                                  transform: "scale(1.01)",
                                },
                              }}
                              onClick={() => handleOpenDialog(index)}
                            >
                              Aplicar cambios
                            </Button>
                            <Button
                              sx={{
                                borderRadius: "50px",
                                backgroundColor: "#fff",
                                color: "#000",
                                cursor: "pointer",
                                // padding: "5px 12px",
                                fontFamily: "Encode Sans",
                                fontSize: "12px",
                                fontWeight: "500",
                                mt: "10px",
                                width: "100%",
                                textTransform: "capitalize",
                                ":hover": {
                                  color: "#FFF",
                                  backgroundColor: "#000",
                                },
                              }}
                              onClick={() => handleCancel(index)}
                            >
                              Cancelar
                            </Button>
                          </>
                        ) : (
                          <IconButton
                            onClick={() => handleEdit(row,index)}
                            aria-label="row"
                            size="small"
                            // disabled={Object.keys(editingRows).length>0}
                          >
                            <EditIcon
                              sx={{ cursor: "pointer", width: "fit-content" }}
                            />
                          </IconButton>
                        )}
                      </Box>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
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
          {currentPage !== 1 &&
            <IconButton
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <KeyboardArrowLeftIcon sx={{ color: "#000",cursor:"pointer" }} />
            </IconButton>
          }
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn ${
                currentPage === index + 1 ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handlePageChange(index + 1)}
              style={{ margin: "0 5px",cursor: "pointer" }}
            >
              {index + 1}
            </button>
          ))}
          {currentPage !== totalPages &&
            <IconButton
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <KeyboardArrowRightIcon sx={{ color: "#000",cursor:"pointer" }} />
            </IconButton>
          }
        </Box>
      </Box>
      <Dialog
        open={showConfirmMessage}
        onClose={() => handleCloseDialog()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            border: "2px solid #00AEC3",
            padding: "40px 60px",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "22px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          ¿Está seguro de querer modificar los datos del organismo seleccionado?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "300",
              mb: "50px",
            }}
            id="alert-dialog-description"
          >
            Al hacerlo, se actualizará el sistema automaticamente .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              padding: "12px 12px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              width: "150px",
              border: "1px solid #000",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
              },
            }}
            onClick={() => handleCloseDialog()}
          >
            Cerrar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              padding: "12px 85px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#00AEC3",
                transform: "scale(1.01)",
              },
            }}
            onClick={() => handleConfirmChanges()}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmChangeDetectedMessage}
        onClose={handleCancelSwitchRow}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            border: "2px solid #00AEC3",
            padding: "40px 30px",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "22px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          ¡Cambios sin aplicar!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "300",
              mb: "50px",
            }}
            id="alert-dialog-description"
          >
            Tienes cambios sin aplicar. ¿Deseas descartarlos y continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              padding: "12px 12px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              width: "150px",
              border: "1px solid #000",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
              },
            }}
            onClick={handleCancelSwitchRow}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              padding: "12px 85px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#00AEC3",
                transform: "scale(1.01)",
              },
            }}
            onClick={handleConfirmSwitchRow}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataGrid;
