import React, { useContext,useState,useEffect} from "react";
import ClaimHVComponent from "./ClaimHVComponent";
import AssignClaimContainer from "./AssignClaim";
import { AppContext } from "context/AppContext";
import { CLAIM_IVE } from "constant/endpoints";

function ClaimHVContainer() {
  const { api, account } = useContext(AppContext);
  const [claimSelected, setClaimSelected] = useState(null);
  const [showTypeAssignClaim, setShowTypeAssignClaim] = useState(false);
  const [isReAssignClaim, setIsReAssignClaim] = useState(false)
  const [claims, setClaims] = useState([]);
  const [showMessageConfirmReAssign,setShowMessageConfirmReAssign] = useState(false)

  useEffect(() => {
      if (account.roles[0].name === "Admin"){
        api(CLAIM_IVE).then(({ ok, body }) => {
          if (ok) {
            setClaims(body.data);
          }
        })
      }
      else{
        api(CLAIM_IVE+"?search="+account.uuid).then(({ ok, body }) => {
          if (ok) {
            setClaims(body.data);
          }
        })
      }
    }, []);
  return (
    <>
      <ClaimHVComponent
        claims={claims}
        setClaimSelected={setClaimSelected}
        setShowTypeAssignClaim={setShowTypeAssignClaim}
        setShowMessageConfirmReAssign={setShowMessageConfirmReAssign}
        account={account}
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

export default ClaimHVContainer;
