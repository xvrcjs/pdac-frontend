import React, { useState } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  InputLabel,
  Button,
  TextField,
  Avatar,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Stack,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  CloudUploadOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { tokens } from "../../../theme";
import DropzoneComponent from "components/DragAndDrop/DropzoneComponent";

import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 56, //56
  height: 32, //32
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 30,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(18px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 4,
    "&.Mui-checked": {
      transform: "translateX(24px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#177ddc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 24,
    height: 24,
    borderRadius: 12,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 32 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
}));

function NewUserComponent(props) {
  const { values, handleChange, handleOnSubmit, roles, permissions } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const [showConfirmCreate, setShowConfirmCreate] = useState(false);
  const [showConfirmSendEmail,setShowConfirmSendEmail]= useState(false);
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setFiles([event.target.files[0]]);
  };
  const handleRemoveImage = (event) => {
    setFiles([]);
  };

  const handleBackWithOutSave = () => {
    navigate("/");
  };

  const handleSaveUser = ()=>{
    setShowConfirmCreate(!showConfirmCreate)
    setShowConfirmSendEmail(!showConfirmSendEmail)
  }
  return (
    <Content className="swt-dashboard" isLoaded="true">
      <Box
        sx={{
          margin: "100px 200px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "#34394C",
                    fontWeight: "500",
                    marginBottom: "20px",
                  }}
                >
                  Foto de perfil
                </Typography>
                <Box sx={{ marginBottom: "20px" }}>
                  <Box
                    sx={{
                      border: "2px dotted #007EF6",
                      borderRadius: "50%",
                      width: "240px",
                      height: "240px",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <DropzoneComponent
                      setFiles={setFiles}
                      setIsDragActive={setIsDragActive}
                    />
                    <Box
                      sx={{
                        borderRadius: "50%",
                        minWidth: "220px",
                        minHeight: "220px",
                        backgroundColor: "#D1E8FD",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        border: isDragActive ? "1px solid #007EF6" : "none",
                      }}
                    >
                      {isDragActive ? (
                        <Typography>Soltar</Typography>
                      ) : (
                        <>
                          {/** Queda resolver un pequeño bug*/}
                          {files && files.length > 0 ? (
                            <Avatar
                              src={URL.createObjectURL(files[0])}
                              alt={files[0].name}
                              sx={{
                                minWidth: "220px",
                                minHeight: "220px",
                              }}
                            />
                          ) : (
                            <>
                              <img
                                src="../assets/perfil_default.svg"
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  borderRadius: "8px",
                                  width: "43px",
                                  height: "43px",
                                  marginBottom: "20px",
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  color: "#1A2132",
                                }}
                              >
                                <Typography variant="span" color={"#004DEF"}>
                                  Selecciona
                                </Typography>{" "}
                                o arrastra una imagen
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "8px",
                                  color: "#5C5C7C",
                                }}
                              >
                                Formatos compatibles: jpg, jpeg, png
                              </Typography>
                            </>
                          )}
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <InputLabel
                    htmlFor="textfield"
                    sx={{
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#007EF6",
                      display: "flex",
                      alignItems: "center",
                      marginX: "20px",
                    }}
                  >
                    <CloudUploadOutlined
                      sx={{
                        color: "#007EF6",
                        marginRight: "5px",
                        width: "15px",
                      }}
                    />{" "}
                    Subir imagen
                  </InputLabel>
                  <TextField
                    id="textfield"
                    sx={{ display: "none" }}
                    type="file"
                    onChange={handleOnChange}
                  />
                  {files.length > 0 && (
                    <Button
                      variant="text"
                      sx={{
                        color: "#FF7272",
                        textTransform: "capitalize",
                        marginX: "20px",
                      }}
                      startIcon={<DeleteOutlineOutlinedIcon />}
                      onClick={handleRemoveImage}
                    >
                      Eliminar imagen
                    </Button>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginLeft: "80px",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="ID"
                  className="input-field"
                  value={values.id}
                  sx={{
                    mb: "10px",
                  }}
                  name="id"
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  placeholder="Nombre completo"
                  className="input-field"
                  value={values.fullname}
                  sx={{
                    mb: "10px",
                  }}
                  name="fullname"
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  placeholder="Email"
                  className="input-field"
                  value={values.email}
                  sx={{
                    mb: "10px",
                  }}
                  name="email"
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  placeholder="Rol"
                  className="input-field"
                  value={values.rol}
                  sx={{
                    mb: "10px",
                  }}
                  name="rol"
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  placeholder="Fecha de creacion"
                  className="input-field"
                  value={values.creation_date}
                  sx={{
                    mb: "10px",
                  }}
                  name="creation_date"
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box sx={{ mt: "60px" }}>
              <ul>
                <li>
                  <Typography sx={{ mb: "10px" }}>
                    Usuario: (ID, nombre, correo electrónico, rol asignado,
                    fecha de creación).
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ mb: "10px" }}>
                    Permisos: (UsuarioID, permisoID, estado [activo/inactivo]).
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Roles: (ID, nombre del rol, permisos asociados).
                  </Typography>
                </li>
              </ul>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl sx={{ width: 300 }}>
              <Select
                displayEmpty
                value={values.rol}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Rol</em>;
                  }

                  return selected.join(", ");
                }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Rol</em>
                </MenuItem>
                {roles.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 300, marginTop: "100px" }}>
              <Select
                displayEmpty
                value={values.rol}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Rol</em>;
                  }

                  return selected.join(", ");
                }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Rol</em>
                </MenuItem>
                {roles.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: "150px" }}>
            <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
              <AntSwitch
                name="active"
                checked={values.active}
                onChange={handleChange}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>
                Usuario: {values.active ? "Activo" : "Inactivo"}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
          }}
        >
          <Button
            type="submit"
            sx={{
              borderRadius: "2px",
              backgroundColor: "#CCCCCC",
              color: "#171717",
              padding: "9px 30px",
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "500",
              width: "250px",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
            onClick={handleBackWithOutSave}
          >
            Volver sin guardar
          </Button>
          <Button
            onClick={() => setShowConfirmCreate(!showConfirmCreate)}
            type="submit"
            sx={{
              borderRadius: "2px",
              backgroundColor: "#969494",
              color: "#171717",
              padding: "9px 30px",
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "500",
              ml: "20px",
              width: "250px",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
          >
            Crear usuario
          </Button>
        </Box>
      </Box>

      <Dialog
        open={showConfirmCreate}
        onClose={() => setShowConfirmCreate(!showConfirmCreate)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ '&.MuiDialog-root .MuiDialog-paper':{padding: "10px 60px"} }}
      >
        <DialogTitle
          sx={{ fontFamily: "Poppins", fontSize: "22px", fontWeight: "300" }}
          id="alert-dialog-title"
        >
          ¿Quiere confirmar la creación de este nuevo usuario?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: "300" }}
            id="alert-dialog-description"
          >
            Sed tortor, sed velit ridiculus ipsum pharetra lacus odio gravida
            augue enim.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "2px",
              backgroundColor: "#CCCCCC",
              color: "#171717",
              padding: "9px 30px",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "500",
              width: "100px",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
            onClick={() => setShowConfirmCreate(!showConfirmCreate)}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              borderRadius: "2px",
              backgroundColor: "#969494",
              color: "#171717",
              padding: "9px 30px",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "500",
              ml: "20px",
              width: "100px",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
            onClick={handleSaveUser}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmSendEmail}
        onClose={() => setShowConfirmSendEmail(!showConfirmSendEmail)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ '&.MuiDialog-root .MuiDialog-paper':{padding: "10px 60px",border: '1px solid orange',borderRadius:'20px'} }}
      >
        <DialogTitle
          sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight: "300" }}
          id="alert-dialog-title"
        >
          Se ha enviado un email a la casilla del nuevo usuario,
          con las credenciales de acceso al sistema. 
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: "300" }}
            id="alert-dialog-description"
          >
            En caso de no recibirlo, presionar reenviar. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "2px",
              backgroundColor: "#CCCCCC",
              color: "#171717",
              padding: "9px 30px",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "500",
              width: "100px",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
            onClick={() => setShowConfirmSendEmail(!showConfirmSendEmail)}
          >
            Reenviar
          </Button>
          <Button
            sx={{
              borderRadius: "2px",
              backgroundColor: "#969494",
              color: "#171717",
              padding: "9px 30px",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "500",
              ml: "20px",
              width: "100px",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
            onClick={() => setShowConfirmSendEmail(!showConfirmSendEmail)}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Content>
  );
}

export default NewUserComponent;
