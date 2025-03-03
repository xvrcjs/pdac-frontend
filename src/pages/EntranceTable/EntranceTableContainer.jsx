import React, { useContext, useEffect, useState } from "react";
import EntranceTableComponent from "./EntranceTableComponent";
import { AppContext } from "context/AppContext";
import { CLAIM } from "constant/endpoints";
import AssignClaimContainer from "./AssignClaim/AssignClaimContainer";

function EntranceTableContainer() {
  const { api, account } = useContext(AppContext);
  const [claimSelected, setClaimSelected] = useState(null);
  const [showTypeAssignClaim, setShowTypeAssignClaim] = useState(false);
  
  const [claims, setClaims] = useState([]);
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
      />
      <AssignClaimContainer
        claimSelected={claimSelected}
        showTypeAssignClaim={showTypeAssignClaim}
        setShowTypeAssignClaim={setShowTypeAssignClaim}
      />
    </>
  );
}

export default EntranceTableContainer;
