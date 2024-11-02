import React, { useContext,useState } from 'react';
import NewUserComponent from './NewUserComponent';
import { AppContext } from 'context/AppContext';
import { useFormik } from "formik";
import { REGISTER_USER } from 'constant/endpoints';

function NewUserContainer() {
    const {api, account} = useContext(AppContext)
    const [roles,setRoles] = useState(['Usuario Administrador','Usuario Municipal','Usuario de Soporte'])
    const [permissions,setPermissions] = useState()
    
    const handleOnSubmit = (values) => {
        api(REGISTER_USER, {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(({ok,body}) => {
            if(ok){
                setSuccessRegister(true);
            } else {
                console.log("not ok");
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => setIsLoading(false));
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
            id: "",
            fullname: "",
            email: "",
            perfil: "",
            rol: "",
            creation_date: "",
            active: false,
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
        <NewUserComponent
            values={values}
            handleChange={handleChange}
            handleOnSubmit={handleOnSubmit}
            roles={roles}
            permissions={permissions}
        />
    )
    
}

export default NewUserContainer
