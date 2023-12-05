import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { List, ListItem } from '@mui/material';
import Categories from '../../Objects/Categories';
import { CheckSessionAccess } from "../Session";
import { Link } from 'react-router-dom'
import Dialog from "../Dialog";
import React from 'react';

export default function CategorieRemove() {
  const navButtonStyles = {
    color: "brown",
    backgroundColor: 'gray',
    textDecoration: 'none',
    '&:hover': {
      color: "solid #43464B 1px",
    },
    '&.active': {
      color: 'text.secondary'
    },
    width: 80,
    height: 20,
    border: '1px solid',
    borderColor: "solid #43464B 1px",
    fontSize: "10px",
  };

  const [dataList, setDataList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const mapJsonToCategories = (jsonItem) => {
    return new Categories(
      jsonItem.id,
      jsonItem.name,
      jsonItem.description
    );
  };

  async function fetchData() {
    CheckSessionAccess();
    const url = "/api/categories";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not in JSON format");
      }

      const data = await response.json();
      const categories = data.map(mapJsonToCategories);
      setDataList(categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleDialogResponse = async (confirmed) => {
    setShowDialog(false);
    if (confirmed && categoryToDelete) {
      await removeCategory(categoryToDelete);
    }
    setCategoryToDelete(null);
  };

  async function removeCategory(id) {
    const url = `/api/categories/${id}`;
    const token = sessionStorage.getItem("jwt");
  
    try {
      // Step 1: Fetch the list of items associated with the category
      const responseItems = await fetch(`/api/categories/${id}/items`, {
        headers: {
          'Authorization': token ? `${token}` : '',
        },
      });
  
      if (!responseItems.ok) {
        throw new Error(`HTTP error! Status: ${responseItems.status}`);
      }
  
      const itemsData = await responseItems.json();
  
      // Step 2: Iterate through the list of items and delete each item
      for (const item of itemsData) {
        await fetch(`/api/categories/${id}/items/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token ? `${token}` : '',
          },
        });
      }
  
      // Step 3: Delete the category once all items are deleted
      const responseCategory = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `${token}` : '',
        },
      });
  
      if (!responseCategory.ok) {
        throw new Error(`HTTP error! Status: ${responseCategory.status}`);
      }
  
      const updatedDataList = dataList.filter(item => item.id !== id);
      setDataList(updatedDataList);
    } catch (error) {
      console.error("Error removing category:", error);
      alert("Nepavyko ištrinti kategorijos. Bandykite dar kartą. Tai gali įvykti kadangi vienas ar daugiau vartotojų šia prekę turi savo krepšelyje ir nori ją pirkti");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {dataList.map((category) => (
        <Box sx={{ maxWidth: 400, margin: 5, backgroundColor: 'lightgray' }}>
          <React.Fragment key={category.id}>
            <Grid item xs={4} sx={{ border: 1, borderRadius: '5px' }}>
              <List>
                <ListItem>{category.name}</ListItem>
                <ListItem>{category.description}</ListItem>
                <>
                  <ListItem sx={{ color: '#565050' }}>
                    CategoryId: {category.id}
                  </ListItem>
                  <ListItem sx={{ alignItems: 'right', justifyContent: 'right' }}>
                    <Button
                      onClick={() => {
                        setCategoryToDelete(category.id);
                        setShowDialog(true);
                      }}
                      sx={navButtonStyles}
                    >
                      Istrinti
                    </Button>
                    <Button component={Link} to={"/categoriesUpdate/"+ category.id} sx={navButtonStyles}>Atnaujinti</Button>
                  </ListItem>
                </>
              </List>
            </Grid>
          </React.Fragment>
        </Box>
      ))}
      {showDialog && (
        <Dialog
          message="Ar tikrai norite ištrinti šia kategoriją ? Ištrindami šią kategoriją, ištrinsite visus jai priklausančius daiktus"
          onDialog={handleDialogResponse}
        />
      )}
    </Box>
  );
}