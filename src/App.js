import React, { Suspense, useState, useEffect, useCallback } from "react";
import Router from "./components/Router/RouterContainer";
import { AppContext } from "./context/AppContext.js";
import { Box } from "@mui/material"
import useApi from './hooks/useApi';
import { GET_PROFILE_ENDPOINT, GET_USER_PERMISSIONS } from "./constant/endpoints";
import { CircularProgress } from "@mui/material";
import "./App.scss";
import useAlert from './hooks/useAlert';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";


function App() {
  const [isLoading, setIsLoading] = useState();
  const [account, setAccount] = useState();
  const [isInitialized, setIsInitialized] = useState(false);
  const [permissions, setPermissions] = useState()
  const [hasError, setHasError] = useState(false)
  const { alert, alertNode } = useAlert()
  const [theme, colorMode] = useMode();
  const [lastVisitedUrl, setLastVisitedUrl] = useState("");
  const navigate = useNavigate()

  const setLastUrl = (url) => {
    setLastVisitedUrl(url);
  };
  const { api, setAuthToken } = useApi({
    alert,
    setIsLoading,
    onLogout: setAccount,
    onError: useCallback(() => setHasError(true), [setHasError]),
  });

  const appContextValues = {
    api,
    setAuthToken,
    account,
    setAccount,
    isLoading,
    alert,
    setIsInitialized,
    permissions,
    lastVisitedUrl,
    setLastUrl
  }

  const getPermissions = useCallback(() => {
    api(GET_USER_PERMISSIONS)
      .then(({ ok, body }) => {
        if (ok) {
          setPermissions(body)
          setIsInitialized(true)
        }
      })
  }, [setPermissions, setIsInitialized, api]);

  useEffect(() => {
    if (!isInitialized) {
      api(GET_PROFILE_ENDPOINT, { ignoreNotFound: true })
        .then(({ ok, body }) => {
          if (ok) {
            setAccount(body.data)
            getPermissions()
            if (lastVisitedUrl) {
              navigate(lastVisitedUrl)
            }
          }
          else setIsInitialized(true)
        })
    }
  }, [isInitialized, api, getPermissions]);

  if (!isInitialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto'
        }}
      >
        <CircularProgress
          sx={{
            margin: '0',
          }}
        />
      </Box>
    );
  }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
          <Suspense fallback={<CircularProgress sx={{ m: '-40px auto 0' }} />}>
            {/* {alertNode} */}
            <AppContext.Provider value={appContextValues}>
              <Router />
            </AppContext.Provider>
          </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;