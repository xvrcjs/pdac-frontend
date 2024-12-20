import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import ClaimIVEComponent from "./ClaimIVEComponent";
import FormComponent from "./Entities/FormComponent";
import { AppContext } from "context/AppContext";

function ClaimIVEContainer() {
  const [startForm, setStartForm] = useState(false);
  const [formSended, setFormSended] = useState(false);
  const { api } = useContext(AppContext)

  const handleOnSubmit = (values) => {
    // const { fullname, email, profile_image, dni, phone, rol, permissions } =
    //   values;
    const formData = new FormData();
    console.log(values)
    // formData.append("full_name", fullname);
    // formData.append("email", email);
    // formData.append("dni", dni);
    // formData.append("phone", phone);
    // formData.append("permissions", permissions);
    // formData.append("roles", rol);
    // if (profile_image.length > 0)
    //   formData.append("profile_image", profile_image[0]);

    // api(CREATE_USER, {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then(({ ok, body }) => {
    //     if (ok) {
    //     } else {
    //       console.log("not ok");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  
  // Los campos con _cl represantan al solicitante
  // Los campos con _sp representan a los proveedores
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
    isValid,
    dirty,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullname_cl: "",
      dni_cl: "",
      birthdate_cl: "",
      email_cl: "",
      email_confirm_cl:"",
      phone_cl:"",
      checkbox_social_work_or_company:false,
      checkbox_establishment:false,
      checkbox_other:false,
      social_work_or_company:"",
      establishment:"",
      other:""
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.fullname_cl) {
        errors.fullname_cl = "El campo nombre es requerido.";
      }
      if (!values.dni_cl) {
        errors.dni_cl = "El campo dni es requerido.";
      }else if (values.dni_cl.length !== 10) {
        errors.dni_cl = "Ingrese un dni valido";
      }
      // if (!values.comments) {
      //   errors.comments = "Este campo es obligatorio para poder continuar.";
      // }
      if (!values.email_cl) {
        errors.email_cl = "El campo email es requerido.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_cl)
      ) {
        errors.email_cl = "Dirección de correo no valida.";
      } 
      if (!values.email_confirm_cl) {
        errors.email_confirm_cl = "El campo es requerido.";
      } else if (values.email_cl !== values.email_confirm_cl) {
        errors.email_confirm_cl = "Los correos no coinciden.";
      }
      return errors;
    },
  });

  return (
    <div className="container">
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #E81F76 0%, #417099 50%, #00AEC3 100%)",
          height: "50px",
          width: "100%",
        }}
      ></Box>
      {!startForm ?
        <ClaimIVEComponent setStartForm={setStartForm} />
      :
        <FormComponent
          api={api}
          values={values}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
          isValid={isValid}
          dirty={dirty}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleOnSubmit={handleOnSubmit}
        />
      }
    </div>
  );
}

export default ClaimIVEContainer;
