import React, { useContext, useState,useEffect } from "react";
import ListUserComponent from "./ListUserComponent";
import { AppContext } from "context/AppContext";
import { useFormik } from "formik";
import { GET_USERS } from "constant/endpoints";

function ListUserContainer() {
  const { api, account } = useContext(AppContext);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    api(GET_USERS)
      .then(({ ok, body }) => {
        if (ok) {
          setUsers(body.data);      
        }
      })
  },[])

  return <ListUserComponent users={users} />;
}

export default ListUserContainer;
