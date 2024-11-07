import React, { useContext, useState,useEffect } from "react";
import NewUserComponent from "./NewUserComponent";
import { AppContext } from "context/AppContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { CREATE_USER,GET_PERMISSIONS } from "constant/endpoints";

function NewUserContainer() {
  const { api, account } = useContext(AppContext);
  const navigate = useNavigate();
  const [roles, setRoles] = useState([
    { label: "Usuario Administrador", value: "admin" },
    { label: "Usuario Municipal", value: "omic" },
    { label: "Usuario de Soporte", value: "support" },
  ]);
  const [permissions, setPermissions] = useState([]);

  const handleOnSubmit = (values) => {
    const { fullname, email, profile_image, dni, phone,rol, permissions} = values;       
        const formData = new FormData();
        formData.append('full_name', fullname);
        formData.append('email', email);
        formData.append('dni', dni);
        formData.append('phone', phone);
        formData.append('permissions', permissions);
        formData.append('roles',rol);
        if(profile_image.length > 0)
            formData.append('profile_image', profile_image[0]);
        
        api(CREATE_USER, {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(({ok,body}) => {
            if(ok){
              
            } else {
                console.log("not ok");
            }
        }).catch(err => {
            console.log(err);
        })
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
      email: "",
      profile_image: "",
      rol: "",
      creation_date: "",
      dni: "",
      phone: "",
      permissions: "",
      active: false,
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.fullname) {
        errors.fullname = "El campo nombre es requerido.";
      }
      if (!values.email) {
        errors.email = "El campo email es requerido.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Dirección de correo no valida.";
      }
      if (!values.dni) {
        errors.dni = "El campo dni es requerido.";
      } else if (!/^\d{8,10}$/.test(values.dni)) { 
        errors.dni = "El dni debe tener entre 8 y 10 dígitos.";
      }
      if (!values.phone) {
        errors.phone = "El campo teléfono es requerido.";
      } else if (!/^\d{10}$/.test(values.phone)) { 
        errors.phone = "El teléfono debe tener 10 dígitos.";
      }
      return errors;
    },
  });

  useEffect(() => {
    api(GET_PERMISSIONS).then(({ ok, body }) => {
      if (ok) {
        setPermissions(body.data);
      }
    });
  }, []);
  
  return (
    <NewUserComponent
      values={values}
      touched={touched}
      errors={errors}
      isValid={isValid}
      dirty={dirty}
      handleBlur={handleBlur}
      handleChange={handleChange}
      handleOnSubmit={handleOnSubmit}
      roles={roles}
      permissions={permissions}
    />
  );
}

export default NewUserContainer;
