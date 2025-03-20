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
        accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': []
        },
        maxSize: 5 * 1024 * 1024, // 5MB
    });
    
    useEffect(() => {
        setIsDragActive(isDragActive);
    }, [isDragActive]);
    
    return (
        <Box {...getRootProps()} className="dropzone" 
            sx={{ height:"100%", width: "100%",position:"absolute"}} >
            <input {...getInputProps()} />
        </Box>
    );
};

export default DropzoneComponent;
