import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { List, ListItem, Tab, Tabs, Input, TextField } from '@mui/material';
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const navButtonStyles = {
    color: "brown",
    textDecoration: 'none',
    '&:hover': {
        color: "solid #43464B 1px",
        
    },
    '&.active': {
        color: 'text.secondary'
    },
    width: 200,
    height: 50, 
    border: '1px solid',
    borderColor: "solid #43464B 1px",
    fontSize: "20px",

  }

    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    async function login() {
      console.warn(username, password);
      let item = { username, password };
      let result = await fetch("/api/api/auth/signin", {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(item)
      });
  
      try {
          result = await result.json();
          console.log("Parsed result:", result);
  
          sessionStorage.setItem("userId", result.id);
          sessionStorage.setItem("username", result.username);
          sessionStorage.setItem("email", result.email);
          sessionStorage.setItem("role", JSON.stringify(result.roles));
          sessionStorage.setItem("jwt", String(result.tokenType + " " + result.accessToken));
  
          const accessTokenData = jwtDecode(result.accessToken);
          sessionStorage.setItem("user", accessTokenData.sub);
          sessionStorage.setItem("iat", accessTokenData.iat);
          sessionStorage.setItem("exp", accessTokenData.exp);
          window.location.reload();
          navigate('/');
      } catch (error) {
          console.error("Error parsing JSON:", error);
      }
  }
    
  return (
    <Box>
      <Typography pt={5} sx={[{ fontSize: "50px", textAlign: 'center', fontWeight: "bold", marginBottom: 10}]}>
        Prisijungimas
      </Typography>
      <Box >
        <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
          margin: 5,
        }}>
          <TextField
              required
              id="outlined-required"
              label="Username"
              onChange={handleUsernameChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              onChange={handlePasswordChange}
            />
        </Box>
        <Button onClick={login} sx={navButtonStyles}>
          Prisijungti
        </Button>
        <Button component={Link} to="/Signup" sx={navButtonStyles}>
          Registruotis
        </Button>
      </Box>
    </Box>

  );}
