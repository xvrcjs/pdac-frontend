import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { useFormik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { TICKET } from "constant/endpoints";
import TicketComponent from "./TicketComponent";

function TicketContainer(props) {
  const { showCreateTicket, setShowCreateTicket, claim } = props;
  const { api, account } = useContext(AppContext);
  const [showMessageSuccessCreate, setShowMessageSuccessCreate] =
    useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = (values) => {
    const formData = new FormData();

    formData.append("claim", claim.id);
    formData.append("problem_description", values.description);
    formData.append("tasks", JSON.stringify(values.tasks));
    console.log(JSON.stringify(values.tasks))
    if (values.files.length > 0) {
      for (let i = 0; i < values.files.length; i++) {
        formData.append("files", values.files[i]); // Añade cada archivo al FormData
      }
    } else {
      formData.append("files", "");
    }

    api(TICKET, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(({ ok, body }) => {
      if (ok) {
        setShowConfirm(false)
        setShowMessageSuccessCreate(true);
      }
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
    resetForm,
  } = useFormik({
    initialValues: {
      description: "",
      tasks: [],
      files: [],
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.description) {
        errors.description = "El campo description es requerido.";
      }
      return errors;
    },
  });
  return (
    <>
      <TicketComponent
        values={values}
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        isValid={isValid}
        dirty={dirty}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleOnSubmit={handleOnSubmit}
        resetForm={resetForm}
        showCreateTicket={showCreateTicket}
        setShowCreateTicket={setShowCreateTicket}
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        claim={claim}
      />
      <Dialog
        open={showMessageSuccessCreate}
        onClose={() => setShowMessageSuccessCreate(!showMessageSuccessCreate)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "800px",
            margin: "auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "32px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          Su ticket se ha creado con éxito y en proceso de revisión.
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions sx={{ mr: "24px", p: "0px" }}>
          <Button
            onClick={() => navigate(0)}
            sx={{
              borderRadius: "50px",
              color: "#000",
              padding: "12px 24px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              width: "189px",
              textTransform: "capitalize",
              cursor: "pointer",
              border: "1px solid #838383",
            }}
          >
            Cerrar
          </Button>
          <Button
            onClick={() => navigate(0)}
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              padding: "12px 24px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              width: "197px",
              ml: "20px",
              textTransform: "capitalize",
              cursor: "pointer",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              "&.Mui-disabled": {
                backgroundColor: "#8F8881",
                color: "#fff",
              },
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TicketContainer;
