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

const CircularItemFilter = ({ status }) => {
  console.log(status)
  const statusColors = {
    hv_ive_r: "red",
    hv_ive_a: "yellow",
    hv_ive_v: "green",
  };

  const color = statusColors[status] || "white"; // Por defecto, gris si el estado no existe
  console.log(color)
  return (
    <>
        <Box
          sx={{
            width: 30,
            height: 30,
            mt: "10px",
            borderRadius: "50%",
            backgroundColor: color ? "#B31EA4":"#000",
            position: "relative",
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

  const prefix = `${account.full_name}: `; 

  const filteredActivity = claimInfo.activity.filter(item => {
    if (activityFilter === "status_activity") {
      return item.type === "status_activity"; 
    } else if (activityFilter === 'comment') {
      return item.type === 'comment'; 
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
            backgroundColor: "#fff",
            border:"2px solid #B31EA4",
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
              backgroundColor: "#FFF",
              alignItems: "center",
              border:"3px solid #B31EA4",
              borderRadius:"5px",
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
              <Typography>{claimInfo.derived_to_omic ? claimInfo.derived_to_omic.name +" - "+ claimInfo.derived_to_omic.responsible:claimInfo.derived_to_user ? claimInfo.derived_to_user:"S/A"}</Typography>
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
                    backgroundColor: "#B31EA4",
                    p: "15px",
                    color: "#fff"
                  }}
                >
                  <Typography>
                    Fecha de presentación el: {claimInfo.created_at}
                  </Typography>
                  <Typography>
                    Datos del denunciante: {claimInfo.fullname}
                  </Typography>
                  <Typography>Fecha de nacimiento: {claimInfo.birthdate}</Typography>
                  <Typography>DNI: {claimInfo.dni}</Typography>
                  <Typography>E-mail: {claimInfo.email}</Typography>
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                          border: "1.5px solid #B31EA4 !important",
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
                <Box sx={{ display:"flex",flexDirection:"column", mt: "10px",height:"770px",overflow:"auto"}}>
                  <Box sx={{
                        display:"flex",
                        flexDirection:"row",
                        backgroundColor: "#B31EA4",
                        color: "#FFF",
                        fontFamily: "Encode Sans",alignItems:"center",
                        borderRadius: "20px",
                        justifyContent: "left",
                        p: "5px 15px"
                        }}>

                      Actividad
                    <Button
                      variant="contained"
                      sx={{
                        minWidth: "unset",
                        fontSize: "15px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        backgroundColor: "#B31EA4",
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
                              {activity.user}: “{activity.content}”{" "}
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
                      backgroundColor: "#B31EA4",
                      p: "10px 30px",
                    }}
                  >
                    <Typography
                      sx={{
                        mt: "20px",
                        mb: "10px",
                        fontSize: "15px",
                        fontWeight: "500",
                        color:"#fff"
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
                          color: comment.length === 300 ? "red" : "#fff",
                        }}
                      >
                        Caracteres restantes {300 - comment.length}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#fff",
                          color: "#B31EA4",
                          fontFamily: "Encode Sans",
                          fontSize: "15px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "normal",
                          borderRadius: "50px",
                          p: "5px 20px",
                          mt: "15px",
                          "&.Mui-disabled": {
                            backgroundColor: "#8F8881",
                            color: "#fff",
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
                      height: "40px",
                      width: "250px",
                      textAlign: "center",
                      background: "#B31EA4",
                      borderRadius: "20px",
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #B31EA4 !important",
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
                        sx={{ fontSize: "14px" }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ mt: "10px" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#B31EA4",
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
                        background: "#fff",
                        border:"1px solid #000",
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
                      backgroundColor: "#B31EA4",
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
                        background: "#fff",
                        border: "1px solid #000",
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
    </Content>
  );
}

export default ClaimComponent;
