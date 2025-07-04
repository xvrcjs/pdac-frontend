import React, { useState,useEffect } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  Avatar,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { tokens } from "../../../theme";
import DropzoneComponent from "components/DragAndDrop/DropzoneComponent";
import SearchIcon from "@mui/icons-material/Search";

import { Form } from "formik";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./NewUser.scss";


function NewUserComponent(props) {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleOnSubmit,
    roles,
    omics,
    permissions,
  } = props;

  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [omicFiltered,setOmicFiltered] = useState([]);
  const [showConfirmCreate, setShowConfirmCreate] = useState(false);
  const [showConfirmSendEmail, setShowConfirmSendEmail] = useState(false);
  const [showRoles, setShowRoles] = useState(true);
  const [showOmics, setShowOmics] = useState(true);
  const [showPermissions, setShowPermissions] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const supportsLevel = ["Nivel 1 (N1)","Nivel 2 (N2)","Nivel 3 (N3)"]
  const filteredPermissions =
    permissions.find((p) => p.type === values.rol)?.permissions || [];

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

  const handleSaveUser = () => {
    setShowConfirmCreate(!showConfirmCreate);
    values.permissions = JSON.stringify(selectedPermissions);
    values.profile_image = files;
    handleOnSubmit(values,setShowConfirmSendEmail)
  };

  const handleSelectRol = (role) => {
    setFieldValue("rol",role)
    if (role === "admin"){
      setFieldValue("support_level","Nivel 3 (N3)")
    }else{
      setFieldValue("support_level","Nivel 1 (N1)")
    }

    setShowPermissions(true);
    setSelectedPermissions({});
  };

  const handleSelectOmic = (omic) => {
    setFieldValue("omic",omic);
  };

  const handleTogglePermission = (permissionValue) => {
    setSelectedPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permissionValue]: !prevPermissions[permissionValue],
    }));
  };

  const handleCloseConfirmReSendEmail = () =>{
    setShowConfirmSendEmail(!showConfirmSendEmail)                    
    navigate("/gestion-de-usuarios/listado-de-usuarios")
  }

  const handleReSendEmail = () =>{
    setShowConfirmSendEmail(!showConfirmSendEmail)
  }

  const handleFilter = (e) => {
    const text = e.target.value;
    const filteredRows = omics.filter((c) => {
      return c.name.toLowerCase().includes(text.toLowerCase());
    });
    setOmicFiltered(filteredRows);
  };

  useEffect(() => {
    setOmicFiltered(omics)
  }, [omics]);

  return (
    <Content className="swt-dashboard" isLoaded="true">
      <Box
        sx={{
          margin:"auto",
          marginTop:"80px",
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          width:"80%"
        }}
      >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "407px",
                borderRadius: "50px",
                background: "#F5F5F5",
                boxShadow: "0px 4px 30px 0px rgba(0, 0, 0, 0.50)",
                height: "fit-content"
              }}
            >
              <Box>
                <Box
                  sx={{
                    borderTopLeftRadius: "50%",
                    borderTopRightRadius: "50%",
                    borderBottomRightRadius: "50%",
                    width: "240px",
                    height: "240px",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    mt: "20px",
                  }}
                >
                  <DropzoneComponent
                    setFiles={setFiles}
                    setIsDragActive={setIsDragActive}
                  />
                  <Box
                    sx={{
                      borderTopLeftRadius: "50%",
                      borderTopRightRadius: "50%",
                      borderBottomRightRadius: "50%",
                      minWidth: "220px",
                      minHeight: "220px",
                      backgroundColor: "#D9D9D9",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      border: isDragActive ? "1px solid #007EF6" : "none",
                      "& .MuiAvatar-root": {
                        borderRadius: "unset",
                        borderTopLeftRadius: "50%",
                        borderTopRightRadius: "50%",
                        borderBottomRightRadius: "50%",
                      },
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
                              src="../../assets/image-default.svg"
                              style={{
                                borderRadius: "8px",
                                width: "43px",
                                height: "43px",
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
                <TextField
                  id="textfield"
                  sx={{ display: "none" }}
                  type="file"
                  onChange={handleOnChange}
                />
                {files.length > 0 && (
                  <DeleteOutlineOutlinedIcon sx={{color:"#fff",backgroundColor:"#00AEC3",borderRadius:"50%",p:"5px",position:"relative",left:"-110px",top: "-40px"
                  }} onClick={handleRemoveImage}/>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                  mb: "50px",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Nombre y apellido"
                  className="input-field"
                  value={values.fullname}
                  onBlur={handleBlur}
                  sx={{
                    mb: "10px",
                    width: "90%",
                    "& .MuiOutlinedInput-notchedOutline":{
                    borderColor:"#00AEC3 !important"
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
                      borderColor:"#00AEC3 !important"
                    },
                  }}
                  InputProps={{
                    startAdornment: values.fullname === "" && (
                      <InputAdornment position="start">
                        <Typography color="error" component="span">
                          *
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.fullname && errors.fullname)}
                  helperText={errors.fullname}
                  name="fullname"
                  onChange={handleChange}
                />

                <TextField
                  variant="outlined"
                  placeholder="Email"
                  className="input-field"
                  value={values.email}
                  onBlur={handleBlur}
                  sx={{
                    mb: "10px",
                    width: "90%",
                    "& .MuiOutlinedInput-notchedOutline":{
                      borderColor:"#00AEC3 !important"
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
                      borderColor:"#00AEC3 !important"
                    },
                  }}
                  InputProps={{
                    startAdornment: values.email === "" && (
                      <InputAdornment position="start">
                        <Typography color="error" component="span">
                          *
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  name="email"
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  placeholder="DNI"
                  className="input-field"
                  value={values.dni}
                  onBlur={handleBlur}
                  sx={{
                    mb: "10px",
                    width: "90%",
                    "& .MuiOutlinedInput-notchedOutline":{
                      borderColor:"#00AEC3 !important"
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
                      borderColor:"#00AEC3 !important"
                    },
                  }}
                  InputProps={{
                    startAdornment: values.dni === "" && (
                      <InputAdornment position="start">
                        <Typography color="error" component="span">
                          *
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.dni && errors.dni)}
                  helperText={errors.dni}
                  name="dni"
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  placeholder="Telefono de contacto"
                  className="input-field"
                  value={values.phone}
                  onBlur={handleBlur}
                  sx={{
                    mb: "10px",
                    width: "90%",
                    "& .MuiOutlinedInput-notchedOutline":{
                      borderColor:"#00AEC3 !important"
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
                      borderColor:"#00AEC3 !important"
                    },
                  }}
                  InputProps={{
                    startAdornment: values.phone === "" && (
                      <InputAdornment position="start">
                        <Typography color="error" component="span">
                          *
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={errors.phone}
                  name="phone"
                  onChange={handleChange}
                />
                <Box sx={{display:"flex",justifyContent:"end",width:"100%",mr:"50px"}}>
                  <Typography sx={{color:"#9F0000",mt:"80px"}}>
                    <span style={{color:"#F80000"}}>*</span> Campos obligatorios
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{display:"flex",flexDirection:"column"}}>
            <Box sx={{ width: "276px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00AEC3",
                  color: "#FFF",
                  fontFamily: "Encode Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  width: "100%",
                  p: "15px 20px",
                  justifyContent: "space-between",
                }}
                onClick={() => setShowRoles(!showRoles)}
                endIcon={
                  showRoles ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Selección de Rol
              </Button>
              {showRoles && (
                <Box className="swt-user-select-content">
                  {roles.map((role) => (
                    <Typography
                      key={role.value}
                      className={values.rol === role.value ? "selected" : ""}
                      onClick={() => handleSelectRol(role.value)}
                    >
                      {role.label}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
            {values.rol === "omic" && 
            <Box sx={{ width: "276px",mt:"50px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00AEC3",
                  color: "#FFF",
                  fontFamily: "Encode Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  width: "100%",
                  p: "15px 20px",
                  justifyContent: "space-between",
                }}
                onClick={() => setShowOmics(!showOmics)}
                endIcon={
                  showOmics ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Selección de OMIC
              </Button>
              {showOmics && (
                <Box className="swt-user-select-content" sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight:"120px",
                  p:"10px 10px"
                }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: "2px",
                      borderRadius: "5px",
                    }}
                  >
                    <TextField
                      placeholder="Filtrar OMIC"
                      InputProps={{
                        endAdornment: (
                          <SearchIcon
                            sx={{
                              fill: "#000",
                              marginRight: "8px",
                            }}
                          />
                        ),
                      }}
                      sx={{
                        m: 0,
                        p: 0,
                        fontSize:"16px",
                        borderRadius: "15px",
                        border: "1px solid rgba(61, 62, 64, 0.50)",
                        background:"#fff",
                        "& fieldset": {
                          borderRadius: "15px",
                        },
                        "& input": {
                          paddingY: "8px",
                          fontFamily: "Encode Sans",
                        },
                        "& .MuiOutlinedInput-notchedOutline":{
                          border:"unset !important",
                        },
                        width: "350px",
                      }}
                      onChange={handleFilter}
                    />
                  </Box>
                  <Box sx={{overflow:"auto",mt:'5px'}}>
                  {omicFiltered.map((omic,index) => (
                    <Typography
                      key={index}
                      className={values.omic === omic.uuid ? "selected" : ""}
                      onClick={() => handleSelectOmic(omic.uuid)}
                      sx={{fontSize:"16px",p:"5px 10px !important",fontWeight:"400"}}
                    >
                      {omic.name}
                    </Typography>
                  ))}
                  </Box>
                </Box>
              )}
            </Box>
            }
            {(values.rol !== "omic" && values.rol !== "")  && 
              <Box sx={{ width: "276px",mt:"50px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#00AEC3",
                    color: "#FFF",
                    fontFamily: "Encode Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                    width: "100%",
                    p: "15px 20px",
                    justifyContent: "space-between",
                  }}
                >
                  Selección de nivel de soporte
                </Button>
                <Box className="swt-user-select-content" sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight:"120px",
                  p:"10px 10px"
                }}>
                  <Box sx={{overflow:"auto",mt:'5px'}}>
                    {supportsLevel.map((level,index) => (
                      <Typography
                        key={index}
                        className={values.support_level === level ? "selected" : ""}
                        onClick={() => setFieldValue("support_level",level)}
                        sx={{fontSize:"16px",p:"8px 10px !important",fontWeight:"400"}}
                      >
                        {level}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                {errors.support_level &&
                    <Typography sx={{color:"#F80000",mt:"5px"}}>
                      * {errors.support_level}
                    </Typography>
                }
              </Box>
            }
            </Box>
            <Box sx={{ width: "360px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00AEC3",
                  color: "#FFF",
                  fontFamily: "Encode Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  width: "100%",
                  p: "15px 20px",
                  justifyContent: "space-between",
                }}
                onClick={() => setShowPermissions(!showPermissions)}
                endIcon={
                  showPermissions ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Selección de permisos
              </Button>
              {showPermissions && (
                <Box
                  className="swt-user-select-content"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxHeight:"400px",
                    overflow:"scroll",
                    p:"10px 0px"
                  }}
                >
                  {filteredPermissions.map((permission, index) => (
                    <FormControlLabel
                      key={permission.value}
                      control={
                        <Checkbox
                          checked={
                            selectedPermissions[permission.value] || false
                          }
                          key={index}
                          onChange={() =>
                            handleTogglePermission(permission.value)
                          }
                          sx={{
                            marginRight: "5px",
                            "&.MuiButtonBase-root.MuiCheckbox-root.Mui-checked":
                              {
                                color: "#027A48",
                              },
                          }}
                        />
                      }
                      label={permission.label}
                      sx={{
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    />
                  ))}
                </Box>
              )}
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
                borderRadius: "50px",
                color: "#000",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "500",
                width: "250px",
                border: "0.5px solid #000",
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
              disabled={!(isValid && dirty && values.rol)}
              sx={{
                borderRadius: "50px",
                backgroundColor: "#00AEC3",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                color: "#fff",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
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
                "&.Mui-disabled":{
                  backgroundColor: "#a6a5a6",
                  color: "#fff",
                }
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
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 50px",
            border: "2px solid #00AEC3",
            borderRadius: "50px",
            maxWidth: "unset",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "27px",
            fontWeight: "600",
            color: "#262626",
          }}
          id="alert-dialog-title"
        >
          ¿Está seguro de querer crear este usuario?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "300",
              color: "#262626",
            }}
            id="alert-dialog-description"
          >
            Una vez creado tendrá la activación de manera inmediata a los
            permisos y rol otorgados.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mt: "40px" }}>
          <Button
            sx={{
              borderRadius: "50px",
              color: "#000",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              padding: "9px 30px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              width: "150px",
              border: "0.5px solid #000",
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
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              color: "#fff",
              padding: "9px 0px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              ml: "20px",
              width: "200px",
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
            Crear usuario
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmSendEmail}
        onClose={() => setShowConfirmSendEmail(!showConfirmSendEmail)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 50px",
            border: "2px solid #00AEC3",
            borderRadius: "50px",
            maxWidth: "800px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "27px",
            fontWeight: "600",
            color: "#262626",
          }}
          id="alert-dialog-title"
        >
          Se ha enviado un email a la casilla del nuevo usuario, con las
          credenciales de acceso al sistema.
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "300",
              color: "#262626",
            }}
            id="alert-dialog-description"
          >
            En caso de no recibirlo, presionar reenviar.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mt: "40px" }}>
          <Button
            sx={{
              borderRadius: "50px",
              color: "#000",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              padding: "9px 30px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              width: "150px",
              border: "0.5px solid #000",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
            onClick={handleReSendEmail}
          >
            Reenviar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              color: "#fff",
              padding: "9px 0px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              ml: "40px",
              width: "200px",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
                borderColor: "Blue",
              },
            }}
            onClick={handleCloseConfirmReSendEmail}
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
