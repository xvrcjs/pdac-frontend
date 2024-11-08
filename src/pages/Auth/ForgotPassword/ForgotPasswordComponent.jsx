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
import { AppContext } from "context/AppContext";
import "./ForgotPasswordStyles.scss";
import "utils/MainStyles.scss";
import { useFormik } from "formik";
import { FORGOT_PASSWORD_ENDPOINT } from "constant/endpoints";
import { useNavigate } from "react-router-dom";

function ForgotPasswordComponent(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { api, setAuthToken, setIsInitialized } = useContext(AppContext);
  const navigate = useNavigate()
  const { values,handleSubmit, handleChange, touched, errors,handleBlur } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "El campo email es requerido.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Dirección de correo no valida.";
      }
      return errors;
    },
  });

  function handleOnSubmit(values) {
    const { email } = values;
    api(FORGOT_PASSWORD_ENDPOINT, {
      method: "POST",
      body: {
        email: email,
      },
    }).then(({ ok, body }) => {
      if (ok) {
        navigate("/login")
      } 
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "40px",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Box sx={{ width: "80%" }}>
            <img
              alt="logo-pba"
              src="../../logo-pba.png"
              style={{ height: "100px", width: "auto" }}
            />
            <h1>
              <span style={{ color: "#03AAC0" }}>Recuperación de contraseña</span>
            </h1>
            <h1
              style={{ fontSize: "30px", marginTop: "50px" }}
            >
              Defensa de las y los consumidores
              <br />
              de la <span style={{ color: "#03AAC0" }}>Provincia de Buenos Aires.</span>
            </h1>
          </Box>
          <Box sx={{ width: "350px", marginTop: "80px" }}>
            <form onSubmit={handleSubmit} className="form-login">
              <Box sx={{ marginBottom: "20px" }}>
                <Typography
                  sx={{
                    fontFamily: "Encode Sans",
                    fontWeight: "700",
                    fontSize: "24px",
                    marginBottom: "20px",
                  }}
                >
                  Ingrese su email
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="usuario@gba.com"
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
                    startAdornment:(
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="start"
                          >
                            <PersonOutlineOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                    )
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
                  backgroundColor: "#04AAC0",
                  color: "#FFF",
                  padding: "9px 30px",
                  fontFamily: "Encode Sans",
                  fontSize: "16px",
                  width: "100%",
                  marginTop: "90px",
                  textTransform: "capitalize",
                  ":hover": {
                    color: "#FFF",
                    backgroundColor: "#04AAC0",
                    borderColor: "Blue",
                    transform: "scale(1.01)",
                  },
                }}
              >
                Recuperar contraseña
              </Button>
            </form>
          </Box>
        </Box>
        <img
          alt="item-2"
          src={`../../assets/login/img-2.png`}
          style={{ height: "700px", borderRadius: "20px" }}
        />
      </Box>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #E81F76 0%, #417099 50%, #00AEC3 100%)",
          height: "50px",
          width: "100%",
        }}
      />
    </>
  );
}

export default ForgotPasswordComponent;
