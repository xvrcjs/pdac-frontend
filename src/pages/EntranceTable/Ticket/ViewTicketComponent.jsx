import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';

import { createTheme, ThemeProvider } from "@mui/material/styles";
const extensionMap = {
  docx: "doc",
}
const themeTable = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "unset",
          minHeight: "300px",
          contain: "content",
          "& .MuiDataGrid-main": {
            backgroundColor: "#fff",
            border: "unset",
          },
          "& .MuiDataGrid-cell": {
            border: "unset",
            minHeight: "50px",
            fontSize: "15px",
            borderBottom: "0.5px solid #ECEAEA",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            opacity:"0.5",
          },
          "& .MuiDataGrid-row": {
            color: "#000",
            cursor: "pointer",
            minHeight: "50px !important",
            height: "100%",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "unset !important",
            minHeight: "50px !important",
          },
          "& .MuiDataGrid-container--top [role=row]": {
            backgroundColor: "#D9D9D9",
          },
          "& .MuiDataGrid-row--borderBottom .MuiDataGrid-columnHeader": {
            borderBottom: "unset",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "unset",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#00AEC3",
            fontFamily: "Encode Sans",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "18px",
            textAlign: "center",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "unset",
          },
          "& .Mui-selected": {
            backgroundColor: "unset !important",
          },
          "& .MuiDataGrid-filler": {
            "--rowBorderColor:": "unset !important",
          },
        },
      },
    },
  },
});

