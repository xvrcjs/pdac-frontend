import React, { useContext, useEffect, useState } from "react";
import TrafficLightSystemTimesComponent from "./TrafficLightSystemTimesComponent";
import { AppContext } from "context/AppContext";
import { useFormik } from "formik";
import { GET_TRAFIC_LIGHT_CONFIG } from "constant/endpoints";

function TrafficLightSystemTimesContainer() {
  const { api, account } = useContext(AppContext);
  const [config,setConfig] = useState('')
  // TODO: Cambiar por POST y generar logica de GET OR CREATE
  const handleOnSubmit = (values) => {
      api(GET_TRAFIC_LIGHT_CONFIG, {
        method: "PATCH",
        body: values,
      })
        .then(({ ok, body }) => {
          if (ok) {
            
          }
        })
        .catch((err) => {
          console.log("error", err);
        })
        .finally(() => {
        });
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
    isValid,
    dirty,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      greenToYellow: 0,
      yellowToRed: 0,
    },
    onSubmit: handleOnSubmit,
    validate: (values) => {
      const errors = {};

      return errors;
    },
  });

  useEffect(()=>{
    api(GET_TRAFIC_LIGHT_CONFIG)
      .then(({ ok, body }) => {
        if (ok) {
          setConfig(body.data);  
          setFieldValue('greenToYellow', body.data.greenToYellow || 8); 
          setFieldValue('yellowToRed', body.data.yellowToRed || 24);
        }
      })
  },[])

  return (
    <TrafficLightSystemTimesComponent
      api={api}
      values={values}
      config={config}
      setFieldValue={setFieldValue}
      touched={touched}
      errors={errors}
      isValid={isValid}
      dirty={dirty}
      handleBlur={handleBlur}
      handleChange={handleChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
}

export default TrafficLightSystemTimesContainer;
