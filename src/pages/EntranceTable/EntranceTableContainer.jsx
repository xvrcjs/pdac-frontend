import React, { useContext,useState} from "react";
import EntranceTableComponent from "./EntranceTableComponent";
import { AppContext } from "context/AppContext";

function EntranceTableContainer() {
  const { api, account } = useContext(AppContext);

  const [claims, setClaims] = useState([
    {
      id: 0,
      claim_id: "#RC-A-0000001",
      assigned: "OMIC VARELA",
      status: "Active",
      assigned_role: "Usuario municipal",
      status_id: "ive",
    },
    {
      id: 1,
      claim_id: "#RC-A-0000002",
      assigned: "DP",
      status: "Active",
      assigned_role: "ADMIN 1",
      status_id: "hv_verde",
    },
    {
      id: 2,
      claim_id: "#RC-A-0000003",
      assigned: "Usuario Municipal",
      status: "Active",
      assigned_role: "ADMIN 1",
      status_id: "rojo",
    },
    {
      id: 3,
      claim_id: "#RC-A-0000004",
      assigned: "OMIC VARELA",
      status: "Inactivo",
      assigned_role: "Usuario municipal",
      status_id: "verde",
    },
    {
      id: 4,
      claim_id: "#RC-A-0000005",
      assigned: "DP",
      status: "Active",
      assigned_role: "ADMIN 2",
      status_id: "amarillo",
    },
    {
      id: 5,
      claim_id: "#RC-A-0000006",
      assigned: "Usuario Municipal",
      status: "Inactivo",
      assigned_role: "ADMIN 1",
      status_id: "verde",
    },
    {
      id: 6,
      claim_id: "#RC-A-0000007",
      assigned: "OMIC LA PLATA",
      status: "Active",
      assigned_role: "Usuario municipal",
      status_id: "rojo",
    },
    {
      id: 7,
      claim_id: "#RC-A-0000008",
      assigned: "OMIC BERAZATEGUI",
      status: "Active",
      assigned_role: "ADMIN 2",
      status_id: "hv_rojo",
    },
    {
      id: 8,
      claim_id: "#RC-A-0000009",
      assigned: "DP",
      status: "Inactivo",
      assigned_role: "Usuario municipal",
      status_id: "verde",
    },
    {
      id: 9,
      claim_id: "#RC-A-0000010",
      assigned: "OMIC FLORENCIO VARELA",
      status: "Active",
      assigned_role: "ADMIN 3",
      status_id: "rojo",
    },
    {
      id: 10,
      claim_id: "#RC-A-0000011",
      assigned: "Usuario Municipal",
      status: "Inactivo",
      assigned_role: "ADMIN 1",
      status_id: "hv_rojo",
    },
    {
      id: 11,
      claim_id: "#RC-A-0000012",
      assigned: "DP",
      status: "Active",
      assigned_role: "ADMIN 2",
      status_id: "ive",
    },
  ]);

  return <EntranceTableComponent claims={claims}/>;
}

export default EntranceTableContainer;
