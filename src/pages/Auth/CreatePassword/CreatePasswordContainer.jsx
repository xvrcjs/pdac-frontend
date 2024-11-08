import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import CreatePasswordComponent from './CreatePasswordComponent';

function CreatePasswordContainer() {
    return (
        <div className="container">
            <CreatePasswordComponent />
        </div>
    );
}

export default CreatePasswordContainer;
