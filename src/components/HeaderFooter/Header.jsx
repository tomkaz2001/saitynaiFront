import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, List, ListItem, Switch, Toolbar, Typography, Popover, useMediaQuery } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { LoginP, OnlyAdmin, OrganizerAdmin } from "../Session";
import CategoriesButton from '../Categories/CategoriesButton';
import CategoriesManageButton from '../Categories/CategoriesManageButton';

export default function Header() {
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

  const HeaderStyles = {
    backgroundColor: "#00aeff",
    borderBottom: "solid #43464B 1px",
    minHeight:"10vh",
  }

  const isMobile = useMediaQuery('(max-width:550px)');

  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  return (
    <AppBar position='static' sx={[{borderBottomLeftRadius: 5, borderBottomRightRadius: 5, paddingBottom: "5px"}, HeaderStyles]}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>Eshop</Typography>
        {isMobile ? (
          <>
            <Button onClick={handlePopoverOpen} sx={navButtonStyles}>
              Menu
            </Button>
            <Popover
              open={Boolean(popoverAnchor)}
              anchorEl={popoverAnchor}
              onClose={handlePopoverClose}
            >
              <List>
                <ListItem>
                  <CategoriesButton />
                </ListItem>
                {OrganizerAdmin() && (
                  <ListItem>
                    <CategoriesManageButton />
                  </ListItem>
                )}
                <ListItem>
                  <Button component={Link} to="/" sx={navButtonStyles}>
                    Home
                  </Button>
                </ListItem>
                <ListItem>
                  <Button component={Link} to="/AboutPage" sx={navButtonStyles}>
                    Page Info
                  </Button>
                </ListItem>
                <ListItem>
                  <LoginP />
                </ListItem>
              </List>
            </Popover>
          </>
        ) : (
          <>
            <CategoriesButton />
            {OrganizerAdmin() && <CategoriesManageButton />}
            <Button component={Link} to="/" sx={navButtonStyles}>
              Home
            </Button>
            <Button component={Link} to="/AboutPage" sx={navButtonStyles}>
                    Page Info
            </Button>
            <LoginP />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
