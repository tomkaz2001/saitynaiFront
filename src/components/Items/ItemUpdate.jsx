import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';

export default function ItemUpdate() {
  const navigate = useNavigate();
  const { id, item_id } = useParams();
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
  const [loading, setLoading] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/categories/${id}/items/${item_id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not in JSON format');
      }

      const data = await response.json();
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching item data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async () => {
    if (!name || !description || !price) {
      setError('All fields are required.');
      return;
    }
    if (name.length > 50 || description.length > 200) {
      setError('Name and description should be within specified length limits.');
      return;
    }

    const token = sessionStorage.getItem('jwt');
    try {
      const response = await fetch(`/api/categories/${id}/items/${item_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `${token}` : '',
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

      navigate(`/categories/${id}/items`);
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Error updating item. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{marginTop:2}}>
      {loading && <p>Loading...</p>}
      {!loading && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              onChange={handleNameChange}
              value={name}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="outlined-required"
              label="Price"
              type="number"
              onChange={handlePriceChange}
              value={price}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="standard-multiline-static"
              label="Description"
              rows={4}
              multiline
              onChange={handleDescriptionChange}
              value={description}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={updateItem} sx={navButtonStyles} fullWidth>
              Update
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
