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

import { useNavigate } from "react-router-dom";
import { Padding } from "@mui/icons-material";

function ProfileComponent(props) {
  const {
    values,
    touched,
    errors,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleOnSubmit,
    account,
    signout
  } = props;

  const [files, setFiles] = useState([
    process.env.REACT_APP_BACKEND_URL_MEDIA + values.profile_image,
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImg,setIsEditingImg] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [rolSelected, setRolSelected] = useState(values.rol);
  const [showConfirmCreate, setShowConfirmCreate] = useState(false);
  const [showConfirmSendEmail, setShowConfirmSendEmail] = useState(false);

  const navigate = useNavigate();

  const handleRemoveImage = (event) => {
    setFiles([]);
  };

  const handleSaveUser = () => {
    values.profile_image = files;
    handleOnSubmit(values);
  };

  return (
    <Content className="swt-dashboard" sx={{ padding: "20px" }} isLoaded="true">
      <Box
        sx={{
          width: "70%",
          margin: "0 auto", 
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: "48px", fontWeight: "700", mb: "10px",mt:"100px" }}>
          Mi perfil
        </Typography>
        <Box sx={{ height: "1px", backgroundColor: "black" }} />
        <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              mt:"20px"
            }}
          >
            <img
              src="../../icons/mode_edit_perfil.svg"
              alt="edit_mode"
              style={{cursor: "pointer",color:"#000"}}
              onClick={() => setIsEditing(!isEditing)}
            />
          </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
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
              backgroundColor: "#D9D9D9",
              alignItems: "center",
              position: "relative",
              mt: "30px",
            }}
          >
            <Box>
              <DropzoneComponent
                setFiles={setFiles}
                setIsDragActive={setIsDragActive}
              />
              <Box
                sx={{
                  minWidth: "220px",
                  minHeight: "220px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  border: isDragActive ? "1px solid #007EF6" : "none",
                  // "& .MuiAvatar-root": {
                  //   borderRadius: "unset",
                  //   borderTopLeftRadius: "50%",
                  //   borderTopRightRadius: "50%",
                  //   borderBottomRightRadius: "50%",
                  // },
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
              {!isEditingImg &&
              <Box
                sx={{
                  height: "100%",
                }}
              >
                <img
                  src="../../icons/mode_edit_perfil.svg"
                  alt="edit_mode"
                  style={{cursor: "pointer",left:"10px",bottom:"10px",position: "absolute"}}
                  onClick={() => setIsEditingImg(!isEditingImg)}
                />
              </Box>
              }
              {files.length > 0 && isEditingImg && (
                <DeleteOutlineOutlinedIcon
                  sx={{
                    color: "#fff",
                    backgroundColor: "#00AEC3",
                    borderRadius: "50%",
                    p: "5px",
                    left:"-10px",
                    position: "absolute",
                    cursor: "pointer",
                  }}
                  onClick={handleRemoveImage}
                />
              )}
              
            </Box>
          </Box>
          <Box sx={{ ml: "200px", mt: "50px" }}>
            <Typography sx={{fontSize:"18px",fontWeight:"500",color:"#000",mb:"20px"}}>
              Información del usuario
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Nombre y apellido"
              className="input-field"
              value={values.fullname}
              onBlur={handleBlur}
              disabled={!isEditing}
              sx={{
                mb: "20px",
                width: "90%",
                borderRadius: "5px",
                backgroundColor: isEditing ? "#fff":"#D9D9D96B",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: isEditing ? "0.5px solid #D9D9D96B":"unset",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: isEditing ? "1px solid #D9D9D96B":"unset",
                  },
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#000",
                  WebkitTextFillColor: "#000"
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: isEditing ? "0.5px solid #D9D9D96B":"unset !important",
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
                mb: "20px",
                width: "90%",
                borderRadius: "5px",
                backgroundColor: isEditing ? "#fff":"#D9D9D96B",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: isEditing ? "0.5px solid #000":"unset",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: isEditing ? "1px solid #000":"unset",
                  },
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  textAlign: "center",
                  fontWeight: "400",
                  color: "#000",
                  WebkitTextFillColor: "#000"
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: isEditing ? "0.5px solid #000":"unset !important",
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
              helperText={errors.email}
              name="email"
              onChange={handleChange}
            />
            <Box sx={{mt:"50px","& p":{fontWeight:"200"}}}>
              <Typography>{account.roles ? account.roles[0].name : "Sin asignar rol"}</Typography>
              <Typography>OMIC: {account.omic ? account.omic.name : "S/A"}</Typography>
              <Typography sx={{mt:"30px"}}>Ultimo ingreso: 24/09/24 18.35hs</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"end",mt:"100px"}}>
          <Button
              sx={{
                borderRadius: "5px",
                color: "#000",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "400",
                width: "171px",
                height: "68px",
                border: "1px solid #000",
                textTransform: "capitalize",
                ":hover": {
                  transform:"scale(1.1)"
                },
              }}
              onClick={signout}
            >
              Cerrar sesión
            </Button>
            <Button
              sx={{
                borderRadius: "5px",
                color: "#000",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "400",
                width: "200px",
                height: "68px",
                ml:"50px",
                border: "1px solid #000",
                textTransform: "capitalize",
                ":hover": {
                  transform:"scale(1.1)"
                },
              }}
              onClick={handleSaveUser}
            >
              Guardar cambios
            </Button>
        </Box>
      </Box>
    </Content>
  );
}

export default ProfileComponent;
