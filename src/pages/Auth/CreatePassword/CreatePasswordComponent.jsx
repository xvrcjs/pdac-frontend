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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { tokens } from "theme";
import { AppContext } from "context/AppContext";
import "utils/MainStyles.scss";
import { useFormik } from "formik";
import { CREATE_PASSWORD_ENDPOINT } from "constant/endpoints";
import { Link, useLocation, useParams,useNavigate } from "react-router-dom";
import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";

const useQuery = () => new URLSearchParams(useLocation().search);
function CreatePasswordComponent(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { api, setAuthToken, setIsInitialized } = useContext(AppContext);
  const navigate = useNavigate()
  
  const query = useQuery();
  const resetPasswordToken = query.get("reset_password_token");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sucessChange, setSuccessChange] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const {
      handleSubmit,
      handleChange,
      handleBlur,
      touched,
      errors,
      isValid,
      dirty,
      values,
  } = useFormik({
      initialValues: {
          newPassword: "",
          confirmPassword: "",
      },
      onSubmit: handleOnSubmit,
      validate: (values) => {
          const errors = {};
          if (!values.newPassword) {
              errors.newPassword = "El campo es requerido.";
          }
          if (!values.confirmPassword) {
              errors.confirmPassword = "El campo es requerido.";
          }
          return errors;
      },
  });

  function handleOnSubmit(values) {
      const { newPassword, confirmPassword } = values;
      setLoading(true);
      if (confirmPassword != newPassword) {
          setErrorMessage("Las contraseñas no coinciden");
          setLoading(false);
          return;
      }

      api(CREATE_PASSWORD_ENDPOINT, {
          method: "POST",
          body: {
              newPassword: newPassword,
              confirmPassword: confirmPassword,
              reset_password_token: resetPasswordToken,
          },
      })
          .then(({ ok, body }) => {
              if (ok) {
                setShowSuccessMessage(true);
              } else {
                  setErrorMessage(
                      "La nueva contraseña no cumple los parámetros para que sea válida"
                  );
              }
          })
          .catch((err) => {
              console.log("error", err);
          })
          .finally(() => {
              setLoading(false);
          });
  }

  const handleOnBlur = (event) => {
      handleBlur(event);
      removeClass(event);
  };

  const handleClickShowNewPassword = () =>
      setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
      setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };

  const addClass = (elem) => {
      let input = elem.target;
      input.classList.add("input-focus");
  };

  const removeClass = (elem) => {
      let input = elem.target;
      input.classList.remove("input-focus");
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
              <span style={{ color: "#03AAC0" }}>Crear contraseña</span>
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
                  Contraseña nueva
                </Typography>
                <FormControl
                  sx={{ width: "100%", marginBottom: "5px" }}
                  variant="outlined"
                >
                <OutlinedInput
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Ingresa tu nueva contraseña"
                    onFocus={addClass}
                    onBlur={handleOnBlur}
                    name="newPassword"
                    onChange={handleChange}
                    className="input-field"
                    sx={{
                        width: "90%",
                        "& .MuiOutlinedInput-notchedOutline":{
                          borderColor:"#00AEC3 !important"
                        },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
                          borderColor:"#00AEC3 !important"
                        },
                      }}
                    endAdornment={
                        <InputAdornment
                            position="end"
                            sx={{
                                position: "absolute",
                                right: "1em",
                            }}
                        >
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={
                                    handleClickShowNewPassword
                                }
                                onMouseDown={
                                    handleMouseDownPassword
                                }
                                edge="end"
                            >
                                {!showNewPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {touched.newPassword && errors.newPassword && (
                <Typography sx={{color:"red",fontSize:"12px"}}>
                    {errors.newPassword}
                </Typography>
            )}
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
                <Typography
                  sx={{
                    fontFamily: "Encode Sans",
                    fontWeight: "700",
                    fontSize: "24px",
                    marginBottom: "20px",
                  }}
                >
                  Confirmar contraseña
                </Typography>
                <FormControl
                  sx={{ width: "100%", marginBottom: "5px" }}
                  variant="outlined"
                >
                <OutlinedInput
                    id="confirmPassword"
                    type={
                        showConfirmPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="Confirma tu nueva contraseña"
                    onFocus={addClass}
                    onBlur={handleOnBlur}
                    name="confirmPassword"
                    className="input-field"
                    onChange={handleChange}
                    sx={{
                        width: "90%",
                        "& .MuiOutlinedInput-notchedOutline":{
                          borderColor:"#00AEC3 !important"
                        },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
                          borderColor:"#00AEC3 !important"
                        },
                    }}
                    endAdornment={
                        <InputAdornment
                            position="end"
                            sx={{
                                position: "absolute",
                                right: "1em",
                            }}
                        >
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={
                                    handleClickShowConfirmPassword
                                }
                                onMouseDown={
                                    handleMouseDownPassword
                                }
                                edge="end"
                            >
                                {!showConfirmPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {touched.confirmPassword &&
                errors.confirmPassword && (
                    <Typography sx={{color:"red",fontSize:"12px"}}>
                        {errors.confirmPassword}
                    </Typography>
                )}
            {errorMessage && (
                <Typography sx={{color:"red",fontSize:"12px"}}>
                    {errorMessage}
                </Typography>
            )}
            </Box>
            <Button
                type="submit"
                disabled={!(isValid && dirty) || loading}
                sx={{
                    borderRadius: "20px",
                    backgroundColor: "#04AAC0",
                    color: "#FFF",
                    padding: "9px 30px",
                    fontFamily: "Encode Sans",
                    fontSize: "16px",
                    width: "100%",
                    textTransform: "capitalize",
                    ":hover": {
                      color: "#FFF",
                      backgroundColor: "#04AAC0",
                      borderColor: "Blue",
                      transform: "scale(1.01)",
                    },
                }}
            >
                {loading ? (
                    <CircularProgress
                        sx={{
                            color: "#FFFFFF",
                            width: "24.5px !important",
                            height: "24.5px !important",
                        }}
                    />
                ) : (
                    "Crear contraseña"
                )}
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
      <Dialog
        open={showSuccessMessage}
        onClose={() => setShowSuccessMessage(!showSuccessMessage)}
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
          Contraseña fue creada exitosamente!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "300",
              mb: "50px",
            }}
            id="alert-dialog-description"
          >
            Ahora puedes ingresar con tu nueva contraseña.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
                borderRadius: "20px",
                backgroundColor: "#04AAC0",
                color: "#fff",
                padding: "9px 30px",
                fontFamily: "Encode Sans",
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
            onClick={()=> navigate("/login")}
            autoFocus
          >
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreatePasswordComponent;
