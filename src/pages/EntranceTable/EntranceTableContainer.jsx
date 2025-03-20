import React, { useContext, useEffect, useState } from "react";
import EntranceTableComponent from "./EntranceTableComponent";
import { AppContext } from "context/AppContext";
import { CLAIM } from "constant/endpoints";
import AssignClaimContainer from "./AssignClaim/AssignClaimContainer";

function EntranceTableContainer() {
  const { api, account } = useContext(AppContext);
  const [claimSelected, setClaimSelected] = useState(null);
  const [showTypeAssignClaim, setShowTypeAssignClaim] = useState(false);
  const [isReAssignClaim, setIsReAssignClaim] = useState(false)
  const [claims, setClaims] = useState([]);
  const [showMessageConfirmReAssign,setShowMessageConfirmReAssign] = useState(false)

  useEffect(() => {
    api(CLAIM).then(({ ok, body }) => {
      if (ok) {
        setClaims(body.data);
      }
    });
  }, []);

  return (
    <>
      <EntranceTableComponent
        claims={claims}
        setClaimSelected={setClaimSelected}
        setShowTypeAssignClaim={setShowTypeAssignClaim}
        setShowMessageConfirmReAssign={setShowMessageConfirmReAssign}
      />
      <AssignClaimContainer
        claimSelected={claimSelected}
        showTypeAssignClaim={showTypeAssignClaim}
        setShowTypeAssignClaim={setShowTypeAssignClaim}
        showMessageConfirmReAssign={showMessageConfirmReAssign}
        setShowMessageConfirmReAssign={setShowMessageConfirmReAssign}
      />
    </>
  );
}

export default EntranceTableContainer;
