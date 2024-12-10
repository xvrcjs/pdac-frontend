import React, { useContext } from "react";
import HomeComponent from "./HomeComponent";
import { Box } from "@mui/material";

function HomeContainer() {
  return (
    <div className="container">
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #E81F76 0%, #417099 50%, #00AEC3 100%)",
          height: "50px",
          width: "100%",
        }}
      ></Box>
      <HomeComponent />
    </div>
  );
}

export default HomeContainer;
