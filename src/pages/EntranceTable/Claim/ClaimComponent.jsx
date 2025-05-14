import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  Select,
  FormControl,
  OutlinedInput,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  claim_access,
  type_of_claim,
  category,
  heading,
  subheading,
  reason,
  omics,
  claim_status,
  gender
} from "./dataSelect.jsx";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import TicketContainer from "pages/Ticket/Create/index.js";
import ViewTicketContainer from "../Ticket/ViewTicketContainer.jsx";

const extensionMap = {
  docx: "doc",
};

const CircularItemFilter = ({ status }) => {
  const statusColors = {
    verde: "green",
    rojo: "red",
    amarillo: "yellow",
    hv_verde: "green",
    hv_rojo: "red",
    hv_amarillo: "yellow",
    ive: "#B31EA4",
  };

  const color = statusColors[status] || "grey"; // Por defecto, gris si el estado no existe

  return (
    <>
      {!status.includes("hv_") ? (
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            mt: "10px",
            backgroundColor: color,
          }}
        />
      ) : (
        <Box
          sx={{
            width: 30,
            height: 30,
            mt: "10px",
            borderRadius: "50%",
            backgroundColor: "black",
            position: "relative",
            border: "2px solid #1DBDCD",
          }}
        >
          {/* Triángulo */}
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderBottom: `14px solid ${color}`,
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      )}
    </>
  );
};

