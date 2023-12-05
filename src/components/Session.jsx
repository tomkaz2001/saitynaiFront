import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
export function CheckSessionAccess (){
        if(sessionStorage.getItem("userId") != null || sessionStorage.getItem("userId") != undefined){
            if(sessionStorage.getItem("exp") < new Date()/1000){
              sessionStorage.setItem("userId", null)
              sessionStorage.setItem("username", null)
              sessionStorage.setItem("email", null)
              sessionStorage.setItem("role", null)
              sessionStorage.setItem("jwt", null)
              sessionStorage.setItem("user", null)
              sessionStorage.setItem("iat", null)
              sessionStorage.setItem("exp", null)
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
        return false;
}
export function LogOut (logoutCallback){
        sessionStorage.setItem("userId", null)
        sessionStorage.setItem("username", null)
        sessionStorage.setItem("email", null)
        sessionStorage.setItem("role", null)
        sessionStorage.setItem("jwt", null)
        sessionStorage.setItem("user", null)
        sessionStorage.setItem("iat", null)
        sessionStorage.setItem("exp", null)
        window.location.reload();
        logoutCallback();
}
export function OnlyUser() {
  CheckSessionAccess();
  const userRoles = JSON.parse(sessionStorage.getItem("role")) || [];
  return userRoles.includes("ROLE_USER");
}

export function OnlyOrganizer() {
  CheckSessionAccess();
  const userRoles = JSON.parse(sessionStorage.getItem("role")) || [];
  return userRoles.includes("ROLE_MODERATOR");
}

export function OnlyAdmin() {
  CheckSessionAccess();
  const userRoles = JSON.parse(sessionStorage.getItem("role")) || [];
  return userRoles.includes("ROLE_ADMIN");
}

export function OrganizerUser() {
  CheckSessionAccess();
  const userRoles = JSON.parse(sessionStorage.getItem("role")) || [];
  return userRoles.includes("ROLE_USER") || userRoles.includes("ROLE_MODERATOR");
}

export function OrganizerAdmin() {
  CheckSessionAccess();
  const userRoles = JSON.parse(sessionStorage.getItem("role")) || [];
  return userRoles.includes("ROLE_ADMIN") || userRoles.includes("ROLE_MODERATOR");
}

export function LoggedIn() {
  CheckSessionAccess();
  const userRoles = JSON.parse(sessionStorage.getItem("role")) || [];
  return userRoles.length > 0;
}
const navButtonStyles = {
  backgroundColor: '#0043ff',
  color: "#B10B0B",
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#B10B0B',
    color: '#0043ff',
  },
  width: 100,
  height: 30, 
  border: '2px solid',
  
}
export function LoginP() {
  const [isLoggedIn, setIsLoggedIn] = useState(LoggedIn());

  const handleLogout = () => {
    LogOut(() => setIsLoggedIn(false));
  };

  return (
    <Box>
      {isLoggedIn ? (
        <Button onClick={handleLogout} sx={navButtonStyles}>
          Atsijungti
        </Button>
      ) : (
        <Button component={Link} to="/Signin" sx={navButtonStyles}>
          Prisijungti
        </Button>
      )}
    </Box>
  );
}