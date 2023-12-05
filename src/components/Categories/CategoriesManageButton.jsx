import React, { useState } from 'react';
import { Button, Popover, Box, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoriesManageButton = () => {
  const navButtonStyles = {
    backgroundColor: '#0043ff',
    color: "black",
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'white',
      color: '#0043ff',
    },
    width: 200, 
    border: '1px solid',
    
  }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleButtonClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <Box>
        <Button
          id="manage-categories-button"
          onClick={handleButtonClick}
          sx={navButtonStyles}
        >
          Manage Categories
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box p={2}>
            {/* Add your manage categories options as buttons with links */}
            <MenuItem component={Link} to="/categoriesRemove" onClick={handleClose}>
              Remove / Update
            </MenuItem>
            <MenuItem component={Link} to="/categoriesAdd" onClick={handleClose}>
              Add
            </MenuItem>
          </Box>
        </Popover>
      </Box>
    );
  };

  export default CategoriesManageButton;