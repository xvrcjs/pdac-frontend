import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneComponent = (props) => {
    const { setFiles, setIsDragActive } = props;


    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles);
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });
    
    useEffect(() => {
        setIsDragActive(isDragActive);
    }, [isDragActive]);
    
    return (
        <Box {...getRootProps()} className="dropzone" 
            sx={{width:"100%", height:"100%", position:"absolute"}} >
            <input {...getInputProps()} />
        </Box>
    );
};

export default DropzoneComponent;
