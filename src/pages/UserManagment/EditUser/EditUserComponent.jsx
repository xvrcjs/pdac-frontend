import React, { useState, useEffect } from "react";
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
  Stack,
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
import "./EditUser.scss";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 72,
  height: 64,
  padding: 7,
  display: "flex",
  alignItems: "center",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    transform: "translate(6px, 12px);",
    border: "5px solid #D9D9D9",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translate(28px,12px)",
      border: "5px solid #E81F76",
      "& .MuiSwitch-thumb:before": {
        backgroundColor: "#fff",
        borderRadius: "50%",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 17 15" ><path fill="${encodeURIComponent(
          "#E81F76"
        )}" d="M6.86641 12.0001L3.06641 8.20007L4.01641 7.25007L6.86641 10.1001L12.9831 3.9834L13.9331 4.9334L6.86641 12.0001Z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#417099",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 17 15" ><path fill="${encodeURIComponent(
        "#D9D9D9"
      )}" d="M6.86641 12.0001L3.06641 8.20007L4.01641 7.25007L6.86641 10.1001L12.9831 3.9834L13.9331 4.9334L6.86641 12.0001Z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20,
    height: "25px",
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

function EditUserComponent(props) {
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

  const [files, setFiles] = useState([
    process.env.REACT_APP_BACKEND_URL_MEDIA + values.profile_image,
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [omicFiltered,setOmicFiltered] = useState([]);
  const [showConfirmCreate, setShowConfirmCreate] = useState(false);
  const [showConfirmSendEmail, setShowConfirmSendEmail] = useState(false);
  const [showRoles, setShowRoles] = useState(true);
  const [showOmics, setShowOmics] = useState(true);
  const [showPermissions, setShowPermissions] = useState(true);
  const [selectedPermissions, setSelectedPermissions] = useState(
    values.permissions
  );
  const supportsLevel = ["Nivel 1 (N1)","Nivel 2 (N2)","Nivel 3 (N3)"]
  const [showComments, setShowComments] = useState(true);
  
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
    navigate(-1);
  };

  const handleSaveUser = () => {
    setShowConfirmCreate(!showConfirmCreate);
    values.permissions = JSON.stringify(selectedPermissions);
    values.profile_image = files;
    handleOnSubmit(values,setShowConfirmSendEmail);
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
            justifyContent: "space-between"
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
                
                <Box>
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
                          src={
                            typeof files[0] === "string"
                              ? files[0]
                              : URL.createObjectURL(files[0])
                          }
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
                <Box
                  sx={{
                    height: "100%",
                  }}
                >
                  <img
                    src="../../icons/mode_edit.svg"
                    alt="edit_mode"
                    className="edit_mode"
                    
                    onClick={() => setIsEditing(!isEditing)}
                  />
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
              {files.length > 0 && isEditing && (
                <DeleteOutlineOutlinedIcon
                  sx={{
                    color: "#fff",
                    backgroundColor: "#00AEC3",
                    borderRadius: "50%",
                    p: "5px",
                    position: "relative",
                    left: "-110px",
                    top: "-40px",
                    cursor: "pointer",
                  }}
                  onClick={handleRemoveImage}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                mb: "150px",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Nombre y apellido"
                className="input-field"
                value={values.fullname}
                onBlur={handleBlur}
                disabled={!isEditing}
                sx={{
                  mb: "10px",
                  width: "90%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00AEC3 !important",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#00AEC3 !important",
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
                disabled={!isEditing}
                sx={{
                  mb: "10px",
                  width: "90%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00AEC3 !important",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#00AEC3 !important",
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
                disabled
                value={"DNI: " + values.dni}
                onBlur={handleBlur}
                sx={{
                  mb: "10px",
                  width: "90%",
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
                value={"Tel: " + values.phone}
                onBlur={handleBlur}
                disabled
                sx={{
                  mb: "10px",
                  width: "90%",
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
                name="phone"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                placeholder="Telefono de contacto"
                className="input-field"
                value={values.rol}
                onBlur={handleBlur}
                disabled
                sx={{
                  mb: "10px",
                  width: "90%",
                  "& input": {
                    textTransform: "uppercase",
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
                name="phone"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                placeholder="Fecha de creacion"
                className="input-field"
                value={"Fecha de creación de usuario: " + values.creation_date}
                onBlur={handleBlur}
                disabled
                sx={{
                  mb: "10px",
                  width: "90%",
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
                name="creation_date"
                onChange={handleChange}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              ml: "40px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
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
                  Selección de rol
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
                        border: "1px solid rgba(61, 62, 64, 0.50)",
                        background:"#fff",
                        borderRadius: "15px",
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
              <Box sx={{ width: "360px", ml: "30px" }}>
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
            <Box sx={{ minHeight: "300px" }}>
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
                  mt: "30px",
                }}
                onClick={() => setShowComments(!showComments)}
                endIcon={
                  showComments ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Agregar comentario
              </Button>
              {showComments && (
                <TextField
                  maxRows={Infinity}
                  minRows={7}
                  multiline
                  disabled={!isEditing}
                  value={values.comments}
                  onChange={handleChange}
                  name="comments"
                  handle
                  className="swt-user-select-content"
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    border: "0px",
                    mt:"2px",
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      p: "20px",
                      fontFamily: "Encode Sans",
                      overflow: "scroll !important",
                      maxHeight: "120px",
                      height: "120px",
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
                  placeholder="Escriba aquí el comentario.."
                  defaultValue=""
                />
              )}
              <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            mt: "120px",
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
              "&.Mui-disabled": {
                backgroundColor: "#a6a5a6",
                color: "#fff",
              },
            }}
          >
            Guardar cambios
          </Button>
        </Box>
            </Box>
          </Box>
          <Box sx={{ width: "150px", mt: "150px", ml: "20px" }}>
            <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
              <MaterialUISwitch
                name="active"
                checked={values.active}
                onChange={handleChange}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>
                Usuario: {values.active ? "ACTIVO" : "INACTIVO"}
              </Typography>
            </Stack>
          </Box>
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
            width: "800px"
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
          ¿Está seguro de aplicar los cambios?
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
            En caso de tener que modificarlos cancele el proceso. 
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
            Aceptar
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
          Los cambios fueron guardados con exito.
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
            En caso de tener que modificarlos nuevamente, comience el proceso de edición desde la lista de usuarios. 
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mt: "40px" }}>
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

export default EditUserComponent;
