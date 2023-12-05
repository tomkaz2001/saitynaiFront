import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from 'react-router-dom';
import Categories from '../../Objects/Categories';

export default function CategorieUpdate() {
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



  const navigate = useNavigate();
  const { id } = useParams();
  const [dataList, setDataList] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const mapJsonToCategory = (jsonItem) => {
    setName(jsonItem.name);
    setDescription(jsonItem.description);
    return new Categories(jsonItem.id, jsonItem.name, jsonItem.description);
  };

  const updateCategorie = async () => {
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
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
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

      navigate('/');
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Error updating category. Please try again.');
    }
  };

  async function fetchData() {
    try {
      const response = await fetch(`/api/categories/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not in JSON format');
      }

      const data = await response.json();
      const category = mapJsonToCategory(data);
      setDataList(category);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching category data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {loading && <p>Loading...</p>}
      {!loading && (
        <Box
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
            value={name}
          />

          <TextField
            required
            id="standard-multiline-static"
            label="Description"
            rows={4}
            multiline
            onChange={handleDescriptionChange}
            value={description}
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Box>
      )}
      {!loading && (
        <Button onClick={updateCategorie} sx={navButtonStyles}>
          Update
        </Button>
      )}
    </Box>
  );
}
