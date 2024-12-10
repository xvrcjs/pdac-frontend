import React, { useState, useContext } from "react";
import { Box, Typography, Button} from "@mui/material";
import { useFormik } from "formik";
import { CREATE_PASSWORD_ENDPOINT } from "constant/endpoints";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import CreatePasswordComponent from './CreatePasswordComponent';

function CreatePasswordContainer() {

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const resetPasswordToken = query.get("reset_password_token");
    const [loading, setLoading] = useState(false);
    const { api, setAuthToken, setIsInitialized } = useContext(AppContext);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);

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
          } else {
            if (values.newPassword.length < 8) {
              errors.newPassword = "Debe tener al menos 8 caracteres.";
            }
            if (!/(?=.*[0-9])(?=.*[a-z])/.test(values.newPassword)) {
              errors.newPassword = "Debe contener números y letras.";
            }
            if (!/(?=.*[A-Z])/.test(values.newPassword)) {
              errors.newPassword = "Debe contener al menos una letra mayúscula.";
            }
          }
    
          if (!values.confirmPassword) {
            errors.confirmPassword = "El campo es requerido.";
          } else if (values.confirmPassword !== values.newPassword) {
            errors.confirmPassword = "Las contraseñas no coinciden.";
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
    return (
        <div className="container">
            {!showSuccessMessage ?
            
            <CreatePasswordComponent 
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                isValid={isValid}
                dirty={dirty}
                handleBlur={handleBlur}
            />
            :
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "40px",
                    height: "80%"
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <img
                    alt="logo-pba"
                    src="../../logo-pba.png"
                    style={{ height: "100px", width: "auto"}}
                    />
                    <Box sx={{width:"100%", height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Typography sx={{color: "#00AEC3",textAlign: "center",fontFamily: "Encode Sans",fontSize: "2rem",fontStyle: "normal",fontWeight: "700",lineHeight: "130%"}}>
                            Su contraseña fue creada con éxito, 
                        </Typography>
                        <Typography sx={{textAlign: "center",fontFamily: "Encode Sans",fontSize: "2rem",fontStyle: "normal",fontWeight: "700",lineHeight: "130%"}}>
                            ya puede iniciar sesión en el sistema.
                        </Typography>
                        <Button
                            sx={{
                            borderRadius: "20px",
                            backgroundColor: "#00AEC3",
                            color: "#fff",
                            padding: "9px 30px",
                            fontFamily: "Encode Sans",
                            fontSize: "1.1rem",
                            fontWeight: "500",
                            width: "300px",
                            marginTop: "100px",
                            textTransform: "capitalize",
                            ":hover": {
                                color: "#FFF",
                                backgroundColor: "#000",
                                borderColor: "Blue",
                            },
                            }}
                            onClick={() => navigate("/login")}
                            autoFocus
                        >
                            Iniciar sesión
                        </Button>
                    </Box>
                </Box>  
            </Box>
            }
        </div>
    );
}

export default CreatePasswordContainer;
