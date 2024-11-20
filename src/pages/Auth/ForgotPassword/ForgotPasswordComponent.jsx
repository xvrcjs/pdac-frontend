import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { tokens } from "theme";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import "./ForgotPasswordStyles.scss";
import "utils/MainStyles.scss";
import { Navigate } from "react-router-dom";

function ForgotPasswordComponent(props) {
  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    handleBlur,
    loading,
    showSuccessMessage,
    navigate
  } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "40px",
          height: "80%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <img
            alt="logo-pba"
            src="../../logo-pba.png"
            style={{ height: "100px", width: "auto" }}
          />
          
            {!showSuccessMessage ? 
              <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#00AEC3",
                  textAlign: "center",
                  fontFamily: "Encode Sans",
                  fontSize: "2rem",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "130%",
                  width: "60%",
                  mb:"30px"
                }}
              >
                Ingrese su <span style={{ color: "#000" }}>correo electrónico</span> para la recuperación de su contraseña.
              </Typography>
              <form onSubmit={handleSubmit} className="form-login">
                <Box sx={{ marginBottom: "20px" }}>
                  <TextField
                    variant="outlined"
                    placeholder="federicojuster@defensaalconsumidor"
                    className="input-field"
                    value={values.email}
                    onBlur={handleBlur}
                    sx={{
                      mb: "10px",
                      width:"500px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00AEC3 !important",
                      },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#00AEC3 !important",
                        },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="start"
                          >
                            <MailOutlineIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.email && errors.email)}
                    helperText={errors.email}
                    name="email"
                    onChange={handleChange}
                  />
                </Box>
                <Button
                  type="submit"
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#00AEC3",
                    color: "#FFF",
                    padding: "9px 30px",
                    fontFamily: "Encode Sans",
                    fontSize: "16px",
                    width: "100%",
                    marginTop: "40px",
                    textTransform: "capitalize",
                    ":hover": {
                      color: "#FFF",
                      backgroundColor: "#00AEC3",
                      borderColor: "Blue",
                      transform: "scale(1.01)",
                    },
                  }}
                >
                  Enviar link de recuperación
                </Button>
              </form>
            </Box>
            :
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            <Typography
                sx={{
                  color: "#00AEC3",
                  textAlign: "center",
                  fontFamily: "Encode Sans",
                  fontSize: "2rem",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "130%",
                  width: "60%",
                  mb:"30px"
                }}
              >
                Te hemos enviado un correo para restablecer tu contraseña.
              </Typography>
                <Button
                  type="submit"
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#00AEC3",
                    color: "#FFF",
                    padding: "9px 30px",
                    fontFamily: "Encode Sans",
                    fontSize: "16px",
                    width: "40%",
                    marginTop: "40px",
                    textTransform: "capitalize",
                    ":hover": {
                      color: "#FFF",
                      backgroundColor: "#00AEC3",
                      borderColor: "Blue",
                      transform: "scale(1.01)",
                    },
                  }}
                  onClick={()=> navigate("/login")}
                >
                  Aceptar
                </Button>
                </Box>
              }
        </Box>
      </Box>
    </>
  );
}

export default ForgotPasswordComponent;
