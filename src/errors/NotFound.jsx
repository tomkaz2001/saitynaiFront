import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import { List, ListItem, Tab, Tabs } from '@mui/material';
import React from 'react';

export default function AboutPage() {
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

  return (
    <Box sx={[{
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      flexDirection: "column",
      minHeight: 800
    }]}>
      <Typography pt={5} sx={[{ fontSize: "50px", textAlign: 'center', fontWeight: "bold", marginBottom: 10}]}>
        I see you are lost, maybe want to go in home page ?
      </Typography>
      <Button component={Link} to="/Home" sx={navButtonStyles}>
            HOME
        </Button>
    </Box>
  );}