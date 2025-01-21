import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  Box,
  Typography,
  useTheme,
  Pagination,
  PaginationItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircleIcon from "@mui/icons-material/Circle";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Navigate, useNavigate } from "react-router-dom";

function TrafficLightSystemTimesComponent(props) {
  const {
    api,
    values,
    setFieldValue,
    touched,
    errors,
    isValid,
    config,
    dirty,
    handleBlur,
    handleChange,
    handleOnSubmit,
  } = props;
  const navigate = useNavigate()
  const [confirmSendInfo,setConfirmSendInfo] = useState(false)
  const [sendInfo,setSendInfo] = useState(false)


  const handleSendConfig = () =>{
    handleOnSubmit(values)
    setConfirmSendInfo(false)
    setSendInfo(true)
  }

  return (
    <Content className="swt-dashboard" isLoaded="true">
      <Box
        sx={{ display: "flex", justifyContent: "center",p:"30px"}}
      >
        <Box sx={{ width: "1000px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                alt="timer"
                src="../../assets/config/timer.svg"
                style={{
                  height: "100px",
                  width: "40px",
                  color: "#E81F76",
                  top: "0px",
                }}
              />

              <Typography
                sx={{
                  color: "#262626",
                  fontSize: "2rem",
                  fontWeight: "600",
                  ml: "50px",
                }}
              >
                Configuración de los tiempos del sistema de semáforo
              </Typography>
            </Box>
            <Box >
              <Typography sx={{ fontWeight: "300",ml:"100px"}}>
                A continuación deberá definir los tiempos para el cambio de tiempos del sistema de semáforos para reclamos comunes y reclamos de tipo IVE/HV, el mismo se aplicará automáticamente a todos los reclamos que ingresen luego de confirmar los cambios.
              </Typography>
              <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                p: "2.5rem 0rem",
              }}
              >
              <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6}}
              sx={{
                display: "flex",
                flexDirection: "column",
                display: "flex",
                flexDirection: "column",
                height: "234px",
                backgroundColor: "#252525",
                p: "5px 30px",
                borderRadius: "15px",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              }}
              >
                <Typography sx={{width:"100%",textAlign:"end",color:"#E5E5E5",fontSize:"13px",fontWeight:"400",mb:"10px"}}>Semáforo reclamo común</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{display:"flex",flexDirection:"column"}}>
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    Tiempo de cambio
                  </Typography>
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "20px",
                      fontWeight: "400",
                    }}
                  >
                    de verde-amarillo
                  </Typography>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: "5px",
                      }}
                    >
                      <CircleIcon sx={{ color: "#0C8D00" }} />
                      <img
                        alt="timer"
                        src="../../assets/config/liner.svg"
                        style={{
                          width: "100px",
                        }}
                      />
                      <CircleIcon sx={{ color: "#E7FF2F" }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        value={`${values.greenToYellow_c} horas`}
                        onChange={handleChange}
                        name="greenToYellow_c"
                        disabled={true}
                        sx={{
                          color: "#fff",
                          width: "147px",
                          borderRadius: "4px",
                          border: "1px solid #fff",
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            color: "#fff",
                            textAlign: "center",
                            p: "10px 5px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "unset !important",
                            borderColor: "unset !important",
                          },
                          "& .Mui-disabled": {
                            textFillColor: "#fff !important",
                          },
                        }}
                      />
                      <Box sx={{ ml: "20px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "60px",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <RemoveOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "greenToYellow_c",
                                  value: Math.max(values.greenToYellow_c - 1, 0),
                                },
                              })
                            }
                          />
                          <ControlPointOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "greenToYellow_c",
                                  value: values.greenToYellow_c + 1,
                                },
                              })
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "20px",
                  }}
                >
                  <Box sx={{display:"flex",flexDirection:"column"}}>
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    Tiempo de cambio
                  </Typography>
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "20px",
                      fontWeight: "400",
                    }}
                  >
                    de amarillo-rojo
                  </Typography>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: "5px",
                      }}
                    >
                      <CircleIcon sx={{ color: "#E7FF2F" }} />
                      <img
                        alt="timer"
                        src="../../assets/config/liner.svg"
                        style={{
                          width: "100px",
                        }}
                      />
                      <CircleIcon sx={{ color: "#DC2626" }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        value={`${values.yellowToRed_c} horas`}
                        onChange={handleChange}
                        name="yellowToRed_c"
                        disabled={true}
                        sx={{
                          color: "#fff",
                          width: "147px",
                          borderRadius: "4px",
                          border: "1px solid #fff",
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            color: "#fff",
                            textAlign: "center",
                            p: "10px 5px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "unset !important",
                            borderColor: "unset !important",
                          },
                          "& .Mui-disabled": {
                            textFillColor: "#fff !important",
                          },
                        }}
                      />
                      <Box sx={{ ml: "20px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "60px",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <RemoveOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "yellowToRed_c",
                                  value: Math.max(values.yellowToRed_c - 1, 0),
                                },
                              })
                            }
                          />
                          <ControlPointOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "yellowToRed_c",
                                  value: values.yellowToRed_c + 1,
                                },
                              })
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
              item="true"
              size={{ xs: 12, sm: 6, md: 6}}
              sx={{
                display: "flex",
                flexDirection: "column",
                display: "flex",
                flexDirection: "column",
                height: "234px",
                backgroundColor: "#A83E83",
                p: "5px 30px",
                borderRadius: "15px",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              }}
              >
                <Typography sx={{width:"100%",textAlign:"end",color:"#E5E5E5",fontSize:"13px",fontWeight:"400",mb:"10px"}}>Semáforo reclamo IVE/HV</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{display:"flex",flexDirection:"column"}}>
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    Tiempo de cambio
                  </Typography>
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "20px",
                      fontWeight: "400",
                    }}
                  >
                    de verde-amarillo
                  </Typography>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: "5px",
                      }}
                    >
                      <CircleIcon sx={{ color: "#0C8D00" }} />
                      <img
                        alt="timer"
                        src="../../assets/config/liner.svg"
                        style={{
                          width: "100px",
                        }}
                      />
                      <CircleIcon sx={{ color: "#E7FF2F" }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        value={`${values.greenToYellow_ive_hv} horas`}
                        onChange={handleChange}
                        name="greenToYellow_ive_hv"
                        disabled={true}
                        sx={{
                          color: "#fff",
                          width: "147px",
                          borderRadius: "4px",
                          border: "1px solid #fff",
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            color: "#fff",
                            textAlign: "center",
                            p: "10px 5px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "unset !important",
                            borderColor: "unset !important",
                          },
                          "& .Mui-disabled": {
                            textFillColor: "#fff !important",
                          },
                        }}
                      />
                      <Box sx={{ ml: "20px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "60px",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <RemoveOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "greenToYellow_ive_hv",
                                  value: Math.max(values.greenToYellow_ive_hv - 1, 0),
                                },
                              })
                            }
                          />
                          <ControlPointOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "greenToYellow_ive_hv",
                                  value: values.greenToYellow_ive_hv + 1,
                                },
                              })
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "20px",
                  }}
                >
                  <Box sx={{display:"flex",flexDirection:"column"}}>
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    Tiempo de cambio
                  </Typography>
                  <Typography
                    sx={{
                      color: "#E5E5E5",
                      fontSize: "20px",
                      fontWeight: "400",
                    }}
                  >
                    de amarillo-rojo
                  </Typography>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: "5px",
                      }}
                    >
                      <CircleIcon sx={{ color: "#E7FF2F" }} />
                      <img
                        alt="timer"
                        src="../../assets/config/liner.svg"
                        style={{
                          width: "100px",
                        }}
                      />
                      <CircleIcon sx={{ color: "#DC2626" }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        value={`${values.yellowToRed_ive_hv} horas`}
                        onChange={handleChange}
                        name="yellowToRed_ive_hv"
                        disabled={true}
                        sx={{
                          color: "#fff",
                          width: "147px",
                          borderRadius: "4px",
                          border: "1px solid #fff",
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            color: "#fff",
                            textAlign: "center",
                            p: "10px 5px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "unset !important",
                            borderColor: "unset !important",
                          },
                          "& .Mui-disabled": {
                            textFillColor: "#fff !important",
                          },
                        }}
                      />
                      <Box sx={{ ml: "20px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "60px",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <RemoveOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "yellowToRed_ive_hv",
                                  value: Math.max(values.yellowToRed_ive_hv - 1, 0),
                                },
                              })
                            }
                          />
                          <ControlPointOutlinedIcon
                            sx={{ color: "#fff", cursor: "pointer" }}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "yellowToRed_ive_hv",
                                  value: values.yellowToRed_ive_hv + 1,
                                },
                              })
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                alt="timer"
                src="../../assets/config/dvr.svg"
                style={{
                  height: "100px",
                  width: "40px",
                  color: "#E81F76",
                  top: "0px",
                }}
              />

              <Typography
                sx={{
                  color: "#262626",
                  fontSize: "2rem",
                  fontWeight: "600",
                  ml: "50px",
                }}
              >
                Historial de cambios de configuración:
              </Typography>
            </Box>
            <Box sx={{ ml: "100px" }}>
              <ul>
                <li style={{color:"#E81F76"}}>Última actualización: <span style={{color:"#000"}}>{config.modified_by}</span></li>
                {/* <li style={{color:"#E81F76"}}>Cambio realizado: <span style={{color:"#000"}}>“Tiempo de cambio de amarillo-rojo”</span></li> */}
                <li style={{color:"#E81F76"}}>Fecha y hora de la modificación: <span style={{color:"#000"}}>{config.modified_at}</span> </li>
              </ul>   
            </Box>
          </Box>
          <Box sx={{display:"flex",flexDirection:"row",justifyContent:"end",mt:"50px"}}>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                padding: "9px 30px",
                borderRadius:"50px",
                fontFamily: "Encode Sans",
                fontSize: "18px",
                fontWeight: "500",
                minWidth:"190px",
                border:"1px solid #000",
                textTransform: "capitalize",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#000",
                  borderColor: "#000",
                },
              }}
              onClick={()=>navigate("/")}
            >
              Cancelar
            </Button>
            <Button
              sx={{
                backgroundColor: "#00AEC3",
                color: "#000",
                padding: "9px 30px",
                borderRadius:"50px",
                fontFamily: "Encode Sans",
                fontSize: "18px",
                fontWeight: "500",
                minWidth:"250px",
                ml:"40px",
                textTransform: "capitalize",
                ":hover": {
                  color: "#000",
                  backgroundColor: "#00AEC3",
                  borderColor: "#00AEC3",
                },
              }}
              onClick={() => setConfirmSendInfo(!confirmSendInfo)}
            >
              Aplicar cambios
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
          open={confirmSendInfo}
          onClose={() => setConfirmSendInfo(!confirmSendInfo)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "&.MuiDialog-root .MuiDialog-paper": {
              padding: "30px 50px",
              border: "2px solid #00AEC3",
              borderRadius: "50px",
              maxWidth: "unset",
            },
          }}
        >
          <DialogTitle
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "27px",
              fontWeight: "600",
              color: "#262626",
            }}
            id="alert-dialog-title"
          >
            ¿Está seguro de querer modificar los tiempos del Sistema de semáforos?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "18px",
                fontWeight: "300",
                color: "#262626",
              }}
              id="alert-dialog-description"
            >
              Al hacerlo, todos los reclamos utilizaran la nueva configuración del semáforo.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mt: "40px" }}>
            <Button
              sx={{
                borderRadius: "50px",
                backgroundColor: "#fff",
                border:"1px solid #000",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                color: "#000",
                padding: "9px 0px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "500",
                ml: "20px",
                width: "200px",
                textTransform: "capitalize",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#000",
                  borderColor: "#000",
                },
              }}
              onClick={() => setConfirmSendInfo(!confirmSendInfo)}
              autoFocus
            >
              Cancelar
            </Button>
            <Button
              sx={{
                borderRadius: "50px",
                backgroundColor: "#00AEC3",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                color: "#fff",
                padding: "9px 0px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "500",
                ml: "20px",
                width: "200px",
                textTransform: "capitalize",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#000",
                  borderColor: "#000",
                },
              }}
              onClick={() => handleSendConfig()}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={sendInfo}
          onClose={() => setSendInfo(!sendInfo)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "&.MuiDialog-root .MuiDialog-paper": {
              padding: "30px 50px",
              border: "2px solid #00AEC3",
              borderRadius: "50px",
              maxWidth: "unset",
            },
          }}
        >
          <DialogTitle
            sx={{
              fontFamily: "Encode Sans",
              fontSize: "27px",
              fontWeight: "600",
              color: "#262626",
            }}
            id="alert-dialog-title"
          >
            Los cambios fueron aplicados exitosamente.
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                fontFamily: "Encode Sans",
                fontSize: "18px",
                fontWeight: "300",
                color: "#262626",
              }}
              id="alert-dialog-description"
            >
             Si desea volver a modificarlos debe hacerlo nuevamente desde “Configuración sistema de semáforo”
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mt: "40px" }}>
            <Button
              sx={{
                borderRadius: "50px",
                backgroundColor: "#00AEC3",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                color: "#fff",
                padding: "9px 0px",
                fontFamily: "Encode Sans",
                fontSize: "16px",
                fontWeight: "500",
                ml: "20px",
                width: "200px",
                textTransform: "capitalize",
                ":hover": {
                  color: "#FFF",
                  backgroundColor: "#000",
                  borderColor: "#000",
                },
              }}
              onClick={() => navigate(0)}
              autoFocus
            >
              Terminar
            </Button>
          </DialogActions>
        </Dialog>
    </Content>
  );
}

export default TrafficLightSystemTimesComponent;
