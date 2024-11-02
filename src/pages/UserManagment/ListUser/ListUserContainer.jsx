import React, { useContext, useState } from "react";
import ListUserComponent from "./ListUserComponent";
import { AppContext } from "context/AppContext";
import { useFormik } from "formik";
import { REGISTER_USER } from "constant/endpoints";

function ListUserContainer() {
  const { api, account } = useContext(AppContext);
  const [users, setUsers] = useState([
    {
      id: 0,
      name: "Carlos Montero",
      rol: "Usuario Admin",
      status: "Active",
      email: "carlos.montero@gmail.com",
      last_login: "23/10/24   14.34hs",
    },
    {
      id: 1,
      name: "Lucía Pérez",
      rol: "Usuario Soporte",
      status: "Active",
      email: "lucia.perez@support.com",
    },
    {
      id: 2,
      name: "Miguel Hernández",
      rol: "Usuario Admin",
      status: "Inactive",
      email: "miguel.hernandez@admin.com",
    },
    {
      id: 3,
      name: "María Fernández",
      rol: "Usuario Soporte",
      status: "Active",
      email: "maria.fernandez@support.com",
    },
    {
      id: 4,
      name: "Jorge Álvarez",
      rol: "Usuario Omic",
      status: "Inactive",
      email: "jorge.alvarez@omic.com",
    },
    {
      id: 5,
      name: "Ana López",
      rol: "Usuario Admin",
      status: "Active",
      email: "ana.lopez@admin.com",
    },
    {
      id: 6,
      name: "Pablo García",
      rol: "Usuario Soporte",
      status: "Inactive",
      email: "pablo.garcia@support.com",
    },
    {
      id: 7,
      name: "Sofía Martínez",
      rol: "Usuario Omic",
      status: "Active",
      email: "sofia.martinez@omic.com",
    },
    {
      id: 8,
      name: "David Ramírez",
      rol: "Usuario Admin",
      status: "Active",
      email: "david.ramirez@admin.com",
    },
    {
      id: 9,
      name: "Elena Gutiérrez",
      rol: "Usuario Soporte",
      status: "Active",
      email: "elena.gutierrez@support.com",
    },
    {
      id: 10,
      name: "Andrés Silva",
      rol: "Usuario Omic",
      status: "Inactive",
      email: "andres.silva@omic.com",
    },
    {
      id: 11,
      name: "Laura Vázquez",
      rol: "Usuario Admin",
      status: "Inactive",
      email: "laura.vazquez@admin.com",
    },
    {
      id: 12,
      name: "Fernando Torres",
      rol: "Usuario Soporte",
      status: "Active",
      email: "fernando.torres@support.com",
    },
    {
      id: 13,
      name: "Gabriela Ruiz",
      rol: "Usuario Omic",
      status: "Active",
      email: "gabriela.ruiz@omic.com",
    },
    {
      id: 14,
      name: "Carlos Díaz",
      rol: "Usuario Admin",
      status: "Active",
      email: "carlos.diaz@admin.com",
    },
    {
      id: 15,
      name: "Julia Méndez",
      rol: "Usuario Soporte",
      status: "Inactive",
      email: "julia.mendez@support.com",
    },
    {
      id: 16,
      name: "Ignacio Romero",
      rol: "Usuario Omic",
      status: "Active",
      email: "ignacio.romero@omic.com",
    },
    {
      id: 17,
      name: "Carmen Navarro",
      rol: "Usuario Admin",
      status: "Inactive",
      email: "carmen.navarro@admin.com",
    },
    {
      id: 18,
      name: "Hugo Medina",
      rol: "Usuario Soporte",
      status: "Active",
      email: "hugo.medina@support.com",
    },
    {
      id: 19,
      name: "Natalia Peña",
      rol: "Usuario Omic",
      status: "Inactive",
      email: "natalia.pena@omic.com",
    },
    {
      id: 20,
      name: "Natalia Peña",
      rol: "Usuario Omic",
      status: "Inactive",
      email: "natalia.pena@omic.com",
    },
  ]);

  return <ListUserComponent users={users} setUsers={setUsers} />;
}

export default ListUserContainer;