function ClaimComponent(props) {
  const {
    account,
    values,
    claimInfo,
    touched,
    errors,
    isValid,
    dirty,
    handleBlur,
    navigate,
    handleChange,
    handleOnSubmit,
    handleDownloadClaim,
    handleDownloadZipClaim,
    handleAddComment,
    handleHighlightComment,
    setShowMessageConfirmCancelChange,
    setShowMessageConfirmConfirmChange
  } = props;

  const [showLastMoves, setShowLastMoves] = useState(true);
  const [showActivity,setShowActivity] = useState(true)
  const [showComments, setShowComments] = useState(true);
  const [comment, setComment] = useState("");
  const [activityFilter, setActivityFilter] = useState("");
  const [showCreateTicket,setShowCreateTicket] = useState(false)
  const [ticket,setTicket] = useState()
  const [showViewTicket,setShowViewTicket] = useState(false)

  const prefix = `${account.full_name}: `; 

  const filteredActivity = claimInfo.activity.filter(item => {
    if (activityFilter === "status_activity") {
      return item.type === "status_activity"; 
    } else if (activityFilter === 'comment') {
      return item.type === 'comment'; 
    }else if (activityFilter === 'support') {
      return item.type === 'support'; 
    }else if (activityFilter === 'support_add_info') {
      return item.type === 'support_add_info'; 
    }
    return true; 
  });

  const handleChangeComment = (event) => {
      const value = event.target.value;
      if (!value.startsWith(prefix)) {
        return;
      }
      setComment(value.slice(prefix.length));
  };

  const handleChangeActivityFilter = (event) => {
    setActivityFilter(event.target.value); 
  };

  return (
    <Content className="swt-dashboard" isLoaded="true">
      <Box sx={{ margin: "10px 10px", display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            width: "80px",
            backgroundColor: "#B9EBF0",
            borderRadius: "15px",
            mr: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularItemFilter status={claimInfo["status_claim"]} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "50px",
              width: "100%",
              backgroundColor: "#B9EBF0",
              alignItems: "center",
            }}
          >
            <Typography sx={{ width: "150px", ml: "70px" }}>RECLAMO</Typography>
            <Typography>ASIGNADO</Typography>
          </Box>
          <Box sx={{ border: "1px solid #000" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "50px",
                width: "100%",
                alignItems: "center",
                borderBottom: "0.5px solid #B1B1B1",
              }}
            >
              <Typography sx={{ width: "150px", ml: "70px" }}>
                {claimInfo.id}
              </Typography>
              <Typography>{claimInfo.derived_to_omic ? claimInfo.derived_to_omic.name +" - "+ claimInfo.derived_to_omic.responsible:claimInfo.derived_to_user ? claimInfo.assigned:"S/A"}</Typography>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                p: "20px",
              }}
            >
              <Grid
                item="true"
                size={{ xs: 12, sm: 3, md: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                    fontFamily: "Encode Sans",
                    borderRadius: "15px",
                    backgroundColor: "#1DBDCD4F",
                    p: "15px",
                  }}
                >
                  <Typography>
                    Fecha de presentación el: {claimInfo.created_at}
                  </Typography>
                  <Typography>
                    Datos del denunciante: {claimInfo.claimer.fullname}
                  </Typography>
                  <Typography>Género: {gender[claimInfo.claimer.gender]}</Typography>
                  <Typography>DNI: {claimInfo.claimer.dni}</Typography>
                  <Typography>E-mail: {claimInfo.claimer.email}</Typography>
                </Box>
                <Box sx={{ overflow: "scroll", height: "auto" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mt: "10px",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Acceso del reclamo:
                    </Typography>
                    <Select
                      displayEmpty
                      value={values.claim_access}
                      name="claim_access"
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        height: "40px",
                        width: "160px",
                        textAlign: "center",
                        fontSize:"14px",
                        color: values.claim_access === "" ? "grey":"#000",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1.5px solid #00AEC3 !important",
                          borderRadius: "10px",
                        },
                        "&.MuiDisabledInput-notchedOutline": {
                          color: "grey"
                        }
                      }}
                    >
                      <MenuItem sx={{ fontSize: "14px" }} disabled value="">
                        Acceso del reclamo
                      </MenuItem>
                      {claim_access.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{ fontSize: "14px" }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mt: "10px",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Tipo de reclamo:
                    </Typography>
                    <Select
                      displayEmpty
                      value={values.type_of_claim}
                      name="type_of_claim"
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        height: "40px",
                        width: "160px",
                        textAlign: "center",
                        fontSize:"14px",
                        color: values.type_of_claim === "" ? "grey":"#000",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1.5px solid #00AEC3 !important",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <MenuItem sx={{ fontSize: "14px" }} disabled value="">
                        Tipo de reclamo
                      </MenuItem>
                      {type_of_claim.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{ fontSize: "14px" }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mt: "10px",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Categoría del reclamo:
                    </Typography>
                    <Select
                      displayEmpty
                      value={values.category}
                      name="category"
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        height: "40px",
                        width: "160px",
                        textAlign: "center",
                        fontSize:"14px",
                        color: values.category === "" ? "grey":"#000",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1.5px solid #00AEC3 !important",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <MenuItem sx={{ fontSize: "14px" }} disabled value="">
                        Categoría del reclamo
                      </MenuItem>
                      {category.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{ fontSize: "14px" }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mt: "10px",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Rubro del reclamo:
                    </Typography>
                    <Select
                      displayEmpty
                      value={values.heading}
                      name="heading"
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        height: "40px",
                        width: "160px",
                        textAlign: "center",
                        fontSize:"14px",
                        color: values.heading === "" ? "grey":"#000",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1.5px solid #00AEC3 !important",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <MenuItem sx={{ fontSize: "14px" }} disabled value="">
                        Rubro del reclamo
                      </MenuItem>
                      {heading.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{ fontSize: "14px" }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mt: "10px",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Subrubro del reclamo:
                    </Typography>
                    <Select
                      displayEmpty
                      value={values.subheading}
                      name="subheading"
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        height: "40px",
                        width: "160px",
                        textAlign: "center",
                        fontSize:"14px",
                        color: values.subheading === "" ? "grey":"#000",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1.5px solid #00AEC3 !important",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <MenuItem sx={{ fontSize: "14px" }} disabled value="">
                        Subrubro del reclamo
                      </MenuItem>
                      {subheading.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{ fontSize: "14px" }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mt: "10px",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Motivo del reclamo:
                    </Typography>
                    <Select
                      displayEmpty
                      value={values.reason || ''}
                      name="reason"
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        height: "40px",
                        textAlign: "center",
                        fontSize:"14px",
                        color: values.reason === "" ? "grey":"#000",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1.5px solid #00AEC3 !important",
                          borderRadius: "7px",
                        },
                      }}
                    >
                      <MenuItem sx={{ fontSize: "14px" }} disabled value="">
                        Motivo del reclamo
                      </MenuItem>
                      {reason.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{ fontSize: "14px" }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  {claimInfo.suppliers.map((supplier,index)=>(
                  <Box
                    key={index}
                    >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: "10px",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", fontWeight: "500"}}>
                        Empresa ({index+1}):
                      </Typography>
                      <Typography sx={{p:"5px",border:"1px solid #000",borderRadius:"7px",mt:"10px"}}>
                        {supplier.fullname}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mt: "10px",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                        Cuit ({index+1}):
                      </Typography>
                      <Typography sx={{p:"5px",border:"1px solid #000",borderRadius:"7px",width:"80%"}}>
                        {supplier.cuil}
                      </Typography>
                    </Box>
                  </Box>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mt: "10px",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Traslado a la empresa (intimación):
                    </Typography>
                    <TextField
                      variant="outlined"
                      name="transfer_to_company"
                      onChange={handleChange}
                      sx={{
                        fontFamily: "Encode Sans",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        border: "unset",
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "8px",
                          borderRadius: "7px",
                          fontSize:"14px",
                          border: "1.5px solid #00AEC3 !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "unset",
                          borderRadius: "7px",
                        },
                      }}
                      value={values.transfer_to_company}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Derivado al municipio:
                    </Typography>
                    <Typography sx={{p:"5px",border:"1px solid #000",borderRadius:"7px",width:"70%",height:"25px"}}>
                      {claimInfo?.derived_to_omic?.name || ""}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Traslado al consumidor:
                    </Typography>
                    <TextField
                      variant="outlined"
                      name="transfer_to_the_consumer"
                      onChange={handleChange}
                      sx={{
                        fontFamily: "Encode Sans",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        border: "unset",
                        width: "60%",
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "8px",
                          borderRadius: "7px",
                          fontSize:"14px",
                          border: "1.5px solid #00AEC3 !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "unset",
                          borderRadius: "7px",
                        },
                      }}
                      value={values.transfer_to_the_consumer}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Audiencia de conciliación:
                    </Typography>
                    <TextField
                      variant="outlined"
                      name="conciliation_hearing"
                      onChange={handleChange}
                      sx={{
                        fontFamily: "Encode Sans",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        border: "unset",
                        width: "60%",
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "8px",
                          borderRadius: "7px",
                          fontSize:"14px",
                          border: "1.5px solid #00AEC3 !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "unset",
                          borderRadius: "7px",
                        },
                      }}
                      value={values.conciliation_hearing}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Imputación:
                    </Typography>
                    <TextField
                      variant="outlined"
                      name="imputation"
                      onChange={handleChange}
                      sx={{
                        fontFamily: "Encode Sans",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        border: "unset",
                        width: "70%",
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "8px",
                          borderRadius: "7px",
                          fontSize:"14px",
                          border: "1.5px solid #00AEC3 !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "unset",
                          borderRadius: "7px",
                        },
                      }}
                      value={values.imputation}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Resolución:
                    </Typography>
                    <TextField
                      variant="outlined"
                      name="resolution"
                      onChange={handleChange}
                      sx={{
                        fontFamily: "Encode Sans",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        border: "unset",
                        width: "70%",
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "8px",
                          borderRadius: "7px",
                          fontSize:"14px",
                          border: "1.5px solid #00AEC3 !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "unset",
                          borderRadius: "7px",
                        },
                      }}
                      value={values.resolution}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      Acuerdo monetario:
                    </Typography>
                    <TextField
                      variant="outlined"
                      name="monetary_agreement"
                      onChange={handleChange}
                      sx={{
                        fontFamily: "Encode Sans",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        border: "unset",
                        width: "60%",
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "8px",
                          borderRadius: "7px",
                          fontSize:"14px",
                          border: "1.5px solid #00AEC3 !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "unset",
                          borderRadius: "7px",
                        },
                      }}
                      value={values.monetary_agreement}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid
                item="true"
                size={{ xs: 12, sm: 6, md: 6 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                    Descripción del problema
                  </Typography>

                <Box sx={{border:"1px solid #D6D3D1",borderRadius: "15px",boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",display:"flex",flexDirection:"column",p:"17px 20px"}}>
                  <Box sx={{height:"160px",fontSize:"16px",overflow:"auto",fontWeight:"100"}}>
                    {claimInfo.problem_description}
                  </Box>
                  <Box sx={{display:"flex",flexDirection:"column",alignItems:"end"}}>
                  <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        border: "unset",
                        color: "#fff",
                        fontFamily: "Encode Sans",
                        fontSize: "14px",
                        background: "#00AEC3",
                        borderRadius: "15px",
                        fontStyle: "normal",
                        mt:"10px",
                        p: "3px 40px",
                        fontWeight: "400",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      }}
                      onClick={()=> handleDownloadClaim()}
                      endIcon={<FileDownloadOutlinedIcon />}
                    >
                      Descargar reclamo
                    </Button>
                  </Box>
                    </Box>
                </Box>
                <Box
                  sx={{
                    minHeight: "140px",
                    borderRadius: "15px",
                    display: "flex",
                    backgroundColor: "#B0E6EC",
                    flexDirection: "column",
                    mt: "5px",
                    // alignItems: "start",
                    justifyContent: "space-between",
                  }}
                >
                  {claimInfo.files.length > 0 && (
                    <Grid
                      container
                      columns={{ xs: 4, sm: 8, md: 12 }}
                      sx={{ minWidth: "80%" }}
                    >
                      {claimInfo.files.map((file, index) => (
                        <Grid
                          item="true"
                          key={index}
                          size={{ xs: 12, sm: 3, md: 3 }}
                          sx={{ width: "100%" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              height: "35px",
                              background: "#fff",
                              borderRadius: "8px",
                              margin: "5px",
                              width: "auto",
                              p: "0px 10px",
                              cursor: "pointer",
                              "&:hover": {
                                background: "#fff",
                              },
                            }}
                            aria-label={file.file_name}
                            onClick={() => window.open(process.env.REACT_APP_BACKEND_URL_MEDIA +file.file,"_blank")}
                          >
                            <img
                              style={{ width: "18px" }}
                              src={`../../icons/file-${extensionMap[file.file_name.split(".").pop().toLowerCase()] || file.file_name.split(".").pop().toLowerCase() }.svg`}
                            />
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                marginLeft: "10px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                textAlign: "center",
                              }}
                            >
                              {file.file_name}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}

                    </Grid>
                  )}
                  <Box
                    sx={{ display: "flex", justifyContent: "right", p: "20px" }}
                  >
                    {claimInfo.files.length > 0 && (
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{
                          border: "unset",
                          color: "#fff",
                          fontFamily: "Encode Sans",
                          fontSize: "14px",
                          background: "#00AEC3",
                          borderRadius: "15px",
                          fontStyle: "normal",
                          fontWeight: "400",
                          p: "3px 40px",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          ".MuiOutlinedInput-notchedOutline": { border: 0 },
                        }}
                        endIcon={<FolderZipOutlinedIcon />}
                        onClick={()=>handleDownloadZipClaim()}
                      >
                        Descargar adjuntos
                      </Button>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display:"flex",flexDirection:"column", mt: "10px",height:"350px",overflow:"auto"}}>
                  <Box sx={{display:"flex",flexDirection:"row",
                        backgroundColor: "#E81F76",
                        color: "#FFF",
                        fontFamily: "Encode Sans",alignItems:"center",
                        borderRadius: "20px",
                        justifyContent: "left",
                        p: "5px 15px"}}>

                      Actividad
                    <Button
                      variant="contained"
                      sx={{
                        minWidth: "unset",
                        fontSize: "15px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        backgroundColor: "#E81F76",
                        color:"#fff",
                        p:"0px",
                        boxShadow:"none",
                        mr:"40px",
                        "&:hover":{
                          boxShadow:"none"
                        }
                      }}
                      onClick={() => setShowActivity(!showActivity)}
                      endIcon={
                        showActivity ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )
                      }
                    >
                    </Button>
                    <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                      <Typography sx={{mr:"10px"}}>
                        Mostrar:
                      </Typography>
                      <Select
                        displayEmpty
                        value={activityFilter}
                        onChange={handleChangeActivityFilter}
                        input={<OutlinedInput />}
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{
                          width: "200px",
                          height: "30px",
                          textAlign: "center",
                          background: "#fff",
                          borderRadius: "20px",
                          color: "#000",
                          alignItems: "center",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderRadius: "20px",
                          },
                          "& .MuiSvgIcon-root.MuiSelect-icon": {
                            color: "#000",
                            transform: "scale(1.4)",
                          }
                        }}
                      >
                        <MenuItem sx={{ fontSize: "14px",display:"flex",flexDirection:"column",alignItems:"center" }} value="">
                          Todo
                        </MenuItem>
                        <MenuItem sx={{ fontSize: "14px",display:"flex",flexDirection:"column",alignItems:"center" }} value="status_activity">
                          Actividades
                        </MenuItem>
                        <MenuItem sx={{ fontSize: "14px",display:"flex",flexDirection:"column",alignItems:"center" }} value="comment">
                          Comentarios
                        </MenuItem>
                        <MenuItem sx={{ fontSize: "14px",display:"flex",flexDirection:"column",alignItems:"center" }} value="support">
                          Soporte
                        </MenuItem>
                        <MenuItem sx={{ fontSize: "14px",display:"flex",flexDirection:"column",alignItems:"center" }} value="support_add_info">
                          Solicitud de info adicional
                        </MenuItem>
                      </Select>
                    </Box>
                    </Box>
                  {showActivity && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "15px",
                        alignItems: "center",
                        m:"20px 0px",
                        overflow: "auto",
                        height:"300px", 
                      }}
                    >
                      {filteredActivity.length === 0 ?(
                        <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",height:"100%"}}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: "300",
                              color: "rgba(29, 28, 29, 0.70",
                            }}
                          >
                            No hay movimientos para mostrar.
                          </Typography>
                        </Box>
                      ) : (
                        filteredActivity.map((activity, index) => (
                            <Typography sx={{ width: "80%",p:"10px" }}>
                              <span style={{fontWeight:"500"}}>{activity.user}</span>: “{activity.content}”{" "}
                              <span
                                style={{ fontStyle: "italic", fontWeight: "300" }}
                              >
                                {activity.timestamp}
                              </span>
                              {(!activity.highlighted && activity.type === "comment") && 
                                <span style={{marginLeft:"15px",fontSize:"13px",color:"#E81F76",cursor:"pointer"}} onClick={()=> handleHighlightComment(activity.id,"set")}>
                                  Destacar mensaje
                                </span>
                              }
                              {activity.type === "support_add_info" && 
                                <span style={{marginLeft:"15px",fontSize:"13px",color:"#E81F76",cursor:"pointer"}} onClick={()=>( setTicket(activity.ticket),
                                setShowViewTicket(!showViewTicket))}>
                                  Ver solicitud
                                </span>
                              }
                            </Typography>
                        ))
                        )}
                    </Box>
                  )}
                  </Box>
                  <Box
                    sx={{
                      minHeight: "300px",
                      borderRadius: "15px",
                      backgroundColor: "rgba(0, 174, 195, 0.31)",
                      p: "10px 30px",
                    }}
                  >
                    <Typography
                      sx={{
                        mt: "20px",
                        mb: "10px",
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      Agregar comentario
                    </Typography>
                    <TextField
                      maxRows={Infinity}
                      minRows={7}
                      multiline
                      value={prefix + comment}
                      onChange={handleChangeComment}
                      name="comment"
                      sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                        border: "1px solid #000",
                        borderRadius: "10px",
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          fontFamily: "Encode Sans",
                          overflow: "scroll !important",
                          maxHeight: "150px",
                          height: "150px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "unset",
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "unset !important",
                          borderColor: "unset !important",
                        },
                      }}
                      aria-label="maximum height"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "300",
                          color: comment.length === 300 ? "red" : "gray",
                        }}
                      >
                        Caracteres restantes {300 - comment.length}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#00AEC3",
                          color: "#FFF",
                          fontFamily: "Encode Sans",
                          fontSize: "15px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "normal",
                          borderRadius: "50px",
                          p: "5px 20px",
                          mt: "15px",
                          "&.Mui-disabled": {
                            backgroundColor: "#F3F3F3",
                            color: "#000",
                            border:"1px solid #000",
                          },
                        }}
                        disabled={comment===""}
                        onClick={() => handleAddComment(comment)}
                      >
                        Agregar comentario
                      </Button>
                    </Box>
                  </Box>
              </Grid>
              <Grid
                item="true"
                size={{ xs: 12, sm: 3, md: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{display:"flex",flexDirection:"row",alignItems:"end"}}>
                  <Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                    Estado actual del reclamo:
                  </Typography>
                  <Select
                    displayEmpty
                    value={values.claim_status}
                    name="claim_status"
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      height: "30px",
                      width: "160px",
                      textAlign: "center",
                      background: "#00AEC3",
                      borderRadius: "20px",
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #00AEC3 !important",
                        borderRadius: "20px",
                      },
                      "& .MuiSvgIcon-root.MuiSelect-icon": {
                        color: "#fff",
                        transform: "scale(1.4)",
                      },
                    }}
                  >
                    <MenuItem sx={{ fontSize: "14px" }} disabled value="">
                      Estado de reclamo
                    </MenuItem>
                    {claim_status.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{ fontSize: "12px" }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  </Box>
                  {!claimInfo.has_ticket &&
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#00AEC3",
                        color: "#FFF",
                        fontFamily: "Encode Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "normal",
                        borderRadius: "20px",
                        height:"30px",
                        justifyContent: "space-between",
                      }}
                      onClick={() => setShowCreateTicket(!showCreateTicket)}
                    >
                      Solicitar soporte
                    </Button>
                  }
                </Box>
                <Box sx={{ mt: "10px" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#E81F76",
                      color: "#FFF",
                      fontFamily: "Encode Sans",
                      fontSize: "15px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                      width: "100%",
                      borderRadius: "20px",
                      justifyContent: "space-between",
                      p: "15px 20px",
                    }}
                    onClick={() => setShowLastMoves(!showLastMoves)}
                    endIcon={
                      showLastMoves ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )
                    }
                  >
                    Ultimo movimiento del estado:
                  </Button>
                  {showLastMoves && (
                    <Box
                      sx={{
                        display: "flex",
                        background: "#B9EBF0",
                        minHeight: "350px",
                        borderRadius: "15px",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: "-10px",
                        p:"10px"
                      }}
                    >
                      {claimInfo.last_status === null ?
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "300",
                          color: "rgba(29, 28, 29, 0.70",
                        }}
                      >
                        No hay movimientos para mostrar.
                      </Typography>
                      :
                      <Box
                          sx={{
                            border:"2px solid gray",
                            borderRadius:"18px",
                            height:"120px",
                            m:"5px 0px",
                            backgroundColor:"#fff",
                            overflow:"auto",
                          }}
                        >
                          <Typography sx={{ p:"10px",fontSize:"18px",fontWeight:"500"}}>
                            {claimInfo.last_status.user}: <span style={{fontWeight:"300"}}>“{claimInfo.last_status.content}”{" "}</span>
                            <span
                              style={{ fontStyle: "italic", fontWeight: "300" }}
                            >
                              {claimInfo.last_status.timestamp}
                            </span>
                          </Typography>
                        </Box>
                      }
                    </Box>
                  )}
                </Box>
                <Box sx={{ mt: "10px" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#E81F76",
                      color: "#FFF",
                      fontFamily: "Encode Sans",
                      fontSize: "15px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                      width: "100%",
                      borderRadius: "20px",
                      justifyContent: "space-between",
                      p: "15px 20px",
                    }}
                    onClick={() => setShowComments(!showComments)}
                    endIcon={
                      showComments ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )
                    }
                  >
                    Comentarios destacados
                  </Button>
                  {showComments && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        background: "#B9EBF0",
                        height: "350px",
                        mt: "-10px",
                        borderRadius: "15px",
                        mt: "-10px",
                        p:"10px"
                      }}
                    >
                      {claimInfo.featured_comments.length === 0 ? (
                        <Box sx={{
                          display:"flex",
                          height:"100%",
                          justifyContent: "center",
                          alignItems: "center"
                        }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "300",
                            color: "rgba(29, 28, 29, 0.70",
                          }}
                        >
                          No hay comentarios fijados para mostrar.
                        </Typography>
                        </Box>
                      ):(
                        claimInfo.featured_comments.map((comment, index) => (
                          <Box
                            key={index}
                            sx={{
                              border:"2px solid gray",
                              borderRadius:"18px",
                              height:"100px",
                              m:"5px 0px",
                              backgroundColor:"#fff",
                              overflow:"auto",
                            }}
                          >
                            <Typography sx={{ p:"10px",fontSize:"18px",fontWeight:"500"}}>
                              {comment.user}: <span style={{fontWeight:"300"}}>“{comment.content}”{" "}</span>
                              <span
                                style={{ fontStyle: "italic", fontWeight: "300" }}
                              >
                                {comment.timestamp}
                              </span>
                              {
                                <span style={{marginLeft:"15px",fontSize:"13px",color:"#E81F76",cursor:"pointer"}} onClick={()=> handleHighlightComment(comment.id,"unfix")}>
                                  Desfijar comentario
                                </span>
                              }
                            </Typography>
                          </Box>
                        ))
                      )}
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "#00AEC3",
                      color: "#FFF",
                      fontFamily: "Encode Sans",
                      fontSize: "15px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                      width: "70%",
                      textAlign: "center",
                      borderRadius: "50px",
                      p: "10px",
                      mt: "40px",
                    }}
                    onClick={()=> setShowMessageConfirmConfirmChange(true)}
                  >
                    Aplicar cambios
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "transparent",
                      color: "#000",
                      fontFamily: "Encode Sans",
                      fontSize: "15px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                      borderColor: "#000",
                      width: "60%",
                      borderRadius: "50px",
                      textAlign: "center",
                      p: "10px",
                      mt: "10px",
                    }}
                    onClick={()=>setShowMessageConfirmCancelChange(true)}
                  >
                    Cancelar cambios
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "transparent",
                      color: "#000",
                      fontFamily: "Encode Sans",
                      fontSize: "15px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                      borderColor: "#000",
                      width: "60%",
                      borderRadius: "50px",
                      textAlign: "center",
                      p: "10px",
                      mt: "10px",
                    }}
                    onClick={()=> navigate("/mesa-de-entrada")}
                  >
                    Volver
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <TicketContainer 
        showCreateTicket={showCreateTicket}
        setShowCreateTicket={setShowCreateTicket}
        claim={claimInfo}
      />
      {ticket &&
        <ViewTicketContainer
          id={ticket}
          showViewTicket={showViewTicket}
          setShowViewTicket={setShowViewTicket}
        />
      }
    </Content>
  );
}

export default ClaimComponent;
