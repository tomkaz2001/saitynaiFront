import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { LoginP, CheckSessionAccess, LogOut, OnlyUser, OnlyOrganizer, OnlyAdmin, OrganizerUser, OrganizerAdmin, LoggedIn } from "../Session";


export default function CategorieAdd() {
  const navigate = useNavigate();
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
    width: 200,
    height: 50,
    border: '1px solid',
    borderColor: 'solid #43464B 1px',
    fontSize: '20px',
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addCategorie = async () => {
    if (!name || !description) {
      setError('All fields are required.');
      return;
    }
    if (name.length > 50 || description.length > 200) {
      setError('Name and description should be within specified length limits.');
      return;
    }

    const token = sessionStorage.getItem('jwt');
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `${token}` : '',
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setName('');
      setDescription('');
      setError('');
      navigate('/');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <Box>
      {OrganizerAdmin() && (<Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
          margin: 5,
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Name"
          onChange={handleNameChange}
        />

        <TextField
          required
          id="standard-multiline-static"
          label="Description"
          rows={4}
          multiline
          onChange={handleDescriptionChange}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Box>)}
      <Button onClick={addCategorie} sx={navButtonStyles}>
        Add
      </Button>
    </Box>
  );
}
