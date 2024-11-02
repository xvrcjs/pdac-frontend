import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../../pages/Auth/Login";
import HomePage from "../../pages/Home";
import NewUserPage from "../../pages/UserManagment/NewUser";
import ListUserPage from "../../pages/UserManagment/ListUser";
import EditUserPage from "../../pages/UserManagment/EditUser";
import EntranceTablePage from "../../pages/EntranceTable";
import ClaimsHVPage from "../../pages/ClaimsHV";
import ArchivedPage from "../../pages/Archived";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import CreatePassword from "../../pages/Auth/CreatePassword";
import { AppContext } from "../../context/AppContext";

function RouterContainer() {
    const { account } = useContext(AppContext);

    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                {/* In this place set the private routes  */}
                <Route exact path="*" element={<HomePage />} />
                <Route
                    exact
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    exact
                    path="/gestion-de-usuarios/crear-usuario"
                    element={<NewUserPage />}
                />
                <Route
                    exact
                    path="/gestion-de-usuarios/listado-de-usuarios"
                    element={<ListUserPage />}
                />
                <Route
                    exact
                    path="/gestion-de-usuarios/editar-usuario/:id"
                    element={<EditUserPage />}
                />
                <Route
                    exact
                    path="/mesa-de-entrada"
                    element={<EntranceTablePage />}
                />
                <Route
                    exact
                    path="/archivados"
                    element={<ArchivedPage />}
                />
                <Route
                    exact
                    path="/reclamos-hv"
                    element={<ClaimsHVPage />}
                />
            </Route>
            <Route element={<PublicRoute />}>
                <Route exact path="/login" element={<LoginPage />} />
                <Route
                    exact
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route
                    exact
                    path="/create-password"
                    element={<CreatePassword />}
                />
            </Route>
        </Routes>
    );
}

export default RouterContainer;
