import React, { useContext, useEffect, useState } from "react";
import ClaimComponent from "./ClaimComponent";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { useFormik } from "formik";
import { CLAIM, DOWNLOAD_CLAIM, COMMENT,DOWNLOAD_ZIP } from "constant/endpoints";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function ClaimContainer() {
  const { id } = useParams();
  const { api, account } = useContext(AppContext);
  const [claimInfo, setClaimInfo] = useState(null);
  const [showMaxHighlightComment, setShowMaxHighlightComment] = useState(false);
  const [showMessageConfirmCancelChange, setShowMessageConfirmCancelChange] = useState(false)
  const [showMessageConfirmConfirmChange,setShowMessageConfirmConfirmChange] = useState(false)
  const [showMessageSuccesChange,setShowMessageSuccesChange] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleDownloadClaim = () => {
    try {
      api(DOWNLOAD_CLAIM + "/" + id)
        .then(({ ok, body }) => {
          if (ok) {
            if (body.pdf_base64) {
              const pdfData = `data:application/pdf;base64,${body.pdf_base64}`;

              const link = document.createElement("a");
              link.href = pdfData;
              link.download = `${body.filename}`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error descargando el PDF:", error);
    }
  };

  const handleDownloadZipClaim = async () => {
    try {
        api(DOWNLOAD_ZIP + "/" + id)
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
              link.download = `${claimInfo['id']}.zip`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              console.error("No se pudo obtener el archivo ZIP");
            }
          }
        })
      
      } catch (error) {
        console.error("Error al descargar el archivo ZIP:", error);
      }
  };
  

  const handleAddComment = (comment) => {
    const newComment = {
      type: "comment",
      timestamp: new Date().toISOString(),
      user: account.full_name,
      content: comment,
      highlighted: false,
    };
    api(COMMENT + "/" + id, { method: "PATCH", body: newComment }).then(
      ({ ok, body }) => {
        if (ok) {
          navigate(0);
        }
      }
    );
  };

  const handleHighlightComment = (index) => {
    if (claimInfo.featured_comments.length < 3) {
      api(COMMENT + "/" + id, { method: "PATCH", body: { id: index } }).then(
        ({ ok, body }) => {
          if (ok) {
            navigate(0);
          }
        }
      );
    } else {
      setShowMaxHighlightComment(true);
    }
  };

  const handleOnSubmit = () => {
    setShowMessageConfirmConfirmChange(false)
    api(CLAIM+"/"+id,{method: "PATCH", body: values}).then(
      ({ ok, body }) => {
        if (ok) {
          setShowMessageSuccesChange(true)
        }
      }
    );
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
      claim_access: "",
      type_of_claim: "",
      claim_status: "",
      category: "",
      heading: "",
      subheading: "",
      transfer_to_company: "",
      transfer_to_the_consumer: "",
      conciliation_hearing: "",
      imputation: "",
      resolution: "",
      monetary_agreement: "",
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};
      return errors;
    },
  });

  useEffect(() => {
    api(CLAIM + "/" + id).then(({ ok, body }) => {
      if (ok) {
        let data = body.data;

        values.claim_access = data.claim_access || "";
        values.type_of_claim = data.type_of_claim || "";
        values.claim_status = data.claim_status || "";
        values.category = data.category || "";
        values.heading = data.heading || "";
        values.subheading = data.subheading || "";
        values.transfer_to_company = data.transfer_to_company || "";
        values.transfer_to_the_consumer = data.transfer_to_the_consumer || "";
        values.conciliation_hearing = data.conciliation_hearing || "";
        values.imputation = data.imputation || "";
        values.resolution = data.resolution || "";
        values.monetary_agreement = data.monetary_agreement || "";

        setClaimInfo(data);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      {!isLoading && (
        <ClaimComponent
          account={account}
          values={values}
          claimInfo={claimInfo}
          touched={touched}
          errors={errors}
          isValid={isValid}
          dirty={dirty}
          navigate={navigate}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleOnSubmit={handleOnSubmit}
          handleDownloadClaim={handleDownloadClaim}
          handleDownloadZipClaim={handleDownloadZipClaim}
          handleAddComment={handleAddComment}
          handleHighlightComment={handleHighlightComment}
          setShowMessageConfirmCancelChange={setShowMessageConfirmCancelChange}
          setShowMessageConfirmConfirmChange={setShowMessageConfirmConfirmChange}
        />
      )}
      <Dialog
        open={showMaxHighlightComment}
        onClose={() => setShowMaxHighlightComment(!showMaxHighlightComment)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            border: "3px solid #00AEC3",
            borderRadius: "30px",
            maxWidth: "1017px",
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
          ¡Upss! ¡Un momento!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "20px",
              fontWeight: "300",
              mb: "50px",
            }}
            id="alert-dialog-description"
          >
            Para fijar un nuevo comentario es necesario que desfijes uno de los existentes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width:"189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "12px",
              fontWeight: "500",
              textTransform: "capitalize",
              border: "2px solid #838383",
            }}
            onClick={() => setShowMaxHighlightComment(!showMaxHighlightComment)}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              padding: "12px 0px",
              fontFamily: "Encode Sans",
              fontSize: "12px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor:"pointer",
            }}
            onClick={() => setShowMaxHighlightComment(!showMaxHighlightComment)}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showMessageConfirmCancelChange}
        onClose={() => setShowMessageConfirmCancelChange(!showMessageConfirmCancelChange)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            border: "3px solid #00AEC3",
            borderRadius: "30px",
            maxWidth: "1017px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "30px",
            fontWeight: "500",
          }}
          id="alert-dialog-title"
        >
          ¿Desea cancelar los cambios?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "20px",
              fontWeight: "300",
              mb: "50px",
            }}
            id="alert-dialog-description"
          >
            Al aceptar, los cambios se perderán y deberá comenzar nuevamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width:"189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "12px",
              fontWeight: "500",
              textTransform: "capitalize",
              border: "2px solid #838383",
            }}
            onClick={() => setShowMessageConfirmCancelChange(!showMessageConfirmCancelChange)}
          >
            Volver
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              padding: "12px 0px",
              fontFamily: "Encode Sans",
              fontSize: "12px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor:"pointer",
            }}
            onClick={() => navigate(0)}
            autoFocus
          >
            Si, cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showMessageConfirmConfirmChange}
        onClose={() => setShowMessageConfirmConfirmChange(!showMessageConfirmConfirmChange)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            border: "3px solid #00AEC3",
            borderRadius: "30px",
            maxWidth: "1017px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "30px",
            fontWeight: "500",
          }}
          id="alert-dialog-title"
        >
          ¿Desea confirmar los cambios?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "20px",
              fontWeight: "300",
              mb: "50px",
            }}
            id="alert-dialog-description"
          >
            Al aceptar, los cambios impactaran automáticamente en el sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width:"189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "12px",
              fontWeight: "500",
              textTransform: "capitalize",
              border: "2px solid #838383",
            }}
            onClick={() => setShowMessageConfirmConfirmChange(!showMessageConfirmConfirmChange)}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#00AEC3",
              color: "#fff",
              padding: "12px 0px",
              fontFamily: "Encode Sans",
              fontSize: "12px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor:"pointer",
            }}
            onClick={() => handleOnSubmit()}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showMessageSuccesChange}
        onClose={() => setShowMessageSuccesChange(!showMessageSuccesChange)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            border: "3px solid #00AEC3",
            borderRadius: "30px",
            maxWidth: "1017px",
            height:"250px",
            justifyContent:"space-between"

          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "30px",
            fontWeight: "500",
            mt:"20px",
          }}
          id="alert-dialog-title"
        >
          Los cambios fueron aplicados exitosamente.
        </DialogTitle>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width:"189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "capitalize",
              border: "2px solid #838383",
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
              padding: "12px 0px",
              fontFamily: "Encode Sans",
              fontSize: "16px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor:"pointer",
            }}
            onClick={() => navigate(0)}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ClaimContainer;
