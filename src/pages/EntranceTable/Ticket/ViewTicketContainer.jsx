import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import ViewTicketComponent from "./ViewTicketComponent";
import { TICKET,COMMENT_TICKET,ADD_INFO_ADITIONAL_TICKET } from "constant/endpoints";
import { eventCenterIcon } from "utils/icons";

const support_level = {
  "S/A":"unassigned",
  "Nivel 1 (N1)":"n1",
  "Nivel 2 (N2)":"n2",
  "Nivel 3 (N3)":"n3",
}
const support_level_order = ["S/A", "Nivel 1 (N1)", "Nivel 2 (N2)", "Nivel 3 (N3)"];

const getNextLevel = (currentLevel) => {
  const currentIndex = support_level_order.indexOf(currentLevel);
  if (currentIndex === -1 || currentIndex === support_level_order.length - 1) return null;
  return support_level_order[currentIndex + 1];
};

function ViewTicketContainer(props) {
  const { id,showViewTicket,setShowViewTicket } = props;
  const { api, account } = useContext(AppContext);
  const [ticket, setTicket] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showMessageSuccessChange, setShowMessageSuccessChange] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleAddInfoAditional = (comment) =>{
    const newComment = {
      type: "user_add_info",
      timestamp: new Date().toISOString(),
      user: account.full_name,
      content: comment,
      highlighted: false,
      ticket: id,
      view: false,
    };
    api(ADD_INFO_ADITIONAL_TICKET + "/" + id, { method: "PATCH", body: newComment }).then(
      ({ ok, body }) => {
        if (ok) {
          navigate(0);
        }
      }
    );
  }
  const handleAddFile = (file) => {
    const formData = new FormData();
    formData.append("files", file);
    api(TICKET + "/" + id, {
      method: "PATCH",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(({ ok, body }) => {
      if (ok) {
        navigate(0);
      }
    });
  };
  const handleOnSubmit = () => {
    api(TICKET+ "/" + id,{method: "PATCH", body: {"tasks":ticket.tasks}}).then(
      ({ ok, body }) => {
        if (ok) {
          setShowConfirm(false)
          setShowMessageSuccessChange(true)
        }
      }
    );
  };

  useEffect(() => {
    api(TICKET + "/" + id).then(({ ok, body }) => {
      if (ok) {
        setTicket(body.data);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      {!isLoading && (
        <ViewTicketComponent
          ticket={ticket}
          setTicket={setTicket}
          navigate={navigate}
          handleOnSubmit={handleOnSubmit}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          handleAddInfoAditional={handleAddInfoAditional}
          showViewTicket={showViewTicket}
          setShowViewTicket={setShowViewTicket}
          handleAddFile={handleAddFile}
        />
      )}
      <Dialog
        open={showMessageSuccessChange}
        onClose={() => setShowMessageSuccessChange(!showMessageSuccessChange)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            minHeight:"250px",
            width: "961px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between"
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
          Los cambios fueron aplicados exitosamente.
        </DialogTitle>
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

export default ViewTicketContainer;
