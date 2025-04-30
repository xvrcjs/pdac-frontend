import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { ASSIGN_TICKET,GET_USERS_SUPPORT } from "constant/endpoints";
import AssignTicketComponent from "./AssignTicketComponent";

import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function AssignTicketContainer(props) {
  const { tickets,ticketSelected,setShowAssignTicket,showAssignTicket,setShowSuccessAssignment } = props;
  const [users,setUsers] = useState([])
  const { api, account } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleOnSubmit = (assigned) => {
    const ticketData = tickets.find(ticket => ticket.id === ticketSelected);
       
    if (ticketData) {
      api(ASSIGN_TICKET + "/" + ticketData.uuid, {
        method: "PATCH",
        body: {
          assigned_id: assigned,
        },
      }).then(({ ok, body }) => {
        if (ok) {
          setShowSuccessAssignment(true)
        }
      });
    }
  };

  useEffect(()=>{
    api(GET_USERS_SUPPORT)
    .then(({ ok, body }) => {
      if (ok) {
        setUsers(body.data);      
      }
    })
  },[])
  
  return (
      <AssignTicketComponent
        users={users}
        ticketSelected={ticketSelected}
        handleOnSubmit={handleOnSubmit}
        showAssignTicket={showAssignTicket}
        setShowAssignTicket={setShowAssignTicket}
      />
  );
}

export default AssignTicketContainer;
