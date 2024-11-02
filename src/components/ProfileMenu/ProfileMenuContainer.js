import React, { useContext } from 'react';
import ProfileMenuComponent from './ProfileMenuComponent';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../context/AppContext';
import { LOGOUT_ENDPOINT } from 'constant/endpoints';
import Cookies from 'js-cookie';


function ProfileMenuContainer(props) {
    const {
        isMenuOpen,
        setMenuOpen
    } = props;
    const navigate = useNavigate();
    const { api,permissions,setAccount,setIsInitialized, account } = useContext(AppContext);

    function handleOnClickSettings() {
        setMenuOpen(false)
        navigate("/settings")
    }
    function handleOnClickLogout() {
        localStorage.removeItem('lastVisitedUrl')
        setMenuOpen(false)
        navigate("/logout")
    }
    function handleCloseMenu(){
        setMenuOpen(false)
    }

    function signout() {
        api(LOGOUT_ENDPOINT).then(({ ok }) => {
            if (ok) {
                setAccount();
                Cookies.remove("token")
                localStorage.removeItem('lastVisitedUrl')
                setIsInitialized(true)
                navigate("/login")
            }
        })
    }

    return (
        <ProfileMenuComponent
            isMenuOpen={isMenuOpen}
            handleOnClickSettings={handleOnClickSettings}
            handleOnClickLogout={handleOnClickLogout}
            handleCloseMenu={handleCloseMenu}
            permissions={permissions}
            signout={signout}
            account={account}
        />
    )
}

export default ProfileMenuContainer
