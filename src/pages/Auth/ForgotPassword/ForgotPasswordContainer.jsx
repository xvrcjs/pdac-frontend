import React, { useState, useContext } from "react";
import ForgotPasswordComponent from "./ForgotPasswordComponent";
import { FORGOT_PASSWORD_ENDPOINT } from "constant/endpoints";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import useForm from "hooks/useForm";
import { censorEmail } from "utils/censor";
import { Box } from "@mui/material";


function ForgotPasswordContainer() {

    return (
        <div className="container">
            <ForgotPasswordComponent />
        </div>
    );
}

export default ForgotPasswordContainer;
