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
    account
  } = props;

  const [files, setFiles] = useState([
    process.env.REACT_APP_BACKEND_URL_MEDIA + values.profile_image,
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [rolSelected, setRolSelected] = useState(values.rol);
  const [showConfirmCreate, setShowConfirmCreate] = useState(false);
  const [showConfirmSendEmail, setShowConfirmSendEmail] = useState(false);

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
    values.rol = rolSelected;
    values.permissions = JSON.stringify(selectedPermissions);
    values.profile_image = files;
    handleOnSubmit(values);
    setShowConfirmSendEmail(!showConfirmSendEmail);
  };

  return (
    <Content className="swt-dashboard" sx={{ padding: "20px" }} isLoaded="true">
      <Box
        sx={{
          width: "80%",
          margin: "100px 200px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: "48px", fontWeight: "700", mb: "10px" }}>
          Mi perfil
        </Typography>
        <Box sx={{ width: "100%", height: "1px", backgroundColor: "black" }} />
        <Box sx={{display:"flex",flexDirection:"row"}}>
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
            backgroundColor:"#D9D9D9",
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
          </Box>
        </Box>
        <Box sx={{ml:"100px",mt:"100px"}}>
          <Typography sx={{fontWeight:"600"}}>
            {account.full_name}
          </Typography>
          <Typography>
            {account.roles[0].name} 
          </Typography>
          <Typography>
            {account.user__display_name}
          </Typography>
          <Typography>
            {account.user__email}
          </Typography>
        </Box>
        </Box>
      </Box>
    </Content>
  );
}

export default ProfileComponent;
