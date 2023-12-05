import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { Link, useParams } from 'react-router-dom'
import { List, ListItem, Tab, Tabs} from '@mui/material';
import Categories from '../../Objects/Categories'
import Items from '../../Objects/Items'

import React from 'react';
import { LoginP, CheckSessionAccess, LogOut, OnlyUser, OnlyOrganizer, OnlyAdmin, OrganizerUser, OrganizerAdmin, LoggedIn } from "../Session";

export default function CategorieView() {

  const navButtonStyles = {
    color: "brown",
    backgroundColor:'gray',
    textDecoration: 'none',
    '&:hover': {
        color: "solid #43464B 1px",
        
    },
    '&.active': {
        color: 'text.secondary'
    },
    maxWidth: 200,
    maxHeight: 20, 
    border: '1px solid',
    borderColor: "solid #43464B 1px",
    fontSize: "10px",
    

    }
    const { id } = useParams();  
    const [dataList, setDataList] = useState([]);
    const mapJsonToItem = (jsonItem) => {
    
        const category = new Categories(
          jsonItem.category.id,
          jsonItem.category.name,
          jsonItem.category.description
        );
      
        return new Items(
          jsonItem.id,
          jsonItem.name,
          jsonItem.price,
          jsonItem.description,
          category
        );
      };
  async function fetchData() {
    CheckSessionAccess();
    const url = `/api/categories/${id}/items`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const items = data.map(mapJsonToItem);
        console.log(items);
        setDataList(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetchData();
  },
  []);
  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', maxHeight:20 }}>
        <Button
          component={Link}
          to={`/categories/${id}/itemsCreate`}
          sx={navButtonStyles}
        >
          Pridėti
        </Button>
      </Box>

      <Box>
        <Box>
        {dataList.map((EventItem) => (
            <React.Fragment key={EventItem.id}>
              <Button component={Link} to={"/categories/" + EventItem.category.id + "/items/" + EventItem.id}>
                <Grid item xs={4} sx={{ border: 1, borderRadius: '5px' }}>
                  <List>
                    <ListItem>{EventItem.name}</ListItem>
                    <ListItem>
                      <Typography>Aprašymas:</Typography>
                      {EventItem.description}
                    </ListItem>
                    <ListItem>Kaina: {EventItem.price}</ListItem>
                    <ListItem>Kategorija: {EventItem.category.name}</ListItem>
                    {OnlyAdmin() && (
                      <>
                        <ListItem sx={{ color: 'gray' }}>Id: {EventItem.id}</ListItem>
                        <ListItem sx={{ color: 'gray' }}>
                          CategoryId: {EventItem.category.id}
                        </ListItem>
                      </>
                    )}
                  </List>
                </Grid>
              </Button>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </>
  );}