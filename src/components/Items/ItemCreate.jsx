import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function CategorieAdd() {
  const navigate = useNavigate();
  const { id } = useParams();  
  const navButtonStyles = {
    color: 'brown',
    textDecoration: 'none',
    '&:hover': {
      color: 'solid #43464B 1px',
      backgroundColor: 'lightgray',
    },
    '&.active': {
      color: 'text.secondary',
    },
    maxWidth: 200,
    minWidth: 100,
    maxHeight: 50,
    border: '1px solid',
    borderColor: 'solid #43464B 1px',
    fontSize: '20px',
  };

  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addCategorie = async () => {
    if (!name || !description || !price) {
      setError('All fields are required.');
      return;
    }
    if (name.length > 50 || description.length > 200) {
      setError('Name and description should be within specified length limits.');
      return;
    }
    console.log(price);
    const token = sessionStorage.getItem('jwt');
    try {
      const response = await fetch(`/api/categories/${id}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `${token}` : '',
        },
        body: JSON.stringify({
          name: name,
          price: price,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setName('');
      setPrice(0.00);
      setDescription('');
      setError('');
      navigate(`/categories/${id}/items`);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <Box>
      <Grid container sx={[{
              display: 'flex',
              alignItems: 'center',
              justifyContent: "center"}]}>
        <Grid item xs={2} ></Grid>
        <Grid item xs={4} >
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { maxWidth: '25ch' },
              marginBottom: 1,
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Name"
              onChange={handleNameChange}
            />
          </Box>
          <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { maxWidth: '25ch' },
          }}>
          <TextField
              required
              id="outlined-required"
              label="Price"
              type="number"
              onChange={handlePriceChange}
            />
          </Box>
        </Grid>
        <Grid item xs={4} >
          <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, maxWidth: '25ch' },
          }}>
          <TextField
              required
              id="standard-multiline-static"
              label="Description"
              rows={4}
              multiline
              onChange={handleDescriptionChange}
            />
          </Box>
        </Grid>
        <Grid item xs={2} ></Grid>
      </Grid>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={addCategorie} sx={navButtonStyles}>
        Prideti
      </Button>
    </Box>
  );
}
