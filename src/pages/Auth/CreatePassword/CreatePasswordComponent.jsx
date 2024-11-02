import React, { useState, useContext } from "react";
import "utils/MainStyles.scss";
import "pages/Auth/Login/LoginStyles.scss";
import "./CreatePasswordStyles.scss";
import {
    Box,
    TextField,
    Typography,
    Button,
    IconButton,
    InputAdornment,
    OutlinedInput,
    FormControl,
    CircularProgress,
    useTheme,
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { AppContext } from "context/AppContext";
import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { CREATE_PASSWORD_ENDPOINT } from "constant/endpoints";
import { tokens } from "theme";

const useQuery = () => new URLSearchParams(useLocation().search);

function CreatePasswordComponent(props) {
    const { api, setAuthToken, setIsInitialized } = useContext(AppContext);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const query = useQuery();
    const resetPasswordToken = query.get("reset_password_token");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [sucessChange, setSuccessChange] = useState(false);

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
                    setSuccessChange(true);
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
        <Box
            sx={{
                backgroundColor:
                    theme.palette.mode === "dark" ? "#1A2132" : "#F7f7ff",
                borderRadius: "16px",
                padding: "38px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="swt-title-wrapper">
                <img
                    src={`../../logo-${theme.palette.mode}.svg`}
                    alt="logo"
                    style={{
                        maxWidth: "115px",
                        marginBottom: "60px",
                        marginTop: "48px",
                    }}
                />
            </div>
            {!sucessChange ? (
                <>
                    <Typography
                        sx={{
                            width: "100%",
                            color:
                                theme.palette.mode === "dark"
                                    ? "#FFF"
                                    : "#1A2132",
                            fontWeight: "500",
                            fontStyle: "normal",
                            lineHeight: "normal",
                            fontFamily: "Inter",
                            marginBottom: "5px",
                        }}
                        variant="h5"
                    >
                        Olvide mi contraseña
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <form onSubmit={handleSubmit} className="form-login">
                            <Typography
                                className="input-label"
                                sx={{
                                    color:
                                        theme.palette.mode === "dark"
                                            ? "#FFF"
                                            : "#5c5c7c",
                                }}
                            >
                                Contraseña nueva
                            </Typography>
                            <FormControl
                                sx={{
                                    m: 0,
                                    backgroundColor: "#FFFFFF",
                                    position: "relative",
                                }}
                                variant="outlined"
                                className="input-field"
                            >
                                <OutlinedInput
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Ingresa tu nueva contraseña"
                                    onFocus={addClass}
                                    onBlur={handleOnBlur}
                                    name="newPassword"
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor:
                                            theme.palette.mode === "dark"
                                                ? "#1A2132"
                                                : "#FFF",
                                        paddingRight: "0px !important",
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
                                <Typography className="show-error">
                                    {errors.newPassword}
                                </Typography>
                            )}
                            {values.newPassword && (
                                <Box style={{marginTop:"10px"}}>
                                    <Box className="check-list">{/* <CheckCircle style={{color:"#DBDDED", width:"10px", height:"10px"}} /> */} <Typography className="check-list-text">Tu contraseña no puede ser demasiado similar a su otra información personal.</Typography> </Box>
                                    <Box className="check-list">{/* <CheckCircle style={{color:"#DBDDED", width:"10px", height:"10px"}} /> */} <Typography className="check-list-text">Tu contraseña debe contener al menos 8 caracteres.</Typography> </Box>
                                    <Box className="check-list">{/* <CheckCircle style={{color:"#DBDDED", width:"10px", height:"10px"}} /> */} <Typography className="check-list-text">Tu contraseña no puede ser una contraseña de uso común.</Typography> </Box>
                                    <Box className="check-list">{/* <CheckCircle style={{color:"#DBDDED", width:"10px", height:"10px"}} /> */} <Typography className="check-list-text">Tu contraseña no puede ser completamente numérica.</Typography> </Box>
                                </Box>
                            )}
                            <Typography
                                className="input-label"
                                sx={{
                                    color:
                                        theme.palette.mode === "dark"
                                            ? "#FFF"
                                            : "#5c5c7c",
                                }}
                            >
                                Confirmar contraseña
                            </Typography>
                            <FormControl
                                sx={{
                                    m: 0,
                                    backgroundColor: "#FFFFFF",
                                    position: "relative",
                                }}
                                variant="outlined"
                                className="input-field"
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
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor:
                                            theme.palette.mode === "dark"
                                                ? "#1A2132"
                                                : "#FFF",
                                        paddingRight: "0px !important",
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
                                    <Typography className="show-error">
                                        {errors.confirmPassword}
                                    </Typography>
                                )}
                            {errorMessage && (
                                <Typography className="show-error">
                                    {errorMessage}
                                </Typography>
                            )}
                            <Button
                                className="btn-submit"
                                type="submit"
                                disabled={!(isValid && dirty) || loading}
                                sx={{
                                    width: "100%",
                                    borderRadius: "40px",
                                    backgroundColor: "#004DEF",
                                    color: "#FFFFFF",
                                    padding: "9px 30px",
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    marginTop: "40px",
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
                                    "CREAR CONTRASEÑA"
                                )}
                            </Button>
                        </form>
                        {/* <Link className="swt-custom-link" to={"/login"}>
                            INICIAR SESIÓN
                        </Link> */}
                    </Box>
                </>
            ) : (
                <>
                    <Box>
                        <img
                            src={`../../assets/success-guy.svg`}
                            alt="logo"
                            style={{
                                maxWidth: "241px",
                                marginBottom: "0px",
                            }}
                        />
                    </Box>
                    <Box sx={{ maxWidth: "335px", margin: "0px 65px" }}>
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: "20px",
                                fontFamily: "Inter",
                                color:
                                    theme.palette.mode === "dark"
                                        ? "#FFF"
                                        : "#5C5C7C",
                                fontWeight: "500",
                            }}
                        >
                            Contraseña Actualizada con Éxito
                        </Typography>
                    </Box>

                    <Link
                        className="swt-custom-link"
                        to={"/login"}
                        style={{ color: colors.link[500] }}
                    >
                        VOLVER AL INICIO
                    </Link>
                </>
            )}
        </Box>
    );
}

export default CreatePasswordComponent;
