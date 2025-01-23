import React, { useContext, useEffect, useState } from "react";
import DataOrganismsComponent from "./DataOrganismsComponent";
import { AppContext } from "context/AppContext";
import { useFormik } from "formik";
import { OMICS } from "constant/endpoints";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function DataOrganismsContainer() {
  const { api, account } = useContext(AppContext);
  const [omics, setOmics] = useState([]);
  const [showConfirmSend, setShowConfirmSend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api(OMICS).then(({ ok, body }) => {
      if (ok) {
        setOmics(body.data);
      }
    });
  }, []);

  const handleOnSubmit = () => {
    api(OMICS, {
      method: "POST",
      body: values,
    })
      .then(({ ok, body }) => {
        if (ok) {
          setShowConfirmSend(true);
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
      name: "",
      responsible: "",
      opening_hours: "",
      phone: "",
      address: "",
      email: "",
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "El campo nombre es requerido.";
      }
      if (!values.responsible) {
        errors.responsible = "El campo responsable es requerido.";
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

  return (
    <>
      <DataOrganismsComponent
        api={api}
        omics={omics}
        setOmics={setOmics}
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
      <Dialog
        open={showConfirmSend}
        onClose={() => setShowConfirmSend(!showConfirmSend)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            border: "2px solid #00AEC3",
            padding: "40px 60px",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "22px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          La oficina fue agregada exitosamente.
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "300",
              mb: "50px",
            }}
            id="alert-dialog-description"
          >
            Si desea modificarla debe hacerlo desde “Configuración {">"} Datos
            organismos”.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              padding: "12px 12px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              width: "150px",
              border: "1px solid #000",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#000",
              },
            }}
            onClick={() => setShowConfirmSend(!showConfirmSend)}
          >
            Cerrar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              padding: "12px 85px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "capitalize",
              ":hover": {
                color: "#FFF",
                backgroundColor: "#00AEC3",
                transform: "scale(1.01)",
              },
            }}
            onClick={() => navigate(0)}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DataOrganismsContainer;
