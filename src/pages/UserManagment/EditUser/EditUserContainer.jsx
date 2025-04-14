import React, { useContext, useState, useEffect } from "react";
import EditUserComponent from "./EditUserComponent";
import { AppContext } from "context/AppContext";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { GET_USERS,GET_PERMISSIONS,CREATE_USER,OMICS } from "constant/endpoints";
import { formatMeridiem } from "@mui/x-date-pickers/internals/utils/date-utils";

function EditUserContainer() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [omics,setOmics]= useState()
  const [roles, setRoles] = useState([
    { label: "Usuario Administrador", value: "admin" },
    { label: "Usuario Municipal", value: "omic" },
    { label: "Usuario de Soporte", value: "support" },
  ]);
  const [permissions, setPermissions] = useState([]);
  const { api } = useContext(AppContext);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  const handleOnSubmit = (values,setShowConfirmSendEmail) => {
    const { fullname, email, profile_image, dni, phone, rol,support_level, permissions,active,comments,omic } =
      values;
    const formData = new FormData();

    formData.append("full_name", fullname);
    formData.append("email", email);
    formData.append("permissions", permissions);
    formData.append("roles", rol);
    formData.append("support_level",support_level)
    formData.append("is_active",active)
    formData.append("comments", comments)
    formData.append('omic_id', omic);
    
    if (typeof profile_image[0] !== "string" && profile_image.length > 0) {
      formData.append("profile_image", profile_image[0]);
    }else if (profile_image.length === 0){
        formData.append("profile_image", "")
    }
    api(CREATE_USER+"/"+id+"/", {
      method: "PATCH",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ ok, body }) => {
        if (ok) {
            navigate(0)
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
      email: "",
      profile_image: "",
      rol: "",
      omic: null,
      support_level: "",
      creation_date: "",
      dni: "",
      phone: "",
      permissions: "",
      active: false,
      comments:"",
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
      return errors;
    },
  });

  useEffect(() => {
    api(GET_USERS + "/" + id).then(({ ok, body }) => {
      if (ok) {
        setUser(body.data);
        values.fullname = body.data.full_name
        values.email = body.data.user.email
        values.dni = body.data.dni
        values.phone = body.data.phone
        values.omic = body.data?.omic?.uuid
        values.support_level = body.data?.omic
        values.rol = body.data.roles[0].name
        values.support_level = body.data.support_level
        values.profile_image = body.data.profile_image
        values.permissions = body.data.permissions
        values.active = body.data.is_active
        values.creation_date = body.data.created_at
        values.comments=body.data.comments
        setLoading(false);
      }
    });
    api(GET_PERMISSIONS).then(({ ok, body }) => {
      if (ok) {
        setPermissions(body.data);
      }
    });
    api(OMICS).then(({ ok, body }) => {
      if (ok) {
        setOmics(body.data);
      }
    });
  }, []);

  return (
    !loading  &&
        <EditUserComponent
            values={values}
            setFieldValue={setFieldValue}
            roles={roles}
            omics={omics}
            permissions={permissions}
            handleOnSubmit={handleOnSubmit}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            isValid={isValid}
            dirty={dirty}
            handleBlur={handleBlur}
        />
  );
}

export default EditUserContainer;
