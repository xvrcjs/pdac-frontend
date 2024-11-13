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
import "utils/MainStyles.scss";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";

function CreatePasswordComponent(props) {
  const { handleSubmit,handleChange,touched,errors,isValid,dirty,handleBlur,loading,errorMessage} = props
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sucessChange, setSuccessChange] = useState(false);
  

  const handleOnBlur = (event) => {
    handleBlur(event);
    removeClass(event);
  };

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

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
              style={{ height: "100px", width: "auto"}}
            />
            <Typography
              sx={{
                color: "#00AEC3",
                fontfamily: "Encode Sans",
                fontSize: "1.7rem",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "130%",
                mt: "40px"
              }}
            >
              Por favor, ingresa tu nueva contraseña
            </Typography>
            <Typography
              sx={{
                fontfamily: "Encode Sans",
                fontSize: "1.7rem",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "130%",
              }}
            >
              para el inicio de sesión al CRM.
            </Typography>
          </Box>
          <Box sx={{
              mt: "40px",
              "& ul": {
                paddingInlineStart: "20px",
                "& li": {
                  fontSize: "0.9rem",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "150%",
                },
              },
            }}>
            <ul>
                <li>Al menos 8 caracteres</li>
                <li>Debe contener números y letras</li>
                <li>Debe contener al menos una letra mayuscula</li>
            </ul>
          </Box>
          <Box sx={{width:"100%", marginTop: "40px" }}>
            <form onSubmit={handleSubmit} className="form-login">
              <Box sx={{ marginBottom: "20px" }}>
                <Typography
                  sx={{
                    fontFamily: "Encode Sans",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    marginBottom: "20px",
                  }}
                >
                  Nueva contraseña
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
                      width: "60%",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00AEC3 !important",
                      },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#00AEC3 !important",
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
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
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
                  <Typography sx={{ color: "red", fontSize: "12px" }}>
                    {errors.newPassword}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <Typography
                  sx={{
                    fontFamily: "Encode Sans",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    marginBottom: "20px",
                  }}
                >
                  Reingresa tu nueva contraseña para confirmar
                </Typography>
                <FormControl
                  sx={{ width: "100%", marginBottom: "5px" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma tu nueva contraseña"
                    onFocus={addClass}
                    onBlur={handleOnBlur}
                    disabled={errors.newPassword}
                    name="confirmPassword"
                    className="input-field"
                    onChange={handleChange}
                    sx={{
                      width: "60%",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00AEC3 !important",
                      },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#00AEC3 !important",
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
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
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
                {touched.confirmPassword && errors.confirmPassword && (
                  <Typography sx={{ color: "red", fontSize: "12px" }}>
                    {errors.confirmPassword}
                  </Typography>
                )}
                {errorMessage && (
                  <Typography sx={{ color: "red", fontSize: "12px" }}>
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
                  width: "60%",
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
    </>
  );
}

export default CreatePasswordComponent;
