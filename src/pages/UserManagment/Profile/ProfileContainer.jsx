import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "context/AppContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { LOGOUT_ENDPOINT,CREATE_USER } from "constant/endpoints";
import ProfileComponent from "./ProfileComponent";

function ProfileContainer() {

  const { api,account,setAccount } = useContext(AppContext);
  const [isLoading,setIsLoading] = useState(true)
  const navigate = useNavigate();
  

  const handleOnSubmit = (values) => {
    const { fullname, email, profile_image } =
      values;
    const formData = new FormData();

    formData.append("full_name", fullname);
    formData.append("email", email);
    console.log(profile_image);
    if (typeof profile_image[0] !== "string" && profile_image.length > 0) {
      formData.append("profile_image", profile_image[0]);
    }else if (profile_image.length === 0){
        formData.append("profile_image", "")
    }
    api(CREATE_USER+"/"+account.uuid+"/", {
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
      profile_image: ""
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

  function signout() {
      api(LOGOUT_ENDPOINT).then(({ ok }) => {
          if (ok) {
              setAccount();
              Cookies.remove("token")
              localStorage.removeItem('lastVisitedUrl')
              setIsInitialized(true)
              navigate("/")
          }
      })
  }

  useEffect(() => {
      values.fullname = account.full_name
      values.email = account.user__email
      console.log(account)
      values.profile_image = account.profile_image
      setIsLoading(false)
  }, []);

  return (
    !isLoading &&
        <ProfileComponent
            values={values}
            handleOnSubmit={handleOnSubmit}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            isValid={isValid}
            dirty={dirty}
            handleBlur={handleBlur}
            account={account}
            signout={signout}
        />
  );
}

export default ProfileContainer;
