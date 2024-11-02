import React, { useState, useContext } from "react";
import "utils/MainStyles.scss";
import "pages/Auth/Login/LoginStyles.scss";
import "./ForgotPasswordStyles.scss";
import {
    Box,
    TextField,
    Typography,
    Button,
    CircularProgress,
    useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { FORGOT_PASSWORD_ENDPOINT } from "constant/endpoints";
import { AppContext } from "context/AppContext";
import { tokens } from "theme";

function ForgotPasswordComponent(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { api, setAuthToken, setIsInitialized } = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [showEmailSent, setShowEmailSent] = useState(false);
    const [emailToSend, setEmailToSend] = useState("");

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors,
        isValid,
        dirty,
    } = useFormik({
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
        setEmailToSend(email);
        setLoading(true);
        api(FORGOT_PASSWORD_ENDPOINT, {
            method: "POST",
            body: { email: email },
        })
            .then(({ ok, body }) => {
                if (ok) {
                    setShowEmailSent(true);
                } else {
                    //setErrorMessage("Usuario o Contraseña incorrecto")
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleOnBlur = (event) => {
        handleBlur(event);
        removeClass(event);
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
            {!showEmailSent ? (
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
                        Recuperar Contraseña
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
                                Email
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="Ingresa Email"
                                className="input-field"
                                sx={{ m: 0 }}
                                onFocus={addClass}
                                onBlur={handleOnBlur}
                                name="email"
                                onChange={handleChange}
                            />
                            {touched.email && errors.email && (
                                <Typography className="show-error">
                                    {errors.email}
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
                                    "RECUPERAR CONTRASEÑA"
                                )}
                            </Button>
                        </form>
                        <Box
                            sx={{
                                m: 0,
                                p: 0,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Link
                                className="swt-custom-link"
                                to={"/login"}
                                style={{ color: colors.link[500], width: "auto" }}
                            >
                                VOLVER AL INICIO
                            </Link>
                        </Box>
                    </Box>
                </>
            ) : (
                <>
                    <Box>
                        <img
                            src={`../../assets/mail-send.svg`}
                            alt="logo"
                            style={{
                                maxWidth: "218px",
                                marginBottom: "0px",
                            }}
                        />
                    </Box>
                    <Box sx={{ maxWidth: "335px", margin: "0px 65px" }}>
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: "14px",
                                color: theme.palette.mode ==="dark"? "#FFF":"#68688C",
                                fontWeight: "500",
                            }}
                        >
                            Hemos enviado un email a
                            <span style={{ fontWeight: "bold", color: theme.palette.mode ==="dark"? "#41EDF7": "#000" }}>
                                {" "}
                                {emailToSend}{" "}
                            </span>
                            para que puedas recuperar tu contraseña
                        </Typography>
                    </Box>
                    <Button
                        className="btn-submit"
                        type="submit"
                        onClick={() => handleOnSubmit({ email: emailToSend })}
                        sx={{
                            width: "auto",
                            borderRadius: "40px",
                            backgroundColor: "#004DEF",
                            color: "#FFFFFF",
                            padding: "9px 30px",
                            fontFamily: "Inter",
                            fontSize: "14px",
                            marginTop: "40px",
                            marginBottom: "16px",
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
                            "REENVIAR EMAIL"
                        )}
                    </Button>
                    <Box
                        sx={{
                            m: 0,
                            p: 0,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Link
                            className="swt-custom-link"
                            to={"/login"}
                            style={{ color: colors.link[500], width: "auto" }}
                        >
                            VOLVER AL INICIO
                        </Link>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default ForgotPasswordComponent;
