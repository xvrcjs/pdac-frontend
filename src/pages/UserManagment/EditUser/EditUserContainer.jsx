import React, { useContext,useState } from 'react';
import EditUserComponent from './EditUserComponent';
import { AppContext } from 'context/AppContext';
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { REGISTER_USER } from 'constant/endpoints';

function EditUserContainer() {
    const { id } = useParams();
    const [user,setUser]=useState();
    
    const handleOnSubmit = () => {
        console.log("onSubmit")
    }
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
            id: "746353729",
            fullname: "Carlos Monero",
            email: "carmonter@defcon.com",
            perfil: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
            rol: "Omic",
            creation_date: "Fecha de creacion",
            active: true,
        },
        onSubmit: handleOnSubmit,
        validate: (values) => {
            const errors = {};
            if (!values.id) {
                errors.id = "El campo ID es requerido.";
            }
            if (!values.fullname) {
                errors.fullname = "El campo Nombre completo es requerido.";
            }
            return errors;
        },
    });

    return(
        <EditUserComponent
            user={user}
            values={values}
            handleOnSubmit={handleOnSubmit}
            handleChange={handleChange}
        />
    )
    
}

export default EditUserContainer
