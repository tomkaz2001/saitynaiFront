import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { List, ListItem } from '@mui/material';
import Categories from '../../Objects/Categories'
import Items from '../../Objects/Items'

import React from 'react';
import { LoginP, CheckSessionAccess, OnlyAdmin } from "../Session";
import Dialog from "../Dialog"

export default function ItemView() {
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
    marginRight:2,
  };

  const { id, item_id } = useParams();
  const [item, setItem] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  async function fetchData() {
    CheckSessionAccess();
    const url = `/api/categories/${id}/items/${item_id}`;

    try {
      const response = await fetch(url);

      // Check if the response is in JSON format
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const item = await response.json();
        console.log(item); // Log the item to see its structure
        setItem(item);
      } else {
        // Handle non-JSON response
        console.error('Non-JSON response:', await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = (userChoice) => {
    setShowDialog(false);

    // If the user chose "Taip" (Yes), proceed with the item deletion
    if (userChoice) {
      deleteItem();
    }
  };

  // Function to send DELETE request to the API
  const deleteItem = async () => {
    const deleteUrl = `/api/categories/${id}/items/${item_id}`;
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion (e.g., show a success message)
        console.log('Item deleted successfully');
        navigate(`/categories/${id}/items`);
      } else {
        // Handle deletion failure (e.g., show an error message)
        console.error('Failed to delete item:', response.status);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Box>
      {item && (
        <Grid item xs={4} sx={{ border: 1, borderRadius: '5px' }}>
          <List>
            <ListItem>
              {item.name}
            </ListItem>
            <ListItem>
              <Typography>Aprašymas:</Typography>
              {item.description}
            </ListItem>
            <ListItem>
              Kaina: {item.price}
            </ListItem>
            <ListItem>
              Kategorija: {item.category.name}
            </ListItem>
            {OnlyAdmin() && (
              <>
                <ListItem>
                  <Button onClick={handleOpenDialog} sx={navButtonStyles}>
                    Istrinti
                  </Button>
                  <Button
                      component={Link}
                      to={"/categories/" + id + "/itemsUpdate/" +item_id}
                      sx={navButtonStyles}
                    >
                      Atnaujinti
                    </Button>
                </ListItem>
              </>
            )}
          </List>
        </Grid>
      )}

      {/* Dialog component for confirmation */}
      {showDialog && (
        <Dialog
          message="Ar tikrai norite ištrinti šį elementą?"
          onDialog={handleCloseDialog}
        />
      )}
    </Box>
  );
}
