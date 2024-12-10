import React, { useState, useContext } from "react";
import ForgotPasswordComponent from "./ForgotPasswordComponent";
import { AppContext } from "context/AppContext";
import useForm from "hooks/useForm";
import { censorEmail } from "utils/censor";
import { Box } from "@mui/material";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FORGOT_PASSWORD_ENDPOINT } from "constant/endpoints";


function ForgotPasswordContainer() {

    const { api, setAuthToken, setIsInitialized } = useContext(AppContext);
    const navigate = useNavigate()
    const [showSuccessMessage,setShowSuccessMessage] = useState(false)
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
            setShowSuccessMessage(!showSuccessMessage)
          } 
        });
      }
    
    return (
        <div className="container">
            
            <ForgotPasswordComponent 
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                values={values}
                showSuccessMessage={showSuccessMessage}
                navigate={navigate}
            />
        </div>
    );
}

export default ForgotPasswordContainer;
