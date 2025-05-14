import React, { useContext, useEffect, useState } from "react";
import EntranceTableComponent from "./EntranceTableComponent";
import { AppContext } from "context/AppContext";
import { CLAIM } from "constant/endpoints";
import AssignClaimContainer from "./AssignClaim/AssignClaimContainer";
import { current } from "@reduxjs/toolkit";

function EntranceTableContainer() {
  const { api, account } = useContext(AppContext);
  const [claimSelected, setClaimSelected] = useState(null);
  const [showTypeAssignClaim, setShowTypeAssignClaim] = useState(false);
  const [isReAssignClaim, setIsReAssignClaim] = useState(false)
  const [claims, setClaims] = useState([]);
  const [showMessageConfirmReAssign,setShowMessageConfirmReAssign] = useState(false)
  const [currentPage,setCurrentPage] = useState(1)
  const [cantElement,setCantElement] = useState(0)

  useEffect(() => {
    if (account.roles[0].name === "Admin"){
      api(CLAIM+"?page="+currentPage).then(({ ok, body }) => {
        if (ok) {
          setClaims(body.data);
          setCantElement(body.data_size)
        }
      })
    }
    else{
      api(CLAIM+"?search="+account.uuid+"&page="+currentPage).then(({ ok, body }) => {
        if (ok) {
          setClaims(body.data);
          setCantElement(body.data_size)
        }
      })
    }
  }, [currentPage]);

  return (
    <>
      <EntranceTableComponent
        claims={claims}
        setClaimSelected={setClaimSelected}
        setShowTypeAssignClaim={setShowTypeAssignClaim}
        setShowMessageConfirmReAssign={setShowMessageConfirmReAssign}
        account={account}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cantElement={cantElement}
        setCantElement={setCantElement}
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
