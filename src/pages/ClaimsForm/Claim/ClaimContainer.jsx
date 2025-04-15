import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import ClaimComponent from "./ClaimComponent";
import FormComponent from "./Entities/FormComponent";
import { AppContext } from "context/AppContext";
import ClaimFinishedComponent from "./ClaimFinishedComponent";
import { CREATE_CLAIM } from "constant/endpoints";

function ClaimContainer() {
  const [startForm, setStartForm] = useState(false);
  const [formSended, setFormSended] = useState(false);
  const [idCreated,setIdCreated] = useState("")
  const { api } = useContext(AppContext)

  const handleOnSubmit = (values) => {
    const formData = new FormData();
    // setFormSended(true)
    const claimerData = {
      fullname: values.fullname_cl,
      email: values.email_cl,
      dni: values.dni_cl,
      cuit: values.cuit_cl,
      gender: values.gender_cl,
      street: values.street_cl,
      number: values.number_cl,
      between_streets: values.between_streets_cl,
      province: values.province_cl,
      city: values.city_cl
    };
    formData.append("claimer", JSON.stringify(claimerData));
    formData.append("problem_description", values.comments);
    formData.append("suppliers", JSON.stringify(values.suppliers));
    if (values.files.length > 0) {
      for (let i = 0; i < values.files.length; i++) {
        formData.append("files", values.files[i]); // Añade cada archivo al FormData
      }
    }else{
      formData.append("files", "")
    }

    api(CREATE_CLAIM, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ ok, body }) => {
        if (ok) {
          setIdCreated(body["data"]["id"])
          setFormSended(true)
        } else {
          console.log("not ok");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      cuit_cl: "",
      email_cl: "",
      gender_cl: "",
      radioButton_1_cl: "",
      radioButton_2_cl: "",
      street_cl: "",
      number_cl: "",
      between_streets_cl: "",
      province_cl: "",
      city_cl: "",
      suppliers: [],
      comments: "",
      files: []
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.fullname_cl) {
        errors.fullname_cl = "El campo nombre es requerido.";
      }
      if (!values.dni_cl) {
        errors.dni_cl = "El campo dni es requerido.";
      }
      if (!values.email_cl) {
        errors.email_cl = "El campo email es requerido.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_cl)
      ) {
        errors.email_cl = "Dirección de correo no valida.";
      } 
      if (!values.street_cl) {
        errors.street_cl = "El campo calle es requerido.";
      }
      if (!values.number_cl) {
        errors.number_cl = "El campo numero es requerido.";
      }
      if (!values.between_streets_cl) {
        errors.between_streets_cl = "El campo entre calles es requerido.";
      }
      if (!values.province_cl) {
        errors.province_cl = "El campo provincia es requerido.";
      }
      if (!values.city_cl) {
        errors.city_cl = "El campo ciudad es requerido.";
      }
      return errors;
    },
  });

  return (
    <div className="container" style={{backgroundColor:"#fff"}}>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #E81F76 0%, #417099 50%, #00AEC3 100%)",
          height: "50px",
          width: "100%",
        }}
      ></Box>
      {!startForm ? (
        <ClaimComponent setStartForm={setStartForm} />
      ) : (
        !formSended ?
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
        :
        <ClaimFinishedComponent idCreated={idCreated}/>
      )}
    </div>
  );
}

export default ClaimContainer;