function ViewTicketComponent(props) {
  const {
    ticket,
    setTicket,
    navigate,
    handleOnSubmit,
    handleAddComment,
    handleAddInfoAditional,
    showConfirm,
    setShowConfirm,
    showViewTicket,
    setShowViewTicket,
    handleAddFile
  } = props;

  const tabs = [
    "Descripción del problema",
    "Listado de incidencias",
    "Documentación adjunta",
  ];
  const [tabSelected, setTabSelected] = useState("Descripción del problema");
  const [comment, setComment] = useState("");
  const [showCreateComment, setShowCreateComment] = useState(false);
  const [file, setFile] = useState(null);

  function CustomNoRowsOverlay() {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="swt-manager-filter-empty-title">
          No se encontro información
        </p>
      </Box>
    );
  }


  const columnsTab1 = [
    {
      field: "action",
      headerName: "Ver",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
        >
          <IconButton
            aria-label="row"
            size="medium"
            sx={{
              "&.MuiButtonBase-root.MuiIconButton-root:hover": {
                backgroundColor: "unset",
                transform: "scale(1.10)",
              },
            }}
          >
            <RemoveRedEyeOutlinedIcon
              sx={{
                cursor: "pointer",
                width: "fit-content",
                color: "#00AEC3",
              }}
            />
          </IconButton>
        </div>
      ),
    },
    {
      field: "text",
      headerName: "Tareas",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "70%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "resolved",
      headerName: "Estado actual",
      flex: 0.4,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            
          }}
        >
          <Typography
            className="swt-table-field-name"
            sx={{
              borderRadius: "15px",
              border: "1px solid #E81F76",
              borderColor: params.value === "unsolved" && "#bbb",
              minWidth: "80px",
              p: "5px 10px",
              fontSize: "15px",
              cursor: "pointer",
              backgroundColor: params.value === "resolved" ? "#E81F76" : "#fff",
              color:
                params.value === "resolved"
                  ? "#fff"
                  : params.value === "unsolved"
                  ? "#bbb"
                  : "#000",
            }}
          >
            Resuelto
          </Typography>
          <Typography
            className="swt-table-field-name"
            sx={{
              borderRadius: "15px",
              border: "1px solid #E81F76",
              borderColor: params.value === "resolved" && "#bbb",
              minWidth: "80px",
              p: "5px 10px",
              fontSize: "15px",
              cursor: "pointer",
              backgroundColor: params.value === "unsolved" ? "#E81F76" : "#fff",
              color:
                params.value === "unsolved"
                  ? "#fff"
                  : params.value === "resolved"
                  ? "#bbb"
                  : "#000",
            }}
          >
            No resuelto
          </Typography>
        </div>
      ),
    },
  ];
  const columnsTab2 = [
    {
      field: "file_name",
      headerName: "Archivo",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="swt-table-field-name"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "70%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "file",
      headerName: "Descarga",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              backgroundColor: "#fff",
              fontSize: "15px",
              cursor: "pointer",
              borderRadius: "15px",
              border: "1px solid #E81F76",
              textAlign: "center",
              minWidth: "80px",
              p: "5px 10px",
            }}
          >
            Ver
          </Typography>
          <Typography
            sx={{
              backgroundColor: "#fff",
              fontSize: "15px",
              cursor: "pointer",
              borderRadius: "15px",
              border: "1px solid #E81F76",
              minWidth: "80px",
              textAlign: "center",
              p: "5px 10px",
            }}
          >
            Descargar
          </Typography>
        </Box>
      ),
    },
    {
      field: "created_at",
      headerName: "Fecha de creación",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name">{params.value}</div>
      ),
    },
  ];

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const allowedExtensions = ["pdf", "doc", "docx", "png", "jpg", "jpeg"];
      const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        setFile(uploadedFile);
      }
    }
  };
  return (
    <Dialog 
      open={showViewTicket}
      onClose={() => setShowViewTicket(!showViewTicket)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "&.MuiDialog-root .MuiDialog-paper": {
          padding: "20px 20px",
          borderRadius: "20px",
          maxWidth: "100%",
          width: "90%",
          contain: "content",
          overflow: "unset",
        },
      }}>
      <div style={{ margin: "30px 100px", height: "calc(100% - 90px)"}}>
        <Box>
          <Typography
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
            Gestión de ticket {">"} Revisión {ticket.support_level}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ECEAEA",
              p: "20px",
              borderRadius: "5px",
              mt: "10px",
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "200" }}>
              Ticket pendiente de resolución:
            </Typography>
            <Typography
              sx={{
                background: "#E81F76",
                color: "#fff",
                borderRadius: "5px",
                p: "10px 12px",
                ml: "10px",
              }}
            >
              Nro de Ticket:{" "}
              <span style={{ fontWeight: "700" }}>{ticket.id}</span>
            </Typography>
            <Typography
              sx={{ ml:"20px",fontSize: "20px", fontWeight: "200" }}
            >
              Reclamo asignado a: {ticket.assigned ? ticket.assigned.full_name:"S/A"}
            </Typography>
          </Box>
          <Box sx={{ mt: "20px" }}>
            <Box
              sx={{
                backgroundColor: "#ECEAEA",
                borderRadius: "10px",
                p: "20px",
                overflow:"auto",
                contain:"content",
                height:"400px"
              }}
            >
              <Box
                sx={{
                   display:"flex",
                   flexDirection:"row",
                   justifyContent:"space-between",
                }}
                >
                <Typography
                  sx={{ fontSize: "15px", fontWeight: "200",mt:"5px" }}
                >
                  Reclamo de origen: {ticket.claim}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                  }}
                >
                  {tabs.map((tab, index) => (
                    <Typography
                      sx={{
                        borderRadius: "5px 19px 0px 0px",
                        backgroundColor:
                          tab === tabSelected ? "#00AEC3" : "#D9D9D9",
                        fontWeight: "500",
                        p: "5px 40px",
                        cursor: "pointer",
                        color: tab === tabSelected ? "#fff" : "#000",
                      }}
                      onClick={() => setTabSelected(tab)}
                    >
                      {tab}
                    </Typography>
                  ))}
                </Box>
              </Box>
              {tabSelected === "Listado de incidencias" && (
                <ThemeProvider theme={themeTable}>
                  <DataGrid
                    rows={ticket.tasks}
                    columns={columnsTab1}
                    getRowId={(row) => row.id}
                    disableColumnMenu
                    disableColumnSorting
                    hideFooter
                    columnHeaderHeight={40}
                    initialState={{
                      sorting: {
                        sortModel: [{ field: "name", sort: "asc" }],
                      },
                    }}
                    slots={{
                      noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    rowHeight={33}
                  />
                </ThemeProvider>
              )}
              {tabSelected === "Documentación adjunta" && (
                <>
                <ThemeProvider theme={themeTable}>
                  <DataGrid
                    rows={ticket.files}
                    columns={columnsTab2}
                    getRowId={(row) => row.uuid} // Usamos uuid como id
                    disableColumnMenu
                    disableColumnSorting
                    hideFooter
                    columnHeaderHeight={40}
                    initialState={{
                      sorting: {
                        sortModel: [{ field: "name", sort: "asc" }],
                      },
                    }}
                    slots={{
                      noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    rowHeight={33}
                  />
                </ThemeProvider>
                 <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "end",
                      mr:"20px",
                      mt: "10px",
                    }}
                  >
                    {file ? (
                      <Box sx={{display:"flex",flexDirection:"row"}}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            height: "40px",
                            background: "rgba(217, 217, 217, 0.50)",
                            borderRadius: "8px",
                            p: "0px 10px",
                            justifyContent: "space-between",
                          }}
                        >
                          <img
                            style={{ width: "25px" }}
                            src={`../../icons/file-${
                              extensionMap[
                                file.name.split(".").pop().toLowerCase()
                              ] || file.name.split(".").pop().toLowerCase()
                            }.svg`}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              width: "100px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              textAlign: "center",
                              ml: "5px",
                            }}
                          >
                            {file.name}
                          </Typography>
                          <img
                            style={{ width: "13px", cursor: "pointer" }}
                            onClick={() => setFile(null)}
                            src="../../icons/delete.png"
                          />
                        </Box>
                        <Button
                          component="label"
                          sx={{
                            borderRadius: "10px",
                            backgroundColor: "#00AEC3",
                            color: "#fff",
                            padding: "5px 20px",
                            fontFamily: "Encode Sans",
                            fontSize: "12px",
                            fontWeight: "500",
                            ml: "20px",
                            textTransform: "capitalize",
                            cursor: "pointer",
                            ":hover": {
                              color: "#FFF",
                              backgroundColor: "#E81F76",
                            },
                          }}
                          onClick={() => handleAddFile(file)}
                          startIcon={<PublishOutlinedIcon />}
                        >
                          Subir archivo
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        component="label"
                        sx={{
                          borderRadius: "10px",
                          backgroundColor: "#00AEC3",
                          color: "#fff",
                          padding: "5px 20px",
                          fontFamily: "Encode Sans",
                          fontSize: "12px",
                          fontWeight: "500",
                          ml: "20px",
                          height: "40px",
                          textTransform: "capitalize",
                          cursor: "pointer",
                          ":hover": {
                            color: "#FFF",
                            backgroundColor: "#E81F76",
                          },
                        }}
                        startIcon={<BackupOutlinedIcon />}
                      >
                        Agregar documentación
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          hidden
                          onChange={handleFileUpload}
                        />
                      </Button>
                    )}
                  </Box>
                  </>
              )}
              {tabSelected === "Descripción del problema" && (
                <>
                <Box
                  sx={{
                    border: "1px solid #D6D3D1",
                    p: "20px",
                    borderRadius: "10px 0px 10px 10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography>Descripción del problema</Typography>
                  <TextField
                    maxRows={Infinity}
                    minRows={12}
                    multiline
                    value={ticket.problem_description}
                    disabled
                    name="description"
                    className="swt-user-select-content"
                    sx={{
                      width: "100%",
                      backgroundColor: "#fff",
                      border: "1px solid #D6D3D1",
                      mt: "5px",
                      "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        p: "0px 10px",
                        fontFamily: "Encode Sans",
                        overflow: "scroll !important",
                        // maxHeight: "550px",
                        // height: "250px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "unset",
                      },
                      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "unset !important",
                        borderColor: "unset !important",
                      },
                    }}
                    aria-label="maximum height"
                  />
                </Box>
                <Box
                sx={{
                  mt: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    p: "20px",
                    borderBottom: "0.5px solid #B1B1B1",
                    borderCollapse: "collapse",
                  }}
                >
                  Historial de acciones y comentarios
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "15px",
                    ml: "20px",
                    mt: "20px",
                    overflow: "auto",
                    height: "150px",
                  }}
                >
                  {ticket.activity.length === 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent:"center",
                        height: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "300",
                          color: "rgba(29, 28, 29, 0.70",
                        }}
                      >
                        No hay movimientos para mostrar.
                      </Typography>
                    </Box>
                  ) : (
                    ticket.activity.map((activity, index) => (
                      <Typography sx={{ width: "80%", p: "10px" }}>
                        {activity.user}: “{activity.content}”{" "}
                        <span
                          style={{ fontStyle: "italic", fontWeight: "300" }}
                        >
                          {activity.timestamp}
                        </span>
                      </Typography>
                    ))
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    width: "98%",
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#00AEC3",
                      color: "#fff",
                      padding: "2px 15px",
                      fontFamily: "Encode Sans",
                      fontSize: "14px",
                      fontWeight: "400",
                      mb: "20px",
                    }}
                    onClick={() => setShowCreateComment(!showCreateComment)}
                  >
                    Agregar comentario
                  </Button>
                </Box>
              </Box>
              </>
              )}
            </Box>
          </Box>
        </Box>
        <Dialog
          open={showCreateComment}
          onClose={() => setShowCreateComment(!showCreateComment)}
          sx={{
            "&.MuiDialog-root .MuiDialog-paper": {
              padding: "20px 20px",
              borderRadius: "50px",
              maxWidth: "100%",
              width: "961px",
              overflow: "unset",
              contain: "content",
            },
          }}
        >
          <DialogTitle>Ticket {">"} Agregar comentario</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#ECEAEA",
                p: "20px",
                borderRadius: "5px",
                mt: "10px",
              }}
            >
              <Typography
                sx={{
                  background: "#E81F76",
                  color: "#fff",
                  borderRadius: "5px",
                  p: "10px 12px",
                  ml: "10px",
                }}
              >
                Nro de Ticket:{" "}
                <span style={{ fontWeight: "700" }}>{ticket.id}</span>
              </Typography>
              <Typography
                sx={{ ml: "20px", fontSize: "20px", fontWeight: "200" }}
              >
                Reclamo de origen: {ticket.claim}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "14px", fontWeight: "300", mt: "5px" }}>
              Detalla el comentario a continuación:
            </Typography>
            <TextField
              margin="dense"
              fullWidth
              multiline
              rows={10}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              sx={{
                border: "1px solid #D6D3D1",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "unset !important",
                  borderColor: "unset !important",
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ mr: "24px", p: "0px" }}>
            <Button
              onClick={() => (setComment(""),setShowCreateComment(!showCreateComment))}
              sx={{
                borderRadius: "4px",
                color: "#000",
                padding: "7px 24px",
                fontFamily: "Encode Sans",
                fontSize: "15px",
                fontWeight: "500",
                textTransform: "capitalize",
                cursor: "pointer",
                border: "1px solid #838383",
              }}
            >
              CERRAR
            </Button>
            <Button
              onClick={() => handleAddInfoAditional(comment)}
              sx={{
                borderRadius: "4px",
                backgroundColor: "#E81F76",
                color: "#fff",
                padding: "7px 24px",
                fontFamily: "Encode Sans",
                fontSize: "15px",
                fontWeight: "500",
                ml: "20px",
                textTransform: "capitalize",
                cursor: "pointer",
                "&.Mui-disabled": {
                  backgroundColor: "#8F8881",
                  color: "#fff",
                },
              }}
              disabled={comment === ""}
            >
              AGREGAR COMENTARIO
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showConfirm}
          onClose={() => setShowConfirm(!showConfirm)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "&.MuiDialog-root .MuiDialog-paper": {
              padding: "30px 20px",
              borderRadius: "50px",
              maxWidth: "100%",
              width: "961px",
              margin: "auto",
            },
          }}
        >
          <DialogTitle
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "24px",
              fontWeight: "600",
            }}
            id="alert-dialog-title"
          >
            ¿Desea confirmar los cambios?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "20px",
                fontWeight: "200",
                mb: "50px",
                position: "relative",
              }}
              id="alert-dialog-description"
            >
              Al aceptar, los cambios impactaran automáticamente en el sistema.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mr: "24px", p: "0px" }}>
            <Button
              onClick={() => setShowConfirm(!showConfirm)}
              sx={{
                borderRadius: "50px",
                color: "#000",
                padding: "12px 24px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "500",
                width: "189px",
                textTransform: "capitalize",
                cursor: "pointer",
                border: "1px solid #838383",
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleOnSubmit()}
              sx={{
                borderRadius: "50px",
                backgroundColor: "#00AEC3",
                color: "#fff",
                padding: "12px 24px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "500",
                width: "197px",
                ml: "20px",
                textTransform: "capitalize",
                cursor: "pointer",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                "&.Mui-disabled": {
                  backgroundColor: "#8F8881",
                  color: "#fff",
                },
              }}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Dialog>
  );
}

export default ViewTicketComponent;
