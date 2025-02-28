import React, { useEffect } from 'react';
import "./ContentStyles.scss";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Cookies from 'js-cookie';

function ContentComponent(props) {
    const {
        minWidth = "400px",
        maxWidth = "1400px",
        children,
        showFooter = true,
        className
    } = props;

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    useEffect(() => {
        if (theme.palette.mode) {
            Cookies.set("theme",theme.palette.mode)
        }
    }, [theme]);

    return (
        <div className={`content-container ${className ? className : ""}`}>
            <div className="swt-content-wrapper">
                <div className='swt-content'
                    // style={{
                    //     maxWidth: maxWidth ? `calc(${maxWidth} + max(10px, 15vw))` : undefined,
                    //     minWidth: minWidth ? `calc(${minWidth} + max(10px, 15vw))` : undefined,
                    // }}
                    >
                    {children}
                </div>
            </div >
            {/* {
                showFooter &&
                < div className='content-footer' style={{color:colors.letter[500]}}>
                    Copyright © 2024. Todos los derechos reservados por Taris.
                </div>
            } */}
        </div>
    )
}

export default ContentComponent
