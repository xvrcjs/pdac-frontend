import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import CreatePasswordComponent from './CreatePasswordComponent';

function CreatePasswordContainer() {
    return (
        <div className="container">
            {/* <div className="back-image">
                <img src={`../../background_login.svg`} loading="lazy" />
                <div className="screen"></div>
            </div> */}
            <Box
                className="container-component"
                sx={{
                    margin: "0 auto",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <CreatePasswordComponent />
            </Box>
        </div>
    );
}

export default CreatePasswordContainer;
