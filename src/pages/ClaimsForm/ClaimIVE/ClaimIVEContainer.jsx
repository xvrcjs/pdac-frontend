import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import ClaimIVEComponent from "./ClaimIVEComponent";
import ClaimFinishedComponent from "./ClaimFinishedComponent";
import FormComponent from "./Entities/FormComponent";
import { CREATE_CLAIM_IVE } from "constant/endpoints";
import { AppContext } from "context/AppContext";

function ClaimIVEContainer() {
  const [startForm, setStartForm] = useState(false);
  const [formSended, setFormSended] = useState(false);
  const [idCreated, setIdCreated] = useState("")
  const { api } = useContext(AppContext)
  
  const handleOnSubmit = () => {
    api(CREATE_CLAIM_IVE, {
      method: "POST",
      body: values,
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
      fullname: "",
      dni: "",
      birthdate: "",
      email: "",
      email_confirm:"",
      phone:"",
      street: "",
      number: "",
      between_streets: "",
      province: "",
      city: "",
      checkbox_social_work_or_company:false,
      checkbox_establishment:false,
      checkbox_other:false,
      social_work_or_company:"",
      establishment:"",
      other:"",
      reasons: []
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.fullname) {
        errors.fullname = "El campo nombre es requerido.";
      }
      if (!values.dni) {
        errors.dni = "El campo dni es requerido.";
      }else if (values.dni.length !== 10) {
        errors.dni = "Ingrese un dni valido";
      }
      // if (!values.comments) {
      //   errors.comments = "Este campo es obligatorio para poder continuar.";
      // }
      if (!values.email) {
        errors.email = "El campo email es requerido.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Dirección de correo no valida.";
      } 
      if (!values.email_confirm) {
        errors.email_confirm = "El campo es requerido.";
      } else if (values.email !== values.email_confirm) {
        errors.email_confirm = "Los correos no coinciden.";
      }
      if (!values.street) {
        errors.street = "El campo calle es requerido.";
      }
      if (!values.number) {
        errors.number = "El campo numero es requerido.";
      }
      if (!values.between_streets) {
        errors.between_streets = "El campo entre calles es requerido.";
      }
      if (!values.province) {
        errors.province = "El campo provincia es requerido.";
      }
      if (!values.city) {
        errors.city = "El campo ciudad es requerido.";
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
      {!startForm ?
        <ClaimIVEComponent setStartForm={setStartForm} />
      : (
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

export default ClaimIVEContainer;
