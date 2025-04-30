import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  Select,
  FormControl,
  OutlinedInput,
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Grid from "@mui/material/Grid2";

function TicketComponent(props) {
  const {
    account,
    values,
    setFieldValue,
    claimInfo,
    touched,
    errors,
    isValid,
    dirty,
    handleBlur,
    navigate,
    handleChange,
    handleOnSubmit,
    resetForm,
    showCreateTicket,
    setShowCreateTicket,
    showConfirm,
    setShowConfirm,
    claim,
  } = props;

  const [task, setTask] = useState("");
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const extensionMap = {
    docx: "doc",
  };
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    if (uploadedFiles.length > 0) {
      const allowedExtensions = ["pdf", "doc", "docx", "png", "jpg", "jpeg"];
      const validFiles = uploadedFiles.filter((file) =>
        allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
      );
      if (validFiles.length > 0) {
        setFieldValue("files", [...values.files, ...validFiles]);
      }
    }
  };

  const handleFileDelete = (index) => {
    const updatedFiles = values.files.filter((_, i) => i !== index);
    setFieldValue("files", updatedFiles);
  };

  const handleRemove = (index) => {
    const updatedTasks = values.tasks.filter((_, i) => i !== index);
    setFieldValue("tasks", updatedTasks);
  };

  const handleChangeTask = (event) => {
    const value = event.target.value;
    setTask(value);
  };

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = {
        id: values.tasks ? values.tasks.length : 0,
        text: task.trim(),
        resolved: "",
      };
      setFieldValue("tasks", [...values.tasks, newTask]);
      setTask(""); 
      setOpenTaskDialog(false);
    }
  };

  const handleOpenTaskDialog = (taskItem = null) => {
    if (taskItem) {
      setSelectedTask(taskItem);
      setTask(taskItem.text);
    } else {
      setSelectedTask(null);
      setTask("");
    }
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
    setTask("");
    setSelectedTask(null);
  };

  return (
    <>
      <Dialog
        open={showCreateTicket}
        onClose={() => setShowCreateTicket(!showCreateTicket)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "24px",
            fontWeight: "500",
          }}
          id="alert-dialog-title"
        >
          <Typography
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
            Solicitar soporte {">"} Creación de Ticket
          </Typography>
          <Typography sx={{ fontSite: "20px", fontWeight: "200" }}>
            Detallá y adjunta la información necesaria para que el equipo de
            soporte pueda ayudarte correctamente.
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#ECEAEA",
            borderRadius: "5px",
            p: "10px 20px !important",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "500", mb: "15px" }}>
            Reclamo {claim.id}
          </Typography>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#57534E",
              }}
            >
              Descripción del problema
            </Typography>
            <TextField
              maxRows={Infinity}
              minRows={7}
              multiline
              value={values.description}
              onChange={handleChange}
              error={Boolean(touched.description && errors.description)}
              name="description"
              className="swt-user-select-content"
              sx={{
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #D6D3D1",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  p: "0px 10px",
                  fontFamily: "Encode Sans",
                  overflow: "scroll !important",
                  maxHeight: "150px",
                  height: "150px",
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
              placeholder="Describa aquí su problema.."
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#57534E",
                mt: "5px",
              }}
            >
              Listado de tareas del ticket
            </Typography>
            <Box
              sx={{
                maxHeight: "155px",
                backgroundColor: "#fff",
                border: "1px solid #D6D3D1",
                borderRadius: "15px",
                p: "20px 20px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                overflow:"auto",
              }}
            >
              <Box
                sx={{
                  overflow: "auto",
                }}
              >
                {values.tasks.map((task, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => handleRemove(index)}
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
                          color: "#000",
                        }}
                      />
                    </IconButton>
                    <Typography
                      onClick={() => handleOpenTaskDialog(task)}
                      sx={{
                        width: "300px",
                        wordBreak: "break-word",
                        height: "auto",
                        minHeight: "12px",
                        border: "1px solid #D6D3D1",
                        borderRadius: "10px",
                        p: "5px 10px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                    >
                      {task.text}
                    </Typography>
                    <IconButton
                      onClick={() => handleOpenTaskDialog(task)}
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
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  mt: "10px",
                }}
              >
                <Button
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#00AEC3",
                    color: "#fff",
                    padding: "3px 20px",
                    fontFamily: "Encode Sans",
                    fontSize: "12px",
                    fontWeight: "500",
                    ml: "20px",
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
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.125rem",
                fontWeight: "400",
                marginBottom: "10px",
                color: "#57534E",
                mt: "10px",
              }}
            >
              Adjuntar archivos
            </Typography>
            <Box
              sx={{
                borderRadius: "8px",
                borderColor: "#D6D3D1",
                borderStyle: "dashed",
                display: "block",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                p: 2,
              }}
            >
              <Grid container spacing={2}>
                {values.files.map((file, index) => (
                  <Grid item xs={12} sm={4} key={index}>
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
                        onClick={() => handleFileDelete(index)}
                        src="../../icons/delete.png"
                      />
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      border: "unset",
                      width: "100%",
                      height: "36px",
                      color: "#000",
                      backgroundColor: "#B9EBF0",
                      fontFamily: "Encode Sans",
                      fontSize: "1rem",
                      fontWeight: "400",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    Subir archivos
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      hidden
                      multiple
                      onChange={handleFileUpload}
                    />
                    <img
                      width={25}
                      style={{ marginLeft: "15px" }}
                      src="../../icons/cloud-upload.png"
                    />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mt: "20px" }}>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "500",
              width: "189px",
              height: "47px",
            }}
            onClick={() => (
              setShowCreateTicket(!showCreateTicket), resetForm()
            )}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              height: "47px",
              "&.Mui-disabled": {
                backgroundColor: "#8F8881",
                color: "#fff",
              },
            }}
            disabled={!(isValid && dirty)}
            onClick={() => {
              setShowConfirm(!showConfirm),
              setShowCreateTicket(!showCreateTicket)
            }}
          >
            Crear ticket
          </Button>
        </DialogActions>

        <Dialog
          open={openTaskDialog}
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
            {selectedTask ? "Ver Tarea" : "Agregar Nueva Tarea"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              multiline
              rows={4}
              value={task}
              onChange={handleChangeTask}
              disabled={selectedTask !== null}
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
              {selectedTask ? "Cerrar" : "Cancelar"}
            </Button>
            {!selectedTask ? (
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
          ¿Desea confirmar la creación del Ticket de soporte?
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
            En caso de no querer confirmar la creación, haga click en “cancelar”
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: "24px", p: "0px" }}>
          <Button
            onClick={() => (
              setShowConfirm(!showConfirm),
              setShowCreateTicket(!showCreateTicket)
            )}
            sx={{
              borderRadius: "50px",
              color: "#000",
              padding: "12px 24px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              width:"189px",
              textTransform: "capitalize",
              cursor: "pointer",
              border: "1px solid #838383",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => handleOnSubmit(values)}
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              padding: "12px 24px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              width:"197px",
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
            Crear ticket
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TicketComponent;
