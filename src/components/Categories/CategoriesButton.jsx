import React, { useState } from 'react';
import { Button, Popover, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoriesButton = () => {
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
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = async () => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(document.getElementById('categories-button'));
      // Fetch categories from your API
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  };

  return (
    <Box>
      <Button
        id="categories-button"
        onClick={handleButtonClick}
        sx={navButtonStyles}
      >
        Categories
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
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
          {categories.map((category) => (
            <Button
              key={category.id}
              component={Link}
              to={`/categories/${category.id}/items`}
              sx={{ display: 'block', paddingY: 1, width: '100%', textAlign: 'left' }}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default CategoriesButton;
