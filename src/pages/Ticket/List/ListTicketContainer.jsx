import React, { useContext, useState,useEffect } from "react";
import ListTicketComponent from "./ListTicketComponent";
import { AppContext } from "context/AppContext";
import { ASSIGN_TICKET,ADD_INFO_ADITIONAL_TICKET, TICKET } from "constant/endpoints";
import AssignTicketContainer from "./AssignTicket"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ListTicketContainer() {
  const { api, account } = useContext(AppContext);
  const [ticketSelected,setTicketSelected] = useState(null)
  const [showConfirmSendAssignment,setShowConfirmSendAssignment] = useState(false)
  const [showSuccessAssignment,setShowSuccessAssignment] = useState(false)
  const [showMessageConfirmReAssign,setShowMessageConfirmReAssign] = useState(false)
  const [showMessageConfirmReOpen,setShowMessageConfirmReOpen] = useState(false)
  const [showMessageSuccessReOpen,setShowMessageSuccessReOpen]= useState(false)
  const [showAssignTicket, setShowAssignTicket] = useState(false);
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([]);


  const handleAddInfoAditional = (comment,id) =>{
      const newComment = {
        type: "status_activity",
        timestamp: new Date().toISOString(),
        user: "(Soporte) "+account.full_name,
        content: comment,
        highlighted: false,
      };
      api(ADD_INFO_ADITIONAL_TICKET + "/" + id, { method: "PATCH", body: newComment }).then(
        ({ ok, body }) => {
          if (ok) {
            navigate(0);
          }
        }
      );
    }

  const handleReOpenTicket = () =>{
    const ticketData = tickets.find(ticket => ticket.id === ticketSelected);
           
    if (ticketData) {
      api(TICKET + "/" + ticketData.uuid, {
        method: "PATCH", 
        body: { 
          "status": "pending_review",
          "support_level":"unassigned",
          "assigned":null
        }
      }).then(({ ok, body }) => {
        if (ok) {
          let comment = "El ticket "+ticketSelected+" se ha reabierto correctamente"
          handleAddInfoAditional(comment,ticketData.uuid)
        }
      });
    }
    
  }
  useEffect(()=>{
    if (account.roles[0].name === "Admin"){
      api(TICKET).
        then(({ ok, body }) => {
        if (ok) {
          setTickets(body.data);      
        }
      })
    }
    else{
      api(TICKET+"?search="+account.uuid+"&status=in_progress").
        then(({ ok, body }) => {
        if (ok) {
          setTickets(body.data);      
        }
      })
    }
  },[])

  return (
    <>
      <ListTicketComponent 
        tickets={tickets} 
        account={account}
        setTicketSelected={setTicketSelected}
        setShowAssignTicket={setShowAssignTicket}
        setShowMessageConfirmReAssign={setShowMessageConfirmReAssign}
        setShowMessageConfirmReOpen={setShowMessageConfirmReOpen}
      />
      <AssignTicketContainer
        ticketSelected={ticketSelected}
        tickets={tickets}
        showAssignTicket={showAssignTicket}
        setShowAssignTicket={setShowAssignTicket}
        setShowSuccessAssignment={setShowSuccessAssignment}
      />
      <Dialog
        open={showMessageConfirmReAssign}
        onClose={() => setShowMessageConfirmReAssign(!showMessageConfirmReAssign)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "961px",
            margin:"auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "24px",
            fontWeight: "600",
            mt:"40px",
            ml:"69px",
            mr:"200px"
          }}
          id="alert-dialog-title"
        >
          Este ticket se encuentra actualmente asignado. 
          
          <br />
          <Typography sx={{fontSize:"28px",fontWeight:"600"}}>¿Desea confirmar la reasignación de este ticket?</Typography>
          <br />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "20px",
              fontWeight: "200",
              position: "relative",
              ml:"69px",
              mb:"49px"
            }}
            id="alert-dialog-description"
          >
            En caso de no querer confirmar la reasignación, haga click en “cancelar”
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width: "189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "15px",
              fontWeight: "500",
              textTransform: "capitalize",
              border: "2px solid #838383",
            }}
            onClick={() => (setTicketSelected(""),setShowMessageConfirmReAssign(!showMessageConfirmReAssign))}
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
              fontSize: "15px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor: "pointer",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            }}
            onClick={() => (setShowMessageConfirmReAssign(!showMessageConfirmReAssign),setShowAssignTicket(true))}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmSendAssignment}
        onClose={() => setShowConfirmSendAssignment(!showConfirmSendAssignment)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "961px",
            margin:"auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "24px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          ¿Desea confirmar la asignación de este ticket?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "20px",
              fontWeight: "200",
              mb: "50px",
              position: "relative",
            }}
            id="alert-dialog-description"
          >
            En caso de no querer confirmar la asignación, haga click en “cancelar”
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width: "189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "15px",
              fontWeight: "500",
              textTransform: "capitalize",
              border: "2px solid #838383",
            }}
            onClick={() => (setUserSelected(""),setShowConfirmSendAssignment(!showConfirmSendAssignment))}
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
              fontSize: "15px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor: "pointer",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            }}
            onClick={() => handleOnSubmit(userSelected)}
          >
            Asignar ticket
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showSuccessAssignment}
        onClose={() => setShowSuccessAssignment(!showSuccessAssignment)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "961px",
            margin:"auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "24px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          ¡Asignación exitosa!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "20px",
              fontWeight: "200",
              mb: "50px",
              position: "relative",
            }}
            id="alert-dialog-description"
          >
            Se veran reflejados los cambios en el sistema
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width: "189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "15px",
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
              fontSize: "15px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor: "pointer",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            }}
            onClick={() => navigate(0)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showMessageConfirmReOpen}
        onClose={() => setShowMessageConfirmReOpen(!showMessageConfirmReOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "961px",
            margin:"auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "24px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          ¿Desea confirmar la reapertura del ticket?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "20px",
              fontWeight: "200",
              mb: "50px",
              position: "relative",
            }}
            id="alert-dialog-description"
          >
            En caso de no querer confirmar la actualización, haga click en “cancelar”
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width: "189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "15px",
              fontWeight: "500",
              textTransform: "capitalize",
              border: "2px solid #838383",
            }}
            onClick={() => setShowMessageConfirmReOpen(!showMessageConfirmReOpen)}
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
              fontSize: "15px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor: "pointer",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            }}
            onClick={() => handleReOpenTicket()}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showMessageSuccessReOpen}
        onClose={() => setShowMessageSuccessReOpen(!showMessageSuccessReOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "30px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "961px",
            margin:"auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "24px",
            fontWeight: "600",
          }}
          id="alert-dialog-title"
        >
          La reapertura del ticket fue exitosa, está nuevamente disponible para su asignación.
        </DialogTitle>
        <DialogActions>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              width: "189px",
              padding: "12px 60px",
              fontFamily: "Encode Sans",
              fontSize: "15px",
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
              fontSize: "15px",
              fontWeight: "500",
              ml: "20px",
              width: "251px",
              textTransform: "capitalize",
              cursor: "pointer",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            }}
            onClick={() => navigate(0)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ListTicketContainer;
