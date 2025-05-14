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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';

import { createTheme, ThemeProvider } from "@mui/material/styles";

const support_level = {
  "S/A": "unassigned",
  "Nivel 1 (N1)": "n1",
  "Nivel 2 (N2)": "n2",
  "Nivel 3 (N3)": "n3",
};
const support_level_order = [
  "S/A",
  "Nivel 1 (N1)",
  "Nivel 2 (N2)",
  "Nivel 3 (N3)",
];

const getNextLevel = (currentLevel) => {
  const currentIndex = support_level_order.indexOf(currentLevel);
  if (currentIndex === -1 || currentIndex === support_level_order.length - 1)
    return null;
  return support_level_order[currentIndex + 1];
};

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
          },
          "& .MuiDataGrid-row": {
            color: "#000",
            cursor: "pointer",
            minHeight: "50px !important",
            height: "100%",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#1DBDCD4F",
            minHeight: "50px !important",
          },
          "& .MuiDataGrid-container--top [role=row]": {
            backgroundColor: "#00AEC3",
            borderRadius: "50px",
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
            backgroundColor: "#1DBDCD4F !important",
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
    account,
    ticket,
    setTicket,
    navigate,
    handleOnSubmit,
    handleAddComment,
    handleAddInfoAditional,
    handleUpgradeTicket,
    showConfirm,
    setShowConfirm,
    setShowMessageConfirmCloseTicket,
    handleAddFile
  } = props;

  const [task, setTask] = useState("");
  const tabs = [
    "Descripción del problema",
    "Listado de incidencias",
    "Documentación adjunta",
  ];
  const [tabSelected, setTabSelected] = useState("Descripción del problema");
  const [taskSelected, setTaskSelected] = useState();
  const [showTask, setShowTask] = useState(false);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [showCreateComment, setShowCreateComment] = useState(false);
  const [
    showRequestAdditionalInformation,
    setShowRequestAdditionalInformation,
  ] = useState(false);
  const extensionMap = {
    docx: "doc",
  };
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

  const handleOpenTaskDialog = (taskItem = null) => {
    if (taskItem) {
      setTaskSelected(taskItem);
      setTask(taskItem.text);
    } else {
      setTaskSelected(null);
      setTask("");
    }
    setShowTask(true);
  };
  const handleCloseTaskDialog = () => {
    setShowTask(false);
    setTask("");
    setTaskSelected(null);
  };
  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = {
        id: ticket.tasks ? ticket.tasks.length : 0,
        text: task.trim(),
        resolved: "",
      };
      setTicket((prev) => ({
        ...prev,
        tasks: [...prev.tasks, newTask],
      }));
      setTask("");
      setShowTask(false);
    }
  };

  function CustomNoTasksOverlay() {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mb: "10px" }}>No se encontraron tareas</Typography>
        <Button
          sx={{
            borderRadius: "20px",
            backgroundColor: "#00AEC3",
            color: "#fff",
            padding: "5px 20px",
            fontFamily: "Encode Sans",
            fontSize: "12px",
            fontWeight: "500",
            textTransform: "capitalize",
            ":hover": {
              color: "#FFF",
              backgroundColor: "#E81F76",
            },
          }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpenTaskDialog()}
        >
          Agregar tarea
        </Button>
        <Typography sx={{ mt: "10px" }}>
          Al finalizar la carga aplique los cambios
        </Typography>
      </Box>
    );
  }

  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = ticket.tasks.filter(
      (task) => task.id !== taskToDelete.id
    );
    setTicket((prev) => ({
      ...prev,
      tasks: updatedTasks,
    }));
  };

  const handleTaskChange = (id, value) => {
    const updatedTasks = [...ticket.tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], resolved: value };
      setTicket((prev) => ({
        ...prev,
        tasks: updatedTasks,
      }));
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL_MEDIA + fileUrl
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const columnsTab1 = [
    {
      field: "action",
      headerName: "Acciones",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="swt-table-field-name">
          <IconButton
            onClick={() => handleOpenTaskDialog(params.row)}
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
          {account.roles[0].name === "Admin" && (
            <IconButton
              onClick={() => handleDeleteTask(params.row)}
              aria-label="row"
              size="medium"
              sx={{
                "&.MuiButtonBase-root.MuiIconButton-root:hover": {
                  backgroundColor: "unset",
                  transform: "scale(1.10)",
                },
              }}
            >
              <DeleteOutlineIcon
                sx={{
                  cursor: "pointer",
                  width: "fit-content",
                  color: "#00AEC3",
                }}
              />
            </IconButton>
          )}
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
              "&:hover": {
                backgroundColor: "#E81F76",
                color: "#fff",
              },
            }}
            onClick={() => handleTaskChange(params.row.id, "resolved")}
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
              "&:hover": {
                backgroundColor: "#E81F76",
                color: "#fff",
              },
            }}
            onClick={() => handleTaskChange(params.row.id, "unsolved")}
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
              "&:hover": {
                backgroundColor: "#E81F76",
                color: "#fff",
              },
            }}
            onClick={() =>
              window.open(
                process.env.REACT_APP_BACKEND_URL_MEDIA + params.value,
                "_blank"
              )
            }
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
              "&:hover": {
                backgroundColor: "#E81F76",
                color: "#fff",
              },
            }}
            onClick={() =>
              handleDownload(params.value, params.value.split("/").pop())
            }
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
    <Content className="swt-dashboard" isLoaded="true">
      <div style={{ margin: "30px 100px", height: "calc(100% - 90px)" }}>
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
              sx={{ ml: "20px", fontSize: "20px", fontWeight: "200" }}
            >
              Reclamo asignado a:{" "}
              {ticket.assigned ? ticket.assigned.full_name : "S/A"}
            </Typography>
          </Box>
          <Box sx={{ mt: "20px" }}>
            <Box
              sx={{
                backgroundColor: "#ECEAEA",
                borderRadius: "10px",
                p: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{ fontSize: "15px", fontWeight: "200", mt: "5px" }}
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
                <>
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
                        noRowsOverlay: CustomNoTasksOverlay,
                      }}
                      rowHeight={33}
                    />
                  </ThemeProvider>
                  {ticket.tasks.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end",
                        alignItems: "center",
                        mt: "10px",
                        mr:"20px",
                      }}
                    >
                      <Typography sx={{ fontSize: "12px" }}>
                        Al finalizar la carga aplique los cambios
                      </Typography>
                      <Button
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
                          ":hover": {
                            color: "#FFF",
                            backgroundColor: "#E81F76",
                          },
                        }}
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => handleOpenTaskDialog()}
                      >
                        Agregar tarea
                      </Button>
                    </Box>
                  )}
                </>
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
                        mt: "20px",
                        overflow: "auto",
                        height: "150px",
                        p:"20px",
                        width:"100%"
                      }}
                    >
                      {ticket.activity.length === 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
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
                          <Typography sx={{ width: "100%", p: "10px" }}>
                            <span style={{ fontWeight: "600",color: activity.type === "user_add_info" ? "#00AEC3":"#E81F76" }}>{activity.user}</span>: “{activity.content}”{" "}
                            <span
                              style={{ fontStyle: "italic", fontWeight: "300" }}
                            >
                              {activity.timestamp}
                              {console.log(activity)}
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
        <Box
          sx={{
            mt: "40px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              alignItems: "center",
            }}
          >
            {ticket.support_level !== "Nivel 3 (N3)" && (
              <Button
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "9px 20px",
                  fontFamily: "Encode Sans",
                  fontSize: "14px",
                  fontWeight: "400",
                  textTransform: "capitalize",
                  border: "1px solid #000",
                  ":hover": {
                    color: "#FFF",
                    backgroundColor: "#00AEC3",
                    border: "unset",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#E7E5E4",
                    border: "#E7E5E4",
                  },
                }}
                onClick={() =>
                  handleUpgradeTicket(
                    support_level[getNextLevel(ticket.support_level)]
                  )
                }
                disabled={ticket.support_level === "S/A"}
              >
                Elevar ticket a {getNextLevel(ticket.support_level)}
              </Button>
            )}
            <Button
              sx={{
                borderRadius: "5px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "9px 20px",
                fontFamily: "Encode Sans",
                fontSize: "14px",
                fontWeight: "400",
                textTransform: "capitalize",
                border: "1px solid #000",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  border: "unset",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E7E5E4",
                  border: "#E7E5E4",
                },
              }}
              disabled={ticket.status === "closed"}
              onClick={() =>
                setShowRequestAdditionalInformation(
                  !showRequestAdditionalInformation
                )
              }
            >
              Solicitar información adicional
            </Button>
            <Button
              sx={{
                borderRadius: "5px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "9px 20px",
                fontFamily: "Encode Sans",
                fontSize: "14px",
                fontWeight: "400",
                textTransform: "capitalize",
                border: "1px solid #000",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  border: "unset",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E7E5E4",
                  border: "#E7E5E4",
                },
              }}
              disabled={ticket.status === "closed"}
              onClick={() => setShowMessageConfirmCloseTicket(true)}
            >
              Marcar como ticket resuelto
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                borderRadius: "5px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "9px 20px",
                fontFamily: "Encode Sans",
                fontSize: "14px",
                fontWeight: "400",
                textTransform: "capitalize",
                border: "1px solid #000",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  border: "unset",
                },
              }}
              onClick={() => navigate("/tickets")}
            >
              Volver
            </Button>
            <Button
              sx={{
                borderRadius: "5px",
                backgroundColor: "#E81F76",
                color: "#fff",
                padding: "9px 20px",
                fontFamily: "Encode Sans",
                fontSize: "14px",
                fontWeight: "600",
                ml: "10px",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#00AEC3",
                  border: "unset",
                },
              }}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              APLICAR CAMBIOS
            </Button>
          </Box>
        </Box>
        <Dialog
          open={showTask}
          onClose={handleCloseTaskDialog}
          PaperProps={{
            sx: {
              width: "600px",
              borderRadius: "15px",
              padding: "20px",
            },
          }}
        >
          <DialogTitle>
            {taskSelected ? "Ver Tarea" : "Agregar Nueva Tarea"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              multiline
              rows={4}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              disabled={taskSelected !== null}
              placeholder="Describe la tarea..."
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
              onClick={handleCloseTaskDialog}
              sx={{
                borderRadius: "20px",
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
              {taskSelected ? "Cerrar" : "Cancelar"}
            </Button>
            {!taskSelected ? (
              <Button
                onClick={handleAddTask}
                disabled={!task.trim()}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#00AEC3",
                  color: "#fff",
                  padding: "7px 24px",
                  fontFamily: "Encode Sans",
                  fontSize: "15px",
                  fontWeight: "500",
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
                Agregar
              </Button>
            ) : (
              <Button
                onClick={handleCloseTaskDialog}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#00AEC3",
                  color: "#fff",
                  padding: "7px 24px",
                  fontFamily: "Encode Sans",
                  fontSize: "15px",
                  fontWeight: "500",
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
                Aceptar
              </Button>
            )}
          </DialogActions>
        </Dialog>
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
              onClick={() => setShowCreateComment(!showCreateComment)}
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
              onClick={() => handleAddComment(comment)}
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
        <Dialog
          open={showRequestAdditionalInformation}
          onClose={() =>
            setShowRequestAdditionalInformation(
              !showRequestAdditionalInformation
            )
          }
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
          <DialogTitle>
            Ticket {">"} Solicitar información adicional
          </DialogTitle>
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
              <Typography sx={{ fontSize: "17px", fontWeight: "200" }}>
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
                sx={{ ml: "20px", fontSize: "17px", fontWeight: "200" }}
              >
                Reclamo de origen: {ticket.claim}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "14px", fontWeight: "300", mt: "5px" }}>
              Detallá la solicitud de la información adicional necesaria
            </Typography>
            <Box
              sx={{
                backgroundColor: "#ECEAEA",
                borderRadius: "10px",
                border: "1px solid #646464",
                p: "10px",
              }}
            >
              <Box sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    p: "20px",
                    borderRadius: "8px",
                    border: "0.5px solid #B1B1B1",
                    borderCollapse: "collapse",
                    backgroundColor: "#fff",
                  }}
                >
                  Solicitud de información adicional
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  sx={{
                    borderRadius: "0px 0px 10px 10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0px 0px 10px 10px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ mr: "24px", p: "0px", gap: "10px" }}>
            <Button
              onClick={() =>
                setShowRequestAdditionalInformation(
                  !showRequestAdditionalInformation
                )
              }
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
                textTransform: "capitalize",
                cursor: "pointer",
                "&.Mui-disabled": {
                  backgroundColor: "#8F8881",
                  color: "#fff",
                },
              }}
              disabled={comment === ""}
            >
              SOLICITAR INFO ADICIONAL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Content>
  );
}

export default ViewTicketComponent;
