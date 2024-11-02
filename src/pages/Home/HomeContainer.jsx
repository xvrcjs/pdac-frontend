import React, { useContext } from 'react';
import HomeComponent from './HomeComponent';
import { AppContext } from 'context/AppContext';


function HomeContainer() {
    const {api, account} = useContext(AppContext)
    return(
        <HomeComponent/>
    )
    
}

export default HomeContainer
