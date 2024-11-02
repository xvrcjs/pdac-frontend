import React from 'react';
import DOMPurify from 'dompurify';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const HTMLRenderer = ({ htmlText }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlText);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div >
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    </div>
  );
};

export default HTMLRenderer;