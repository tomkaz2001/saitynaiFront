import { AppBar, Box, Button, Divider, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function Footer() {
  const navButtonStyles = {
    backgroundColor: '#0043ff',
    color: "black",
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'white',
      color: '#0043ff',
    },
    width: 110, 
    border: '1px solid',
    
  }

const footerStyles = {
  backgroundColor: "#0043ff",
  borderTop: "solid #43464B .1px",
  minHeight:"10vh",
}



  return (
    <AppBar position='static' sx={[{borderTopLeftRadius: 5, borderTopRightRadius: 5}, footerStyles]}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        </Toolbar>
    </AppBar>
  )
}