import React, { useContext, useEffect, useState } from "react";
import TrafficLightSystemTimesComponent from "./TrafficLightSystemTimesComponent";
import { AppContext } from "context/AppContext";
import { useFormik } from "formik";
import { GET_TRAFIC_LIGHT_CONFIG } from "constant/endpoints";

function TrafficLightSystemTimesContainer() {
  const { api, account } = useContext(AppContext);
  const [config,setConfig] = useState('')
  
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
      greenToYellow_c: 0,
      yellowToRed_c: 0,
      greenToYellow_ive_hv: 0,
      yellowToRed_ive_hv: 0,
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
          setFieldValue('greenToYellow_c', body.data.greenToYellow_c|| 8); 
          setFieldValue('yellowToRed_c', body.data.yellowToRed_c || 24);
          setFieldValue('greenToYellow_ive_hv', body.data.greenToYellow_ive_hv || 8); 
          setFieldValue('yellowToRed_ive_hv', body.data.yellowToRed_ive_hv || 24);
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
