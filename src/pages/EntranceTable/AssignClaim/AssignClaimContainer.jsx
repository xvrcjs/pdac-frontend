import React, { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import {ASSIGN_CLAIM, OMICS } from "constant/endpoints";
import AssignClaimComponent from "./AssignClaimComponent";

function AssignClaimContainer(props) {
  const { claimSelected,showTypeAssignClaim,setShowTypeAssignClaim } = props;
  const { api, account } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [omics,setOmics] = useState(null)
  const [typeAssignClaim, setTypeAssignClaim] = useState("");
  const [showMessageSuccesAssign,setShowMessageSuccesAssign] = useState(false)
  
  const handleOnSubmit = (assigned) => {
    let data = {
      type : typeAssignClaim,
      assigned_id : assigned
    }
    api(ASSIGN_CLAIM+"/"+claimSelected,{method: "PATCH", body: data}).then(
      ({ ok, body }) => {
        if (ok) {
          // navigate(0)
        }
      }
    );
  };
  
  useEffect(() => {
    api(OMICS).then(({ ok, body }) => {
      if (ok) {
        setOmics(body.data)
        setIsLoading(false)
      }
    });
  }, []);

  return (
    !isLoading && 
      <AssignClaimComponent 
          omics={omics}
          handleOnSubmit={handleOnSubmit}
          showTypeAssignClaim={showTypeAssignClaim}
          setShowTypeAssignClaim={setShowTypeAssignClaim}
          typeAssignClaim={typeAssignClaim}
          setTypeAssignClaim={setTypeAssignClaim}
      />
  );
}

export default AssignClaimContainer;
