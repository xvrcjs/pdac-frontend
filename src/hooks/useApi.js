import { useState, useCallback ,useEffect} from 'react';
import jwtAxios from 'axios';
import Cookies from 'js-cookie';

const useApi = ({ alert, setIsLoading, onLogout, onError }) => {
  const [axiosInstance,setAxiosInstance] = useState(() => {
    return jwtAxios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL, 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'multipart/form-data'
      },
    });
  });
  
  const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);  
    const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expirationDate.toUTCString()};path=/;SameSite=Lax;`;
    document.cookie = cookieValue;
  };
  const setAuthToken = useCallback((token,expries_in) => {
    setAxiosInstance((prevInstance) => {
      const updatedInstance = prevInstance;
      updatedInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      setCookie("token",token,expries_in);
      
      return updatedInstance;
    });
  }, []);


  const api = useCallback(
    (url, config = {}) => {
      return axiosInstance({
        method: config.method,
        url,
        data: config.body,
        ...config,
      })
        .then((response) => {
          setIsLoading(false);
          // if(config.method){
          //   alert({
          //     type: "success",
          //     title: response.data.messages[0].title,
          //     detail: response.data.messages[0].description,
          //     life: 4000  
          //   }) 
          // }
          return { ok: true, body: response.data };
        })
        .catch((error) => {
          setIsLoading(false);
          if(error.status !== 401) {
            alert({
              type: "error",
              title: "Upss!",
              detail: "Algo no salió como esperabamos, por favor intentá nuevamente.",
              life: 4000  
            })  
          }
          if (jwtAxios.isCancel(error)) {
            // Manejar cancelaciones si es necesario
          } else if (error.response) { 
            if(config.method && error.response.data.messages) {
              // alert({
              //   type: "error",
              //   title: "Upss!",
              //   life: 5000  
              // })    
            }    
            onError(error.response.data);
          } else if (error.request) {
            onError('No se recibió respuesta del servidor');
          } else {
            onError('Error durante la configuración de la solicitud');
          }

          return { ok: false, body: null };
        });
    },
    [alert, axiosInstance, setIsLoading, onError]
  );
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setAuthToken(token);
    }
  }, [setAuthToken]);

  return {api,setAuthToken};
};

export default useApi;