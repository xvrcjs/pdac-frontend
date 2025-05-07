import React ,{ useState, useCallback} from 'react';
import { Snackbar, Box,Alert, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { BorderAllRounded } from '@mui/icons-material';

const useAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [ state, setState ] = useState({
    open: false,
    vertical:"top",
    horizontal:"left",
  })

  const {vertical, horizontal,open} = state;

  const Alert = React.forwardRef(function Alert(props,ref){
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>;
  });

  const alert = useCallback(({ id, type, title, detail,life }) => {
    setAlerts((prevAlerts) => [...prevAlerts, { id, type, title, detail ,life}]);
    setState({...state,open: true})
  }, [state]);

  const removeAlert = useCallback(() => {
    setAlerts((prevAlerts) => {
      const [firstAlert, ...restAlerts] = prevAlerts;
      return restAlerts;
    });
  }, []);

  const handleClose = (event,reaseon) =>{
    if (reaseon === 'clickaway') {
      return;
    }
    setState({...state,open: false})
    removeAlert()
  }

  const alertNode = (
    <>
      <div className={`p-toast p-component p-toast-top-right`} style={{ zIndex: 1350 }}>
        {alerts.map((alert,index) => (   
            <Snackbar
              anchorOrigin={{vertical,horizontal}}
              open={open}
              onClose={handleClose}
              key={index}
              autoHideDuration={alert.life}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%',borderRadius:'20px',backgroundColor:"#C72C41" }}
              >
                <Typography sx={{fontSize:"32px",fontWeight:"500"}}>{alert.title}</Typography>
                <Typography sx={{fontSize:"13px",fontWeight:"400"}}>{alert.detail}</Typography>
              </Alert>
          </Snackbar>
        ))}
      </div>
    </>
  );

  return { alert, alertNode };
};

export default useAlert;
