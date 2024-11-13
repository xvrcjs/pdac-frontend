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
import "./LoginStyles.scss";
import "utils/MainStyles.scss";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useFormik } from "formik";
import { SINGIN_ENDPOINT } from "constant/endpoints";
import { Link } from "react-router-dom";

function LoginComponent(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { api, setAuthToken, setIsInitialized } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(false);

  const { handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = "El campo usuario es requerido.";
      }
      if (!values.password) {
        errors.password = "El campo contraseña es requerido.";
      }
      return errors;
    },
  });

  function handleOnSubmit(values) {
    const { username, password } = values;
    setErrorMessage(null);
    api(SINGIN_ENDPOINT, {
      method: "POST",
      body: {
        email: username,
        password: password,
        remember_me: false,
      },
    }).then(({ ok, body }) => {
      if (ok) {
        setIsInitialized(false);
        setAuthToken(body.access_token, body.expires_in);
      } else {
        setErrorMessage("Usuario o Contraseña incorrecto");
        setShowError(true);
      }
    });
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

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
              <span style={{ color: "#00AEC3" }}>Inicio de sesión</span> de
              gestión administrativa.
            </h1>
            <h1
              style={{ fontSize: "30px", marginTop: "50px" }}
            >
              Defensa de las y los consumidores
              <br />
              de la <span style={{ color: "#00AEC3" }}>Provincia de Buenos Aires.</span>
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
                  Usuario
                </Typography>
                <FormControl
                  sx={{ width: "100%", marginBottom: "5px" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="username"
                    type="text"
                    placeholder="Federico Ramirez"
                    className="input-field"
                    sx={{
                      "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "unset",
                          border: "1px solid #C6C6C6 !important",
                        },
                      "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "unset",
                        },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "unset",
                        },
                      fontFamily:"Encode Sans !important",
                    }}
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="start"
                        >
                          <PersonOutlineOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {touched.username && errors.username && (
                  <Typography className="show-error-form">
                    {errors.username}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginBottom: "20px", marginBottom: "5px" }}>
                <Typography
                  sx={{
                    fontFamily: "Encode Sans",
                    fontWeight: "700",
                    fontSize: "24px",
                    marginBottom: "20px",
                  }}
                >
                  Contraseña
                </Typography>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    className="input-field"
                    sx={{
                      "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "unset",
                          border: "1px solid #C6C6C6 !important",
                        },
                      "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "unset",
                        },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "unset",
                        },
                      fontFamily:"Encode Sans !important"
                    }}
                    name="password"
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment
                        position="end"
                        sx={{ position: "absolute", right: "1em" }}
                      >
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOutlinedIcon sx={{ fill: "#A2A2BD" }} />
                          ) : (
                            <VisibilityOffOutlinedIcon
                              sx={{ fill: "#A2A2BD" }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {touched.password && errors.password && (
                  <Typography className="show-error-form">
                    {errors.password}
                  </Typography>
                )}
                {errorMessage && (
                  <Typography className="show-error-form">
                    {errorMessage}
                  </Typography>
                )}
              </Box>
              <div className="forgot-password">
                <Link to={"/forgot-password"}>¿Olvido su contraseña?</Link>
              </div>
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
                Iniciar sesión
              </Button>
            </form>
          </Box>
        </Box>
        <img
          alt="item-2"
          src={`../../assets/login/img-2.png`}
          style={{ height: "800px", borderRadius: "20px" }}
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

export default LoginComponent;
