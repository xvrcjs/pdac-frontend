import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { ASSIGN_CLAIM_IVE, OMICS,GET_USERS} from "constant/endpoints";
import AssignOmicClaimComponent from "./AssignOmicClaimComponent";
import AssignUserClaimComponent from "./AssignUserClaimComponent";

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

function AssignClaimContainer(props) {
  const { claimSelected, showTypeAssignClaim, setShowTypeAssignClaim,showMessageConfirmReAssign,setShowMessageConfirmReAssign } = props;
  const { api, account } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [omics, setOmics] = useState(null);
  const [users, setUsers] = useState(null);
  const [typeAssignClaim, setTypeAssignClaim] = useState("");
  const [showMessageSuccesAssign, setShowMessageSuccesAssign] = useState(false);
  const [showTableOmic, setShowTableOmic] = useState(false);
  const [showTableUser, setShowTableUser] = useState(false);

  const handleOnSubmit = (assigned) => {
    let data = {
      type: typeAssignClaim,
      assigned_id: assigned,
    };
    api(ASSIGN_CLAIM_IVE + "/" + claimSelected, {
      method: "PATCH",
      body: data,
    }).then(({ ok, body }) => {
      if (ok) {
        navigate(0)
      }
    });
  };

  const handleSelectTypeAssign = () => {
    if (typeAssignClaim === "omic") {
      api(OMICS).then(({ ok, body }) => {
        if (ok) {
          setOmics(body.data);
          setShowTableOmic(!showTableOmic)
        }
      });
    }else{
      api(GET_USERS+"?search=Admin").then(({ ok, body }) => {
        if (ok) {
          setUsers(body.data);
          setShowTableUser(!showTableUser)
        }
      });
    }
  };
  return (
    <>
    <Dialog
        open={showMessageConfirmReAssign}
        onClose={() => setShowMessageConfirmReAssign(!showMessageConfirmReAssign)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "1017px",
            border: "4px solid #00AEC3"
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
          Este reclamo ya se encuentra asignado.
          <br />
          <Typography sx={{fontSize:"32px",fontWeight:"600"}}>¿Desea reasignarlo?</Typography>
          <br />
          <span>Al hacerlo, los cambios impactaran automáticamente en el sistema.</span>
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
            onClick={() => {
              setShowMessageConfirmReAssign(!showMessageConfirmReAssign);
            }}
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
            }}
            onClick={() => {
              setShowMessageConfirmReAssign(!showMessageConfirmReAssign)
              setShowTypeAssignClaim(!showTypeAssignClaim);
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showTypeAssignClaim}
        onClose={() => setShowTypeAssignClaim(!showTypeAssignClaim)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-root .MuiDialog-paper": {
            padding: "20px 20px",
            borderRadius: "50px",
            maxWidth: "100%",
            width: "961px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Encode Sans",
            fontSize: "24px",
            fontWeight: "500",
          }}
          id="alert-dialog-title"
        >
          Asignación manual de reclamo
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
            Seleccione el destino de asignación del reclamo
          </DialogContentText>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor:
                  typeAssignClaim === "omic" ? "#1DBDCD4F" : "#fff",
                color: "#000",
                width: "100%",
                padding: "12px 20px",
                fontFamily: "Encode Sans",
                fontSize: "15px",
                fontWeight: "400",
                border: "1px solid #646464",
                justifyContent: "left",
                ":hover": {
                  backgroundColor: "#1DBDCD4F",
                },
              }}
              onClick={() => setTypeAssignClaim("omic")}
            >
              Asignar a Municipio
            </Button>
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor:
                  typeAssignClaim === "user" ? "#1DBDCD4F" : "#fff",
                color: "#000",
                width: "100%",
                padding: "12px 20px",
                fontFamily: "Encode Sans",
                fontSize: "15px",
                fontWeight: "400",
                border: "1px solid #646464",
                justifyContent: "left",
                mt: "10px",
                ":hover": {
                  backgroundColor: "#1DBDCD4F",
                },
              }}
              onClick={() => setTypeAssignClaim("user")}
            >
              Asignación Directa a Usuario de Defensa al Consumidor
            </Button>
          </Box>
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
            onClick={() => {
              setTypeAssignClaim(""),
              setShowTypeAssignClaim(!showTypeAssignClaim);
            }}
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
              "&.Mui-disabled": {
                backgroundColor: "#ccc",
                cursor: "not-allowed",
                color: "#fff",
              }
            }}
            disabled={typeAssignClaim===""}
            onClick={() => {
              handleSelectTypeAssign(),
              setShowTypeAssignClaim(!showTypeAssignClaim);
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <AssignOmicClaimComponent
        omics={omics}
        handleOnSubmit={handleOnSubmit}
        showTypeAssignClaim={showTypeAssignClaim}
        setShowTypeAssignClaim={setShowTypeAssignClaim}
        typeAssignClaim={typeAssignClaim}
        setTypeAssignClaim={setTypeAssignClaim}
        showTableOmic={showTableOmic}
        setShowTableOmic={setShowTableOmic}
      />
      <AssignUserClaimComponent
        users={users}
        handleOnSubmit={handleOnSubmit}
        showTypeAssignClaim={showTypeAssignClaim}
        setShowTypeAssignClaim={setShowTypeAssignClaim}
        typeAssignClaim={typeAssignClaim}
        setTypeAssignClaim={setTypeAssignClaim}
        showTableUser={showTableUser}
        setShowTableUser={setShowTableUser}
      />
    </>
  );
}

export default AssignClaimContainer;
