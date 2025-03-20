import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import StandardsProtocolsComponent from "./StandardsProtocolsComponent";
import StandardsProtocolsCreateComponent from "./StandardsProtocolsCreateComponent";
import { AppContext } from "context/AppContext";
import { CREATE_STANDARDS_PROTOCOLS,GET_ZIP_STANDARDS_PROTOCOLS } from "constant/endpoints";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,Button } from "@mui/material"

function StandardsProtocolsContainer() {
  const { api, account } = useContext(AppContext);
  const [showCreate, setShowCreate] = useState(false);
  const [showConfirmCreated, setShowConfirmCreated] = useState(false);
  const [idDelete, setIdDelete]= useState("")
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleDelete = (id) =>  {
    setIdDelete(id)
    setShowConfirmDelete(!showConfirmDelete)
  }

  const handleConfirmDelete = () => {
    setShowConfirmDelete(!showConfirmDelete)
    api(CREATE_STANDARDS_PROTOCOLS+"/"+data[idDelete]["uuid"],{method: "DELETE"})
      .then(({ ok, body }) => {
        if (ok) {
          setShowDeleteSuccess(!showDeleteSuccess)
        } else {
          console.log("not ok");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleOnSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);

    if (values.file.length > 0) {
      formData.append("file", values.file[0]);
    } else {
      formData.append("file", "");
    }

    api(CREATE_STANDARDS_PROTOCOLS, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ ok, body }) => {
        if (ok) {
          setShowConfirmCreated(!showConfirmCreated);
        } else {
          console.log("not ok");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDownloadZip = (rows) => {
    api(GET_ZIP_STANDARDS_PROTOCOLS, {method:"POST",body: rows})
      .then(({ ok, body }) => {
        if (ok) {
          if (body["zip_file"]) {
            const byteCharacters = atob(body["zip_file"]);
            const byteArray = new Uint8Array(byteCharacters.length);
      
            for (let i = 0; i < byteCharacters.length; i++) {
              byteArray[i] = byteCharacters.charCodeAt(i); 
            }
      
            const blob = new Blob([byteArray], { type: 'application/zip' });
      
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "estandares-y-protocolos.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            console.error("No se pudo obtener el archivo ZIP");
          }
        } else {
          console.log("not ok");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
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
      title: "",
      description: "",
      file: [],
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "El campo titulo es requerido.";
      }
      if (!values.description) {
        errors.description = "El campo descripcion es requerido.";
      }
      return errors;
    },
  });
  useEffect(() => {
    api(CREATE_STANDARDS_PROTOCOLS).then(({ ok, body }) => {
      if (ok) {
        setData(body.data);
      }
    });
  }, []);

  return (
    <>
      <StandardsProtocolsComponent
        data={data}
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        handleDelete={handleDelete}
        handleDownloadZip={handleDownloadZip}
      />
      <StandardsProtocolsCreateComponent
        values={values}
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        isValid={isValid}
        dirty={dirty}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleOnSubmit={handleOnSubmit}
        showCreate={showCreate}
        setShowCreate={setShowCreate}
      />
      <Dialog
        open={showConfirmCreated}
        onClose={() => setShowConfirmCreated(!showConfirmCreated)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            borderRadius: "30px",
            width: "960px",
            maxWidth: "1017px",
            minHeight: "300px",
            justifyContent: "space-between",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "36px",
            fontWeight: "600",
            mt: "30px",
          }}
          id="alert-dialog-title"
        >
          Carga del archivo, exitosa.
        </DialogTitle>
        <DialogActions sx={{mb:"30px"}}>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              fontFamily: "Encode Sans",
              border: "2px solid #838383",
              fontSize: "18px",
              fontWeight: "500",
              width: "189px",
              height: "47px",
            }}
            onClick={() => setShowConfirm(!showConfirm)}
          >
            Cerrar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              height: "47px",
            }}
            onClick={() => navigate(0)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(!showConfirmDelete)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            borderRadius: "30px",
            width: "960px",
            maxWidth: "1017px",
            minHeight: "300px",
            justifyContent: "space-between",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "36px",
            fontWeight: "600",
            mt: "30px",
          }}
          id="alert-dialog-title"
        >
          ¿Está seguro de querer eliminar este archivo?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "300",
              mb: "20px",
            }}
            id="alert-dialog-description"
          >
            De hacerlo se eliminará definitivamente del sistema automáticamente.
            En caso de no querer confirmar la resolución, haga click en “cancelar”
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{mb:"30px"}}>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              fontFamily: "Encode Sans",
              border: "2px solid #838383",
              fontSize: "18px",
              fontWeight: "500",
              width: "189px",
              height: "47px",
            }}
            onClick={() => {setIdDelete(""),setShowConfirmDelete(!showConfirmDelete)}}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              height: "47px",
            }}
            onClick={() => handleConfirmDelete()}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(!showDeleteSuccess)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            borderRadius: "30px",
            width: "960px",
            maxWidth: "1017px",
            minHeight: "300px",
            justifyContent: "space-between",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "36px",
            fontWeight: "600",
            mt: "30px",
          }}
          id="alert-dialog-title"
        >
          El archivo fue eliminado de manera exitosa.
        </DialogTitle>
        <DialogActions sx={{mb:"30px"}}>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              fontFamily: "Encode Sans",
              border: "2px solid #838383",
              fontSize: "18px",
              fontWeight: "500",
              width: "189px",
              height: "47px",
            }}
            onClick={() => navigate(0)}
          >
            Cerrar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              fontFamily: "Encode Sans",
              fontSize: "18px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              height: "47px",
            }}
            onClick={() => navigate(0)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StandardsProtocolsContainer;
